import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let config = await prisma.homeConfig.findFirst({ orderBy: { createdAt: "desc" } });
  if (!config) {
    config = await prisma.homeConfig.create({ data: {} });
  }
  return NextResponse.json(config);
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const data: any = {};

  if (body.heroSlides !== undefined) data.heroSlides = JSON.stringify(body.heroSlides);
  if (body.stats !== undefined) data.stats = JSON.stringify(body.stats);
  if (body.whyChoose !== undefined) data.whyChoose = JSON.stringify(body.whyChoose);
  if (body.alliances !== undefined) data.alliances = JSON.stringify(body.alliances);
  if (body.testimonials !== undefined) data.testimonials = JSON.stringify(body.testimonials);
  if (body.faq !== undefined) data.faq = JSON.stringify(body.faq);
  if (body.ctaTitle !== undefined) data.ctaTitle = String(body.ctaTitle);
  if (body.ctaCopy !== undefined) data.ctaCopy = String(body.ctaCopy);
  if (body.ctaPrimary !== undefined) data.ctaPrimary = String(body.ctaPrimary);
  if (body.ctaPrimaryLabel !== undefined) data.ctaPrimaryLabel = String(body.ctaPrimaryLabel);
  if (body.ctaSecondary !== undefined) data.ctaSecondary = String(body.ctaSecondary);
  if (body.ctaSecondaryLabel !== undefined) data.ctaSecondaryLabel = String(body.ctaSecondaryLabel);

  let config = await prisma.homeConfig.findFirst({ orderBy: { createdAt: "desc" } });
  if (!config) {
    config = await prisma.homeConfig.create({ data });
  } else {
    config = await prisma.homeConfig.update({ where: { id: config.id }, data });
  }

  return NextResponse.json(config);
}
