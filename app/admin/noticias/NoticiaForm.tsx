"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2, Loader2, ImagePlus, Eye, EyeOff, Bold, Italic, Heading, List, Link2, Quote, Minus, AlignLeft, AlignCenter, AlignRight, Hash, Code, Maximize2, X } from "lucide-react";

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
  const [showImageModal, setShowImageModal] = useState(false);
  const [pendingImageUrl, setPendingImageUrl] = useState("");
  const [imageSize, setImageSize] = useState("mediana");
  const [imageAlign, setImageAlign] = useState("centro");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [form, setForm] = useState<Noticia>({
    id: initial?.id,
    slug: initial?.slug || "",
    titulo: initial?.titulo || "",
    resumen: initial?.resumen || "",
    contenido: initial?.contenido || "",
    categoria: initial?.categoria || "Institucional",
    fecha: initial?.fecha ? new Date(initial.fecha).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
    autor: initial?.autor || "",
    imagen: initial?.imagen || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    destacada: initial?.destacada ?? false,
    publicada: initial?.publicada ?? true,
  });

  // Cargar autor desde la sesión del usuario cuando se crea una noticia nueva
  useEffect(() => {
    if (!initial?.id) {
      fetch("/api/auth/me")
        .then((res) => res.json())
        .then((data) => {
          if (data.user?.displayName) {
            setForm((prev) => ({ ...prev, autor: data.user.displayName }));
          }
        })
        .catch(() => {});
    }
  }, [initial?.id]);

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

  const insertImageWithOptions = useCallback((url: string, size: string, align: string) => {
    const widths: Record<string, string> = {
      pequena: "300",
      mediana: "600",
      grande: "900",
      completa: "100%",
    };
    const aligns: Record<string, string> = {
      izquierda: "margin: 1rem 1rem 1rem 0; float: left;",
      centro: "margin: 1rem auto; display: block;",
      derecha: "margin: 1rem 0 1rem 1rem; float: right;",
    };
    const width = widths[size] || "600";
    const style = aligns[align] || aligns.centro;
    const clearfix = align !== "centro" ? "\n<div style=\"clear: both;\"></div>\n" : "\n";
    const imgHtml = `<img src="${url}" width="${width}" style="max-width:100%;height:auto;border-radius:0.5rem;${style}" />${clearfix}`;
    insertAtCursor(imgHtml);
  }, [insertAtCursor]);

  const handleImageUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setImageUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error subiendo imagen");
      setPendingImageUrl(data.url);
      setImageSize("mediana");
      setImageAlign("centro");
      setShowImageModal(true);
    } catch (e: any) {
      setError(e.message || "Error subiendo imagen");
    } finally {
      setImageUploading(false);
    }
  }, []);

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

        <Field label="Contenido">
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200 flex-wrap">
              <button type="button" onClick={() => insertAtCursor("**texto**")} className="p-1.5 rounded hover:bg-gray-200 text-gray-600" title="Negrita">
                <Bold className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => insertAtCursor("*texto*")} className="p-1.5 rounded hover:bg-gray-200 text-gray-600" title="Cursiva">
                <Italic className="h-4 w-4" />
              </button>
              <div className="w-px h-5 bg-gray-300 mx-0.5" />
              <button type="button" onClick={() => insertAtCursor("## Título\n")} className="p-1.5 rounded hover:bg-gray-200 text-gray-600" title="Título grande">
                <Heading className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => insertAtCursor("### Subtítulo\n")} className="p-1.5 rounded hover:bg-gray-200 text-gray-600" title="Subtítulo">
                <Hash className="h-4 w-4" />
              </button>
              <div className="w-px h-5 bg-gray-300 mx-0.5" />
              <button type="button" onClick={() => insertAtCursor("- item\n")} className="p-1.5 rounded hover:bg-gray-200 text-gray-600" title="Lista con viñetas">
                <List className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => insertAtCursor("1. item\n")} className="p-1.5 rounded hover:bg-gray-200 text-gray-600" title="Lista numerada">
                <AlignLeft className="h-4 w-4" />
              </button>
              <div className="w-px h-5 bg-gray-300 mx-0.5" />
              <button type="button" onClick={() => insertAtCursor("\n> Cita destacada\n")} className="p-1.5 rounded hover:bg-gray-200 text-gray-600" title="Cita / Destacado">
                <Quote className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => insertAtCursor("[texto](https://url.com)")} className="p-1.5 rounded hover:bg-gray-200 text-gray-600" title="Link / Enlace">
                <Link2 className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => insertAtCursor("`código`")} className="p-1.5 rounded hover:bg-gray-200 text-gray-600" title="Código">
                <Code className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => insertAtCursor("\n---\n")} className="p-1.5 rounded hover:bg-gray-200 text-gray-600" title="Línea divisoria">
                <Minus className="h-4 w-4" />
              </button>
              <div className="w-px h-5 bg-gray-300 mx-0.5" />
              <button
                type="button"
                onClick={() => insertAtCursor("\n| Columna 1 | Columna 2 |\n| --- | --- |\n| Dato 1 | Dato 2 |\n")}
                className="p-1.5 rounded hover:bg-gray-200 text-gray-600"
                title="Tabla"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="12" y1="3" x2="12" y2="21"/></svg>
              </button>
              <label className="p-1.5 rounded hover:bg-gray-200 text-gray-600 cursor-pointer relative" title="Insertar imagen">
                <ImagePlus className="h-4 w-4" />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageInput} disabled={imageUploading} />
              </label>
              <div className="flex-1 min-w-[4px]" />
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
                placeholder="Escribe aquí el contenido de la noticia. Puedes usar las herramientas de arriba o pegar imágenes directamente (Ctrl+V)."
              />
            )}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            💡 Pega imágenes directamente (Ctrl+V) o usa el botón de imagen. Cuando subas una imagen, podrás elegir el tamaño y la alineación.
          </p>
        </Field>

        {/* Modal de configuración de imagen */}
        {showImageModal && pendingImageUrl && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-brand-dark">Configurar imagen</h3>
                <button
                  type="button"
                  onClick={() => { setShowImageModal(false); setPendingImageUrl(""); }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <img src={pendingImageUrl} alt="Preview" className="w-full max-h-48 object-contain rounded-lg border mb-4" />

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tamaño</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: "pequena", label: "Pequeña", desc: "300px" },
                      { key: "mediana", label: "Mediana", desc: "600px" },
                      { key: "grande", label: "Grande", desc: "900px" },
                      { key: "completa", label: "Ancho completo", desc: "100%" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setImageSize(opt.key)}
                        className={`p-2 rounded-lg border text-sm text-left transition-colors ${
                          imageSize === opt.key
                            ? "border-brand-gold bg-brand-gold/10 text-brand-dark font-medium"
                            : "border-gray-200 hover:bg-gray-50 text-gray-600"
                        }`}
                      >
                        {opt.label}
                        <span className="block text-xs text-gray-400">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Alineación</label>
                  <div className="flex gap-2">
                    {[
                      { key: "izquierda", label: "Izquierda", icon: AlignLeft },
                      { key: "centro", label: "Centro", icon: AlignCenter },
                      { key: "derecha", label: "Derecha", icon: AlignRight },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setImageAlign(opt.key)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-sm transition-colors ${
                          imageAlign === opt.key
                            ? "border-brand-gold bg-brand-gold/10 text-brand-dark font-medium"
                            : "border-gray-200 hover:bg-gray-50 text-gray-600"
                        }`}
                      >
                        <opt.icon className="h-4 w-4" />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => { setShowImageModal(false); setPendingImageUrl(""); }}
                    className="flex-1 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      insertImageWithOptions(pendingImageUrl, imageSize, imageAlign);
                      setShowImageModal(false);
                      setPendingImageUrl("");
                    }}
                    className="flex-1 py-2 text-sm text-brand-dark bg-brand-gold hover:bg-brand-gold/90 rounded-lg font-medium"
                  >
                    Insertar imagen
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
          <Field label="Autor" hint="Se completa automáticamente con el nombre del usuario conectado">
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
