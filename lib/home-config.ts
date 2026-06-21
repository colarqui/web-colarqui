import { prisma } from "./prisma";

export async function getHomeConfig() {
  let row = await prisma.homeConfig.findFirst({ orderBy: { createdAt: "desc" } });
  if (!row) {
    return null;
  }
  return {
    ...row,
    heroSlides: JSON.parse(row.heroSlides || "[]"),
    stats: JSON.parse(row.stats || "[]"),
    whyChoose: JSON.parse(row.whyChoose || "[]"),
    alliances: JSON.parse(row.alliances || "[]"),
    testimonials: JSON.parse(row.testimonials || "[]"),
    faq: JSON.parse(row.faq || "[]"),
  };
}
