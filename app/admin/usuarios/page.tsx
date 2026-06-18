import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil, KeyRound, Shield } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminUsuariosList() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      displayName: true,
      role: true,
      activo: true,
      createdAt: true,
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">Gestión de Usuarios</h1>
          <p className="text-gray-600">{users.length} usuarios registrados</p>
        </div>
        <Link
          href="/admin/usuarios/nuevo"
          className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-4 py-2.5 rounded-xl font-semibold hover:bg-brand-gold/90"
        >
          <Plus className="h-4 w-4" /> Nuevo usuario
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Usuario</th>
              <th className="px-4 py-3">Nombre visible</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-semibold text-brand-dark">{u.username || u.email}</div>
                  <div className="text-xs text-gray-500">{u.name}</div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{u.displayName || u.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block text-xs px-2 py-0.5 rounded ${
                    u.role === "admin" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"
                  }`}>
                    {u.role === "admin" ? "Administrador" : "Editor"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block text-xs px-2 py-0.5 rounded ${
                    u.activo ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}>
                    {u.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/usuarios/${u.id}`}
                      className="inline-flex items-center gap-1 text-brand-coral hover:text-brand-dark text-sm font-semibold"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Editar
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                  No hay usuarios registrados. Crea el primero.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
