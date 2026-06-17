import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const colegio = await prisma.colegio.findUnique({ where: { id }, select: { slug: true } });
  if (!colegio) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  const row = await prisma.colegioDetalle.findUnique({ where: { colegioSlug: colegio.slug } });
  if (!row) {
    return NextResponse.json({
      colegioSlug: colegio.slug,
      ofertaTitulo: "Nuestra Oferta Académica",
      ofertaCopy: "",
      ofertaItems: [],
      equipo: [],
      testimonios: [],
      testimoniosVideo: [],
      galeria: [],
      costos: [],
      heroFondo: "",
      heroOverlay: 80,
      heroOverlayColor: "#000000",
      heroContenedor: "",
    });
  }
  return NextResponse.json({
    colegioSlug:       row.colegioSlug,
    ofertaTitulo:      row.ofertaTitulo,
    ofertaCopy:        row.ofertaCopy,
    ofertaItems:       JSON.parse(row.ofertaItems || "[]"),
    equipo:            JSON.parse(row.equipo       || "[]"),
    testimonios:       JSON.parse(row.testimonios  || "[]"),
    testimoniosVideo:  JSON.parse((row as any).testimoniosVideo || "[]"),
    galeria:           JSON.parse(row.galeria      || "[]"),
    costos:            JSON.parse(row.costos       || "[]"),
    heroFondo:         (row as any).heroFondo         ?? "",
    heroOverlay:       (row as any).heroOverlay        ?? 80,
    heroOverlayColor:  (row as any).heroOverlayColor   ?? "#000000",
    heroContenedor:    (row as any).heroContenedor     ?? "",
  });
}

export async function PUT(req: Request, { params }: Params) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const colegio = await prisma.colegio.findUnique({ where: { id }, select: { slug: true } });
  if (!colegio) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  const body = await req.json();

  const standardData = {
    ofertaTitulo:     String(body.ofertaTitulo ?? "Nuestra Oferta Académica"),
    ofertaCopy:       String(body.ofertaCopy   ?? ""),
    ofertaItems:      JSON.stringify(body.ofertaItems      ?? []),
    equipo:           JSON.stringify(body.equipo           ?? []),
    testimonios:      JSON.stringify(body.testimonios      ?? []),
    testimoniosVideo: JSON.stringify(body.testimoniosVideo ?? []),
    galeria:          JSON.stringify(body.galeria          ?? []),
    costos:           JSON.stringify(body.costos           ?? []),
  };

  const heroFondo        = String(body.heroFondo        ?? "");
  const heroOverlay      = Number(body.heroOverlay       ?? 80);
  const heroOverlayColor = String(body.heroOverlayColor  ?? "#000000");
  const heroContenedor   = String(body.heroContenedor   ?? "");

  try {
    const row = await prisma.colegioDetalle.upsert({
      where:  { colegioSlug: colegio.slug },
      create: { colegioSlug: colegio.slug, ...standardData },
      update: standardData,
    });

    await prisma.$executeRaw`
      UPDATE "ColegioDetalle"
      SET "heroFondo"        = ${heroFondo},
          "heroOverlay"      = ${heroOverlay},
          "heroOverlayColor" = ${heroOverlayColor},
          "heroContenedor"   = ${heroContenedor},
          "updatedAt"        = ${new Date().toISOString()}
      WHERE "colegioSlug" = ${colegio.slug}
    `;

    return NextResponse.json({ ok: true, id: row.id });
  } catch (err: any) {
    console.error("[detalle PUT]", err);
    return NextResponse.json({ error: err?.message ?? "Error interno" }, { status: 500 });
  }
}
