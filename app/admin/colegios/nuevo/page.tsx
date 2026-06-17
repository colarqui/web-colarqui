import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ColegioForm from "../ColegioForm";

export default function NuevoColegio() {
  return (
    <div>
      <Link href="/admin/colegios" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-dark mb-4">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>
      <h1 className="text-3xl font-bold text-brand-dark mb-6">Nuevo colegio</h1>
      <ColegioForm />
    </div>
  );
}
