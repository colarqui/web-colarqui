"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useRef, useEffect, useCallback } from "react";
import { Users, Upload, CheckCircle, ArrowRight, Phone, Mail, User, FileCheck, AlertCircle, Building2, X, Briefcase } from "lucide-react";

function Counter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [c, setC] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (t: number) => { const p = Math.min((t - t0) / duration, 1); setC(Math.floor(p * end)); if (p < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{c.toLocaleString("es-CO")}</span>;
}

export default function TrabajaPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [err, setErr] = useState<Record<string, string>>({});
  const [acepta, setAcepta] = useState(false);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const finput = useRef<HTMLInputElement>(null);

  const onFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const sel = Array.from(e.target.files || []);
    const e2: Record<string, string> = {};
    if (sel.length + files.length > 2) e2.files = "Máximo 2 archivos.";
    else if (sel.some(f => f.size > 20 * 1024 * 1024)) e2.files = "Máximo 20 MB cada uno.";
    else if (sel.some(f => f.type !== "application/pdf")) e2.files = "Solo PDF.";
    if (!Object.keys(e2).length) setFiles(p => [...p, ...sel].slice(0, 2));
    setErr(e2);
  }, [files.length]);

  const rm = useCallback((i: number) => { setFiles(p => p.filter((_, j) => j !== i)); setErr(p => { const n = { ...p }; delete n.files; return n; }); }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const e2: Record<string, string> = {};
    if (!d.get("nombre")) e2.nombre = "Obligatorio.";
    if (!d.get("telefono")) e2.telefono = "Obligatorio.";
    if (!d.get("correo")) e2.correo = "Obligatorio.";
    if (!d.get("cargo")) e2.cargo = "Obligatorio.";
    if (!files.length) e2.files = "Adjunta al menos un PDF.";
    if (!acepta) e2.politicas = "Acepta las políticas.";
    if (Object.keys(e2).length) { setErr(e2); return; }

    // Append files to FormData
    files.forEach(f => d.append("files", f));

    setLoading(true);
    try {
      const res = await fetch("/api/contacto", { method: "POST", body: d });
      if (res.ok) {
        setOk(true); setErr({}); setFiles([]);
        (e.target as HTMLFormElement).reset();
      } else {
        const body = await res.json().catch(() => ({}));
        setErr({ general: body.error || "Error al enviar. Intenta de nuevo." });
      }
    } catch {
      setErr({ general: "Error de conexión. Verifica tu internet." });
    } finally {
      setLoading(false);
    }
  };

  const fc = (k?: string) => `w-full px-4 py-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold focus:bg-white outline-none transition-all ${k ? "border-red-300 bg-red-50" : "border-gray-200"}`;

  if (ok) return (
    <div className="min-h-screen flex flex-col bg-white"><Header />
      <main className="flex-grow flex items-center justify-center py-24">
        <div className="text-center max-w-md mx-auto px-4">
          <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-brand-dark mb-4">¡Hoja de vida recibida!</h2>
          <p className="text-gray-600 mb-8">Nuestro equipo de talento humano revisará tu información y se contactará contigo.</p>
          <button onClick={() => setOk(false)} className="bg-brand-gold text-brand-dark px-6 py-3 rounded-xl font-bold hover:bg-brand-gold/90 transition-all">Enviar otra</button>
        </div>
      </main><Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative overflow-hidden text-white py-24">
          <div className="absolute inset-0 bg-brand-dark" />
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `url('/images/estudiantes-hero-trabaja.jpg')`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="absolute inset-0 bg-brand-dark/70" />
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/20 text-brand-gold rounded-full text-sm font-medium mb-6"><Users className="h-4 w-4" /> Talento Humano</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Trabaja con <span className="text-brand-gold">Nosotros</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Forma parte de una comunidad educativa comprometida con la misión social de la Iglesia católica en Cali.</p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-6 text-center">¿Por qué trabajar en los Colegios Arquidiocesanos?</h2>
              <p className="text-gray-600 leading-relaxed text-lg text-center max-w-4xl mx-auto">En los Colegios Arquidiocesanos, trabajamos en conjunto cada día para cumplir nuestro objetivo: administrar las instituciones educativas propias o confiadas a nuestro cuidado y gestionar con efectividad los recursos, especialmente los del talento humano, bajo los principios de la Iglesia católica en nuestra misión social de educar. ¡Te invitamos a formar parte de esta noble misión!</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-brand-dark text-center mb-16">Generación de empleos – 2023</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-8"><Building2 className="h-6 w-6 text-brand-gold" /><h3 className="text-xl font-bold text-brand-dark">Fundación Educativa Santa Isabel de Hungría</h3></div>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div><div className="text-4xl font-bold text-brand-gold mb-2"><Counter end={673} duration={2500} /></div><div className="text-sm text-gray-600 font-medium">Maestros</div></div>
                  <div><div className="text-4xl font-bold text-brand-coral mb-2"><Counter end={71} duration={2000} /></div><div className="text-sm text-gray-600 font-medium">Administrativos</div></div>
                  <div><div className="text-4xl font-bold text-emerald-600 mb-2"><Counter end={120} duration={2200} /></div><div className="text-sm text-gray-600 font-medium">Servicios Generales</div></div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-8"><Building2 className="h-6 w-6 text-brand-coral" /><h3 className="text-xl font-bold text-brand-dark">Fundación Educativa Alberto Uribe Urdaneta</h3></div>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div><div className="text-4xl font-bold text-brand-gold mb-2"><Counter end={536} duration={2500} /></div><div className="text-sm text-gray-600 font-medium">Maestros</div></div>
                  <div><div className="text-4xl font-bold text-brand-coral mb-2"><Counter end={15} duration={1500} /></div><div className="text-sm text-gray-600 font-medium">Administrativos</div></div>
                  <div><div className="text-4xl font-bold text-emerald-600 mb-2"><Counter end={53} duration={1800} /></div><div className="text-sm text-gray-600 font-medium">Servicios Generales</div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formulario */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6"><Briefcase className="h-6 w-6 text-brand-gold" /></div>
              <h2 className="text-3xl font-bold text-brand-dark mb-4">Envía tu hoja de vida</h2>
              <p className="text-gray-600">Completa el formulario y adjunta tu CV en PDF.</p>
            </div>

            <form onSubmit={submit} className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100 space-y-6">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2"><User className="h-4 w-4 inline mr-1" /> Nombre completo *</label>
                <input name="nombre" type="text" placeholder="Tu nombre completo" className={fc(err.nombre)} />
                {err.nombre && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.nombre}</p>}
              </div>

              {/* Teléfono + Correo */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2"><Phone className="h-4 w-4 inline mr-1" /> Número de contacto *</label>
                  <input name="telefono" type="tel" placeholder="300 123 4567" className={fc(err.telefono)} />
                  {err.telefono && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.telefono}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2"><Mail className="h-4 w-4 inline mr-1" /> Correo electrónico *</label>
                  <input name="correo" type="email" placeholder="correo@ejemplo.com" className={fc(err.correo)} />
                  {err.correo && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.correo}</p>}
                </div>
              </div>

              {/* Cargo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2"><Briefcase className="h-4 w-4 inline mr-1" /> Cargo / Profesión *</label>
                <input name="cargo" type="text" placeholder="Ej: Profesor de Matemáticas" className={fc(err.cargo)} />
                {err.cargo && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.cargo}</p>}
              </div>

              {/* Archivos */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2"><FileCheck className="h-4 w-4 inline mr-1" /> Adjuntar hoja de vida / CV (PDF, máx. 20 MB cada uno, máx. 2 archivos) *</label>
                <input ref={finput} type="file" accept="application/pdf" multiple onChange={onFiles} className="hidden" />
                <button type="button" onClick={() => finput.current?.click()} className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-brand-gold hover:text-brand-dark transition-colors bg-white">
                  <Upload className="h-6 w-6" />
                  <span className="text-sm font-medium">Haz click para seleccionar archivos PDF</span>
                  <span className="text-xs text-gray-500">Máximo 2 archivos, 20 MB cada uno</span>
                </button>
                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileCheck className="h-5 w-5 text-brand-gold flex-shrink-0" />
                          <span className="text-sm text-gray-700 truncate">{f.name}</span>
                          <span className="text-xs text-gray-500 flex-shrink-0">{(f.size / (1024 * 1024)).toFixed(1)} MB</span>
                        </div>
                        <button type="button" onClick={() => rm(i)} className="text-gray-400 hover:text-red-500 transition-colors"><X className="h-4 w-4" /></button>
                      </div>
                    ))}
                  </div>
                )}
                {err.files && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.files}</p>}
              </div>

              {/* Políticas */}
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={acepta} onChange={e => setAcepta(e.target.checked)} className="mt-1 h-4 w-4 text-brand-gold border-gray-300 rounded focus:ring-brand-gold" />
                  <div className="text-sm text-gray-600">
                    Acepto las <a href="/documentos" target="_blank" className="text-brand-gold hover:underline font-medium">políticas de tratamiento de datos personales</a> y el <a href="/documentos" target="_blank" className="text-brand-gold hover:underline font-medium">aviso de privacidad</a>. *
                  </div>
                </label>
                {err.politicas && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.politicas}</p>}
              </div>

              {/* Error general */}
              {err.general && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-600 text-sm">{err.general}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-gold text-brand-dark py-4 rounded-xl font-bold text-lg hover:bg-brand-gold/90 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-brand-dark/30 border-t-brand-dark rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>Enviar hoja de vida <ArrowRight className="h-5 w-5" /></>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-dark" />
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `url('/images/estudiantes-cta-trabaja.jpg')`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="absolute inset-0 bg-brand-dark/70" />
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Conoce nuestras <span className="text-brand-gold">instituciones</span></h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">31 colegios en toda Cali formando líderes con valores cristianos desde hace más de 65 años.</p>
            <a href="/colegios" className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-10 py-5 rounded-xl font-bold text-lg hover:bg-brand-gold/90 transition-all hover:scale-105">Ver colegios <ArrowRight className="h-5 w-5" /></a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
