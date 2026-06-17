import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const noticia = await prisma.noticia.findUnique({ where: { id } });
  if (!noticia) return NextResponse.json({ error: "No encontrada" }, { status: 404 });
  return NextResponse.json(noticia);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const data: any = { ...body };
  if (data.fecha) data.fecha = new Date(data.fecha);
  delete data.id;
  delete data.createdAt;
  delete data.updatedAt;

  const noticia = await prisma.noticia.update({ where: { id }, data });
  return NextResponse.json(noticia);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  await prisma.noticia.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
