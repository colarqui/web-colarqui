import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, LayoutTemplate } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safeJsonParse } from "@/lib/utils";
import ColegioForm from "../ColegioForm";

export default async function EditarColegio({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const colegio = await prisma.colegio.findUnique({ where: { id } });
  if (!colegio) notFound();

  return (
    <div>
      <Link href="/admin/colegios" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-dark mb-4">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-brand-dark">Editar colegio</h1>
        <Link
          href={`/admin/colegios/${id}/detalle`}
          className="flex items-center gap-2 bg-brand-gold text-brand-dark px-4 py-2 rounded-xl font-semibold text-sm hover:bg-brand-gold/90 transition-colors"
        >
          <LayoutTemplate className="h-4 w-4" />
          Editar Contenido de Página
        </Link>
      </div>
      <ColegioForm
        initial={{
          id: colegio.id,
          slug: colegio.slug,
          nombre: colegio.nombre,
          descripcion: colegio.descripcion,
          direccion: colegio.direccion,
          zona: colegio.zona,
          telefono: colegio.telefono,
          email: colegio.email,
          facebook: colegio.facebook ?? "",
          calendario: colegio.calendario as "A" | "B",
          jornadas: safeJsonParse<string[]>(colegio.jornadas, []),
          niveles: safeJsonParse<string[]>(colegio.niveles, []),
          estudiantes: colegio.estudiantes,
          docentes: colegio.docentes,
          fundacion: colegio.fundacion,
          egresados: colegio.egresados ?? "",
          caracteristicas: safeJsonParse<string[]>(colegio.caracteristicas, []),
          logo: colegio.logo ?? "",
          publicado: colegio.publicado,
        }}
      />
    </div>
  );
}
