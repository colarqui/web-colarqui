"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import { useState, useRef } from "react";
import {
  Shield, Users, AlertTriangle, ChevronDown, ArrowRight,
  Upload, FileCheck, X, AlertCircle, CheckCircle, Loader2,
  User, Mail, Phone, Building2, AlignLeft, Download,
  Scale, Gavel, BookOpen, ExternalLink, Lock, Search, FileText,
} from "lucide-react";

// ─── Foundation data ──────────────────────────────────────────────────────────

type Miembro = { nombre: string; cargo: string; colegio: string };

const FUNDACIONES = {
  FESIH: {
    nombre: "Fundación Educativa Santa Isabel de Hungría",
    sigla: "FESIH",
    email: "ccl.sih@arquidiocesanos.edu.co",
    formularioPDF: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2023/11/F4-DECLARACION-DE-HECHOS-FSIH.pdf",
    politicaDatos: "https://drive.google.com/file/d/1RqcqxBQccg6PzuLc-z_k-sQMDOjRxgXf/view?usp=drive_link",
    avisoPriva: "https://drive.google.com/file/d/1DebINjEOiEq3hzwTEassHPUoz2qKNECd/view?usp=drive_link",
    miembros: [
      { nombre: "Sandra Milena Morales",        cargo: "Presidenta",  colegio: "Centro Administrativo" },
      { nombre: "Leslie Pajoy",                  cargo: "Principal",   colegio: "Colegio Parroquial San Joaquín I y II" },
      { nombre: "Yonoris Enith Valencia",        cargo: "Principal",   colegio: "Colegio Compartir" },
      { nombre: "Héctor Antonio Palacio Córdoba",cargo: "Secretario",  colegio: "Centro Administrativo" },
      { nombre: "Amparo Rosales Alvarez",        cargo: "Suplente",    colegio: "I.E.O. Llano Verde Sede San Felipe" },
      { nombre: "Maria del Pilar Ramirez",       cargo: "Suplente",    colegio: "Colegio S.I.H. Sede Alfonso López" },
      { nombre: "Angie Melissa Erazo Palomares", cargo: "Suplente",    colegio: "I.E.O. Llano Verde Sede Calimio Desepaz" },
      { nombre: "Kelyn Julieth Monsalve Gómez",  cargo: "Suplente",    colegio: "I.E.O. Llano Verde Sede Comuneros II" },
      { nombre: "Adriana Narvaez Aguilar",       cargo: "Suplente",    colegio: "I.E.O. Llano Verde Sede San Luis" },
      { nombre: "Yeraldine Viveros Ortiz",       cargo: "Suplente",    colegio: "I.E.O. Llano Verde Sede Bartolomé Mitre" },
      { nombre: "Nikol Vanessa Sánchez Moreno",  cargo: "Suplente",    colegio: "Centro Docente Parroquial San Marcos" },
      { nombre: "Sebastián Camilo García Acosta",cargo: "Suplente",    colegio: "I.E.O. Llano Verde Sede Calimio Norte" },
      { nombre: "Claudia Patricia Parra Grajales",cargo:"Suplente",    colegio: "I.E. Nelson Garcés Vernaza" },
      { nombre: "Dahiana Quintero",              cargo: "Suplente",    colegio: "I.E.O. Llano Verde Principal" },
      { nombre: "Fasdy Lorena Chamorro Cardenas",cargo: "Suplente",    colegio: "Colegio Parroquial San Francisco Javier" },
      { nombre: "Ximena Garcia Paez",            cargo: "Suplente",    colegio: "I.E.O. Llano Verde Sede Aguacatal / Colegio Juan Pablo II" },
      { nombre: "Lina Maria Cuero Villada",      cargo: "Suplente",    colegio: "Colegio Nuestra Señora de Chiquinquirá" },
      { nombre: "Lixan Daney Aroca Martinez",    cargo: "Suplente",    colegio: "I.E.O. Llano Verde Sede Nariño" },
      { nombre: "María Angélica Arias Montoya",  cargo: "Suplente",    colegio: "I.E.O. Llano Verde Sede Invicali Desepaz" },
    ] as Miembro[],
    colegios: [
      "Centro Administrativo",
      "Colegio Parroquial San Joaquín I y II",
      "Colegio Compartir",
      "Colegio Parroquial San Francisco Javier (Las Orquídeas)",
      "Colegio Parroquial San Joaquín",
      "Colegio Parroquial San Joaquín II - Hormiguero",
      "Centro Docente San Marcos",
      "Colegio Santa Isabel de Hungría Sede Alfonso López",
      "Colegio Santa Luisa De Marillac",
      "Colegio Arquidiocesano Juan Pablo II",
      "Colegio de Nuestra Señora de Chiquinquirá",
      "I.E.O. Llano Verde Sede San Felipe",
      "I.E.O. Llano Verde Sede Calimio Desepaz",
      "I.E.O. Llano Verde Sede Comuneros II",
      "I.E.O. Llano Verde Sede San Luis",
      "I.E.O. Llano Verde Sede Bartolomé Mitre",
      "Centro Docente Parroquial San Marcos",
      "I.E.O. Llano Verde Sede Calimio Norte",
      "I.E. Nelson Garcés Vernaza",
      "I.E.O. Llano Verde Principal",
      "Colegio Parroquial San Francisco Javier",
      "I.E.O. Llano Verde Sede Aguacatal / Colegio Juan Pablo II",
      "I.E.O. Llano Verde Sede Nariño",
      "I.E.O. Llano Verde Sede Invicali Desepaz",
    ],
  },
  FAUU: {
    nombre: "Fundación Educativa Alberto Uribe Urdaneta",
    sigla: "FAUU",
    email: "ccl.auu@arquidiocesanos.edu.co",
    formularioPDF: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2023/11/DECLARACION-DE-HECHOS-AUU.pdf",
    politicaDatos: "https://drive.google.com/file/d/1UMt-CVyG2dOEBWcdynENYKVkTd6NIwcB/view?usp=drive_link",
    avisoPriva: "https://drive.google.com/file/d/1WFeBMHIF8jmb0tU6JHkzKP1SouMzMALu/view?usp=drive_link",
    miembros: [
      { nombre: "Eliana Maria Estupiñan",        cargo: "Presidenta",          colegio: "Colegio Parroquial San Pedro Claver" },
      { nombre: "Karen Dayan Navia",             cargo: "Presidenta Suplente", colegio: "Centro Administrativo" },
      { nombre: "Jesus Antonio Vargas Infante",  cargo: "Principal",           colegio: "Colegio Mayor Santiago de Cali" },
      { nombre: "Anyela Quintero Yepes",         cargo: "Principal",           colegio: "I.E. Nuestra Señora del Rosario" },
      { nombre: "Maristella Lemus Aguilar",      cargo: "Secretaria",          colegio: "Instituto Comercial Arquidiocesano" },
      { nombre: "Luisa Camila Landazuri",        cargo: "Suplente",            colegio: "Colegio Parroquial Santiago Apóstol" },
      { nombre: "Diana Ivont Portocarrero",      cargo: "Suplente",            colegio: "Centro Administrativo" },
      { nombre: "Ibeth Tatiana Zambrano",        cargo: "Suplente",            colegio: "Colegio Parroquial San Juan Bautista" },
      { nombre: "Adriana Lizeth Ramos Libreros", cargo: "Suplente",            colegio: "Colegio S.I.H. Sede Ciudad 2000" },
      { nombre: "Karoll Andrea Castañeda Nivia", cargo: "Suplente",            colegio: "Colegio P. Ntra. Sra. de Guadalupe / Ntra. Sra. de los Andes" },
      { nombre: "Eliana Sarria Arbelaez",        cargo: "Suplente",            colegio: "I.E. San Francisco Javier (Yumbo)" },
    ] as Miembro[],
    colegios: [
      "Centro Administrativo",
      "Colegio Parroquial San Pedro Claver",
      "Colegio Parroquial Santiago Apóstol",
      "Colegio Parroquial San Juan Bautista",
      "Colegio Parroquial Nuestra Señora de los Andes",
      "Colegio Parroquial Nuestra Señora de Guadalupe",
      "Institución Educativa San Francisco Javier (Yumbo)",
      "Institución Educativa Nuestra Señora del Rosario (Jamundí)",
      "Colegio Santa Isabel de Hungría Sede Ciudad 2000",
      "Colegio Mayor Santiago de Cali (Troncal)",
      "Instituto Comercial Arquidiocesano",
    ],
  },
};

// ─── CCL Functions ────────────────────────────────────────────────────────────

const FUNCIONES = [
  "Recibir y dar trámite a las quejas presentadas en las que se describan situaciones que puedan constituir acoso laboral, así como las pruebas que las soportan.",
  "Examinar de manera confidencial los casos específicos o puntuales en los que se formule queja o reclamo que pudieran tipificar conductas o circunstancias de acoso laboral.",
  "Escuchar a las partes involucradas de manera individual sobre los hechos que dieron lugar a la queja.",
  "Adelantar reuniones con el fin de crear un espacio de diálogo entre las partes involucradas, promoviendo compromisos mutuos para llegar a una solución efectiva.",
  "Formular un plan de mejora concertado entre las partes, garantizando en todos los casos el principio de la confidencialidad.",
  "Hacer seguimiento a los compromisos adquiridos por las partes involucradas en la queja, verificando su cumplimiento.",
  "En casos en que no se llegue a un acuerdo o la conducta persista, remitir la queja a la Procuraduría General de la Nación (sector público) o informar a la alta dirección (sector privado).",
  "Presentar a la alta dirección las recomendaciones para el desarrollo efectivo de las medidas preventivas y correctivas del acoso laboral.",
  "Hacer seguimiento al cumplimiento de las recomendaciones dadas por el Comité a las dependencias de gestión del recurso humano y salud ocupacional.",
  "Elaborar informes trimestrales sobre la gestión del Comité que incluyan estadísticas de las quejas, seguimiento de los casos y recomendaciones.",
];

// ─── Acoso laboral types ──────────────────────────────────────────────────────

const TIPOS_ACOSO = [
  { tipo: "Maltrato Laboral", desc: "Acto de violencia contra la integridad física o moral, la libertad física o sexual y los bienes de quien se desempeñe como empleado o trabajador; expresiones injuriosas tendientes a menoscabar la autoestima de la víctima." },
  { tipo: "Persecución Laboral", desc: "Conducta reiterada o arbitraria de descalificación, exceso de trabajo y cambios permanentes de horario cuyo propósito es desmotivar o inducir a la renuncia del trabajador." },
  { tipo: "Discriminación Laboral", desc: "Todo trato diferenciado por razones de raza, género, origen familiar, credo religioso, preferencia política o situación de discapacidad." },
  { tipo: "Inequidad Laboral", desc: "Asignación de funciones a menosprecio del trabajador, sin correspondencia con su cargo o formación." },
  { tipo: "Entorpecimiento Laboral", desc: "Obstaculizar el cumplimiento de una labor o retardarla con perjuicio para el trabajador: privación o destrucción de información, ocultamiento de correspondencia o insumos." },
  { tipo: "Desprotección Laboral", desc: "Asignación de funciones sin el cumplimiento de los requisitos mínimos de protección y seguridad para el trabajador." },
];

const SI_ES_ACOSO = [
  "Agresión física.",
  "Expresiones hostiles, injuriosas o ultrajantes.",
  "Injustificadas amenazas de despido.",
  "Descalificación humillante en presencia de compañeros de trabajo.",
  "Burlas sobre la apariencia física y la forma de vestir formuladas en público.",
  "Asignación o imposición de deberes ajenos a la obligación laboral.",
  "Horarios excesivos de trabajo sin fundamento.",
  "Trato discriminatorio respecto a los demás trabajadores.",
  "Negativa a suministrar materiales e información indispensable para la labor.",
  "Negativa injustificada a otorgar permisos, licencias y vacaciones.",
  "Envío de mensajes anónimos, llamadas con contenido injurioso, ofensivo o intimidatorio.",
];

const NO_ES_ACOSO = [
  "Actos destinados a ejercer potestad disciplinaria.",
  "Exigencias razonables de fidelidad laboral o lealtad empresarial.",
  "Memorandos solicitando exigencias técnicas o eficiencia laboral, conforme a indicadores objetivos.",
  "Solicitud de deberes extras de colaboración para la continuidad del servicio.",
  "Actuaciones administrativas para terminar el contrato de trabajo por justa causa (C.S.T.).",
  "Exigir cumplimiento de deberes y obligaciones del C.S.T. Arts. 55 al 57, 59 y 60.",
  "Exigir cumplimiento de estipulaciones contenidas en los reglamentos y cláusulas de los contratos de trabajo.",
];

// ─── Cargo badge ──────────────────────────────────────────────────────────────

function cargoBadge(cargo: string) {
  if (cargo === "Presidenta" || cargo === "Presidente")
    return "bg-brand-gold text-brand-dark";
  if (cargo === "Presidenta Suplente" || cargo === "Presidente Suplente")
    return "bg-amber-100 text-amber-800";
  if (cargo === "Principal")
    return "bg-blue-100 text-blue-800";
  if (cargo === "Secretaria" || cargo === "Secretario")
    return "bg-emerald-100 text-emerald-800";
  return "bg-gray-100 text-gray-600";
}

// ─── Input class ──────────────────────────────────────────────────────────────

const fc = (err?: string) =>
  `w-full px-4 py-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold focus:bg-white outline-none transition-all text-gray-800 ${err ? "border-red-300 bg-red-50" : "border-gray-200"}`;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ComiteConvivenciaPage() {
  const [tab, setTab] = useState<"FESIH" | "FAUU">("FESIH");
  const [fundForm, setFundForm] = useState<"" | "FESIH" | "FAUU">("");
  const [files, setFiles] = useState<File[]>([]);
  const [err, setErr] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const [load, setLoad] = useState(false);
  const finput = useRef<HTMLInputElement>(null);
  const MAX_FILES = 8;
  const MAX_MB = 20;

  const fundData = fundForm ? FUNDACIONES[fundForm] : null;

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const combined = [...files, ...selected].slice(0, MAX_FILES);
    setFiles(combined.filter((f) => f.size <= MAX_MB * 1024 * 1024));
    if (finput.current) finput.current.value = "";
  };

  const rm = (i: number) => setFiles((p) => p.filter((_, idx) => idx !== i));

  const colegiosOpts: string[] = fundForm
    ? [...FUNDACIONES[fundForm].colegios]
    : Array.from(new Set([
        ...FUNDACIONES.FESIH.colegios,
        ...FUNDACIONES.FAUU.colegios,
      ])).sort();

  const validate = (f: HTMLFormElement) => {
    const d = new FormData(f);
    const e: Record<string, string> = {};
    if (!d.get("fundacion") || d.get("fundacion") === "") e.fundacion = "Selecciona la fundación.";
    if (!d.get("nombre")) e.nombre = "El nombre es obligatorio.";
    if (!d.get("email")) e.email = "El correo es obligatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(d.get("email")))) e.email = "Correo inválido.";
    if (!d.get("telefono")) e.telefono = "El teléfono es obligatorio.";
    if (!d.get("colegio") || d.get("colegio") === "") e.colegio = "Selecciona el colegio.";
    if (!d.get("descripcion")) e.descripcion = "La descripción es obligatoria.";
    return e;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const v = validate(f);
    if (Object.keys(v).length) { setErr(v); return; }
    const d = new FormData(f);
    files.forEach((file) => d.append("files", file));
    setLoad(true);
    try {
      const r = await fetch("/api/comite-convivencia", { method: "POST", body: d });
      const json = await r.json();
      if (json.success) { setOk(true); f.reset(); setFiles([]); setErr({}); setFundForm(""); }
      else setErr({ submit: json.error || "Error al enviar. Inténtalo de nuevo." });
    } catch {
      setErr({ submit: "Error de red. Verifica tu conexión e inténtalo de nuevo." });
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <PageHero
          eyebrow="Resolución 0652 de 2012"
          imagen="/images/hero-comite.jpg"
          subtitulo="Órgano de control que canaliza con objetividad y transparencia las quejas relacionadas con conductas de acoso laboral en nuestras fundaciones educativas."
          acciones={
            <>
              <a href="#formulario-queja" className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-[#ffc94d] text-brand-dark px-7 py-4 rounded-full font-semibold transition-all active:scale-[0.98]">
                <AlertTriangle className="h-5 w-5" />
                Presentar una queja
              </a>
              <a href="#miembros" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-4 rounded-full font-semibold transition-all active:scale-[0.98]">
                <Users className="h-5 w-5" />
                Ver miembros del comité
              </a>
            </>
          }
        >
          Comité de <span className="italic text-brand-gold">convivencia laboral</span>
        </PageHero>

        {/* ── ¿Qué es el CCL? ───────────────────────────────────────────────── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium mb-4">
                  <Scale className="h-4 w-4" /> Marco Legal
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                  ¿Qué es el <span className="text-brand-gold">CCL</span>?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Es un órgano de control que todo empleador está obligado a crear al interior de cada organización empresarial, según la <strong>Resolución 0652 de 2012</strong> del Ministerio del Trabajo.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Su propósito es canalizar con objetividad y transparencia todo tipo de quejas que tienen como origen una <strong>conducta de acoso laboral</strong>, garantizando la confidencialidad y el debido proceso.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "Confidencialidad", desc: "Todos los casos se tratan con absoluta reserva" },
                  { icon: Scale, label: "Objetividad", desc: "Análisis imparcial de cada situación presentada" },
                  { icon: Users, label: "Diálogo", desc: "Espacios de mediación entre las partes" },
                  { icon: Gavel, label: "Due Process", desc: "Garantía del principio del debido proceso" },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center mb-3">
                      <item.icon className="h-5 w-5 text-brand-dark" />
                    </div>
                    <p className="font-bold text-brand-dark text-sm mb-1">{item.label}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Funciones ─────────────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Funciones del <span className="text-brand-gold">Comité</span>
              </h2>
              <p className="text-gray-600">Artículo 6°, Resolución 0652 de 2012</p>
            </div>

            <details className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
              <summary className="flex items-center gap-4 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <div className="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-brand-dark" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold text-brand-dark">Ver las 10 funciones del CCL</div>
                  <div className="text-sm text-gray-500">Según Art. 6° — Res. 0652/2012</div>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" />
              </summary>
              <div className="px-6 pb-6">
                <ol className="space-y-3">
                  {FUNCIONES.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 text-sm leading-relaxed">
                      <span className="bg-brand-gold text-brand-dark text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                      {f}
                    </li>
                  ))}
                </ol>
              </div>
            </details>
          </div>
        </section>

        {/* ── Acoso Laboral ─────────────────────────────────────────────────── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                ¿Qué es el <span className="text-brand-gold">Acoso Laboral</span>?
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Es toda conducta persistente y demostrable ejercida sobre un trabajador, encaminada a infundir miedo, intimidación, terror y angustia, causar perjuicio laboral o inducir la renuncia.{" "}
                <span className="text-brand-dark font-semibold">Ley 1010/06 – Art. 2.</span>
              </p>
            </div>

            {/* Tipos */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {TIPOS_ACOSO.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                    <h3 className="font-bold text-brand-dark text-sm">{t.tipo}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>

            {/* Sí es / No es */}
            <div className="grid md:grid-cols-2 gap-6">
              <details className="group bg-white rounded-2xl border border-red-100 overflow-hidden">
                <summary className="flex items-center gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-red-700">Sí constituye acoso laboral</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-5 pb-5">
                  <ul className="space-y-2">
                    {SI_ES_ACOSO.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>

              <details className="group bg-white rounded-2xl border border-emerald-100 overflow-hidden">
                <summary className="flex items-center gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-emerald-700">No constituye acoso laboral</div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-5 pb-5">
                  <ul className="space-y-2">
                    {NO_ES_ACOSO.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* ── Miembros ──────────────────────────────────────────────────────── */}
        <section id="miembros" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Miembros del <span className="text-brand-gold">Comité</span>
              </h2>
              <p className="text-gray-600">Selecciona la fundación para ver sus integrantes</p>
            </div>

            {/* Tab selector */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex bg-gray-100 rounded-2xl p-1.5 gap-1">
                {(["FESIH", "FAUU"] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${tab === key ? "bg-brand-dark text-white shadow-sm" : "text-gray-600 hover:text-brand-dark"}`}
                  >
                    <span className="hidden sm:inline">{FUNDACIONES[key].nombre}</span>
                    <span className="sm:hidden">{key}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Members grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FUNDACIONES[tab].miembros.map((m, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-brand-gold/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="h-4 w-4 text-brand-dark" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-brand-dark text-sm leading-tight mb-1">{m.nombre}</p>
                      <span className={`inline-block text-sm font-bold px-2 py-0.5 rounded-md mb-2 ${cargoBadge(m.cargo)}`}>{m.cargo}</span>
                      <p className="text-sm text-gray-500 leading-snug">{m.colegio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Email contact */}
            <div className="mt-8 bg-gray-50 rounded-2xl border border-gray-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-brand-dark mb-1">{FUNDACIONES[tab].nombre}</p>
                <p className="text-sm text-gray-600">Correo del Comité: <a href={`mailto:${FUNDACIONES[tab].email}`} className="text-brand-dark font-semibold hover:underline">{FUNDACIONES[tab].email}</a></p>
              </div>
              <a
                href={FUNDACIONES[tab].formularioPDF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-dark px-5 py-3 rounded-xl font-semibold text-sm hover:bg-brand-gold/90 transition-all flex-shrink-0"
              >
                <Download className="h-4 w-4" />
                Descargar Formulario PDF
              </a>
            </div>
          </div>
        </section>

        {/* ── Cómo presentar tu queja ───────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                ¿Cómo presentar tu <span className="text-brand-gold">queja</span>?
              </h2>
              <p className="text-gray-600 text-lg">Sigue estos pasos para reportar un caso de acoso laboral</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Paso 1 */}
              <div className="relative bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center">
                {(
                  <div className="hidden lg:block absolute top-1/2 -right-2 z-10">
                    <ArrowRight className="h-5 w-5 text-brand-gold" />
                  </div>
                )}
                <div className="w-12 h-12 bg-brand-gold rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-brand-dark" />
                </div>
                <span className="text-brand-gold text-sm font-bold tracking-widest">PASO 1</span>
                <h3 className="text-lg font-bold text-brand-dark mt-1 mb-2">Identifica</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Revisa si lo que percibes encaja en alguna de las conductas de acoso laboral descritas arriba.</p>
              </div>

              {/* Paso 2 */}
              <div className="relative bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center">
                {(
                  <div className="hidden lg:block absolute top-1/2 -right-2 z-10">
                    <ArrowRight className="h-5 w-5 text-brand-gold" />
                  </div>
                )}
                <div className="w-12 h-12 bg-brand-gold rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Download className="h-6 w-6 text-brand-dark" />
                </div>
                <span className="text-brand-gold text-sm font-bold tracking-widest">PASO 2</span>
                <h3 className="text-lg font-bold text-brand-dark mt-1 mb-2">Descarga</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">Baja el formato oficial de declaración de hechos según tu fundación.</p>
                <div className="flex flex-col gap-2">
                  <a href={FUNDACIONES.FESIH.formularioPDF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 bg-brand-dark text-white text-sm font-semibold px-3 py-2 rounded-lg hover:bg-brand-dark/90 transition-all">
                    <Download className="h-3.5 w-3.5" /> FESIH
                  </a>
                  <a href={FUNDACIONES.FAUU.formularioPDF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 bg-brand-dark text-white text-sm font-semibold px-3 py-2 rounded-lg hover:bg-brand-dark/90 transition-all">
                    <Download className="h-3.5 w-3.5" /> FAUU
                  </a>
                </div>
              </div>

              {/* Paso 3 */}
              <div className="relative bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center">
                {(
                  <div className="hidden lg:block absolute top-1/2 -right-2 z-10">
                    <ArrowRight className="h-5 w-5 text-brand-gold" />
                  </div>
                )}
                <div className="w-12 h-12 bg-brand-gold rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-brand-dark" />
                </div>
                <span className="text-brand-gold text-sm font-bold tracking-widest">PASO 3</span>
                <h3 className="text-lg font-bold text-brand-dark mt-1 mb-2">Diligencia</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Llena el formato con los hechos, fechas, personas involucradas y pruebas que tengas.</p>
              </div>

              {/* Paso 4 */}
              <div className="relative bg-gray-50 rounded-2xl border border-gray-100 p-6 text-center">
                <div className="w-12 h-12 bg-brand-gold rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-6 w-6 text-brand-dark" />
                </div>
                <span className="text-brand-gold text-sm font-bold tracking-widest">PASO 4</span>
                <h3 className="text-lg font-bold text-brand-dark mt-1 mb-2">Adjunta y envía</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Carga el formato diligenciado junto con otras evidencias en el formulario web.</p>
                <a href="#formulario-queja" className="inline-flex items-center gap-1 text-brand-dark font-semibold text-sm mt-3 hover:underline">
                  Ir al formulario <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Formulario ────────────────────────────────────────────────────── */}
        <section id="formulario-queja" className="py-20 bg-gray-50 scroll-mt-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-6">
                <Lock className="h-4 w-4 text-blue-500" />
                <span className="text-blue-700 text-sm font-medium">Canal confidencial y seguro</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">¿Tienes alguna queja?</h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Diligencia el formulario a continuación para expresar tu inconformidad. Tu información será tratada de forma confidencial conforme a la <strong>Ley 1010 de 2006</strong>.
              </p>
            </div>

            {ok && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center mb-8">
                <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-emerald-800 mb-2">Queja recibida</h3>
                <p className="text-emerald-700">Tu reporte fue enviado al Comité de Convivencia correspondiente. Lo analizarán en un plazo máximo de 10 días hábiles.</p>
              </div>
            )}

            {err.submit && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3 mb-6">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{err.submit}</p>
              </div>
            )}

            <form onSubmit={submit} noValidate className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">

              {/* Fundación selector — first so email routing is visible */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Building2 className="h-4 w-4 inline mr-1" /> Fundación <span className="text-red-500">*</span>
                </label>
                <select
                  name="fundacion"
                  value={fundForm}
                  onChange={(e) => setFundForm(e.target.value as "" | "FESIH" | "FAUU")}
                  className={fc(err.fundacion)}
                >
                  <option value="" disabled>— Seleccione la fundación —</option>
                  <option value="FESIH">Fundación Educativa Santa Isabel de Hungría (FESIH)</option>
                  <option value="FAUU">Fundación Educativa Alberto Uribe Urdaneta (FAUU)</option>
                </select>
                {err.fundacion && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.fundacion}</p>}
              </div>

              {/* Nombre + Teléfono */}
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" /> Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <input name="nombre" type="text" placeholder="Tu nombre completo" className={fc(err.nombre)} />
                  {err.nombre && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.nombre}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" /> Número de contacto <span className="text-red-500">*</span>
                  </label>
                  <input name="telefono" type="tel" placeholder="300 123 4567" className={fc(err.telefono)} />
                  {err.telefono && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.telefono}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-1" /> Correo electrónico <span className="text-red-500">*</span>
                </label>
                <input name="email" type="email" placeholder="correo@ejemplo.com" className={fc(err.email)} />
                {err.email && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.email}</p>}
              </div>

              {/* Colegio */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Building2 className="h-4 w-4 inline mr-1" /> Colegio al que pertenece <span className="text-red-500">*</span>
                </label>
                <select name="colegio" defaultValue="" className={fc(err.colegio)}>
                  <option value="" disabled>— Seleccione —</option>
                  {colegiosOpts.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {err.colegio && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.colegio}</p>}
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <AlignLeft className="h-4 w-4 inline mr-1" /> Descripción de los hechos <span className="text-red-500">*</span>
                </label>
                <textarea name="descripcion" rows={5} placeholder="Describe de manera detallada los hechos, fechas y personas involucradas..." className={fc(err.descripcion)} />
                {err.descripcion && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.descripcion}</p>}
              </div>

              {/* Adjuntos */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Upload className="h-4 w-4 inline mr-1" /> Adjuntar documentos de soporte
                </label>
                {fundData && (
                  <a href={fundData.formularioPDF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline mb-3">
                    <Download className="h-3.5 w-3.5" /> Descargar formulario de declaración de hechos
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                )}
                <input ref={finput} type="file" multiple onChange={onFiles} className="hidden" />
                <button type="button" onClick={() => finput.current?.click()} disabled={files.length >= MAX_FILES}
                  className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-brand-gold hover:text-brand-dark transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed">
                  <Upload className="h-6 w-6" />
                  <span className="text-sm font-medium">Haz clic para seleccionar archivos</span>
                  <span className="text-sm text-gray-500">Máximo {MAX_FILES} archivos · {MAX_MB} MB máx. por archivo</span>
                </button>
                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileCheck className="h-5 w-5 text-brand-gold flex-shrink-0" />
                          <span className="text-sm text-gray-700 truncate">{f.name}</span>
                          <span className="text-sm text-gray-500 flex-shrink-0">{(f.size / (1024 * 1024)).toFixed(1)} MB</span>
                        </div>
                        <button type="button" onClick={() => rm(i)} className="text-gray-500 hover:text-red-500 transition-colors"><X className="h-4 w-4" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Políticas */}
              {fundData && (
                <div className="bg-gray-50 rounded-xl p-4 flex flex-col sm:flex-row gap-3">
                  <a href={fundData.politicaDatos} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-brand-dark hover:underline">
                    <ExternalLink className="h-3.5 w-3.5" /> Política de Tratamiento de Datos
                  </a>
                  <a href={fundData.avisoPriva} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-brand-dark hover:underline">
                    <ExternalLink className="h-3.5 w-3.5" /> Aviso de Privacidad
                  </a>
                </div>
              )}

              <button type="submit" disabled={load}
                className="w-full bg-brand-gold hover:bg-brand-gold/90 text-brand-dark py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {load ? <><Loader2 className="h-5 w-5 animate-spin" /> Enviando...</> : <><ArrowRight className="h-5 w-5" /> ENVIAR QUEJA</>}
              </button>

              <p className="text-sm text-gray-500 text-center leading-relaxed">
                Al enviar este formulario, aceptas que tu información será tratada confidencialmente conforme a la Política de Privacidad de las Fundaciones Educativas Arquidiocesanas y la Ley 1581 de 2012.
              </p>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
