import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import ColegiosList from "./ColegiosList";
import { getColegios } from "@/lib/models";

export const dynamic = "force-dynamic";

export default async function ColegiosPage() {
  const colegios = await getColegios();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        <section className="relative overflow-hidden text-white py-20">
          <div className="absolute inset-0 bg-brand-dark" />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `url('/images/estudiantes-hero-colegios.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-brand-dark/70" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Nuestros <span className="text-brand-gold">{colegios.length} Colegios</span>
              </h1>
              <p className="text-xl text-gray-300">
                Encuentra el colegio perfecto para tu familia. Excelencia académica y valores cristianos en toda Cali.
              </p>
            </div>
          </div>
        </section>

        <ColegiosList colegios={colegios} />

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-dark" />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `url('/images/estudiantes-cta-colegios.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-brand-dark/70" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">¿No encuentras lo que buscas?</h2>
            <p className="text-gray-300 mb-8">
              Contáctanos y te ayudaremos a encontrar el colegio perfecto para tu familia.
            </p>
            <a
              href="https://runachay.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-8 py-4 rounded-xl font-bold hover:bg-brand-gold/90 transition-colors"
            >
              Contactar asesor
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
