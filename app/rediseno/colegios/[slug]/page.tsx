import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, ArrowRight, MapPin, Phone, Mail, Users, GraduationCap,
  CalendarDays, Award, Clock, Check,
} from "lucide-react";
import { colegios } from "@/data/colegios";

export const dynamic = "force-static";

export function generateStaticParams() {
  return colegios.map((c) => ({ slug: c.slug }));
}

export default async function ColegioDetalleR({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const colegio = colegios.find((c) => c.slug === slug);
  if (!colegio) notFound();

  const stats = [
    { icon: Award, valor: colegio.fundacion, label: "Año de fundación" },
    { icon: Users, valor: colegio.estudiantes.toLocaleString("es-CO"), label: "Estudiantes" },
    { icon: GraduationCap, valor: colegio.docentes, label: "Docentes" },
    { icon: CalendarDays, valor: `Cal. ${colegio.calendario}`, label: "Calendario" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <Link
            href="/rediseno/colegios"
            className="inline-flex items-center gap-2 text-[#cabfb0] hover:text-brand-gold transition-colors text-sm mb-10"
          >
            <ArrowLeft className="h-4 w-4" /> Volver a todos los colegios
          </Link>

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
            <div>
              <span
                className="text-[11px] tracking-[0.2em] uppercase text-brand-gold"
                style={{ fontFamily: "var(--font-civic)", fontWeight: 600 }}
              >
                Colegios Arquidiocesanos
              </span>
              <h1
                className="mt-4 text-4xl md:text-5xl leading-[1.05]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
              >
                {colegio.nombre}
              </h1>
              <p className="mt-5 text-lg text-[#cabfb0] max-w-2xl leading-relaxed">
                {colegio.descripcion}
              </p>
              <div className="mt-7 flex items-center gap-2 text-[#a9a194]">
                <MapPin className="h-5 w-5 text-brand-gold flex-none" />
                <span>{colegio.direccion}</span>
              </div>
            </div>

            {colegio.logo && (
              <div className="hidden lg:flex w-56 h-56 rounded-3xl bg-white/5 border border-white/10 items-center justify-center p-8">
                <img src={colegio.logo} alt={`Logo ${colegio.nombre}`} className="max-h-full w-auto object-contain" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Registro de cifras */}
      <section className="bg-[#1a1610] border-t border-[#2a261f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="py-7 px-2 border-r border-[#2a261f] last:border-r-0 flex items-start gap-3">
              <s.icon className="h-5 w-5 text-brand-gold flex-none mt-1" aria-hidden="true" />
              <div>
                <div
                  className="text-2xl text-white leading-none"
                  style={{ fontFamily: "var(--font-civic)", fontWeight: 700 }}
                >
                  {s.valor}
                </div>
                <div className="text-[11px] text-[#8a8275] font-medium mt-1.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Niveles + jornadas */}
      <section className="bg-[#FBF6EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-12">
          {colegio.niveles.length > 0 && (
            <div>
              <h2 className="text-2xl text-brand-dark mb-5" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                Niveles educativos
              </h2>
              <div className="flex flex-wrap gap-2">
                {colegio.niveles.map((n) => (
                  <span key={n} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#e4dccf] text-sm text-brand-dark">
                    <GraduationCap className="h-4 w-4 text-brand-coral" /> {n}
                  </span>
                ))}
              </div>
            </div>
          )}
          {colegio.jornadas.length > 0 && (
            <div>
              <h2 className="text-2xl text-brand-dark mb-5" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
                Jornadas
              </h2>
              <div className="flex flex-wrap gap-2">
                {colegio.jornadas.map((j) => (
                  <span key={j} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#e4dccf] text-sm text-brand-dark">
                    <Clock className="h-4 w-4 text-brand-gold" /> {j}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Características */}
      {colegio.caracteristicas.length > 0 && (
        <section className="bg-white border-y border-[#efe6d7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-2xl md:text-3xl text-brand-dark mb-8" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
              Lo que hace especial a este colegio
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {colegio.caracteristicas.map((c, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#FBF6EE] rounded-2xl border border-[#efe6d7] p-5">
                  <span className="w-8 h-8 rounded-full bg-brand-gold/15 flex items-center justify-center flex-none">
                    <Check className="h-4 w-4 text-[#c79214]" />
                  </span>
                  <span className="text-[#4a443c] text-sm leading-relaxed">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contacto */}
      <section className="bg-[#FBF6EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 bg-white rounded-2xl border border-[#efe6d7] p-6">
              <MapPin className="h-5 w-5 text-brand-coral flex-none mt-0.5" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#b06b5e] mb-1">Dirección</div>
                <p className="text-sm text-[#4a443c]">{colegio.direccion}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-2xl border border-[#efe6d7] p-6">
              <Phone className="h-5 w-5 text-brand-coral flex-none mt-0.5" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#b06b5e] mb-1">Teléfono</div>
                <p className="text-sm text-[#4a443c]">{colegio.telefono}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-2xl border border-[#efe6d7] p-6">
              <Mail className="h-5 w-5 text-brand-coral flex-none mt-0.5" />
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#b06b5e] mb-1">Correo</div>
                <a href={`mailto:${colegio.email}`} className="text-sm text-brand-coral-dark hover:underline break-words">{colegio.email}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-coral">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl text-white leading-tight" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
            ¿Te gustó este colegio?
          </h2>
          <p className="mt-4 text-white/85 max-w-xl mx-auto">
            Inicia el proceso de inscripción o agenda una visita para conocer sus instalaciones.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/rediseno/admisiones"
              className="inline-flex items-center justify-center gap-2 bg-brand-dark text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1f1b14] active:scale-[0.98] transition-all"
            >
              Proceso de admisión
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://runachay.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-dark px-8 py-4 rounded-full font-semibold hover:bg-[#FBF6EE] active:scale-[0.98] transition-all"
            >
              Inscríbete ahora
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
