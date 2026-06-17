// ─── 2024 Social Management Report Data ─────────────────────────────────────

import type { Fundacion2023, RendicionItem, IngresoItem, DonanteItem } from "./informe2023";
import { INFORME_2023 } from "./informe2023";

export interface DescuentoItem {
  label: string;
  monto: number;
}

export interface AlianzaEstrategica {
  titulo: string;
  descripcion: string;
  monto?: number;
  foto?: string;
  logo?: string;
}

export interface Fundacion2024 extends Fundacion2023 {
  // 2024-specific extras
  hombresFoto?: string;
  mujeresFoto?: string;
  descuentosOtorgados?: {
    titulo: string;
    descripcion: string;
    total: number;
    items: DescuentoItem[];
  };
  mobiliario?: RendicionItem;
  herramientasTecnologicas?: RendicionItem;
  modernizacion?: {
    titulo: string;
    descripcion: string;
    estudiantesBeneficiados: number;
    foto?: string;
  };
  alianzasEstrategicas?: AlianzaEstrategica[];
  impactoPastoral?: {
    titulo: string;
    descripcion: string;
    foto?: string;
    estudiantesImpactados: number;
    actividades: number;
    items: { numero: string; titulo: string; descripcion: string }[];
  };
}

// ─── Shared 2024 texts ───────────────────────────────────────────────────────

const RENDICION_TRANSPARENCIA_2024 = `La transparencia en la rendición de cuentas es un principio fundamental, y su relevancia se amplifica en el ámbito educativo, especialmente en las Fundaciones Educativas Arquidiocesanas. Estas instituciones, al ser responsables de la formación integral de los estudiantes y el uso de recursos destinados a la educación, deben ser modelos de honestidad y claridad en la gestión de los fondos y proyectos.

La transparencia permite que los padres de familia, los estudiantes, los colaboradores y la comunidad en general tengan acceso a información clara y precisa sobre cómo se utilizan los recursos, los logros alcanzados y los desafíos que se presentan. Esta práctica no solo genera confianza, sino que también fortalece la relación entre la Fundación Educativa y los diferentes actores involucrados.`;

// ─── FESIH 2024 ──────────────────────────────────────────────────────────────

const FESIH_2023 = INFORME_2023.FESIH;

const TEXTO_INTRO_2024 = `Como Fundación Educativa Arquidiocesana nuestros valores son claros: liderazgo, transparencia, responsabilidad y resiliencia. Este informe de balance social busca dar cuenta de la forma en que nuestros valores se reflejan en acciones prácticas que impactan las vidas de cientos de familias. A lo largo de los años hemos comprendido la importancia del liderazgo que ejercemos en la comunidad, la manera que la educación nos trasciende generacionalmente y nos conecta como sociedad.

En esta ocasión, nuestro informe de impacto social presenta una línea gráfica que resalta los colores y elementos ambientales, en coherencia con el énfasis de trabajo del año 2024, centrado en la construcción de una cultura ambiental que promueva el cuidado de la casa común.`;

const FESIH: Fundacion2024 = {
  // ── Reused sections from 2023 (Misión, Visión, Ubicación, Demografía) ──
  ...FESIH_2023,

  // ── 2024 institutional intro (no longer director's words) ──
  textoIntroductorio: TEXTO_INTRO_2024,

  // ── Updated 2024 imagery ──
  heroImage: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/0000ec80-ac88-4685-9385-c1e1f059ae7f.webp",
  horizonteFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/02/59e69927-396f-4141-9c79-e98ee45f961a-scaled.webp",
  hombresFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/Imagen-de-WhatsApp-2025-05-29-a-las-10.43.34_3451c766-1.webp",
  mujeresFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/foto-nina-poblacion-22-1.webp",

  // ── Updated 2024 financial data ──
  rendicionFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/78fda092-621d-4092-8282-9e4476b79763-scaled.webp",
  ingresosDetalle: [
    { label: "Contratación Estatal", monto: 53176183543, color: "#D4A843" },
    { label: "Servicios Educativos", monto: 5576163588, color: "#E8A838" },
    { label: "Otros Ingresos", monto: 533546317, color: "#6BBF4E" },
    { label: "Donaciones", monto: 278680920, color: "#D4A843" },
  ],

  rendicion: {
    ingresos: {
      titulo: "Ingresos 2024",
      subtitulo: "Composición de los recursos financieros",
      descripcion: RENDICION_TRANSPARENCIA_2024,
    },
    nomina: {
      titulo: "Inversión Talento Humano",
      subtitulo: "Balance Institucional",
      foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/Foto-Calendario-2025_-scaled.webp",
      descripcion: "La inversión en nómina es clave para asegurar el éxito de los programas educativos y sociales de la Fundación. Desde la contratación de personal cualificado, como docentes, administradores y personal de apoyo, hasta su capacitación continua, se garantiza un equipo competente y alineado con la misión de la Fundación. Invertir en la formación y bienestar del personal no solo mejora su desempeño, sino que fortalece el ambiente laboral, incrementando la motivación y la calidad educativa.",
      monto: 43495213898,
    },
    academica: {
      titulo: "Inversión Académica",
      subtitulo: "Balance Institucional",
      foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/esta-4-scaled.webp",
      descripcion: "La inversión académica se destina al desarrollo y mejora de los programas educativos, la adquisición de materiales didácticos y tecnológicos, así como el fortalecimiento de la infraestructura educativa. Esto incluye la actualización constante de los métodos pedagógicos y la implementación de nuevas tecnologías para enriquecer la experiencia educativa de los estudiantes.",
      monto: 3304122519,
      detalle: ["Material Educativo", "Pruebas Diagnósticas"],
    },
    apoyoVulnerable: {
      titulo: "Apoyo a Población Vulnerable",
      subtitulo: "Balance Institucional",
      foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/Rendicion1.webp",
      descripcion: "La Fundación Santa Isabel de Hungría apoya a las personas y familias en situación de vulnerabilidad, especialmente a aquellos estudiantes que se encuentran en situación de desplazamiento por el conflicto armado. Para lograrlo, brindamos apoyo a través de la entrega de kits escolares completos, que incluyen maletines, cuadernos, uniformes y materiales esenciales para el desarrollo académico de los niños. Este apoyo no solo alivia la carga financiera de las familias, sino que también promueve la igualdad de oportunidades educativas, permitiendo que todos los niños, sin importar su contexto social, tengan acceso a los recursos necesarios para desarrollarse plenamente en su educación.",
      monto: 181946210,
      detalle: ["Kits Escolares", "Uniformes", "Material esencial"],
    },
    bienestarPastoral: {
      titulo: "Inversión Pastoral",
      subtitulo: "Balance Institucional",
      foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/490083605_18002071802766700_4620744334187251397_n.webp",
      descripcion: "En la Fundación Santa Isabel de Hungría, el equipo de Gestión Pastoral lidera iniciativas transformadoras que enriquecen nuestra comunidad educativa. Nos centramos en fomentar el bienestar integral, promoviendo no solo el desarrollo académico, sino también el crecimiento personal y espiritual de nuestros docentes, personal administrativo y estudiantes, asegurando un ambiente educativo pleno y armónico.",
      monto: 316001000,
    },
    mejoramientoAmbientes: {
      titulo: "Infraestructura",
      subtitulo: "Mejoramiento de Ambientes Escolares",
      foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/infraestructura2.webp",
      descripcion: "Garantizar espacios seguros y adecuados es fundamental para el bienestar y el desempeño de nuestra comunidad educativa. Durante el 2024, se realizaron mejoras y mantenimientos en nuestras instalaciones, enfocados en la renovación de baños, cubiertas, techos, pisos y zonas escolares, así como en mantenimientos generales. Estas inversiones fortalecen la calidad del entorno escolar, proporcionando espacios funcionales, seguros y confortables para estudiantes y colaboradores, cumpliendo además con las normas técnicas vigentes.",
      monto: 1177275771,
    },
    donantes: {
      titulo: "Donantes 2024",
      descripcion: "La Fundación Educativa Santa Isabel de Hungría recibió en el año 2024 donaciones por valor de $278.680.920. Estas donaciones han sido destinadas al desarrollo de nuestra actividad educativa.",
      monto: 278680920,
    },
  },

  // ── New 2024 sections ──
  descuentosOtorgados: {
    titulo: "Descuentos Otorgados",
    descripcion: "Con el objetivo de mantener nuestra población y considerando la necesidad de las familias de nuestra comunidad en las que muchas de ellas dependen de trabajos informales, ofrecemos descuentos en los costos educativos permitiendo que los niños y niñas de las comunas más vulnerables tengan acceso a una educación de calidad.",
    total: 3437725655,
    items: [
      { label: "Subsidios Educativos", monto: 3227453600 },
      { label: "Estudiantes Nuevos", monto: 156219531 },
      { label: "Pagos Anticipados", monto: 23238843 },
      { label: "Reconocimiento Académico", monto: 16524694 },
      { label: "Grupos Familiares", monto: 8597779 },
      { label: "Hijos de Colaboradores", monto: 5691208 },
    ],
  },

  mobiliario: {
    titulo: "Mobiliario",
    subtitulo: "Balance Institucional",
    foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/infraestructura3.webp",
    descripcion: "Para garantizar un buen proceso de aprendizaje, se realizan inversiones permanentes en la actualización del mobiliario, proporcionando confort tanto a nuestros estudiantes como a nuestros colaboradores. Durante el año 2024, se llevó a cabo la renovación de pupitres, sillas, escritorios, tableros, ventiladores y muebles administrativos.",
    monto: 649513126,
  },

  herramientasTecnologicas: {
    titulo: "Herramientas Tecnológicas",
    subtitulo: "Balance Institucional",
    foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/seccion-tecnologia2.webp",
    descripcion: "Para el eficaz desarrollo de los procesos organizacionales, se invierte en herramientas tecnológicas que optimizan el trabajo, agilizando tareas, fortaleciendo la comunicación y permitiendo un mejor desempeño. Las inversiones en computadores, video proyector, software, licencias, audiovisuales y demás herramientas tecnológicas, asegurando que cada Institución Educativa cuente con los recursos necesarios para brindar un servicio de calidad.",
    monto: 483588225,
  },

  impactoPastoral: {
    titulo: "Impacto y transformación en la comunidad educativa",
    descripcion: "La línea pastoral de capellanía tiene un impacto social significativo, centrado en el acompañamiento a la comunidad educativa, la celebración de la vida sacramental y la atención a padres de familia, colaboradores y estudiantes. Su labor no solo fortalece la dimensión espiritual, sino que también contribuye a la construcción de un entorno educativo basado en la solidaridad, la convivencia pacífica y el crecimiento personal.",
    foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/pastoralll1.webp",
    estudiantesImpactados: 1000,
    actividades: 50,
    items: [
      { numero: "1", titulo: "Convivencia Escolar y Cultura de Paz", descripcion: "Con enfoque preventivo, el proyecto fomenta el respeto y fortalece en los estudiantes la empatía, el autocontrol y la comunicación." },
      { numero: "2", titulo: "Inclusión y acompañamiento", descripcion: "Se brinda acompañamiento pastoral a estudiantes en dificultad, ofreciendo contención emocional y guía hacia la superación personal." },
      { numero: "3", titulo: "Servicio a la comunidad", descripcion: "La pastoral promueve solidaridad mediante donaciones, becas técnicas y acciones que transforman vidas y fortalecen el compromiso social." },
      { numero: "4", titulo: "Impacto en la comunidad", descripcion: "Las acciones pastorales mejoraron la convivencia escolar, redujeron la agresividad y fortalecieron la prevención y participación estudiantil." },
    ],
  },

  modernizacion: {
    titulo: "Modernización Tecnológica",
    descripcion: "En 2024, se implementó una plataforma tecnológica integral que automatiza los principales procesos de nuestras instituciones educativas. Esta herramienta optimiza la gestión académica, financiera, administrativa, mercadeo y de comunicaciones, garantizando eficiencia y accesibilidad. Con esta modernización, más de 31.000 estudiantes y sus familias se benefician de un sistema ágil, alineado con las mejores prácticas educativas.",
    estudiantesBeneficiados: 31000,
    foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/seccion-tecnologia1.webp",
  },

  donantesDetalle: [
    { nombre: "Personas Naturales", monto: 150000000 },
    { nombre: "Aguablanca e.V Hilfe Kolumbianische Kinder", monto: 109823420, logo: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/Logo-Aguablanca_rgb-1024x341.webp" },
    { nombre: "F. Solidaria Arquidiocesana", monto: 12999500, logo: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/logosolidaria@2x-1024x263.webp" },
    { nombre: "Fundación José Gers", monto: 5000000, logo: "/images/logo_fundacion_ger.png" },
    { nombre: "Bouharb Agencia de Seguros", monto: 858000, logo: "https://bouharbseguros.com/wp-content/uploads/2021/09/Diseno-sin-titulo-6.png" },
  ],

  alianzasEstrategicas: [
    {
      titulo: "Banco de Alimentos",
      descripcion: "La Fundación Santa Isabel de Hungría mantiene alianza estratégica con el Banco de Alimentos, para recibir donaciones (alimentos, kits de aseo, computadores) que benefician a la población vulnerable de nuestra comunidad educativa. Esta colaboración fortalece nuestro compromiso con el bienestar y desarrollo de quienes más lo necesitan, garantizando el acceso a recursos esenciales para su salud y calidad de vida.",
      monto: 852930400,
    },
    {
      titulo: "Aportes de Personas Naturales",
      descripcion: "La Fundación ha recibido por parte de personas naturales equipos tecnológicos (video beam y computadores portátiles). Gracias a su valiosa contribución, hemos podido mejorar nuestros servicios educativos. Estos recursos han sido de gran apoyo para alcanzar nuestras metas y brindar un mejor servicio a los estudiantes.",
      monto: 120321000,
    },
    {
      titulo: "Computadores Para Educar",
      descripcion: "A través del programa Computadores Para Educar, el Ministerio de Educación fortalece la labor de los docentes en nuestros colegios mediante la donación de computadores portátiles, brindándoles herramientas tecnológicas que mejoran la calidad del aprendizaje. Esta iniciativa permite avanzar en la innovación pedagógica y ofrecer a los estudiantes una formación más dinámica y enriquecedora.",
    },
  ],

  pdfs: [
    { nombre: "Informe de Gestión 2024", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/1.-FESIH-IMPACTO-SOCIAL-2024.pdf" },
    { nombre: "Estados Financieros Corte 31 Dic. 2024", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/2.-FESIH-ESTADOS-FINANCIEROS-2024-2023.pdf" },
    { nombre: "ESAL - Certificación Cumplimiento Requisitos 2024", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/3.-ESAL-FISH-Certificacion-Cumplimiento-Requisitos-2024.pdf" },
    { nombre: "Decreto 142 y Decreto 955", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/4.-Fesih-Decreto-142-y-Decreto-955.pdf" },
    { nombre: "Certificado de Cancillería FESIH", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/5.-FESIH-CERTIFICADO-DE-CANCILLERIA.pdf" },
    { nombre: "ESAL - Certificación de Antecedentes 2024", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/6.-ESAL-FISH-Certificacion-de-Antecedentes-2024.pdf" },
    { nombre: "FESIH Certificado WEB 2024", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/12.-FESIH-Certificado-WEB-2024.pdf" },
    { nombre: "Acta Consejo Administración FESIH", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/7.-ACTA-CONSEJO-ADMON-FESIH.pdf" },
    { nombre: "Certificación Cargos Directivos y Gerenciales", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/10.-ESAL-FISH-Certificacion-Cargos-Directivos-y-Gerenciales-2024.pdf" },
    { nombre: "FSIH Memoria Económica 2024", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/11.-FSIH-MEMORIA-ECONOMICA-2024.pdf" },
    { nombre: "ESAL - Certificación Memoria Económica 2024", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/11.1.-ESAL-Certificacion-Memoria-Economica-2024-1.pdf" },
  ],
};

// ─── FAUU 2024 ───────────────────────────────────────────────────────────────

const FAUU_2023 = INFORME_2023.FAUU;

const FAUU: Fundacion2024 = {
  // ── Reused sections from 2023 (Misión, Visión, Ubicación, Demografía) ──
  ...FAUU_2023,

  // ── 2024 institutional intro ──
  textoIntroductorio: TEXTO_INTRO_2024,

  // ── Updated 2024 imagery ──
  heroImage: FAUU_2023.heroImage,
  horizonteFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/informe-valores-auu-2024.webp",
  hombresFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/informe-genero-ninos-auu.webp",
  mujeresFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/04/estudiantes_sfj_arquidiocesano1.webp",
  rendicionFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/conformacion-foto.webp",

  // ── Updated 2024 financial data ──
  ingresosDetalle: [
    { label: "Servicios Educativos", monto: 17245438338, color: "#BB1F22" },
    { label: "Otros Ingresos", monto: 602874079, color: "#D4A843" },
    { label: "Donaciones", monto: 207551105, color: "#E8A838" },
  ],

  rendicion: {
    ingresos: {
      titulo: "Ingresos 2024",
      subtitulo: "Composición de los recursos financieros",
      descripcion: RENDICION_TRANSPARENCIA_2024,
    },
    nomina: {
      titulo: "Inversión Talento Humano",
      subtitulo: "Balance Institucional",
      foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/talnetohj.webp",
      descripcion: "La inversión en nómina es clave para asegurar el éxito de los programas educativos y sociales de la Fundación. Desde la contratación de personal cualificado, como docentes, administradores y personal de apoyo, hasta su capacitación continua, se garantiza un equipo competente y alineado con la misión de la Fundación. Invertir en la formación y bienestar del personal no solo mejora su desempeño, sino que fortalece el ambiente laboral, incrementando la motivación y la calidad educativa.",
      monto: 12199222805,
    },
    academica: {
      titulo: "Inversión Académica",
      subtitulo: "Balance Institucional",
      foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/esta-5-scaled.webp",
      descripcion: "La inversión académica se destina al desarrollo y mejora de los programas educativos, la adquisición de materiales didácticos y tecnológicos, así como el fortalecimiento de la infraestructura educativa. Esto incluye la actualización constante de los métodos pedagógicos y la implementación de nuevas tecnologías para enriquecer la experiencia educativa de los estudiantes.",
      monto: 841694183,
      detalle: ["Material Educativo", "Pruebas Diagnósticas"],
    },
    bienestarPastoral: {
      titulo: "Inversión Pastoral",
      subtitulo: "Balance Institucional",
      foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/pastoralll.webp",
      descripcion: "En la Fundación Alberto Uribe Urdaneta, el equipo de Gestión Pastoral lidera iniciativas transformadoras que enriquecen nuestra comunidad educativa. Nos centramos en fomentar el bienestar integral, promoviendo no solo el desarrollo académico, sino también el crecimiento personal y espiritual de nuestros docentes, personal administrativo y estudiantes, asegurando un ambiente educativo pleno y armónico.",
      monto: 136988000,
    },
    mejoramientoAmbientes: {
      titulo: "Infraestructura",
      subtitulo: "Mejoramiento de Ambientes Escolares",
      foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/infraestructura4.webp",
      descripcion: "Garantizar espacios seguros y adecuados es fundamental para el bienestar y el desempeño de nuestra comunidad educativa. Durante el 2024, se realizaron mejoras y mantenimientos en nuestras instalaciones, enfocados en la renovación de baños, cubiertas, techos, pisos y zonas escolares, así como en mantenimientos generales. Estas inversiones fortalecen la calidad del entorno escolar, proporcionando espacios funcionales, seguros y confortables para estudiantes y colaboradores, cumpliendo además con las normas técnicas vigentes.",
      monto: 638019469,
    },
    donantes: {
      titulo: "Donantes 2024",
      descripcion: "La Fundación Educativa Alberto Uribe Urdaneta recibió en el año 2024 donaciones por valor de $207.551.105. Estas donaciones han sido destinadas al desarrollo de nuestra actividad educativa.",
      monto: 207551105,
    },
  },

  // ── New 2024 sections ──
  descuentosOtorgados: {
    titulo: "Descuentos Otorgados",
    descripcion: "Con el objetivo de mantener nuestra población y considerando la necesidad de las familias de nuestra comunidad en las que muchas de ellas dependen de trabajos informales, ofrecemos descuentos en los costos educativos permitiendo que los niños y niñas de las comunas más vulnerables tengan acceso a una educación de calidad.",
    total: 583362051,
    items: [
      { label: "Subsidios Educativos", monto: 306438673 },
      { label: "Estudiantes Nuevos", monto: 181557261 },
      { label: "Pagos Anticipados", monto: 46352080 },
      { label: "Reconocimiento Académico", monto: 5069748 },
      { label: "Grupos Familiares", monto: 34666309 },
      { label: "Hijos de Colaboradores", monto: 9277980 },
    ],
  },

  mobiliario: {
    titulo: "Mobiliario",
    subtitulo: "Balance Institucional",
    foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/seccion-mobiliario.webp",
    descripcion: "Para garantizar un buen proceso de aprendizaje, se realizan inversiones permanentes en la actualización del mobiliario, proporcionando confort tanto a nuestros estudiantes como a nuestros colaboradores. Durante el año 2024, se llevó a cabo la renovación de pupitres, sillas, escritorios, tableros, ventiladores y muebles administrativos.",
    monto: 78886059,
  },

  herramientasTecnologicas: {
    titulo: "Herramientas Tecnológicas",
    subtitulo: "Balance Institucional",
    foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/seccion-tecnologia2.webp",
    descripcion: "Para el eficaz desarrollo de los procesos organizacionales, se invierte en herramientas tecnológicas que optimizan el trabajo, agilizando tareas, fortaleciendo la comunicación y permitiendo un mejor desempeño. Las inversiones en computadores, video proyector, software, licencias, audiovisuales y demás herramientas tecnológicas aseguran que cada Institución Educativa cuente con los recursos necesarios para brindar un servicio de calidad.",
    monto: 223162416,
  },

  impactoPastoral: {
    titulo: "Impacto y transformación en la comunidad educativa",
    descripcion: "La línea pastoral de capellanía tiene un impacto social significativo, centrado en el acompañamiento a la comunidad educativa, la celebración de la vida sacramental y la atención a padres de familia, colaboradores y estudiantes. Su labor no solo fortalece la dimensión espiritual, sino que también contribuye a la construcción de un entorno educativo basado en la solidaridad, la convivencia pacífica y el crecimiento personal.",
    foto: "/images/impacto-feauu-2024.jpg",
    estudiantesImpactados: 800,
    actividades: 40,
    items: [
      { numero: "1", titulo: "Convivencia Escolar y Cultura de Paz", descripcion: "Con enfoque preventivo, el proyecto fomenta el respeto y fortalece en los estudiantes la empatía, el autocontrol y la comunicación." },
      { numero: "2", titulo: "Inclusión y acompañamiento", descripcion: "Se brinda acompañamiento pastoral a estudiantes en dificultad, ofreciendo contención emocional y guía hacia la superación personal." },
      { numero: "3", titulo: "Servicio a la comunidad", descripcion: "La pastoral promueve solidaridad mediante donaciones, becas técnicas y acciones que transforman vidas y fortalecen el compromiso social." },
      { numero: "4", titulo: "Impacto en la comunidad", descripcion: "Las acciones pastorales mejoraron la convivencia escolar, redujeron la agresividad y fortalecieron la prevención y participación estudiantil." },
    ],
  },

  modernizacion: {
    titulo: "Modernización Tecnológica",
    descripcion: "En 2024, se implementó una plataforma tecnológica integral que automatiza los principales procesos de nuestras instituciones educativas. Esta herramienta optimiza la gestión académica, financiera, administrativa, mercadeo y de comunicaciones, garantizando eficiencia y accesibilidad. Con esta modernización, más de 6.000 estudiantes y sus familias se benefician de un sistema ágil, alineado con las mejores prácticas educativas.",
    estudiantesBeneficiados: 6000,
    foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/seccion-tecnologia2.webp",
  },

  donantesDetalle: [
    { nombre: "Personas Naturales", monto: 150000000 },
    { nombre: "Arquidiócesis de Cali", monto: 22316105, logo: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2023/09/cropped-LogoWeb.webp" },
    { nombre: "F. Solidaria Arquidiocesana", monto: 35235000, logo: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/logosolidaria@2x.webp" },
  ],

  alianzasEstrategicas: [
    {
      titulo: "Banco de Alimentos",
      descripcion: "La Fundación Alberto Uribe Urdaneta mantiene alianza estratégica con el Banco de Alimentos, para recibir donaciones (alimentos y kits de aseo) que benefician a la población vulnerable de nuestra comunidad educativa. Esta colaboración fortalece nuestro compromiso con el bienestar y desarrollo de quienes más lo necesitan, garantizando el acceso a recursos esenciales para su salud y calidad de vida.",
      monto: 350541600,
    },
    {
      titulo: "Aportes de Personas Naturales",
      descripcion: "La Fundación ha recibido por parte de personas naturales equipos tecnológicos (video proyectores). Gracias a su valiosa contribución, hemos podido mejorar nuestros servicios educativos. Estos recursos han sido de gran apoyo para alcanzar nuestras metas y brindar un mejor servicio a los estudiantes.",
    },
    {
      titulo: "Fundación Solidaria Arquidiocesana",
      descripcion: "La Fundación Solidaria Arquidiocesana en el desarrollo de su obra social aporta en el fortalecimiento de la educación y genera un impacto positivo en la comunidad estudiantil. Gracias a esta alianza, hemos logrado mejorar espacios, potenciar el aprendizaje y ofrecer a nuestros niños y jóvenes herramientas que les permitirán construir un mejor futuro.",
      monto: 35235000,
      logo: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/logosolidaria@2x.webp",
    },
  ],

  pdfs: [
    { nombre: "Informe de Gestión 2024", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/1.-FEAUU-IMPACTO-SOCIAL-2024.pdf" },
    { nombre: "Estados Financieros Corte 31 Dic. 2024", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/2.-FEAUU-ESTADOS-FINANCIEROS-2024-2023.pdf" },
    { nombre: "ESAL - Certificación Cumplimiento Requisitos 2024", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/3.-ESAL-FAU-Certificacion-Cumplimiento-Requisitos-2024.pdf" },
    { nombre: "Decreto 140 y Decreto 954", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/4.-Feauu-Decreto-140-y-Decreto-954.pdf" },
    { nombre: "Certificado de Cancillería FEAUU", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/5.-FEAUU-CERTIFICADO-DE-CANCILLERIA.pdf" },
    { nombre: "ESAL - Certificación de Antecedentes 2024", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/6.-ESAL-FAU-Certificacion-de-Antecedentes-2024.pdf" },
    { nombre: "FEAUU Certificado WEB 2024", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/12.-FEAUU-Certificado-WEB-2024.pdf" },
    { nombre: "Acta Consejo Administración FEAUU", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/7.-ACTA-CONSEJO-ADMON.-FEAUU.pdf" },
    { nombre: "Certificación Cargos Directivos y Gerenciales", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/10.-ESAL-FAU-Certificacion-Cargos-Directivos-y-Gerenciales-2024.pdf" },
    { nombre: "FAU Memoria Económica 2024", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/11.-FAU-MEMORIA-ECONOMICA-2024.pdf" },
    { nombre: "ESAL - Certificación Memoria Económica 2024", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/06/11.1.-ESAL-Certificacion-Memoria-Economica-2024.pdf" },
  ],
};

// ─── Export ──────────────────────────────────────────────────────────────────

export const INFORME_2024: Record<string, Fundacion2024> = {
  FESIH,
  FAUU,
};

// Re-export shared types for convenience
export type { Fundacion2023, RendicionItem, IngresoItem, DonanteItem };
