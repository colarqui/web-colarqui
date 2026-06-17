import Link from "next/link";
import { MapPin, Phone, FileText, MessageSquare, HelpCircle, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img
                src="/logos/logo-horizontal-footer.png"
                alt="Colegios Arquidiocesanos"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              31 colegios formando líderes con valores cristianos en Cali, desde hace más de 65 años.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/col.arquidiocesanos/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/colegios.arquidiocesanos/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/colegios" className="text-gray-400 hover:text-brand-gold transition-colors">Nuestros Colegios</Link></li>
              <li><Link href="/admisiones" className="text-gray-400 hover:text-brand-gold transition-colors">Proceso de Admisión</Link></li>
              <li><Link href="/noticias" className="text-gray-400 hover:text-brand-gold transition-colors">Noticias</Link></li>
              <li><Link href="/transparencia" className="text-gray-400 hover:text-brand-gold transition-colors">Transparencia</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">Cra 7h Bis #76-25 B/ Alfonso López, Cali.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-gold flex-shrink-0" />
                <span className="text-gray-400">PBX 602 485 0227 Ext. 1042</span>
              </li>
              <li className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-brand-gold flex-shrink-0" />
                <Link href="/quienes-somos/directorio" className="text-gray-400 hover:text-brand-gold transition-colors">Directorio de Colegios</Link>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-brand-gold flex-shrink-0" />
                <Link href="/servicios/pqrsf" className="text-gray-400 hover:text-brand-gold transition-colors">Radicar PQRSF</Link>
              </li>
              <li className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-brand-gold flex-shrink-0" />
                <Link href="/#faq" className="text-gray-400 hover:text-brand-gold transition-colors">Preguntas Frecuentes</Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-semibold text-white mb-6">¿Interesado?</h4>
            <p className="text-gray-400 text-sm mb-4">
              Inicia el proceso de inscripción para el año escolar 2026-2027.
            </p>
            <a
              href="https://runachay.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-brand-gold text-brand-dark px-6 py-3 rounded-xl font-semibold text-center hover:bg-brand-gold/90 transition-colors"
            >
              Inscríbete ahora
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 Colegios Arquidiocesanos de Cali. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/politica-de-privacidad" className="hover:text-brand-gold transition-colors">Política de Privacidad</Link>
            <Link href="/terminos-de-uso" className="hover:text-brand-gold transition-colors">Términos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
