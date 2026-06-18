import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession, hashPassword } from "@/lib/auth";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { name, displayName, email, role, permisos, activo } = body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        name: name?.trim(),
        displayName: displayName?.trim(),
        email: email?.trim().toLowerCase(),
        role,
        permisos: permisos ? JSON.stringify(permisos) : undefined,
        activo: typeof activo === "boolean" ? activo : undefined,
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        displayName: true,
        role: true,
        permisos: true,
        activo: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("Update user error:", error);
    return NextResponse.json({ error: "Error al actualizar usuario" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const { id } = await params;
    // No permitir eliminar el propio usuario admin
    if (id === session.userId) {
      return NextResponse.json({ error: "No puedes eliminar tu propia cuenta" }, { status: 400 });
    }

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete user error:", error);
    return NextResponse.json({ error: "Error al eliminar usuario" }, { status: 500 });
  }
}
