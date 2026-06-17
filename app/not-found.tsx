import Link from "next/link";
import { Home, SearchX } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-xl">
          <div className="w-20 h-20 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <SearchX className="h-10 w-10 text-brand-gold" />
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-brand-dark mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
            Página no encontrada
          </h2>
          <p className="text-gray-600 text-lg mb-10 leading-relaxed">
            Lo sentimos, la página que buscas no existe o ha sido movida. Te invitamos a volver al inicio y explorar todo lo que tenemos para ti.
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-dark px-8 py-4 rounded-xl font-semibold hover:bg-brand-gold/90 transition-all hover:scale-105"
          >
            <Home className="h-5 w-5" />
            Volver al inicio
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
