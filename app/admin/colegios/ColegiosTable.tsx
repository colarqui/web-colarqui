"use client";

import { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Search, SlidersHorizontal, X, Eye, EyeOff, Loader2 } from "lucide-react";

type Colegio = {
  id: string;
  slug: string;
  nombre: string;
  calendario: string;
  zona: string;
  estudiantes: number;
  publicado: boolean;
};

export default function ColegiosTable({ colegios }: { colegios: Colegio[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [zonaFilter, setZonaFilter] = useState("");
  const [calFilter, setCalFilter] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();
  const [bulkMsg, setBulkMsg] = useState("");

  const zonas = useMemo(() => {
    const set = new Set(colegios.map((c) => c.zona));
    return Array.from(set).sort();
  }, [colegios]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return colegios.filter((c) => {
      const matchNombre = !q || c.nombre.toLowerCase().includes(q) || c.slug.includes(q);
      const matchZona = !zonaFilter || c.zona === zonaFilter;
      const matchCal = !calFilter || c.calendario === calFilter;
      return matchNombre && matchZona && matchCal;
    });
  }, [colegios, query, zonaFilter, calFilter]);

  const hasFilters = query || zonaFilter || calFilter;
  const allFilteredSelected = filtered.length > 0 && filtered.every((c) => selected.has(c.id));

  function clearFilters() {
    setQuery("");
    setZonaFilter("");
    setCalFilter("");
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (allFilteredSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        filtered.forEach((c) => next.delete(c.id));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        filtered.forEach((c) => next.add(c.id));
        return next;
      });
    }
  }

  async function bulkAction(action: "mostrar" | "ocultar") {
    if (selected.size === 0) return;
    setBulkMsg("");
    startTransition(async () => {
      const res = await fetch("/api/colegios/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selected), action }),
      });
      const json = await res.json();
      if (res.ok) {
        setBulkMsg(`✓ ${json.updated} colegio(s) ${action === "mostrar" ? "mostrado(s)" : "ocultado(s)"}`);
        setSelected(new Set());
        router.refresh();
      } else {
        setBulkMsg(`Error: ${json.error}`);
      }
    });
  }

  return (
    <div className="space-y-4">
      {/* Search + filters bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <SlidersHorizontal className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <select
              value={zonaFilter}
              onChange={(e) => setZonaFilter(e.target.value)}
              className="pl-8 pr-6 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 appearance-none bg-white"
            >
              <option value="">Todas las zonas</option>
              {zonas.map((z) => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>
          <select
            value={calFilter}
            onChange={(e) => setCalFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/30 appearance-none bg-white"
          >
            <option value="">Todos los calendarios</option>
            <option value="A">Calendario A</option>
            <option value="B">Calendario B</option>
          </select>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-coral px-2"
              title="Limpiar filtros"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Bulk actions bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 min-h-[36px]">
        <p className="text-sm text-gray-500">
          Mostrando {filtered.length} de {colegios.length} colegios
          {selected.size > 0 && (
            <span className="ml-2 font-semibold text-brand-dark">· {selected.size} seleccionado(s)</span>
          )}
        </p>
        {selected.size > 0 && (
          <div className="flex items-center gap-2">
            {isPending && <Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
            <button
              onClick={() => bulkAction("mostrar")}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 disabled:opacity-50"
            >
              <Eye className="h-3.5 w-3.5" /> Mostrar
            </button>
            <button
              onClick={() => bulkAction("ocultar")}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 disabled:opacity-50"
            >
              <EyeOff className="h-3.5 w-3.5" /> Ocultar
            </button>
            <button
              onClick={() => setSelected(new Set())}
              className="text-xs text-gray-400 hover:text-gray-600 px-1"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      {bulkMsg && (
        <div className={`text-sm px-4 py-2 rounded-lg ${bulkMsg.startsWith("✓") ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
          {bulkMsg}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={allFilteredSelected}
                  onChange={toggleAll}
                  className="rounded accent-brand-dark cursor-pointer"
                  title="Seleccionar todos"
                />
              </th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Calendario</th>
              <th className="px-4 py-3">Zona</th>
              <th className="px-4 py-3">Estudiantes</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((c) => (
              <tr
                key={c.id}
                className={`hover:bg-gray-50 ${selected.has(c.id) ? "bg-brand-gold/5" : ""} ${!c.publicado ? "opacity-50" : ""}`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.has(c.id)}
                    onChange={() => toggleOne(c.id)}
                    className="rounded accent-brand-dark cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-brand-dark">{c.nombre}</div>
                  <div className="text-xs text-gray-500">{c.slug}</div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className="inline-block text-xs bg-brand-gold/20 text-brand-dark px-2 py-0.5 rounded">
                    Cal. {c.calendario}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{c.zona}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{c.estudiantes.toLocaleString("es-CO")}</td>
                <td className="px-4 py-3">
                  {c.publicado ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <Eye className="h-3 w-3" /> Visible
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      <EyeOff className="h-3 w-3" /> Oculto
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/colegios/${c.id}`}
                    className="inline-flex items-center gap-1 text-brand-coral hover:text-brand-dark text-sm font-semibold"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Editar
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                  No se encontraron colegios con los filtros seleccionados.
                  {hasFilters && (
                    <button onClick={clearFilters} className="ml-2 text-brand-coral hover:underline">
                      Limpiar filtros
                    </button>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
