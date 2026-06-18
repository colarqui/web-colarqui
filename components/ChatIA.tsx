"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, ChevronRight, Loader2, User } from "lucide-react";
import Image from "next/image";

type Msg = { role: "user" | "assistant"; content: string };

const SENDER_ID_KEY = "sara_sender_id";
const USER_DATA_KEY = "sara_user_data";

function getOrCreateSenderId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(SENDER_ID_KEY);
  if (!id) {
    id = `web-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem(SENDER_ID_KEY, id);
  }
  return id;
}

function getStoredUserData(): { name: string; email: string; phone: string } {
  if (typeof window === "undefined") return { name: "", email: "", phone: "" };
  try {
    const stored = localStorage.getItem(USER_DATA_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { name: "", email: "", phone: "" };
}

function saveUserData(data: { name: string; email: string; phone: string }) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
}

// Lightweight markdown renderer: bold, URLs, line breaks
function renderContent(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const boldRegex = /\*\*(.+?)\*\*/g;

  const lines = text.split("\n");
  return lines.map((line, li) => {
    // Split by URLs first
    const parts = line.split(urlRegex);
    const rendered = parts.map((part, pi) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={pi}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold underline break-all hover:opacity-80"
          >
            {part}
          </a>
        );
      }
      // Handle bold within non-URL parts
      const boldParts = part.split(boldRegex);
      return boldParts.map((bp, bi) =>
        bi % 2 === 1 ? <strong key={bi}>{bp}</strong> : <span key={bi}>{bp}</span>
      );
    });
    return (
      <span key={li}>
        {rendered}
        {li < lines.length - 1 && <br />}
      </span>
    );
  });
}

const STORAGE_KEY = "sara_history";
const MAX_STORED = 30;

const SUGERIDAS = [
  "¿Qué colegios tienen Calendario B?",
  "¿Cómo me inscribo en un colegio?",
  "¿Qué colegios están en el norte de Cali?",
];

const BIENVENIDA: Msg = {
  role: "assistant",
  content: "¡Hola! Soy Sara, asistente de Colegios Arquidiocesanos. ¿En qué puedo ayudarte hoy?",
};

export default function ChatIA() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([BIENVENIDA]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [userData, setUserData] = useState(() => getStoredUserData());
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const senderId = useRef<string>("");

  // Restore history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Msg[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages([BIENVENIDA, ...parsed]);
        }
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  // Persist history (skip welcome message)
  useEffect(() => {
    const toStore = messages.slice(1).slice(-MAX_STORED);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch {
      // ignore quota errors
    }
  }, [messages]);

  // Auto-scroll within the messages container only
  useEffect(() => {
    if (!isOpen) return;
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  const handleSend = async (text: string = input) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Msg = { role: "user", content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      if (!senderId.current) senderId.current = getOrCreateSenderId();

      const history = newMessages.slice(1, -1);
      const res = await fetch("/api/sara", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history,
          senderId: senderId.current,
          name: userData.name || undefined,
          email: userData.email || undefined,
          phone: userData.phone || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al contactar a Sara");

      const prefix = data.source === "crm" ? "" : "";
      setMessages((prev) => [...prev, { role: "assistant", content: prefix + data.reply }]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error de conexión";
      setError(msg);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Lo siento, en este momento no puedo responder. Por favor usa el botón de WhatsApp en la página para contactar al área de Mercadeo.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleEscalateToCRM = async () => {
    if (!senderId.current) senderId.current = getOrCreateSenderId();
    if (!userData.name.trim()) {
      setShowContactForm(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const history = messages.slice(1).map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/sara", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "El usuario solicita hablar con un asesor.",
          history,
          senderId: senderId.current,
          name: userData.name,
          email: userData.email || undefined,
          phone: userData.phone || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al contactar al CRM");

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Te he conectado con un asesor. En breve te contactarán.",
        },
      ]);
      setShowContactForm(false);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error de conexión";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContact = () => {
    saveUserData(userData);
    setShowContactForm(false);
    handleEscalateToCRM();
  };

  const handleClearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([BIENVENIDA]);
  };

  const showSugeridas = messages.length <= 2 && !loading;

  return (
    <div className="relative z-20">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-white text-brand-dark px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-brand-gold">
            <Image src="/images/profile-pic-sara.jpg" alt="Sara" width={32} height={32} className="object-cover w-full h-full" />
          </div>
          <span className="font-semibold">Habla con Sara</span>
          <MessageCircle className="h-5 w-5 text-brand-dark" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-[380px] max-w-[90vw] overflow-hidden border border-gray-100 flex flex-col">
          {/* Header */}
          <div className="bg-brand-dark p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-gold flex-shrink-0">
                <Image src="/images/profile-pic-sara.jpg" alt="Sara" width={40} height={40} className="object-cover w-full h-full" />
              </div>
              <div>
                <div className="font-semibold text-white">Sara</div>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Asistente de Colegios Arquidiocesanos
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 1 && (
                <button
                  onClick={handleClearHistory}
                  className="text-white/50 hover:text-white/80 text-xs px-2 py-1 rounded transition-colors"
                  title="Limpiar historial"
                >
                  Limpiar
                </button>
              )}
              <button onClick={() => setIsOpen(false)} aria-label="Cerrar chat" className="text-white/80 hover:text-white p-1 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={messagesContainerRef} className="h-[300px] overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                    msg.role === "user"
                      ? "bg-brand-dark text-white rounded-br-none"
                      : "bg-white text-gray-700 shadow-sm rounded-bl-none border border-gray-100"
                  }`}
                >
                  {msg.role === "assistant" ? renderContent(msg.content) : msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-brand-gold rounded-full animate-bounce [animation-delay:0ms]"></span>
                  <span className="w-2 h-2 bg-brand-gold rounded-full animate-bounce [animation-delay:150ms]"></span>
                  <span className="w-2 h-2 bg-brand-gold rounded-full animate-bounce [animation-delay:300ms]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Suggested questions */}
          {showSugeridas && (
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
              <div className="text-xs text-gray-500 mb-2 font-medium">Preguntas frecuentes:</div>
              <div className="space-y-1.5">
                {SUGERIDAS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="w-full text-left text-sm px-3 py-2 rounded-lg bg-white hover:bg-brand-gold/10 text-gray-700 hover:text-brand-dark transition-colors flex items-center gap-2 border border-gray-200"
                  >
                    <ChevronRight className="h-4 w-4 text-brand-gold flex-shrink-0" />
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contact form */}
          {showContactForm && (
            <div className="px-4 py-3 bg-amber-50 border-t border-amber-100 space-y-2">
              <div className="text-xs text-amber-800 font-medium">Déjanos tus datos para que un asesor te contacte:</div>
              <input
                type="text"
                placeholder="Nombre completo *"
                value={userData.name}
                onChange={(e) => setUserData((p) => ({ ...p, name: e.target.value }))}
                className="w-full px-3 py-1.5 bg-white rounded-lg text-sm border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={userData.email}
                onChange={(e) => setUserData((p) => ({ ...p, email: e.target.value }))}
                className="w-full px-3 py-1.5 bg-white rounded-lg text-sm border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={userData.phone}
                onChange={(e) => setUserData((p) => ({ ...p, phone: e.target.value }))}
                className="w-full px-3 py-1.5 bg-white rounded-lg text-sm border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveContact}
                  disabled={!userData.name.trim() || loading}
                  className="flex-1 px-3 py-1.5 bg-brand-dark text-white text-sm rounded-lg hover:bg-brand-dark/90 transition-colors disabled:opacity-40"
                >
                  {loading ? "Enviando..." : "Solicitar contacto"}
                </button>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="px-4 py-2 bg-red-50 border-t border-red-100 text-xs text-red-600">
              {error}
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Escribe tu pregunta..."
                disabled={loading}
                className="flex-1 px-4 py-2 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/20 text-gray-800 disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                aria-label={loading ? "Enviando..." : "Enviar mensaje"}
                className="p-2 bg-brand-dark text-white rounded-xl hover:bg-brand-dark/90 transition-colors disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-brand-dark/50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>
            {!showContactForm && messages.length > 2 && (
              <button
                onClick={() => {
                  if (!userData.name.trim()) {
                    setShowContactForm(true);
                  } else {
                    handleEscalateToCRM();
                  }
                }}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-1.5 text-xs text-brand-dark bg-brand-gold/10 hover:bg-brand-gold/20 rounded-lg transition-colors border border-brand-gold/30 disabled:opacity-40"
              >
                <User className="h-3 w-3" />
                Hablar con un asesor
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
