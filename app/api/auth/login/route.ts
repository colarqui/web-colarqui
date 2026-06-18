import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createToken, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    const login = (username || email || "").trim().toLowerCase();
    if (!login || !password) {
      return NextResponse.json({ error: "Usuario y contraseña son requeridos" }, { status: 400 });
    }

    // Buscar por username o email
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: login },
          { email: login },
        ],
      },
    });

    if (!user || !user.activo) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const ok = await verifyPassword(password, user.password);
    if (!ok) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    let permisos = {};
    try {
      permisos = JSON.parse(user.permisos || "{}");
    } catch {
      permisos = {};
    }

    const token = await createToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      displayName: user.displayName || user.name,
      role: user.role,
      permisos,
    });
    await setSessionCookie(token);

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        displayName: user.displayName || user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Error al iniciar sesión" }, { status: 500 });
  }
}
