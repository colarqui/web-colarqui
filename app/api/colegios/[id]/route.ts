import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const colegio = await prisma.colegio.findUnique({ where: { id } });
  if (!colegio) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json(colegio);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const data: any = { ...body };
  delete data.id;
  delete data.createdAt;
  delete data.updatedAt;

  if (Array.isArray(data.jornadas)) data.jornadas = JSON.stringify(data.jornadas);
  if (Array.isArray(data.niveles)) data.niveles = JSON.stringify(data.niveles);
  if (Array.isArray(data.caracteristicas)) data.caracteristicas = JSON.stringify(data.caracteristicas);
  if (data.estudiantes !== undefined) data.estudiantes = Number(data.estudiantes);
  if (data.docentes !== undefined) data.docentes = Number(data.docentes);
  if (data.fundacion !== undefined) data.fundacion = Number(data.fundacion);
  if (data.egresados !== undefined && data.egresados !== null && data.egresados !== "") {
    data.egresados = Number(data.egresados);
  } else if (data.egresados === "" || data.egresados === null) {
    data.egresados = null;
  }

  const colegio = await prisma.colegio.update({ where: { id }, data });
  return NextResponse.json(colegio);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  await prisma.colegio.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
