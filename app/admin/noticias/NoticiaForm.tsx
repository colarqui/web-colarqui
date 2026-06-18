"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2, Loader2, ImagePlus, Eye, EyeOff, Bold, Italic, Heading, List, Link2 } from "lucide-react";

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
  const [imageUploading, setImageUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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

  const insertAtCursor = useCallback((text: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const before = ta.value.slice(0, start);
    const after = ta.value.slice(end);
    const newValue = before + text + after;
    update("contenido", newValue);
    setTimeout(() => {
      ta.selectionStart = ta.selectionEnd = start + text.length;
      ta.focus();
    }, 0);
  }, [form.contenido]);

  const handleImageUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setImageUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error subiendo imagen");
      const imgHtml = `<img src="${data.url}" width="400" style="max-width:100%;height:auto;display:block;margin:1rem 0;border-radius:0.5rem;" />\n`;
      insertAtCursor(imgHtml);
    } catch (e: any) {
      setError(e.message || "Error subiendo imagen");
    } finally {
      setImageUploading(false);
    }
  }, [insertAtCursor]);

  const handlePaste = useCallback(async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const files = Array.from(e.clipboardData.files);
    const imageFile = files.find((f) => f.type.startsWith("image/"));
    if (imageFile) {
      e.preventDefault();
      await handleImageUpload(imageFile);
    }
  }, [handleImageUpload]);

  const handleImageInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleImageUpload(file);
    e.target.value = "";
  }, [handleImageUpload]);

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
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center gap-1 px-3 py-2 bg-gray-50 border-b border-gray-200">
              <button
                type="button"
                onClick={() => insertAtCursor("**texto**")}
                className="p-1.5 rounded hover:bg-gray-200 text-gray-600"
                title="Negrita"
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => insertAtCursor("*texto*")}
                className="p-1.5 rounded hover:bg-gray-200 text-gray-600"
                title="Cursiva"
              >
                <Italic className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => insertAtCursor("## Título\n")}
                className="p-1.5 rounded hover:bg-gray-200 text-gray-600"
                title="Título"
              >
                <Heading className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => insertAtCursor("- item\n")}
                className="p-1.5 rounded hover:bg-gray-200 text-gray-600"
                title="Lista"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => insertAtCursor("[texto](https://url.com)")}
                className="p-1.5 rounded hover:bg-gray-200 text-gray-600"
                title="Link"
              >
                <Link2 className="h-4 w-4" />
              </button>
              <div className="w-px h-5 bg-gray-300 mx-1" />
              <label className="p-1.5 rounded hover:bg-gray-200 text-gray-600 cursor-pointer relative">
                <ImagePlus className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageInput}
                  disabled={imageUploading}
                />
              </label>
              <div className="flex-1" />
              <button
                type="button"
                onClick={() => setShowPreview((p) => !p)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-brand-dark px-2 py-1 rounded hover:bg-gray-200"
              >
                {showPreview ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                {showPreview ? "Editar" : "Vista previa"}
              </button>
            </div>

            {imageUploading && (
              <div className="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                Subiendo imagen…
              </div>
            )}

            {showPreview ? (
              <div
                className="p-4 prose prose-sm max-w-none bg-white min-h-[320px]"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(form.contenido) }}
              />
            ) : (
              <textarea
                ref={textareaRef}
                value={form.contenido}
                onChange={(e) => update("contenido", e.target.value)}
                onPaste={handlePaste}
                required
                rows={14}
                className="w-full px-4 py-3 text-sm font-mono bg-white focus:outline-none resize-y min-h-[320px]"
                placeholder="Escribe el contenido en Markdown. También puedes pegar imágenes directamente aquí."
              />
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Pega imágenes directamente (Ctrl+V) o usa el botón de imagen. Para redimensionar, cambia el número en {"width=\"400\""} del código HTML.
          </p>
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

function markdownToHtml(md: string): string {
  return md
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-3 rounded-lg overflow-x-auto text-xs my-2"><code>$1</code></pre>')
    // Headings
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-5 mb-2">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">$1</a>')
    // Lists
    .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc">$1</li>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg my-2 max-w-full h-auto" />')
    // Paragraphs (must be last)
    .split('\n\n').map(p => p.trim() ? `<p class="mb-2 leading-relaxed">${p.replace(/\n/g, '<br/>')}</p>` : '').join('\n');
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
