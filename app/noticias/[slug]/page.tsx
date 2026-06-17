import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getNoticiaBySlug, getNoticias, formatFecha } from "@/lib/models";
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function NoticiaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [noticia, noticias] = await Promise.all([getNoticiaBySlug(slug), getNoticias()]);

  if (!noticia) {
    notFound();
  }

  const noticiasRelacionadas = noticias
    .filter((n) => n.categoria === noticia.categoria && n.id !== noticia.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Article Header */}
        <article>
          {/* Hero Image */}
          <div
            className="h-[400px] bg-cover bg-center relative"
            style={{ backgroundImage: `url(${noticia.imagen})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link
                  href="/noticias"
                  className="inline-flex items-center gap-2 text-white/80 hover:text-brand-gold transition-colors mb-6"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Volver a noticias
                </Link>
                <span className="inline-block px-3 py-1 bg-brand-gold text-brand-dark text-sm font-bold rounded-full mb-4">
                  {noticia.categoria}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-4xl">
                  {noticia.titulo}
                </h1>
                <div className="flex items-center gap-6 text-white/80">
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {noticia.autor}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {formatFecha(noticia.fecha)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
                    {noticia.resumen}
                  </p>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {noticia.contenido}
                  </div>
                </div>

                {/* Share */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-brand-dark">Compartir:</span>
                    <button className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <Facebook className="h-5 w-5" />
                    </button>
                    <button className="w-10 h-10 bg-sky-500 text-white rounded-lg flex items-center justify-center hover:bg-sky-600 transition-colors">
                      <Twitter className="h-5 w-5" />
                    </button>
                    <button className="w-10 h-10 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Related News */}
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-brand-dark mb-4">
                    Noticias relacionadas
                  </h3>
                  <div className="space-y-4">
                    {noticiasRelacionadas.length > 0 ? (
                      noticiasRelacionadas.map((rel) => (
                        <Link
                          key={rel.id}
                          href={`/noticias/${rel.slug}`}
                          className="block group"
                        >
                          <h4 className="font-semibold text-brand-dark group-hover:text-brand-coral transition-colors text-sm mb-1">
                            {rel.titulo}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {formatFecha(rel.fecha)}
                          </span>
                        </Link>
                      ))
                    ) : (
                      noticias
                        .filter((n) => n.id !== noticia.id)
                        .slice(0, 3)
                        .map((rel) => (
                          <Link
                            key={rel.id}
                            href={`/noticias/${rel.slug}`}
                            className="block group"
                          >
                            <h4 className="font-semibold text-brand-dark group-hover:text-brand-coral transition-colors text-sm mb-1">
                              {rel.titulo}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {formatFecha(rel.fecha)}
                            </span>
                          </Link>
                        ))
                    )}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-brand-dark mb-4">Categorías</h3>
                  <div className="flex flex-wrap gap-2">
                    {[...new Set(noticias.map((n) => n.categoria))].map((cat) => (
                      <Link
                        key={cat}
                        href={`/noticias?categoria=${cat}`}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          cat === noticia.categoria
                            ? "bg-brand-gold text-brand-dark"
                            : "bg-white text-gray-700 hover:bg-brand-coral/10"
                        }`}
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-brand-dark p-6 rounded-2xl text-center">
                  <h3 className="text-lg font-bold text-white mb-2">¿Interesado?</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Conoce más sobre nuestros colegios y programa una visita.
                  </p>
                  <Link
                    href="/colegios"
                    className="inline-block w-full bg-brand-gold text-brand-dark py-3 rounded-xl font-bold hover:bg-brand-gold/90 transition-colors"
                  >
                    Ver colegios
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
