import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Newspaper, School, FileText, ArrowRight } from "lucide-react";

export default async function AdminDashboard() {
  const [noticias, colegios, documentos] = await Promise.all([
    prisma.noticia.count(),
    prisma.colegio.count(),
    prisma.documento.count({ where: { activo: true } }),
  ]);

  const cards = [
    {
      title: "Noticias",
      count: noticias,
      href: "/admin/noticias",
      icon: <Newspaper className="h-6 w-6" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Colegios",
      count: colegios,
      href: "/admin/colegios",
      icon: <School className="h-6 w-6" />,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Documentos PDF",
      count: documentos,
      href: "/admin/documentos",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-dark mb-2">Dashboard</h1>
        <p className="text-gray-600">Panel de gestión del sitio de Colegios Arquidiocesanos</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.color}`}>{card.icon}</div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
            </div>
            <div className="text-3xl font-bold text-brand-dark mb-1">{card.count}</div>
            <div className="text-sm text-gray-600">{card.title}</div>
          </Link>
        ))}
      </div>

      <div className="mt-10 bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="text-lg font-bold text-brand-dark mb-4">Accesos rápidos</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/noticias/nueva"
            className="px-4 py-2 bg-brand-gold text-brand-dark rounded-lg text-sm font-semibold hover:bg-brand-gold/90"
          >
            + Nueva noticia
          </Link>
          <Link
            href="/admin/colegios/nuevo"
            className="px-4 py-2 bg-brand-dark text-white rounded-lg text-sm font-semibold hover:bg-brand-dark/90"
          >
            + Nuevo colegio
          </Link>
          <Link
            href="/admin/documentos"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200"
          >
            Subir PDF
          </Link>
          <Link
            href="/documentos"
            target="_blank"
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50"
          >
            Ver gestor público ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
