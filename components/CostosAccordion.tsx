"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Costo {
  grado: string;
  matricula?: number;
  descMatricula?: number | null;
  pension?: number;
  descPension?: number | null;
}

const COP = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

type TabKey = "preescolar" | "primaria" | "secundaria" | "media";

const TABS: { key: TabKey; label: string }[] = [
  { key: "preescolar", label: "Preescolar" },
  { key: "primaria", label: "Básica Primaria" },
  { key: "secundaria", label: "Básica Secundaria" },
  { key: "media", label: "Media" },
];

function classifyGrado(grado: string): TabKey {
  const g = grado.toLowerCase().trim();
  if (g.includes("jardín") || g.includes("jardin") || g.includes("transición") || g.includes("transicion") || g.includes("preescolar")) {
    return "preescolar";
  }
  // Media: 10°-11°
  if (/(10|11)\s*°?/.test(g) || g.includes("décimo") || g.includes("decimo") || g.includes("undécimo") || g.includes("undecimo")) {
    return "media";
  }
  // Secundaria: 6°-9°
  if (/[6-9]\s*°?/.test(g) || g.includes("sexto") || g.includes("séptimo") || g.includes("septimo") || g.includes("octavo") || g.includes("noveno")) {
    return "secundaria";
  }
  // Primaria: 1°-5°
  if (/[1-5]\s*°?/.test(g) || g.includes("primero") || g.includes("segundo") || g.includes("tercero") || g.includes("cuarto") || g.includes("quinto")) {
    return "primaria";
  }
  return "primaria"; // fallback
}

function CostoItem({ c }: { c: Costo }) {
  const [isOpen, setIsOpen] = useState(false);
  const mat = Number(c.matricula) || 0;
  const dMat = Number(c.descMatricula) || 0;
  const pen = Number(c.pension) || 0;
  const dPen = Number(c.descPension) || 0;
  const totMat = Math.max(0, mat - dMat);
  const totPen = Math.max(0, pen - dPen);

  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 bg-colegio-primary text-colegio-primary-fg hover:bg-colegio-primary/90 transition-colors"
      >
        <span className="font-semibold text-sm">{c.grado || "Grado"}</span>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Matrícula */}
          <div className="p-5 space-y-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Matrícula</div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-gray-500">Valor base</span>
              <span className="font-medium text-gray-700">{COP.format(mat)}</span>
            </div>
            {dMat > 0 && (
              <>
                <div className="flex items-baseline justify-between text-green-600">
                  <span className="text-sm">Descuento</span>
                  <span className="font-medium">− {COP.format(dMat)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-brand-dark">Total matrícula</span>
                  <span className="font-bold text-colegio-secondary text-lg">{COP.format(totMat)}</span>
                </div>
              </>
            )}
            {dMat <= 0 && (
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-brand-dark">Total</span>
                <span className="font-bold text-colegio-secondary text-lg">{COP.format(totMat)}</span>
              </div>
            )}
          </div>

          {/* Pensión */}
          <div className="p-5 space-y-3">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pensión mensual</div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-gray-500">Valor base</span>
              <span className="font-medium text-gray-700">{COP.format(pen)}</span>
            </div>
            {dPen > 0 && (
              <>
                <div className="flex items-baseline justify-between text-green-600">
                  <span className="text-sm">Descuento</span>
                  <span className="font-medium">− {COP.format(dPen)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-brand-dark">Total pensión</span>
                  <span className="font-bold text-colegio-secondary text-lg">{COP.format(totPen)}</span>
                </div>
              </>
            )}
            {dPen <= 0 && (
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold text-brand-dark">Total</span>
                <span className="font-bold text-colegio-secondary text-lg">{COP.format(totPen)}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CostosAccordion({ costos }: { costos: Costo[] }) {
  const [activeTab, setActiveTab] = useState<TabKey>("preescolar");

  const grouped: Record<TabKey, Costo[]> = {
    preescolar: [],
    primaria: [],
    secundaria: [],
    media: [],
  };

  for (const c of costos) {
    grouped[classifyGrado(c.grado)].push(c);
  }

  const current = grouped[activeTab];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => {
          const isActive = activeTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-colegio-primary text-colegio-primary-fg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t.label}
              {grouped[t.key].length > 0 && (
                <span className={`ml-1.5 text-xs ${isActive ? "text-white/80" : "text-gray-500"}`}>
                  ({grouped[t.key].length})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Accordion list */}
      <div className="space-y-3">
        {current.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">No hay costos registrados para este nivel.</p>
        ) : (
          current.map((c, i) => <CostoItem key={i} c={c} />)
        )}
      </div>
    </div>
  );
}
