import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { id } = await params;
  const modal = await prisma.modal.findUnique({ where: { id } });
  if (!modal) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json(modal);
}

export async function PUT(req: Request, { params }: Params) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json();

  const data: any = {};
  if (body.title !== undefined) data.title = String(body.title);
  if (body.content !== undefined) data.content = String(body.content);
  if ("imageUrl" in body) data.imageUrl = body.imageUrl ? String(body.imageUrl) : null;
  if ("badge" in body) data.badge = body.badge ? String(body.badge) : null;
  if ("ctaText" in body) data.ctaText = body.ctaText ? String(body.ctaText) : null;
  if ("ctaUrl" in body) data.ctaUrl = body.ctaUrl ? String(body.ctaUrl) : null;
  if (body.pageUrl !== undefined) data.pageUrl = String(body.pageUrl);
  if ("startDate" in body) data.startDate = body.startDate ? new Date(body.startDate) : null;
  if ("endDate" in body) data.endDate = body.endDate ? new Date(body.endDate) : null;
  if (body.trigger !== undefined) data.trigger = String(body.trigger);
  if (body.delaySeconds !== undefined) data.delaySeconds = Number(body.delaySeconds);
  if (body.scrollPercent !== undefined) data.scrollPercent = Number(body.scrollPercent);
  if (body.isActive !== undefined) data.isActive = Boolean(body.isActive);
  if (body.showOnce !== undefined) data.showOnce = Boolean(body.showOnce);
  if (body.position !== undefined) data.position = String(body.position);
  if (body.order !== undefined) data.order = Number(body.order);

  const modal = await prisma.modal.update({ where: { id }, data });
  return NextResponse.json(modal);
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.modal.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
