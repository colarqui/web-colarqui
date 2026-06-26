"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import {
  Heart,
  Users,
  BookOpen,
  ArrowRight,
  Church,
  HandHeart,
  GraduationCap,
} from "lucide-react";

const lineasDeAccion = [
  {
    icon: Church,
    titulo: "Experiencias de Fe",
    descripcion:
      "A través del programa Experiencias de Fe, promovemos espacios que fortalecen la vida espiritual de nuestros estudiantes. Retiros, celebraciones eucarísticas y el acompañamiento en el ciclo litúrgico permiten vivir la fe como una experiencia real y transformadora.",
    imagen: "/images/pastoral-experiencias-fe.jpg",
    color: "from-brand-gold/20 to-brand-gold/5",
    iconColor: "text-brand-gold",
  },
  {
    icon: HandHeart,
    titulo: "Juntos por la Convivencia",
    descripcion:
      "Con el programa Juntos por la Convivencia impulsamos el crecimiento personal y comunitario de nuestros estudiantes. Mediante convivencias, campañas de prevención e intervenciones en el aula, fomentamos un ambiente sano, empático y basado en el respeto mutuo.",
    imagen: "/images/pastoral-convivencia.jpg",
    color: "from-brand-coral/20 to-brand-coral/5",
    iconColor: "text-brand-coral",
  },
  {
    icon: GraduationCap,
    titulo: "Plan de Formación",
    descripcion:
      "Desde el programa Plan de Formación, guiamos a niños, jóvenes, familias y colaboradores en su camino de fe. A través de iniciativas como PDF.ES, PDF.Kids, PDF.CO y PDF.FM, fortalecemos la vivencia del Evangelio en cada etapa, promoviendo una auténtica formación integral.",
    imagen: "/images/pastoral-plan-formacion.jpg",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-600",
  },
];

export default function PastoralPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <PageHero
          eyebrow="Quiénes somos"
          imagen="/images/estudiantes-hero-pastoral.jpg"
          subtitulo="Valor agregado transversal a todas las áreas de nuestras instituciones educativas."
        >
          Pastoral <span className="italic text-brand-gold">educativa</span>
        </PageHero>

        {/* Misión */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Heart className="h-6 w-6 text-brand-gold" />
              </div>
              <h2 className="text-3xl font-bold text-brand-dark mb-4">Misión Educativa</h2>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100">
              <p className="text-gray-600 leading-relaxed text-lg text-center max-w-4xl mx-auto">
                En nuestros colegios, la pastoral educativa desempeña un papel esencial en la formación integral de los estudiantes y colaboradores. No solo impulsa el aprendizaje académico, sino también el desarrollo espiritual y humano, fortaleciendo la fe, la convivencia y el compromiso con los valores del Evangelio.
              </p>
            </div>
          </div>
        </section>

        {/* Líneas de Acción */}
        <section className="py-20 bg-gray-50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="w-12 h-12 bg-brand-coral/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-6 w-6 text-brand-coral" />
              </div>
              <h2 className="text-3xl font-bold text-brand-dark mb-4">
                Nuestras Líneas de Acción
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Tres programas que transforman la vida de nuestra comunidad educativa desde la fe y los valores.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {lineasDeAccion.map((linea) => (
                <div
                  key={linea.titulo}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
                >
                  {/* Image Placeholder */}
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${linea.imagen}')` }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${linea.color} flex items-center justify-center`}>
                      <linea.icon className={`h-12 w-12 ${linea.iconColor} opacity-50`} />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brand-dark mb-3">
                      {linea.titulo}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {linea.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-dark" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url('/images/estudiantes-cta-pastoral.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-brand-dark/70" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Formación que <span className="text-brand-gold">transforma</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Nuestros colegios forman personas íntegras, con valores sólidos y compromiso social desde la fe.
            </p>
            <a
              href="/colegios"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-10 py-5 rounded-xl font-bold text-lg hover:bg-brand-gold/90 transition-all hover:scale-105"
            >
              Conoce nuestros colegios
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
