"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
  Download, ArrowLeft, FileText, MessageSquare, User,
  Send, Loader2, ChevronRight, Building2, Calendar,
} from "lucide-react";

// ─── PDF data per foundation/year ───────────────────────────────────────────

type PDF = { titulo: string; href: string };

const PDFS: Record<string, Record<number, PDF[]>> = {
  FESIH: {
    2019: [
      { titulo: "Informe de Gestión", href: "https://drive.google.com/file/d/1ZgL0wZzhA02bpDWkqm-gp7X02nSkFVba/view?usp=sharing" },
      { titulo: "Memoria Económica", href: "https://drive.google.com/file/d/1wWHTo29ZuHf3ujBwafPStJWnQUD87OA0/view?usp=sharing" },
      { titulo: "Estados Financieros", href: "https://drive.google.com/file/d/1kvDLhiny56YM3vPnG0_y3sQ-TIKwoBVr/view?usp=sharing" },
      { titulo: "Acta de Consejo de Administración", href: "https://drive.google.com/file/d/10gUusC7QUtmsx9MZRV1wwBLcKDx91ZUl/view?usp=sharing" },
      { titulo: "Representación Legal", href: "https://drive.google.com/file/d/1SeBgcHTq6xmNyXPVeH6ngip4J3_yot3A/view?usp=sharing" },
      { titulo: "Cargos Directivos", href: "https://drive.google.com/file/d/1khC0UAb2FxvBb_LEr7xhSb_AQOnM_1Hq/view?usp=sharing" },
      { titulo: "Fundadores", href: "https://drive.google.com/file/d/1E-iX7ntppIiYbfsjs0D93IBF0E80i_1e/view?usp=sharing" },
      { titulo: "Distribución de Excedentes", href: "https://drive.google.com/file/d/1Ytus7-ya_I3TbZA64v9oGllB-d01NqCo/view?usp=sharing" },
      { titulo: "Cifras Administrativas", href: "https://drive.google.com/file/d/1xrGSjTsPPlIc-1_bSIuWBBJxhTKfxTSK/view?usp=sharing" },
      { titulo: "Certificado de Cancillería", href: "https://drive.google.com/file/d/1pw8xIVZI7RTMKqAQZThxbar8bS5uRpo4/view?usp=sharing" },
      { titulo: "Certificado Deloitte", href: "https://drive.google.com/file/d/1PtxJbZMfEagpXC7f9B006Y7IPV6B-PoX/view?usp=sharing" },
      { titulo: "Certificado de Antecedentes Judiciales", href: "https://drive.google.com/file/d/1zkDzf7Co8P7_C05i4YVhpJQH9wf3Qov4/view?usp=sharing" },
    ],
    2018: [
      { titulo: "Régimen Tributario Especial", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/REGIMEN_TRIBUTARIO_ESPECIAL_SIH_2018.pdf" },
      { titulo: "Memoria Económica", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/MEMORIA_ECONOMICA_FSIH_2018-1.pdf" },
      { titulo: "Estados Financieros", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/ESTADOS_FINANCIEROS_FSIH_2018.pdf" },
      { titulo: "Formato 5245 RTE", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/FORMATO_5245_FSIH_2018.pdf" },
      { titulo: "RUT", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/RUT_FSIH_2018.pdf" },
      { titulo: "Certificado de Constitución", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/CERTIFICADO_DE_CONSTITUCION_FSIH_2018.pdf" },
      { titulo: "Decreto 142 Creación FESIH", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/142_CONSTITUCION-Y-ESTATUTOS_FSIH_2018.pdf" },
      { titulo: "Cargos Directivos y de Control", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/CARGOS_DIRECTIVOS_DE_CONTROL_FSIH_2018.pdf" },
      { titulo: "Estatutos", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/ESTATUTO_DECRETO_955-NOV-2017_FSIH_2018.pdf" },
      { titulo: "Certificación de Cumplimiento", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/CERTIFICADO_CUMPLIMIENTO_LEGAL_.pdf" },
      { titulo: "Certificado de Antecedentes", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/CERTIFICADO_ANTECEDENTES_FSIH_2018.pdf" },
      { titulo: "Fundadores", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/FUNDADORES_FSIH_2018.pdf" },
      { titulo: "Acta Consejo de Administración", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/ACTA_CONSEJO_ADMIN_FSIH_2018.pdf" },
    ],
    2017: [
      { titulo: "Régimen Tributario Especial", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/REGISTROTRIBUTARIOESPECIALFSIH-1.pdf" },
      { titulo: "Estados Financieros", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/ESTADOSFINANCIEROS2017SIH.pdf" },
      { titulo: "Acta Consejo de Administración", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/ACTA63.pdf" },
      { titulo: "Declaración de Renta", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/DECLARACIONDERENTE2017.pdf" },
      { titulo: "Decreto 142 Creación FESIH", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/DECRETO142CREACIONSIH.pdf" },
      { titulo: "RUT", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/RUT.pdf" },
      { titulo: "Certificado Antecedentes", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/CALIDADREPRESENTANTE.pdf" },
      { titulo: "Certificación de Cumplimiento", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/CERTIFICACIONDECUMPLIMIENTO.pdf" },
      { titulo: "Certificado Representación Legal", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/SUSCRITOORZOBISPAL.pdf" },
    ],
  },
  FAUU: {
    2019: [
      { titulo: "Informe de Gestión", href: "https://drive.google.com/file/d/1ZbcP9no21NP0xPM7UqY3acWz80-OeOsz/view?usp=sharing" },
      { titulo: "Memoria Económica", href: "https://drive.google.com/file/d/14qJMAJtidx53iQW_66iz6D-TWN0PRcXb/view?usp=sharing" },
      { titulo: "Estados Financieros", href: "https://drive.google.com/file/d/16bbsLS8eMvcaGsvqgnEgm6A3K9RXxN9b/view?usp=sharing" },
      { titulo: "Acta de Consejo de Administración", href: "https://drive.google.com/file/d/1MgwNnh_SMSNGMa-QJhDI6Txmk4V2Qr5L/view?usp=sharing" },
      { titulo: "Representación Legal", href: "https://drive.google.com/file/d/1ShAWKiw3RiJlV79v16USu6sF_IEJRWvv/view?usp=sharing" },
      { titulo: "Cargos Directivos", href: "https://drive.google.com/file/d/1_xUWv505ZaSnUu3htty0SzBZ1ErGapNW/view?usp=sharing" },
      { titulo: "Fundadores", href: "https://drive.google.com/file/d/1if_62PjeEmKxtLcv9TTMRIf4Zz76eolC/view?usp=sharing" },
      { titulo: "Distribución de Excedentes", href: "https://drive.google.com/file/d/1e_rh7wtZoLkx_yuKrtSs1vdAG6o1pC9R/view?usp=sharing" },
      { titulo: "Cifras Administrativas", href: "https://drive.google.com/file/d/1Nu2VK77DOat3byYEJWzEQhuSAkkPHtUC/view?usp=sharing" },
      { titulo: "Certificado de Cancillería", href: "https://drive.google.com/file/d/1zQ2EALGz0-mgZR5iMxdacKohoP_SFCyR/view?usp=sharing" },
      { titulo: "Certificado Deloitte", href: "https://drive.google.com/file/d/1lpFyNV-szsQ9mm30h6inFoy-P-_Vgh7Q/view?usp=sharing" },
      { titulo: "Certificado de Antecedentes Judiciales", href: "https://drive.google.com/file/d/1YpvTIsEt1o0Sav6xKF2Szy3WTRVj7rrY/view?usp=sharing" },
    ],
    2018: [
      { titulo: "Registro Tributario Especial", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/REGIMEN_TRIBUTARIO_ESPECIAL_2018_AUU.pdf" },
      { titulo: "Memoria Económica", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/MEMORIA_ECONOMICA_2018_FAUU.pdf" },
      { titulo: "Estados Financieros", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/ESTADOS_FINANCIEROS_DICTAMINADOS_2018_FAUU.pdf" },
      { titulo: "Estatutos Decreto 954", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/ESTATUTO_DECRETO_954_2018_FAUU.pdf" },
      { titulo: "Certificado Web", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/CERTIFICADO_WEB_2018_FAUU.pdf" },
      { titulo: "Formato 5245 RTE", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/FORMATO_5245_RTE_FAUU_2018.pdf" },
      { titulo: "Decreto 140 - Creación FEAUU", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/DECRETOC140CREACIONAUU.pdf" },
      { titulo: "Cargos Directivos", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/CARGOS_DIRECTIVOS_SALARIO_FAUU_2018.pdf" },
      { titulo: "RUT", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/RUT_FAUU_2018.pdf" },
      { titulo: "Acta Consejo de Administración", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/ACTA_FAUU_2018.pdf" },
      { titulo: "Declaración de Renta", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/DECLARACIONDERENTEAUU.pdf" },
      { titulo: "Certificación de Cumplimiento", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/CERTIFICADO_DE_CUMPLIMIENTO_LEGAL_FAUU.pdf" },
      { titulo: "Certificado Antecedentes", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/ANTECEDENTES-_JUDICIALES_REPRESENTANTE_LEGAL_FAUU_2018.pdf" },
      { titulo: "Certificado Cancillería", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/CERTIFICADO_CANCILLERIA_2018_FAUU.pdf" },
      { titulo: "Balance Social", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2019/03/BALANCE_SOCIAL_2018_FAUU.pdf" },
    ],
    2017: [
      { titulo: "Registro Tributario Especial", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/REGISTROTRIBUTARIOESPECIALAUU.pdf" },
      { titulo: "Estados Financieros", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/ESTADOS-FINANCIEROS2017AUU.pdf" },
      { titulo: "Declaración de Renta", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/DECLARACIONDERENTEAUU.pdf" },
      { titulo: "Decreto 140 - Creación FEAUU", href: "https://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/DECRETOC140CREACIONAUU.pdf" },
      { titulo: "Certificado Representación Legal", href: "https://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/CERTIFICADOCANCILLERIA.pdf" },
      { titulo: "Certificación de Cumplimiento", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/CERTIFICACIONCUMPLIMIENTO.pdf" },
      { titulo: "Certificado Antecedentes", href: "https://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/CALIDADREPRESENTANTE-1.pdf" },
      { titulo: "RUT", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/RUTAUU.pdf" },
      { titulo: "Balance Social", href: "http://colegiosarquidiocesanos.edu.co/_archivos/wp-content/uploads/2018/12/BALANCESOCIALAUU.pdf" },
    ],
  },
};

const FUND_NOMBRES: Record<string, string> = {
  FESIH: "Fundación Educativa Santa Isabel de Hungría",
  FAUU: "Fundación Educativa Alberto Uribe Urdaneta",
};

const INTRO: Record<string, string> = {
  FESIH: "El siguiente informe de gestión contiene los puntos más significativos del trabajo que se realiza desde la Fundación Educativa Santa Isabel de Hungría para la comunidad, evidenciando la reinversión de los excedentes en actividades meritorias de educación, salud y cultura.",
  FAUU: "El siguiente informe de gestión contiene los puntos más significativos del trabajo que se realiza desde la Fundación Educativa Alberto Uribe Urdaneta para la comunidad, evidenciando la reinversión de los excedentes en actividades meritorias de educación, salud y cultura.",
};

// ─── Comment type ───────────────────────────────────────────────────────────

type Comment = { id: string; nombre: string; comentario: string; createdAt: string };

// ─── Page ───────────────────────────────────────────────────────────────────

export default function InformeAnualPage() {
  const params = useParams();
  const fundacion = (params.fundacion as string) || "";
  const anio = parseInt(params.anio as string, 10);

  const pdfs = PDFS[fundacion]?.[anio] || [];
  const fundNombre = FUND_NOMBRES[fundacion] || fundacion;
  const intro = INTRO[fundacion] || "";
  const isValid = !!FUND_NOMBRES[fundacion] && !!PDFS[fundacion]?.[anio];

  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/informes-comentarios?fundacion=${fundacion}&anio=${anio}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch {
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  }, [fundacion, anio]);

  useEffect(() => {
    if (isValid) fetchComments();
  }, [isValid, fetchComments]);

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (nombre.trim().length < 2) { setErr("Ingresa tu nombre."); return; }
    if (comentario.trim().length < 5) { setErr("El comentario debe tener al menos 5 caracteres."); return; }
    setSending(true);
    try {
      const res = await fetch("/api/informes-comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fundacion, anio, nombre: nombre.trim(), comentario: comentario.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErr(data.error || "Error al enviar.");
      } else {
        setNombre("");
        setComentario("");
        fetchComments();
      }
    } catch {
      setErr("Error de conexión.");
    } finally {
      setSending(false);
    }
  };

  const fmtDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  if (!isValid) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-brand-dark mb-4">Informe no encontrado</h1>
            <p className="text-gray-500 mb-6">La combinación de fundación y año solicitada no está disponible.</p>
            <Link href="/transparencia/informes-gestion-social" className="text-brand-dark font-semibold hover:underline flex items-center gap-1 justify-center">
              <ArrowLeft className="h-4 w-4" /> Volver al portal
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-brand-dark py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/transparencia/informes-gestion-social" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Volver al portal de informes
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-brand-gold/20 text-brand-gold px-3 py-1 rounded-full text-sm font-bold">
                <Building2 className="h-3.5 w-3.5" /> {fundacion}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm font-bold">
                <Calendar className="h-3.5 w-3.5" /> Año {anio}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Informe de Gestión Social <span className="text-brand-gold">{anio}</span>
            </h1>
            <p className="text-white/70 text-lg">{fundNombre}</p>
          </div>
        </section>

        {/* Intro + PDFs */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 mb-12">
              <h2 className="text-xl font-bold text-brand-dark mb-3">Bienvenidos</h2>
              <p className="text-gray-600 leading-relaxed">{intro}</p>
            </div>

            <h2 className="text-2xl font-bold text-brand-dark mb-6">
              Documentos disponibles <span className="text-gray-500 font-normal text-lg">({pdfs.length})</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pdfs.map((pdf, i) => (
                <a
                  key={i}
                  href={pdf.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-brand-gold/30 transition-all group flex items-start gap-3"
                >
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                    <FileText className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-brand-dark text-sm group-hover:text-brand-gold transition-colors">{pdf.titulo}</p>
                    <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                      <Download className="h-3 w-3" /> Descargar / Ver
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Comments */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-brand-dark mb-2">
                <MessageSquare className="h-6 w-6 inline mr-2 text-brand-gold" />
                Comentarios de la comunidad
              </h2>
              <p className="text-gray-500 text-sm">Deja tu opinión sobre este informe de gestión social. Tu comentario será visible públicamente.</p>
            </div>

            {/* Comment form */}
            <form onSubmit={submitComment} className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 shadow-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <User className="h-4 w-4 inline mr-1" /> Tu nombre
                  </label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Escribe tu nombre"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <MessageSquare className="h-4 w-4 inline mr-1" /> Tu comentario
                  </label>
                  <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    rows={3}
                    placeholder="Escribe tu comentario sobre este informe..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all resize-none"
                  />
                </div>
                {err && <p className="text-red-500 text-sm">{err}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="bg-brand-dark text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-brand-dark/90 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {sending ? "Enviando..." : "Publicar comentario"}
                </button>
              </div>
            </form>

            {/* Comments list */}
            {loadingComments ? (
              <div className="text-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-gray-500 mx-auto" />
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <MessageSquare className="h-10 w-10 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Aún no hay comentarios.</p>
                <p className="text-gray-500 text-sm">Sé el primero en dejar tu opinión.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((c) => (
                  <div key={c.id} className="bg-white rounded-xl border border-gray-100 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-brand-dark flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{c.nombre.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-brand-dark text-sm">{c.nombre}</p>
                        <p className="text-gray-500 text-sm">{fmtDate(c.createdAt)}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed pl-10">{c.comentario}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
