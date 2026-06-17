import { NextResponse } from "next/server";
import { deepseekChat, ChatMessage } from "@/lib/deepseek";
import { buildSaraSystemPrompt } from "@/lib/sara-context";

export const runtime = "nodejs";

const MAX_HISTORY_TURNS = 15;

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json() as {
      message: string;
      history?: ChatMessage[];
    };

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Mensaje requerido" }, { status: 400 });
    }

    const systemPrompt = buildSaraSystemPrompt();

    // Keep last N turns to stay within token budget
    const trimmedHistory = (Array.isArray(history) ? history : []).slice(-MAX_HISTORY_TURNS * 2);

    const messages = [
      { role: "system" as const, content: systemPrompt },
      ...trimmedHistory.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user" as const, content: message.trim() },
    ];

    const reply = await deepseekChat(messages, { temperature: 0.65, maxTokens: 800 });

    return NextResponse.json({ reply });
  } catch (e: unknown) {
    console.error("Sara API error:", e);
    const message = e instanceof Error ? e.message : "Error procesando la consulta";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
