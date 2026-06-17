"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { MessageSquare, FileText, AlertTriangle, Megaphone, Heart, ArrowRight, HelpCircle, User, FileDigit, Phone, Mail, Building2, Tag, Users, AlignLeft, Upload, FileCheck, X, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

const defs = [
  { icon: FileText, t: "Petición", d: "Es cualquier solicitud de servicio o de información que desees realizar a nuestra institución.", c: "bg-blue-50 border-blue-100", i: "text-blue-600" },
  { icon: AlertTriangle, t: "Queja", d: "Es la manifestación de descontento, inconformidad, insatisfacción o desagrado que se formula con relación a la forma o condiciones en que se ha prestado nuestro servicio.", c: "bg-amber-50 border-amber-100", i: "text-amber-600" },
  { icon: Megaphone, t: "Reclamo", d: "Se manifiesta como la acción directa del cliente para hacer conocer a la institución su nivel de insatisfacción parcial o total acerca de los servicios que adquirió por medio de ella.", c: "bg-red-50 border-red-100", i: "text-red-600" },
  { icon: MessageSquare, t: "Sugerencia", d: "Es la manifestación de una idea o propuesta para mejorar nuestros procesos, servicios o la experiencia de la comunidad educativa.", c: "bg-emerald-50 border-emerald-100", i: "text-emerald-600" },
  { icon: Heart, t: "Felicitaciones", d: "Son manifestaciones de agrado que realizan los usuarios al recibir un buen servicio o atención por parte de la institución.", c: "bg-rose-50 border-rose-100", i: "text-rose-600" },
];

const insts = ["Centro Administrativo","IEO Llano Verde Sede Principal","IEO Llano Verde Sede Calimio Desepaz","IEO Llano Verde Sede Calimio Norte","IEO Llano Verde Sede San Luis","IEO Llano Verde Sede Invicali","IEO Llano Verde Sede San Felipe","IEO Llano Verde Sede Comuneros II","IEO Llano Verde Sede Aguacatal","IEO Llano Verde Sede Colegio Nariño","IEO Llano Verde Sede Bartolomé Mitre","IEO Llano Verde Sede Colegio la Providencia","Institución Educativa Nelson Garcés Vernaza","Colegio Compartir","Colegio Parroquial San Francisco Javier (Las Orquídeas)","Colegio Parroquial San Joaquín","Colegio Parroquial San Joaquín II - Hormiguero","Centro Docente San Marcos","Colegio Santa Isabel de Hungría Sede Alfonso López","Colegio Santa Luisa De Marillac","Colegio Arquidiocesano Juan Pablo II","Colegio de Nuestra Señora de Chiquinquirá","Colegio Parroquial San Juan Bautista","Colegio Parroquial Santiago Apostol","Colegio Parroquial Nuestra señora de Guadalupe","Colegio Mayor Santiago de Cali (Troncal)","Colegio Parroquial Nuestra señora de los Andes","Instituto comercial Arquidiocesano","Institución Educativa San Francisco Javier (Yumbo)","Colegio Santa Isabel de Hungría Sede Ciudad 2000","Colegio Parroquial San Pedro Claver","Institución Educativa Nuestra señora del Rosario (Jamundí)"];

const tps = ["Peticion","Queja","Reclamo","Sugerencia","Felicitacion"];
const rels = ["Colaborador","Egresado","Estudiante","Padre de familia/Acudiente","Proveedor","Otros"];

export default function PQRSFPage() {
  const [err, setErr] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const [load, setLoad] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const cn = (k?: string) => `w-full px-4 py-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold focus:bg-white outline-none transition-all text-gray-800 ${k ? "border-red-300 bg-red-50" : "border-gray-200"}`;

  const validate = (f: HTMLFormElement) => {
    const d = new FormData(f), e: Record<string, string> = {};
    if (!d.get("SingleLine")) e.SingleLine = "El nombre es obligatorio.";
    if (!d.get("Number")) e.Number = "El documento es obligatorio.";
    if (!d.get("PhoneNumber_countrycode")) e.PhoneNumber_countrycode = "El teléfono es obligatorio.";
    if (!d.get("Email")) e.Email = "El correo es obligatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(d.get("Email")))) e.Email = "Correo inválido.";
    if (!d.get("Dropdown") || d.get("Dropdown") === "-Select-") e.Dropdown = "Selecciona una institución.";
    if (!d.get("Dropdown1") || d.get("Dropdown1") === "-Select-") e.Dropdown1 = "Selecciona un tipo.";
    if (!d.get("Dropdown3") || d.get("Dropdown3") === "-Select-") e.Dropdown3 = "Selecciona tu relación.";
    if (!d.get("MultiLine")) e.MultiLine = "El comentario es obligatorio.";
    return e;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget, v = validate(f);
    if (Object.keys(v).length) { setErr(v); return; }
    const d = new FormData(f);
    if (file) d.append("FileUpload", file);
    setLoad(true);
    try {
      const r = await fetch("/api/pqrsf", { method: "POST", body: d });
      if (r.ok) { setOk(true); setErr({}); setFile(null); f.reset(); }
      else { const b = await r.json().catch(() => ({})); setErr({ general: b.error || "Error al enviar." }); }
    } catch { setErr({ general: "Error de conexión." }); }
    finally { setLoad(false); }
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    if (f && f.size > 10 * 1024 * 1024) { setErr(p => ({ ...p, FileUpload: "Máximo 10 MB." })); setFile(null); }
    else { setFile(f); setErr(p => { const n = { ...p }; delete n.FileUpload; return n; }); }
  };

  if (ok) return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow flex items-center justify-center py-24">
        <div className="text-center max-w-md mx-auto px-4">
          <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-brand-dark mb-4">¡Solicitud recibida!</h2>
          <p className="text-gray-600 mb-8">Gracias por contactarnos. Tu PQRSF ha sido enviada y será gestionada por nuestro equipo.</p>
          <button onClick={() => setOk(false)} className="bg-brand-gold text-brand-dark px-6 py-3 rounded-xl font-bold hover:bg-brand-gold/90 transition-all">Enviar otra</button>
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        <section className="relative overflow-hidden text-white py-24">
          <div className="absolute inset-0 bg-brand-dark" />
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `url('/images/estudiantes-hero-pqrsf.jpg')`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="absolute inset-0 bg-brand-dark/70" />
          <div className="relative max-w-7xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/20 text-brand-gold rounded-full text-sm font-medium mb-6"><HelpCircle className="h-4 w-4" /> Atención a la Comunidad</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Buzón <span className="text-brand-gold">PQRSF</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">¿Tienes algo que compartir con nosotros? ¡Queremos conocer tu opinión! Únete a nuestra comunidad, para nosotros tus comentarios son muy valiosos. ¡Crezcamos juntos!</p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brand-dark mb-4">¿Qué significa cada solicitud?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Conoce la definición de cada tipo para enviar tu solicitud correctamente.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {defs.map((it) => (
                <div key={it.t} className={`rounded-2xl p-6 border ${it.c} hover:shadow-md transition-shadow`}>
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm"><it.icon className={`h-6 w-6 ${it.i}`} /></div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">{it.t}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{it.d}</p>
                </div>
              ))}
              <div className="rounded-2xl p-6 bg-brand-dark text-white flex flex-col justify-center">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/20 flex items-center justify-center mb-4"><ArrowRight className="h-6 w-6 text-brand-gold" /></div>
                <h3 className="text-xl font-bold mb-2">¿Listo?</h3>
                <p className="text-gray-300 text-sm leading-relaxed">Completa el formulario a continuación. Asegúrate de que la información sea correcta y verídica.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50 border-y border-gray-100">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-brand-dark mb-2">Formulario de Contacto PQRSF</h2>
              <p className="text-gray-600 text-sm">Por favor, completa cuidadosamente este formulario.</p>
            </div>
            <form onSubmit={submit} className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm space-y-6">
              {err.general && <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2"><AlertCircle className="h-4 w-4" />{err.general}</div>}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2"><User className="h-4 w-4 inline mr-1" /> Nombre y apellidos <span className="text-red-500">*</span></label>
                <input name="SingleLine" type="text" placeholder="Nombres y Apellidos" className={cn(err.SingleLine)} />
                {err.SingleLine && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.SingleLine}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2"><FileDigit className="h-4 w-4 inline mr-1" /> Número de documento <span className="text-red-500">*</span></label>
                  <input name="Number" type="text" placeholder="Ej: 1234567890" className={cn(err.Number)} />
                  {err.Number && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.Number}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2"><Phone className="h-4 w-4 inline mr-1" /> Teléfono / Celular <span className="text-red-500">*</span></label>
                  <input name="PhoneNumber_countrycode" type="text" placeholder="300 123 4567" className={cn(err.PhoneNumber_countrycode)} />
                  {err.PhoneNumber_countrycode && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.PhoneNumber_countrycode}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2"><Mail className="h-4 w-4 inline mr-1" /> Correo electrónico <span className="text-red-500">*</span></label>
                <input name="Email" type="email" placeholder="correo@ejemplo.com" className={cn(err.Email)} />
                {err.Email && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.Email}</p>}
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2"><Building2 className="h-4 w-4 inline mr-1" /> Institución <span className="text-red-500">*</span></label>
                  <select name="Dropdown" className={cn(err.Dropdown)} defaultValue="-Select-">
                    <option value="-Select-" disabled>- Seleccione -</option>
                    {insts.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                  {err.Dropdown && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.Dropdown}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2"><Tag className="h-4 w-4 inline mr-1" /> Tipo PQRSF <span className="text-red-500">*</span></label>
                  <select name="Dropdown1" className={cn(err.Dropdown1)} defaultValue="-Select-">
                    <option value="-Select-" disabled>Seleccione un tipo</option>
                    {tps.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {err.Dropdown1 && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.Dropdown1}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2"><Users className="h-4 w-4 inline mr-1" /> Relación <span className="text-red-500">*</span></label>
                  <select name="Dropdown3" className={cn(err.Dropdown3)} defaultValue="-Select-">
                    <option value="-Select-" disabled>- Seleccione -</option>
                    {rels.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  {err.Dropdown3 && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.Dropdown3}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2"><AlignLeft className="h-4 w-4 inline mr-1" /> Comentario <span className="text-red-500">*</span></label>
                <textarea name="MultiLine" rows={5} placeholder="Describe tu solicitud..." className={cn(err.MultiLine)} />
                {err.MultiLine && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.MultiLine}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2"><Upload className="h-4 w-4 inline mr-1" /> Adjuntar archivo</label>
                <input type="file" className="hidden" id="pqrsf-file" onChange={onFile} />
                <label htmlFor="pqrsf-file" className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-brand-gold hover:text-brand-dark transition-colors bg-white cursor-pointer">
                  <Upload className="h-6 w-6" />
                  <span className="text-sm font-medium">Haz click para seleccionar archivo</span>
                  <span className="text-xs text-gray-500">Máximo 10 MB</span>
                </label>
                {file && (
                  <div className="mt-3 flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                      <FileCheck className="h-5 w-5 text-brand-gold" />
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <span className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
                    </div>
                    <button type="button" onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500 transition-colors"><X className="h-4 w-4" /></button>
                  </div>
                )}
                {err.FileUpload && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.FileUpload}</p>}
              </div>

              <button type="submit" disabled={load} className="w-full bg-brand-gold text-brand-dark py-4 rounded-xl font-bold text-lg hover:bg-brand-gold/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {load ? <><Loader2 className="h-5 w-5 animate-spin" /> Enviando...</> : "ENVIAR"}
              </button>
            </form>
          </div>
        </section>

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-dark" />
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `url('/images/estudiantes-cta-pqrsf.jpg')`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="absolute inset-0 bg-brand-dark/70" />
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Tu opinión <span className="text-brand-gold">nos importa</span></h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Cada comentario nos ayuda a mejorar y fortalecer nuestra comunidad educativa.</p>
            <a href="/colegios" className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-10 py-5 rounded-xl font-bold text-lg hover:bg-brand-gold/90 transition-all hover:scale-105">
              Conoce nuestras instituciones <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
