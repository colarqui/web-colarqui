import { NextRequest, NextResponse } from 'next/server';

const CRM_SESSIONS_URL = process.env.CRM_WEBCHAT_URL
  ? process.env.CRM_WEBCHAT_URL.replace('/api/webhooks/webchat', '/api/webchat/sessions')
  : null;

// POST /api/sara/sync
// Proxy interno: sincroniza un intercambio (userMessage + botResponse) al CRM.
export async function POST(req: NextRequest) {
  if (!CRM_SESSIONS_URL) {
    return NextResponse.json({ ok: false, reason: 'CRM_WEBCHAT_URL no configurada' });
  }

  try {
    const body = await req.json();
    const res = await fetch(CRM_SESSIONS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error sync to CRM:', err);
    return NextResponse.json({ ok: false });
  }
}
