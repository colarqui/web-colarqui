import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const modales = await prisma.modal.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(modales);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();

  const data = {
    title: String(body.title ?? ""),
    content: String(body.content ?? ""),
    imageUrl: body.imageUrl ? String(body.imageUrl) : null,
    badge: body.badge ? String(body.badge) : null,
    ctaText: body.ctaText ? String(body.ctaText) : null,
    ctaUrl: body.ctaUrl ? String(body.ctaUrl) : null,
    pageUrl: String(body.pageUrl ?? "*"),
    startDate: body.startDate ? new Date(body.startDate) : null,
    endDate: body.endDate ? new Date(body.endDate) : null,
    trigger: String(body.trigger ?? "immediate"),
    delaySeconds: Number(body.delaySeconds ?? 0),
    scrollPercent: Number(body.scrollPercent ?? 0),
    isActive: Boolean(body.isActive ?? true),
    showOnce: Boolean(body.showOnce ?? true),
    position: String(body.position ?? "center"),
    order: Number(body.order ?? 0),
  };

  const modal = await prisma.modal.create({ data });
  return NextResponse.json(modal);
}
