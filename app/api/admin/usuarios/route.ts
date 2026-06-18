import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession, hashPassword } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
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

  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { username, email, password, name, displayName, role, permisos } = body;

    if (!username || !email || !password || !name) {
      return NextResponse.json(
        { error: "Usuario, email, contraseña y nombre son requeridos" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findFirst({
      where: { OR: [{ username: username.trim().toLowerCase() }, { email: email.trim().toLowerCase() }] },
    });

    if (existing) {
      return NextResponse.json({ error: "El usuario o email ya existe" }, { status: 409 });
    }

    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username: username.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        password: hashed,
        name: name.trim(),
        displayName: (displayName || name).trim(),
        role: role || "editor",
        permisos: JSON.stringify(permisos || {}),
        activo: true,
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
    console.error("Create user error:", error);
    return NextResponse.json({ error: "Error al crear usuario" }, { status: 500 });
  }
}
