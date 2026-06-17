import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { ids, action } = await req.json();
  if (!Array.isArray(ids) || ids.length === 0)
    return NextResponse.json({ error: "Sin colegios seleccionados" }, { status: 400 });

  if (action !== "mostrar" && action !== "ocultar")
    return NextResponse.json({ error: "Acción inválida" }, { status: 400 });

  await prisma.colegio.updateMany({
    where: { id: { in: ids } },
    data: { publicado: action === "mostrar" },
  });

  return NextResponse.json({ ok: true, updated: ids.length });
}
