import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import {
  CheckCircle,
  ExternalLink,
  FileText,
  Link as LinkIcon,
  RefreshCw,
  Scale,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Términos de Uso - Colegios Arquidiocesanos",
  description:
    "Reglas básicas para navegar y usar el sitio web de los Colegios Arquidiocesanos de forma segura, respetuosa y responsable.",
};

const terminos = [
  {
    numero: "1",
    titulo: "Uso del Sitio Web",
    icon: FileText,
    contenido: [
      "Este espacio está creado para compartir información sobre nuestras sedes, proyectos educativos y noticias.",
      "Te pedimos que uses la plataforma de forma responsable, exclusivamente para fines informativos, educativos y de contacto institucional.",
    ],
  },
  {
    numero: "2",
    titulo: "Propiedad Intelectual",
    icon: Scale,
    contenido: [
      "Todo el contenido que ves aquí (textos, fotografías de nuestras actividades, logos y recursos gráficos) nos pertenece y está protegido.",
      "No está permitido copiar, distribuir o usar este material para fines comerciales o externos sin autorización previa.",
      "Sí puedes compartir nuestros enlaces directamente para difundir las noticias y eventos de la comunidad.",
    ],
  },
  {
    numero: "3",
    titulo: "Tus Responsabilidades",
    icon: UserCheck,
    intro: "Como miembro o visitante de nuestra comunidad educativa, esperamos que:",
    contenido: [
      "Navegues con respeto hacia los valores de nuestras instituciones.",
      "Proporciones información real y exacta si utilizas nuestros formularios de contacto, PQRS o admisiones.",
      "Te abstengas de intentar alterar el código, la seguridad o el funcionamiento técnico de la página web.",
    ],
  },
  {
    numero: "4",
    titulo: "Enlaces a Terceros",
    icon: ExternalLink,
    contenido: [
      "En ocasiones compartiremos enlaces a otras plataformas educativas o herramientas externas.",
      "No tenemos control sobre esos sitios, por lo que te recomendamos leer también sus propias reglas.",
    ],
  },
  {
    numero: "5",
    titulo: "Actualización de los Términos",
    icon: RefreshCw,
    contenido: [
      "Podemos mejorar o actualizar estas reglas ocasionalmente para adaptarnos a nuevas necesidades tecnológicas o normativas.",
      "El uso continuo de la página significa que aceptas estos cambios.",
    ],
  },
];

export default function TerminosDeUsoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        <PageHero
          eyebrow="Espacio seguro y respetuoso"
          imagen="/images/hero-terminos.jpg"
          subtitulo="Te damos la bienvenida al sitio web de nuestros Colegios Arquidiocesanos. Al navegar por esta página, aceptas estas reglas básicas diseñadas para mantener un espacio seguro, respetuoso y útil para toda nuestra comunidad educativa."
        >
          Términos de <span className="italic text-brand-gold">uso</span>
        </PageHero>

        <section className="bg-brand-gold py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-5 md:grid-cols-3">
              {["Uso responsable", "Respeto institucional", "Información protegida"].map((principio) => (
                <div key={principio} className="flex items-center gap-3 text-brand-dark">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-dark/10">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-bold">{principio}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {terminos.map((termino) => (
                <article
                  key={termino.numero}
                  className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-dark text-brand-gold">
                      <termino.icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold text-sm font-bold text-brand-dark">
                          {termino.numero}
                        </span>
                        <h2 className="text-2xl font-bold text-brand-dark">{termino.titulo}</h2>
                      </div>

                      {termino.intro && <p className="text-gray-700 leading-relaxed mb-4">{termino.intro}</p>}

                      <div className="space-y-3">
                        {termino.contenido.map((parrafo) => (
                          <p key={parrafo} className="text-gray-600 leading-relaxed">
                            {parrafo}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brand-dark rounded-2xl p-8 md:p-10 text-white">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">Comparte la información oficial</h2>
                  <p className="text-gray-300 leading-relaxed max-w-2xl">
                    Puedes compartir los enlaces directos de nuestro sitio para difundir noticias, eventos y recursos
                    institucionales con la comunidad educativa.
                  </p>
                </div>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-gold text-brand-dark">
                  <LinkIcon className="h-7 w-7" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
