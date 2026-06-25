import type { Fundacion2024, RendicionItem } from "./informe2024";

export interface Fundacion2025 extends Fundacion2024 {
  valores?: { nombre: string; descripcion: string }[];
  principios?: string[];
  blancos?: number;
  noSeIdentifica?: number;
  salasDeSistemas?: RendicionItem;
  impactoPastoralEstudiantesAnterior?: number;
  impactoPastoralActividadesAnterior?: number;
}

const RENDICION_TRANSPARENCIA_2025 = `La transparencia en la rendición de cuentas es un principio fundamental, y su relevancia se amplifica en el ámbito educativo, especialmente en las Fundaciones Educativas Arquidiocesanas. Estas instituciones, al ser responsables de la formación integral de los estudiantes y el uso de recursos destinados a la educación, deben ser modelos de honestidad y claridad en la gestión de los fondos y proyectos.

La transparencia permite que los padres de familia, los estudiantes, los colaboradores y la comunidad en general tengan acceso a información clara y precisa sobre cómo se utilizan los recursos, los logros alcanzados y los desafíos que se presentan. Esta práctica no solo genera confianza, sino que también fortalece la relación entre la Fundación Educativa y los diferentes actores involucrados.`;

const TEXTO_INTRO_2025 = `Durante el año 2025, dar apertura a este informe representa una oportunidad para compartir el sentido profundo de nuestra labor educativa. Las Fundaciones Santa Isabel de Hungría y Alberto Uribe Urdaneta, como parte de la misión social de la Arquidiócesis de Cali, entienden la educación como una forma de reconstruir el tejido social y abrir caminos de paz en nuestros territorios.

En contextos marcados por la exclusión, la violencia y la fragilidad de los vínculos comunitarios, la escuela se convierte en un espacio de acogida, dignificación y esperanza. Por ello, este informe pone en el centro temas como la convivencia, la resiliencia y la resolución de conflictos, entendiendo que educar va más allá de formar académicamente.

Nuestra propia historia institucional ha sido también una historia de resiliencia. Seguimos adelante porque creemos profundamente en el valor transformador de la educación y en su capacidad para generar oportunidades, reconstruir vínculos y aportar a la construcción de una sociedad más humana y solidaria.`;

const FESIH: Fundacion2025 = {
  sigla: "FESIH",
  nombre: "Fundación Educativa Santa Isabel de Hungría",
  brandColor: "#C9A227",
  heroImage: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/poblacion_vulnerable.webp",

  textoIntroductorio: TEXTO_INTRO_2025,
  directorNombre: "Raúl Darío Céspedes Loaiza",
  directorFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/foto_director.webp",

  resenaHistorica: "",
  resenaFoto: "",
  decretoArzobispal: "No. 142",
  nit: "800.256.881-3",
  anioCreacion: 2004,

  mision: "Las Fundaciones Educativas Santa Isabel de Hungría y Alberto Uribe Urdaneta pertenecen a la Arquidiócesis de Cali. Son organizaciones que administran las instituciones educativas propias o confiadas a su cuidado y gestionan con efectividad los recursos, especialmente los del talento humano, bajo los principios de la Iglesia católica en su misión social de educar.",
  vision: "Ser reconocidos a nivel territorial por gestionar una oferta educativa diversa, de calidad y sostenible a lo largo del tiempo para aportar en la transformación social.",
  horizonteFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/03/IMG_3733-1.webp",

  valores: [
    { nombre: "Liderazgo", descripcion: "Destaca la humanidad en las Fundaciones Educativas: servir a otros con los dones divinos." },
    { nombre: "Transparencia", descripcion: "Asegura calidad de vida y un trabajo honesto para proteger la verdad." },
    { nombre: "Responsabilidad", descripcion: "Fortalece la pertenencia y participación, asumiendo los compromisos con madurez." },
    { nombre: "Resiliencia", descripcion: "Reconoce la grandeza interior para impulsar el cambio y crecer." },
  ],
  principios: ["Evangelio", "Dignidad de la persona", "Caridad y servicio", "Justicia Social"],

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

  totalEstudiantes: 24898,
  totalColegios: 21,
  hombres: 12294,
  mujeres: 12604,
  hombresFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/04/estudiantes_sfj_arquidiocesano4.webp",
  mujeresFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/04/20260303_092828-2.webp",
  afrodescendientes: 7051,
  mestizos: 5478,
  blancos: 5463,
  indigenas: 392,
  noSeIdentifica: 6514,

  rendicionFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/rendicion_cuentas22.webp",
  ingresosDetalle: [
    { label: "Contratación Estatal", monto: 57402057673, color: "#D4A843" },
    { label: "Servicios Educativos", monto: 6142477598, color: "#E8A838" },
    { label: "Otros Ingresos", monto: 5621000582, color: "#6BBF4E" },
    { label: "Donaciones", monto: 918458005, color: "#D4A843" },
  ],

  rendicion: {
    ingresos: { titulo: "Ingresos 2025", subtitulo: "Composición de los recursos financieros", descripcion: RENDICION_TRANSPARENCIA_2025 },
    nomina: { titulo: "Inversión Talento Humano", subtitulo: "Balance Institucional", foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/inversion_talento_humano.webp", descripcion: "La inversión en el talento humano representa uno de los pilares fundamentales para el cumplimiento de los objetivos institucionales de la Fundación Educativa. Contar con profesionales comprometidos y altamente capacitados permite garantizar la calidad de los procesos académicos, administrativos y de apoyo que contribuyen al desarrollo integral de los estudiantes y al fortalecimiento de la comunidad educativa. Los recursos destinados a la gestión del talento humano abarcan la vinculación de personal idóneo, el fortalecimiento de sus competencias mediante procesos de formación y actualización, así como iniciativas orientadas a su bienestar y desarrollo profesional. Estas acciones favorecen un ambiente de trabajo positivo, promueven el compromiso institucional y contribuyen al mejoramiento continuo de los servicios educativos ofrecidos.", monto: 46117011140 },
    academica: { titulo: "Inversión Académica", subtitulo: "Balance Institucional", foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/inversion_academica.webp", descripcion: "La inversión académica se destina al desarrollo y mejora de los programas educativos, abarcando material educativo y pruebas diagnósticas.", monto: 4881659265, detalle: ["Material Educativo", "Pruebas Diagnósticas"] },
    apoyoVulnerable: { titulo: "Apoyo a Población Vulnerable", subtitulo: "Balance Institucional", foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/poblacion_vulnerable.webp", descripcion: "La atención a poblaciones en condición de vulnerabilidad forma parte del compromiso social de la Fundación Educativa con la inclusión, la equidad y la garantía del derecho a la educación. Durante la vigencia 2025 se desarrollaron acciones orientadas a apoyar a estudiantes y familias que enfrentan condiciones económicas, sociales o de desplazamiento, facilitando su permanencia y participación activa en los procesos educativos. Entre las estrategias implementadas se encuentra la entrega de kits escolares y otros apoyos que contribuyen a satisfacer necesidades básicas para el desarrollo académico de los estudiantes. Estas iniciativas permiten reducir barreras de acceso a la educación y brindar mejores condiciones para el aprendizaje, especialmente a quienes se encuentran en contextos de mayor vulnerabilidad. A través de estas acciones, la Fundación reafirma su compromiso con la construcción de oportunidades educativas para todos, promoviendo entornos más inclusivos y favoreciendo el desarrollo integral de niños, niñas y adolescentes. De esta manera, se contribuye al fortalecimiento de proyectos de vida y a la generación de condiciones que permitan una participación equitativa en los procesos de formación y crecimiento personal.", monto: 159109858, detalle: ["Kits Escolares", "Uniformes", "Material esencial"] },
    bienestarPastoral: { titulo: "Inversión Pastoral", subtitulo: "Balance Institucional", foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/inversion_pastoral.webp", descripcion: "Durante la vigencia 2025 la labor pastoral continuó impulsando iniciativas dirigidas a estudiantes, docentes, colaboradores y familias, favoreciendo su crecimiento personal, espiritual y comunitario. Estas acciones permitieron fortalecer el sentido de pertenencia institucional, la vivencia de la fe y el desarrollo de competencias socioemocionales que enriquecen los procesos educativos. La Fundación reafirma así su compromiso con una educación integral que, además de la excelencia académica, promueve la formación de personas capaces de aportar positivamente a la transformación de sus entornos y a la construcción de una sociedad más humana, fraterna y solidaria.", monto: 374341345 },
    mejoramientoAmbientes: { titulo: "Infraestructura", subtitulo: "Mejoramiento de Ambientes Escolares", foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/infraestructura.webp", descripcion: "La inversión en infraestructura educativa durante la vigencia 2025 estuvo orientada al mejoramiento y adecuación de espacios que contribuyen al bienestar, la seguridad y el desarrollo integral de los estudiantes. Entre las principales intervenciones realizadas se destacan la construcción y adecuación de cubiertas, el mejoramiento de espacios destinados a la primera infancia, las obras de encerramiento, la adecuación de fachadas y la renovación de baterías sanitarias para los niveles iniciales. Con estas inversiones, la Fundación reafirma su compromiso con el mejoramiento continuo de la infraestructura educativa, garantizando escenarios que cumplen con los estándares requeridos y que contribuyen a una experiencia educativa de mayor calidad para toda la comunidad escolar.", monto: 379073423 },
    donantes: { titulo: "Donantes 2025", descripcion: "La Fundación Educativa Santa Isabel de Hungría recibió en el año 2025 donaciones por valor de:", monto: 918458005 },
  },

  descuentosOtorgados: { titulo: "Descuentos Otorgados", descripcion: "Con el propósito de promover la permanencia estudiantil y garantizar el acceso a una educación de calidad, la Fundación Educativa mantiene una política de descuentos en los costos educativos dirigida a las familias que enfrentan condiciones económicas desafiantes. Esta iniciativa reconoce la realidad social de muchas familias de nuestra comunidad, cuyos ingresos dependen en gran medida de actividades laborales informales o de recursos limitados. Los descuentos otorgados constituyen un mecanismo de apoyo que facilita la continuidad de los procesos formativos de niños, niñas y adolescentes, especialmente en sectores con mayores niveles de vulnerabilidad. De esta manera, la Fundación reafirma su compromiso con la inclusión educativa, la equidad y la generación de oportunidades que contribuyan al desarrollo integral de los estudiantes y sus familias.", total: 3947334533, items: [
    { label: "Subsidios Educativos", monto: 3832163179 },
    { label: "Estudiantes Nuevos", monto: 57887907 },
    { label: "Pagos Anticipados", monto: 23453678 },
    { label: "Reconocimiento Académico", monto: 17415527 },
    { label: "Grupos Familiares", monto: 10201775 },
    { label: "Hijos de Colaboradores", monto: 6212467 },
  ] },

  mobiliario: { titulo: "Mobiliario", subtitulo: "Balance Institucional", foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/mobiliario.webp", descripcion: "Para garantizar un buen proceso de aprendizaje, se realizan inversiones permanentes en la actualización del mobiliario, proporcionando confort tanto a nuestros estudiantes como a nuestros colaboradores. Durante el año 2025 se llevó a cabo la renovación de pupitres, sillas, escritorios, tableros, ventiladores y muebles administrativos. Se fortalece el compromiso institucional con la mejora continua de la infraestructura, lo que tiene un impacto positivo en la calidad del entorno de aprendizaje.", monto: 373532103 },

  herramientasTecnologicas: { titulo: "Herramientas Tecnológicas", subtitulo: "Balance Institucional", foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/herramientas_tecnologicas.webp", descripcion: "Para el eficaz desarrollo de los procesos organizacionales, se invierte en herramientas tecnológicas que optimizan el trabajo, agilizando tareas, fortaleciendo la comunicación y permitiendo un mejor desempeño. Las inversiones en computadores, video proyector, software, licencias, audiovisuales y demás herramientas tecnológicas, aseguran que cada Institución Educativa cuente con los recursos necesarios para brindar un servicio de calidad.", monto: 331152300 },

  impactoPastoral: { titulo: "Impacto y transformación en la comunidad educativa", descripcion: "La línea pastoral de capellanía tiene un impacto social significativo, centrado en el acompañamiento a la comunidad educativa, la celebración de la vida sacramental y la atención a padres de familia, colaboradores y estudiantes.", foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/inversion_pastoral.webp", estudiantesImpactados: 16279, actividades: 3, items: [
    { numero: "1", titulo: "Campaña 'Juntos por la Convivencia'", descripcion: "Basada en el análisis global de indicadores, esta campaña define líneas temáticas prioritarias. Para el presente año, se han abordado tres ejes fundamentales: salud mental, prevención de adicciones y prevención de violencias, problemáticas que afectan de manera transversal a la población estudiantil." },
    { numero: "2", titulo: "Proyectos pedagógicos institucionales", descripcion: "Se promueven iniciativas como la Semana por la Paz (con el proyecto 'Botiquín de la Paz') y la estrategia Etiquetas, desarrolladas en distintos momentos del año, que fortalecen la reflexión colectiva y la construcción de una cultura de paz." },
    { numero: "3", titulo: "Convivencia de estudiantes", descripcion: "Encuentros liderados por los directores de grupo que favorecen el diálogo, la resolución pacífica de conflictos y el trabajo colaborativo. Estos espacios se adaptan a las necesidades particulares de los estudiantes, fortaleciendo el vínculo y la confianza dentro del aula." },
  ]},
  impactoPastoralEstudiantesAnterior: 8363,
  impactoPastoralActividadesAnterior: 0,

  salasDeSistemas: { titulo: "Salas de Sistemas", subtitulo: "Balance Institucional", foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/05/seccion-tecnologia1.webp", descripcion: "La adecuación y fortalecimiento de las salas de sistemas constituye una inversión estratégica para el mejoramiento de los ambientes de aprendizaje en los Colegios Arquidiocesanos. Estos espacios brindan a los estudiantes acceso a herramientas tecnológicas que enriquecen los procesos pedagógicos y favorecen el desarrollo de competencias digitales fundamentales para los retos del mundo actual. Durante el año 2025 las inversiones realizadas en las salas de sistemas reafirmaron el compromiso de la Fundación con la calidad educativa y la innovación, impulsando entornos de aprendizaje más modernos, inclusivos y preparados para responder a las necesidades de la formación integral de nuestros estudiantes.", monto: 91722305 },

  donantesDetalle: [
    { nombre: "F. Solidaria Arquidiocesana", monto: 803171000, logo: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/logosolidaria@2x-1024x263.webp" },
    { nombre: "Aguablanca e.V Hilfe Kolumbianische Kinder", monto: 75169981, logo: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/Logo-Aguablanca_rgb-1024x341.webp" },
    { nombre: "Fundación José Gers", monto: 35073000, logo: "https://web-colarqui.vercel.app/images/logo_fundacion_ger.png" },
    { nombre: "Datecsa S.A.", monto: 4120024, logo: "https://www.datecsa.com/hubfs/Logos/Logo%20Datecsa%20148x46%20PNG.png" },
    { nombre: "Bouharb Agencia de Seguros", monto: 924000, logo: "https://bouharbseguros.com/wp-content/uploads/2021/09/Diseno-sin-titulo-6.png" },
  ],
  alianzasEstrategicas: [],
  pdfs: [] as { nombre: string; href: string }[],
};

const FAUU: Fundacion2025 = {
  sigla: "FAUU",
  nombre: "Fundación Educativa Alberto Uribe Urdaneta",
  brandColor: "#BB1F22",
  heroImage: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/20260416_094657-1.webp",
  textoIntroductorio: TEXTO_INTRO_2025,
  directorNombre: "Raúl Darío Céspedes Loaiza",
  directorFoto: "/images/director-ejecutivo.png",
  resenaHistorica: "",
  resenaFoto: "",
  decretoArzobispal: "No. 140",
  nit: "900.005.910-5",
  anioCreacion: 2004,
  mision: "Las Fundaciones Educativas Santa Isabel de Hungría y Alberto Uribe Urdaneta pertenecen a la Arquidiócesis de Cali. Son organizaciones que administran las instituciones educativas propias o confiadas a su cuidado y gestionan con efectividad los recursos, especialmente los del talento humano, bajo los principios de la Iglesia católica en su misión social de educar.",
  vision: "Ser reconocidos a nivel territorial por gestionar una oferta educativa diversa, de calidad y sostenible a lo largo del tiempo para aportar en la transformación social.",
  horizonteFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/IMG-20260121-WA0058-1.webp",
  valores: [
    { nombre: "Liderazgo", descripcion: "Destaca la humanidad en las Fundaciones Educativas: servir a otros con los dones divinos." },
    { nombre: "Transparencia", descripcion: "Asegura calidad de vida y un trabajo honesto para proteger la verdad." },
    { nombre: "Responsabilidad", descripcion: "Fortalece la pertenencia y participación, asumiendo los compromisos con madurez." },
    { nombre: "Resiliencia", descripcion: "Reconoce la grandeza interior para impulsar el cambio y crecer." },
  ],
  principios: ["Evangelio", "Dignidad de la persona", "Caridad y servicio", "Justicia Social"],
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
  totalEstudiantes: 6242,
  totalColegios: 11,
  hombres: 3096,
  mujeres: 3146,
  hombresFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/20260317_092407-1.webp",
  mujeresFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/20260115_120045-1.webp",
  afrodescendientes: 538,
  mestizos: 1985,
  blancos: 675,
  indigenas: 44,
  noSeIdentifica: 3000,
  rendicionFoto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/20260318_101448-1.webp",
  ingresosDetalle: [
    { label: "Servicios Educativos", monto: 16169963937, color: "#E8A838" },
    { label: "Otros Ingresos", monto: 2064754375, color: "#6BBF4E" },
    { label: "Donaciones", monto: 622366667, color: "#D4A843" },
  ],
  rendicion: {
    ingresos: { titulo: "Ingresos 2025", subtitulo: "Composición de los recursos financieros", descripcion: RENDICION_TRANSPARENCIA_2025 },
    nomina: { titulo: "Inversión Talento Humano", subtitulo: "Balance Institucional", foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/talentohumanotroncal.webp", descripcion: "La inversión en el talento humano representa uno de los pilares fundamentales para el cumplimiento de los objetivos institucionales de la Fundación Educativa. Contar con profesionales comprometidos y altamente capacitados permite garantizar la calidad de los procesos académicos, administrativos y de apoyo que contribuyen al desarrollo integral de los estudiantes y al fortalecimiento de la comunidad educativa. Los recursos destinados a la gestión del talento humano abarcan la vinculación de personal idóneo, el fortalecimiento de sus competencias mediante procesos de formación y actualización, así como iniciativas orientadas a su bienestar y desarrollo profesional. Estas acciones favorecen un ambiente de trabajo positivo, promueven el compromiso institucional y contribuyen al mejoramiento continuo de los servicios educativos ofrecidos.", monto: 13636953623 },
    academica: { titulo: "Inversión Académica", subtitulo: "Balance Institucional", foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/inversionacademica.webp", descripcion: "La inversión académica se destina al desarrollo y mejora de los programas educativos, abarcando material educativo y pruebas diagnósticas.", monto: 468119303, detalle: ["Material Educativo", "Pruebas Diagnósticas"] },
    bienestarPastoral: { titulo: "Inversión Pastoral", subtitulo: "Balance Institucional", foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2025/11/FOTO-3-PENTECOSTES.webp", descripcion: "Durante la vigencia 2025 la labor pastoral continuó impulsando iniciativas dirigidas a estudiantes, docentes, colaboradores y familias, favoreciendo su crecimiento personal, espiritual y comunitario. Estas acciones permitieron fortalecer el sentido de pertenencia institucional, la vivencia de la fe y el desarrollo de competencias socioemocionales que enriquecen los procesos educativos. La Fundación reafirma así su compromiso con una educación integral que, además de la excelencia académica, promueve la formación de personas capaces de aportar positivamente a la transformación de sus entornos y a la construcción de una sociedad más humana, fraterna y solidaria.", monto: 155900665 },
    mejoramientoAmbientes: { titulo: "Infraestructura", subtitulo: "Mejoramiento de Ambientes Escolares", foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/infraestructurabb.webp", descripcion: "La inversión en infraestructura educativa durante la vigencia 2025 estuvo orientada al mejoramiento y adecuación de espacios que contribuyen al bienestar, la seguridad y el desarrollo integral de los estudiantes. Entre las principales intervenciones realizadas se destacan la construcción del bloque C de Ciudad 2000 diseño estructural y reparación de cielos falsos. Con estas inversiones, la Fundación reafirma su compromiso con el mejoramiento continuo de la infraestructura educativa, garantizando escenarios que cumplen con los estándares requeridos y que contribuyen a una experiencia educativa de mayor calidad para toda la comunidad escolar.", monto: 1182738344 },
    donantes: { titulo: "Donantes 2025", descripcion: "La Fundación Educativa Alberto Uribe Urdaneta recibió en el año 2025 donaciones por valor de:", monto: 622366667 },
  },
  descuentosOtorgados: { titulo: "Descuentos Otorgados", descripcion: "Con el propósito de promover la permanencia estudiantil y garantizar el acceso a una educación de calidad, la Fundación Educativa mantiene una política de descuentos en los costos educativos dirigida a las familias que enfrentan condiciones económicas desafiantes. Esta iniciativa reconoce la realidad social de muchas familias de nuestra comunidad, cuyos ingresos dependen en gran medida de actividades laborales informales o de recursos limitados. Los descuentos otorgados constituyen un mecanismo de apoyo que facilita la continuidad de los procesos formativos de niños, niñas y adolescentes, especialmente en sectores con mayores niveles de vulnerabilidad. De esta manera, la Fundación reafirma su compromiso con la inclusión educativa, la equidad y la generación de oportunidades que contribuyan al desarrollo integral de los estudiantes y sus familias.", total: 737466730, items: [
    { label: "Subsidios Educativos", monto: 336269212 },
    { label: "Estudiantes Nuevos", monto: 147369765 },
    { label: "Pagos Anticipados", monto: 105041749 },
    { label: "Reconocimiento Académico", monto: 47047748 },
    { label: "Grupos Familiares", monto: 79001976 },
    { label: "Hijos de Colaboradores", monto: 22736280 },
  ] },
  mobiliario: { titulo: "Mobiliario", subtitulo: "Balance Institucional", foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/20260115_113221-1.webp", descripcion: "Para garantizar un buen proceso de aprendizaje, se realizan inversiones permanentes en la actualización del mobiliario, proporcionando confort tanto a nuestros estudiantes como a nuestros colaboradores. Durante el año 2025 se llevó a cabo la renovación de pupitres, sillas, escritorios, tableros, ventiladores y muebles administrativos. Se fortalece el compromiso institucional con la mejora continua de la infraestructura, lo que tiene un impacto positivo en la calidad del entorno de aprendizaje.", monto: 227789735 },
  herramientasTecnologicas: { titulo: "Herramientas Tecnológicas", subtitulo: "Balance Institucional", foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/herramientas-tecnologicas.webp", descripcion: "Para el eficaz desarrollo de los procesos organizacionales, se invierte en herramientas tecnológicas que optimizan el trabajo, agilizando tareas, fortaleciendo la comunicación y permitiendo un mejor desempeño. Las inversiones en computadores, video proyector, software, licencias, audiovisuales y demás herramientas tecnológicas, aseguran que cada Institución Educativa cuente con los recursos necesarios para brindar un servicio de calidad.", monto: 56059667 },
  impactoPastoral: { titulo: "Impacto y transformación en la comunidad educativa", descripcion: "La línea pastoral de capellanía tiene un impacto social significativo, centrado en el acompañamiento a la comunidad educativa, la celebración de la vida sacramental y la atención a padres de familia, colaboradores y estudiantes.", foto: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2026/06/impactopastoral.webp", estudiantesImpactados: 7456, actividades: 3, items: [
    { numero: "1", titulo: "Campaña 'Juntos por la Convivencia'", descripcion: "Basada en el análisis global de indicadores, esta campaña define líneas temáticas prioritarias. Para el presente año, se han abordado tres ejes fundamentales: salud mental, prevención de adicciones y prevención de violencias, problemáticas que afectan de manera transversal a la población estudiantil." },
    { numero: "2", titulo: "Proyectos pedagógicos institucionales", descripcion: "Se promueven iniciativas como la Semana por la Paz (con el proyecto 'Botiquín de la Paz') y la estrategia Etiquetas, desarrolladas en distintos momentos del año, que fortalecen la reflexión colectiva y la construcción de una cultura de paz." },
    { numero: "3", titulo: "Convivencia de estudiantes", descripcion: "Encuentros liderados por los directores de grupo que favorecen el diálogo, la resolución pacífica de conflictos y el trabajo colaborativo. Estos espacios se adaptan a las necesidades particulares de los estudiantes, fortaleciendo el vínculo y la confianza dentro del aula." },
  ]},
  impactoPastoralEstudiantesAnterior: 335,
  impactoPastoralActividadesAnterior: 0,
  donantesDetalle: [
    { nombre: "F. Solidaria Arquidiocesana", monto: 600000000, logo: "https://colegiosarquidiocesanos.edu.co/inicio/wp-content/uploads/2024/06/logosolidaria@2x-1024x263.webp" },
    { nombre: "Fundación Social Creafam Solidaria", monto: 16666667, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjrjHD4cXEmJdSJvgD9wbv7o8fpUXWJ9V_FKKfECkRTA&s=10" },
    { nombre: "Mary Lucy Casas Figueroa", monto: 5100000 },
    { nombre: "Objetivo Consultora Latinoamérica S.A.S.", monto: 600000, logo: "https://ocl-la.com/wp-content/uploads/2021/03/LOGO-OCL-2.png" },
  ],
  alianzasEstrategicas: [],
  pdfs: [] as { nombre: string; href: string }[],
};

export const INFORME_2025: Record<string, Fundacion2025> = {
  FESIH,
  FAUU,
};

export type { Fundacion2024 };
