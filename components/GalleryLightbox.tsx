"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  url: string;
  alt?: string;
}

export default function GalleryLightbox({
  items,
  colegioNombre,
}: {
  items: GalleryItem[];
  colegioNombre: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null || i <= 0 ? items.length - 1 : i - 1)),
    [items.length]
  );
  const next = useCallback(
    () => setActive((i) => (i === null || i >= items.length - 1 ? 0 : i + 1)),
    [items.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, prev, next]);

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {items.map((g, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="block w-full rounded-xl overflow-hidden break-inside-avoid cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-colegio-primary/50"
          >
            <img
              src={g.url}
              alt={g.alt || `Foto ${colegioNombre}`}
              className="w-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={close}
        >
          {/* Controles */}
          <button
            onClick={(e) => { e.stopPropagation(); close(); }}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
            aria-label="Cerrar"
          >
            <X className="h-8 w-8" />
          </button>

          {items.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-black/20 rounded-full hover:bg-black/40"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-black/20 rounded-full hover:bg-black/40"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          {/* Imagen */}
          <div
            className="max-w-[90vw] max-h-[85vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={items[active].url}
              alt={items[active].alt || `Foto ${colegioNombre}`}
              className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl"
            />
            {items.length > 1 && (
              <div className="text-center mt-3 text-white/60 text-sm">
                {active + 1} / {items.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
