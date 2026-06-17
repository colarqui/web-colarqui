import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import ColegiosTable from "./ColegiosTable";

export const dynamic = "force-dynamic";

export default async function AdminColegiosList() {
  const colegios = await prisma.colegio.findMany({ orderBy: { nombre: "asc" } });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">Colegios</h1>
          <p className="text-gray-600">{colegios.length} colegios en total</p>
        </div>
        <Link
          href="/admin/colegios/nuevo"
          className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-4 py-2.5 rounded-xl font-semibold hover:bg-brand-gold/90"
        >
          <Plus className="h-4 w-4" /> Nuevo colegio
        </Link>
      </div>

      <ColegiosTable colegios={colegios} />
    </div>
  );
}
