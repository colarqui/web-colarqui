"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Lock, Eye, EyeOff } from "lucide-react";

type PermisosData = {
  noticias?: { crear?: boolean; editar?: boolean; publicar?: boolean; eliminar?: boolean };
  colegios?: { crear?: boolean; editar?: boolean; publicar?: boolean; eliminar?: boolean };
  documentos?: { crear?: boolean; editar?: boolean; publicar?: boolean; eliminar?: boolean };
};

type Usuario = {
  id?: string;
  username?: string | null;
  email: string;
  name: string;
  displayName: string;
  role: string;
  permisos: string;
  activo: boolean;
};

const DEFAULT_PERMISOS: PermisosData = {
  noticias: { crear: false, editar: false, publicar: false, eliminar: false },
  colegios: { crear: false, editar: false, publicar: false, eliminar: false },
  documentos: { crear: false, editar: false, publicar: false, eliminar: false },
};

export default function UsuarioForm({ initial }: { initial?: Partial<Usuario> }) {
  const router = useRouter();
  const isEditing = !!initial?.id;

  const parsedPermisos = (() => {
    try {
      return { ...DEFAULT_PERMISOS, ...JSON.parse(initial?.permisos || "{}") };
    } catch {
      return DEFAULT_PERMISOS;
    }
  })();

  const [form, setForm] = useState({
    username: initial?.username || "",
    email: initial?.email || "",
    name: initial?.name || "",
    displayName: initial?.displayName || "",
    role: initial?.role || "editor",
    password: "",
    activo: initial?.activo ?? true,
    permisos: parsedPermisos,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState("");
  const [resetting, setResetting] = useState(false);
  const [resetMsg, setResetMsg] = useState("");

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const togglePermiso = useCallback((
    modulo: keyof PermisosData,
    accion: keyof NonNullable<PermisosData["noticias"]>
  ) => {
    setForm((prev) => {
      const next = { ...prev };
      const mod = { ...(next.permisos[modulo] || {}) } as Record<string, boolean>;
      mod[accion] = !mod[accion];
      next.permisos = { ...next.permisos, [modulo]: mod };
      return next;
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = isEditing ? `/api/admin/usuarios/${initial?.id}` : "/api/admin/usuarios";
    const method = isEditing ? "PUT" : "POST";
    const body: any = {
      name: form.name,
      displayName: form.displayName,
      email: form.email,
      role: form.role,
      permisos: form.permisos,
      activo: form.activo,
    };

    if (!isEditing) {
      body.username = form.username;
      body.password = form.password;
    }

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Error al guardar");
      setSaving(false);
      return;
    }

    router.push("/admin/usuarios");
    router.refresh();
  }

  async function handleResetPassword() {
    if (!initial?.id || !resetPassword || resetPassword.length < 6) return;
    setResetting(true);
    setResetMsg("");

    const res = await fetch(`/api/admin/usuarios/${initial.id}/password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: resetPassword }),
    });

    if (res.ok) {
      setResetMsg("Contraseña actualizada correctamente");
      setResetPassword("");
    } else {
      const data = await res.json().catch(() => ({}));
      setResetMsg(data.error || "Error al actualizar contraseña");
    }
    setResetting(false);
  }

  const modulos: { key: keyof PermisosData; label: string }[] = [
    { key: "noticias", label: "Noticias" },
    { key: "colegios", label: "Colegios" },
    { key: "documentos", label: "Documentos PDF" },
  ];

  const acciones: { key: string; label: string }[] = [
    { key: "crear", label: "Crear" },
    { key: "editar", label: "Editar" },
    { key: "publicar", label: "Publicar" },
    { key: "eliminar", label: "Eliminar" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-200">{error}</div>
      )}

      <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4">
        <h2 className="text-lg font-bold text-brand-dark">Información del usuario</h2>

        {!isEditing && (
          <Field label="Nombre de usuario" hint="Usado para iniciar sesión (solo letras, números y guiones)">
            <input
              type="text"
              value={form.username}
              onChange={(e) => update("username", e.target.value)}
              required
              className="input"
              placeholder="ej: brenda.victoria"
            />
          </Field>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Nombre completo">
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
              className="input"
              placeholder="ej: Brenda Victoria Gómez"
            />
          </Field>
          <Field label="Nombre visible / Autor" hint="Aparece como autor en las noticias">
            <input
              type="text"
              value={form.displayName}
              onChange={(e) => update("displayName", e.target.value)}
              required
              className="input"
              placeholder="ej: Brenda Victoria"
            />
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Correo electrónico">
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
              className="input"
            />
          </Field>
          <Field label="Rol">
            <select value={form.role} onChange={(e) => update("role", e.target.value)} className="input">
              <option value="admin">Administrador</option>
              <option value="editor">Editor</option>
            </select>
          </Field>
        </div>

        {!isEditing && (
          <Field label="Contraseña">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                required
                minLength={6}
                className="input pr-10"
                placeholder="Mínimo 6 caracteres"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </Field>
        )}

        {isEditing && (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.activo}
              onChange={(e) => update("activo", e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-semibold">Usuario activo</span>
          </label>
        )}
      </div>

      {/* Permisos */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4">
        <h2 className="text-lg font-bold text-brand-dark">Permisos por módulo</h2>
        <p className="text-sm text-gray-500">
          Activa las casillas para permitir cada acción. Los administradores tienen todos los permisos automáticamente.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2 pr-4">Módulo</th>
                {acciones.map((a) => (
                  <th key={a.key} className="py-2 px-2 text-center">{a.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modulos.map((mod) => (
                <tr key={mod.key} className="border-b border-gray-50">
                  <td className="py-3 pr-4 font-medium text-brand-dark">{mod.label}</td>
                  {acciones.map((acc) => {
                    const checked = !!form.permisos[mod.key]?.[acc.key as keyof NonNullable<PermisosData["noticias"]>];
                    return (
                      <td key={acc.key} className="py-3 px-2 text-center">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => togglePermiso(mod.key, acc.key as keyof NonNullable<PermisosData["noticias"]>)}
                          className="w-5 h-5 accent-brand-gold cursor-pointer"
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restablecer contraseña (solo edición) */}
      {isEditing && (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-4">
          <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Restablecer contraseña
          </h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={resetPassword}
              onChange={(e) => setResetPassword(e.target.value)}
              placeholder="Nueva contraseña (mín. 6 caracteres)"
              className="input flex-1"
              minLength={6}
            />
            <button
              type="button"
              onClick={handleResetPassword}
              disabled={resetting || resetPassword.length < 6}
              className="px-4 py-2 bg-brand-dark text-white rounded-lg text-sm font-medium hover:bg-brand-dark/90 disabled:opacity-50"
            >
              {resetting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Actualizar"}
            </button>
          </div>
          {resetMsg && (
            <p className={`text-sm ${resetMsg.includes("Error") ? "text-red-600" : "text-green-600"}`}>
              {resetMsg}
            </p>
          )}
        </div>
      )}

      <div className="flex justify-end items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/usuarios")}
          className="px-4 py-2.5 text-gray-600 bg-gray-100 rounded-xl font-medium hover:bg-gray-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-6 py-2.5 rounded-xl font-semibold hover:bg-brand-gold/90 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Guardando..." : "Guardar usuario"}
        </button>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border-radius: 0.625rem;
          border: 1px solid #e5e7eb;
          background: white;
          font-size: 0.875rem;
        }
        .input:focus {
          outline: none;
          border-color: #fbb823;
          box-shadow: 0 0 0 3px rgba(251, 184, 35, 0.2);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
}
