import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  FileText, 
  Scale, 
  Users, 
  TrendingUp, 
  Shield, 
  Download, 
  ExternalLink,
  MessageSquare,
  Award,
  Eye,
  CheckCircle
} from "lucide-react";

const indicadores = [
  { label: "Estudiantes matriculados", valor: "31,250+", icon: Users },
  { label: "Docentes activos", valor: "1,850", icon: Award },
  { label: "Cobertura nacional", valor: "31 colegios", icon: TrendingUp },
  { label: "Años de historia", valor: "65+", icon: CheckCircle },
];

const documentos = [
  { nombre: "Plan de Desarrollo Institucional", tamaño: "2.4 MB", fecha: "2024" },
  { nombre: "Proyecto Educativo Institucional", tamaño: "1.8 MB", fecha: "2024" },
  { nombre: "Manual de Convivencia", tamaño: "890 KB", fecha: "2024" },
  { nombre: "Reglamento Estudiantil", tamaño: "1.2 MB", fecha: "2024" },
  { nombre: "Estatutos Generales", tamaño: "3.1 MB", fecha: "2023" },
  { nombre: "Informe de Gestión 2023", tamaño: "4.5 MB", fecha: "2024" },
];

const principios = [
  {
    titulo: "Honestidad",
    descripcion: "Actuamos con verdad y rectitud en todas nuestras acciones institucionales.",
    icon: Shield,
  },
  {
    titulo: "Integridad",
    descripcion: "Mantenemos coherencia entre nuestros valores, palabras y acciones.",
    icon: Scale,
  },
  {
    titulo: "Responsabilidad",
    descripcion: "Asumimos las consecuencias de nuestras decisiones y acciones.",
    icon: CheckCircle,
  },
  {
    titulo: "Transparencia",
    descripcion: "Gestionamos la información de manera clara, accesible y oportuna.",
    icon: Eye,
  },
];

export default function TransparenciaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-dark via-brand-dark to-[#1a1610] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/20 text-brand-gold rounded-full text-sm font-medium mb-6">
                <Shield className="h-4 w-4" />
                Gestión transparente
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-brand-gold">Transparencia</span> y Rendición de Cuentas
              </h1>
              <p className="text-xl text-gray-300">
                Comprometidos con la apertura institucional, la honestidad y el servicio responsable a la comunidad educativa.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-brand-gold py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {indicadores.map((indicador, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-dark/10 rounded-xl mb-3">
                    <indicador.icon className="h-6 w-6 text-brand-dark" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-brand-dark">{indicador.valor}</div>
                  <div className="text-brand-dark/70 text-sm">{indicador.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documents */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Documentos Públicos
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Accede a la información institucional más relevante. Todos los documentos están disponibles para descarga.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentos.map((doc, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-coral/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-brand-coral" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-brand-dark mb-1 truncate">{doc.nombre}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        <span>{doc.tamaño}</span>
                        <span>•</span>
                        <span>{doc.fecha}</span>
                      </div>
                      <button className="inline-flex items-center gap-2 text-brand-coral-dark font-medium hover:text-brand-coral transition-colors text-sm">
                        <Download className="h-4 w-4" />
                        Descargar PDF
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ethics Principles */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Código de Ética
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Los principios que guían nuestra actuación como institución educativa arquidiocesana.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {principios.map((principio, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-gray-100 text-center"
                >
                  <div className="w-16 h-16 bg-brand-dark rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <principio.icon className="h-8 w-8 text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">{principio.titulo}</h3>
                  <p className="text-gray-600 text-base">{principio.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PQRS Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                  Peticiones, Quejas, Reclamos y Sugerencias
                </h2>
                <p className="text-gray-600 mb-6">
                  Tu opinión es importante para nosotros. Ponemos a tu disposición el sistema PQRS para atender tus solicitudes de manera oportuna y transparente.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Respuesta en máximo 15 días hábiles",
                    "Seguimiento en línea del estado de tu solicitud",
                    "Atención personalizada según el tipo de requerimiento",
                    "Canal confidencial para denuncias",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-brand-gold flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-dark/90 transition-colors"
                >
                  <MessageSquare className="h-5 w-5" />
                  Radicar PQRS
                </a>
              </div>
              <div className="bg-brand-dark p-8 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-6">Contacto directo</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Línea de atención</div>
                    <div className="text-lg font-semibold">+57 (2) 123 4567</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Correo electrónico</div>
                    <div className="text-lg font-semibold">transparencia@colegiosarquidiocesanos.org</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Oficina de atención</div>
                    <div className="text-lg font-semibold">Calle 9 No. 4-45, Cali</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Horario de atención</div>
                    <div className="text-lg font-semibold">Lunes a Viernes: 8:00 a.m. - 4:00 p.m.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* External Links */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-brand-dark text-center mb-8">
              Enlaces de interés
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Ministerio de Educación",
                "Secretaría de Educación de Cali",
                "Consejo Episcopal Latinoamericano",
                "ICFES",
                "Arquidiócesis de Cali",
              ].map((enlace, index) => (
                <a
                  key={index}
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-brand-gold/10 hover:border-brand-gold hover:text-brand-dark transition-colors"
                >
                  {enlace}
                  <ExternalLink className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
