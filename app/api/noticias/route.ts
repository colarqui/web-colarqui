import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET() {
  const noticias = await prisma.noticia.findMany({
    orderBy: { fecha: "desc" },
  });
  return NextResponse.json(noticias);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await request.json();
  const {
    titulo,
    resumen,
    contenido,
    categoria,
    fecha,
    autor,
    imagen,
    destacada,
    publicada,
    slug,
  } = body;

  if (!titulo || !resumen || !contenido) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }

  const finalSlug = slug?.trim() || slugify(titulo);

  const noticia = await prisma.noticia.create({
    data: {
      slug: finalSlug,
      titulo,
      resumen,
      contenido,
      categoria: categoria || "Institucional",
      fecha: fecha ? new Date(fecha) : new Date(),
      autor: autor || "Oficina de Comunicaciones",
      imagen: imagen || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
      destacada: Boolean(destacada),
      publicada: publicada !== false,
    },
  });

  return NextResponse.json(noticia, { status: 201 });
}
