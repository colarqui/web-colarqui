import Link from "next/link";
import { getNoticiasDestacadas, formatFecha } from "@/lib/models";
import { ArrowRight, Calendar, User } from "lucide-react";

export default async function NoticiasDestacadas() {
  const noticias = await getNoticiasDestacadas(3);
  if (noticias.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 text-brand-dark rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-brand-gold rounded-full"></span>
              Últimas Noticias
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
              Noticias <span className="text-brand-coral">Arquidiocesanas</span>
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl">
              Mantente informado sobre las actividades, logros y eventos de nuestra red educativa.
            </p>
          </div>
          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 text-brand-dark font-semibold hover:text-brand-coral transition-colors group"
          >
            Ver todas las noticias
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {noticias.map((noticia, index) => (
            <Link
              key={noticia.id}
              href={`/noticias/${noticia.slug}`}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 ${
                index === 0 ? "md:col-span-2 md:row-span-1" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${index === 0 ? "h-64 md:h-80" : "h-48"}`}>
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${noticia.imagen})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-brand-gold text-brand-dark text-xs font-bold rounded-full">
                    {noticia.categoria}
                  </span>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className={`font-bold text-white leading-tight group-hover:text-brand-gold transition-colors ${
                    index === 0 ? "text-xl md:text-2xl" : "text-lg"
                  }`}>
                    {noticia.titulo}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {noticia.resumen}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-brand-coral" />
                    {formatFecha(noticia.fecha)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4 text-brand-coral" />
                    {noticia.autor}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
