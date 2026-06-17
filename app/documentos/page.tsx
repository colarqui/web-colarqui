import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DocumentosChat from "./DocumentosChat";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DocumentosPublicPage() {
  const documentos = await prisma.documento.findMany({
    where: { activo: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      titulo: true,
      descripcion: true,
      categoria: true,
      paginas: true,
      tamano: true,
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <section className="bg-brand-dark text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Asistente <span className="text-brand-gold">Documental</span>
            </h1>
            <p className="text-gray-300 max-w-2xl">
              Selecciona uno o más documentos oficiales y hazle preguntas al asistente IA.
              Las respuestas se generan únicamente con base en el contenido de los PDFs seleccionados.
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DocumentosChat documentos={documentos} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
