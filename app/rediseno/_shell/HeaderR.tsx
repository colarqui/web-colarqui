"use client";

// Header del rediseño: MISMA estructura/IA que el Header de producción
// (barra de accesos, menús desplegables, RUNACHAY, menú móvil, modales), con
// la piel de la nueva línea gráfica (paleta de marca, Jost/Inter, pills, bordes
// cálidos). No cambia ningún destino de navegación.
import Link from "next/link";
import { Menu, X, ChevronDown, Mail, Clock, MapPin, Phone, MessageCircle, FileText, FileCheck, Building2, UserCircle } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

type NavItem = { label: string; href: string };

const quienesSomosItems: NavItem[] = [
  { label: "Horizonte Institucional", href: "/rediseno/quienes-somos/horizonte" },
  { label: "Pastoral Educativa", href: "/rediseno/quienes-somos/pastoral" },
  { label: "Manuales y Políticas", href: "/rediseno/documentos" },
];

const transparenciaItems: NavItem[] = [
  { label: "Informes de Gestión Social", href: "/rediseno/transparencia/informes-gestion-social" },
  { label: "Comité de Convivencia Laboral", href: "/rediseno/transparencia/comite-convivencia" },
  { label: "Protocolo de Prevención de Acoso", href: "/rediseno/transparencia/protocolo-acoso" },
  { label: "Buzón PQRSF", href: "/rediseno/servicios/pqrsf" },
];

function Dropdown({ label, items }: { label: string; items: NavItem[] }) {
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
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
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
        className="flex items-center gap-1 text-brand-dark/75 hover:text-brand-coral font-medium transition-colors py-2"
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="absolute top-full left-0 right-0 h-2" />}
      {open && (
        <div className="absolute top-full left-0 pt-2 w-64 z-50">
          <div className="bg-white rounded-2xl shadow-xl shadow-brand-dark/5 border border-[#efe6d7] py-2">
            {items.map((item) => {
              const isExternal = item.href.startsWith("http");
              return isExternal ? (
                <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm text-[#6a6358] hover:bg-[#FBF6EE] hover:text-brand-coral transition-colors">
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm text-[#6a6358] hover:bg-[#FBF6EE] hover:text-brand-coral transition-colors">
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

export default function HeaderR() {
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

  const navLink = "text-brand-dark/75 hover:text-brand-coral font-medium transition-colors";

  return (
    <>
      {/* Top Bar - Accesos externos */}
      <div className="bg-brand-dark text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:flex items-center justify-end gap-6 h-9">
            <a href="https://sih-agile.colegiosarquidiocesanos.edu.co/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-brand-gold transition-colors flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" /> Portal Agile
            </a>
            <a href="https://sih-retenciones.colegiosarquidiocesanos.edu.co/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-brand-gold transition-colors flex items-center gap-1.5">
              <FileCheck className="h-3.5 w-3.5" /> Certificados Tributarios
            </a>
            <button onClick={() => setActiveModal("proveedores")} className="text-white/80 hover:text-brand-gold transition-colors flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" /> Proveedores
            </button>
            <button onClick={() => setActiveModal("notificaciones")} className="text-white/80 hover:text-brand-gold transition-colors flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> Notificaciones Judiciales
            </button>
            <Link href="/rediseno/quienes-somos/directorio" className="text-white/80 hover:text-brand-gold transition-colors flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> Directorio Telefónico
            </Link>
            <Link href="/rediseno/quienes-somos/trabaja-con-nosotros" className="text-brand-gold hover:text-brand-gold/80 transition-colors flex items-center gap-1.5">
              <UserCircle className="h-3.5 w-3.5" /> Trabaja con Nosotros
            </Link>
          </div>
        </div>
      </div>

      <header className="bg-[#FBF6EE]/90 backdrop-blur-md border-b border-[#efe6d7] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/rediseno" className="flex items-center">
              <img src="/logos/logo-colegios-horizontal.png" alt="Colegios Arquidiocesanos" className="h-12 w-auto" />
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Dropdown label="Quiénes Somos" items={quienesSomosItems} />
              <Link href="/rediseno/colegios" className={navLink}>Colegios</Link>
              <Link href="/rediseno/admisiones" className={navLink}>Admisiones</Link>
              <Link href="/rediseno/noticias" className={navLink}>Noticias</Link>
              <Dropdown label="Transparencia" items={transparenciaItems} />
              <a href="https://runachay.com" target="_blank" rel="noopener noreferrer"
                className="bg-brand-gold text-brand-dark px-5 py-2.5 rounded-full font-semibold hover:bg-[#ffc94d] active:scale-[0.98] transition-all text-sm">
                RUNACHAY
              </a>
            </nav>

            <button
              className="lg:hidden p-2 text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-gold/50 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-[#efe6d7] max-h-[70vh] overflow-y-auto">
              <div className="flex flex-col gap-1">
                <div className="px-2 py-2 font-semibold text-brand-coral-dark text-xs uppercase tracking-wider">Quiénes Somos</div>
                {quienesSomosItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="pl-4 py-2 text-sm text-[#6a6358] hover:text-brand-coral">
                    {item.label}
                  </Link>
                ))}
                <Link href="/rediseno/colegios" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 font-medium text-brand-dark hover:text-brand-coral">Colegios</Link>
                <Link href="/rediseno/admisiones" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 font-medium text-brand-dark hover:text-brand-coral">Admisiones</Link>
                <Link href="/rediseno/noticias" onClick={() => setIsMenuOpen(false)} className="px-2 py-2 font-medium text-brand-dark hover:text-brand-coral mt-1">Noticias</Link>
                <div className="px-2 py-2 font-semibold text-brand-coral-dark text-xs uppercase tracking-wider mt-2">Transparencia</div>
                {transparenciaItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="pl-4 py-2 text-sm text-[#6a6358] hover:text-brand-coral">
                    {item.label}
                  </Link>
                ))}
                <a href="https://runachay.com" target="_blank" rel="noopener noreferrer"
                  className="bg-brand-gold text-brand-dark px-5 py-3 rounded-full font-semibold text-center mt-3">
                  RUNACHAY
                </a>
                <div className="px-2 py-2 font-semibold text-brand-coral-dark text-xs uppercase tracking-wider mt-3 border-t border-[#efe6d7] pt-3">Accesos</div>
                <Link href="/rediseno/quienes-somos/directorio" onClick={() => setIsMenuOpen(false)} className="pl-4 py-2 text-sm text-[#6a6358] hover:text-brand-coral flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Directorio Telefónico
                </Link>
                <a href="https://sih-agile.colegiosarquidiocesanos.edu.co/" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="pl-4 py-2 text-sm text-[#6a6358] hover:text-brand-coral flex items-center gap-2">
                  <Building2 className="h-4 w-4" /> Portal Agile
                </a>
                <a href="https://sih-retenciones.colegiosarquidiocesanos.edu.co/" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="pl-4 py-2 text-sm text-[#6a6358] hover:text-brand-coral flex items-center gap-2">
                  <FileCheck className="h-4 w-4" /> Certificados Tributarios
                </a>
                <button onClick={() => { setIsMenuOpen(false); setActiveModal("proveedores"); }} className="w-full text-left pl-4 py-2 text-sm text-[#6a6358] hover:text-brand-coral flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Proveedores
                </button>
                <button onClick={() => { setIsMenuOpen(false); setActiveModal("notificaciones"); }} className="w-full text-left pl-4 py-2 text-sm text-[#6a6358] hover:text-brand-coral flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Notificaciones Judiciales
                </button>
                <Link href="/rediseno/quienes-somos/trabaja-con-nosotros" onClick={() => setIsMenuOpen(false)} className="pl-4 py-2 text-sm text-[#6a6358] hover:text-brand-coral flex items-center gap-2">
                  <UserCircle className="h-4 w-4" /> Trabaja con Nosotros
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Modal Notificaciones Judiciales */}
      {activeModal === "notificaciones" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modalR-notificaciones-title">
          <div className="absolute inset-0 bg-brand-dark/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-brand-dark px-6 py-5 flex items-center justify-between">
              <h3 id="modalR-notificaciones-title" className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}><FileText className="h-5 w-5 text-brand-gold" /> Notificaciones Judiciales</h3>
              <button onClick={closeModal} aria-label="Cerrar" className="text-white/70 hover:text-white transition-colors p-1"><X className="h-6 w-6" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-start gap-3 bg-[#FBF6EE] p-4 rounded-xl border border-[#efe6d7]">
                <Mail className="h-5 w-5 text-brand-coral mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-brand-dark mb-1">Correo para notificaciones judiciales</p>
                  <a href="mailto:notificacionesjudiciales@arquidiocesanos.edu.co" className="text-sm text-brand-coral-dark font-medium hover:underline break-all">notificacionesjudiciales@arquidiocesanos.edu.co</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[#8a8275] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#6a6358] leading-relaxed">
                  <span className="font-semibold text-brand-dark">Estimado usuario:</span> este correo es única y exclusivamente para notificaciones judiciales. El horario de radicación es de <span className="font-semibold text-brand-dark">07:00 a.m. a 05:00 p.m.</span> los días hábiles.
                </p>
              </div>
              <button onClick={closeModal} className="w-full bg-brand-gold text-brand-dark py-3 rounded-full font-bold hover:bg-[#ffc94d] transition-colors">Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Proveedores */}
      {activeModal === "proveedores" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modalR-proveedores-title">
          <div className="absolute inset-0 bg-brand-dark/50 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-brand-dark px-6 py-5 flex items-center justify-between">
              <h3 id="modalR-proveedores-title" className="text-xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}><Building2 className="h-5 w-5 text-brand-gold" /> Proveedores</h3>
              <button onClick={closeModal} aria-label="Cerrar" className="text-white/70 hover:text-white transition-colors p-1"><X className="h-6 w-6" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="text-center">
                <p className="text-lg font-bold text-brand-dark mb-1" style={{ fontFamily: "var(--font-display)" }}>¿Eres proveedor de productos o servicios?</p>
                <p className="text-sm text-[#6a6358]">Si deseas presentar tu portafolio o catálogo, contáctanos.</p>
              </div>
              <div className="bg-[#FBF6EE] rounded-xl p-4 space-y-3 border border-[#efe6d7]">
                <div className="flex items-start gap-3"><Clock className="h-5 w-5 text-brand-coral mt-0.5 flex-shrink-0" /><div><p className="text-sm font-semibold text-brand-dark">Horarios de atención</p><p className="text-sm text-[#6a6358]">Todos los martes de 8:00 a.m. a 12:00 p.m.</p></div></div>
                <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-brand-coral mt-0.5 flex-shrink-0" /><div><p className="text-sm font-semibold text-brand-dark">Dirección</p><p className="text-sm text-[#6a6358]">Cra 7h Bis #76-25 Barrio Alfonso López, Ventanilla Única</p></div></div>
                <div className="flex items-start gap-3"><Phone className="h-5 w-5 text-brand-coral mt-0.5 flex-shrink-0" /><div><p className="text-sm font-semibold text-brand-dark">Contacto</p><p className="text-sm text-[#6a6358]">Tel: <a href="tel:6024850227" className="text-brand-coral-dark font-medium hover:underline">485 0227</a> Ext. 1031</p></div></div>
                <div className="flex items-start gap-3"><MessageCircle className="h-5 w-5 text-brand-coral mt-0.5 flex-shrink-0" /><div><p className="text-sm font-semibold text-brand-dark">Solo WhatsApp</p><a href="https://wa.me/573164052640" target="_blank" rel="noopener noreferrer" className="text-sm text-brand-coral-dark font-medium hover:underline">+57 316 405 2640</a></div></div>
              </div>
              <button onClick={closeModal} className="w-full bg-brand-gold text-brand-dark py-3 rounded-full font-bold hover:bg-[#ffc94d] transition-colors">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
