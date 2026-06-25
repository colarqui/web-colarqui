import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { colegios } from "@/data/colegios";
import ColegiosListR from "./ColegiosListR";

export const dynamic = "force-static";

export default function ColegiosPageR() {
  return (
    <>
      {/* Hero compacto (banda oscura con foto) */}
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/images/estudiantes-hero-colegios.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <span
            className="text-[11px] tracking-[0.2em] uppercase text-brand-gold"
            style={{ fontFamily: "var(--font-civic)", fontWeight: 600 }}
          >
            La Red · Valle del Cauca
          </span>
          <h1
            className="mt-4 text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-3xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            Nuestros <span className="italic text-brand-gold">{colegios.length} colegios</span>
          </h1>
          <p className="mt-5 text-lg text-[#cabfb0] max-w-xl leading-relaxed">
            Encuentra el más cercano a tu hogar. Filtra por zona y calendario, y conoce la propuesta
            de cada uno.
          </p>
        </div>
      </section>

      {/* Filtros + grilla */}
      <ColegiosListR colegios={colegios} />

      {/* CTA */}
      <section className="bg-brand-coral">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2
            className="text-3xl md:text-4xl text-white leading-tight"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            ¿No sabes cuál elegir?
          </h2>
          <p className="mt-4 text-white/85 max-w-xl mx-auto">
            Cuéntale a Sara qué buscas o agenda una visita. Te ayudamos a encontrar el colegio
            ideal para tu familia.
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
