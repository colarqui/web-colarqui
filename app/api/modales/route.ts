import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageUrl = searchParams.get("pageUrl") || "/";
  const now = new Date();

  const modales = await prisma.modal.findMany({
    where: {
      isActive: true,
      OR: [
        { pageUrl: "*" },
        { pageUrl: pageUrl },
        { pageUrl: { startsWith: pageUrl + "/" } },
      ],
      AND: [
        {
          OR: [
            { startDate: null },
            { startDate: { lte: now } },
          ],
        },
        {
          OR: [
            { endDate: null },
            { endDate: { gte: now } },
          ],
        },
      ],
    },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(modales);
}
