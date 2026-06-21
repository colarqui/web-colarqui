import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  let config = await prisma.homeConfig.findFirst({ orderBy: { createdAt: "desc" } });
  if (!config) {
    // Return hardcoded defaults if no config exists yet
    return NextResponse.json({
      heroSlides: [],
      stats: [],
      whyChoose: [],
      alliances: [],
      testimonials: [],
      faq: [],
      ctaTitle: "¿Listo para dar el primer paso?",
      ctaCopy: "Únete a nuestra comunidad de más de 29,000 estudiantes. Tu hijo merece la mejor educación.",
      ctaPrimary: "/admisiones",
      ctaPrimaryLabel: "Ver proceso de admisión",
      ctaSecondary: "https://runachay.com",
      ctaSecondaryLabel: "Inscribir en Runachay",
    });
  }

  return NextResponse.json({
    ...config,
    heroSlides: JSON.parse(config.heroSlides || "[]"),
    stats: JSON.parse(config.stats || "[]"),
    whyChoose: JSON.parse(config.whyChoose || "[]"),
    alliances: JSON.parse(config.alliances || "[]"),
    testimonials: JSON.parse(config.testimonials || "[]"),
    faq: JSON.parse(config.faq || "[]"),
  });
}
