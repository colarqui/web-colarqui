"use client";

// Botón flotante "volver arriba". Las redes sociales ya viven en el footer
// (en todo el sitio), por lo que se elimina el cluster social flotante para
// reducir la carga visual. Aparece al pasar la mitad del viewport.
import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight / 2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Volver arriba"
        className="bg-brand-dark text-white rounded-full p-3 shadow-lg hover:bg-brand-dark/90 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </div>
  );
}
