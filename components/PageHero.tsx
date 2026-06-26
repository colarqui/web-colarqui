// Hero de página interior (línea gráfica del rediseño): banda oscura con foto,
// overlay en degradado, eyebrow dorado (Jost), título Newsreader con acento.
// Usa las variables de fuente cargadas globalmente en el layout raíz.
import React from "react";

export default function PageHero({
  eyebrow,
  imagen,
  subtitulo,
  acciones,
  children,
}: {
  eyebrow?: string;
  imagen: string;
  subtitulo?: React.ReactNode;
  acciones?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-dark text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url('${imagen}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        {eyebrow && (
          <span
            className="text-[11px] tracking-[0.2em] uppercase text-brand-gold"
            style={{ fontFamily: "var(--font-civic)", fontWeight: 600 }}
          >
            {eyebrow}
          </span>
        )}
        <h1
          className="mt-4 text-4xl md:text-5xl lg:text-6xl leading-[1.05] max-w-3xl"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          {children}
        </h1>
        {subtitulo && (
          <p className="mt-5 text-lg text-[#cabfb0] max-w-2xl leading-relaxed">{subtitulo}</p>
        )}
        {acciones && <div className="mt-8 flex flex-col sm:flex-row gap-3">{acciones}</div>}
      </div>
    </section>
  );
}
