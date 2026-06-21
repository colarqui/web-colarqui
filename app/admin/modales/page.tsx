"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus, Pencil, Trash2, Eye, EyeOff, ArrowUp, ArrowDown,
  ImagePlus, BadgeCheck, Type, Link, Calendar, Clock, MousePointer,
  ChevronDown, X, Save, AlertTriangle,
} from "lucide-react";

interface Modal {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  badge: string | null;
  ctaText: string | null;
  ctaUrl: string | null;
  pageUrl: string;
  startDate: string | null;
  endDate: string | null;
  trigger: string;
  delaySeconds: number;
  scrollPercent: number;
  isActive: boolean;
  showOnce: boolean;
  position: string;
  order: number;
  createdAt: string;
}

const emptyModal: Partial<Modal> = {
  title: "",
  content: "",
  imageUrl: "",
  badge: "",
  ctaText: "",
  ctaUrl: "",
  pageUrl: "*",
  startDate: "",
  endDate: "",
  trigger: "immediate",
  delaySeconds: 0,
  scrollPercent: 0,
  isActive: true,
  showOnce: true,
  position: "center",
  order: 0,
};

export default function ModalesAdminPage() {
  const router = useRouter();
  const [modales, setModales] = useState<Modal[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Modal> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchModales();
  }, []);

  async function fetchModales() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/modales", { credentials: "include" });
      if (!res.ok) { if (res.status === 401) router.push("/admin/login"); return; }
      setModales(await res.json());
    } catch { /* ignore */ }
    setLoading(false);
  }

  function openCreate() { setEditing({ ...emptyModal }); setError(""); }
  function openEdit(m: Modal) { setEditing({ ...m }); setError(""); }
  function closeForm() { setEditing(null); setError(""); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    if (!editing.title?.trim()) { setError("El título es obligatorio"); return; }
    setSaving(true);

    const payload: any = { ...editing };
    if (!payload.startDate) delete payload.startDate;
    if (!payload.endDate) delete payload.endDate;

    try {
      const url = editing.id ? `/api/admin/modales/${editing.id}` : "/api/admin/modales";
      const method = editing.id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      if (!res.ok) { const data = await res.json(); setError(data.error || "Error al guardar"); }
      else { closeForm(); fetchModales(); }
    } catch { setError("Error de red"); }
    setSaving(false);
  }

  async function toggleActive(m: Modal) {
    await fetch(`/api/admin/modales/${m.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !m.isActive }),
      credentials: "include",
    });
    fetchModales();
  }

  async function handleDelete() {
    if (!deleteId) return;
    await fetch(`/api/admin/modales/${deleteId}`, { method: "DELETE", credentials: "include" });
    setDeleteId(null);
    fetchModales();
  }

  async function moveOrder(id: string, direction: "up" | "down") {
    const idx = modales.findIndex((m) => m.id === id);
    if (idx === -1) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= modales.length) return;

    const current = modales[idx];
    const swap = modales[swapIdx];
    await Promise.all([
      fetch(`/api/admin/modales/${current.id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: swap.order }), credentials: "include",
      }),
      fetch(`/api/admin/modales/${swap.id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: current.order }), credentials: "include",
      }),
    ]);
    fetchModales();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">Modales Interactivos</h1>
          <p className="text-gray-500 text-sm mt-1">Gestiona popups, banners y modales para todo el sitio</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-4 py-2.5 rounded-xl font-semibold hover:bg-brand-gold/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nuevo modal
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-12 pb-12 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-brand-dark">
                {editing.id ? "Editar Modal" : "Nuevo Modal"}
              </h2>
              <button onClick={closeForm} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" /> {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                  <input
                    type="text"
                    value={editing.title ?? ""}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                    placeholder="Ej: Feria de admisiones 2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Badge (etiqueta)</label>
                  <input
                    type="text"
                    value={editing.badge ?? ""}
                    onChange={(e) => setEditing({ ...editing, badge: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                    placeholder="Ej: Nuevo"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                <textarea
                  rows={3}
                  value={editing.content ?? ""}
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  placeholder="Texto del modal..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Imagen URL</label>
                  <input
                    type="text"
                    value={editing.imageUrl ?? ""}
                    onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Página objetivo</label>
                  <input
                    type="text"
                    value={editing.pageUrl ?? "*"}
                    onChange={(e) => setEditing({ ...editing, pageUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                    placeholder="* = todas, /colegios = específica"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CTA Texto</label>
                  <input
                    type="text"
                    value={editing.ctaText ?? ""}
                    onChange={(e) => setEditing({ ...editing, ctaText: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                    placeholder="Ej: Más información"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CTA URL</label>
                  <input
                    type="text"
                    value={editing.ctaUrl ?? ""}
                    onChange={(e) => setEditing({ ...editing, ctaUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                    placeholder="https://... o /admisiones"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trigger</label>
                  <select
                    value={editing.trigger ?? "immediate"}
                    onChange={(e) => setEditing({ ...editing, trigger: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  >
                    <option value="immediate">Inmediato</option>
                    <option value="delay">Retraso (seg)</option>
                    <option value="scroll">Scroll (%)</option>
                    <option value="exit_intent">Salir de página</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Retraso (seg)</label>
                  <input
                    type="number"
                    min={0}
                    value={editing.delaySeconds ?? 0}
                    onChange={(e) => setEditing({ ...editing, delaySeconds: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scroll (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={editing.scrollPercent ?? 0}
                    onChange={(e) => setEditing({ ...editing, scrollPercent: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio</label>
                  <input
                    type="datetime-local"
                    value={editing.startDate ? new Date(editing.startDate).toISOString().slice(0, 16) : ""}
                    onChange={(e) => setEditing({ ...editing, startDate: e.target.value ? new Date(e.target.value).toISOString() : "" })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha fin</label>
                  <input
                    type="datetime-local"
                    value={editing.endDate ? new Date(editing.endDate).toISOString().slice(0, 16) : ""}
                    onChange={(e) => setEditing({ ...editing, endDate: e.target.value ? new Date(e.target.value).toISOString() : "" })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Posición</label>
                  <select
                    value={editing.position ?? "center"}
                    onChange={(e) => setEditing({ ...editing, position: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  >
                    <option value="center">Centro</option>
                    <option value="bottom_right">Abajo derecha</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Orden</label>
                  <input
                    type="number"
                    value={editing.order ?? 0}
                    onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent"
                  />
                </div>
                <div className="flex items-end gap-4 pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editing.isActive ?? true}
                      onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                    />
                    <span className="text-sm text-gray-700">Activo</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editing.showOnce ?? true}
                      onChange={(e) => setEditing({ ...editing, showOnce: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                    />
                    <span className="text-sm text-gray-700">1 vez</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-6 py-2.5 rounded-xl font-semibold hover:bg-brand-gold/90 transition-colors disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {saving ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="font-bold text-brand-dark">¿Eliminar modal?</h3>
            </div>
            <p className="text-gray-600 text-sm mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium">
                Cancelar
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-400">Cargando...</div>
      ) : modales.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <ImagePlus className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No hay modales creados</p>
          <p className="text-gray-400 text-sm mt-1">Crea tu primer modal interactivo</p>
        </div>
      ) : (
        <div className="space-y-3">
          {modales.map((m, idx) => (
            <div
              key={m.id}
              className={`bg-white rounded-xl border p-4 flex items-center gap-4 transition-shadow hover:shadow-sm ${
                m.isActive ? "border-gray-200" : "border-gray-100 opacity-60"
              }`}
            >
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveOrder(m.id, "up")}
                  disabled={idx === 0}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                >
                  <ArrowUp className="h-3 w-3" />
                </button>
                <button
                  onClick={() => moveOrder(m.id, "down")}
                  disabled={idx === modales.length - 1}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                >
                  <ArrowDown className="h-3 w-3" />
                </button>
              </div>

              {m.imageUrl ? (
                <img src={m.imageUrl} alt="" className="w-16 h-16 rounded-lg object-cover bg-gray-100 flex-shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <ImagePlus className="h-6 w-6 text-gray-300" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-brand-dark truncate">{m.title}</span>
                  {m.badge && (
                    <span className="px-2 py-0.5 bg-brand-gold/10 text-brand-dark text-xs rounded-full font-medium flex-shrink-0">
                      {m.badge}
                    </span>
                  )}
                  {m.trigger !== "immediate" && (
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full font-medium flex-shrink-0 capitalize">
                      {m.trigger.replace("_", " ")}
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm truncate">{m.content || "Sin contenido"}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Link className="h-3 w-3" /> {m.pageUrl === "*" ? "Todas las páginas" : m.pageUrl}
                  </span>
                  {m.startDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {new Date(m.startDate).toLocaleDateString("es-CO")}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => toggleActive(m)}
                  className={`p-2 rounded-lg transition-colors ${m.isActive ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"}`}
                  title={m.isActive ? "Desactivar" : "Activar"}
                >
                  {m.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => openEdit(m)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteId(m.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
