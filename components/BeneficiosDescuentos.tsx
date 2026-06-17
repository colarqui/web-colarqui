"use client";

import { useState } from "react";
import { Briefcase, Banknote, Trophy, Users, ChevronDown, ChevronUp, Gift } from "lucide-react";

interface BeneficioCard {
  icon: React.ElementType;
  titulo: string;
  headline: string;
  subtitulo: string;
  condiciones: string[];
}

const BENEFICIOS: BeneficioCard[] = [
  {
    icon: Briefcase,
    titulo: "Colaboradores",
    headline: "50% Matrícula + Último mes gratis",
    subtitulo: "Para hijos de colaboradores arquidiocesanos",
    condiciones: [
      "50% de descuento en matrícula para todos los hijos.",
      "100% de descuento en la última pensión del año (hasta 2 hijos), con descuento automático por nómina.",
      "Sin descuento por nómina: requiere pagos puntuales y paz y salvo hasta mayo, estudiante que curse todo el año y colaborador activo.",
      "Hijos de colaboradores de otras entidades de la Arquidiócesis de Cali: 50% en matrícula.",
      "Acumulable con otros auxilios institucionales.",
    ],
  },
  {
    icon: Banknote,
    titulo: "Pago Anticipado",
    headline: "10% en Pensiones",
    subtitulo: "Paga el año escolar completo anticipadamente",
    condiciones: [
      "Descuento del 10% sobre el valor de las pensiones por pago anticipado del año completo.",
      "Aplica para estudiantes nuevos y antiguos.",
      "Vigente hasta el 10 de septiembre de 2026.",
    ],
  },
  {
    icon: Trophy,
    titulo: "Mérito Académico",
    headline: "Hasta 100% Matrícula + 50% Pensión",
    subtitulo: "Primer puesto del grado o a nivel institucional",
    condiciones: [
      "1er puesto por salón (1° a 10°): 100% de descuento en matrícula del siguiente año.",
      "1er puesto a nivel institucional: 100% matrícula + 50% pensión del siguiente año.",
      "Aplica para 1 estudiante por colegio. En caso de empate, la comisión de evaluación define al beneficiario.",
      "No aplica para estudiantes del grado 11°.",
      "El beneficio aplica únicamente en el mismo colegio y por un solo año lectivo.",
    ],
  },
  {
    icon: Users,
    titulo: "Grupos Familiares",
    headline: "Hasta 100% Matrícula + 100% Pensión",
    subtitulo: "Familias con 3 o más hijos en el mismo colegio",
    condiciones: [
      "3 hijos matriculados: 100% matrícula + 50% pensión, aplicable al estudiante de menor valor.",
      "4 o más hijos matriculados: 100% matrícula + 100% pensión, aplicable al estudiante de menor valor.",
      "Requiere pago oportuno de todas las pensiones para mantener el beneficio.",
    ],
  },
];

function BeneficioItem({ b }: { b: BeneficioCard }) {
  const [open, setOpen] = useState(false);
  const Icon = b.icon;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-colegio-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon className="h-6 w-6 text-colegio-primary" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">{b.titulo}</div>
            <div className="text-xl font-bold text-brand-dark leading-tight">{b.headline}</div>
          </div>
        </div>
        <p className="text-base text-gray-600 leading-relaxed">{b.subtitulo}</p>
      </div>

      <div className="border-t border-gray-100">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium text-gray-500 hover:text-brand-dark hover:bg-gray-50 transition-colors"
        >
          <span>{open ? "Ocultar condiciones" : "Ver condiciones"}</span>
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {open && (
          <ul className="px-6 pb-5 space-y-2">
            {b.condiciones.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-colegio-primary flex-shrink-0" />
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function BeneficiosDescuentos() {
  return (
    <div>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <Gift className="h-4 w-4" />
          Ahorra en tu matrícula y pensiones
        </div>
        <h2 className="text-3xl font-bold text-brand-dark mb-4">Beneficios y Descuentos</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Accede a descuentos especiales en matrícula y pensión si cumples con alguno de estos requisitos.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {BENEFICIOS.map((b, i) => (
          <BeneficioItem key={i} b={b} />
        ))}
      </div>

      <p className="text-sm text-gray-500 text-center mt-6">
        * Condición general: Para acceder y mantener estos beneficios, se debe garantizar el pago oportuno de las pensiones.
      </p>
    </div>
  );
}
