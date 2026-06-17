import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NoticiaForm from "../NoticiaForm";

export default function NuevaNoticia() {
  return (
    <div>
      <Link href="/admin/noticias" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-dark mb-4">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>
      <h1 className="text-3xl font-bold text-brand-dark mb-6">Nueva noticia</h1>
      <NoticiaForm />
    </div>
  );
}
