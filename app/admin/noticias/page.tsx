import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminNoticiasList() {
  const noticias = await prisma.noticia.findMany({ orderBy: { fecha: "desc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">Noticias</h1>
          <p className="text-gray-600">{noticias.length} noticias en total</p>
        </div>
        <Link
          href="/admin/noticias/nueva"
          className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-4 py-2.5 rounded-xl font-semibold hover:bg-brand-gold/90"
        >
          <Plus className="h-4 w-4" /> Nueva noticia
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {noticias.map((n: typeof noticias[number]) => (
              <tr key={n.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-semibold text-brand-dark">{n.titulo}</div>
                  <div className="text-xs text-gray-500">{n.autor}</div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{n.categoria}</td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(n.fecha).toLocaleDateString("es-CO")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 flex-wrap">
                    {n.publicada ? (
                      <span className="inline-block text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        Publicada
                      </span>
                    ) : (
                      <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        Borrador
                      </span>
                    )}
                    {n.destacada && (
                      <span className="inline-block text-xs bg-brand-gold/20 text-brand-dark px-2 py-0.5 rounded">
                        Destacada
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/noticias/${n.id}`}
                    className="inline-flex items-center gap-1 text-brand-coral hover:text-brand-dark text-sm font-semibold"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Editar
                  </Link>
                </td>
              </tr>
            ))}
            {noticias.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                  No hay noticias aún. Crea la primera.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
