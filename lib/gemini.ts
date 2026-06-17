import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";

export function getGenAI() {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY no está configurada en .env");
  }
  return new GoogleGenAI({ apiKey });
}

export const GEMINI_MODEL = model;

export type ChatMessage = { role: "user" | "assistant"; content: string };

/**
 * Genera respuesta basada en el contenido de los PDFs proporcionados.
 * Implementación simple sin embeddings: pasa el contexto completo limitado.
 */
export async function askWithContext(params: {
  question: string;
  history?: ChatMessage[];
  documents: { titulo: string; contenido: string }[];
}) {
  const genai = getGenAI();
  const { question, history = [], documents } = params;

  const MAX_CHARS_PER_DOC = 30000; // ~7500 tokens por doc
  const context = documents
    .map(
      (d, i) =>
        `### Documento ${i + 1}: ${d.titulo}\n${d.contenido.slice(0, MAX_CHARS_PER_DOC)}`
    )
    .join("\n\n---\n\n");

  const systemPrompt = `Eres el asistente oficial de Colegios Arquidiocesanos de Cali.
Responde ÚNICAMENTE basándote en el contenido de los documentos proporcionados.
Si la información no está en los documentos, indica claramente que no tienes esa información en los PDFs seleccionados.
Sé claro, conciso y cita el documento de donde obtienes la información cuando sea relevante.
Responde siempre en español.`;

  const historyText = history
    .map((m) => `${m.role === "user" ? "Usuario" : "Asistente"}: ${m.content}`)
    .join("\n");

  const prompt = `${systemPrompt}

=== DOCUMENTOS ===
${context || "(No se han seleccionado documentos)"}

=== HISTORIAL ===
${historyText || "(Sin historial)"}

=== PREGUNTA ACTUAL ===
Usuario: ${question}

Asistente:`;

  const response = await genai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
  });

  return response.text ?? "No pude generar una respuesta.";
}
