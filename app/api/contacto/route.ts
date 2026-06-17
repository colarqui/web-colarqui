import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    const nombre = (formData.get("nombre") as string) || "";
    const telefono = (formData.get("telefono") as string) || "";
    const correo = (formData.get("correo") as string) || "";
    const cargo = (formData.get("cargo") as string) || "";

    const files = formData.getAll("files") as File[];

    // Build attachments from uploaded PDFs
    const attachments = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        return {
          filename: file.name,
          content: buffer,
          contentType: file.type || "application/pdf",
        };
      })
    );

    const smtpConfig = getSmtpConfig();
    const transporter = nodemailer.createTransport(smtpConfig);

    const mailOptions = {
      from: `"Colegios Arquidiocesanos" <${smtpConfig.auth.user}>`,
      to: process.env.CONTACT_EMAIL || "seleccion@arquidiocesanos.edu.co",
      subject: `Nueva hoja de vida - ${nombre}`,
      replyTo: correo,
      html: `
        <h2>Nueva hoja de vida recibida</h2>
        <table border="0" cellpadding="8" style="font-family: Arial, sans-serif; font-size: 14px;">
          <tr><td><strong>Nombre:</strong></td><td>${nombre}</td></tr>
          <tr><td><strong>Teléfono:</strong></td><td>${telefono}</td></tr>
          <tr><td><strong>Correo:</strong></td><td>${correo}</td></tr>
          <tr><td><strong>Cargo / Profesión:</strong></td><td>${cargo}</td></tr>
          <tr><td><strong>Archivos adjuntos:</strong></td><td>${files.length} PDF(s)</td></tr>
        </table>
        <p style="font-family: Arial, sans-serif; font-size: 12px; color: #666; margin-top: 24px;">
          Este mensaje fue enviado desde el formulario "Trabaja con Nosotros" del sitio web de Colegios Arquidiocesanos.
        </p>
      `,
      text: `Nueva hoja de vida recibida\n\nNombre: ${nombre}\nTeléfono: ${telefono}\nCorreo: ${correo}\nCargo/Profesión: ${cargo}\nArchivos: ${files.length} PDF(s)`,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email. Check SMTP configuration." },
      { status: 500 }
    );
  }
}
