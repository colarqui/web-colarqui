"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin, Users, Calendar, ArrowRight, School, Search, Filter, X, MapPinned, Map, LayoutGrid } from "lucide-react";
import type { ColegioUI } from "@/lib/models";

const MapaColegios = dynamic(() => import("@/components/MapaColegios"), { ssr: false, loading: () => (
  <div className="flex items-center justify-center h-[680px] bg-gray-100 rounded-2xl text-gray-500 text-sm">
    Cargando mapa...
  </div>
) });

const calendarios = ["Todos", "A", "B"];

export default function ColegiosList({ colegios }: { colegios: ColegioUI[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [zonaActiva, setZonaActiva] = useState("Todas");
  const [calendarioActivo, setCalendarioActivo] = useState("Todos");
  const [vista, setVista] = useState<"lista" | "mapa">("lista");

  const zonas = ["Todas", ...Array.from(new Set(colegios.map((c) => c.zona))).filter(Boolean).sort()];

  const colegiosFiltrados = colegios.filter((colegio) => {
    const matchesSearch =
      colegio.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      colegio.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      colegio.zona.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZona = zonaActiva === "Todas" || colegio.zona === zonaActiva;
    const matchesCalendario = calendarioActivo === "Todos" || colegio.calendario === calendarioActivo;
    return matchesSearch && matchesZona && matchesCalendario;
  });

  const hasActiveFilters = zonaActiva !== "Todas" || calendarioActivo !== "Todos" || searchQuery !== "";
  const colegiosConMapa = colegiosFiltrados;

  const clearFilters = () => {
    setSearchQuery("");
    setZonaActiva("Todas");
    setCalendarioActivo("Todos");
  };

  return (
    <>
      {/* Filters */}
      <section className="border-b border-gray-100 bg-white sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar colegio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold/20 border border-gray-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                <MapPinned className="h-4 w-4 text-gray-400" />
                <select
                  value={zonaActiva}
                  onChange={(e) => setZonaActiva(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none cursor-pointer min-w-[120px]"
                >
                  {zonas.map((zona) => (
                    <option key={zona} value={zona}>
                      {zona === "Todas" ? "Todas las zonas" : zona}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={calendarioActivo}
                  onChange={(e) => setCalendarioActivo(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none cursor-pointer min-w-[140px]"
                >
                  {calendarios.map((cal) => (
                    <option key={cal} value={cal}>
                      {cal === "Todos" ? "Todos los calendarios" : `Calendario ${cal}`}
                    </option>
                  ))}
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm text-brand-coral-dark hover:text-brand-coral-dark/80 hover:bg-brand-coral/5 rounded-xl transition-colors"
                >
                  <X className="h-4 w-4" />
                  Limpiar
                </button>
              )}

              {/* Vista toggle */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 ml-auto">
                <button
                  onClick={() => setVista("lista")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    vista === "lista" ? "bg-white shadow text-brand-dark" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" /> Lista
                </button>
                <button
                  onClick={() => setVista("mapa")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    vista === "mapa" ? "bg-white shadow text-brand-dark" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Map className="h-4 w-4" /> Mapa
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-sm text-gray-600">
            Mostrando <span className="font-semibold text-brand-dark">{colegiosFiltrados.length}</span> colegio{colegiosFiltrados.length !== 1 ? "s" : ""}
            {zonaActiva !== "Todas" && ` en zona ${zonaActiva}`}
            {calendarioActivo !== "Todos" && ` • Calendario ${calendarioActivo}`}
          </p>
        </div>
      </div>

      {calendarioActivo === "A" && (
        <div className="bg-blue-50 border-b border-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-start gap-3">
            <Calendar className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Nota:</span> El calendario <strong>&apos;A&apos;</strong> es el estándar para todos los colegios del estado. Va de febrero a noviembre.
            </p>
          </div>
        </div>
      )}
      {calendarioActivo === "B" && (
        <div className="bg-amber-50 border-b border-amber-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-start gap-3">
            <Calendar className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Nota:</span> El calendario <strong>&apos;B&apos;</strong> es señal de que el colegio es privado, pues este tipo de instituciones tiene libertad de escoger cualquiera de las dos opciones. Va de septiembre a junio.
            </p>
          </div>
        </div>
      )}

      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── VISTA MAPA ── */}
          {vista === "mapa" && (
            <div className="mb-10">
              <MapaColegios colegios={colegiosConMapa} />
            </div>
          )}

          {/* ── VISTA LISTA ── */}
          {vista === "lista" && (
            colegiosFiltrados.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <School className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">No se encontraron colegios</h3>
              <p className="text-gray-600 mb-6">Intenta ajustar los filtros de búsqueda</p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-6 py-3 rounded-xl font-semibold hover:bg-brand-gold/90 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {colegiosFiltrados.map((colegio) => (
                <Link
                  key={colegio.id}
                  href={`/colegios/${colegio.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-48 bg-gradient-to-br from-brand-dark to-[#2a2620] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      {colegio.logo ? (
                        <img src={colegio.logo} alt={`Logo ${colegio.nombre}`} className="max-h-24 max-w-24 w-auto h-auto object-contain drop-shadow-lg" />
                      ) : (
                        <School className="h-20 w-20 text-brand-gold/20" />
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-brand-gold text-brand-dark text-xs font-bold rounded-full">
                        Calendario {colegio.calendario}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark/80 to-transparent p-4">
                      <h3 className="text-xl font-bold text-white">{colegio.nombre}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm mb-3">
                      <MapPin className="h-4 w-4 text-brand-coral" />
                      <span className="text-gray-700">{colegio.zona}</span>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{colegio.descripcion}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {colegio.estudiantes.toLocaleString("es-CO")} estudiantes
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Desde {colegio.fundacion}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {colegio.caracteristicas.slice(0, 3).map((caracteristica, index) => (
                        <span key={index} className="px-2 py-1 bg-brand-coral/10 text-brand-coral-dark text-xs rounded-lg">
                          {caracteristica}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center text-brand-dark font-semibold text-sm group-hover:text-brand-coral transition-colors">
                      Ver más detalles
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )
          )}
        </div>
      </section>
    </>
  );
}
