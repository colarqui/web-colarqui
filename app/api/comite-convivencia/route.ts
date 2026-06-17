import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAILS: Record<string, string> = {
  FESIH: "ccl.sih@arquidiocesanos.edu.co",
  FAUU:  "ccl.auu@arquidiocesanos.edu.co",
};

const NOMBRES: Record<string, string> = {
  FESIH: "Fundación Educativa Santa Isabel de Hungría",
  FAUU:  "Fundación Educativa Alberto Uribe Urdaneta",
};

function getSmtpConfig() {
  return {
    host:   process.env.SMTP_HOST || "smtp.gmail.com",
    port:   Number(process.env.SMTP_PORT || 587),
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

    const fundacion   = (formData.get("fundacion")   as string) || "";
    const nombre      = (formData.get("nombre")      as string) || "";
    const email       = (formData.get("email")       as string) || "";
    const telefono    = (formData.get("telefono")    as string) || "";
    const colegio     = (formData.get("colegio")     as string) || "";
    const descripcion = (formData.get("descripcion") as string) || "";

    const destEmail = EMAILS[fundacion];
    if (!destEmail) {
      return NextResponse.json(
        { success: false, error: "Fundación no válida." },
        { status: 400 }
      );
    }

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
        <div style="background: #1e3a5f; color: white; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="margin:0; font-size: 20px;">📋 Nueva Queja — Comité de Convivencia Laboral</h1>
          <p style="margin: 8px 0 0; opacity: 0.85; font-size: 13px;">
            ${NOMBRES[fundacion]} · ${new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })}
          </p>
        </div>

        <div style="background: #fafafa; border: 1px solid #e5e7eb; padding: 24px; border-radius: 0 0 8px 8px;">
          <h2 style="font-size:15px; margin: 0 0 12px; color: #111;">Datos del trabajador</h2>
          <table style="width:100%; border-collapse:collapse; font-size:14px;">
            <tr><td style="padding:6px 0; color:#6b7280; width:160px;">Nombre</td><td style="padding:6px 0;"><strong>${nombre}</strong></td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Correo</td><td style="padding:6px 0;">${email}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Teléfono</td><td style="padding:6px 0;">${telefono}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Fundación</td><td style="padding:6px 0;">${NOMBRES[fundacion]}</td></tr>
            <tr><td style="padding:6px 0; color:#6b7280;">Colegio</td><td style="padding:6px 0;">${colegio}</td></tr>
          </table>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />

          <h2 style="font-size:15px; margin: 0 0 8px; color: #111;">Descripción de los hechos</h2>
          <div style="background: white; border: 1px solid #e5e7eb; border-radius: 6px; padding: 14px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${descripcion}</div>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />

          <p style="font-size:12px; color:#6b7280; margin:0;">
            Archivos adjuntos: ${files.length > 0 ? files.map((f) => f.name).join(", ") : "Ninguno"}<br/>
            Este mensaje fue generado automáticamente desde el canal web del Comité de Convivencia Laboral de los Colegios Arquidiocesanos.<br/>
            <strong>CONFIDENCIAL</strong> — Tratamiento según Ley 1010/2006 y Ley 1581/2012.
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from:     `"CCL — Colegios Arquidiocesanos" <${smtpConfig.auth.user}>`,
      to:       destEmail,
      subject:  `[QUEJA CCL ${fundacion}] ${nombre} — ${new Date().toLocaleDateString("es-CO")}`,
      replyTo:  email,
      html,
      text: `QUEJA COMITÉ DE CONVIVENCIA LABORAL\nFundación: ${NOMBRES[fundacion]}\n\nTrabajador: ${nombre}\nCorreo: ${email}\nTeléfono: ${telefono}\nColegio: ${colegio}\n\nHechos:\n${descripcion}\n\nArchivos: ${files.length}`,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending CCL report:", error);
    return NextResponse.json(
      { success: false, error: "Error al procesar la queja. Verifica la configuración SMTP." },
      { status: 500 }
    );
  }
}
