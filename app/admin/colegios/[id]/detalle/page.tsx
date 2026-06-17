import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import DetalleEditor from "./DetalleEditor";

export default async function DetalleColegioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const colegio = await prisma.colegio.findUnique({ where: { id } });
  if (!colegio) notFound();

  return (
    <div>
      <Link
        href={`/admin/colegios/${id}`}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-dark mb-4"
      >
        <ArrowLeft className="h-4 w-4" /> Volver a datos básicos
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-dark">{colegio.nombre}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Contenido de la página — Calendario {colegio.calendario}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <DetalleEditor
          colegioId={id}
          isCalB={colegio.calendario === "B"}
          nombreColegio={colegio.nombre}
        />
      </div>
    </div>
  );
}
