"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2, Loader2 } from "lucide-react";

type Noticia = {
  id?: string;
  slug?: string;
  titulo: string;
  resumen: string;
  contenido: string;
  categoria: string;
  fecha: string;
  autor: string;
  imagen: string;
  destacada: boolean;
  publicada: boolean;
};

const CATEGORIAS = ["Académico", "Admisiones", "Comunidad", "Institucional", "Pastoral", "Cultura", "Deportes"];

export default function NoticiaForm({ initial }: { initial?: Partial<Noticia> }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<Noticia>({
    id: initial?.id,
    slug: initial?.slug || "",
    titulo: initial?.titulo || "",
    resumen: initial?.resumen || "",
    contenido: initial?.contenido || "",
    categoria: initial?.categoria || "Institucional",
    fecha: initial?.fecha ? new Date(initial.fecha).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
    autor: initial?.autor || "Oficina de Comunicaciones",
    imagen: initial?.imagen || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    destacada: initial?.destacada ?? false,
    publicada: initial?.publicada ?? true,
  });

  function update<K extends keyof Noticia>(key: K, value: Noticia[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const url = form.id ? `/api/noticias/${form.id}` : "/api/noticias";
    const method = form.id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Error al guardar");
      setSaving(false);
      return;
    }
    router.push("/admin/noticias");
    router.refresh();
  }

  async function handleDelete() {
    if (!form.id) return;
    if (!confirm("¿Eliminar esta noticia? Esta acción no se puede deshacer.")) return;
    setDeleting(true);
    await fetch(`/api/noticias/${form.id}`, { method: "DELETE" });
    router.push("/admin/noticias");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-200">{error}</div>
      )}

      <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4">
        <Field label="Título">
          <input
            type="text"
            value={form.titulo}
            onChange={(e) => update("titulo", e.target.value)}
            required
            className="input"
          />
        </Field>

        <Field label="Slug (URL)" hint="Déjalo vacío para autogenerar">
          <input
            type="text"
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            className="input"
            placeholder="titulo-de-la-noticia"
          />
        </Field>

        <Field label="Resumen">
          <textarea
            value={form.resumen}
            onChange={(e) => update("resumen", e.target.value)}
            required
            rows={2}
            className="input"
          />
        </Field>

        <Field label="Contenido (Markdown)">
          <textarea
            value={form.contenido}
            onChange={(e) => update("contenido", e.target.value)}
            required
            rows={14}
            className="input font-mono text-sm"
          />
        </Field>

        <div className="grid md:grid-cols-3 gap-4">
          <Field label="Categoría">
            <select
              value={form.categoria}
              onChange={(e) => update("categoria", e.target.value)}
              className="input"
            >
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Fecha">
            <input
              type="date"
              value={form.fecha}
              onChange={(e) => update("fecha", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Autor">
            <input
              type="text"
              value={form.autor}
              onChange={(e) => update("autor", e.target.value)}
              className="input"
            />
          </Field>
        </div>

        <Field label="URL de imagen">
          <input
            type="url"
            value={form.imagen}
            onChange={(e) => update("imagen", e.target.value)}
            className="input"
          />
          {form.imagen && (
            <img src={form.imagen} alt="preview" className="mt-2 max-h-40 rounded-lg border" />
          )}
        </Field>

        <div className="flex gap-6 pt-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.destacada}
              onChange={(e) => update("destacada", e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-semibold">Destacada</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.publicada}
              onChange={(e) => update("publicada", e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-semibold">Publicada</span>
          </label>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          {form.id && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              <Trash2 className="h-4 w-4" /> Eliminar
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-brand-dark text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-brand-dark/90 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border-radius: 0.625rem;
          border: 1px solid #e5e7eb;
          background: white;
          font-size: 0.875rem;
        }
        :global(.input:focus) {
          outline: none;
          border-color: #fbb823;
          box-shadow: 0 0 0 3px rgba(251, 184, 35, 0.2);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}
