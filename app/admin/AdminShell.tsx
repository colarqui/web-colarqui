"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Newspaper, School, FileText, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

type Session = { name: string; email: string } | null;

export default function AdminShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Sin sidebar para login
  if (pathname?.startsWith("/admin/login")) {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-brand-dark text-white min-h-screen flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-bold text-lg text-brand-gold">Panel CA</span>
          </Link>
          <p className="text-xs text-gray-400 mt-1">Colegios Arquidiocesanos</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavLink href="/admin" exact pathname={pathname} icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" />
          <NavLink href="/admin/noticias" pathname={pathname} icon={<Newspaper className="h-4 w-4" />} label="Noticias" />
          <NavLink href="/admin/colegios" pathname={pathname} icon={<School className="h-4 w-4" />} label="Colegios" />
          <NavLink href="/admin/documentos" pathname={pathname} icon={<FileText className="h-4 w-4" />} label="Documentos PDF" />
        </nav>

        <div className="p-4 border-t border-white/10">
          {session && (
            <div className="mb-3">
              <div className="text-sm font-semibold">{session.name}</div>
              <div className="text-xs text-gray-400 truncate">{session.email}</div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
          <Link
            href="/"
            className="block mt-2 text-center text-xs text-gray-400 hover:text-brand-gold"
          >
            ← Volver al sitio público
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-x-auto">{children}</main>
    </div>
  );
}

function NavLink({
  href,
  pathname,
  icon,
  label,
  exact,
}: {
  href: string;
  pathname: string | null;
  icon: React.ReactNode;
  label: string;
  exact?: boolean;
}) {
  const active = exact ? pathname === href : pathname?.startsWith(href);
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
        active
          ? "bg-brand-gold text-brand-dark font-semibold"
          : "text-gray-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
