"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Search, Trash2, ChevronLeft, ChevronRight, User, Bot, X, Loader2 } from "lucide-react";

type LastMessage = {
  content: string;
  createdAt: string;
  role: string;
};

type Conversation = {
  id: string;
  senderId: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  messageCount: number;
  lastMessage: LastMessage | null;
  createdAt: string;
  updatedAt: string;
};

type Message = {
  id: string;
  role: string;
  content: string;
  source: string | null;
  createdAt: string;
};

export default function SaraChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);

  async function loadConversations() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/sara-conversations?page=${page}&limit=20&search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setConversations(data.conversations || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadConversations();
  }, [page, search]);

  async function openConversation(conv: Conversation) {
    setSelectedConversation(conv);
    setDetailLoading(true);
    try {
      const res = await fetch(`/api/admin/sara-conversations/${conv.id}`);
      const data = await res.json();
      setMessages(data.conversation?.messages || []);
    } catch (e) {
      console.error(e);
    }
    setDetailLoading(false);
  }

  async function deleteConversation(id: string) {
    if (!confirm("¿Eliminar esta conversación?")) return;
    await fetch(`/api/admin/sara-conversations/${id}`, { method: "DELETE" });
    setSelectedConversation(null);
    setMessages([]);
    loadConversations();
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleString("es-CO", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-brand-coral" />
          Conversaciones de Sara
        </h1>
        <div className="text-sm text-gray-500">{total} conversaciones en total</div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Buscar por nombre, email o ID..."
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
        />
      </div>

      <div className="grid lg:grid-cols-[380px_1fr] gap-6">
        {/* Lista */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[calc(100vh-12rem)]">
          <div className="p-3 border-b border-gray-100 bg-gray-50">
            <div className="text-xs font-medium text-gray-500 uppercase">Conversaciones</div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-500 flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Cargando...
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                No hay conversaciones registradas.
              </div>
            ) : (
              <ul className="divide-y divide-gray-50">
                {conversations.map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => openConversation(c)}
                      className={`w-full text-left p-3 hover:bg-gray-50 transition-colors ${selectedConversation?.id === c.id ? "bg-brand-gold/5" : ""}`}
                    >
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-brand-dark text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                          {(c.name || "?").charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-brand-dark truncate">
                            {c.name || "Anónimo"}
                          </div>
                          <div className="text-xs text-gray-500 flex gap-2">
                            {c.email && <span>{c.email}</span>}
                            <span>{c.messageCount} mensajes</span>
                          </div>
                          {c.lastMessage && (
                            <div className="text-xs text-gray-600 mt-1 truncate">
                              <span className={c.lastMessage.role === "user" ? "text-brand-coral" : "text-brand-dark"}>
                                {c.lastMessage.role === "user" ? "Usuario: " : "Sara: "}
                              </span>
                              {c.lastMessage.content.slice(0, 60)}...
                            </div>
                          )}
                          <div className="text-[10px] text-gray-400 mt-1">{formatDate(c.updatedAt)}</div>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Pagination */}
          {pages > 1 && (
            <div className="p-3 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="text-sm text-gray-600 hover:text-brand-dark disabled:opacity-40 flex items-center gap-1"
              >
                <ChevronLeft className="h-3 w-3" /> Anterior
              </button>
              <span className="text-xs text-gray-500">Página {page} de {pages}</span>
              <button
                onClick={() => setPage((p) => Math.min(pages, p + 1))}
                disabled={page >= pages}
                className="text-sm text-gray-600 hover:text-brand-dark disabled:opacity-40 flex items-center gap-1"
              >
                Siguiente <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        {/* Detalle */}
        <div className="bg-white rounded-2xl border border-gray-100 flex flex-col min-h-[500px] max-h-[calc(100vh-12rem)]">
          {!selectedConversation ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              Selecciona una conversación para ver los mensajes.
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-dark text-white flex items-center justify-center text-sm">
                    {(selectedConversation.name || "?").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-brand-dark text-sm">{selectedConversation.name || "Anónimo"}</div>
                    <div className="text-xs text-gray-500 flex gap-2">
                      {selectedConversation.email && <span>{selectedConversation.email}</span>}
                      {selectedConversation.phone && <span>{selectedConversation.phone}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => deleteConversation(selectedConversation.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    title="Eliminar conversación"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => { setSelectedConversation(null); setMessages([]); }}
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-lg transition-colors"
                    title="Cerrar"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {detailLoading ? (
                  <div className="flex items-center justify-center h-full text-gray-500 gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Cargando mensajes...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    Sin mensajes.
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-brand-dark text-white rounded-br-none"
                          : "bg-gray-50 text-gray-800 rounded-bl-none border border-gray-100"
                      }`}>
                        <div className="flex items-center gap-1.5 mb-1">
                          {msg.role === "user" ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                          <span className="text-[10px] opacity-80 font-medium">{msg.role === "user" ? "Usuario" : "Sara"}{msg.source ? ` · ${msg.source.toUpperCase()}` : ""}</span>
                        </div>
                        {msg.content}
                        <div className="text-[10px] opacity-60 mt-1 text-right">{formatDate(msg.createdAt)}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
