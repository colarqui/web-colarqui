"use client";

// Lanzador flotante de Sara para el rediseño: ancla el chat (ChatIA, que ya
// es launcher + panel) abajo a la izquierda, persistente en toda la página,
// separado del cluster social de la esquina inferior derecha (ScrollToTop).
import ChatIA from "@/components/ChatIA";

export default function SaraFlotante() {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      <ChatIA />
    </div>
  );
}
