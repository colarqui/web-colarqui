import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const FUNDACIONES_VALID = ["FESIH", "FAUU"];
const ANIOS_VALID = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fundacion = searchParams.get("fundacion") || "";
  const anio = parseInt(searchParams.get("anio") || "0", 10);

  if (!FUNDACIONES_VALID.includes(fundacion) || !ANIOS_VALID.includes(anio)) {
    return NextResponse.json({ comments: [] });
  }

  const comments = await prisma.comentarioInforme.findMany({
    where: { fundacion, anio },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ comments });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fundacion, anio, nombre, comentario } = body;

    if (!FUNDACIONES_VALID.includes(fundacion) || !ANIOS_VALID.includes(anio)) {
      return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
    }
    if (!nombre || nombre.trim().length < 2) {
      return NextResponse.json({ error: "El nombre es obligatorio." }, { status: 400 });
    }
    if (!comentario || comentario.trim().length < 5) {
      return NextResponse.json({ error: "El comentario debe tener al menos 5 caracteres." }, { status: 400 });
    }

    const created = await prisma.comentarioInforme.create({
      data: {
        fundacion,
        anio,
        nombre: nombre.trim(),
        comentario: comentario.trim(),
      },
    });

    return NextResponse.json({ comment: created });
  } catch {
    return NextResponse.json({ error: "Error al guardar el comentario." }, { status: 500 });
  }
}
