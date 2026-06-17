import { prisma } from "./prisma";
import { safeJsonParse } from "./utils";

export type ColegioUI = {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  direccion: string;
  zona: string;
  telefono: string;
  email: string;
  facebook?: string | null;
  calendario: "A" | "B" | string;
  jornadas: string[];
  niveles: string[];
  estudiantes: number;
  docentes: number;
  fundacion: number;
  egresados?: number | null;
  caracteristicas: string[];
  logo?: string | null;
};

export type NoticiaUI = {
  id: string;
  slug: string;
  titulo: string;
  resumen: string;
  contenido: string;
  categoria: string;
  fecha: string; // ISO yyyy-mm-dd
  autor: string;
  imagen: string;
  destacada: boolean;
};

function colegioRowToUI(row: any): ColegioUI {
  return {
    id: row.id,
    slug: row.slug,
    nombre: row.nombre,
    descripcion: row.descripcion,
    direccion: row.direccion,
    zona: row.zona,
    telefono: row.telefono,
    email: row.email,
    facebook: row.facebook,
    calendario: row.calendario,
    jornadas: safeJsonParse<string[]>(row.jornadas, []),
    niveles: safeJsonParse<string[]>(row.niveles, []),
    estudiantes: row.estudiantes,
    docentes: row.docentes,
    fundacion: row.fundacion,
    egresados: row.egresados,
    caracteristicas: safeJsonParse<string[]>(row.caracteristicas, []),
    logo: row.logo || (row.slug === "nuestra-senora-chiquinquira" ? "/logos/nuestra-senora-chiquinquira.png" : null),
  };
}

function noticiaRowToUI(row: any): NoticiaUI {
  return {
    id: row.id,
    slug: row.slug,
    titulo: row.titulo,
    resumen: row.resumen,
    contenido: row.contenido,
    categoria: row.categoria,
    fecha: row.fecha.toISOString().slice(0, 10),
    autor: row.autor,
    imagen: row.imagen,
    destacada: row.destacada,
  };
}

export async function getColegios(): Promise<ColegioUI[]> {
  const rows = await prisma.colegio.findMany({
    where: { publicado: true },
    orderBy: { nombre: "asc" },
  });
  return rows.map(colegioRowToUI);
}

export async function getColegioBySlug(slug: string): Promise<ColegioUI | null> {
  const row = await prisma.colegio.findUnique({ where: { slug } });
  if (!row || !row.publicado) return null;
  return colegioRowToUI(row);
}

export async function getNoticias(): Promise<NoticiaUI[]> {
  const rows = await prisma.noticia.findMany({
    where: { publicada: true },
    orderBy: { fecha: "desc" },
  });
  return rows.map(noticiaRowToUI);
}

export async function getNoticiasDestacadas(limit = 3): Promise<NoticiaUI[]> {
  const rows = await prisma.noticia.findMany({
    where: { publicada: true, destacada: true },
    orderBy: { fecha: "desc" },
    take: limit,
  });
  return rows.map(noticiaRowToUI);
}

export async function getNoticiaBySlug(slug: string): Promise<NoticiaUI | null> {
  const row = await prisma.noticia.findUnique({ where: { slug } });
  if (!row || !row.publicada) return null;
  return noticiaRowToUI(row);
}

export type OfertaItem    = { icono: string; titulo: string; descripcion?: string };
export type MiembroEquipo = { nombre: string; cargo: string; foto?: string };
export type Testimonio        = { texto: string; nombre: string; relacion: string; foto?: string; video?: string };
export type TestimonioVideo   = { titulo?: string; autor?: string; url: string; tipo: "url" | "local"; thumbnail?: string };
export type GaleriaItem   = { url: string; alt?: string };
export type CostoGrado    = { grado: string; matricula: number; descMatricula?: number | null; pension: number; descPension?: number | null };

export type ColegioDetalleUI = {
  colegioSlug:      string;
  ofertaTitulo:     string;
  ofertaCopy:       string;
  ofertaItems:      OfertaItem[];
  equipo:           MiembroEquipo[];
  testimonios:      Testimonio[];
  testimoniosVideo: TestimonioVideo[];
  galeria:          GaleriaItem[];
  costos:           CostoGrado[];
  heroFondo:        string;
  heroOverlay:      number;
  heroOverlayColor: string;
  heroContenedor:   string;
};

const DETALLE_DEFAULTS: Omit<ColegioDetalleUI, "colegioSlug"> = {
  ofertaTitulo:     "Nuestra Oferta Académica",
  ofertaCopy:       "",
  ofertaItems:      [],
  equipo:           [],
  testimonios:      [],
  testimoniosVideo: [],
  galeria:          [],
  costos:           [],
  heroFondo:        "",
  heroOverlay:      80,
  heroOverlayColor: "#000000",
  heroContenedor:   "",
};

export async function getColegioDetalle(slug: string): Promise<ColegioDetalleUI> {
  const row = await prisma.colegioDetalle.findUnique({ where: { colegioSlug: slug } });
  if (!row) return { colegioSlug: slug, ...DETALLE_DEFAULTS };
  return {
    colegioSlug:  row.colegioSlug,
    ofertaTitulo: row.ofertaTitulo,
    ofertaCopy:   row.ofertaCopy,
    ofertaItems:  safeJsonParse<OfertaItem[]>(row.ofertaItems, []),
    equipo:           safeJsonParse<MiembroEquipo[]>(row.equipo, []),
    testimonios:      safeJsonParse<Testimonio[]>(row.testimonios, []),
    testimoniosVideo: safeJsonParse<TestimonioVideo[]>((row as any).testimoniosVideo, []),
    galeria:          safeJsonParse<GaleriaItem[]>(row.galeria, []),
    costos:           safeJsonParse<CostoGrado[]>(row.costos, []),
    heroFondo:        (row as any).heroFondo        ?? "",
    heroOverlay:      (row as any).heroOverlay       ?? 80,
    heroOverlayColor: (row as any).heroOverlayColor  ?? "#000000",
    heroContenedor:   (row as any).heroContenedor   ?? "",
  };
}

export function formatFecha(fecha: string): string {
  const d = new Date(fecha);
  return d.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
