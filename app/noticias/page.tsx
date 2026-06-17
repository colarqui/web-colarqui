import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticiasList from "./NoticiasList";
import { getNoticias } from "@/lib/models";

export const dynamic = "force-dynamic";

export default async function NoticiasPage() {
  const noticias = await getNoticias();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        <section className="relative overflow-hidden text-white py-20">
          <div className="absolute inset-0 bg-brand-dark" />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `url('/images/estudiantes-hero-noticias.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-brand-dark/70" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Noticias <span className="text-brand-gold">Arquidiocesanas</span>
              </h1>
              <p className="text-xl text-gray-300">
                Mantente informado sobre las actividades, logros y eventos de nuestra red educativa.
              </p>
            </div>
          </div>
        </section>

        <NoticiasList noticias={noticias} />

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-dark" />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `url('/images/estudiantes-cta-noticias.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-brand-dark/70" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Suscríbete a nuestro boletín</h2>
            <p className="text-gray-300 mb-8">
              Recibe las últimas noticias y eventos directamente en tu correo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
              <button className="bg-brand-gold text-brand-dark px-6 py-3 rounded-xl font-bold hover:bg-brand-gold/90 transition-colors">
                Suscribirme
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
