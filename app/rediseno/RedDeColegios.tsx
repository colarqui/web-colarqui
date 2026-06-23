// Firma visual: mapa estilizado de la red de 31 colegios.
// 29 puntos en Cali (oro) + 2 puntos en Yumbo/Jamundí (coral).

const caliPoints = [
  [62, 48], [95, 40], [130, 52], [78, 72], [110, 78], [150, 70], [58, 100],
  [92, 108], [128, 100], [165, 98], [72, 132], [105, 138], [142, 130], [180, 124],
  [60, 160], [98, 166], [135, 162], [172, 158], [85, 192], [122, 196], [158, 188],
  [48, 128], [115, 58], [148, 110], [88, 148], [200, 90], [205, 140], [70, 210],
  [165, 215],
];
const otrosPoints: { xy: [number, number]; label: string }[] = [
  { xy: [225, 60], label: "Yumbo" },
  { xy: [215, 230], label: "Jamundí" },
];

export default function RedDeColegios() {
  return (
    <div className="relative rounded-2xl border border-[#2a261f] bg-[#15120c] overflow-hidden">
      <div
        className="absolute top-3 left-4 text-[10px] tracking-[0.18em] uppercase text-[#6f685b] z-10"
        style={{ fontFamily: "var(--font-archivo)" }}
      >
        Cali · Yumbo · Jamundí
      </div>

      <svg viewBox="0 0 280 280" className="w-full h-auto" role="img" aria-label="Mapa de la red de 31 colegios en Cali, Yumbo y Jamundí">
        <title>Red de 31 colegios arquidiocesanos</title>
        {/* trazos guía suaves */}
        <path
          d="M70 30 L60 90 L80 150 L75 230 M120 25 L110 110 L130 190 M175 40 L165 120 L185 215"
          stroke="#2c281f"
          strokeWidth="1"
          fill="none"
        />
        {/* halo de zona destacada */}
        <circle cx="110" cy="78" r="13" fill="none" stroke="#FBB823" strokeWidth="1.5" opacity="0.7" />

        {/* 29 colegios de Cali */}
        {caliPoints.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4.2" fill="#FBB823" />
        ))}

        {/* Yumbo y Jamundí */}
        {otrosPoints.map(({ xy: [x, y] }, i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="5.2" fill="#EE7363" />
            <circle cx={x} cy={y} r="9" fill="none" stroke="#EE7363" strokeWidth="1" opacity="0.4" />
          </g>
        ))}
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
