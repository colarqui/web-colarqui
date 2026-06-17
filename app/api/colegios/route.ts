import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET() {
  const colegios = await prisma.colegio.findMany({ orderBy: { nombre: "asc" } });
  return NextResponse.json(colegios);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await request.json();
  const finalSlug = body.slug?.trim() || slugify(body.nombre || "colegio");

  const colegio = await prisma.colegio.create({
    data: {
      slug: finalSlug,
      nombre: body.nombre,
      descripcion: body.descripcion || "",
      direccion: body.direccion || "",
      zona: body.zona || "",
      telefono: body.telefono || "",
      email: body.email || "",
      facebook: body.facebook || null,
      calendario: body.calendario || "A",
      jornadas: JSON.stringify(body.jornadas || []),
      niveles: JSON.stringify(body.niveles || []),
      estudiantes: Number(body.estudiantes) || 0,
      docentes: Number(body.docentes) || 0,
      fundacion: Number(body.fundacion) || 2000,
      egresados: body.egresados ? Number(body.egresados) : null,
      caracteristicas: JSON.stringify(body.caracteristicas || []),
      logo: body.logo || null,
      publicado: body.publicado !== false,
    },
  });

  return NextResponse.json(colegio, { status: 201 });
}
