import { NextRequest, NextResponse } from 'next/server';

const CRM_BASE = process.env.CRM_WEBCHAT_URL
  ? process.env.CRM_WEBCHAT_URL.replace('/api/webhooks/webchat', '')
  : null;

// GET /api/sara/agent-messages?sessionId=xxx&since=ISO_DATE
// Proxy de polling: el webchat llama este endpoint para recibir mensajes del asesor.
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('sessionId');
  const since = req.nextUrl.searchParams.get('since') ?? new Date(0).toISOString();

  if (!sessionId || !CRM_BASE) {
    return NextResponse.json({ messages: [] });
  }

  try {
    const res = await fetch(
      `${CRM_BASE}/api/webchat/sessions/${sessionId}/messages?since=${since}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return NextResponse.json({ messages: [] });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ messages: [] });
  }
}
