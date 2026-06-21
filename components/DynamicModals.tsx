"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Modal {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  badge: string | null;
  ctaText: string | null;
  ctaUrl: string | null;
  trigger: string;
  delaySeconds: number;
  scrollPercent: number;
  showOnce: boolean;
  position: string;
}

export default function DynamicModals() {
  const [modals, setModals] = useState<Modal[]>([]);
  const [shown, setShown] = useState<Set<string>>(new Set());
  const [visibleId, setVisibleId] = useState<string | null>(null);

  useEffect(() => {
    const pageUrl = window.location.pathname;
    fetch(`/api/modales?pageUrl=${encodeURIComponent(pageUrl)}`)
      .then((r) => r.json())
      .then((data: Modal[]) => {
        setModals(data);
        data.forEach((m) => {
          if (m.trigger === "immediate") showModal(m);
          else if (m.trigger === "delay") {
            setTimeout(() => showModal(m), (m.delaySeconds || 0) * 1000);
          }
        });
      });
  }, []);

  useEffect(() => {
    function onScroll() {
      const scrollPct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      modals.forEach((m) => {
        if (m.trigger === "scroll" && scrollPct >= (m.scrollPercent || 0)) {
          showModal(m);
        }
      });
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [modals]);

  useEffect(() => {
    function onMouseLeave(e: MouseEvent) {
      if (e.clientY < 10) {
        modals.forEach((m) => {
          if (m.trigger === "exit_intent") showModal(m);
        });
      }
    }
    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, [modals]);

  function showModal(m: Modal) {
    if (m.showOnce && shown.has(m.id)) return;
    setShown((prev) => new Set(prev).add(m.id));
    setVisibleId(m.id);
  }

  function close() {
    setVisibleId(null);
  }

  const modal = modals.find((m) => m.id === visibleId);
  if (!modal) return null;

  const isCenter = modal.position === "center";

  return (
    <div className={`fixed inset-0 z-[100] ${isCenter ? "flex items-center justify-center bg-black/50" : "pointer-events-none"}`}>
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden pointer-events-auto ${
          isCenter ? "" : "fixed bottom-4 right-4"
        }`}
      >
        {modal.imageUrl && (
          <div className="relative h-40">
            <img src={modal.imageUrl} alt="" className="w-full h-full object-cover" />
            <button onClick={close} className="absolute top-2 right-2 p-1.5 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="p-6">
          {!modal.imageUrl && (
            <button onClick={close} className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
          {modal.badge && (
            <span className="inline-block px-3 py-1 bg-brand-gold/10 text-brand-dark text-xs font-bold rounded-full mb-3">
              {modal.badge}
            </span>
          )}
          <h3 className="text-xl font-bold text-brand-dark mb-2">{modal.title}</h3>
          {modal.content && <p className="text-gray-600 text-sm leading-relaxed mb-4">{modal.content}</p>}
          {modal.ctaText && modal.ctaUrl && (
            <a
              href={modal.ctaUrl}
              target={modal.ctaUrl.startsWith("http") ? "_blank" : undefined}
              rel={modal.ctaUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-dark px-6 py-2.5 rounded-xl font-semibold hover:bg-brand-gold/90 transition-colors text-sm"
            >
              {modal.ctaText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
