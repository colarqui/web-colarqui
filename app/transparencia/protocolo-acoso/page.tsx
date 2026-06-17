"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";
import {
  AlertTriangle, Shield, Scale, Heart, BookOpen,
  ChevronDown, ArrowRight, Upload, FileCheck, X,
  AlertCircle, CheckCircle, Loader2, User, Mail,
  Phone, Building2, Eye, Clipboard, MessageSquare,
  ExternalLink, Search, Lock,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const FUNDACIONES = [
  "Fundación Educativa Alberto Uribe Urdaneta",
  "Fundación Educativa Santa Isabel de Hungría",
];

const COLEGIOS = [
  "Centro Administrativo",
  "IEO Llano Verde Sede Principal",
  "IEO Llano Verde Sede Calimio Desepaz",
  "IEO Llano Verde Sede Calimio Norte",
  "IEO Llano Verde Sede San Luis",
  "IEO Llano Verde Sede Invicali",
  "IEO Llano Verde Sede San Felipe",
  "IEO Llano Verde Sede Comuneros II",
  "IEO Llano Verde Sede Aguacatal",
  "IEO Llano Verde Sede Colegio Nariño",
  "IEO Llano Verde Sede Bartolomé Mitre",
  "IEO Llano Verde Sede Colegio la Providencia",
  "Institución Educativa Nelson Garcés Vernaza",
  "Colegio Compartir",
  "Colegio Parroquial San Francisco Javier (Las Orquídeas)",
  "Colegio Parroquial San Joaquín",
  "Colegio Parroquial San Joaquín II - Hormiguero",
  "Centro Docente San Marcos",
  "Colegio Santa Isabel de Hungría Sede Alfonso López",
  "Colegio Santa Luisa De Marillac",
  "Colegio Arquidiocesano Juan Pablo II",
  "Colegio de Nuestra Señora de Chiquinquirá",
  "Colegio Parroquial San Juan Bautista",
  "Colegio Parroquial Santiago Apóstol",
  "Colegio Parroquial Nuestra Señora de Guadalupe",
  "Colegio Mayor Santiago de Cali (Troncal)",
  "Colegio Parroquial Nuestra Señora de los Andes",
  "Instituto Comercial Arquidiocesano",
  "Institución Educativa San Francisco Javier (Yumbo)",
  "Colegio Santa Isabel de Hungría Sede Ciudad 2000",
  "Colegio Parroquial San Pedro Claver",
  "Institución Educativa Nuestra Señora del Rosario (Jamundí)",
];

const CONDUCTAS = [
  {
    titulo: "Conductas verbales",
    subtitulo: "Palabras, comentarios o propuestas inapropiadas",
    icono: MessageSquare,
    items: [
      "Comentarios sexuales sobre el cuerpo, ropa o apariencia.",
      "Propuestas sexuales directas o insinuaciones constantes.",
      "Chistes sexuales o denigrantes en el lugar de trabajo.",
      "Preguntas indiscretas sobre la vida íntima o sexual.",
      "Peticiones reiteradas de citas o encuentros privados.",
    ],
  },
  {
    titulo: "Conductas no verbales y físicas",
    subtitulo: "Gestos, miradas o contacto físico no consentido",
    icono: Eye,
    items: [
      "Gestos o miradas intimidantes con connotación sexual.",
      "Tomar fotos o videos del cuerpo sin permiso.",
      "Acercamiento físico no deseado o contacto físico inapropiado.",
      "Exponer material pornográfico en el entorno de trabajo.",
      "Mostrar imágenes o videos con contenido sexual en la oficina.",
    ],
  },
  {
    titulo: "Conductas digitales",
    subtitulo: "Mensajes, imágenes o contenido enviado por medios electrónicos",
    icono: Search,
    items: [
      "Enviar mensajes de texto, correos o imágenes de contenido sexual.",
      "Enviar emojis sugestivos o insinuantes de manera repetida.",
      "Compartir o publicar fotos íntimas sin consentimiento.",
      "Acosar por redes sociales o plataformas de mensajería.",
    ],
  },
];

const DERECHOS = [
  {
    num: "01",
    titulo: "Derecho a un ambiente laboral seguro",
    marco: "Const. art. 25",
    desc: "Puedes trabajar libre de intimidación, acoso o violencia de cualquier tipo.",
    color: "bg-blue-50 border-blue-100",
    badge: "bg-blue-600",
  },
  {
    num: "02",
    titulo: "Protección contra represalias",
    marco: "Ley 1010/06 art. 12 · Ley 2365/2024",
    desc: "Nadie puede sancionarte por denunciar o rechazar conductas indebidas.",
    color: "bg-amber-50 border-amber-100",
    badge: "bg-amber-600",
  },
  {
    num: "03",
    titulo: "Resolución 3461 del 01/09/2025",
    marco: "Ministerio del Trabajo",
    desc: "Amplía la protección del Comité de Convivencia para contratistas, independientes y aprendices.",
    color: "bg-emerald-50 border-emerald-100",
    badge: "bg-emerald-600",
  },
  {
    num: "04",
    titulo: "Derecho a recibir orientación",
    marco: "Ley 1010 de 2006 · Ley 2365/24",
    desc: "Atención, apoyo psicológico y asesoría garantizados para víctimas de acoso sexual.",
    color: "bg-rose-50 border-rose-100",
    badge: "bg-rose-600",
  },
];

const RUTA = [
  {
    num: "01",
    titulo: "Reconocer",
    desc: "Identifica y acepta que estás viviendo una conducta de acoso sexual.",
    icono: Eye,
  },
  {
    num: "02",
    titulo: "Recopilar",
    desc: "Recopila todas las pruebas que puedas: pantallazos, mensajes, testigos.",
    icono: Clipboard,
  },
  {
    num: "03",
    titulo: "Denunciar",
    desc: "Escribe tu denuncia en el formulario dispuesto en este portal web.",
    icono: MessageSquare,
  },
  {
    num: "04",
    titulo: "Comité",
    desc: "El Comité de Convivencia analiza tu caso en ≤10 días hábiles.",
    icono: Shield,
  },
];

// ─── Input class helper ───────────────────────────────────────────────────────

const fc = (err?: string) =>
  `w-full px-4 py-3 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold focus:bg-white outline-none transition-all text-gray-800 ${
    err ? "border-red-300 bg-red-50" : "border-gray-200"
  }`;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProtocoloAcosoPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [err, setErr] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const [load, setLoad] = useState(false);
  const finput = useRef<HTMLInputElement>(null);

  const MAX_FILES = 8;
  const MAX_MB = 20;

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const combined = [...files, ...selected].slice(0, MAX_FILES);
    const valid = combined.filter((f) => f.size <= MAX_MB * 1024 * 1024);
    setFiles(valid);
    if (finput.current) finput.current.value = "";
  };

  const rm = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const validate = (f: HTMLFormElement) => {
    const d = new FormData(f);
    const e: Record<string, string> = {};
    if (!d.get("victimaNombre")) e.victimaNombre = "El nombre de la víctima es obligatorio.";
    if (!d.get("victimaEmail")) e.victimaEmail = "El correo es obligatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(d.get("victimaEmail")))) e.victimaEmail = "Correo inválido.";
    if (!d.get("victimaTelefono")) e.victimaTelefono = "El número de contacto es obligatorio.";
    if (!d.get("victimaFundacion") || d.get("victimaFundacion") === "") e.victimaFundacion = "Selecciona la fundación.";
    if (!d.get("victimaColegio") || d.get("victimaColegio") === "") e.victimaColegio = "Selecciona el colegio.";
    if (!d.get("victimarioNombre")) e.victimarioNombre = "El nombre del presunto victimario es obligatorio.";
    if (!d.get("victimarioFundacion") || d.get("victimarioFundacion") === "") e.victimarioFundacion = "Selecciona la fundación.";
    if (!d.get("victimarioColegio") || d.get("victimarioColegio") === "") e.victimarioColegio = "Selecciona el colegio.";
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
      const r = await fetch("/api/acoso", { method: "POST", body: d });
      const json = await r.json();
      if (json.success) { setOk(true); f.reset(); setFiles([]); setErr({}); }
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
        <section className="relative bg-brand-dark text-white overflow-hidden">
          {/* Imagen de fondo — coloca el archivo en /public/images/hero-acoso.jpg */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/hero-acoso.jpg')" }} />
          {/* Overlay oscuro + degradado rojo para legibilidad */}
          <div className="absolute inset-0 bg-brand-dark/75" />
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 via-brand-dark/40 to-brand-dark/80" />
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 rounded-full px-4 py-2 mb-8">
              <Shield className="h-4 w-4 text-red-300" />
              <span className="text-red-200 text-sm font-medium">Protocolo de Prevención y Atención</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">Acoso Sexual Laboral</h1>
            <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
              Este espacio es seguro y confidencial. Conoce tus derechos, identifica conductas inapropiadas y reporta tu caso.
            </p>

            {/* Counter */}
            <div className="inline-block bg-white/5 border border-white/10 rounded-3xl px-16 py-10 mb-10">
              <p className="text-sm font-medium text-white/60 uppercase tracking-widest mb-2">Casos de Acoso Sexual</p>
              <div className="text-7xl md:text-8xl font-bold text-white mb-2">0</div>
              <p className="text-white/60 text-sm">Número de casos presentados en el último semestre</p>
            </div>

            <div>
              <a
                href="#formulario-denuncia"
                className="inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-400 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105"
              >
                <AlertTriangle className="h-5 w-5" />
                Reportar Caso de Acoso Sexual
              </a>
            </div>
          </div>
        </section>

        {/* ── Conductas inapropiadas ────────────────────────────────────────── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                ¿Crees estar viviendo acoso sexual?
              </h2>
              <p className="text-gray-600 text-lg">
                Identifiquemos algunas conductas inapropiadas
              </p>
            </div>

            <div className="space-y-4 mb-10">
              {CONDUCTAS.map((grupo, i) => (
                <details key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <summary className="flex items-center gap-4 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <grupo.icono className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-bold text-brand-dark">{grupo.titulo}</div>
                      <div className="text-sm text-gray-500">{grupo.subtitulo}</div>
                    </div>
                    <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6 pl-20">
                    <ul className="space-y-2">
                      {grupo.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-gray-700">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>

            {/* Nota importante */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-800 mb-1">IMPORTANTE</p>
                <p className="text-red-700 leading-relaxed">
                  Una conducta puede constituir acoso incluso si ocurre <strong>una sola vez</strong>, si es grave, no es consentida y genera afectación en la víctima.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tus Derechos ──────────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                A continuación, conoce algunos de tus <span className="text-brand-gold">derechos</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {DERECHOS.map((d) => (
                <div key={d.num} className={`rounded-2xl border p-6 ${d.color}`}>
                  <div className="flex items-start gap-4">
                    <span className={`${d.badge} text-white text-sm font-bold px-3 py-1 rounded-lg flex-shrink-0`}>{d.num}</span>
                    <div>
                      <h3 className="font-bold text-brand-dark mb-1">{d.titulo}</h3>
                      <p className="text-sm text-gray-500 font-medium mb-2">{d.marco}</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs legales */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=18843"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-brand-dark text-brand-dark px-6 py-3 rounded-xl font-semibold hover:bg-brand-dark hover:text-white transition-all"
              >
                <BookOpen className="h-5 w-5" />
                Ley 1010 de 2006
                <ExternalLink className="h-4 w-4 opacity-60" />
              </a>
              <a
                href="https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=244636"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-brand-dark text-brand-dark px-6 py-3 rounded-xl font-semibold hover:bg-brand-dark hover:text-white transition-all"
              >
                <BookOpen className="h-5 w-5" />
                Ley 2365 de 2024
                <ExternalLink className="h-4 w-4 opacity-60" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Ruta de Atención ──────────────────────────────────────────────── */}
        <section className="py-20 bg-brand-dark text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ruta de <span className="text-brand-gold">atención</span>
              </h2>
              <p className="text-gray-500 text-lg">Sigue estos pasos si estás viviendo una situación de acoso</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {RUTA.map((paso, i) => (
                <div key={i} className="relative bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  {i < RUTA.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                      <ArrowRight className="h-5 w-5 text-brand-gold" />
                    </div>
                  )}
                  <div className="w-12 h-12 bg-brand-gold rounded-xl flex items-center justify-center mx-auto mb-4">
                    <paso.icono className="h-6 w-6 text-brand-dark" />
                  </div>
                  <span className="text-brand-gold text-sm font-bold tracking-widest">{paso.num}</span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-2">{paso.titulo}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{paso.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Casos reportados ──────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                Casos reportados y <span className="text-brand-gold">acciones correctivas</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Registro del último semestre — publicado conforme a la Ley 2365 de 2024
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-brand-dark text-white text-sm font-semibold">
                <span>N.º Caso</span>
                <span>Fecha</span>
                <span>Situación presentada</span>
                <span>Acciones tomadas</span>
              </div>
              {/* Empty state */}
              <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <Shield className="h-7 w-7 text-gray-500" />
                </div>
                <p className="font-semibold text-brand-dark mb-1">Sin casos en el período</p>
                <p className="text-gray-500 text-sm max-w-sm">
                  No se han reportado casos de acoso sexual en el último semestre. Este registro se actualiza periódicamente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Formulario ────────────────────────────────────────────────────── */}
        <section id="formulario-denuncia" className="py-20 bg-gray-50 scroll-mt-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-2 mb-6">
                <Lock className="h-4 w-4 text-red-500" />
                <span className="text-red-700 text-sm font-medium">Canal confidencial y seguro</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Presenta tu denuncia</h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Tu información será tratada de forma confidencial y segura. Este canal es exclusivo para reportar situaciones de acoso laboral o sexual conforme a la{" "}
                <strong>Ley 1010 de 2006</strong> y <strong>Ley 2365 de 2024</strong>.
              </p>
            </div>

            {/* Success */}
            {ok && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center mb-8">
                <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-emerald-800 mb-2">Denuncia recibida</h3>
                <p className="text-emerald-700">
                  Tu reporte fue enviado de forma segura. El Comité de Convivencia lo analizará en un plazo máximo de 10 días hábiles.
                </p>
              </div>
            )}

            {/* Error general */}
            {err.submit && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3 mb-6">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{err.submit}</p>
              </div>
            )}

            <form onSubmit={submit} noValidate className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8">

              {/* ── Datos de la víctima ─────────────────────────────────────── */}
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-8 h-8 bg-brand-gold rounded-lg flex items-center justify-center">
                    <User className="h-4 w-4 text-brand-dark" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark">1. Datos de la víctima</h3>
                </div>

                <div className="space-y-5">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-1" /> Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input name="victimaNombre" type="text" placeholder="Nombre completo de la víctima" className={fc(err.victimaNombre)} />
                    {err.victimaNombre && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.victimaNombre}</p>}
                  </div>

                  {/* Email + Teléfono */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Mail className="h-4 w-4 inline mr-1" /> Correo electrónico <span className="text-red-500">*</span>
                      </label>
                      <input name="victimaEmail" type="email" placeholder="correo@ejemplo.com" className={fc(err.victimaEmail)} />
                      {err.victimaEmail && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.victimaEmail}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Phone className="h-4 w-4 inline mr-1" /> Número de contacto <span className="text-red-500">*</span>
                      </label>
                      <input name="victimaTelefono" type="tel" placeholder="300 123 4567" className={fc(err.victimaTelefono)} />
                      {err.victimaTelefono && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.victimaTelefono}</p>}
                    </div>
                  </div>

                  {/* Fundación + Colegio */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Building2 className="h-4 w-4 inline mr-1" /> Fundación a la que pertenece <span className="text-red-500">*</span>
                      </label>
                      <select name="victimaFundacion" defaultValue="" className={fc(err.victimaFundacion)}>
                        <option value="" disabled>— Seleccione —</option>
                        {FUNDACIONES.map((f) => <option key={f} value={f}>{f}</option>)}
                      </select>
                      {err.victimaFundacion && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.victimaFundacion}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Building2 className="h-4 w-4 inline mr-1" /> Colegio al que pertenece <span className="text-red-500">*</span>
                      </label>
                      <select name="victimaColegio" defaultValue="" className={fc(err.victimaColegio)}>
                        <option value="" disabled>— Seleccione —</option>
                        {COLEGIOS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {err.victimaColegio && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.victimaColegio}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Datos del presunto victimario ───────────────────────────── */}
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark">2. Datos del presunto victimario</h3>
                </div>

                <div className="space-y-5">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-1" /> Nombre del presunto victimario <span className="text-red-500">*</span>
                    </label>
                    <input name="victimarioNombre" type="text" placeholder="Nombre completo del presunto victimario" className={fc(err.victimarioNombre)} />
                    {err.victimarioNombre && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.victimarioNombre}</p>}
                  </div>

                  {/* Fundación + Colegio */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Building2 className="h-4 w-4 inline mr-1" /> Fundación a la que pertenece <span className="text-red-500">*</span>
                      </label>
                      <select name="victimarioFundacion" defaultValue="" className={fc(err.victimarioFundacion)}>
                        <option value="" disabled>— Seleccione —</option>
                        {FUNDACIONES.map((f) => <option key={f} value={f}>{f}</option>)}
                      </select>
                      {err.victimarioFundacion && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.victimarioFundacion}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <Building2 className="h-4 w-4 inline mr-1" /> Colegio al que pertenece <span className="text-red-500">*</span>
                      </label>
                      <select name="victimarioColegio" defaultValue="" className={fc(err.victimarioColegio)}>
                        <option value="" disabled>— Seleccione —</option>
                        {COLEGIOS.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {err.victimarioColegio && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle className="h-4 w-4" />{err.victimarioColegio}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Adjuntos ────────────────────────────────────────────────── */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Upload className="h-4 w-4 inline mr-1" /> Subir anexos (queja escrita, pruebas, pantallazos, etc.)
                </label>
                <input ref={finput} type="file" multiple onChange={onFiles} className="hidden" />
                <button
                  type="button"
                  onClick={() => finput.current?.click()}
                  disabled={files.length >= MAX_FILES}
                  className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-brand-gold hover:text-brand-dark transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
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
                        <button type="button" onClick={() => rm(i)} className="text-gray-500 hover:text-red-500 transition-colors">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={load}
                className="w-full bg-red-500 hover:bg-red-400 text-white py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {load
                  ? <><Loader2 className="h-5 w-5 animate-spin" /> Enviando...</>
                  : <><AlertTriangle className="h-5 w-5" /> ENVIAR DENUNCIA</>
                }
              </button>

              <p className="text-sm text-gray-500 text-center leading-relaxed">
                Al enviar este formulario, aceptas que tu información será tratada confidencialmente conforme a la Política de Privacidad de las Fundaciones Educativas Arquidiocesanas y las leyes colombianas de protección de datos (Ley 1581/2012).
              </p>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
