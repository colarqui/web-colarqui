import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const row = await prisma.colegio.findUnique({ where: { slug: "nuestra-senora-chiquinquira" } });
  console.log("BEFORE:", JSON.stringify({ slug: row?.slug, logo: row?.logo }));

  await prisma.colegio.update({
    where: { slug: "nuestra-senora-chiquinquira" },
    data: { logo: "/logos/nuestra-senora-chiquinquira.png" },
  });

  const updated = await prisma.colegio.findUnique({ where: { slug: "nuestra-senora-chiquinquira" } });
  console.log("AFTER:", JSON.stringify({ slug: updated?.slug, logo: updated?.logo }));
}

main().catch(console.error).finally(() => prisma.$disconnect());
