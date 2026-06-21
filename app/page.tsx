import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatIA from "@/components/ChatIA";
import NoticiasDestacadas from "@/components/NoticiasDestacadas";
import StatsCounter from "@/components/StatsCounter";
import DynamicModals from "@/components/DynamicModals";
import { getColegios } from "@/lib/models";
import { getHomeConfig } from "@/lib/home-config";
import { 
  GraduationCap, 
  MapPin, 
  Users, 
  Award, 
  ArrowRight, 
  BookOpen,
  Heart,
  Sparkles,
  School,
  Calendar,
  Star,
  Handshake,
  MessageSquareQuote,
  ChevronDown,
  HelpCircle,
  Clock,
  Shield,
  DollarSign,
  ShoppingBag
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [colegios, homeConfig] = await Promise.all([
    getColegios(),
    getHomeConfig(),
  ]);
  const slugsDestacados = ["santa-isabel-ciudad-2000", "san-francisco-javier", "nuestra-senora-chiquinquira"];
  let colegiosDestacados = slugsDestacados
    .map((slug) => colegios.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  // Si no encuentra los slugs configurados, cae a los primeros 3
  if (colegiosDestacados.length === 0) colegiosDestacados = colegios.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero - Estilo Charla SaaS con imagen de fondo */}
        <section className="relative bg-gradient-to-br from-brand-dark via-brand-dark to-[#1a1610] text-white overflow-hidden">
          {/* Background Image - Foto de estudiantes */}
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `url('/images/estudiantes-hero.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-brand-dark/70" />

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }} />
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-coral/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/30 rounded-full px-4 py-2 mb-8">
                  <Sparkles className="h-4 w-4 text-brand-gold" />
                  <span className="text-brand-gold text-sm font-medium">31 Colegios • +29,000 Estudiantes</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Educación de{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-coral">
                    excelencia
                  </span>{" "}
                  con valores
                </h1>

                <p className="text-xl text-gray-300 mb-10 max-w-xl mx-auto lg:mx-0">
                  Formamos líderes con principios cristianos. Excelencia académica, comunidad y un futuro brillante para tus hijos.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/colegios"
                    className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-dark px-8 py-4 rounded-xl font-semibold hover:bg-brand-gold/90 transition-all hover:scale-105"
                  >
                    <MapPin className="h-5 w-5" />
                    Encuentra tu colegio
                  </Link>
                  <a
                    href="https://runachay.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all"
                  >
                    <GraduationCap className="h-5 w-5" />
                    Inscríbete ahora
                  </a>
                </div>

                {/* Trust indicators */}
                <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-brand-gold fill-brand-gold" />
                    <span>Excelencia académica</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-brand-coral" />
                    <span>Valores cristianos</span>
                  </div>
                </div>
              </div>

              {/* Right - Chat IA */}
              <div className="flex justify-center lg:justify-end">
                <ChatIA />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar - Contadores animados */}
        <StatsCounter dynamicStats={homeConfig?.stats?.length ? homeConfig.stats : undefined} />

        {/* Features Grid - Estilo Charla */}
        <section className="py-24 bg-white" style={{ fontFamily: "'Century Gothic', Arial, sans-serif" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                ¿Por qué elegir los{" "}
                <span className="text-brand-coral">Colegios Arquidiocesanos</span>?
              </h2>
              <p className="text-gray-600 text-lg">
                Una propuesta educativa integral que forma jóvenes preparados para la vida
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: "Excelencia Académica",
                  description: "Programas de alta calidad con resultados sobresalientes en pruebas nacionales e internacionales.",
                  color: "bg-brand-gold",
                  iconClass: "text-brand-dark",
                },
                {
                  icon: Heart,
                  title: "Formación en Valores",
                  description: "Educación cristiana que fortalece el carácter y desarrolla ciudadanos íntegros.",
                  color: "bg-brand-coral",
                  iconClass: "text-white",
                },
                {
                  icon: Users,
                  title: "Comunidad Viva",
                  description: "Más de 29,000 estudiantes formando una gran familia de aprendizaje y crecimiento.",
                  color: "bg-brand-gold",
                  iconClass: "text-brand-dark",
                },
                {
                  icon: Award,
                  title: "Deportes y Cultura",
                  description: "Programas extracurriculares que descubren y potencian los talentos de cada estudiante.",
                  color: "bg-brand-coral",
                  iconClass: "text-white",
                },
                {
                  icon: Sparkles,
                  title: "Innovación Educativa",
                  description: "Tecnología y metodologías modernas para preparar a tus hijos para el futuro.",
                  color: "bg-brand-gold",
                  iconClass: "text-brand-dark",
                },
                {
                  icon: MapPin,
                  title: "Cerca de Ti",
                  description: "31 colegios ubicados estratégicamente en toda la ciudad de Cali.",
                  color: "bg-brand-coral",
                  iconClass: "text-white",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-brand-gold/10 transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                  <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`h-7 w-7 ${feature.iconClass}`} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Colegios Destacados - Estilo Charla Cards */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                  Colegios <span className="text-brand-gold">Destacados</span>
                </h2>
                <p className="text-gray-600 text-lg max-w-xl">
                  Conoce algunas de nuestras instituciones con mayor reconocimiento académico
                </p>
              </div>
              <Link
                href="/colegios"
                className="inline-flex items-center gap-2 text-brand-dark font-semibold hover:text-brand-coral transition-colors"
              >
                Ver todos los colegios
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {colegiosDestacados.map((colegio) => (
                <Link
                  key={colegio.id}
                  href={`/colegios/${colegio.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 bg-gradient-to-br from-brand-dark to-[#2a2620]">
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      {colegio.logo ? (
                        <img
                          src={colegio.logo}
                          alt={`Logo ${colegio.nombre}`}
                          className="max-h-32 max-w-full w-auto h-auto object-contain drop-shadow-xl"
                        />
                      ) : (
                        <School className="h-16 w-16 text-brand-gold/30" />
                      )}
                    </div>
                    {/* Calendario badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-brand-gold text-brand-dark text-xs font-bold rounded-full">
                        Calendario {colegio.calendario}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-coral transition-colors">
                      {colegio.nombre}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                      <MapPin className="h-4 w-4" />
                      {colegio.zona}
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {colegio.descripcion}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {colegio.estudiantes} estudiantes
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Alianzas Estratégicas */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/20 rounded-full px-4 py-2 mb-6">
                <Handshake className="h-4 w-4 text-brand-gold" />
                <span className="text-brand-dark text-sm font-medium">Red de aliados estratégicos</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Alianzas que potencian el <span className="text-brand-gold">futuro</span> de tu hijo
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Nuestros convenios con universidades, instituciones de idiomas y organizaciones sociales abren puertas que van más allá del aula.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  logo: "/logos/logo-unicatólica.png",
                  nombre: "Unicatólica",
                  beneficio: "Ruta universitaria con admisión preferencial, ferias vocacionales y visitas a campus para estudiantes de grado 10.° y 11.°",
                },
                {
                  logo: "/logos/logo-usaca.png",
                  nombre: "Universidad Santiago de Cali",
                  beneficio: "Convenio académico con descuentos en matrícula universitaria y programas de orientación profesional.",
                },
                {
                  logo: "/logos/logo-aes.png",
                  nombre: "American English School",
                  beneficio: "Programa de inglés certificado internacionalmente con metodología de inmersión desde preescolar.",
                },
                {
                  logo: "/logos/logo-arquidiocesis.png",
                  nombre: "Arquidiócesis de Cali",
                  beneficio: "Respaldo pastoral, valores cristianos transversales y acompañamiento espiritual permanente a toda la comunidad educativa.",
                },
              ].map((aliado, index) => (
                <div
                  key={index}
                  className="group bg-gray-50 rounded-2xl p-8 text-center hover:bg-white hover:shadow-xl hover:shadow-brand-gold/5 transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                  <div className="h-20 flex items-center justify-center mb-6">
                    <img
                      src={aliado.logo}
                      alt={`Logo ${aliado.nombre}`}
                      className="max-h-20 max-w-[160px] w-auto h-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">{aliado.nombre}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{aliado.beneficio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonios de Padres */}
        <section className="py-20 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-brand-coral/10 border border-brand-coral/20 rounded-full px-4 py-2 mb-6">
                <MessageSquareQuote className="h-4 w-4 text-brand-coral" />
                <span className="text-brand-dark text-sm font-medium">Voces de nuestra comunidad</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Lo que dicen los <span className="text-brand-coral">padres de familia</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Quienes ya hacen parte de nuestra comunidad comparten su experiencia
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  nombre: "Carolina Martínez",
                  colegio: "Colegio San Francisco Javier",
                  texto: "Encontramos en San Francisco Javier no solo excelencia académica, sino maestros que de verdad se preocupan por formar buenas personas. Mi hijo ha crecido en valores y en confianza.",
                  iniciales: "CM",
                },
                {
                  nombre: "Andrés Felipe López",
                  colegio: "Colegio Santa Isabel de Hungría",
                  texto: "Lo que más valoro es el acompañamiento pastoral. La formación espiritual complementa la academia de una manera que no encuentras en otros colegios de Cali.",
                  iniciales: "AL",
                },
                {
                  nombre: "María José Rodríguez",
                  colegio: "Colegio Nuestra Señora de Guadalupe",
                  texto: "Mis dos hijas llevan 6 años en el colegio. La calidad humana de los profesores y las oportunidades extracurriculares han sido clave en su desarrollo integral.",
                  iniciales: "MR",
                },
              ].map((testimonio, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <div className="flex-1">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-brand-gold fill-brand-gold" />
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-6 italic">
                      &ldquo;{testimonio.texto}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center text-white font-bold text-sm">
                      {testimonio.iniciales}
                    </div>
                    <div>
                      <div className="font-semibold text-brand-dark">{testimonio.nombre}</div>
                      <div className="text-sm text-gray-500">Padre de familia — {testimonio.colegio}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Noticias Destacadas */}
        <NoticiasDestacadas />

        {/* Mini-FAQ */}
        <section id="faq" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/20 rounded-full px-4 py-2 mb-6">
                <HelpCircle className="h-4 w-4 text-brand-gold" />
                <span className="text-brand-dark text-sm font-medium">Resolvemos tus dudas</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Preguntas <span className="text-brand-gold">frecuentes</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Lo que los padres de familia más nos preguntan
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  icon: Clock,
                  pregunta: "¿Cuáles son los horarios de clases?",
                  respuesta: "Calendario B (jornada única): Preescolar de 7:00 a.m. a 12:30 p.m., Primaria de 7:00 a.m. a 1:30 p.m. y Bachillerato de 7:00 a.m. a 2:30 p.m. Calendario A (doble jornada): Preescolar de 7:30 a.m. a 12:30 p.m.; Primaria y Bachillerato en la jornada de la mañana de 6:30 a.m. a 12:30 p.m. y en la jornada de la tarde de 1:00 p.m. a 5:45 p.m.",
                },
                {
                  icon: DollarSign,
                  pregunta: "¿Cuánto cuesta la matrícula?",
                  respuesta: "Los costos varían según el colegio, el grado y el calendario académico. Consulta los valores exactos en la página de cada colegio, donde encontrarás el detalle de matrícula, pensión y otros cobros.",
                  link: { href: "/colegios", label: "Ver colegios y costos" },
                },
                {
                  icon: Shield,
                  pregunta: "¿Ofrecen becas o descuentos?",
                  respuesta: "Sí. Contamos con descuentos por pronto pago, por hermanos matriculados en la misma institución y por convenios con parroquias y entidades aliadas. Algunos colegios también otorgan becas por mérito académico o deportivo. Consulta los beneficios específicos en la página de cada colegio.",
                  link: { href: "/colegios", label: "Consultar beneficios por colegio" },
                },
                {
                  icon: Calendar,
                  pregunta: "¿Qué calendarios académicos manejan?",
                  respuesta: "Operamos con Calendario A (febrero a noviembre) y Calendario B (septiembre a junio). Cada colegio maneja un solo calendario. Puedes filtrar los colegios por calendario en nuestro buscador.",
                  link: { href: "/colegios", label: "Filtrar colegios por calendario" },
                },
                {
                  icon: MapPin,
                  pregunta: "¿Hay colegios cerca de mi zona?",
                  respuesta: "Con 31 colegios distribuidos en toda Cali y municipios cercanos como Yumbo y Jamundí, es muy probable que haya uno cerca de ti. Usa nuestro buscador para filtrar por zona.",
                  link: { href: "/colegios", label: "Buscar colegio por zona" },
                },
                {
                  icon: ShoppingBag,
                  pregunta: "¿Dónde puedo conseguir los uniformes del colegio?",
                  respuesta: "El proveedor autorizado para comercializar los uniformes de los Colegios Arquidiocesanos es Almacenes SÍ. Los uniformes son iguales para todos los colegios; se diferencian mediante el escudo que se vende por separado, también en Almacenes SÍ.",
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow"
                >
                  <summary className="flex items-center gap-4 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <faq.icon className="h-5 w-5 text-brand-gold" />
                    </div>
                    <span className="flex-1 font-semibold text-brand-dark text-lg">{faq.pregunta}</span>
                    <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 pl-20">
                    <p className="text-gray-600 leading-relaxed">{faq.respuesta}</p>
                    {(faq as any).link && (
                      <Link
                        href={(faq as any).link.href}
                        className="inline-flex items-center gap-2 text-brand-coral-dark font-medium mt-3 hover:underline text-sm"
                      >
                        {(faq as any).link.label}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final - Estilo Charla */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-dark" />
          {/* Background Image */}
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `url('/images/estudiantes-bottom-cta.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-brand-dark/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/10 to-brand-coral/10" />
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para dar el primer paso?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Únete a nuestra comunidad de más de 29,000 estudiantes. Tu hijo merece la mejor educación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/admisiones"
                className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-dark px-10 py-5 rounded-xl font-bold text-lg hover:bg-brand-gold/90 transition-all hover:scale-105"
              >
                <BookOpen className="h-6 w-6" />
                Ver proceso de admisión
              </Link>
              <a
                href="https://runachay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-10 py-5 rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                <GraduationCap className="h-6 w-6" />
                Inscribir en Runachay
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <DynamicModals />
    </div>
  );
}
