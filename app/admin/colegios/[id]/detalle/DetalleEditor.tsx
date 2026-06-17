"use client";

import { useState, useEffect } from "react";
import {
  BookOpen, GraduationCap, Users, Music, Palette, Dumbbell, Code2,
  FlaskConical, Globe, Heart, Trophy, Microscope, Calculator, Laptop,
  Leaf, Star, Languages, Lightbulb, Church, PenTool,
  Plus, Trash2, Save, Loader2, CheckCircle, Upload, Video
} from "lucide-react";

type OfertaItem    = { icono: string; titulo: string; descripcion: string };
type MiembroEquipo = { nombre: string; cargo: string; foto: string };
type Testimonio      = { texto: string; nombre: string; relacion: string; foto: string };
type TestimonioVideo = { titulo: string; autor: string; url: string; tipo: "url" | "local"; thumbnail: string };
type GaleriaItem     = { url: string; alt: string };
type CostoGrado    = { grado: string; matricula: string; descMatricula: string; pension: string; descPension: string };

type Detalle = {
  ofertaTitulo:     string;
  ofertaCopy:       string;
  ofertaItems:      OfertaItem[];
  equipo:           MiembroEquipo[];
  testimonios:      Testimonio[];
  testimoniosVideo: TestimonioVideo[];
  galeria:          GaleriaItem[];
  costos:           CostoGrado[];
  heroFondo:        string;
  heroOverlay:      number;
  heroOverlayColor: string;
  heroContenedor:   string;
};

const TABS = ["Hero", "Oferta Académica", "Equipo Directivo", "Testimonios", "Testimonios en video", "Galería", "Costos"] as const;

const ICONOS = [
  { key: "BookOpen",     label: "Académica",      Icon: BookOpen },
  { key: "GraduationCap",label: "Bachillerato",   Icon: GraduationCap },
  { key: "Users",        label: "Comunidad",       Icon: Users },
  { key: "Music",        label: "Música",          Icon: Music },
  { key: "Palette",      label: "Arte",            Icon: Palette },
  { key: "Dumbbell",     label: "Deportes",        Icon: Dumbbell },
  { key: "Code2",        label: "Tecnología",      Icon: Code2 },
  { key: "FlaskConical", label: "Ciencias",        Icon: FlaskConical },
  { key: "Globe",        label: "Idiomas",         Icon: Globe },
  { key: "Heart",        label: "Pastoral",        Icon: Heart },
  { key: "Trophy",       label: "Logros",          Icon: Trophy },
  { key: "Microscope",   label: "Laboratorio",     Icon: Microscope },
  { key: "Calculator",   label: "Matemáticas",     Icon: Calculator },
  { key: "Laptop",       label: "Digital",         Icon: Laptop },
  { key: "Leaf",         label: "Ambiente",        Icon: Leaf },
  { key: "Star",         label: "Complementario",  Icon: Star },
  { key: "Languages",    label: "Bilingüismo",     Icon: Languages },
  { key: "Lightbulb",    label: "Innovación",      Icon: Lightbulb },
  { key: "Church",       label: "Religión",        Icon: Church },
  { key: "PenTool",      label: "Escritura",       Icon: PenTool },
];

export function IconoDisplay({ icono, className = "h-6 w-6" }: { icono: string; className?: string }) {
  const found = ICONOS.find((i) => i.key === icono);
  if (!found) return null;
  return <found.Icon className={className} />;
}

function emptyOferta():    OfertaItem    { return { icono: "BookOpen", titulo: "", descripcion: "" }; }
function emptyEquipo():    MiembroEquipo { return { nombre: "", cargo: "", foto: "" }; }
function emptyTestimonio():      Testimonio      { return { texto: "", nombre: "", relacion: "", foto: "" }; }
function emptyTestimonioVideo(): TestimonioVideo { return { titulo: "", autor: "", url: "", tipo: "url", thumbnail: "" }; }
function emptyGaleria():         GaleriaItem     { return { url: "", alt: "" }; }
function emptyCosto():     CostoGrado    { return { grado: "", matricula: "", descMatricula: "", pension: "", descPension: "" }; }

const inputCls = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30";
const labelCls = "block text-xs font-semibold text-gray-600 mb-1";

export default function DetalleEditor({
  colegioId,
  isCalB,
  nombreColegio,
}: {
  colegioId: string;
  isCalB: boolean;
  nombreColegio: string;
}) {
  const [tab, setTab]       = useState<(typeof TABS)[number]>("Oferta Académica");
  const [data, setData]     = useState<Detalle | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);
  const [error, setError]   = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`/api/colegios/detalle/${colegioId}`)
      .then((r) => r.json())
      .then((d) => {
        setData({
          ofertaTitulo: d.ofertaTitulo ?? "Nuestra Oferta Académica",
          ofertaCopy:   d.ofertaCopy   ?? "",
          ofertaItems:  (d.ofertaItems  ?? []).map((i: any) => ({ icono: i.icono ?? "BookOpen", titulo: i.titulo ?? "", descripcion: i.descripcion ?? "" })),
          equipo:       (d.equipo       ?? []).map((m: any) => ({ nombre: m.nombre ?? "", cargo: m.cargo ?? "", foto: m.foto ?? "" })),
          testimonios:      (d.testimonios      ?? []).map((t: any) => ({ texto: t.texto ?? "", nombre: t.nombre ?? "", relacion: t.relacion ?? "", foto: t.foto ?? "" })),
          testimoniosVideo: (d.testimoniosVideo ?? []).map((v: any) => ({ titulo: v.titulo ?? "", autor: v.autor ?? "", url: v.url ?? "", tipo: v.tipo ?? "url", thumbnail: v.thumbnail ?? "" })),
          galeria:          (d.galeria          ?? []).map((g: any) => ({ url: g.url ?? "", alt: g.alt ?? "" })),
          costos:       (d.costos       ?? []).map((c: any) => ({ grado: c.grado ?? "", matricula: String(c.matricula ?? ""), descMatricula: String(c.descMatricula ?? ""), pension: String(c.pension ?? ""), descPension: String(c.descPension ?? "") })),
          heroFondo:        d.heroFondo        ?? "",
          heroOverlay:      d.heroOverlay      ?? 80,
          heroOverlayColor: d.heroOverlayColor ?? "#000000",
          heroContenedor:   d.heroContenedor   ?? "",
        });
      });
  }, [colegioId]);

  async function save() {
    if (!data) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/colegios/detalle/${colegioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          costos: data.costos.map((c) => ({
            grado:           c.grado,
            matricula:       Number(c.matricula) || 0,
            descMatricula:   Number(c.descMatricula) || null,
            pension:         Number(c.pension) || 0,
            descPension:     Number(c.descPension) || null,
          })),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Error guardando");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err?.message ?? "Error al guardar. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  }

  function updateField<K extends keyof Detalle>(key: K, value: Detalle[K]) {
    setData((d) => d ? { ...d, [key]: value } : d);
  }

  function updateItem<K extends keyof Detalle>(key: K, index: number, field: string, value: string) {
    setData((d) => {
      if (!d) return d;
      const arr = [...(d[key] as any[])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...d, [key]: arr };
    });
  }

  function addItem<K extends keyof Detalle>(key: K, empty: any) {
    setData((d) => d ? { ...d, [key]: [...(d[key] as any[]), empty] } : d);
  }

  function removeItem<K extends keyof Detalle>(key: K, index: number) {
    setData((d) => {
      if (!d) return d;
      const arr = (d[key] as any[]).filter((_, i) => i !== index);
      return { ...d, [key]: arr };
    });
  }

  if (!data) return <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin h-6 w-6 text-brand-gold" /></div>;

  const visibleTabs = isCalB ? TABS : TABS.filter((t) => t !== "Costos");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        {visibleTabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
              tab === t ? "bg-brand-dark text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── HERO ── */}
      {tab === "Hero" && (
        <div className="space-y-6">
          <p className="text-sm text-gray-500">
            Configura las imágenes del bloque Hero de la página del colegio. Puedes pegar una URL o subir una imagen local.
          </p>

          {/* Foto de fondo */}
          <div className="bg-gray-50 p-4 rounded-xl space-y-3">
            <h3 className="font-semibold text-brand-dark text-sm">Foto de fondo (detrás del overlay)</h3>
            <div className="flex gap-2">
              <input
                className={inputCls}
                placeholder="https://... o /images/..."
                value={data.heroFondo ?? ""}
                onChange={(e) => updateField("heroFondo", e.target.value)}
              />
              <label className="cursor-pointer flex items-center justify-center bg-brand-dark text-white rounded-lg px-3 py-2 hover:bg-brand-dark/90 transition-colors shrink-0" title="Subir imagen">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                <input type="file" accept="image/*" className="hidden" disabled={uploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0]; if (!file) return;
                    setUploading(true); setError("");
                    const fd = new FormData(); fd.append("file", file);
                    try {
                      const res = await fetch("/api/upload", { method: "POST", body: fd });
                      const json = await res.json();
                      if (!res.ok) throw new Error(json.error || "Error");
                      updateField("heroFondo", json.url);
                    } catch (err: any) { setError(err.message); }
                    finally { setUploading(false); e.target.value = ""; }
                  }}
                />
              </label>
            </div>
            {data.heroFondo && (
              <div className="relative rounded-xl overflow-hidden h-32">
                <img src={data.heroFondo} alt="Preview fondo" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `${data.heroOverlayColor ?? "#000000"}`, opacity: (data.heroOverlay ?? 80) / 100 }} />
                <span className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-0.5 rounded">Preview con overlay</span>
              </div>
            )}
          </div>

          {/* Color y porcentaje overlay */}
          <div className="bg-gray-50 p-4 rounded-xl space-y-3">
            <h3 className="font-semibold text-brand-dark text-sm">
              Overlay: <span className="text-brand-coral font-bold">{data.heroOverlay ?? 80}% de opacidad</span>
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className={labelCls + " mb-0"}>Color</label>
                <div className="relative">
                  <input
                    type="color"
                    value={data.heroOverlayColor ?? "#000000"}
                    onChange={(e) => updateField("heroOverlayColor", e.target.value)}
                    className="h-9 w-14 cursor-pointer rounded-lg border border-gray-200 p-0.5 bg-white"
                  />
                </div>
                <span className="text-xs text-gray-500 font-mono">{data.heroOverlayColor ?? "#000000"}</span>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={data.heroOverlay ?? 80}
              onChange={(e) => updateField("heroOverlay", Number(e.target.value))}
              className="w-full accent-brand-coral"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>0% (sin overlay)</span>
              <span>100% (opaco total)</span>
            </div>
            {data.heroFondo && (
              <div className="text-xs text-gray-400">
                Preview actualizado arriba con color + opacidad seleccionados
              </div>
            )}
          </div>

          {/* Foto del contenedor visible */}
          <div className="bg-gray-50 p-4 rounded-xl space-y-3">
            <h3 className="font-semibold text-brand-dark text-sm">Foto del contenedor (panel derecho del hero)</h3>
            <div className="flex gap-2">
              <input
                className={inputCls}
                placeholder="https://... o /images/..."
                value={data.heroContenedor ?? ""}
                onChange={(e) => updateField("heroContenedor", e.target.value)}
              />
              <label className="cursor-pointer flex items-center justify-center bg-brand-dark text-white rounded-lg px-3 py-2 hover:bg-brand-dark/90 transition-colors shrink-0" title="Subir imagen">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                <input type="file" accept="image/*" className="hidden" disabled={uploading}
                  onChange={async (e) => {
                    const file = e.target.files?.[0]; if (!file) return;
                    setUploading(true); setError("");
                    const fd = new FormData(); fd.append("file", file);
                    try {
                      const res = await fetch("/api/upload", { method: "POST", body: fd });
                      const json = await res.json();
                      if (!res.ok) throw new Error(json.error || "Error");
                      updateField("heroContenedor", json.url);
                    } catch (err: any) { setError(err.message); }
                    finally { setUploading(false); e.target.value = ""; }
                  }}
                />
              </label>
            </div>
            {data.heroContenedor && (
              <img src={data.heroContenedor} alt="Preview contenedor" className="h-32 w-full object-cover rounded-xl" />
            )}
          </div>
        </div>
      )}

      {/* ── OFERTA ACADÉMICA ── */}
      {tab === "Oferta Académica" && (
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Título de sección</label>
            <input className={inputCls} value={data.ofertaTitulo} onChange={(e) => updateField("ofertaTitulo", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Texto introductorio</label>
            <textarea rows={3} className={inputCls} value={data.ofertaCopy} onChange={(e) => updateField("ofertaCopy", e.target.value)} />
          </div>
          <div className="space-y-3">
            {data.ofertaItems.map((item, i) => (
              <div key={i} className="grid grid-cols-[120px_1fr_1fr_36px] gap-2 items-start bg-gray-50 p-3 rounded-xl">
                <div>
                  <label className={labelCls}>Ícono</label>
                  <select
                    className={inputCls}
                    value={item.icono}
                    onChange={(e) => updateItem("ofertaItems", i, "icono", e.target.value)}
                  >
                    {ICONOS.map((ic) => (
                      <option key={ic.key} value={ic.key}>{ic.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Título</label>
                  <input className={inputCls} value={item.titulo} onChange={(e) => updateItem("ofertaItems", i, "titulo", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Descripción (opcional)</label>
                  <input className={inputCls} value={item.descripcion} onChange={(e) => updateItem("ofertaItems", i, "descripcion", e.target.value)} />
                </div>
                <button onClick={() => removeItem("ofertaItems", i)} className="mt-5 p-1.5 text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
          <button onClick={() => addItem("ofertaItems", emptyOferta())} className="flex items-center gap-2 text-sm text-brand-coral hover:text-brand-coral/80 font-medium">
            <Plus className="h-4 w-4" /> Añadir ítem
          </button>
        </div>
      )}

      {/* ── EQUIPO DIRECTIVO ── */}
      {tab === "Equipo Directivo" && (
        <div className="space-y-3">
          {data.equipo.map((m, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_160px_36px] gap-2 items-start bg-gray-50 p-3 rounded-xl">
              <div>
                <label className={labelCls}>Nombre completo</label>
                <input className={inputCls} value={m.nombre} onChange={(e) => updateItem("equipo", i, "nombre", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Cargo</label>
                <input className={inputCls} value={m.cargo} onChange={(e) => updateItem("equipo", i, "cargo", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Foto</label>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer flex items-center justify-center bg-brand-dark text-white rounded-lg px-2.5 py-1.5 hover:bg-brand-dark/90 transition-colors" title="Subir foto local">
                    {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploading(true);
                        setError("");
                        const fd = new FormData();
                        fd.append("file", file);
                        try {
                          const res = await fetch("/api/upload", { method: "POST", body: fd });
                          const json = await res.json();
                          if (!res.ok) throw new Error(json.error || "Error subiendo imagen");
                          updateItem("equipo", i, "foto", json.url);
                        } catch (err: any) {
                          setError(err.message || "Error subiendo imagen");
                        } finally {
                          setUploading(false);
                          e.target.value = "";
                        }
                      }}
                    />
                  </label>
                  <input
                    className={`${inputCls} flex-1 min-w-0`}
                    placeholder="https://..."
                    value={m.foto}
                    onChange={(e) => updateItem("equipo", i, "foto", e.target.value)}
                  />
                </div>
                {m.foto && (
                  <div className="mt-2 w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                    <img src={m.foto} alt={m.nombre} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <button onClick={() => removeItem("equipo", i)} className="mt-5 p-1.5 text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          <button onClick={() => addItem("equipo", emptyEquipo())} className="flex items-center gap-2 text-sm text-brand-coral hover:text-brand-coral/80 font-medium">
            <Plus className="h-4 w-4" /> Añadir miembro
          </button>
        </div>
      )}

      {/* ── TESTIMONIOS ── */}
      {tab === "Testimonios" && (
        <div className="space-y-4">
          {data.testimonios.map((t, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-brand-dark">Testimonio {i + 1}</span>
                <button onClick={() => removeItem("testimonios", i)} className="p-1.5 text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div>
                <label className={labelCls}>Texto del testimonio</label>
                <textarea rows={3} className={inputCls} value={t.texto} onChange={(e) => updateItem("testimonios", i, "texto", e.target.value)} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className={labelCls}>Nombre</label>
                  <input className={inputCls} value={t.nombre} onChange={(e) => updateItem("testimonios", i, "nombre", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Relación con el colegio</label>
                  <input className={inputCls} placeholder="Ej: Padre de familia" value={t.relacion} onChange={(e) => updateItem("testimonios", i, "relacion", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Foto del testimoniante</label>
                  <div className="flex gap-2">
                    <input
                      className={inputCls}
                      placeholder="https://..."
                      value={t.foto ?? ""}
                      onChange={(e) => updateItem("testimonios", i, "foto", e.target.value)}
                    />
                    <label className="cursor-pointer flex items-center justify-center bg-brand-dark text-white rounded-lg px-3 py-2 hover:bg-brand-dark/90 transition-colors shrink-0" title="Subir foto">
                      {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                      <input type="file" accept="image/*" className="hidden" disabled={uploading}
                        onChange={async (e) => {
                          const file = e.target.files?.[0]; if (!file) return;
                          setUploading(true); setError("");
                          const fd = new FormData(); fd.append("file", file);
                          try {
                            const res = await fetch("/api/upload", { method: "POST", body: fd });
                            const json = await res.json();
                            if (!res.ok) throw new Error(json.error || "Error");
                            updateItem("testimonios", i, "foto", json.url);
                          } catch (err: any) { setError(err.message); }
                          finally { setUploading(false); e.target.value = ""; }
                        }}
                      />
                    </label>
                  </div>
                  {t.foto && (
                    <img src={t.foto} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded-lg" />
                  )}
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => addItem("testimonios", emptyTestimonio())} className="flex items-center gap-2 text-sm text-brand-coral hover:text-brand-coral/80 font-medium">
            <Plus className="h-4 w-4" /> Añadir testimonio
          </button>
        </div>
      )}

      {/* ── TESTIMONIOS EN VIDEO ── */}
      {tab === "Testimonios en video" && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Agrega testimonios en formato de video. Puedes usar una URL de YouTube/Vimeo o subir un archivo de video local.
          </p>

          {data.testimoniosVideo.map((v, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-brand-dark flex items-center gap-2">
                  <Video className="h-4 w-4 text-brand-coral" /> Video {i + 1}
                </span>
                <button onClick={() => removeItem("testimoniosVideo", i)} className="p-1.5 text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Título del video</label>
                  <input className={inputCls} placeholder="Ej: Experiencia de un padre de familia" value={v.titulo} onChange={(e) => updateItem("testimoniosVideo", i, "titulo", e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Autor / Quién habla</label>
                  <input className={inputCls} placeholder="Ej: Juan Pérez - Padre de familia" value={v.autor} onChange={(e) => updateItem("testimoniosVideo", i, "autor", e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelCls}>URL del video</label>
                <div className="flex items-center gap-2">
                  <input className={inputCls} placeholder="https://youtube.com/... o /videos/..." value={v.url} onChange={(e) => updateItem("testimoniosVideo", i, "url", e.target.value)} />
                  <label className="cursor-pointer flex items-center justify-center bg-brand-dark text-white rounded-lg px-3 py-2 hover:bg-brand-dark/90 transition-colors shrink-0" title="Subir video local">
                    {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setUploading(true);
                        setError("");
                        const fd = new FormData();
                        fd.append("file", file);
                        try {
                          const res = await fetch("/api/upload", { method: "POST", body: fd });
                          const json = await res.json();
                          if (!res.ok) throw new Error(json.error || "Error subiendo video");
                          updateItem("testimoniosVideo", i, "url", json.url);
                          updateItem("testimoniosVideo", i, "tipo", "local");
                        } catch (err: any) {
                          setError(err.message || "Error subiendo video");
                        } finally {
                          setUploading(false);
                          e.target.value = "";
                        }
                      }}
                    />
                  </label>
                </div>
                {v.url && (
                  <div className="mt-2 text-xs text-gray-500">
                    {v.tipo === "local" ? "📁 Archivo local" : "🔗 URL externa"} — {v.url}
                  </div>
                )}
              </div>
              <div>
                <label className={labelCls}>URL miniatura / thumbnail (opcional)</label>
                <input className={inputCls} placeholder="https://... o dejar vacío" value={v.thumbnail} onChange={(e) => updateItem("testimoniosVideo", i, "thumbnail", e.target.value)} />
              </div>
            </div>
          ))}
          <button onClick={() => addItem("testimoniosVideo", emptyTestimonioVideo())} className="flex items-center gap-2 text-sm text-brand-coral hover:text-brand-coral/80 font-medium">
            <Plus className="h-4 w-4" /> Añadir video
          </button>
        </div>
      )}

      {/* ── GALERÍA ── */}
      {tab === "Galería" && (
        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            Sube imágenes desde tu computador o pega una URL externa.
          </p>

          {/* Upload local */}
          <label className="flex items-center gap-3 cursor-pointer bg-brand-dark text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-brand-dark/90 transition-colors w-fit">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            <span className="text-sm">{uploading ? "Subiendo..." : "Subir imágenes locales"}</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              disabled={uploading}
              onChange={async (e) => {
                const files = Array.from(e.target.files ?? []);
                if (!files.length) return;
                setUploading(true);
                setError("");
                for (const file of files) {
                  const fd = new FormData();
                  fd.append("file", file);
                  try {
                    const res = await fetch("/api/upload", { method: "POST", body: fd });
                    const json = await res.json();
                    if (!res.ok) throw new Error(json.error || "Error subiendo imagen");
                    setData((d) =>
                      d ? { ...d, galeria: [...d.galeria, { url: json.url, alt: file.name.replace(/\.[^.]+$/, "") }] } : d
                    );
                  } catch (err: any) {
                    setError(err.message || "Error subiendo imagen");
                  }
                }
                setUploading(false);
                e.target.value = "";
              }}
            />
          </label>

          {data.galeria.map((g, i) => (
            <div key={i} className="grid grid-cols-[120px_1fr_1fr_36px] gap-2 items-start bg-gray-50 p-3 rounded-xl">
              <div className="w-28 h-20 rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                {g.url ? (
                  <img src={g.url} alt={g.alt} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-gray-400">Sin imagen</span>
                )}
              </div>
              <div>
                <label className={labelCls}>URL de la imagen</label>
                <input className={inputCls} placeholder="https://..." value={g.url} onChange={(e) => updateItem("galeria", i, "url", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Texto alternativo (alt)</label>
                <input className={inputCls} placeholder="Descripción breve" value={g.alt} onChange={(e) => updateItem("galeria", i, "alt", e.target.value)} />
              </div>
              <button onClick={() => removeItem("galeria", i)} className="mt-5 p-1.5 text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          <button onClick={() => addItem("galeria", emptyGaleria())} className="flex items-center gap-2 text-sm text-brand-coral hover:text-brand-coral/80 font-medium">
            <Plus className="h-4 w-4" /> Añadir imagen por URL
          </button>
        </div>
      )}

      {/* ── COSTOS (solo Cal. B) ── */}
      {tab === "Costos" && isCalB && (
        <div className="space-y-4">
          <p className="text-sm text-gray-500">Valores en pesos colombianos (COP), sin puntos ni comas. Los campos de descuento son opcionales.</p>
          {data.costos.map((c, i) => {
            const mat = Number(c.matricula) || 0;
            const dMat = Number(c.descMatricula) || 0;
            const pen = Number(c.pension) || 0;
            const dPen = Number(c.descPension) || 0;
            const totMat = Math.max(0, mat - dMat);
            const totPen = Math.max(0, pen - dPen);
            return (
              <div key={i} className="bg-gray-50 p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <input className={`${inputCls} max-w-xs`} placeholder="Ej: Grado 11°" value={c.grado} onChange={(e) => updateItem("costos", i, "grado", e.target.value)} />
                  <button onClick={() => removeItem("costos", i)} className="p-1.5 text-red-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Matrícula */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className={labelCls}>Matrícula (COP)</label>
                        <input className={inputCls} type="number" min="0" placeholder="0" value={c.matricula} onChange={(e) => updateItem("costos", i, "matricula", e.target.value)} />
                      </div>
                      <div>
                        <label className={labelCls}>Descuento matrícula (COP)</label>
                        <input className={inputCls} type="number" min="0" placeholder="Opcional" value={c.descMatricula} onChange={(e) => updateItem("costos", i, "descMatricula", e.target.value)} />
                      </div>
                    </div>
                    {totMat > 0 && (
                      <div className="text-sm font-semibold text-brand-dark">
                        Total matrícula: <span className="text-brand-coral">{totMat.toLocaleString("es-CO")} COP</span>
                        {dMat > 0 && <span className="text-gray-400 font-normal text-xs ml-2">(desc. {dMat.toLocaleString("es-CO")})</span>}
                      </div>
                    )}
                  </div>
                  {/* Pensión */}
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className={labelCls}>Pensión mensual (COP)</label>
                        <input className={inputCls} type="number" min="0" placeholder="0" value={c.pension} onChange={(e) => updateItem("costos", i, "pension", e.target.value)} />
                      </div>
                      <div>
                        <label className={labelCls}>Descuento pensión (COP)</label>
                        <input className={inputCls} type="number" min="0" placeholder="Opcional" value={c.descPension} onChange={(e) => updateItem("costos", i, "descPension", e.target.value)} />
                      </div>
                    </div>
                    {totPen > 0 && (
                      <div className="text-sm font-semibold text-brand-dark">
                        Total pensión: <span className="text-brand-coral">{totPen.toLocaleString("es-CO")} COP</span>
                        {dPen > 0 && <span className="text-gray-400 font-normal text-xs ml-2">(desc. {dPen.toLocaleString("es-CO")})</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <button onClick={() => addItem("costos", emptyCosto())} className="flex items-center gap-2 text-sm text-brand-coral hover:text-brand-coral/80 font-medium">
            <Plus className="h-4 w-4" /> Añadir grado
          </button>
        </div>
      )}

      {/* Save bar */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-brand-dark text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-brand-dark/90 disabled:opacity-50 transition-colors"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Guardar cambios
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
            <CheckCircle className="h-4 w-4" /> Guardado correctamente
          </span>
        )}
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </div>
  );
}
