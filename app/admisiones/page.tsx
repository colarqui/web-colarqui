import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import RequisitosSection from "./RequisitosSection";
import { 
  Calendar, 
  Users, 
  ArrowRight, 
  ExternalLink,
  Clock,
  HelpCircle,
  School,
  ClipboardList,
  FileText,
  GraduationCap
} from "lucide-react";

const pasos = [
  {
    numero: "01",
    titulo: "Registro en línea",
    descripcion: "Completa el formulario de inscripción en nuestra plataforma RUNACHAY con los datos del estudiante y la familia.",
    icon: ClipboardList,
  },
  {
    numero: "02",
    titulo: "Entrevista",
    descripcion: "Se cita al estudiante con su acudiente para reunión con rectoría o psicología y conocer el contexto familiar.",
    icon: Users,
  },
  {
    numero: "03",
    titulo: "Examen de admisión",
    descripcion: "Se realiza una breve evaluación al estudiante aspirante para conocer su nivel académico y habilidades.",
    icon: School,
  },
  {
    numero: "04",
    titulo: "Matrícula financiera",
    descripcion: "Se realiza el pago de la matrícula y los costos educativos correspondientes al año escolar.",
    icon: FileText,
  },
  {
    numero: "05",
    titulo: "Matrícula académica",
    descripcion: "Se entregan los documentos de requisito y se formaliza toda la matrícula en el colegio asignado.",
    icon: GraduationCap,
  },
];


const fechas = [
  { evento: "Inicio de inscripciones", fecha: "1 de mayo de 2026" },
  { evento: "Cierre de inscripciones", fecha: "30 de junio de 2026" },
  { evento: "Entrevistas", fecha: "4 de julio – 30 de julio de 2026" },
  { evento: "Publicación de resultados", fecha: "10 de agosto de 2026" },
  { evento: "Matrícula de admitidos", fecha: "15 de agosto de 2026" },
  { evento: "Inicio de clases", fecha: "1 de septiembre de 2026" },
];

export default function AdmisionesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <PageHero
          eyebrow="Admisiones · Año escolar 2026"
          imagen="/images/estudiantes-hero-admisiones.jpg"
          subtitulo="Únete a nuestra familia arquidiocesana. Un proceso sencillo, transparente y cercano para asegurar la mejor educación para tu hijo."
          acciones={
            <>
              <a
                href="https://runachay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-dark px-7 py-4 rounded-full font-semibold hover:bg-[#ffc94d] active:scale-[0.98] transition-all"
              >
                Iniciar inscripción
                <ExternalLink className="h-5 w-5" />
              </a>
              <Link
                href="/colegios"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-7 py-4 rounded-full font-semibold hover:bg-white/20 active:scale-[0.98] transition-all"
              >
                Conocer colegios
                <ArrowRight className="h-5 w-5" />
              </Link>
            </>
          }
        >
          Proceso de <span className="italic text-brand-gold">admisión</span>
        </PageHero>

        {/* Steps */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Pasos del proceso
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Te acompañamos en cada etapa para hacer tu experiencia de inscripción lo más sencilla posible.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {pasos.map((paso, index) => (
                <div key={index} className="relative">
                  {index < pasos.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -translate-y-1/2" />
                  )}
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 relative z-10 h-full">
                    <div className="text-4xl font-bold text-brand-gold/20 mb-4">{paso.numero}</div>
                    <div className="w-12 h-12 bg-brand-dark rounded-xl flex items-center justify-center mb-4">
                      <paso.icon className="h-6 w-6 text-brand-gold" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-dark mb-2">{paso.titulo}</h3>
                    <p className="text-gray-600 text-base">{paso.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements & Dates */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Requirements */}
              <RequisitosSection />

              {/* Dates */}
              <div className="bg-brand-dark p-8 rounded-2xl text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-brand-gold/20 rounded-xl flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-brand-gold" />
                  </div>
                  <h2 className="text-2xl font-bold">Fechas importantes</h2>
                </div>
                <div className="space-y-4">
                  {fechas.map((fecha, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-brand-gold" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{fecha.evento}</div>
                        <div className="text-gray-400 text-sm">{fecha.fecha}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-dark mb-4">
                Preguntas frecuentes
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  pregunta: "¿Cuál es la diferencia entre calendario A y B?",
                  respuesta: "El calendario A inicia en febrero y finaliza en noviembre. El calendario B inicia en agosto y finaliza en junio del año siguiente. Ambos cumplen con los mismos estándares de calidad.",
                },
                {
                  pregunta: "¿Puedo elegir el colegio?",
                  respuesta: "En el formulario de inscripción puedes indicar tu preferencia de colegio según ubicación. La asignación final depende de la disponibilidad de cupos.",
                },
                {
                  pregunta: "¿Hay becas disponibles?",
                  respuesta: "Sí, contamos con programas de becas por excelencia académica, deportiva, artística y por situación socioeconómica. Consulta los requisitos en la plataforma RUNACHAY.",
                },
                {
                  pregunta: "¿Cuándo se realizan las pruebas de admisión?",
                  respuesta: "Las evaluaciones se programan después de completar el proceso de inscripción. Te contactaremos para agendar la fecha según el grado al que aspira el estudiante.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100">
                  <h3 className="font-bold text-brand-dark mb-2 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-brand-coral" />
                    {faq.pregunta}
                  </h3>
                  <p className="text-gray-600">{faq.respuesta}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-dark" />
          {/* Background Image */}
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `url('/images/estudiantes-cta-admisiones.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-brand-dark/70" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Listo para comenzar?
            </h2>
            <p className="text-gray-300 mb-8">
              Inicia tu proceso de inscripción ahora y asegura la educación de calidad que tu hijo merece.
            </p>
            <a
              href="https://runachay.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-8 py-4 rounded-xl font-bold hover:bg-brand-gold/90 transition-colors"
            >
              Inscribirme ahora
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
