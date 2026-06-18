import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deepseekChat, ChatMessage } from "@/lib/deepseek";
import { buildSaraSystemPrompt } from "@/lib/sara-context";

export const runtime = "nodejs";

const MAX_HISTORY_TURNS = 15;
const CRM_WEBCHAT_URL = process.env.CRM_WEBCHAT_URL;

interface CRMResponse {
  success: boolean;
  response: string | null;
  status: string;
  leadId?: string;
  shouldBookAppointment?: boolean;
  actions?: unknown[];
}

async function sendToCRM(
  message: string,
  senderId: string,
  name?: string,
  email?: string,
  phone?: string,
  colegioId?: string
): Promise<CRMResponse | null> {
  if (!CRM_WEBCHAT_URL) return null;

  try {
    const res = await fetch(CRM_WEBCHAT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderId,
        message,
        name: name || undefined,
        email: email || undefined,
        phone: phone || undefined,
        colegioId: colegioId || undefined,
        timestamp: Date.now(),
      }),
    });

    if (!res.ok) {
      console.error("CRM webhook error:", res.status, await res.text());
      return null;
    }

    const data = (await res.json()) as CRMResponse;
    return data;
  } catch (err) {
    console.error("CRM connection error:", err);
    return null;
  }
}

async function saveSaraMessage(
  senderId: string,
  role: "user" | "assistant",
  content: string,
  source?: string,
  metadata?: { name?: string; email?: string; phone?: string }
) {
  try {
    const conversation = await prisma.saraConversation.upsert({
      where: { senderId },
      create: {
        senderId,
        name: metadata?.name || null,
        email: metadata?.email || null,
        phone: metadata?.phone || null,
      },
      update: {
        ...(metadata?.name ? { name: metadata.name } : {}),
        ...(metadata?.email ? { email: metadata.email } : {}),
        ...(metadata?.phone ? { phone: metadata.phone } : {}),
      },
    });
    await prisma.saraMessage.create({
      data: {
        conversationId: conversation.id,
        role,
        content,
        source: source || null,
      },
    });
  } catch (err) {
    console.error("Error saving Sara message:", err);
  }
}

async function localSaraReply(
  message: string,
  history?: ChatMessage[]
): Promise<string> {
  const systemPrompt = buildSaraSystemPrompt();
  const trimmedHistory = (Array.isArray(history) ? history : []).slice(-MAX_HISTORY_TURNS * 2);

  const messages = [
    { role: "system" as const, content: systemPrompt },
    ...trimmedHistory.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user" as const, content: message.trim() },
  ];

  return await deepseekChat(messages, { temperature: 0.65, maxTokens: 800 });
}

export async function POST(request: Request) {
  try {
    const { message, history, senderId, name, email, phone, colegioId, escalate } =
      (await request.json()) as {
        message: string;
        history?: ChatMessage[];
        senderId?: string;
        name?: string;
        email?: string;
        phone?: string;
        colegioId?: string;
        escalate?: boolean;
      };

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Mensaje requerido" }, { status: 400 });
    }

    // Generate a stable senderId if not provided
    const stableSenderId = senderId || `web-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    // Save user message
    await saveSaraMessage(stableSenderId, "user", message.trim(), undefined, { name, email, phone });

    // 1. Escalation to CRM (user clicked "Talk to advisor")
    if (escalate && CRM_WEBCHAT_URL) {
      const crmResponse = await sendToCRM(
        message.trim(),
        stableSenderId,
        name,
        email,
        phone,
        colegioId
      );

      if (crmResponse && crmResponse.response) {
        await saveSaraMessage(stableSenderId, "assistant", crmResponse.response, "crm");
        return NextResponse.json({
          reply: crmResponse.response,
          source: "crm",
          leadId: crmResponse.leadId,
          shouldBookAppointment: crmResponse.shouldBookAppointment,
          actions: crmResponse.actions,
        });
      }

      // If CRM fails, fall through to local reply
    }

    // 2. Default: always use local DeepSeek + context
    const reply = await localSaraReply(message.trim(), history);
    await saveSaraMessage(stableSenderId, "assistant", reply, "local");
    return NextResponse.json({ reply, source: "local" });
  } catch (e: unknown) {
    console.error("Sara API error:", e);
    const message = e instanceof Error ? e.message : "Error procesando la consulta";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
