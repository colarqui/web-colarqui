import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const data: any = {};
  if (body.titulo !== undefined) data.titulo = body.titulo;
  if (body.descripcion !== undefined) data.descripcion = body.descripcion;
  if (body.categoria !== undefined) data.categoria = body.categoria;
  if (body.activo !== undefined) data.activo = Boolean(body.activo);

  const doc = await prisma.documento.update({
    where: { id },
    data,
    select: {
      id: true,
      titulo: true,
      descripcion: true,
      categoria: true,
      nombreArchivo: true,
      rutaArchivo: true,
      tamano: true,
      paginas: true,
      activo: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return NextResponse.json(doc);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const doc = await prisma.documento.findUnique({ where: { id } });
  if (!doc) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  try {
    await supabase.storage.from("documents").remove([doc.rutaArchivo]);
  } catch {}
  await prisma.documento.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
