import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import NoticiaForm from "../NoticiaForm";

export default async function EditarNoticia({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const noticia = await prisma.noticia.findUnique({ where: { id } });
  if (!noticia) notFound();

  return (
    <div>
      <Link href="/admin/noticias" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-dark mb-4">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>
      <h1 className="text-3xl font-bold text-brand-dark mb-6">Editar noticia</h1>
      <NoticiaForm
        initial={{
          ...noticia,
          fecha: noticia.fecha.toISOString(),
        }}
      />
    </div>
  );
}
