"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MapPin, Users, ArrowRight, School } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { ColegioUI } from "@/lib/models";
import { COORDS } from "@/data/coords-colegios";

type Props = {
  colegios: ColegioUI[];
};

export default function MapaColegios({ colegios }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const cardsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const colegiosConCoords = colegios.filter((c) => COORDS[c.slug]);

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    const map = L.map(mapRef.current, {
      center: [3.4516, -76.532],
      zoom: 12,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    leafletMap.current = map;

    colegiosConCoords.forEach((colegio) => {
      const [lat, lng] = COORDS[colegio.slug];
      const isB = colegio.calendario === "B";
      const color = isB ? "#D97706" : "#1D4ED8";
      const label = `Cal. ${colegio.calendario}`;

      const icon = L.divIcon({
        className: "",
        html: `
          <div style="
            background:${color};
            color:#fff;
            font-size:10px;
            font-weight:700;
            padding:3px 7px;
            border-radius:999px;
            white-space:nowrap;
            box-shadow:0 2px 6px rgba(0,0,0,0.3);
            border:2px solid #fff;
            cursor:pointer;
          ">${label}</div>`,
        iconAnchor: [28, 14],
      });

      const marker = L.marker([lat, lng], { icon })
        .addTo(map)
        .on("click", () => {
          setActiveSlug(colegio.slug);
          const el = cardsRef.current[colegio.slug];
          if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });

      markersRef.current[colegio.slug] = marker;
    });

    return () => {
      map.remove();
      leafletMap.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!leafletMap.current) return;
    const map = leafletMap.current;
    const existing = Object.keys(markersRef.current);
    const visible = new Set(colegiosConCoords.map((c) => c.slug));

    existing.forEach((slug) => {
      const marker = markersRef.current[slug];
      if (visible.has(slug)) {
        if (!map.hasLayer(marker)) marker.addTo(map);
      } else {
        if (map.hasLayer(marker)) map.removeLayer(marker);
      }
    });
  }, [colegiosConCoords]);

  function flyTo(slug: string) {
    const coords = COORDS[slug];
    if (coords && leafletMap.current) {
      leafletMap.current.flyTo(coords, 15, { duration: 0.8 });
    }
    setActiveSlug(slug);
  }

  return (
    <div className="flex flex-col lg:flex-row gap-0 h-[680px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
      {/* Map */}
      <div className="flex-1 min-h-[300px] lg:min-h-0 relative">
        <div ref={mapRef} className="w-full h-full z-10" />
        {colegiosConCoords.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
            Ningún colegio con coordenadas disponible
          </div>
        )}
      </div>

      {/* Cards sidebar */}
      <div className="w-full lg:w-[360px] bg-white flex flex-col border-t lg:border-t-0 lg:border-l border-gray-200">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
          <span className="text-sm font-semibold text-brand-dark">
            {colegiosConCoords.length} colegio{colegiosConCoords.length !== 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-700" /> Cal. A
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-amber-600" /> Cal. B
            </span>
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {colegiosConCoords.map((colegio) => {
            const isActive = activeSlug === colegio.slug;
            const isB = colegio.calendario === "B";
            return (
              <div
                key={colegio.slug}
                ref={(el) => { cardsRef.current[colegio.slug] = el; }}
                onClick={() => flyTo(colegio.slug)}
                className={`px-4 py-3 border-b border-gray-100 cursor-pointer transition-colors ${
                  isActive ? "bg-brand-gold/10 border-l-4 border-l-brand-gold" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  {colegio.logo ? (
                    <img src={colegio.logo} alt="" className="w-9 h-9 object-contain shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                      <School className="h-4 w-4 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          isB ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        Cal. {colegio.calendario}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-brand-dark leading-snug line-clamp-2">
                      {colegio.nombre}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="h-3 w-3 shrink-0" /> {colegio.zona}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Users className="h-3 w-3 shrink-0" />
                      {colegio.estudiantes.toLocaleString("es-CO")} estudiantes
                    </p>
                  </div>
                  <Link
                    href={`/colegios/${colegio.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 text-brand-coral hover:text-brand-dark mt-1"
                    title="Ver colegio"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
          {colegiosConCoords.length === 0 && (
            <div className="p-8 text-center text-gray-400 text-sm">
              Sin resultados con los filtros actuales
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
