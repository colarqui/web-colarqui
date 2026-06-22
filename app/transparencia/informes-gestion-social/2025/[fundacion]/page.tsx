"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";
import { useParams } from "next/navigation";
import { INFORME_2025 } from "@/data/informe2025";
import type { Fundacion2025 } from "@/data/informe2025";
import type { RendicionItem } from "@/data/informe2023";
import {
  ArrowLeft, Building2, Download, FileText, Users, Heart,
  Church, BookOpen, Award, Briefcase, HandHeart, Hammer,
  MessageSquare, User, Send, Loader2, MapPin, DollarSign,
  Laptop, GraduationCap, Target, Eye, UserCircle, Globe,
  Sparkles, Percent, Sofa, Cpu, Handshake, Rocket,
} from "lucide-react";

type Comment = { id: string; nombre: string; comentario: string; createdAt: string };

const ThemeCtx = createContext<string | undefined>(undefined);

function Section({ icon: Icon, title, accent, children }: {
  icon: React.ElementType; title: string; accent?: string; children: React.ReactNode;
}) {
  const tc = useContext(ThemeCtx);
  return (
    <section className="py-12 md:py-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center"
          style={tc ? { backgroundColor: `${tc}1A` } : undefined}>
          <Icon className="h-5 w-5 text-brand-gold" style={tc ? { color: tc } : undefined} />
        </div>
        <h2 className="text-2xl font-bold text-brand-dark">
          {title} {accent && <span className="text-brand-gold" style={tc ? { color: tc } : undefined}>{accent}</span>}
        </h2>
      </div>
      {children}
    </section>
  );
}

function AnimatedCounter({ end, start = 0, duration = 2000, suffix = "" }: {
  end: number; start?: number; duration?: number; suffix?: string;
}) {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(start + (end - start) * eased));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, start, duration]);
  return <span ref={ref}>{count.toLocaleString("es-CO")}{suffix}</span>;
}

function RendicionCard({ item, icon: Icon }: { item: RendicionItem; icon: React.ElementType }) {
  const tc = useContext(ThemeCtx);
  const fmtMoney = (n: number) => `$${n.toLocaleString("es-CO")}`;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {item.foto && (
        <div className="aspect-video overflow-hidden">
          <Image src={item.foto} alt={item.titulo} width={800} height={450}
            className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center"
            style={tc ? { backgroundColor: `${tc}1A` } : undefined}>
            <Icon className="h-4 w-4 text-brand-gold" style={tc ? { color: tc } : undefined} />
          </div>
          <h3 className="font-bold text-brand-dark">{item.titulo}</h3>
        </div>
        {item.subtitulo && <p className="text-sm text-brand-gold font-medium mb-2" style={tc ? { color: tc } : undefined}>{item.subtitulo}</p>}
        {item.monto !== undefined && (
          <p className="text-2xl font-black text-brand-gold mb-3" style={tc ? { color: tc } : undefined}>
            {fmtMoney(item.monto)}
          </p>
        )}
        <p className="text-gray-600 text-sm leading-relaxed">{item.descripcion}</p>
        {item.detalle && item.detalle.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {item.detalle.map((d, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">{d}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const INCOME_ICONS: Record<string, React.ReactNode> = {
  "Contratación Estatal": (
    <svg viewBox="0 0 64 64" className="w-16 h-16"><rect x="8" y="28" width="48" height="28" rx="3" fill="#D4A843" opacity=".2"/><rect x="14" y="20" width="36" height="8" rx="2" fill="#D4A843" opacity=".35"/><rect x="20" y="12" width="24" height="8" rx="2" fill="#D4A843" opacity=".5"/><path d="M32 4l-4 8h8l-4-8z" fill="#D4A843"/><rect x="16" y="36" width="6" height="12" rx="1" fill="#fff"/><rect x="26" y="36" width="6" height="12" rx="1" fill="#fff"/><rect x="36" y="36" width="6" height="12" rx="1" fill="#fff"/></svg>
  ),
  "Servicios Educativos": (
    <svg viewBox="0 0 64 64" className="w-16 h-16"><rect x="8" y="12" width="48" height="40" rx="4" fill="#E8A838" opacity=".2"/><rect x="8" y="12" width="24" height="40" rx="4" fill="#E8A838" opacity=".4"/><path d="M16 20h12M16 28h10M16 36h8" stroke="#E8A838" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  "Otros Ingresos": (
    <svg viewBox="0 0 64 64" className="w-16 h-16"><circle cx="32" cy="32" r="24" fill="none" stroke="#6BBF4E" strokeWidth="3" opacity=".3"/><circle cx="32" cy="32" r="16" fill="#6BBF4E" opacity=".2"/><text x="32" y="37" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#6BBF4E">$</text><path d="M56 16a24 24 0 0 1 0 32" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" opacity=".6"/></svg>
  ),
  "Donaciones": (
    <svg viewBox="0 0 64 64" className="w-16 h-16"><path d="M40 20c0 0 8 4 8 12s-8 12-8 12" stroke="#D4A843" strokeWidth="2" fill="none" opacity=".4"/><circle cx="48" cy="24" r="4" fill="#D4A843" opacity=".6"/><circle cx="52" cy="32" r="3" fill="#D4A843" opacity=".4"/><circle cx="46" cy="38" r="3.5" fill="#D4A843" opacity=".5"/><rect x="12" y="28" width="24" height="20" rx="4" fill="#22C55E" opacity=".3"/><path d="M24 32v12M18 38h12" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" opacity=".6"/></svg>
  ),
};

const VALID_FUNDS = { fesih: "FESIH", fauu: "FAUU" } as const;

export default function Informe2025Page() {
  const params = useParams();
  const slug = (params?.fundacion as string || "").toLowerCase();
  const key = VALID_FUNDS[slug as keyof typeof VALID_FUNDS];
  const data: Fundacion2025 | undefined = key ? INFORME_2025[key] : undefined;

  const [comments, setComments] = useState<Comment[]>([]);
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/informes-comentarios?fundacion=${key}&anio=2025`);
      if (res.ok) { const d = await res.json(); setComments(d.comentarios || []); }
    } catch { /* */ }
  }, [key]);

  useEffect(() => { if (key) fetchComments(); }, [key, fetchComments]);

  const submitComment = async () => {
    if (!nombre.trim() || !comentario.trim()) { setErr("Nombre y comentario son obligatorios."); return; }
    setErr(""); setSending(true);
    try {
      const res = await fetch("/api/informes-comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, comentario, fundacion: key, anio: 2025 }),
      });
      if (!res.ok) { const d = await res.json(); setErr(d.error || "Error al enviar."); }
      else { setNombre(""); setComentario(""); fetchComments(); }
    } catch { setErr("Error de conexión."); }
    finally { setSending(false); }
  };

  const fmtDate = (d: string) => new Date(d).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
  const fmtMoney = (n: number) => `$${n.toLocaleString("es-CO")}`;

  if (!data) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-brand-dark mb-4">Fundación no encontrada</h1>
            <Link href="/transparencia/informes-gestion-social" className="text-brand-gold hover:underline">Volver al portal</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const r = data.rendicion;

  return (
    <ThemeCtx.Provider value={data.brandColor}>
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative bg-brand-dark overflow-hidden">
          <div className="absolute inset-0">
            {data.heroImage ? (
              <Image src={data.heroImage} alt="" fill className="object-cover object-center" aria-hidden="true" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark to-gray-900" />
            )}
            <div className="absolute inset-0 bg-brand-dark/70" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <Link href="/transparencia/informes-gestion-social" className="inline-flex items-center gap-1.5 text-white/90 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Volver al portal de informes
            </Link>
            <p className="font-bold text-sm tracking-widest uppercase mb-3 text-white">Impacto Social 2025</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
              Informe de Gestión <span className="text-brand-gold">2025</span>
            </h1>
            <p className="text-white text-lg font-medium mb-1">
              <Building2 className="h-5 w-5 inline mr-2" />
              {data.nombre}
            </p>
            <p className="text-white/90 text-lg max-w-2xl">NIT: {data.nit} · Decreto Arzobispal {data.decretoArzobispal}</p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Introducción + Sidebar */}
          <Section icon={BookOpen} title="Texto" accent="Introductorio">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                {data.textoIntroductorio.split("\n\n").map((p, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>
                ))}
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="text-center mb-2">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 ring-4 ring-brand-gold/20">
                    <Image src={data.directorFoto || ""} alt={data.directorNombre || "Director"} width={160} height={160} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-bold text-brand-dark text-sm leading-tight">{data.directorNombre}</p>
                  <p className="text-xs text-gray-500 mt-1">Director Ejecutivo</p>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Fundada en</p>
                    <p className="text-2xl font-bold text-brand-dark">{data.anioCreacion}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Colegios</p>
                    <p className="text-2xl font-bold text-brand-dark">{data.totalColegios}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-100 text-center">
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Estudiantes</p>
                    <p className="text-2xl font-bold text-brand-dark">{data.totalEstudiantes.toLocaleString("es-CO")}</p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Horizonte Institucional */}
          <Section icon={Target} title="Horizonte" accent="Institucional">
            <div className="bg-[#FDFBF6] rounded-2xl border border-amber-100/40 p-6 md:p-8">
              <div className="grid md:grid-cols-5 gap-8 items-start">
                <div className="md:col-span-3 space-y-6">
                  <p className="text-gray-600 leading-relaxed">
                    Nos guiamos por una sólida misión, una visión clara, valores que inspiran y principios que reflejan nuestro compromiso con la excelencia y el servicio bajo la luz del evangelio.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-brand-dark rounded-2xl p-5 text-white">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="h-5 w-5 text-brand-gold" />
                        <h3 className="font-bold text-sm">Misión</h3>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed">{data.mision}</p>
                    </div>
                    <div className="bg-brand-dark rounded-2xl p-5 text-white">
                      <div className="flex items-center gap-2 mb-3">
                        <Eye className="h-5 w-5 text-brand-gold" />
                        <h3 className="font-bold text-sm">Visión</h3>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed">{data.vision}</p>
                    </div>
                  </div>
                  {data.valores && data.valores.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-3">
                      {data.valores.map((v, i) => (
                        <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
                          <h4 className="font-bold text-brand-dark text-sm mb-1">{v.nombre}</h4>
                          <p className="text-gray-500 text-sm leading-relaxed">{v.descripcion}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {data.principios && data.principios.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {data.principios.map((p, i) => (
                        <span key={i} className="px-3 py-1.5 bg-brand-gold/10 text-brand-dark text-sm font-medium rounded-full border border-brand-gold/20">
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {data.horizonteFoto && (
                  <div className="md:col-span-2 self-end">
                    <div className="rounded-2xl overflow-hidden border border-gray-100/50">
                      <Image src={data.horizonteFoto} alt="Horizonte institucional" width={500} height={280} className="w-full h-auto object-cover" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Section>

          {/* Ubicación Geográfica */}
          <Section icon={MapPin} title="Ubicación" accent="Geográfica">
            <div className="grid lg:grid-cols-2 gap-8">
              {data.mapaUrl && (
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 flex items-center justify-center">
                  <Image src={data.mapaUrl} alt="Mapa de ubicación" width={800} height={600} className="w-full h-auto max-h-[500px] object-contain" />
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-3 content-start">
                {data.ubicaciones.map((u, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                    <p className="font-bold text-brand-dark text-sm mb-2 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-brand-gold flex-shrink-0" /> {u.comuna}
                    </p>
                    <ul className="space-y-1">
                      {u.colegios.map((c, j) => (
                        <li key={j} className="text-gray-600 text-sm leading-snug pl-5">• {c}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Caracterización de la Población */}
          <Section icon={Users} title="Caracterización" accent="de la Población">
            <div className="bg-gradient-to-br from-brand-dark to-gray-900 rounded-2xl p-8 md:p-12">
              <p className="text-white/90 text-sm uppercase tracking-widest mb-2 text-center">
                La {data.nombre} administra {data.totalColegios} colegios con una población total de
              </p>
              <p className="text-6xl md:text-8xl font-black text-white leading-none text-center">
                <AnimatedCounter end={data.totalEstudiantes} start={5000} duration={2500} />
              </p>
              <p className="text-brand-gold font-bold mt-3 text-lg text-center">Estudiantes</p>

              {(data.hombres || data.mujeres) && (
                <div className="grid grid-cols-2 gap-6 mt-10 max-w-md mx-auto">
                  {data.hombres && (
                    <div className="text-center">
                      <div className="w-28 h-28 mx-auto mb-3 rounded-full overflow-hidden ring-4 ring-blue-400/40 bg-blue-500/20">
                        {data.hombresFoto ? (
                          <Image src={data.hombresFoto} alt="Estudiantes hombres" width={224} height={224} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <UserCircle className="h-12 w-12 text-blue-400" />
                          </div>
                        )}
                      </div>
                      <p className="text-3xl font-black text-white"><AnimatedCounter end={data.hombres} /></p>
                      <p className="text-blue-300 text-sm font-medium">Hombres</p>
                    </div>
                  )}
                  {data.mujeres && (
                    <div className="text-center">
                      <div className="w-28 h-28 mx-auto mb-3 rounded-full overflow-hidden ring-4 ring-pink-400/40 bg-pink-500/20">
                        {data.mujeresFoto ? (
                          <Image src={data.mujeresFoto} alt="Estudiantes mujeres" width={224} height={224} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <UserCircle className="h-12 w-12 text-pink-400" />
                          </div>
                        )}
                      </div>
                      <p className="text-3xl font-black text-white"><AnimatedCounter end={data.mujeres} /></p>
                      <p className="text-pink-300 text-sm font-medium">Mujeres</p>
                    </div>
                  )}
                </div>
              )}

              {(data.afrodescendientes || data.mestizos || data.blancos || data.indigenas || data.otrosEtnia || data.noSeIdentifica) && (
                <>
                  <p className="text-white/80 text-sm uppercase tracking-widest text-center mt-10 mb-4">De los cuales</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
                    {data.mestizos !== undefined && data.mestizos > 0 && (
                      <div className="bg-white/5 backdrop-blur rounded-xl p-4 text-center border border-white/10">
                        <Users className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white"><AnimatedCounter end={data.mestizos} /></p>
                        <p className="text-emerald-300/80 text-sm font-medium">Mestizos</p>
                      </div>
                    )}
                    {data.blancos !== undefined && data.blancos > 0 && (
                      <div className="bg-white/5 backdrop-blur rounded-xl p-4 text-center border border-white/10">
                        <Globe className="h-6 w-6 text-sky-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white"><AnimatedCounter end={data.blancos} /></p>
                        <p className="text-sky-300/80 text-sm font-medium">Blancos</p>
                      </div>
                    )}
                    {data.afrodescendientes !== undefined && data.afrodescendientes > 0 && (
                      <div className="bg-white/5 backdrop-blur rounded-xl p-4 text-center border border-white/10">
                        <Globe className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white"><AnimatedCounter end={data.afrodescendientes} /></p>
                        <p className="text-amber-300/80 text-sm font-medium">Afrodescendientes</p>
                      </div>
                    )}
                    {data.indigenas !== undefined && data.indigenas > 0 && (
                      <div className="bg-white/5 backdrop-blur rounded-xl p-4 text-center border border-white/10">
                        <Sparkles className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white"><AnimatedCounter end={data.indigenas} /></p>
                        <p className="text-purple-300/80 text-sm font-medium">Indígenas</p>
                      </div>
                    )}
                    {data.otrosEtnia !== undefined && data.otrosEtnia > 0 && (
                      <div className="bg-white/5 backdrop-blur rounded-xl p-4 text-center border border-white/10">
                        <Heart className="h-6 w-6 text-sky-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white"><AnimatedCounter end={data.otrosEtnia} /></p>
                        <p className="text-sky-300/80 text-sm font-medium">Otros</p>
                      </div>
                    )}
                    {data.noSeIdentifica !== undefined && data.noSeIdentifica > 0 && (
                      <div className="bg-white/5 backdrop-blur rounded-xl p-4 text-center border border-white/10">
                        <Users className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-white"><AnimatedCounter end={data.noSeIdentifica} /></p>
                        <p className="text-gray-300/80 text-sm font-medium">No se identifica</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </Section>

          {/* Rendición de Cuenta */}
          <Section icon={DollarSign} title="Rendición" accent="de Cuenta">
            <div className="grid md:grid-cols-5 gap-6 mb-10 items-start">
              {data.rendicionFoto && (
                <div className="md:col-span-2 rounded-2xl overflow-hidden max-w-sm md:max-w-none mx-auto md:mx-0">
                  <Image src={data.rendicionFoto} alt="Rendición de cuenta" width={500} height={650} className="w-full h-auto object-cover" />
                </div>
              )}
              <div className="md:col-span-3 bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-center">
                <h3 className="font-bold text-brand-dark mb-3 flex items-center gap-2">
                  <HandHeart className="h-5 w-5 text-brand-gold" />
                  Transparencia en la rendición de cuentas
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{r.ingresos.descripcion}</p>
              </div>
            </div>

            {/* Income breakdown */}
            {data.ingresosDetalle && data.ingresosDetalle.length > 0 && (
              <div className="mb-10">
                <h3 className="text-lg font-bold text-brand-dark mb-1">Ingresos <span className="text-brand-gold">2025</span></h3>
                <p className="text-sm text-gray-500 mb-6">Composición de los recursos financieros</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.ingresosDetalle.map((ing, i) => (
                    <div key={i} className="bg-[#FAF5EB] rounded-2xl p-5 text-center border border-amber-100/50 hover:shadow-md transition-shadow">
                      <div className="flex justify-center mb-3">
                        {INCOME_ICONS[ing.label] || <DollarSign className="w-16 h-16 text-brand-gold" />}
                      </div>
                      <p className="text-xl font-black text-brand-dark leading-tight">
                        <AnimatedCounter end={ing.monto} duration={2500} />
                      </p>
                      <p className="text-sm text-gray-600 font-medium mt-1">{ing.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Descuentos Otorgados */}
            {data.descuentosOtorgados && data.descuentosOtorgados.items && data.descuentosOtorgados.items.length > 0 && (
              <div className="mb-10 bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <Percent className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-lg">{data.descuentosOtorgados.titulo}</h3>
                    <p className="text-2xl font-black text-brand-gold">{fmtMoney(data.descuentosOtorgados.total)}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{data.descuentosOtorgados.descripcion}</p>
                <div className="overflow-hidden rounded-xl border border-gray-100">
                  <table className="w-full text-sm">
                    <thead className="bg-brand-dark text-white">
                      <tr>
                        <th className="text-left px-4 py-3 font-bold uppercase tracking-wider text-sm">Descuento</th>
                        <th className="text-right px-4 py-3 font-bold uppercase tracking-wider text-sm">Valor</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {data.descuentosOtorgados.items.map((d, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-700">{d.label}</td>
                          <td className="px-4 py-3 text-right font-semibold text-brand-dark">{fmtMoney(d.monto)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Rendicion cards grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <RendicionCard item={r.nomina} icon={Briefcase} />
              <RendicionCard item={r.academica} icon={GraduationCap} />
              {r.apoyoVulnerable && <RendicionCard item={r.apoyoVulnerable} icon={Heart} />}
              <RendicionCard item={r.bienestarPastoral} icon={Church} />
              <RendicionCard item={r.mejoramientoAmbientes} icon={Hammer} />
              {data.mobiliario && <RendicionCard item={data.mobiliario} icon={Sofa} />}
              {data.herramientasTecnologicas && <RendicionCard item={data.herramientasTecnologicas} icon={Cpu} />}
              {data.salasDeSistemas && <RendicionCard item={data.salasDeSistemas} icon={Laptop} />}
            </div>
          </Section>

          {/* Impacto Pastoral */}
          {data.impactoPastoral && (
            <Section icon={Church} title="Impacto y transformación" accent="en la comunidad educativa">
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {data.impactoPastoral.foto && (
                  <div className="rounded-2xl overflow-hidden">
                    <Image src={data.impactoPastoral.foto} alt={data.impactoPastoral.titulo}
                      width={800} height={560} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex flex-col gap-5">
                  <p className="text-gray-600 leading-relaxed">{data.impactoPastoral.descripcion}</p>
                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div className="bg-brand-dark rounded-2xl p-5 text-center">
                      <p className="text-4xl font-black text-white leading-none">
                        +<AnimatedCounter end={data.impactoPastoral.estudiantesImpactados} duration={2000} />
                      </p>
                      <p className="text-brand-gold text-sm font-semibold mt-2">Estudiantes impactados</p>
                      {data.impactoPastoralEstudiantesAnterior !== undefined && data.impactoPastoralEstudiantesAnterior > 0 && (
                        <p className="text-white/60 text-xs mt-1">Año anterior: {data.impactoPastoralEstudiantesAnterior.toLocaleString()}</p>
                      )}
                    </div>
                    <div className="bg-brand-dark rounded-2xl p-5 text-center">
                      <p className="text-4xl font-black text-white leading-none">
                        +<AnimatedCounter end={data.impactoPastoral.actividades} duration={1500} />
                      </p>
                      <p className="text-brand-gold text-sm font-semibold mt-2">Actividades realizadas</p>
                      {data.impactoPastoralActividadesAnterior !== undefined && data.impactoPastoralActividadesAnterior > 0 && (
                        <p className="text-white/60 text-xs mt-1">Año anterior: {data.impactoPastoralActividadesAnterior.toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.impactoPastoral.items.map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl border border-gray-100 p-5 flex gap-4">
                    <div className="w-9 h-9 rounded-xl bg-brand-gold flex items-center justify-center flex-shrink-0 font-black text-brand-dark text-sm">
                      {item.numero}
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-dark mb-1 text-sm">{item.titulo}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Modernización Tecnológica */}
          {data.modernizacion && (
            <Section icon={Rocket} title="Modernización" accent="Tecnológica">
              <div className="bg-gradient-to-br from-brand-gold/10 via-amber-50 to-white rounded-2xl border border-amber-100 overflow-hidden">
                {data.modernizacion.foto && (
                  <div className="aspect-[21/9] overflow-hidden">
                    <Image src={data.modernizacion.foto} alt={data.modernizacion.titulo} width={1200} height={500} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-8 md:p-12">
                  <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-2">
                      <h3 className="font-bold text-brand-dark text-xl mb-4">{data.modernizacion.titulo}</h3>
                      <p className="text-gray-600 leading-relaxed">{data.modernizacion.descripcion}</p>
                    </div>
                    <div className="text-center bg-white rounded-2xl p-6 border border-amber-100 shadow-sm">
                      <Laptop className="h-10 w-10 text-brand-gold mx-auto mb-3" />
                      <p className="text-5xl font-black text-brand-dark leading-none">
                        +<AnimatedCounter end={data.modernizacion.estudiantesBeneficiados} duration={2500} />
                      </p>
                      <p className="text-gray-600 text-sm font-medium mt-2">Estudiantes y familias beneficiadas</p>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          )}

          {/* Donantes */}
          <Section icon={HandHeart} title="Donantes" accent="2025">
            {r.donantes.descripcion && (
              <p className="text-gray-600 text-sm leading-relaxed mb-8">{r.donantes.descripcion}</p>
            )}
            {data.donantesDetalle && data.donantesDetalle.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.donantesDetalle.map((d, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-16 flex items-center justify-center mb-4">
                      {d.logo ? (
                        <Image src={d.logo} alt={d.nombre} width={200} height={64} className="max-h-14 w-auto object-contain" />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-brand-gold/10 flex items-center justify-center">
                          <HandHeart className="h-7 w-7 text-brand-gold" />
                        </div>
                      )}
                    </div>
                    <p className="font-bold text-brand-dark text-sm mb-2">{d.nombre}</p>
                    <p className="text-2xl font-black text-brand-gold">{fmtMoney(d.monto)}</p>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Alianzas Estratégicas */}
          {data.alianzasEstrategicas && data.alianzasEstrategicas.length > 0 && (
            <Section icon={Handshake} title="Alianzas" accent="Estratégicas">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.alianzasEstrategicas.map((a, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                        <Handshake className="h-5 w-5 text-brand-gold" />
                      </div>
                      <h3 className="font-bold text-brand-dark">{a.titulo}</h3>
                    </div>
                    {a.monto !== undefined && (
                      <p className="text-xl font-black text-brand-gold mb-3">
                        {fmtMoney(a.monto)} <span className="text-sm font-medium text-gray-500">valor estimado</span>
                      </p>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed">{a.descripcion}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Documentos */}
          <Section icon={FileText} title="Documentación" accent={`Oficial (${data.pdfs.length})`}>
            {data.pdfs.length === 0 ? (
              <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-8 text-center">
                <FileText className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Documentos descargables próximamente</p>
                <p className="text-gray-400 text-sm mt-1">Los archivos PDF oficiales se publicarán en esta sección.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.pdfs.map((pdf, i) => (
                  <a key={i} href={pdf.href} target="_blank" rel="noopener noreferrer"
                    className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-brand-gold/30 transition-all group flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                      <Download className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-brand-dark text-sm group-hover:text-brand-gold transition-colors leading-tight">{pdf.nombre}</p>
                      <p className="text-sm text-gray-500 mt-1">PDF · Descargar</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </Section>

          {/* Comentarios */}
          <section className="py-12 md:py-16 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-brand-gold" />
              </div>
              <h2 className="text-2xl font-bold text-brand-dark">Déjanos tu <span className="text-brand-gold">comentario</span></h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold outline-none transition-all"
                        placeholder="Tu nombre" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Comentario</label>
                    <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold outline-none transition-all resize-none"
                      placeholder="Tu opinión es importante…" />
                  </div>
                  {err && <p className="text-red-500 text-sm">{err}</p>}
                  <button onClick={submitComment} disabled={sending}
                    className="w-full bg-brand-gold text-brand-dark py-3 rounded-xl font-bold hover:bg-brand-gold/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {sending ? "Enviando…" : "Enviar comentario"}
                  </button>
                </div>
              </div>

              {comments.length > 0 && (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {comments.map((c) => (
                    <div key={c.id} className="bg-white rounded-xl border border-gray-100 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-brand-gold" />
                        <span className="font-semibold text-brand-dark text-sm">{c.nombre}</span>
                        <span className="text-sm text-gray-500 ml-auto">{fmtDate(c.createdAt)}</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed pl-6">{c.comentario}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
    </ThemeCtx.Provider>
  );
}
