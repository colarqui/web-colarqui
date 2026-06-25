// Footer del rediseño: misma estructura que producción, piel de la nueva línea.
// Enlaces apuntan a /rediseno/* para navegar dentro del universo del rediseño.
// Las redes sociales viven aquí (no flotan en el rediseño).
import Link from "next/link";
import { MapPin, Phone, FileText, MessageSquare, HelpCircle, Facebook, Instagram } from "lucide-react";

export default function FooterR() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src="/logos/logo-horizontal-footer.png" alt="Colegios Arquidiocesanos" className="h-12 w-auto mb-6" />
            <p className="text-[#a9a194] text-sm leading-relaxed mb-6" style={{ fontFamily: "var(--font-display)" }}>
              31 colegios formando niños y jóvenes con valores cristianos en Cali, desde hace más de 60 años.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/colegios.arquidiocesanos/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/col.arquidiocesanos/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-brand-gold text-[11px] font-semibold uppercase tracking-[0.18em] mb-6" style={{ fontFamily: "var(--font-civic)" }}>Enlaces rápidos</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/rediseno/colegios" className="text-[#a9a194] hover:text-white transition-colors">Nuestros colegios</Link></li>
              <li><Link href="/rediseno/admisiones" className="text-[#a9a194] hover:text-white transition-colors">Proceso de admisión</Link></li>
              <li><Link href="/rediseno/noticias" className="text-[#a9a194] hover:text-white transition-colors">Noticias</Link></li>
              <li><Link href="/rediseno/transparencia" className="text-[#a9a194] hover:text-white transition-colors">Transparencia</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-brand-gold text-[11px] font-semibold uppercase tracking-[0.18em] mb-6" style={{ fontFamily: "var(--font-civic)" }}>Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3"><MapPin className="h-5 w-5 text-brand-gold flex-shrink-0 mt-0.5" /><span className="text-[#a9a194]">Cra 7h Bis #76-25 B/ Alfonso López, Cali.</span></li>
              <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-brand-gold flex-shrink-0" /><span className="text-[#a9a194]">PBX 602 485 0227 Ext. 1042</span></li>
              <li className="flex items-center gap-3"><FileText className="h-5 w-5 text-brand-gold flex-shrink-0" /><Link href="/rediseno/quienes-somos/directorio" className="text-[#a9a194] hover:text-white transition-colors">Directorio de colegios</Link></li>
              <li className="flex items-center gap-3"><MessageSquare className="h-5 w-5 text-brand-gold flex-shrink-0" /><Link href="/rediseno/servicios/pqrsf" className="text-[#a9a194] hover:text-white transition-colors">Radicar PQRSF</Link></li>
              <li className="flex items-center gap-3"><HelpCircle className="h-5 w-5 text-brand-gold flex-shrink-0" /><Link href="/rediseno#faq" className="text-[#a9a194] hover:text-white transition-colors">Preguntas frecuentes</Link></li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-brand-gold text-[11px] font-semibold uppercase tracking-[0.18em] mb-6" style={{ fontFamily: "var(--font-civic)" }}>¿Interesado?</h4>
            <p className="text-[#a9a194] text-sm mb-4 leading-relaxed">Inicia el proceso de inscripción para el año escolar 2026-2027.</p>
            <a href="https://runachay.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center bg-brand-gold text-brand-dark px-6 py-3 rounded-full font-semibold hover:bg-[#ffc94d] active:scale-[0.98] transition-all">
              Inscríbete ahora
            </a>
          </div>
        </div>

        <div className="border-t border-[#2a261f] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#8a8275] text-sm">© 2026 Colegios Arquidiocesanos de Cali. Todos los derechos reservados.</p>
          <div className="flex gap-6 text-sm text-[#8a8275]">
            <Link href="/rediseno/politica-de-privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
            <Link href="/rediseno/terminos-de-uso" className="hover:text-white transition-colors">Términos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
