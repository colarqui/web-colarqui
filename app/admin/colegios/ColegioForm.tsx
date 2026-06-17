"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2, Loader2 } from "lucide-react";

type ColegioForm = {
  id?: string;
  slug: string;
  nombre: string;
  descripcion: string;
  direccion: string;
  zona: string;
  telefono: string;
  email: string;
  facebook: string;
  calendario: "A" | "B";
  jornadas: string[];
  niveles: string[];
  estudiantes: number;
  docentes: number;
  fundacion: number;
  egresados: number | "";
  caracteristicas: string[];
  logo: string;
  publicado: boolean;
};

export default function ColegioForm({ initial }: { initial?: Partial<ColegioForm> }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<ColegioForm>({
    id: initial?.id,
    slug: initial?.slug || "",
    nombre: initial?.nombre || "",
    descripcion: initial?.descripcion || "",
    direccion: initial?.direccion || "",
    zona: initial?.zona || "",
    telefono: initial?.telefono || "",
    email: initial?.email || "",
    facebook: initial?.facebook || "",
    calendario: (initial?.calendario as "A" | "B") || "A",
    jornadas: initial?.jornadas || ["Mañana"],
    niveles: initial?.niveles || ["Preescolar", "Primaria", "Secundaria"],
    estudiantes: initial?.estudiantes ?? 0,
    docentes: initial?.docentes ?? 0,
    fundacion: initial?.fundacion ?? 2000,
    egresados: (initial?.egresados as number) ?? "",
    caracteristicas: initial?.caracteristicas || [],
    logo: initial?.logo || "",
    publicado: initial?.publicado ?? true,
  });

  function update<K extends keyof ColegioForm>(key: K, value: ColegioForm[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const url = form.id ? `/api/colegios/${form.id}` : "/api/colegios";
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
    router.push("/admin/colegios");
    router.refresh();
  }

  async function handleDelete() {
    if (!form.id) return;
    if (!confirm("¿Eliminar este colegio?")) return;
    await fetch(`/api/colegios/${form.id}`, { method: "DELETE" });
    router.push("/admin/colegios");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-200">{error}</div>
      )}

      <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Nombre">
            <input type="text" value={form.nombre} onChange={(e) => update("nombre", e.target.value)} required className="input" />
          </Field>
          <Field label="Slug" hint="Autogenerado si se deja vacío">
            <input type="text" value={form.slug} onChange={(e) => update("slug", e.target.value)} className="input" />
          </Field>
        </div>

        <Field label="Descripción">
          <textarea value={form.descripcion} onChange={(e) => update("descripcion", e.target.value)} rows={4} className="input" />
        </Field>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Dirección">
            <input type="text" value={form.direccion} onChange={(e) => update("direccion", e.target.value)} className="input" />
          </Field>
          <Field label="Zona">
            <input type="text" value={form.zona} onChange={(e) => update("zona", e.target.value)} className="input" />
          </Field>
          <Field label="Teléfono">
            <input type="text" value={form.telefono} onChange={(e) => update("telefono", e.target.value)} className="input" />
          </Field>
          <Field label="Email">
            <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="input" />
          </Field>
          <Field label="Facebook URL">
            <input type="url" value={form.facebook} onChange={(e) => update("facebook", e.target.value)} className="input" />
          </Field>
          <Field label="Logo" hint="Ruta local (/logos/...) o URL externa (https://...)">
            <input type="text" value={form.logo} onChange={(e) => update("logo", e.target.value)} className="input" />
          </Field>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <Field label="Calendario">
            <select value={form.calendario} onChange={(e) => update("calendario", e.target.value as "A" | "B")} className="input">
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </Field>
          <Field label="Estudiantes">
            <input type="number" value={form.estudiantes} onChange={(e) => update("estudiantes", Number(e.target.value))} className="input" />
          </Field>
          <Field label="Docentes">
            <input type="number" value={form.docentes} onChange={(e) => update("docentes", Number(e.target.value))} className="input" />
          </Field>
          <Field label="Año fundación">
            <input type="number" value={form.fundacion} onChange={(e) => update("fundacion", Number(e.target.value))} className="input" />
          </Field>
        </div>

        <ListField
          label="Jornadas"
          values={form.jornadas}
          onChange={(v) => update("jornadas", v)}
          placeholder="Mañana, Tarde, Única..."
        />
        <ListField
          label="Niveles"
          values={form.niveles}
          onChange={(v) => update("niveles", v)}
          placeholder="Preescolar, Primaria, Secundaria..."
        />
        <ListField
          label="Características"
          values={form.caracteristicas}
          onChange={(v) => update("caracteristicas", v)}
          placeholder="Una característica por línea"
        />

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.publicado}
              onChange={(e) => update("publicado", e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-semibold">Publicado</span>
          </label>
        </div>
      </div>

      <div className="flex justify-between items-center">
        {form.id && (
          <button type="button" onClick={handleDelete} className="inline-flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-semibold">
            <Trash2 className="h-4 w-4" /> Eliminar
          </button>
        )}
        <button type="submit" disabled={saving} className="ml-auto inline-flex items-center gap-2 bg-brand-dark text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-brand-dark/90 disabled:opacity-60">
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

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}

function ListField({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  return (
    <Field label={label} hint="Una por línea">
      <textarea
        value={values.join("\n")}
        onChange={(e) => onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
        rows={4}
        className="input"
        placeholder={placeholder}
      />
    </Field>
  );
}
