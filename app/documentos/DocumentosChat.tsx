"use client";

import { useState, useRef, useEffect } from "react";
import { FileText, Send, Loader2, Download, CheckCircle2, X } from "lucide-react";
import Image from "next/image";

// Lightweight markdown renderer: bold, italic, bold+italic, URLs, line breaks
function renderContent(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const lines = text.split("\n");
  return lines.map((line, li) => {
    const parts = line.split(urlRegex);
    const rendered = parts.map((part, pi) => {
      if (urlRegex.test(part)) {
        return (
          <a key={pi} href={part} target="_blank" rel="noopener noreferrer"
            className="text-brand-coral-dark underline break-all hover:opacity-80">
            {part}
          </a>
        );
      }
      // bold+italic ***text***, bold **text**, italic *text*
      const tokens = part.split(/(\*\*\*.+?\*\*\*|\*\*.+?\*\*|\*.+?\*)/g);
      return tokens.map((tok, ti) => {
        if (tok.startsWith("***") && tok.endsWith("***"))
          return <strong key={ti}><em>{tok.slice(3, -3)}</em></strong>;
        if (tok.startsWith("**") && tok.endsWith("**"))
          return <strong key={ti}>{tok.slice(2, -2)}</strong>;
        if (tok.startsWith("*") && tok.endsWith("*"))
          return <em key={ti}>{tok.slice(1, -1)}</em>;
        return <span key={ti}>{tok}</span>;
      });
    });
    return (
      <span key={li}>
        {rendered}
        {li < lines.length - 1 && <br />}
      </span>
    );
  });
}

type Doc = {
  id: string;
  titulo: string;
  descripcion: string | null;
  categoria: string;
  paginas: number;
  tamano: number;
};

type Message = { role: "user" | "assistant"; content: string };

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function DocumentosChat({ documentos }: { documentos: Doc[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("Todas");
  const chatRef = useRef<HTMLDivElement>(null);

  const categorias = ["Todas", ...Array.from(new Set(documentos.map((d) => d.categoria)))];

  const filtered = filter === "Todas" ? documentos : documentos.filter((d) => d.categoria === filter);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  function toggle(id: string) {
    setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }

  async function send() {
    const question = input.trim();
    if (!question) return;
    if (selected.length === 0) {
      setError("Selecciona al menos un documento de la lista de la izquierda.");
      return;
    }
    setError("");
    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: question }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          documentIds: selected,
          history: messages.slice(-6),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages([...newMessages, { role: "assistant", content: `⚠️ ${data.error || "Error generando respuesta"}` }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: data.answer }]);
      }
    } catch (e) {
      setMessages([...newMessages, { role: "assistant", content: "⚠️ Error de conexión con el servidor." }]);
    }
    setLoading(false);
  }

  function clearChat() {
    setMessages([]);
    setError("");
  }

  return (
    <div className="grid lg:grid-cols-[380px_1fr] gap-6">
      {/* Panel de documentos */}
      <aside className="bg-white rounded-2xl border border-gray-100 overflow-hidden lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-brand-dark flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand-coral" />
            Documentos disponibles
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {selected.length} de {documentos.length} seleccionados
          </p>
          <div className="flex gap-1 flex-wrap mt-3">
            {categorias.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`text-xs px-2 py-1 rounded ${
                  filter === c ? "bg-brand-dark text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              No hay documentos disponibles aún.
            </div>
          ) : (
            <ul className="space-y-1">
              {filtered.map((doc) => {
                const isSelected = selected.includes(doc.id);
                return (
                  <li key={doc.id}>
                    <button
                      onClick={() => toggle(doc.id)}
                      className={`w-full text-left p-3 rounded-xl transition-colors border ${
                        isSelected
                          ? "bg-brand-gold/10 border-brand-gold"
                          : "bg-white border-transparent hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div
                          className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center flex-shrink-0 ${
                            isSelected ? "bg-brand-gold border-brand-gold" : "border-gray-300"
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="h-3 w-3 text-brand-dark" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-brand-dark truncate">{doc.titulo}</div>
                          {doc.descripcion && (
                            <div className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                              {doc.descripcion}
                            </div>
                          )}
                          <div className="flex gap-2 mt-1.5 items-center">
                            <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                              {doc.categoria}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {doc.paginas}p · {formatBytes(doc.tamano)}
                            </span>
                            <a
                              href={`/api/documentos/${doc.id}/descargar`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="ml-auto text-gray-400 hover:text-brand-coral"
                            >
                              <Download className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {selected.length > 0 && (
          <div className="p-3 border-t border-gray-100 bg-gray-50">
            <button
              onClick={() => setSelected([])}
              className="text-xs text-gray-600 hover:text-red-600 flex items-center gap-1"
            >
              <X className="h-3 w-3" /> Limpiar selección
            </button>
          </div>
        )}
      </aside>

      {/* Chat */}
      <div className="bg-white rounded-2xl border border-gray-100 flex flex-col min-h-[600px] max-h-[calc(100vh-8rem)]">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-brand-gold flex-shrink-0">
              <Image src="/images/profile-pic-sara.jpg" alt="Sara" width={32} height={32} className="object-cover w-full h-full" />
            </div>
            <div>
              <div className="font-bold text-brand-dark text-sm">Sara — Asistente Documental</div>
              <div className="text-xs text-gray-500">Powered by Colegios Arquidiocesanos</div>
            </div>
          </div>
          {messages.length > 0 && (
            <button onClick={clearChat} className="text-xs text-gray-500 hover:text-red-600">
              Limpiar chat
            </button>
          )}
        </div>

        <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 px-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-brand-gold mb-3 mx-auto">
                <Image src="/images/profile-pic-sara.jpg" alt="Sara" width={64} height={64} className="object-cover w-full h-full" />
              </div>
              <h3 className="font-semibold text-brand-dark mb-1">
                ¿Qué quieres saber?
              </h3>
              <p className="text-sm max-w-md">
                Selecciona uno o varios documentos en el panel de la izquierda y hazme cualquier
                pregunta sobre su contenido.
              </p>
              <div className="mt-4 space-y-2 max-w-md w-full">
                {[
                  "¿Cuáles son los requisitos principales?",
                  "Resume los puntos más importantes del documento.",
                  "¿Cuáles son las fechas clave?",
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="w-full text-left text-sm p-2.5 rounded-lg bg-gray-50 hover:bg-brand-gold/10 text-gray-700"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-brand-dark text-white rounded-br-none"
                    : "bg-gray-50 text-gray-800 rounded-bl-none border border-gray-100"
                }`}
              >
                {m.role === "assistant" ? renderContent(m.content) : m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 border border-gray-100 p-3 rounded-2xl rounded-bl-none flex items-center gap-2 text-sm text-gray-600">
                <Loader2 className="h-4 w-4 animate-spin" /> Consultando documentos...
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mx-4 mb-2 bg-red-50 text-red-700 p-2 rounded-lg text-xs border border-red-200">
            {error}
          </div>
        )}

        <div className="p-4 border-t border-gray-100">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={
                selected.length === 0
                  ? "Primero selecciona un documento..."
                  : "Escribe tu pregunta... (Enter para enviar)"
              }
              rows={1}
              disabled={selected.length === 0 || loading}
              className="flex-1 resize-none px-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 disabled:opacity-60 max-h-32"
            />
            <button
              onClick={send}
              disabled={loading || selected.length === 0 || !input.trim()}
              className="p-3 bg-brand-dark text-white rounded-xl hover:bg-brand-dark/90 transition-colors disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            El asistente solo responde con base en los documentos seleccionados. Puede contener imprecisiones — verifica la información crítica.
          </p>
        </div>
      </div>
    </div>
  );
}
