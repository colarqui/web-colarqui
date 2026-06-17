"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="5"/>
      <path d="M17.5 6.5h.01"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const half = window.innerHeight / 2;
      setVisible(window.scrollY > half);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href="https://www.instagram.com/colegios.arquidiocesanos/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white rounded-full p-3 shadow-lg hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2"
      >
        <InstagramIcon />
      </a>
      <a
        href="https://www.facebook.com/col.arquidiocesanos/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="bg-blue-600 text-white rounded-full p-3 shadow-lg hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        <FacebookIcon />
      </a>
      {visible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Volver arriba"
          className="bg-brand-dark text-white rounded-full p-3 shadow-lg hover:bg-brand-dark/90 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
