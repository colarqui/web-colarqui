"use client";

import Link from "next/link";
import { Menu, X, ChevronDown, Mail, Clock, MapPin, Phone, MessageCircle, FileText, FileCheck, Building2, UserCircle } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

type NavItem = { label: string; href: string };

const quienesSomosItems: NavItem[] = [
  { label: "Horizonte Institucional", href: "/quienes-somos/horizonte" },
  { label: "Pastoral Educativa", href: "/quienes-somos/pastoral" },
  { label: "Manuales y Políticas", href: "/documentos" },
];

const serviciosEnLineaItems: NavItem[] = [
  { label: "Portal Runachay", href: "https://runachay.runacode.com/public/" },
  { label: "Certificados Tributarios", href: "https://sih-retenciones.colegiosarquidiocesanos.edu.co/" },
];

const transparenciaItems: NavItem[] = [
  { label: "Informes de Gestión Social", href: "/transparencia/informes-gestion-social" },
  { label: "Comité de Convivencia Laboral", href: "/transparencia/comite-convivencia" },
  { label: "Protocolo de Prevención de Acoso", href: "/transparencia/protocolo-acoso" },
  { label: "Buzón PQRSF", href: "/servicios/pqrsf" },
];

function Dropdown({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-gray-600 hover:text-brand-dark font-bold transition-colors py-2"
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {/* Puente invisible que cubre el gap entre botón y panel */}
      {open && <div className="absolute top-full left-0 right-0 h-2" />}
      {open && (
        <div className="absolute top-full left-0 pt-2 w-64 z-50">
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2">
            {items.map((item) => {
              const isExternal = item.href.startsWith("http");
              return isExternal ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-dark transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-dark transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<"notificaciones" | "proveedores" | null>(null);

  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
      document.addEventListener("keydown", handleEsc);
      return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", handleEsc); };
    }
    document.body.style.overflow = "";
  }, [activeModal]);

  return (
    <>
    {/* Top Bar - Accesos externos */}
    <div className="bg-brand-dark text-white text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:flex items-center justify-end gap-6 h-9">
          <a
            href="https://sih-agile.colegiosarquidiocesanos.edu.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-gold transition-colors flex items-center gap-1.5"
          >
            <Building2 className="h-3.5 w-3.5" />
            Portal Agile
          </a>
          <a
            href="https://sih-retenciones.colegiosarquidiocesanos.edu.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-gold transition-colors flex items-center gap-1.5"
          >
            <FileCheck className="h-3.5 w-3.5" />
            Certificados Tributarios
          </a>
          <button
            onClick={() => setActiveModal("proveedores")}
            className="hover:text-brand-gold transition-colors flex items-center gap-1.5"
          >
            <FileText className="h-3.5 w-3.5" />
            Proveedores
          </button>
          <button
            onClick={() => setActiveModal("notificaciones")}
            className="hover:text-brand-gold transition-colors flex items-center gap-1.5"
          >
            <Mail className="h-3.5 w-3.5" />
            Notificaciones Judiciales
          </button>
          <Link
            href="/quienes-somos/directorio"
            className="hover:text-brand-gold transition-colors flex items-center gap-1.5"
          >
            <Phone className="h-3.5 w-3.5" />
            Directorio Telefónico
          </Link>
          <Link
            href="/quienes-somos/trabaja-con-nosotros"
            className="hover:text-brand-gold transition-colors flex items-center gap-1.5"
          >
            <UserCircle className="h-3.5 w-3.5" />
            Trabaja con Nosotros
          </Link>
        </div>
      </div>
    </div>

    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/logos/logo-colegios-horizontal.png"
              alt="Colegios Arquidiocesanos"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5">
            <Dropdown label="Quiénes Somos" items={quienesSomosItems} />
            <Link href="/colegios" className="text-gray-700 hover:text-brand-dark font-bold transition-colors">
              Colegios
            </Link>
            <Link href="/admisiones" className="text-gray-700 hover:text-brand-dark font-bold transition-colors">
              Admisiones
            </Link>
            <Link href="/noticias" className="text-gray-700 hover:text-brand-dark font-bold transition-colors">
              Noticias
            </Link>
            <Dropdown label="Transparencia" items={transparenciaItems} />
            <a
              href="https://runachay.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-gold text-brand-dark px-4 py-2 rounded-xl font-semibold hover:bg-brand-gold/90 transition-colors text-sm"
            >
              RUNACHAY
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-gold/50 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-100 max-h-[70vh] overflow-y-auto">
            <div className="flex flex-col gap-1">
              <div className="px-2 py-2 font-bold text-brand-dark text-sm uppercase tracking-wider">Quiénes Somos</div>
              {quienesSomosItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="pl-4 py-2 text-sm text-gray-600 hover:text-brand-dark"
                >
                  {item.label}
                </Link>
              ))}

              <Link href="/colegios" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 font-bold text-gray-700 hover:text-brand-dark">
                Colegios
              </Link>
              <Link href="/admisiones" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 font-bold text-gray-700 hover:text-brand-dark">
                Admisiones
              </Link>

              <Link href="/noticias" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 font-bold text-gray-700 hover:text-brand-dark mt-2">
                Noticias
              </Link>
              <div className="px-2 py-2 font-bold text-brand-dark text-sm uppercase tracking-wider mt-2">Transparencia</div>
              {transparenciaItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="pl-4 py-2 text-sm text-gray-600 hover:text-brand-dark"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://runachay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-gold text-brand-dark px-5 py-3 rounded-xl font-semibold text-center mt-2"
              >
                RUNACHAY
              </a>
              <div className="px-2 py-2 font-bold text-brand-dark text-sm uppercase tracking-wider mt-3 border-t border-gray-100 pt-2">Accesos</div>
              <Link
                href="/quienes-somos/directorio"
                onClick={() => setIsMenuOpen(false)}
                className="pl-4 py-2 text-sm text-gray-600 hover:text-brand-dark flex items-center gap-2"
              >
                <Phone className="h-4 w-4" /> Directorio Telefónico
              </Link>
              <a
                href="https://sih-agile.colegiosarquidiocesanos.edu.co/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="pl-4 py-2 text-sm text-gray-600 hover:text-brand-dark flex items-center gap-2"
              >
                <Building2 className="h-4 w-4" /> Portal Agile
              </a>
              <a
                href="https://sih-retenciones.colegiosarquidiocesanos.edu.co/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="pl-4 py-2 text-sm text-gray-600 hover:text-brand-dark flex items-center gap-2"
              >
                <FileCheck className="h-4 w-4" /> Certificados Tributarios
              </a>
              <button
                onClick={() => { setIsMenuOpen(false); setActiveModal("proveedores"); }}
                className="w-full text-left pl-4 py-2 text-sm text-gray-600 hover:text-brand-dark flex items-center gap-2"
              >
                <FileText className="h-4 w-4" /> Proveedores
              </button>
              <button
                onClick={() => { setIsMenuOpen(false); setActiveModal("notificaciones"); }}
                className="w-full text-left pl-4 py-2 text-sm text-gray-600 hover:text-brand-dark flex items-center gap-2"
              >
                <Mail className="h-4 w-4" /> Notificaciones Judiciales
              </button>
              <Link
                href="/quienes-somos/trabaja-con-nosotros"
                onClick={() => setIsMenuOpen(false)}
                className="pl-4 py-2 text-sm text-gray-600 hover:text-brand-dark flex items-center gap-2"
              >
                <UserCircle className="h-4 w-4" /> Trabaja con Nosotros
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>

    {/* Modal Notificaciones Judiciales */}
    {activeModal === "notificaciones" && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-notificaciones-title">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="bg-brand-dark px-6 py-5 flex items-center justify-between">
            <h3 id="modal-notificaciones-title" className="text-xl font-bold text-white flex items-center gap-2"><FileText className="h-5 w-5 text-brand-gold" /> Notificaciones Judiciales</h3>
            <button onClick={closeModal} aria-label="Cerrar notificaciones judiciales" className="text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg p-1"><X className="h-6 w-6" /></button>
          </div>
          <div className="p-6 space-y-5">
            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100">
              <Mail className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Correo para notificaciones judiciales</p>
                <a href="mailto:notificacionesjudiciales@arquidiocesanos.edu.co" className="text-sm text-brand-coral-dark font-medium hover:underline break-all">notificacionesjudiciales@arquidiocesanos.edu.co</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-800">Estimado usuario:</span> se le informa que este correo es única y exclusivamente para notificaciones judiciales. El horario de radicación de las notificaciones judiciales enviadas al correo electrónico provisto para tal fin es de <span className="font-semibold text-brand-dark">07:00 a.m. a 05:00 p.m.</span> los días hábiles.
              </p>
            </div>
            <button onClick={closeModal} className="w-full bg-brand-gold text-brand-dark py-3 rounded-xl font-bold hover:bg-brand-gold/90 transition-colors">Cerrar</button>
          </div>
        </div>
      </div>
    )}

    {/* Modal Proveedores */}
    {activeModal === "proveedores" && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-proveedores-title">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="bg-brand-dark px-6 py-5 flex items-center justify-between">
            <h3 id="modal-proveedores-title" className="text-xl font-bold text-white flex items-center gap-2"><Building2 className="h-5 w-5 text-brand-gold" /> Proveedores</h3>
            <button onClick={closeModal} aria-label="Cerrar proveedores" className="text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg p-1"><X className="h-6 w-6" /></button>
          </div>
          <div className="p-6 space-y-5">
            <div className="text-center">
              <p className="text-lg font-bold text-brand-dark mb-1">¿Eres proveedor de productos o servicios?</p>
              <p className="text-sm text-gray-600">Estamos siempre abiertos a nuevas oportunidades de colaboración. Si deseas presentar tu portafolio de servicios o catálogo de productos, no dudes en contactarnos.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3 border border-gray-100">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-brand-coral mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Horarios de atención</p>
                  <p className="text-sm text-gray-600">Todos los martes de 8:00 a.m. a 12:00 p.m.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-coral mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Dirección</p>
                  <p className="text-sm text-gray-600">Cra 7h Bis #76-25 Barrio Alfonso López, Ventanilla Única</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-brand-coral mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Números de contacto</p>
                  <p className="text-sm text-gray-600">Tel: <a href="tel:6024850227" className="text-brand-coral-dark font-medium hover:underline">485 0227</a> Ext. 1031</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-brand-coral mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Solo WhatsApp</p>
                  <a href="https://wa.me/573164052640" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-coral-dark font-medium hover:underline">+57 316 405 2640</a>
                </div>
              </div>
            </div>
            <button onClick={closeModal} className="w-full bg-brand-gold text-brand-dark py-3 rounded-xl font-bold hover:bg-brand-gold/90 transition-colors">Cerrar</button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
