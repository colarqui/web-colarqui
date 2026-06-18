import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession, verifyPassword, hashPassword } from "@/lib/auth";

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return NextResponse.json(
        { error: "Debes proporcionar la contraseña actual y una nueva de al menos 6 caracteres" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    const ok = await verifyPassword(currentPassword, user.password);
    if (!ok) {
      return NextResponse.json({ error: "Contraseña actual incorrecta" }, { status: 400 });
    }

    const hashed = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: session.userId },
      data: { password: hashed },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Change password error:", error);
    return NextResponse.json({ error: "Error al cambiar la contraseña" }, { status: 500 });
  }
}
