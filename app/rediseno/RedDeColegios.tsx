"use client";

// Firma visual interactiva: mapa de la red de 31 colegios.
// 29 puntos en Cali (oro) + 2 en Yumbo/Jamundí (coral). Pulso continuo
// escalonado e interacción al pasar el cursor. Respeta prefers-reduced-motion.

import { useEffect, useRef, useState } from "react";

type Punto = { x: number; y: number; nombre: string; zona: string; tipo: "cali" | "otro" };

// Listado real de los 31 colegios (CSV: LINKS DE INSCRIPCIÓN - CAL. A-B).
// Las coordenadas son estilizadas (no geográficas); 29 en Cali (oro) + 2 en
// Yumbo/Jamundí (coral). Las 11 sedes de Llano Verde comparten nombre y se
// distinguen por su zona.
const puntos: Punto[] = [
  { x: 62, y: 48, nombre: "Colegio Santa Isabel de Hungría sede Ciudad 2000", zona: "Cali · Ciudad 2000", tipo: "cali" },
  { x: 95, y: 40, nombre: "Colegio Nuestra Señora de Chiquinquirá", zona: "Cali · Belisario Caicedo", tipo: "cali" },
  { x: 130, y: 52, nombre: "Colegio Parroquial San Juan Bautista", zona: "Cali · El Guabal", tipo: "cali" },
  { x: 78, y: 72, nombre: "Colegio Parroquial Santiago Apóstol", zona: "Cali · San Carlos", tipo: "cali" },
  { x: 110, y: 78, nombre: "Colegio Parroquial San Pedro Claver", zona: "Cali · La Independencia", tipo: "cali" },
  { x: 150, y: 70, nombre: "Instituto Comercial Arquidiocesano", zona: "Cali · Olaya Herrera", tipo: "cali" },
  { x: 58, y: 100, nombre: "Colegio Parroquial Nuestra Señora de Guadalupe", zona: "Cali · Nueva Floresta", tipo: "cali" },
  { x: 92, y: 108, nombre: "Colegio Mayor Santiago de Cali", zona: "Cali · El Troncal", tipo: "cali" },
  { x: 128, y: 100, nombre: "Colegio Parroquial Nuestra Señora de los Andes", zona: "Cali · Los Andes", tipo: "cali" },
  { x: 165, y: 98, nombre: "Colegio Santa Isabel de Hungría sede Alfonso López", zona: "Cali · Alfonso López", tipo: "cali" },
  { x: 72, y: 132, nombre: "I.E. Llano Verde", zona: "Cali · Sede Principal", tipo: "cali" },
  { x: 105, y: 138, nombre: "I.E. Llano Verde", zona: "Cali · Calimio Desepaz", tipo: "cali" },
  { x: 142, y: 130, nombre: "I.E. Llano Verde", zona: "Cali · Calimio Norte", tipo: "cali" },
  { x: 180, y: 124, nombre: "I.E. Llano Verde", zona: "Cali · Invicali Desepaz", tipo: "cali" },
  { x: 60, y: 160, nombre: "I.E. Llano Verde", zona: "Cali · San Felipe", tipo: "cali" },
  { x: 98, y: 166, nombre: "I.E. Llano Verde", zona: "Cali · San Luis", tipo: "cali" },
  { x: 135, y: 162, nombre: "I.E. Llano Verde", zona: "Cali · Aguacatal", tipo: "cali" },
  { x: 172, y: 158, nombre: "I.E. Llano Verde", zona: "Cali · Comuneros II", tipo: "cali" },
  { x: 85, y: 192, nombre: "I.E. Llano Verde", zona: "Cali · Valle Grande", tipo: "cali" },
  { x: 122, y: 196, nombre: "I.E. Llano Verde", zona: "Cali · Marroquín II", tipo: "cali" },
  { x: 158, y: 188, nombre: "I.E. Llano Verde", zona: "Cali · Bonilla Aragón", tipo: "cali" },
  { x: 48, y: 128, nombre: "Colegio Parroquial San Joaquín", zona: "Cali · Mariano Ramos", tipo: "cali" },
  { x: 115, y: 58, nombre: "Colegio Parroquial San Joaquín II", zona: "Cali · El Hormiguero", tipo: "cali" },
  { x: 148, y: 110, nombre: "Colegio Arquidiocesano Juan Pablo II", zona: "Cali · Siloé", tipo: "cali" },
  { x: 88, y: 148, nombre: "Colegio Compartir", zona: "Cali · Ciudadela Desepaz", tipo: "cali" },
  { x: 200, y: 90, nombre: "Centro Docente Parroquial San Marcos", zona: "Cali · Petecuy", tipo: "cali" },
  { x: 205, y: 140, nombre: "Colegio Parroquial San Francisco Javier", zona: "Cali · Orquídeas", tipo: "cali" },
  { x: 70, y: 210, nombre: "Colegio Santa Luisa de Marillac", zona: "Cali · Alfonso López", tipo: "cali" },
  { x: 165, y: 215, nombre: "I.E. Nelson Garcés Vernaza", zona: "Cali · Potrero Grande", tipo: "cali" },
  { x: 225, y: 60, nombre: "I.E. San Francisco Javier", zona: "Yumbo · Puerto Isaac", tipo: "otro" },
  { x: 215, y: 230, nombre: "I.E. Nuestra Señora del Rosario", zona: "Jamundí · Centro", tipo: "otro" },
];

export default function RedDeColegios() {
  const [activo, setActivo] = useState<number | null>(null);
  const [dibujado, setDibujado] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pt = activo !== null ? puntos[activo] : null;

  // Entrada: dibuja las guias y revela los puntos al entrar en viewport.
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDibujado(true);
      return;
    }
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDibujado(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Ancho aproximado del tooltip según el texto más largo de las dos líneas.
  const tipWidth = pt
    ? Math.max(pt.nombre.length, pt.zona.length) * 4.6 + 22
    : 0;
  const tipX = pt ? Math.min(Math.max(pt.x - tipWidth / 2, 4), 280 - tipWidth - 4) : 0;
  const tipAbajo = pt ? pt.y < 54 : false; // si está muy arriba, muestra el tooltip debajo
  const tipY = pt ? (tipAbajo ? pt.y + 12 : pt.y - 46) : 0;

  return (
    <div ref={wrapRef} className="relative rounded-2xl border border-[#2a261f] bg-[#15120c] overflow-hidden">
      <style>{`
        @keyframes redPulso {
          0%   { r: 4.2px; opacity: 1; }
          70%  { r: 13px;  opacity: 0; }
          100% { r: 13px;  opacity: 0; }
        }
        .red-anillo { transform-box: fill-box; transform-origin: center; animation: redPulso 2.8s ease-out infinite; }
        .red-guia { stroke-dasharray: 1; stroke-dashoffset: 1; pathLength: 1; transition: stroke-dashoffset 1.4s ease-out; }
        .red-guia.dibujada { stroke-dashoffset: 0; }
        .red-punto { transform-box: fill-box; transform-origin: center; transform: scale(0); transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1); }
        .red-punto.visible { transform: scale(1); }
        @media (prefers-reduced-motion: reduce) {
          .red-anillo { animation: none; opacity: 0; }
          .red-guia { transition: none; stroke-dashoffset: 0; }
          .red-punto { transition: none; transform: scale(1); }
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

        {/* trazos guía suaves (se dibujan al entrar) */}
        <path
          className={`red-guia ${dibujado ? "dibujada" : ""}`}
          pathLength={1}
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
              className={`red-punto ${dibujado ? "visible" : ""}`}
              onMouseEnter={() => setActivo(i)}
              onMouseLeave={() => setActivo((cur) => (cur === i ? null : cur))}
              onFocus={() => setActivo(i)}
              onBlur={() => setActivo((cur) => (cur === i ? null : cur))}
              tabIndex={0}
              role="button"
              aria-label={`${p.nombre}, ${p.zona}`}
              style={{ cursor: "pointer", outline: "none", transitionDelay: `${0.2 + i * 0.035}s` }}
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
