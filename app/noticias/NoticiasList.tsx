"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Calendar, User, Filter } from "lucide-react";
import type { NoticiaUI } from "@/lib/models";
import { formatFecha } from "@/lib/models";

export default function NoticiasList({ noticias }: { noticias: NoticiaUI[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");

  const categorias = ["Todas", ...Array.from(new Set(noticias.map((n) => n.categoria))).sort()];

  const noticiasFiltradas = noticias.filter((n) => {
    const matchesSearch =
      n.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.resumen.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategoria = categoriaActiva === "Todas" || n.categoria === categoriaActiva;
    return matchesSearch && matchesCategoria;
  });

  const noticiaDestacada = noticias.find((n) => n.destacada);
  const noticiasRestantes = noticiasFiltradas.filter((n) => n.id !== noticiaDestacada?.id);
  const mostrarDestacada = categoriaActiva === "Todas" && searchQuery === "" && noticiaDestacada;

  return (
    <>
      <section className="border-b border-gray-100 bg-white sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar noticias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold/20 border border-gray-200"
              />
            </div>

            <div className="flex gap-2 flex-wrap items-center">
              <Filter className="h-4 w-4 text-gray-400 mr-1" />
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  onClick={() => setCategoriaActiva(categoria)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    categoriaActiva === categoria
                      ? "bg-brand-gold text-brand-dark"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {noticiasFiltradas.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">No se encontraron noticias</h3>
              <p className="text-gray-600">Intenta con otros términos de búsqueda o categoría.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {mostrarDestacada && noticiaDestacada && (
                <Link
                  href={`/noticias/${noticiaDestacada.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="grid md:grid-cols-2">
                    <div
                      className="h-64 md:h-auto bg-cover bg-center"
                      style={{ backgroundImage: `url(${noticiaDestacada.imagen})` }}
                    />
                    <div className="p-8">
                      <span className="inline-block px-3 py-1 bg-brand-gold text-brand-dark text-xs font-bold rounded-full mb-4">
                        {noticiaDestacada.categoria}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4 group-hover:text-brand-coral transition-colors">
                        {noticiaDestacada.titulo}
                      </h2>
                      <p className="text-gray-600 mb-6">{noticiaDestacada.resumen}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-brand-coral" />
                          {formatFecha(noticiaDestacada.fecha)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User className="h-4 w-4 text-brand-coral" />
                          {noticiaDestacada.autor}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(mostrarDestacada ? noticiasRestantes : noticiasFiltradas).map((noticia) => (
                  <Link
                    key={noticia.id}
                    href={`/noticias/${noticia.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="h-48 overflow-hidden">
                      <div
                        className="h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url(${noticia.imagen})` }}
                      />
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-brand-coral/10 text-brand-coral-dark text-xs font-bold rounded-full mb-3">
                        {noticia.categoria}
                      </span>
                      <h3 className="text-lg font-bold text-brand-dark mb-3 group-hover:text-brand-coral transition-colors line-clamp-2">
                        {noticia.titulo}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{noticia.resumen}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3.5 w-3.5 text-brand-coral mr-1.5" />
                        {formatFecha(noticia.fecha)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
