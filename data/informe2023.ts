// ─── 2023 Social Management Report Data ──────────────────────────────────────

export interface IngresoItem {
  label: string;
  monto: number;
  color: string;
}

export interface DonanteItem {
  nombre: string;
  monto: number;
  logo?: string;
}

export interface RendicionItem {
  titulo: string;
  subtitulo?: string;
  descripcion: string;
  foto?: string;
  monto?: number;
  detalle?: string[];
  // Personnel breakdown (nómina)
  maestros?: number;
  administrativos?: number;
  serviciosGenerales?: number;
  // Raciones
  raciones?: number;
}

export interface Fundacion2023 {
  sigla: string;
  nombre: string;
  heroImage?: string;
  brandColor?: string;

  // Intro
  textoIntroductorio: string;
  directorNombre: string;
  directorFoto?: string;

  // Reseña
  resenaHistorica: string;
  resenaFoto?: string;
  decretoArzobispal: string;
  nit: string;
  anioCreacion: number;

  // Horizonte
  mision: string;
  vision: string;
  horizonteFoto?: string;

  // Ubicacion
  ubicaciones: { comuna: string; colegios: string[] }[];
  mapaUrl?: string;

  // Caracterización
  totalEstudiantes: number;
  totalColegios: number;
  hombres?: number;
  mujeres?: number;
  afrodescendientes?: number;
  mestizos?: number;
  indigenas?: number;
  otrosEtnia?: number;

  // Rendición de cuenta
  rendicionFoto?: string;
  ingresosDetalle?: IngresoItem[];
  rendicion: {
    ingresos: RendicionItem;
    nomina: RendicionItem;
    academica: RendicionItem;
    apoyoVulnerable?: RendicionItem;
    bienestarPastoral: RendicionItem;
    mejoramientoAmbientes: RendicionItem;
    dotacionInformatica?: RendicionItem;
    racionesAlimentarias?: RendicionItem;
    donantes: RendicionItem;
  };
  donantesDetalle?: DonanteItem[];

  // Documentos
  pdfs: { nombre: string; href: string }[];
}

// ─── Shared intro text ───────────────────────────────────────────────────────

const TEXTO_INTRO = `La filosofía ha discurrido ampliamente sobre la necesidad de hacer un ejercicio reflexivo de pensarnos a nosotros mismos para descubrir lo que somos y tejer el futuro. En ese sentido, la reflexión sobre uno mismo siempre implica aprender a mirar: aprender a observarnos a nosotros mismos sin prisas ni prejuicios, pero también con sinceridad y compasión.

De alguna manera, y si se me permite la analogía, quizá poco refinada para los más intelectuales, la escritura de un balance de impacto social es un aprender a mirarnos porque nos proporciona la ocasión privilegiada para hacer una reflexión retrospectiva sobre lo que hemos sido, lo que somos y lo que queremos llegar a ser.

Construir un informe de balance de impacto social es retador, en particular, porque la educación es un acto de siembra cuyas raíces se extienden por mucho tiempo debajo de la tierra antes de emerger y dar flores y frutos.

De esta forma, el impacto social de nuestras acciones por definición no siempre puede ser medido, quizá solamente advertido. De eso nos damos cuenta cuando años después, caminando por alguna calle, nos encontramos a quienes en algún momento fueron nuestros estudiantes, cambiados, adultos, con sus familias y nos expresan su agradecimiento profundo por las enseñanzas y el tiempo que una vez compartimos.

Como Director Ejecutivo quisiera mencionar que las siguientes páginas son un intento honesto de mirarnos a nosotros mismos, de contar la historia de quienes hemos sido durante el 2023, que a su vez implica la historia de lo que hemos sido desde que somos fundaciones educativas arquidiocesanas.

Quisiera también recalcar que le apuntamos al agradecimiento de nuestros estudiantes y sus familias como un medidor más certero de nuestro impacto en sus vidas.`;

const RENDICION_TRANSPARENCIA = `La transparencia en el manejo de las cuentas es crucial para las fundaciones sin ánimo de lucro porque garantiza la confianza de los donantes, colaboradores y la comunidad en general. La divulgación clara y precisa de la información financiera ayuda a demostrar el uso adecuado de los recursos y la efectividad en el cumplimiento de los objetivos sociales, fortaleciendo así la credibilidad y la legitimidad de la organización.

Para las Fundaciones Educativas Arquidiocesanas la transparencia es crucial porque se relaciona profundamente con las convicciones espirituales que orientan su actuar: tomar el evangelio de Jesús como ejemplo de acción supone la necesidad de hacer un ejercicio coherente.`;

// ─── FESIH ───────────────────────────────────────────────────────────────────

const FESIH: Fundacion2023 = {
  sigla: "FESIH",
  nombre: "Fundación Educativa Santa Isabel de Hungría",
  heroImage: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/07/cc120a2a-79ae-42cd-b5ec-183f877980b4-scaled-1.webp",

  textoIntroductorio: TEXTO_INTRO,
  directorNombre: "Raúl Darío Céspedes Loaiza",
  directorFoto: "/images/director-ejecutivo.png",

  resenaHistorica: "La Fundación Educativa Santa Isabel de Hungría fue fundada por la Arquidiócesis de Cali como resultado de una iniciativa visionaria liderada por Monseñor Juan Francisco Sarasti Jaramillo. Su constitución se llevó a cabo mediante el Decreto Arzobispal No. 142, emitido el 23 de diciembre de 2004. Desde su creación en 2004, la Fundación ha transformado vidas, convirtiéndose en una pieza fundamental en el panorama educativo de la ciudad de Cali.",
  resenaFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/hola-copia-1024x446.webp",
  decretoArzobispal: "No. 142",
  nit: "800.256.881-3",
  anioCreacion: 2004,

  mision: "Las Fundación Educativa Santa Isabel de Hungría pertenece a la Arquidiócesis de Cali. Es una organización que administra instituciones educativas propias o confiadas a su cuidado y gestionan con efectividad los recursos, especialmente los del talento humano, bajo los principios de la Iglesia católica en su misión social de educar.",
  vision: "Ser reconocidos a nivel territorial por gestionar una oferta educativa diversa, de calidad y sostenible a lo largo del tiempo para aportar en la transformación social.",
  horizonteFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/Diseno-sin-titulo.webp",

  ubicaciones: [
    { comuna: "Comuna 1", colegios: ["I.E. Llano Verde sede Aguacatal"] },
    { comuna: "Comuna 6", colegios: ["Centro Docente Parroquial San Marcos", "I.E. Llano Verde sede Calimio Norte", "I.E. Llano Verde sede San Luis"] },
    { comuna: "Comuna 7", colegios: ["Colegio Santa Isabel de Hungría Alfonso López", "Colegio Santa Luisa de Marillac"] },
    { comuna: "Comuna 13", colegios: ["I.E. Llano Verde sede Comuneros"] },
    { comuna: "Comuna 14", colegios: ["Colegio Parroquial San Francisco Javier - Orquídeas", "I.E. Llano Verde Bartolomé Mitre", "I.E. Llano Verde Sede Colegio La Providencia"] },
    { comuna: "Comuna 15", colegios: ["I.E. Llano Verde Sede Principal"] },
    { comuna: "Comuna 16", colegios: ["Colegio Parroquial San Joaquín"] },
    { comuna: "Comuna 20", colegios: ["Colegio de Nuestra Señora de Chiquinquirá", "Colegio Arquidiocesano Juan Pablo II"] },
    { comuna: "Comuna 21", colegios: ["Colegio Compartir", "I.E. Llano Verde Sede San Felipe", "I.E. Llano Verde Sede Calimio Desepaz", "I.E. Llano Verde Sede Nariño", "I.E. Llano Verde Sede Invicali Desepaz", "I.E. Nelson Garcés Vernaza"] },
    { comuna: "Corregimiento Hormiguero", colegios: ["Colegio Parroquial San Joaquín II"] },
  ],
  mapaUrl: "/images/mapasih.svg",

  totalEstudiantes: 24765,
  totalColegios: 21,
  hombres: 11989,
  mujeres: 12776,
  afrodescendientes: 7485,
  mestizos: 14346,
  indigenas: 804,
  otrosEtnia: 2130,

  rendicionFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/sanmarcos.webp",
  ingresosDetalle: [
    { label: "Contratación Estatal", monto: 50604823825, color: "#D4A843" },
    { label: "Servicios Educativos", monto: 6451477825, color: "#E8A838" },
    { label: "Otros Ingresos", monto: 2351873906, color: "#6BBF4E" },
    { label: "Donaciones", monto: 97600406, color: "#D4A843" },
  ],

  rendicion: {
    ingresos: {
      titulo: "Ingresos 2023",
      subtitulo: "Composición de los recursos financieros",
      descripcion: RENDICION_TRANSPARENCIA,
    },
    nomina: {
      titulo: "Inversión en Nómina",
      subtitulo: "Balance Institucional",
      foto: "/images/nomina-fesih-2023.png",
      descripcion: "La inversión en talento humano abarca la contratación y capacitación de personal cualificado, como docentes, administradores y personal de apoyo. Garantizar un equipo competente y motivado es esencial para la calidad y el éxito de los programas educativos y sociales de la fundación.",
      monto: 37802098279,
      maestros: 673,
      administrativos: 71,
      serviciosGenerales: 120,
    },
    academica: {
      titulo: "Inversión Académica",
      subtitulo: "Balance Institucional",
      foto: "/images/academico-fesih-2023.png",
      descripcion: "La inversión académica se destina al desarrollo y mejora de los programas educativos, la adquisición de materiales didácticos y tecnológicos, así como el fortalecimiento de la infraestructura educativa. Esto incluye la actualización constante de los métodos pedagógicos y la implementación de nuevas tecnologías para enriquecer la experiencia educativa de los estudiantes.",
      monto: 3938945280,
      detalle: ["Bibliobanco", "Pruebas Diagnósticos", "Galas Productos Competenciales"],
    },
    apoyoVulnerable: {
      titulo: "Apoyo a Población Vulnerable",
      subtitulo: "Balance Institucional",
      descripcion: "El compromiso de la Fundación con la educación se materializa a través del apoyo integral a los estudiantes en situación de vulnerabilidad. Proporcionamos ayuda en forma de kits escolares, que incluyen maletines, cuadernos y otros materiales esenciales, así como uniformes escolares. Esta iniciativa no solo alivia la carga financiera de las familias, sino que también promueve la igualdad de oportunidades educativas. Nuestro objetivo es asegurar que cada niño tenga acceso a los recursos necesarios para tener éxito en su educación, independientemente de su situación económica. Juntos, estamos construyendo un futuro más brillante para nuestra comunidad.",
      monto: 206607020,
      detalle: ["Kits Educativos", "Uniformes"],
    },
    bienestarPastoral: {
      titulo: "Bienestar Institucional y Pastoral",
      foto: "/images/pastoral-fesih-2023.png",
      descripcion: "Con el fin de brindar un apoyo integral a nuestros colaboradores, hemos reestructurado la Gestión de Bienestar Institucional y Pastoral con un enfoque que supone una visión holística del bienestar, brindando una atención especial a la dimensión espiritual de las personas. La gestión BIP, en estos términos, atiende al cumplimiento de la misión y la identidad de nuestras fundaciones educativas, las cuales forman parte de la familia arquidiocesana.",
      monto: 290417500,
    },
    mejoramientoAmbientes: {
      titulo: "Mejoramiento Ambientes Educativos",
      subtitulo: "Balance Institucional",
      foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/ninas.webp",
      descripcion: "El mejoramiento de los ambientes educativos implica la adecuación y mantenimiento de las instalaciones físicas, la creación de espacios seguros y estimulantes para el aprendizaje, así como la implementación de programas de bienestar y desarrollo integral para los estudiantes. Esta inversión contribuye a crear entornos propicios para el crecimiento y el desarrollo integral de los beneficiarios de la fundación.",
      monto: 735082497,
    },
    dotacionInformatica: {
      titulo: "Dotación - Salas de Informática",
      foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/Imagen-de-WhatsApp-2024-06-19-a-las-15.02.14_853bef11.webp",
      descripcion: "La inversión en dispositivos educativos como equipos de escritorio y portátiles facilita significativamente el aprendizaje. No solo permite el desarrollo de habilidades digitales esenciales en el mundo moderno, sino que también fomenta la creatividad e innovación entre nuestros estudiantes. Esta infraestructura tecnológica es fundamental para preparar a la población estudiantil para los retos del futuro, equipándolos con las herramientas necesarias para sobresalir académica y profesionalmente.",
      monto: 339051001,
    },
    racionesAlimentarias: {
      titulo: "Raciones Alimentarias",
      subtitulo: "Balance Institucional",
      foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/Imagen-de-WhatsApp-2024-03-13-a-las-18.27.20_d4f9c2b1.webp",
      descripcion: "Durante el período lectivo escolar 2023, se proporcionaron raciones como parte del complemento alimentario. Este esfuerzo ha sido fundamental, ya que estas raciones representan el 20% de las necesidades calóricas diarias recomendadas para un ser humano. Es importante destacar que esta contribución ha tenido un impacto en el bienestar de los estudiantes, principalmente en los colegios de la comuna 15 y 21 proporcionándoles nutrientes esenciales necesarios para su desarrollo físico y cognitivo.",
      raciones: 843552,
    },
    donantes: {
      titulo: "Donantes 2023",
      descripcion: "La Fundación Educativa Santa Isabel de Hungría recibió en el año 2023 donaciones por valor de $97.600.406. Estas donaciones han sido destinadas al desarrollo de nuestra actividad educativa. (La donación de la Universidad Autónoma de Occidente está expresada en una cifra simbólica representada en mobiliario escolar)",
      monto: 97600406,
    },
  },

  donantesDetalle: [
    { nombre: "Aguablanca E V Hilfe", monto: 47600190, logo: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/Logo-Aguablanca_rgb-1024x341.webp" },
    { nombre: "Fundación Solidaria Arquidiocesana", monto: 50000000, logo: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/logosolidaria@2x-1024x263.webp" },
    { nombre: "Universidad Autónoma de Occidente", monto: 216, logo: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/UAO-logo.webp" },
  ],

  pdfs: [
    { nombre: "Informe de Gestión 2023", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/1.-Informe-de-Impacto-Social-2023-Sih.pdf" },
    { nombre: "Estados Financieros Corte 31 Dic. 2023", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/2.-Fesih-Estados-Financieros-Corte-31-de-Diciembre-de-2023-2022.pdf" },
    { nombre: "ESAL - Certificación Cumplimiento Requisitos 2023", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/3.-ESAL-FISH-Certificacion-Cumplimiento-Requisitos-2023.pdf" },
    { nombre: "Decreto 142 y Decreto 955", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/4.-Fesih-Decreto-142-y-Decreto-955.pdf" },
    { nombre: "Certificado de Cancillería FSIH Junio 2024", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/5.-CERTIFICADO-DE-CANCILLERIA-FSIH-JUNIO-2024.pdf" },
    { nombre: "ESAL - Certificación de Antecedentes 2023", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/6.-ESAL-FISH-Certificacion-de-Antecedentes-2023.pdf" },
    { nombre: "FESIH Certificado WEB 2023", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/12.-FESIH-Certificado-WEB-2023.pdf" },
    { nombre: "Acta SIH-042-2024", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/7.-ACTA-SIH-042-2024.pdf" },
    { nombre: "Certificación Cargos Directivos y Gerenciales", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/10.-ESAL-FISH-Certificacion-Cargos-Directivos-y-Gerenciales-2023.pdf" },
    { nombre: "FSIH Memoria Económica 2023", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/11.-FSIH-MEMORIA-ECONOMICA-2023.pdf" },
    { nombre: "ESAL - Certificación Memoria Económica 2023", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/11.1.-ESAL-Certificacion-Memoria-Economica-2023-1.pdf" },
  ],
};

// ─── FAUU ───────────────────────────────────────────────────────────────────

const FAUU: Fundacion2023 = {
  sigla: "FAUU",
  nombre: "Fundación Educativa Alberto Uribe Urdaneta",
  brandColor: "#BB1F22",
  heroImage: "/images/banner-feauu.webp",

  textoIntroductorio: TEXTO_INTRO,
  directorNombre: "Raúl Darío Céspedes Loaiza",
  directorFoto: "/images/director-ejecutivo.png",

  resenaHistorica: "La Fundación Educativa Alberto Uribe Urdaneta fue fundada por la Arquidiócesis de Cali como resultado de una iniciativa visionaria liderada por Monseñor Juan Francisco Sarasti Jaramillo. Su constitución se llevó a cabo mediante el Decreto Arzobispal No. 140, emitido el 23 de diciembre de 2004. Desde su creación en 2004, la Fundación ha transformado vidas, convirtiéndose en una pieza fundamental en el panorama educativo de la ciudad de Cali y los municipios donde hace presencia con sus Instituciones educativas.",
  resenaFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/hola-copia-1024x446.webp",
  decretoArzobispal: "No. 140",
  nit: "900.005.910-5",
  anioCreacion: 2004,

  mision: "La Fundación Educativa Alberto Uribe Urdaneta pertenece a la Arquidiócesis de Cali. Es una organización que administra instituciones educativas propias o confiadas a su cuidado y gestiona con efectividad los recursos, especialmente los del talento humano, bajo los principios de la Iglesia católica en su misión social de educar.",
  vision: "Ser reconocidos a nivel territorial por gestionar una oferta educativa diversa, de calidad y sostenible a lo largo del tiempo para aportar en la transformación social.",
  horizonteFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/nina-horizonte-institu.webp",

  ubicaciones: [
    { comuna: "Comuna 4", colegios: ["Instituto Comercial Arquidiocesano"] },
    { comuna: "Comuna 5", colegios: ["Colegio Parroquial Nuestra Señora de los Andes"] },
    { comuna: "Comuna 8", colegios: ["Colegio Mayor Santiago de Cali"] },
    { comuna: "Comuna 10", colegios: ["Colegio Parroquial San Juan Bautista"] },
    { comuna: "Comuna 11", colegios: ["Colegio Mayor Santiago de Cali", "Colegio Parroquial Santiago Apóstol"] },
    { comuna: "Comuna 12", colegios: ["Colegio Parroquial Nuestra Señora de Guadalupe"] },
    { comuna: "Comuna 16", colegios: ["Colegio Santa Isabel de Hungría sede Ciudad 2000"] },
    { comuna: "Yumbo", colegios: ["Institución Educativa San Francisco Javier"] },
    { comuna: "Jamundí", colegios: ["Institución Educativa Nuestra Señora del Rosario"] },
  ],
  mapaUrl: "/images/mapauu.svg",

  totalEstudiantes: 6441,
  totalColegios: 11,
  hombres: 3172,
  mujeres: 3269,
  afrodescendientes: 606,
  mestizos: 5111,
  indigenas: 124,
  otrosEtnia: 599,

  rendicionFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/ninos2-1.webp",

  ingresosDetalle: [
    { label: "Servicios Educativos", monto: 14974595457, color: "#D4A843" },
    { label: "Otros Ingresos", monto: 1768680268, color: "#E8A838" },
    { label: "Donaciones", monto: 124184020, color: "#BB1F22" },
  ],

  rendicion: {
    ingresos: {
      titulo: "Ingresos 2023",
      subtitulo: "Composición de los recursos financieros",
      descripcion: RENDICION_TRANSPARENCIA,
    },
    nomina: {
      titulo: "Inversión en Nómina",
      subtitulo: "Balance Institucional",
      foto: "/images/nomina-2023.png",
      descripcion: "La inversión en talento humano abarca la contratación y capacitación de personal cualificado, como docentes, administradores y personal de apoyo. Garantizar un equipo competente y motivado es esencial para la calidad y el éxito de los programas educativos y sociales de la fundación.",
      monto: 11507823304,
      maestros: 536,
      administrativos: 15,
      serviciosGenerales: 53,
    },
    academica: {
      titulo: "Inversión Académica",
      subtitulo: "Balance Institucional",
      foto: "/images/academica-2023.png",
      descripcion: "La inversión académica se destina al desarrollo y mejora de los programas educativos, la adquisición de materiales didácticos y tecnológicos, así como el fortalecimiento de la infraestructura educativa. Esto incluye la actualización constante de los métodos pedagógicos y la implementación de nuevas tecnologías para enriquecer la experiencia educativa de los estudiantes.",
      monto: 745519594,
      detalle: ["Bibliobanco", "Pruebas Diagnósticas", "Galas Productos Competenciales"],
    },
    bienestarPastoral: {
      titulo: "Bienestar Institucional y Pastoral",
      subtitulo: "Balance Institucional",
      foto: "/images/pastoral-2023.png",
      descripcion: "Con el fin de brindar un apoyo integral a nuestros colaboradores, hemos reestructurado la Gestión de Bienestar Institucional y Pastoral con un enfoque que supone una visión holística del bienestar, brindando una atención especial a la dimensión espiritual de las personas. La gestión BIP, en estos términos, atiende al cumplimiento de la misión y la identidad de nuestras fundaciones educativas, las cuales forman parte de la familia arquidiocesana.",
      monto: 120000634,
    },
    mejoramientoAmbientes: {
      titulo: "Mejoramiento Ambientes Educativos",
      subtitulo: "Balance Institucional",
      foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/Imagen8.webp",
      descripcion: "El mejoramiento de los ambientes educativos implica la adecuación y mantenimiento de las instalaciones físicas, la creación de espacios seguros y estimulantes para el aprendizaje, así como la implementación de programas de bienestar y desarrollo integral para los estudiantes. Esta inversión contribuye a crear entornos propicios para el crecimiento y el desarrollo integral de los beneficiarios de la fundación.",
      monto: 100844430,
    },
    donantes: {
      titulo: "Donantes 2023",
      descripcion: "La Fundación Educativa Alberto Uribe Urdaneta recibió en el año 2023 donaciones por valor de $141.184.020. Estas donaciones han sido destinadas al desarrollo de nuestra actividad educativa. (La donación de la Universidad Autónoma de Occidente está expresada en una cifra simbólica representada en mobiliario escolar)",
      monto: 141184020,
    },
  },

  donantesDetalle: [
    { nombre: "Arquidiócesis de Cali", monto: 77683895, logo: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2023/09/cropped-LogoWeb.webp" },
    { nombre: "Parroquia Nuestra Señora de los Andes", monto: 13500000, logo: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/Recurso-1@2x.webp" },
    { nombre: "Fundación Solidaria Arquidiocesana", monto: 50000000, logo: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/logosolidaria@2x.webp" },
    { nombre: "Universidad Autónoma de Occidente", monto: 125, logo: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/UAO-logo.webp" },
  ],

  pdfs: [
    { nombre: "Informe de Gestión 2023", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/10/URDANETA-INFORME-2023.pdf" },
    { nombre: "Estados Financieros Corte 31 Dic. 2023", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/2.-Feauu-Estados-Financieros-Corte-31-de-Diciembre-de-2023-2022.pdf" },
    { nombre: "ESAL - Certificación Cumplimiento Requisitos 2023", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/3.-ESAL-FAU-Certificacion-Cumplimiento-Requisitos-2023.pdf" },
    { nombre: "Decreto 140 y Decreto 954", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/4.-Feauu-Decreto-140-y-Decreto-954.pdf" },
    { nombre: "Certificado de Cancillería FEAUU", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/5.-CERTIFICADO-DE-CANCILLERIA-FAUU-JUNIO-2024.pdf" },
    { nombre: "ESAL - Certificación de Antecedentes 2023", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/6.-ESAL-FAU-Certificacion-de-Antecedentes-2023.pdf" },
    { nombre: "Acta AUU-042-2024", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/7.-ACTA-AUU-042-2024.pdf" },
    { nombre: "Certificación Cargos Directivos y Gerenciales", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/10.-ESAL-FAU-Certificacion-Cargos-Directivos-y-Gerenciales-2023.pdf" },
    { nombre: "FAU Memoria Económica 2023", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/11.-FAU-MEMORIA-ECONOMICA-2023.pdf" },
    { nombre: "ESAL - Certificación Memoria Económica 2023", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/11.1.-ESAL-Certificacion-Memoria-Economica-2023.pdf" },
    { nombre: "FEAUU Certificado WEB 2023", href: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/12.-FEAUU-Certificado-WEB-2023.pdf" },
  ],
};

// ─── Export ──────────────────────────────────────────────────────────────────

export const INFORME_2023: Record<string, Fundacion2023> = {
  FESIH,
  FAUU,
};
