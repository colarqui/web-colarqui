"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";
import { useParams, notFound } from "next/navigation";
import { INFORME_2022 } from "@/data/informe2022";
import type { Fundacion2022 } from "@/data/informe2022";
import {
  ArrowLeft, Building2, Download, FileText,
  Users, GraduationCap, Heart, Leaf, Church, BookOpen,
  Award, Briefcase, Smile, HandHeart, School, Hammer,
  MessageSquare, User, Send, Loader2,
  ChevronLeft, ChevronRight, Star, Laptop, UtensilsCrossed, Recycle, ShieldCheck, DollarSign,
} from "lucide-react";

type Comment = { id: string; nombre: string; comentario: string; createdAt: string };

const ThemeCtx = createContext<string | undefined>(undefined);

// ─── Section component ──────────────────────────────────────────────────────

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

// ─── Stat card ──────────────────────────────────────────────────────────────

function StatCard({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 text-center shadow-sm">
      <p className="text-3xl font-bold text-brand-dark">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

// ─── Animated counter (counts up from start to end) ────────────────────────

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

// ─── Animated bar (grows width on scroll) ───────────────────────────────────

function AnimatedBar({ pct, color, label, value }: {
  pct: number; color: string; label: string; value: string;
}) {
  const tc = useContext(ThemeCtx);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="group flex items-center gap-3 hover:bg-gray-50 rounded-lg px-2 py-1 -mx-2 transition-colors cursor-default">
      <span className="text-sm font-bold text-gray-500 w-20">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
        <div
          className={`${tc ? "" : color} h-full rounded-full transition-all duration-1000 ease-out`}
          style={{ width: visible ? `${pct}%` : "0%", ...(tc ? { backgroundColor: tc } : {}) }}
        />
      </div>
      <span className="text-sm font-bold text-brand-dark w-16 text-right group-hover:text-brand-gold transition-colors">{value}</span>
    </div>
  );
}

// ─── Main page ──────────────────────────────────────────────────────────────

const VALID_FUNDS = { fesih: "FESIH", fauu: "FAUU" } as const;

export default function Informe2022FundacionPage() {
  const params = useParams();
  const slug = (params.fundacion as string)?.toLowerCase();

  if (!slug || !(slug in VALID_FUNDS)) {
    notFound();
  }

  const fundKey = VALID_FUNDS[slug as keyof typeof VALID_FUNDS];
  const data: Fundacion2022 = INFORME_2022[fundKey];

  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");
  const [ambienteIdx, setAmbienteIdx] = useState(0);

  const fetchComments = useCallback(async () => {
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/informes-comentarios?fundacion=${fundKey}&anio=2022`);
      const d = await res.json();
      setComments(d.comments || []);
    } catch { setComments([]); }
    finally { setLoadingComments(false); }
  }, [fundKey]);

  useEffect(() => { fetchComments(); }, [fetchComments]);

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault(); setErr("");
    if (nombre.trim().length < 2) { setErr("Ingresa tu nombre."); return; }
    if (comentario.trim().length < 5) { setErr("El comentario debe tener al menos 5 caracteres."); return; }
    setSending(true);
    try {
      const res = await fetch("/api/informes-comentarios", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fundacion: fundKey, anio: 2022, nombre: nombre.trim(), comentario: comentario.trim() }),
      });
      if (!res.ok) { const d = await res.json(); setErr(d.error || "Error al enviar."); }
      else { setNombre(""); setComentario(""); fetchComments(); }
    } catch { setErr("Error de conexión."); }
    finally { setSending(false); }
  };

  const fmtDate = (d: string) => new Date(d).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const totalCapacitados = data.capacitados.reduce((s, c) => s + c.cantidad, 0);
  const isFAAU = data.sigla === "FAUU";
  const R = "#BB1F22";
  const acS = isFAAU ? { color: R } : undefined;

  return (
    <ThemeCtx.Provider value={isFAAU ? R : undefined}>
      <>
        <Header />
      <main className="min-h-screen">
        {/* ─── Hero with YouTube video background ─────────────────── */}
        <section className="relative bg-brand-dark overflow-hidden">
          <div className="absolute inset-0">
            {data.heroImage ? (
              <Image src={data.heroImage} alt="" fill className="object-cover object-center" aria-hidden="true" />
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${data.heroVideoId}?autoplay=1&mute=1&loop=1&playlist=${data.heroVideoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                allow="autoplay; encrypted-media"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] md:w-[180%] md:h-[180%] pointer-events-none"
                title="Video de fondo"
              />
            )}
            <div className="absolute inset-0 bg-brand-dark/80" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <Link href="/transparencia/informes-gestion-social" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Volver al portal de informes
            </Link>
            <p className="font-bold text-sm tracking-widest uppercase mb-3 text-white/80">Informe de Gestión Social</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
              Huella Social <span className="text-brand-gold" style={acS}>2022</span>
            </h1>
            <p className="text-white/80 text-lg font-medium mb-1">
              <Building2 className="h-5 w-5 inline mr-2" />
              {data.nombre}
            </p>
            <p className="text-white/60 text-lg max-w-2xl">Transformando vidas a través de la educación de calidad, el impacto social y la reinversión de excedentes en actividades meritorias.</p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 1 ─── Misión, Visión, Política ─────────────────────────── */}
          <Section icon={Star} title="Identidad Institucional">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { t: "Misión", txt: data.mision },
                { t: "Visión", txt: data.vision },
                { t: "Política de Calidad", txt: data.politicaCalidad },
              ].map((item) => (
                <div key={item.t} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-brand-dark mb-2">{item.t}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.txt}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* 2 ─── Mensaje Directora ──────────────────────────────── */}
          <Section icon={Heart} title="Mensaje de nuestra" accent="Directora Ejecutiva">
            {(() => {
              const paragraphs = data.mensajeDirectora.split("\n\n");
              return (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="md:flex">
                    <div className="md:w-3/5 p-6 md:px-10 md:py-8 flex flex-col">
                      {paragraphs.map((p, i) => (
                        <p key={i} className="text-brand-dark/80 leading-relaxed mb-4 last:mb-0 text-[15px]">{p}</p>
                      ))}
                      <div className="mt-auto pt-6">
                        <p className="font-bold text-lg text-brand-dark">{data.directoraNombre}</p>
                        <p className="text-gray-500 text-sm">Directora Ejecutiva</p>
                      </div>
                    </div>
                    <div className="md:w-2/5">
                      <Image
                        src={data.directoraFoto}
                        alt={data.directoraNombre}
                        width={600}
                        height={800}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              );
            })()}
          </Section>

          {/* 3 ─── Equipo de líderes ──────────────────────────────── */}
          <Section icon={Users} title="Nuestro Equipo de" accent="Líderes">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.lideres.map((l) => (
                <div key={l.nombre} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm group hover:shadow-lg transition-all">
                  <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                    <Image src={l.foto} alt={l.nombre} width={412} height={512}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 text-center">
                    <p className="font-bold text-brand-dark text-base">{l.nombre}</p>
                    <p className="text-gray-500 text-sm mt-1">{l.cargo}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 4 ─── Calidad ────────────────────────────────────────── */}
          <Section icon={Award} title="Seguimos apostándole a la" accent="Calidad">
            <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-2/5 aspect-video md:aspect-auto">
                  <Image src={data.calidadImagen} alt="Certificación ISO 9001:2015" width={600} height={450} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 md:p-8 md:w-3/5 flex items-center">
                  <p className="text-gray-600 leading-relaxed">{data.calidadTexto}</p>
                </div>
              </div>
            </div>
          </Section>

          {/* 5 ─── Educación al alcance ───────────────────────────── */}
          <Section icon={School} title="Educación al alcance de" accent="todos">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <p className="text-gray-600 leading-relaxed">{data.educacionTexto}</p>
            </div>
            {data.educacionVideo && (
              <div className="mt-6 rounded-2xl overflow-hidden shadow-lg">
                <video src={data.educacionVideo} controls className="w-full" preload="metadata">
                  Tu navegador no soporta la reproducción de video.
                </video>
              </div>
            )}
            {data.impactoVernaza && (
              <div className="mt-8">
                <h3 className="text-xl md:text-2xl font-bold text-brand-dark text-center mb-8">
                  La presencia Arquidiocesana generó avances <span className="text-brand-gold">significativos</span> en:
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {data.impactoVernaza.map((item, i) => {
                    const icons = [HandHeart, Users, Heart, BookOpen, GraduationCap];
                    const ImpactIcon = icons[i % icons.length];
                    return (
                      <div key={i} className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                          <ImpactIcon className="h-5 w-5 text-brand-gold" />
                        </div>
                        <p className="text-brand-dark/80 text-sm leading-relaxed">{item}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Section>

          {/* 6 ─── Nuestra Comunidad / Nuestros Estudiantes ───────── */}
          <Section icon={GraduationCap} title="Nuestra" accent="Comunidad">
            <div className="relative rounded-2xl overflow-hidden mb-8">
              <Image src="https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/GA8.webp" alt="" fill className="object-cover object-center" aria-hidden="true" />
              <div className="absolute inset-0 bg-brand-dark/85" />
              <div className="relative z-10 flex flex-col md:flex-row items-center">
                <div className="flex-1 p-8 md:p-12 text-center md:text-left">
                  <p className="text-white/60 text-sm uppercase tracking-widest mb-2">Durante el 2022 atendimos</p>
                  <p className="text-6xl md:text-8xl font-black text-white leading-none">
                    <AnimatedCounter end={data.totalEstudiantesNum} start={5000} duration={2500} />
                  </p>
                  <p className="text-brand-gold font-bold mt-3 text-lg" style={acS}>Estudiantes impactados en 2022</p>
                </div>
                {data.estudiantesImagen && (
                  <div className="md:w-2/5 flex justify-center md:justify-end">
                    <Image src={data.estudiantesImagen} alt="Estudiantes" width={384} height={576} className="h-64 md:h-96 w-auto object-contain drop-shadow-2xl" />
                  </div>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-brand-dark mb-5">Situados en diversos niveles socioeconómicos</h3>
                <div className="space-y-3">
                  {data.estudiantesEstratos.map((e) => {
                    const max = Math.max(...data.estudiantesEstratos.map(x => x.cantidad));
                    return (
                      <AnimatedBar key={e.estrato} label={`Estrato ${e.estrato}`} pct={(e.cantidad / max) * 100} color="bg-brand-gold" value={e.cantidad.toLocaleString()} />
                    );
                  })}
                </div>
              </div>

              <div className="space-y-6">
                {data.generoDetalle ? (
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="flex">
                      <div className="flex-1 group cursor-default">
                        <div className="aspect-[4/3] overflow-hidden">
                          <Image src={data.generoDetalle.ninoFoto} alt="Niños" width={400} height={300} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-4 text-center">
                          <p className="text-3xl font-black text-brand-dark"><AnimatedCounter end={data.generoDetalle.ninos} start={1000} duration={2000} /></p>
                          <p className="text-sm text-gray-500 font-medium">Niños</p>
                        </div>
                      </div>
                      <div className="flex-1 group cursor-default">
                        <div className="aspect-[4/3] overflow-hidden">
                          <Image src={data.generoDetalle.ninaFoto} alt="Niñas" width={400} height={300} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-4 text-center">
                          <p className="text-3xl font-black text-brand-dark"><AnimatedCounter end={data.generoDetalle.ninas} start={1000} duration={2000} /></p>
                          <p className="text-sm text-gray-500 font-medium">Niñas</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-bold text-brand-dark mb-5">Género de estudiantes</h3>
                    <div className="flex gap-4">
                      <div className="flex-1 bg-blue-50 rounded-xl p-5 text-center">
                        <p className="text-4xl font-black text-blue-600">{data.generoEstudiantes.masculino}</p>
                        <p className="text-sm text-gray-500 mt-1 font-medium">Masculino</p>
                      </div>
                      <div className="flex-1 bg-pink-50 rounded-xl p-5 text-center">
                        <p className="text-4xl font-black text-pink-600">{data.generoEstudiantes.femenino}</p>
                        <p className="text-sm text-gray-500 mt-1 font-medium">Femenino</p>
                      </div>
                    </div>
                  </div>
                )}

                {data.diversidadEtnica && (
                  <div className="bg-gradient-to-br from-brand-dark to-brand-dark/90 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-bold text-white mb-5">Diversidad étnica</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {data.diversidadEtnica.map((d) => (
                        <div key={d.etnia} className="text-center group cursor-default">
                          <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-brand-gold/40 group-hover:border-brand-gold transition-colors">
                            <Image src={d.foto} alt={d.etnia} width={64} height={64} className="w-full h-full object-cover" />
                          </div>
                          <p className="text-2xl font-black text-brand-gold mt-3" style={acS}><AnimatedCounter end={d.cantidad} start={0} duration={2000} /></p>
                          <p className="text-white/70 text-sm font-medium">{d.etnia}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Section>

          {/* 7 ─── Talento Humano (972 colaboradores) ─────────────── */}
          <Section icon={Briefcase} title="Nuestro Talento" accent="Humano">
            <div className="relative rounded-2xl overflow-hidden mb-6">
              {data.talentoHumanoFoto && (
                <>
                  <Image src={data.talentoHumanoFoto} alt="" fill className="object-cover" aria-hidden="true" />
                  <div className="absolute inset-0 bg-brand-dark/80" />
                </>
              )}
              <div className={`relative z-10 p-8 md:p-12 ${data.talentoHumanoFoto ? 'text-white' : 'bg-gray-50 text-brand-dark'}`}>
                <p className={`text-6xl md:text-7xl font-black leading-none mb-3 ${data.talentoHumanoFoto ? 'text-white' : ''}`}>
                  <AnimatedCounter end={data.totalColaboradores} start={100} duration={2000} />
                </p>
                <p className="text-lg font-bold text-brand-gold" style={acS}>Colaboradores</p>
                <p className={`mt-4 leading-relaxed max-w-2xl ${data.talentoHumanoFoto ? 'text-white/80' : 'text-gray-600'}`}>{data.talentoHumanoTexto}</p>
                {data.talentoHumanoGenero && (
                  <div className="flex gap-6 mt-6">
                    <div className="bg-white/10 backdrop-blur rounded-xl px-6 py-3 text-center">
                      <p className="text-3xl font-black">{data.talentoHumanoGenero.femenino}</p>
                      <p className="text-sm opacity-70">Femenino</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-xl px-6 py-3 text-center">
                      <p className="text-3xl font-black">{data.talentoHumanoGenero.masculino}</p>
                      <p className="text-sm opacity-70">Masculino</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Section>

          {/* 8 ─── Diversidad en colaboradores ────────────────────── */}
          <Section icon={Users} title="La diversidad en nuestros" accent="colaboradores">
            {data.diversidadEtnicaColaboradores && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {data.diversidadEtnicaColaboradores.map((d) => (
                  <div key={d.etnia} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                    <div className="aspect-square overflow-hidden">
                      <Image src={d.foto} alt={d.etnia} width={300} height={300} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-2xl font-black text-brand-dark"><AnimatedCounter end={d.cantidad} start={0} duration={2000} /></p>
                      <p className="text-sm text-gray-500 font-medium">{d.etnia}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-brand-dark mb-5">Colaboradores por estrato socioeconómico</h3>
              <div className="space-y-3">
                {data.colaboradoresEstratos.map((e) => {
                  const max = Math.max(...data.colaboradoresEstratos.map(x => x.cantidad));
                  return (
                    <AnimatedBar key={e.estrato} label={`Estrato ${e.estrato}`} pct={(e.cantidad / max) * 100} color="bg-brand-dark" value={e.cantidad.toString()} />
                  );
                })}
              </div>
            </div>
          </Section>

          {/* 9 ─── Raciones alimentarias ──────────────────────────── */}
          {data.racionesAlimentarias && (
            <Section icon={UtensilsCrossed} title="Compromiso con la" accent="nutrición">
              <div className="bg-orange-50 rounded-2xl p-6 md:p-8 border border-orange-100">
                <div className="md:flex items-center gap-8">
                  <div className="text-center md:text-left mb-6 md:mb-0">
                    <p className="text-5xl md:text-6xl font-black text-brand-dark leading-none">
                      <AnimatedCounter end={data.racionesAlimentarias} start={100000} duration={2500} />
                    </p>
                    <p className="text-brand-gold font-bold text-lg mt-2">Raciones alimentarias</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 leading-relaxed">{data.racionesTexto}</p>
                  </div>
                </div>
                {data.poblacionVulnerable && (
                  <div className="mt-6 bg-white rounded-xl p-5 border border-orange-100">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-600 text-sm leading-relaxed">{data.poblacionVulnerable.texto}</p>
                    </div>
                  </div>
                )}
              </div>
            </Section>
          )}

          {/* 10 ─── Cultura Ambiental ─────────────────────────────── */}
          <Section icon={Recycle} title="Trabajamos por la" accent="cultura ambiental">
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              {data.kgMaterialAprovechable && (
                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-green-200">
                  <div>
                    <p className="text-4xl md:text-5xl font-black text-green-700 leading-none">
                      <AnimatedCounter end={data.kgMaterialAprovechable} start={10000} duration={2000} suffix=" KG" />
                    </p>
                    <p className="text-green-600 font-bold text-sm mt-1">de material aprovechable acopiado</p>
                  </div>
                </div>
              )}
              <p className="text-gray-600 leading-relaxed mb-4">{data.medioAmbienteTexto}</p>
              <div className="flex flex-wrap gap-2">
                {data.residuos.map((r) => (
                  <span key={r} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">{r}</span>
                ))}
              </div>
            </div>
          </Section>

          {/* 11 ─── Cultura / Talentos (conditional) ──────────────── */}
          {data.culturaTexto && (
            <Section icon={BookOpen} title="La cultura es lo nuestro," accent="fortalecimos talentos">
              {data.culturaFoto && (
                <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
                  <Image src={data.culturaFoto} alt="Fortalecimiento de talentos culturales" width={1024} height={576} className="w-full h-auto object-cover" />
                </div>
              )}
              <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                <p className="text-gray-600 leading-relaxed mb-4">{data.culturaTexto}</p>
                {data.culturaCifras && (
                  <div className="grid grid-cols-3 gap-3">
                    {data.culturaCifras.map((c) => (
                      <div key={c.label} className="bg-white rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-purple-600">{c.value}</p>
                        <p className="text-sm text-gray-500 mt-1">{c.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {data.formacionTecnica && (
                <div className="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-brand-dark mb-3">Formación Técnica — Llano Verde</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{data.formacionTecnica.texto}</p>
                  <div className="space-y-2">
                    {data.formacionTecnica.programas.map((p) => (
                      <div key={p} className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-brand-gold flex-shrink-0" />
                        <span className="text-sm font-medium text-brand-dark">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Section>
          )}

          {/* 12 ─── Egresados ─────────────────────────────────────── */}
          <Section icon={GraduationCap} title="Nuestros" accent="Egresados">
            {data.egresadosFoto && (
              <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
                <Image src={data.egresadosFoto} alt="Nuestros egresados" width={1024} height={576} className="w-full h-auto object-cover" />
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <p className="text-gray-600 leading-relaxed mb-4">{data.egresadosTexto}</p>
                <div className="bg-brand-gold/10 rounded-xl p-4 text-center mb-4">
                  <p className="text-4xl font-bold text-brand-dark">{data.egresadosCifra}</p>
                  <p className="text-sm text-gray-500">Egresados en 2022</p>
                </div>
                {data.egresadosDesglose && (
                  <div className="space-y-2">
                    {data.egresadosDesglose.map((eg) => (
                      <div key={eg.tipo} className="flex items-center justify-between bg-white rounded-lg px-4 py-2.5 border border-gray-100">
                        <span className="text-sm text-gray-600">{eg.tipo}</span>
                        <span className="font-bold text-brand-dark text-sm">{eg.cantidad.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <Award className="h-8 w-8 text-blue-500 mb-3" />
                <p className="text-gray-600 leading-relaxed mb-4">{data.becasTexto}</p>
                {data.becasCantidad && (
                  <div className="bg-white rounded-xl p-4 text-center">
                    <p className="text-4xl font-bold text-blue-600">{data.becasCantidad}</p>
                    <p className="text-sm text-gray-500 mt-1">Estudiantes con becas o auxilios</p>
                  </div>
                )}
              </div>
            </div>
          </Section>

          {/* 13 ─── Convivencia ───────────────────────────────────── */}
          <Section icon={HandHeart} title="Promovemos la sana" accent="convivencia escolar">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <p className="text-gray-600 leading-relaxed mb-3">{data.convivenciaTexto}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{data.convivenciaDetalle}</p>
            </div>
          </Section>

          {/* 14 ─── Diversidad ────────────────────────────────────── */}
          <Section icon={Users} title="Educamos desde la" accent="Diversidad">
            {data.diversidadFotos && data.diversidadFotos.length > 0 && (
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {data.diversidadFotos.map((foto, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
                    <Image src={foto} alt={`Diversidad ${i + 1}`} width={600} height={400} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            )}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <p className="text-gray-600 leading-relaxed">{data.diversidadTexto}</p>
            </div>
          </Section>

          {/* 15 ─── Evangelizando / Pastoral ──────────────────────── */}
          <Section icon={Church} title="Evangelizando nuestra" accent="Educación">
            {data.videoPastoral && (
              <div className="rounded-2xl overflow-hidden shadow-lg mb-6 border border-gray-100">
                <video src={data.videoPastoral} controls className="w-full aspect-video object-cover" preload="metadata" />
              </div>
            )}
            <p className="text-gray-600 leading-relaxed mb-6">{data.pastoralTexto}</p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { t: "Acompañamiento", txt: data.acompanamiento, foto: data.acompanamientoFoto, icon: Heart },
                { t: "Promoción", txt: data.promocion, foto: data.promocionFoto, icon: Users },
                { t: "Formación", txt: data.formacionPastoral, foto: data.formacionPastoralFoto, icon: BookOpen },
              ].map((item) => {
                const LineIcon = item.icon;
                return (
                  <div key={item.t} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                    {item.foto && (
                      <div className="aspect-[4/3] overflow-hidden">
                        <Image src={item.foto} alt={item.t} width={600} height={450} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <LineIcon className="h-5 w-5 text-brand-gold" />
                        <h3 className="font-bold text-brand-dark">{item.t}</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.txt}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actividades con Estudiantes */}
            {data.pastoralActividadesEstudiantes && (
              <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 mb-4">
                <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Actividades con Estudiantes
                </h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  {data.pastoralActividadesEstudiantes.map((act) => (
                    <div key={act.actividad} className="bg-white rounded-xl p-4 text-center border border-indigo-100">
                      <p className="text-3xl font-black text-indigo-700">
                        <AnimatedCounter end={act.cantidad} start={0} duration={2000} />
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{act.actividad}</p>
                      <p className="text-sm text-gray-500">Estudiantes</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actividades con Colaboradores */}
            {data.pastoralActividadesColaboradores && (
              <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                <h3 className="font-bold text-orange-900 mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Actividades con Colaboradores
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {data.pastoralActividadesColaboradores.map((act) => (
                    <div key={act.actividad} className="bg-white rounded-xl p-4 text-center border border-orange-100">
                      <p className="text-3xl font-black text-orange-700">
                        <AnimatedCounter end={act.cantidad} start={0} duration={2000} />
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{act.actividad}</p>
                      <p className="text-sm text-gray-500">Colaboradores</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Section>

          {/* 16 ─── Recurso Humano ────────────────────────────────── */}
          <Section icon={Briefcase} title="Nuestro Recurso" accent="Humano">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <StatCard value={data.contratosDirectos.toLocaleString()} label="Empleos directos" />
              <StatCard value={data.contratosIndirectos.toLocaleString()} label="Empleos indirectos" />
              <StatCard value={data.beneficiariosTotal.toLocaleString()} label="Total beneficiarios" />
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-6">
              <p className="text-gray-600 leading-relaxed">{data.recursosTexto}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-brand-dark mb-4">Se capacitaron {totalCapacitados.toLocaleString()} colaboradores</h3>
                <div className="space-y-2">
                  {data.capacitados.map((c) => (
                    <div key={c.rol} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2">
                      <span className="text-sm text-gray-600">{c.rol}</span>
                      <span className="font-bold text-brand-dark text-sm">{c.cantidad.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-brand-dark mb-4">Actividades de Bienestar</h3>
                <div className="flex flex-wrap gap-2">
                  {data.actividadesBienestar.map((a) => (
                    <span key={a} className="bg-brand-gold/10 text-brand-dark px-3 py-1.5 rounded-full text-sm font-medium">{a}</span>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* 17 ─── Apoyo económico ───────────────────────────────── */}
          <Section icon={HandHeart} title="Apoyamos la economía de" accent="nuestras familias">
            {data.apoyoFoto && (
              <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
                <Image src={data.apoyoFoto} alt="Apoyo económico a familias" width={1024} height={576} className="w-full h-auto object-cover" />
              </div>
            )}
            <p className="text-gray-600 leading-relaxed mb-6">{data.auxiliosTexto}</p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {data.auxiliosMontoNum && (
                <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 text-center hover:shadow-md transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-3">
                    <DollarSign className="h-6 w-6 text-amber-600" />
                  </div>
                  <p className="text-sm text-amber-700 font-medium uppercase tracking-wide mb-1">La Fundación otorgó auxilios por valor de</p>
                  <p className="text-3xl md:text-4xl font-black text-brand-dark leading-tight">
                    $<AnimatedCounter end={data.auxiliosMontoNum} start={0} duration={2500} />
                  </p>
                </div>
              )}
              {data.auxiliosBeneficiadosNum && (
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-200 text-center hover:shadow-md transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 mb-3">
                    <Users className="h-6 w-6 text-teal-600" />
                  </div>
                  <p className="text-sm text-teal-700 font-medium uppercase tracking-wide mb-1">Beneficiando a</p>
                  <p className="text-3xl md:text-4xl font-black text-brand-dark leading-tight">
                    <AnimatedCounter end={data.auxiliosBeneficiadosNum} start={0} duration={2000} />
                  </p>
                  <p className="text-sm text-teal-600 mt-1 font-medium">estudiantes</p>
                </div>
              )}
              {data.educacionGratuita && (
                <div className="bg-sky-50 rounded-2xl p-6 border border-sky-200 text-center hover:shadow-md transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-100 mb-3">
                    <GraduationCap className="h-6 w-6 text-sky-600" />
                  </div>
                  <p className="text-sm text-sky-700 font-medium uppercase tracking-wide mb-1">Recibieron educación gratuita</p>
                  <p className="text-3xl md:text-4xl font-black text-brand-dark leading-tight">
                    <AnimatedCounter end={data.educacionGratuita.cantidad} start={0} duration={2000} />
                  </p>
                  <p className="text-sm text-sky-600 mt-1 font-medium">Niños, Niñas y Adolescentes</p>
                </div>
              )}
            </div>

            {(data.jardinFoto || data.jardinCantidad) && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="grid md:grid-cols-2">
                  {data.jardinFoto && (
                    <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                      <Image src={data.jardinFoto} alt="Jardín infantil" width={800} height={600} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    {data.jardinCantidad && (
                      <div className="mb-4">
                        <p className="text-5xl md:text-6xl font-black text-brand-gold leading-none" style={acS}>
                          <AnimatedCounter end={data.jardinCantidad} start={0} duration={2000} />
                        </p>
                        <p className="text-sm text-gray-500 font-medium mt-1">Niñas y Niños en grado Jardín</p>
                      </div>
                    )}
                    <p className="text-gray-600 leading-relaxed">{data.jardinTexto}</p>
                  </div>
                </div>
              </div>
            )}
          </Section>

          {/* 18 ─── Ambientes escolares / Infraestructura ─────────── */}
          <Section icon={Hammer} title="Ambientes escolares" accent="favorables">
            {/* Carousel */}
            {data.ambientesFotos && data.ambientesFotos.length > 0 && (
              <div className="relative mb-6 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <div className="aspect-[16/9] relative">
                  <Image
                    src={data.ambientesFotos[ambienteIdx]}
                    alt={`Ambiente escolar ${ambienteIdx + 1}`}
                    fill
                    className="object-cover transition-opacity duration-500"
                  />
                </div>
                {data.ambientesFotos.length > 1 && (
                  <>
                    <button
                      onClick={() => setAmbienteIdx((prev) => (prev === 0 ? data.ambientesFotos!.length - 1 : prev - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-colors"
                      aria-label="Anterior"
                    >
                      <ChevronLeft className="h-5 w-5 text-brand-dark" />
                    </button>
                    <button
                      onClick={() => setAmbienteIdx((prev) => (prev === data.ambientesFotos!.length - 1 ? 0 : prev + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-colors"
                      aria-label="Siguiente"
                    >
                      <ChevronRight className="h-5 w-5 text-brand-dark" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                      {data.ambientesFotos.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setAmbienteIdx(i)}
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${i === ambienteIdx ? "bg-brand-gold" : "bg-white/70 hover:bg-white"}`}
                          style={i === ambienteIdx && isFAAU ? { backgroundColor: R } : undefined}
                          aria-label={`Ir a imagen ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 text-center">
              <p className="text-gray-600 leading-relaxed">{data.infraTexto}</p>

              {data.mantenimientoMonto && (
                <div className="my-5">
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-2">Inversión en mantenimiento</p>
                  <p className="text-4xl md:text-5xl font-black text-brand-dark leading-tight">
                    $<AnimatedCounter end={data.mantenimientoMonto} start={0} duration={2500} />
                  </p>
                </div>
              )}

              <p className="font-bold text-brand-dark text-lg">{data.infraColegios}</p>
              {data.inversionesAdicionales && data.inversionesAdicionales.length > 0 && (
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {data.inversionesAdicionales.map((inv, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                      {inv.foto && (
                        <div className="aspect-[16/9] overflow-hidden">
                          <Image src={inv.foto} alt="Inversión" width={600} height={340} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="p-5">
                        {inv.monto && (
                          <p className="text-2xl md:text-3xl font-black text-brand-dark mb-2">
                            $<AnimatedCounter end={inv.monto} start={0} duration={2000} />
                          </p>
                        )}
                        <p className="text-sm text-gray-600 leading-relaxed">{inv.texto}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Section>

          {/* 19 ─── Gracias ───────────────────────────────────────── */}
          {data.graciasFoto && (
            <section className="py-12 md:py-16">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image src={data.graciasFoto} alt="Gracias" width={1200} height={600} className="w-full h-64 md:h-80 object-cover" />
                <div className="absolute inset-0 bg-brand-dark/70" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12">
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-4">Gracias</h2>
                  <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl">{data.graciasTexto}</p>
                </div>
              </div>
            </section>
          )}

          {/* 20 ─── Documentos ────────────────────────────────────── */}
          <Section icon={FileText} title="Documentación" accent={`Oficial (${data.pdfs.length})`}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.pdfs.map((pdf, i) => (
                <a key={i} href={pdf.href} target="_blank" rel="noopener noreferrer"
                  className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-brand-gold/30 transition-all group flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                    <FileText className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-brand-dark text-sm group-hover:text-brand-gold transition-colors">{pdf.titulo}</p>
                    <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                      <Download className="h-3 w-3" /> Descargar PDF
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </Section>
        </div>

        {/* ─── Comentarios ──────────────────────────────────────────── */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-brand-dark mb-2">
                <MessageSquare className="h-6 w-6 inline mr-2 text-brand-gold" />
                Comentarios de la comunidad
              </h2>
              <p className="text-gray-500 text-sm">Deja tu opinión sobre este informe de gestión social. Tu comentario será visible públicamente.</p>
            </div>
            <form onSubmit={submitComment} className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5"><User className="h-4 w-4 inline mr-1" /> Tu nombre</label>
                  <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Escribe tu nombre"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5"><MessageSquare className="h-4 w-4 inline mr-1" /> Tu comentario</label>
                  <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} rows={3} placeholder="Escribe tu comentario..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all resize-none" />
                </div>
                {err && <p className="text-red-500 text-sm">{err}</p>}
                <button type="submit" disabled={sending}
                  className="bg-brand-dark text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-brand-dark/90 transition-all disabled:opacity-50 flex items-center gap-2">
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {sending ? "Enviando..." : "Publicar comentario"}
                </button>
              </div>
            </form>
            {loadingComments ? (
              <div className="text-center py-8"><Loader2 className="h-6 w-6 animate-spin text-gray-500 mx-auto" /></div>
            ) : comments.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <MessageSquare className="h-10 w-10 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Aún no hay comentarios.</p>
                <p className="text-gray-500 text-sm">Sé el primero en dejar tu opinión.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl border border-gray-100 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{c.nombre.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-brand-dark text-sm">{c.nombre}</p>
                        <p className="text-gray-500 text-sm">{fmtDate(c.createdAt)}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed pl-10">{c.comentario}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
    </ThemeCtx.Provider>
  );
}
