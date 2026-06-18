import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = await prisma.documento.findUnique({ where: { id } });
  if (!doc || !doc.activo) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    if (!supabaseUrl) {
      return NextResponse.json({ error: "Configuración de almacenamiento incompleta" }, { status: 500 });
    }
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/documents/${doc.rutaArchivo}`;
    return NextResponse.redirect(publicUrl, 302);
  } catch {
    return NextResponse.json({ error: "Archivo no disponible" }, { status: 404 });
  }
}
