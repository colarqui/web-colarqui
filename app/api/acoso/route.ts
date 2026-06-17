import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const DEST = "acososexual@arquidiocesanos.edu.co";

function getSmtpConfig() {
  return {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
    },
  };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const victimaNombre     = (formData.get("victimaNombre")     as string) || "";
    const victimaEmail      = (formData.get("victimaEmail")      as string) || "";
    const victimaTelefono   = (formData.get("victimaTelefono")   as string) || "";
    const victimaFundacion  = (formData.get("victimaFundacion")  as string) || "";
    const victimaColegio    = (formData.get("victimaColegio")    as string) || "";

    const victimarioNombre    = (formData.get("victimarioNombre")    as string) || "";
    const victimarioFundacion = (formData.get("victimarioFundacion") as string) || "";
    const victimarioColegio   = (formData.get("victimarioColegio")   as string) || "";

    const files = formData.getAll("files") as File[];

    const attachments = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        return {
          filename: file.name,
          content: Buffer.from(bytes),
          contentType: file.type || "application/octet-stream",
        };
      })
    );

    const smtpConfig = getSmtpConfig();
    const transporter = nodemailer.createTransport(smtpConfig);

    const html = `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #1a1a1a; max-width: 600px;">
        <div style="background: #b91c1c; color: white; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="margin:0; font-size: 20px;">⚠️ Nueva Denuncia de Acoso Sexual</h1>
          <p style="margin: 8px 0 0; opacity: 0.85; font-size: 13px;">
            Recibida el ${new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })} — Canal Web Confidencial
          </p>
        </div>

        <div style="background: #fafafa; border: 1px solid #e5e7eb; padding: 24px; border-radius: 0 0 8px 8px;">
          <h2 style="font-size:15px; margin: 0 0 12px; color: #111;">1. Datos de la víctima</h2>
          <table style="width:100%; border-collapse:collapse; font-size:14px;">
            <tr><td style="padding:6px 0; color:#6b7280; width:180px;">Nombre</td><td style="padding:6px 0;"><strong>${victimaNombre}</strong></td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Correo electrónico</td><td style="padding:6px 0;">${victimaEmail}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Teléfono de contacto</td><td style="padding:6px 0;">${victimaTelefono}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Fundación</td><td style="padding:6px 0;">${victimaFundacion}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Colegio</td><td style="padding:6px 0;">${victimaColegio}</td></tr>
          </table>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />

          <h2 style="font-size:15px; margin: 0 0 12px; color: #111;">2. Datos del presunto victimario</h2>
          <table style="width:100%; border-collapse:collapse; font-size:14px;">
            <tr><td style="padding:6px 0; color:#6b7280; width:180px;">Nombre</td><td style="padding:6px 0;"><strong>${victimarioNombre}</strong></td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Fundación</td><td style="padding:6px 0;">${victimarioFundacion}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Colegio</td><td style="padding:6px 0;">${victimarioColegio}</td></tr>
          </table>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />

          <p style="font-size:12px; color:#6b7280; margin:0;">
            Archivos adjuntos: ${files.length > 0 ? files.map((f) => f.name).join(", ") : "Ninguno"}<br/>
            Este mensaje fue generado automáticamente desde el canal web de denuncia de acoso sexual de los Colegios Arquidiocesanos.<br/>
            <strong>CONFIDENCIAL</strong> — Tratamiento según Ley 1010/2006, Ley 2365/2024 y Ley 1581/2012.
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Canal de Denuncias — Colegios Arquidiocesanos" <${smtpConfig.auth.user}>`,
      to: DEST,
      subject: `[DENUNCIA ACOSO SEXUAL] ${victimaNombre} — ${new Date().toLocaleDateString("es-CO")}`,
      replyTo: victimaEmail,
      html,
      text: `DENUNCIA ACOSO SEXUAL\n\nVíctima: ${victimaNombre}\nCorreo: ${victimaEmail}\nTeléfono: ${victimaTelefono}\nFundación: ${victimaFundacion}\nColegio: ${victimaColegio}\n\nPresunto victimario: ${victimarioNombre}\nFundación: ${victimarioFundacion}\nColegio: ${victimarioColegio}\n\nArchivos: ${files.length}`,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending acoso report:", error);
    return NextResponse.json(
      { success: false, error: "Error al procesar la denuncia. Verifica la configuración SMTP." },
      { status: 500 }
    );
  }
}
