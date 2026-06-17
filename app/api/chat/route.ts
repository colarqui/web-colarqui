import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deepseekChat } from "@/lib/deepseek";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { question, documentIds, history } = await request.json();
    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Pregunta requerida" }, { status: 400 });
    }
    if (!Array.isArray(documentIds) || documentIds.length === 0) {
      return NextResponse.json(
        { error: "Selecciona al menos un documento para consultar" },
        { status: 400 }
      );
    }

    const docs = await prisma.documento.findMany({
      where: { id: { in: documentIds }, activo: true },
      select: { titulo: true, contenido: true },
    });

    if (docs.length === 0) {
      return NextResponse.json(
        { error: "No se encontraron documentos activos" },
        { status: 404 }
      );
    }

    const MAX_CHARS_PER_DOC = 30000;
    const context = docs
      .map((d, i) => `### Documento ${i + 1}: ${d.titulo}\n${d.contenido.slice(0, MAX_CHARS_PER_DOC)}`)
      .join("\n\n---\n\n");

    const systemPrompt = `Eres Sara, asistente documental de Colegios Arquidiocesanos de Cali.
Responde ÚNICAMENTE basándote en el contenido de los documentos proporcionados.
Si la información no está en los documentos, indícalo claramente.
Sé clara y concisa. Cuando cites la fuente de donde obtienes información, escríbela en negrita y cursiva usando el formato ***Fuente: Nombre del documento*** al final del párrafo o punto relevante.
Responde siempre en español.

=== DOCUMENTOS ===
${context || "(No se han seleccionado documentos)"}`;

    const historyMsgs = Array.isArray(history)
      ? history.map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        }))
      : [];

    const answer = await deepseekChat([
      { role: "system", content: systemPrompt },
      ...historyMsgs,
      { role: "user", content: question },
    ]);

    return NextResponse.json({ answer });
  } catch (e: unknown) {
    console.error("Chat error:", e);
    const message = e instanceof Error ? e.message : "Error procesando la consulta";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
