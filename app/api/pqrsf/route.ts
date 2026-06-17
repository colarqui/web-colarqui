import { NextResponse } from "next/server";

const ZOHO_ACTION = "https://forms.zohopublic.com/secretariaejecutiva/form/ContactoPQRs/formperma/EsCtK5Y3pPm5JGDj-I6Q0XpSfKOHXrj2LhGyNEYCzf8/htmlRecords/submit";

export async function POST(request: Request) {
  try {
    // Leer FormData del cliente
    const incoming = await request.formData();

    // Reconstruir FormData para Zoho (copiar todos los campos)
    const outgoing = new FormData();
    for (const [key, value] of incoming.entries()) {
      outgoing.append(key, value);
    }

    // Asegurar que existan los hidden fields que Zoho espera (pueden quedar vacíos)
    if (!outgoing.has("ip_address")) outgoing.append("ip_address", "");
    if (!outgoing.has("geo_location")) outgoing.append("geo_location", "");
    if (!outgoing.has("zf_referrer_name")) outgoing.append("zf_referrer_name", "");
    if (!outgoing.has("zf_redirect_url")) outgoing.append("zf_redirect_url", "");
    if (!outgoing.has("zc_gad")) outgoing.append("zc_gad", "");

    // Enviar a Zoho Forms
    const zohoRes = await fetch(ZOHO_ACTION, {
      method: "POST",
      body: outgoing,
    });

    if (zohoRes.ok) {
      return NextResponse.json({ success: true });
    }

    const text = await zohoRes.text().catch(() => "");
    console.error("Zoho error:", zohoRes.status, text.slice(0, 500));
    return NextResponse.json(
      { success: false, error: `Zoho respondió ${zohoRes.status}` },
      { status: 502 }
    );
  } catch (err) {
    console.error("PQRSF API error:", err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
