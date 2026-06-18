"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, Eye, EyeOff, Save } from "lucide-react";

export default function PerfilPage() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas nuevas no coinciden");
      return;
    }

    if (newPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres");
      return;
    }

    setSaving(true);
    const res = await fetch("/api/auth/me/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setSuccess("Contraseña actualizada correctamente");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setError(data.error || "Error al cambiar la contraseña");
    }
    setSaving(false);
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold text-brand-dark mb-8">Mi perfil</h1>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="h-12 w-12 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-dark font-bold text-lg">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold text-brand-dark">Cambiar contraseña</h2>
            <p className="text-sm text-gray-500">Actualiza tu contraseña de acceso al panel de administración</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-200">{error}</div>
        )}
        {success && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm border border-green-200">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña actual</label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrent((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nueva contraseña</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNew((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Confirmar nueva contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-6 py-2.5 rounded-xl font-semibold hover:bg-brand-gold/90 disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "Guardando..." : "Actualizar contraseña"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
