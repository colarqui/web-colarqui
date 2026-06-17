import DocumentosManager from "./DocumentosManager";

export default function AdminDocumentosPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-dark mb-1">Documentos PDF</h1>
        <p className="text-gray-600">
          Sube PDFs que se usarán como base de conocimiento para el chat con IA.
        </p>
      </div>
      <DocumentosManager />
    </div>
  );
}
