import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import UsuarioForm from "../UsuarioForm";

export default async function EditarUsuarioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      displayName: true,
      role: true,
      permisos: true,
      activo: true,
    },
  });

  if (!user) return notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-dark mb-8">Editar usuario</h1>
      <UsuarioForm initial={user} />
    </div>
  );
}
