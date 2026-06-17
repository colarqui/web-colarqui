"use client";

import { useEffect, useState } from "react";
import { Upload, Trash2, FileText, Loader2, Eye, EyeOff, Download } from "lucide-react";

type Doc = {
  id: string;
  titulo: string;
  descripcion: string | null;
  categoria: string;
  nombreArchivo: string;
  tamano: number;
  paginas: number;
  activo: boolean;
  createdAt: string;
};

const CATEGORIAS = ["General", "Admisiones", "Reglamento", "Académico", "Transparencia", "Pastoral"];

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function DocumentosManager() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    categoria: "General",
    file: null as File | null,
  });

  async function loadDocs() {
    setLoading(true);
    try {
      const res = await fetch("/api/documentos");
      const data = await res.json();
      setDocs(data);
    } catch (e) {
      setError("Error al cargar documentos");
    }
    setLoading(false);
  }

  useEffect(() => {
    loadDocs();
  }, []);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!form.file || !form.titulo.trim()) {
      setError("Título y archivo son requeridos");
      return;
    }
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", form.file);
    fd.append("titulo", form.titulo);
    fd.append("descripcion", form.descripcion);
    fd.append("categoria", form.categoria);

    const res = await fetch("/api/documentos", { method: "POST", body: fd });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Error al subir");
      setUploading(false);
      return;
    }
    setForm({ titulo: "", descripcion: "", categoria: "General", file: null });
    const fileInput = document.getElementById("pdf-file") as HTMLInputElement | null;
    if (fileInput) fileInput.value = "";
    setUploading(false);
    await loadDocs();
  }

  async function toggleActive(doc: Doc) {
    await fetch(`/api/documentos/${doc.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activo: !doc.activo }),
    });
    await loadDocs();
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este PDF? También se eliminará del disco.")) return;
    await fetch(`/api/documentos/${id}`, { method: "DELETE" });
    await loadDocs();
  }

  return (
    <div className="space-y-8">
      {/* Upload */}
      <form onSubmit={handleUpload} className="bg-white p-6 rounded-2xl border border-gray-100">
        <h2 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
          <Upload className="h-5 w-5" /> Subir nuevo documento
        </h2>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-200 mb-4">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
            <input
              type="text"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
              placeholder="Ej: Reglamento de admisiones 2026"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Categoría</label>
            <select
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
            >
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción (opcional)</label>
            <input
              type="text"
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Archivo PDF</label>
            <input
              id="pdf-file"
              type="file"
              accept="application/pdf,.pdf"
              onChange={(e) => setForm({ ...form, file: e.target.files?.[0] ?? null })}
              required
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-dark file:text-white file:cursor-pointer"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="mt-4 inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-5 py-2.5 rounded-xl font-semibold hover:bg-brand-gold/90 disabled:opacity-60"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? "Procesando PDF..." : "Subir documento"}
        </button>
      </form>

      {/* Lista */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-brand-dark">Documentos cargados ({docs.length})</h2>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-500 flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Cargando...
          </div>
        ) : docs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            Aún no hay documentos. Sube el primero arriba.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Páginas</th>
                <th className="px-4 py-3">Tamaño</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {docs.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-brand-dark flex items-center gap-2">
                      <FileText className="h-4 w-4 text-red-500" />
                      {doc.titulo}
                    </div>
                    {doc.descripcion && (
                      <div className="text-xs text-gray-500 ml-6">{doc.descripcion}</div>
                    )}
                    <div className="text-xs text-gray-400 ml-6">{doc.nombreArchivo}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{doc.categoria}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{doc.paginas}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{formatBytes(doc.tamano)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(doc)}
                      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded ${
                        doc.activo ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {doc.activo ? (
                        <>
                          <Eye className="h-3 w-3" /> Activo
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3" /> Oculto
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <a
                      href={`/api/documentos/${doc.id}/descargar`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-gray-600 hover:text-brand-dark text-sm"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </a>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="inline-flex items-center gap-1 text-red-600 hover:bg-red-50 px-2 py-1 rounded text-sm"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
