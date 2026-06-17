export type DSMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

/**
 * Sends messages to DeepSeek API (OpenAI-compatible).
 * Uses deepseek-chat model by default.
 */
export async function deepseekChat(
  messages: DSMessage[],
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("DEEPSEEK_API_KEY no está configurada en .env");

  const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 1024,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "No pude generar una respuesta.";
}

export type ChatMessage = { role: "user" | "assistant"; content: string };
