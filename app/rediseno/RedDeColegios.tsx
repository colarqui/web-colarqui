"use client";

// Firma visual interactiva: mapa de la red de 31 colegios.
// 29 puntos en Cali (oro) + 2 en Yumbo/Jamundí (coral). Pulso continuo
// escalonado e interacción al pasar el cursor. Respeta prefers-reduced-motion.

import { useState } from "react";

type Punto = { x: number; y: number; nombre: string; zona: string; tipo: "cali" | "otro" };

const puntos: Punto[] = [
  { x: 62, y: 48, nombre: "Santa Isabel de Hungría", zona: "Cali · Ciudad 2000", tipo: "cali" },
  { x: 95, y: 40, nombre: "San Francisco Javier", zona: "Cali · Suroriente", tipo: "cali" },
  { x: 130, y: 52, nombre: "Nuestra Señora del Rosario", zona: "Cali · Centro", tipo: "cali" },
  { x: 78, y: 72, nombre: "Juan Pablo II", zona: "Cali · Aguablanca", tipo: "cali" },
  { x: 110, y: 78, nombre: "Nuestra Señora de Chiquinquirá", zona: "Cali · Oriente", tipo: "cali" },
  { x: 150, y: 70, nombre: "Mayor Santiago de Cali", zona: "Cali · Norte", tipo: "cali" },
  { x: 58, y: 100, nombre: "Nuestra Señora de los Andes", zona: "Cali · Ladera", tipo: "cali" },
  { x: 92, y: 108, nombre: "Nuestra Señora de Guadalupe", zona: "Cali · Ladera", tipo: "cali" },
  { x: 128, y: 100, nombre: "Instituto Comercial", zona: "Cali · Centro", tipo: "cali" },
  { x: 165, y: 98, nombre: "Nelson Garcés Vernaza", zona: "Cali · Norte", tipo: "cali" },
  { x: 72, y: 132, nombre: "San José", zona: "Cali · Suroccidente", tipo: "cali" },
  { x: 105, y: 138, nombre: "La Anunciación", zona: "Cali · Sur", tipo: "cali" },
  { x: 142, y: 130, nombre: "Cristo Rey", zona: "Cali · Oriente", tipo: "cali" },
  { x: 180, y: 124, nombre: "El Buen Pastor", zona: "Cali · Norte", tipo: "cali" },
  { x: 60, y: 160, nombre: "San Pedro Claver", zona: "Cali · Siloé", tipo: "cali" },
  { x: 98, y: 166, nombre: "Inmaculada Concepción", zona: "Cali · Sur", tipo: "cali" },
  { x: 135, y: 162, nombre: "San Juan Bosco", zona: "Cali · Oriente", tipo: "cali" },
  { x: 172, y: 158, nombre: "Espíritu Santo", zona: "Cali · Norte", tipo: "cali" },
  { x: 85, y: 192, nombre: "Sagrado Corazón", zona: "Cali · Sur", tipo: "cali" },
  { x: 122, y: 196, nombre: "Santa Teresita", zona: "Cali · Meléndez", tipo: "cali" },
  { x: 158, y: 188, nombre: "San Antonio", zona: "Cali · Sur", tipo: "cali" },
  { x: 48, y: 128, nombre: "La Sagrada Familia", zona: "Cali · Ladera", tipo: "cali" },
  { x: 115, y: 58, nombre: "Niño Jesús de Praga", zona: "Cali · Centro", tipo: "cali" },
  { x: 148, y: 110, nombre: "San Vicente", zona: "Cali · Oriente", tipo: "cali" },
  { x: 88, y: 148, nombre: "Madre del Buen Consejo", zona: "Cali · Sur", tipo: "cali" },
  { x: 200, y: 90, nombre: "Nuestra Señora del Carmen", zona: "Cali · Norte", tipo: "cali" },
  { x: 205, y: 140, nombre: "San Luis Gonzaga", zona: "Cali · Oriente", tipo: "cali" },
  { x: 70, y: 210, nombre: "Santa Mónica", zona: "Cali · Sur", tipo: "cali" },
  { x: 165, y: 215, nombre: "San Pablo", zona: "Cali · Sur", tipo: "cali" },
  { x: 225, y: 60, nombre: "San Francisco Javier", zona: "Yumbo", tipo: "otro" },
  { x: 215, y: 230, nombre: "Nuestra Señora del Rosario", zona: "Jamundí", tipo: "otro" },
];

export default function RedDeColegios() {
  const [activo, setActivo] = useState<number | null>(null);
  const pt = activo !== null ? puntos[activo] : null;

  // Ancho aproximado del tooltip según el texto más largo de las dos líneas.
  const tipWidth = pt
    ? Math.max(pt.nombre.length, pt.zona.length) * 4.6 + 22
    : 0;
  const tipX = pt ? Math.min(Math.max(pt.x - tipWidth / 2, 4), 280 - tipWidth - 4) : 0;
  const tipAbajo = pt ? pt.y < 54 : false; // si está muy arriba, muestra el tooltip debajo
  const tipY = pt ? (tipAbajo ? pt.y + 12 : pt.y - 46) : 0;

  return (
    <div className="relative rounded-2xl border border-[#2a261f] bg-[#15120c] overflow-hidden">
      <style>{`
        @keyframes redPulso {
          0%   { r: 4.2px; opacity: 1; }
          70%  { r: 13px;  opacity: 0; }
          100% { r: 13px;  opacity: 0; }
        }
        .red-anillo { transform-box: fill-box; transform-origin: center; animation: redPulso 2.8s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .red-anillo { animation: none; opacity: 0; }
        }
      `}</style>

      <div
        className="absolute top-3 left-4 text-[10px] tracking-[0.18em] uppercase text-[#6f685b] z-10"
        style={{ fontFamily: "var(--font-archivo)" }}
      >
        Cali · Yumbo · Jamundí
      </div>

      <svg
        viewBox="0 0 280 280"
        className="w-full h-auto"
        role="img"
        aria-label="Mapa interactivo de la red de 31 colegios en Cali, Yumbo y Jamundí"
      >
        <title>Red de 31 colegios arquidiocesanos</title>

        {/* trazos guía suaves */}
        <path
          d="M70 30 L60 90 L80 150 L75 230 M120 25 L110 110 L130 190 M175 40 L165 120 L185 215"
          stroke="#2c281f"
          strokeWidth="1"
          fill="none"
        />

        {puntos.map((p, i) => {
          const color = p.tipo === "cali" ? "#FBB823" : "#EE7363";
          const activoEste = activo === i;
          return (
            <g
              key={i}
              onMouseEnter={() => setActivo(i)}
              onMouseLeave={() => setActivo((cur) => (cur === i ? null : cur))}
              onFocus={() => setActivo(i)}
              onBlur={() => setActivo((cur) => (cur === i ? null : cur))}
              tabIndex={0}
              role="button"
              aria-label={`${p.nombre} — ${p.zona}`}
              style={{ cursor: "pointer", outline: "none" }}
            >
              {/* anillo de pulso */}
              <circle
                className="red-anillo"
                cx={p.x}
                cy={p.y}
                r="4.2"
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                style={{ animationDelay: `${(i % 7) * 0.4}s` }}
              />
              {/* halo en hover */}
              {activoEste && (
                <circle cx={p.x} cy={p.y} r="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
              )}
              {/* área de captura invisible (más grande que el punto) */}
              <circle cx={p.x} cy={p.y} r="11" fill="transparent" />
              {/* punto */}
              <circle
                cx={p.x}
                cy={p.y}
                r={activoEste ? 6.2 : 4.2}
                fill={color}
                style={{ transition: "r 0.18s ease" }}
              />
            </g>
          );
        })}

        {/* tooltip */}
        {pt && (
          <g style={{ pointerEvents: "none" }}>
            <rect
              x={tipX}
              y={tipY}
              width={tipWidth}
              height="34"
              rx="6"
              fill="#FBF6EE"
            />
            <text
              x={tipX + 11}
              y={tipY + 15}
              fill="#12100B"
              style={{ fontFamily: "var(--font-archivo)", fontWeight: 700, fontSize: "9.5px" }}
            >
              {pt.nombre}
            </text>
            <text
              x={tipX + 11}
              y={tipY + 27}
              fill="#8a6a14"
              style={{ fontFamily: "var(--font-inter-redis)", fontWeight: 500, fontSize: "8px" }}
            >
              {pt.zona}
            </text>
          </g>
        )}
      </svg>

      {/* leyenda */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center gap-5 text-[10px] text-[#8a8275]">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-gold" /> Cali (29)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand-coral" /> Yumbo · Jamundí (2)
        </span>
      </div>
    </div>
  );
}
