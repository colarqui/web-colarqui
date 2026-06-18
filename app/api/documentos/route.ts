import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

export const runtime = "nodejs";

export async function GET() {
  const docs = await prisma.documento.findMany({
    orderBy: { createdAt: "desc" },
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
  return NextResponse.json(docs);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const titulo = (formData.get("titulo") as string) || "";
    const descripcion = (formData.get("descripcion") as string) || "";
    const categoria = (formData.get("categoria") as string) || "General";

    if (!file) return NextResponse.json({ error: "Archivo requerido" }, { status: 400 });
    if (!titulo.trim()) return NextResponse.json({ error: "Título requerido" }, { status: 400 });
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ error: "Solo se permiten archivos PDF" }, { status: 400 });
    }

    // Subir a Supabase Storage
    const ext = file.name.toLowerCase().endsWith(".pdf") ? ".pdf" : ".pdf";
    const safeName = `${uuidv4()}${ext}`;
    const storagePath = `documents/${safeName}`;
    const bytes = Buffer.from(await file.arrayBuffer());

    const { error: upError } = await supabase.storage
      .from("documents")
      .upload(storagePath, bytes, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (upError) {
      console.error("Supabase upload error:", upError.message, upError.name, upError.cause);
      return NextResponse.json(
        { error: "Error al subir documento al almacenamiento", detail: upError.message },
        { status: 500 }
      );
    }

    // Extraer texto con pdf-parse
    let contenido = "";
    let paginas = 0;
    try {
      // Carga dinámica para evitar el problema de test-files en build
      const pdfParse = (await import("pdf-parse")).default as any;
      const parsed = await pdfParse(bytes);
      contenido = parsed.text || "";
      paginas = parsed.numpages || 0;
    } catch (e) {
      console.error("Error extrayendo PDF:", e);
      contenido = "";
    }

    const doc = await prisma.documento.create({
      data: {
        titulo: titulo.trim(),
        descripcion: descripcion.trim() || null,
        categoria,
        nombreArchivo: file.name,
        rutaArchivo: storagePath,
        tamano: file.size,
        contenido,
        paginas,
        activo: true,
      },
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
      },
    });

    return NextResponse.json(doc, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error al subir documento" }, { status: 500 });
  }
}
