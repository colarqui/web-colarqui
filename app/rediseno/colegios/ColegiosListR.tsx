"use client";

// Listado de colegios del rediseño: búsqueda + chips de zona y calendario +
// grilla de tarjetas. Datos estáticos (data/colegios). Línea gráfica nueva.
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Users, School, X, ChevronDown } from "lucide-react";
import type { Colegio } from "@/data/colegios";

const calendarios = ["Todos", "A", "B"] as const;

export default function ColegiosListR({ colegios }: { colegios: Colegio[] }) {
  const [q, setQ] = useState("");
  const [zona, setZona] = useState("Todas");
  const [cal, setCal] = useState<(typeof calendarios)[number]>("Todos");

  const zonas = useMemo(
    () => ["Todas", ...Array.from(new Set(colegios.map((c) => c.zona))).filter(Boolean).sort()],
    [colegios]
  );

  const filtrados = useMemo(
    () =>
      colegios.filter((c) => {
        const t = q.trim().toLowerCase();
        const matchQ = !t || c.nombre.toLowerCase().includes(t) || c.zona.toLowerCase().includes(t);
        const matchZona = zona === "Todas" || c.zona === zona;
        const matchCal = cal === "Todos" || c.calendario === cal;
        return matchQ && matchZona && matchCal;
      }),
    [colegios, q, zona, cal]
  );

  const hayFiltros = q !== "" || zona !== "Todas" || cal !== "Todos";
  const limpiar = () => {
    setQ("");
    setZona("Todas");
    setCal("Todos");
  };

  return (
    <section className="bg-[#FBF6EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Barra de filtros compacta: buscador + zona (dropdown) + calendario (segmentado) */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8a8275]" aria-hidden="true" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre o zona…"
              aria-label="Buscar colegio"
              className="w-full pl-12 pr-4 h-12 rounded-full bg-white border border-[#e4dccf] text-brand-dark placeholder:text-[#8a8275] focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:ml-auto">
            {/* Zona: dropdown (12 opciones -> control compacto) */}
            <div className="relative">
              <select
                value={zona}
                onChange={(e) => setZona(e.target.value)}
                aria-label="Filtrar por zona"
                className="appearance-none w-full sm:w-56 h-12 pl-4 pr-10 rounded-full bg-white border border-[#e4dccf] text-sm text-brand-dark cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
              >
                {zonas.map((z) => (
                  <option key={z} value={z}>{z === "Todas" ? "Todas las zonas" : z}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8275] pointer-events-none" aria-hidden="true" />
            </div>

            {/* Calendario: control segmentado (3 opciones) */}
            <div role="group" aria-label="Filtrar por calendario" className="inline-flex h-12 items-center rounded-full border border-[#e4dccf] bg-white p-1 self-start sm:self-auto">
              {calendarios.map((c) => (
                <button
                  key={c}
                  onClick={() => setCal(c)}
                  aria-pressed={cal === c}
                  className={`h-10 px-4 rounded-full text-sm font-medium transition-colors ${
                    cal === c ? "bg-brand-dark text-white" : "text-[#6a6358] hover:text-brand-dark"
                  }`}
                >
                  {c === "Todos" ? "Todos" : `Cal. ${c}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Conteo + limpiar */}
        <div className="flex items-center justify-between mt-8 mb-6">
          <p className="text-sm text-[#6a6358]">
            <span className="font-semibold text-brand-dark">{filtrados.length}</span>{" "}
            {filtrados.length === 1 ? "colegio" : "colegios"}
            {zona !== "Todas" && ` en ${zona}`}
          </p>
          {hayFiltros && (
            <button onClick={limpiar} className="inline-flex items-center gap-1.5 text-sm text-brand-coral-dark font-medium hover:underline">
              <X className="h-4 w-4" /> Limpiar filtros
            </button>
          )}
        </div>

        {/* Grilla */}
        {filtrados.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#efe6d7]">
            <School className="h-10 w-10 text-[#cabfb0] mx-auto mb-4" aria-hidden="true" />
            <p className="text-lg text-brand-dark font-semibold" style={{ fontFamily: "var(--font-display)" }}>
              No encontramos colegios con esos filtros
            </p>
            <p className="text-[#8a8275] text-sm mt-1 mb-5">Prueba con otra zona o quita algún filtro.</p>
            <button onClick={limpiar} className="inline-flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1f1b14] transition-colors">
              Ver todos los colegios
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtrados.map((c) => (
              <Link
                key={c.id}
                href={`/rediseno/colegios/${c.slug}`}
                className="group block h-full bg-white rounded-2xl overflow-hidden border border-[#efe6d7] hover:shadow-xl hover:shadow-brand-dark/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-44 bg-brand-dark flex items-center justify-center p-6">
                  {c.logo ? (
                    <img
                      src={c.logo}
                      alt={`Logo ${c.nombre}`}
                      loading="lazy"
                      className="max-h-28 w-auto object-contain drop-shadow group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <School className="h-14 w-14 text-brand-gold/40" aria-hidden="true" />
                  )}
                  <span className="absolute top-4 right-4 px-3 py-1 bg-brand-gold text-brand-dark text-xs font-bold rounded-full">
                    Calendario {c.calendario}
                  </span>
                </div>
                <div className="p-6">
                  <h3
                    className="text-lg text-brand-dark leading-snug group-hover:text-brand-coral transition-colors"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                  >
                    {c.nombre}
                  </h3>
                  <div className="flex items-center gap-2 text-[#8a8275] text-sm mt-2">
                    <MapPin className="h-4 w-4 flex-none" />
                    {c.zona}
                  </div>
                  {c.estudiantes > 0 && (
                    <div className="flex items-center gap-2 text-[#8a8275] text-xs mt-3 pt-3 border-t border-[#efe6d7]">
                      <Users className="h-3.5 w-3.5" />
                      {c.estudiantes.toLocaleString("es-CO")} estudiantes
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
