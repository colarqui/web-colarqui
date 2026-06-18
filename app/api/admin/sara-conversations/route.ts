import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
  const search = searchParams.get("search") || "";
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
          { senderId: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [conversations, total] = await Promise.all([
    prisma.saraConversation.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip,
      take: limit,
      include: {
        _count: { select: { messages: true } },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { content: true, createdAt: true, role: true },
        },
      },
    }),
    prisma.saraConversation.count({ where }),
  ]);

  return NextResponse.json({
    conversations: conversations.map((c) => ({
      id: c.id,
      senderId: c.senderId,
      name: c.name,
      email: c.email,
      phone: c.phone,
      messageCount: c._count.messages,
      lastMessage: c.messages[0] || null,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    })),
    total,
    page,
    pages: Math.ceil(total / limit),
  });
}
