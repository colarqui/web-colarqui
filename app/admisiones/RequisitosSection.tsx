"use client";

import { useState } from "react";
import { FileText, Check, ChevronDown, ChevronUp } from "lucide-react";

const requisitosComunes = [
  "Una (1) fotografía reciente a color 3×4 del estudiante",
  "Una (1) fotografía reciente a color 3×4 del padre de familia o acudiente",
  "Una (1) fotocopia de recibo de servicios públicos vigentes y legibles",
  "Certificado médico con talla y peso, expedido por un profesional médico (solo preescolar)",
  "Carnet de vacunas al día, para preescolar (Decreto 2247 de 1997)",
  "Certificado de afiliación al sistema general de seguridad social en salud (EPS, SISBEN)",
  "Recibo de Pago de matrícula y recibo de otros costos",
  "Contrato de prestación de servicios educativos firmados (matrícula privada)",
  "Carta laboral (aplica para responsables financieros)",
  "Carta juramentada",
  "Paz y salvo financiero",
  "Grado 11: Dos fotocopias ampliadas de tarjeta de identidad o cédula (legible)",
  "Autorización de inclusión de imagen",
  "Autorización General de Uso de Datos personales",
  "Consentimiento informado para atención por parte del profesional en psicología",
];

const requisitosNuevo = [
  "Fotocopia de documento de identidad del estudiante, ampliada al 150% (legible)",
  "Fotocopia de documento de identidad padre/madre de familia o acudiente (legible)",
  "Boletín original de calificaciones del año anterior",
  "Certificados de estudios de los grados cursados hasta el momento (aplica a partir de secundaria)",
  "Fotocopia de documento de identidad del responsable financiero (matrícula privada)",
];

export default function RequisitosSection() {
  const [expandido, setExpandido] = useState(false);

  const comunesVisibles = expandido ? requisitosComunes : requisitosComunes.slice(0, 7);

  return (
    <div className="bg-gray-50 p-8 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-brand-coral/10 rounded-xl flex items-center justify-center">
          <FileText className="h-6 w-6 text-brand-coral" />
        </div>
        <h2 className="text-2xl font-bold text-brand-dark">Requisitos</h2>
      </div>

      {/* Comunes */}
      <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wide mb-3">
        Documentos / Registros comunes
      </h3>
      <ul className="space-y-3 mb-6">
        {comunesVisibles.map((req, i) => (
          <li key={`c-${i}`} className="flex items-start gap-3">
            <div className="w-6 h-6 bg-brand-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="h-4 w-4 text-brand-dark" />
            </div>
            <span className="text-gray-700 text-sm leading-relaxed">{req}</span>
          </li>
        ))}
      </ul>

      {!expandido && (
        <button
          onClick={() => setExpandido(true)}
          className="flex items-center gap-2 text-brand-dark font-semibold text-sm hover:text-brand-coral transition-colors mb-6"
        >
          <ChevronDown className="h-4 w-4" />
          Ver todos los requisitos
        </button>
      )}

      {expandido && (
        <>
          {/* Nuevos */}
          <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wide mb-3">
            Si el estudiante es nuevo
          </h3>
          <ul className="space-y-3 mb-6">
            {requisitosNuevo.map((req, i) => (
              <li key={`n-${i}`} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-brand-gold/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-brand-dark" />
                </div>
                <span className="text-gray-700 text-sm leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setExpandido(false)}
            className="flex items-center gap-2 text-brand-dark font-semibold text-sm hover:text-brand-coral transition-colors"
          >
            <ChevronUp className="h-4 w-4" />
            Ver menos
          </button>
        </>
      )}
    </div>
  );
}
