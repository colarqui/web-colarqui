// ─── Informe de Gestión 2022 — Data ─────────────────────────────────────────
// Both foundations share the same Director message & many structural sections,
// but differ in statistics, school-specific content, and PDFs.

export type PDF2022 = { titulo: string; href: string };

export type Estrato = { estrato: string; cantidad: number; tipo: string };

export type CapacitacionItem = { rol: string; cantidad: number };

export interface Fundacion2022 {
  sigla: string;
  nombre: string;
  mision: string;
  vision: string;
  politicaCalidad: string;
  mensajeDirectora: string;
  directoraNombre: string;
  directoraFoto: string;

  heroVideoId: string;
  heroImage?: string;

  lideres: { nombre: string; cargo: string; foto: string }[];

  // Calidad
  calidadTexto: string;
  calidadImagen: string;

  // Educación al alcance de todos
  educacionTexto: string;
  educacionVideo?: string;
  impactoVernaza?: string[];

  // Compromiso social
  compromisoTexto: string;

  // Cifras estudiantes
  totalEstudiantes: string;
  totalEstudiantesNum: number;
  estudiantesImagen?: string;
  estudiantesEstratos: Estrato[];
  generoEstudiantes: { masculino: string; femenino: string };
  generoDetalle?: { ninos: number; ninas: number; ninoFoto: string; ninaFoto: string };
  diversidadEtnica?: { etnia: string; cantidad: number; foto: string }[];

  // Talento humano intro
  totalColaboradores: number;
  talentoHumanoTexto: string;
  talentoHumanoGenero?: { masculino: string; femenino: string };
  talentoHumanoFoto?: string;

  // Cifras colaboradores
  diversidadEtnicaColaboradores?: { etnia: string; cantidad: number; foto: string }[];
  colaboradoresEstratos: Estrato[];

  // Raciones alimentarias
  racionesAlimentarias?: number;
  racionesTexto?: string;
  poblacionVulnerable?: { texto: string; cantidad?: number };

  // Medio ambiente
  medioAmbienteTexto: string;
  kgMaterialAprovechable?: number;
  residuos: string[];

  // Arzobispos
  arzobisposTexto: string;

  // Cultura (only FESIH has the danza/música section)
  culturaTexto?: string;
  culturaFoto?: string;
  culturaCifras?: { label: string; value: string }[];

  // Formación técnica (only FESIH)
  formacionTecnica?: { texto: string; programas: string[] };

  // Egresados
  egresadosTexto: string;
  egresadosCifra: string;
  egresadosFoto?: string;
  egresadosDesglose?: { tipo: string; cantidad: number }[];
  becasTexto: string;
  becasCantidad?: number;

  // Convivencia
  convivenciaTexto: string;
  convivenciaDetalle: string;

  // Diversidad
  diversidadTexto: string;
  diversidadFotos?: string[];

  // Toma universitaria
  tomaTexto: string;
  universidades: string[];

  // Sistema educativo
  sistemaTexto: string;

  // Pastoral
  pastoralTexto: string;
  acompanamiento: string;
  promocion: string;
  formacionPastoral: string;
  videoPastoral?: string;
  acompanamientoFoto?: string;
  promocionFoto?: string;
  formacionPastoralFoto?: string;
  pastoralActividadesEstudiantes?: { actividad: string; cantidad: number }[];
  pastoralActividadesColaboradores?: { actividad: string; cantidad: number }[];

  // Recurso humano
  recursosTexto: string;
  contratosDirectos: number;
  contratosIndirectos: number;
  beneficiariosTotal: number;
  pensionados: number;
  permanencia: string;

  // Clima organizacional
  climaTexto: string;
  capacitados: CapacitacionItem[];

  // Bienestar
  actividadesBienestar: string[];

  // Apoyo económico
  auxiliosTexto: string;
  auxiliosMonto?: string;
  auxiliosMontoNum?: number;
  auxiliosBeneficiados: string;
  auxiliosBeneficiadosNum?: number;
  educacionGratuita?: { cantidad: number; texto: string };
  apoyoFoto?: string;

  // Jardín
  jardinTexto: string;
  jardinCantidad?: number;
  jardinFoto?: string;

  // Infraestructura
  infraTexto: string;
  infraColegios: string;
  mantenimientoMonto?: number;
  ambientesFotos?: string[];

  // Inversiones adicionales (FAUU only)
  inversionesAdicionales?: { texto: string; monto?: number; foto?: string }[];

  // Gracias
  graciasFoto?: string;
  graciasTexto?: string;

  // PDFs
  pdfs: PDF2022[];
}

// ─── FESIH ──────────────────────────────────────────────────────────────────

const FESIH: Fundacion2022 = {
  sigla: "FESIH",
  nombre: "Fundación Educativa Santa Isabel de Hungría",
  mision: "La Fundación Educativa Santa Isabel de Hungría de la Arquidiócesis de Cali, es una organización privada sin ánimo de lucro, que administra estratégicamente las Instituciones Educativas propias o confiadas a su cuidado, bajo los principios de la iglesia Católica, para que cumplan su misión social de educar.",
  vision: "Seremos reconocidos a nivel regional y nacional por generar impacto social, mediante una administración efectiva de los Colegios a nuestro cargo. Ampliaremos la oferta educativa y nos posicionaremos por la calidad de nuestro servicio, bajo los principios de la iglesia católica.",
  politicaCalidad: "Estamos comprometidos con el mejoramiento de la calidad educativa, mediante la administración eficiente de instituciones interesadas en ofrecer formación integral a niños, niñas y adolescentes. Garantizamos la disponibilidad de ambientes escolares propicios para el desarrollo de los estudiantes y un equipo de trabajo comprometido, motivado y cualificado, que define los lineamientos curriculares, respondiendo a los principios de la iglesia católica y al cumplimiento de requisitos aplicables. Aseguramos el impacto social esperado, la viabilidad financiera y el mejoramiento continuo de nuestro sistema de gestión de la calidad, ofreciendo a nuestras partes interesadas la mejor experiencia de servicio.",
  mensajeDirectora: `Primero, dar gracias a Dios por permitirme ser parte de esta hermosa obra en la que, sin temor a equivocarme, hemos dejado nuestros más profundos y amplios conocimientos, experiencias, ilusiones, pero sobre todo, hemos dispuesto nuestro corazón y con él, todo el amor en esta misión de evangelizar a través de la EDUCACIÓN.

Quienes ocupamos posiciones de dirección tenemos una tendencia a aislarnos, a alejarnos de la realidad, a meternos en una pequeña "urna de cristal". Por supuesto es muy importante leer con dedicación, mirar las estadísticas, estudiar las tendencias y tomar decisiones orientadas a garantizar el éxito de las diferentes gestiones. Pero nada es más potente que el contacto directo, estar en el aula de clase o en medio de un descanso, deleitarse con la sonrisa de un niño, el tono de su voz o el brillo en sus ojos.

El 2022 fue un año lleno de retos que nos motivó a construir nuevas rutas, reinventarnos y reconstruir equipos, a evaluarnos y comprometernos a seguir construyendo una cultura centrada en el ser humano, con una proactiva actitud frente al cambio, interpretando las nuevas realidades, adoptando las nuevas exigencias académicas y de calidad, sin perder la esencia, el polo a tierra, que lo constituyen los niños, niñas y adolescentes y claro está, nuestros colaboradores, quienes lo hacen posible.

Soñemos con un país mejor, que sea posible a la luz de Jesús; veamos como Él nos enseñó, en la simpleza de la vida, la grandeza de Dios, dejando a un lado la indiferencia frente al que sufre, al que ha perdido la esperanza y las ganas de vivir. No podemos ser quienes frustremos anhelos y opaquemos la verdad; debemos ser quienes promovamos confianza y ganas de soñar. Seamos promotores de vida y arquitectos de nuestra Casa Común; hagamos realidad nuestros proyectos y deseos de bienestar y felicidad y contribuyamos al bien común.`,
  directoraNombre: "Mag. Martha Isabel Gómez Caballero",
  directoraFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Jefe-Martha.webp",

  heroVideoId: "sh7MLWtUe0I",

  lideres: [
    { nombre: "Juan Pablo Puente Martínez", cargo: "Líder Académico", foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Juan-1-824x1024.webp" },
    { nombre: "Sindy Johana Cruz García", cargo: "Líder de Cobertura Educativa", foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Joha-824x1024.webp" },
    { nombre: "Adriana Lisset Asprilla Riascos", cargo: "Líder de Talento Humano", foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Adri-2-824x1024.webp" },
    { nombre: "Julia Rosa Londoño Cifuentes", cargo: "Líder Financiera", foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Juli-2-824x1024.webp" },
  ],

  calidadTexto: "Durante el Año 2022 logramos mantener la certificación del Sistema de Gestión de la Calidad bajo la norma ISO 9001:2015, a través del fortalecimiento de la cultura organizacional, la mejora en la gestión de los procesos y el sostenimiento de la satisfacción de nuestras partes interesadas. De la misma manera, alcanzamos la certificación de la NTC ISO 9001:2015 para el Colegio Santa Isabel de Hungría Sede Alfonso López, de Calendario A, en donde la Dirección Ejecutiva, los líderes de proceso, los equipos directivos y el personal de este colegio le apostaron a la implementación de una nueva estructura organizacional.",
  calidadImagen: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Santa_Icontec.webp",

  educacionTexto: "El año 2022 permitió la vinculación de una nueva Institución Educativa a la familia de la Fundación Santa Isabel de Hungría, el colegio Nelson Garcés Vernaza, ubicado en la comuna 21, al oriente de Cali, en el barrio Potrero Grande, compuesto en su gran mayoría por familias afrodescendientes y población diversa víctima del conflicto armado.",
  educacionVideo: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Vernaza.mp4",
  impactoVernaza: [
    "El mejoramiento de las realidades propias de la convivencia escolar, disminuyendo las situaciones de violencia física y verbal.",
    "La consolidación del equipo de colaboradores que hace parte de la Institución Educativa.",
    "La percepción positiva por parte de los padres de familia frente a la presencia Arquidiocesana en el colegio con relación al trabajo pastoral, educativo y convivencial.",
    "El fortalecimiento de la oferta cultural a través del grupo musical y de danzas.",
    "La vinculación de los estudiantes en las actividades extracurriculares orientadas al mejoramiento de la calidad educativa.",
  ],

  compromisoTexto: "En brindar un servicio educativo de calidad en diferentes zonas de influencia en la ciudad de Cali. Esta misión educadora brinda a nuestros estudiantes, no sólo las herramientas necesarias para su desarrollo académico, sino que también ofrece un espacio seguro donde lo emocional y lo espiritual se combinan para formarlos integralmente, desde el ser, el saber y el hacer. Fruto de nuestro trabajo, logramos transformar vidas en nuestras comunidades educativas, impactando en la construcción de una sociedad más equitativa y justa.",

  totalEstudiantes: "27.004",
  totalEstudiantesNum: 27004,
  estudiantesImagen: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/02/IMG_0877-removebg-1-768x1152.webp",
  estudiantesEstratos: [
    { estrato: "0", cantidad: 23, tipo: "estudiantes" },
    { estrato: "1", cantidad: 14680, tipo: "estudiantes" },
    { estrato: "2", cantidad: 10013, tipo: "estudiantes" },
    { estrato: "3", cantidad: 1971, tipo: "estudiantes" },
    { estrato: "4", cantidad: 195, tipo: "estudiantes" },
    { estrato: "5", cantidad: 58, tipo: "estudiantes" },
    { estrato: "6", cantidad: 64, tipo: "estudiantes" },
  ],
  generoEstudiantes: { masculino: "49%", femenino: "51%" },
  generoDetalle: {
    ninos: 13232,
    ninas: 13772,
    ninoFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/aguacatal.webp",
    ninaFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/nina-1.webp",
  },
  diversidadEtnica: [
    { etnia: "Afrodescendientes", cantidad: 7387, foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Afro.webp" },
    { etnia: "Mestizos", cantidad: 16769, foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Mestizo-Santa-768x768.webp" },
    { etnia: "Indígenas", cantidad: 931, foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Indigena-Santa-768x768.webp" },
    { etnia: "Otros", cantidad: 1917, foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Otros-Santa-768x768.webp" },
  ],

  totalColaboradores: 972,
  talentoHumanoTexto: "Durante el 2022 contamos con un talento humano competente y comprometido de 972 colaboradores, quienes con su dedicación y profesionalismo hicieron posible nuestra misión educadora.",
  talentoHumanoGenero: { masculino: "40%", femenino: "60%" },
  talentoHumanoFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/CAFE-1024x561.webp",

  diversidadEtnicaColaboradores: [
    { etnia: "Afrodescendientes", cantidad: 373, foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/afro-1.webp" },
    { etnia: "Mestizos", cantidad: 477, foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Mestizo.webp" },
    { etnia: "Indígenas", cantidad: 112, foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Indigena.webp" },
    { etnia: "Otros", cantidad: 10, foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Mulata-Santa-1.webp" },
  ],

  colaboradoresEstratos: [
    { estrato: "0", cantidad: 2, tipo: "colaboradores" },
    { estrato: "1", cantidad: 158, tipo: "colaboradores" },
    { estrato: "2", cantidad: 322, tipo: "colaboradores" },
    { estrato: "3", cantidad: 401, tipo: "colaboradores" },
    { estrato: "4", cantidad: 164, tipo: "colaboradores" },
    { estrato: "5", cantidad: 18, tipo: "colaboradores" },
    { estrato: "6", cantidad: 3, tipo: "colaboradores" },
  ],

  racionesAlimentarias: 656044,
  racionesTexto: "Como parte del compromiso propio de nuestro servicio educativo, destinamos recursos para brindar 656.044 raciones alimentarias, apoyando la nutrición y el bienestar de nuestros estudiantes.",
  poblacionVulnerable: {
    texto: "Dentro de nuestra población contamos con estudiantes categorizados como víctimas del conflicto armado, distribuidos entre las 19 instituciones educativas pertenecientes a la Fundación. En este sentido, se hace relevante aportar las herramientas necesarias a través de kits escolares que favorecen un adecuado desarrollo de los aprendizajes.",
  },

  kgMaterialAprovechable: 47225,
  medioAmbienteTexto: "Se formalizó convenio con la Fundación Cirineos de Santiago de Cali, esto ha permitido continuar aportando al cuidado del medio ambiente, a través de la adecuada disposición de los residuos aprovechables o reciclaje generados en los colegios.",
  residuos: ["Chatarra", "Cartón", "Archivo", "Plegadiza", "Aluminio", "Polietileno"],

  arzobisposTexto: "La cercanía y el vínculo de los señores Arzobispos, Darío de Jesús Monsalve Mejía (Arzobispo de Cali) y Luis Fernando Rodríguez (Obispo Coadjutor de Cali), se hizo evidente durante el encuentro realizado en el mes de octubre de 2022, espacio que permitió construir una reflexión con los estudiantes acerca del informe de la Comisión de la Verdad, tomando como líneas de abordaje los ejes vida, paz, verdad y no repetición.",

  culturaTexto: "La música y la danza se han transformado en canalizadores de los talentos en los estudiantes que hacen parte de las Instituciones Educativas ubicadas en la comuna 21.",
  culturaFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/GA8-1.webp",
  culturaCifras: [
    { label: "Docentes de Danza", value: "2" },
    { label: "Docente de Música", value: "1" },
    { label: "Estudiantes impactados", value: "579" },
  ],

  formacionTecnica: {
    texto: "Iniciar con el desarrollo de los programas de formación técnica en los colegios de Llano Verde y sus sedes, contribuye notoriamente al mejoramiento de oportunidades futuras para el desempeño laboral de nuestros estudiantes.",
    programas: [
      "Técnica Informática en Sistemas y Mantenimiento de Computadores",
      "Técnica Comercial en Auxiliar Contable",
      "Técnica en Auxiliar Administrativo",
    ],
  },

  egresadosTexto: "Los estudiantes que culminan su proceso formativo con nosotros, se caracterizan por ser ejemplo de vida y valores cristianos, demostrando liderazgo activo y participativo en su actuar frente a los desafíos propios de sus realidades.",
  egresadosCifra: "2.067",
  egresadosDesglose: [
    { tipo: "Bachilleres académicos", cantidad: 902 },
    { tipo: "Bachilleres técnicos", cantidad: 1134 },
    { tipo: "Bachilleres educación por ciclos", cantidad: 31 },
  ],
  egresadosFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/GA14.webp",
  becasCantidad: 39,
  becasTexto: "En el año 2022, producto de los resultados obtenidos en las pruebas Saber 11°, 39 estudiantes lograron becas o auxilios en educación superior.",

  convivenciaTexto: "El trabajo desarrollado frente a las acciones de promoción y prevención permiten que los colegios sean lugares armónicos, donde se fomentan las buenas relaciones humanas. La implementación del programa \"Escuela, Comunidad y Paz\" es una enorme posibilidad para impulsar y desarrollar la cultura de la convivencia y la paz.",
  convivenciaDetalle: "Asociadas mayoritariamente con la violencia física y verbal, el consumo de sustancias psicoactivas y el uso inapropiado de redes sociales, las cuales permitieron realizar un abordaje que ha garantizado el acompañamiento y realización de un debido proceso entre los involucrados.",

  diversidadTexto: "Somos parte de una sociedad que se encuentra en constante transformación. El proyecto de educación inclusiva tiene como finalidad servir de guía y referente para la comunidad educativa de los colegios Arquidiocesanos hacia la transformación del proceso educativo, generando acciones que reconozcan la diversidad y actúen en favor de la garantía de una educación inclusiva.",
  diversidadFotos: [
    "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/GA19-1.webp",
    "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/GA18-1.webp",
    "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/GA20-1.webp",
  ],

  tomaTexto: "Promover en nuestras instituciones educativas espacios de interacción de los estudiantes de grado 10° y 11° con las universidades, apertura posibilidades que contribuyen en la consolidación futura de los proyectos de vida.",
  universidades: ["ICESI", "Autónoma", "San Buenaventura", "Javeriana", "Santiago de Cali", "Lumen Gentium"],

  sistemaTexto: "Han comenzado a hacerse evidentes los avances en la consolidación del Sistema Educativo Arquidiocesano, el cual estructura una ruta desde la educación inicial hasta la educación superior en la oferta educativa de la Arquidiócesis de Cali.",

  videoPastoral: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/02/Arquidiocesis-Cali.mp4",
  pastoralTexto: "Desde la pastoral educativa, promovemos el encuentro personal y comunitario con Jesús, a través del acompañamiento, la formación y la promoción de los integrantes de la comunidad educativa.",
  acompanamiento: "Este proceso genera un acercamiento a las realidades del contexto dando respuesta a sus necesidades con acciones pastorales concretas.",
  acompanamientoFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/GP2-1.webp",
  promocion: "A través de esta línea se logra un impacto en los integrantes de las comunidades educativas, para fortalecer las diferentes propuestas del pacto educativo global.",
  promocionFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/GP4-scaled-1-1536x1152.webp",
  formacionPastoral: "Es un elemento fundamental para consolidar la identidad de las instituciones educativas, donde brindamos herramientas que contribuyen al crecimiento del ser desde una visión integral.",
  formacionPastoralFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Imagen-de-WhatsApp-2023-03-06-a-las-21.55.15-1.webp",
  pastoralActividadesEstudiantes: [
    { actividad: "Convivencias", cantidad: 17919 },
    { actividad: "Retiros", cantidad: 23241 },
    { actividad: "Tiempos Litúrgicos", cantidad: 23790 },
  ],
  pastoralActividadesColaboradores: [
    { actividad: "Convivencias", cantidad: 786 },
    { actividad: "Retiros", cantidad: 806 },
  ],

  recursosTexto: "Para llevar a cabo nuestra misión social de educar, contamos con un personal idóneo, competente y altamente comprometido.",
  contratosDirectos: 1238,
  contratosIndirectos: 906,
  beneficiariosTotal: 8576,
  pensionados: 16,
  permanencia: "80%",

  climaTexto: "La Fundación Educativa, siendo cada vez más consciente de la necesidad de fomentar en los colaboradores un ambiente de satisfacción y de pertenencia, ha ido implementando diferentes actividades de reconocimiento que se evidencian en la evaluación de clima laboral.",
  capacitados: [
    { rol: "Docentes", cantidad: 572 },
    { rol: "Coordinadores", cantidad: 51 },
    { rol: "Rectores", cantidad: 7 },
    { rol: "Secretarias", cantidad: 30 },
    { rol: "Servicios Generales", cantidad: 17 },
    { rol: "Psicólogas", cantidad: 18 },
    { rol: "Administrativos", cantidad: 14 },
  ],

  actividadesBienestar: [
    "Celebración Amor y Amistad", "Día de la Salud", "Reconocimiento Jesús Maestro",
    "Fiesta fin de año", "Día del Trabajador", "Día de la Mujer", "Día del Hombre",
    "Día de Ser Niños", "Celebración Cumpleaños", "Novena de Navidad",
    "Aero Rumbas", "Ejercicios de Meditación", "Conciencia de Integración",
  ],

  auxiliosTexto: "Conscientes de la actual situación económica y social de nuestra región, desde los Colegios Arquidiocesanos, tenemos implementada una política de beneficios que busca favorecer la economía familiar, haciendo accesible el derecho a la educación.",
  apoyoFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/02/ninnnn-removebg-1.webp",
  auxiliosMonto: "$1.867.172.997",
  auxiliosMontoNum: 1867172997,
  auxiliosBeneficiados: "2.592 estudiantes",
  auxiliosBeneficiadosNum: 2592,
  educacionGratuita: {
    cantidad: 2902,
    texto: "Niños, Niñas y Adolescentes recibieron educación gratuita en los diferentes niveles ofrecidos por nuestras Instituciones educativas.",
  },

  jardinTexto: "Para garantizar el acceso a la educación inicial de los niños y las niñas, subsidiamos el grado Jardín, permitiendo el desarrollo de habilidades cognitivas, emocionales y sociales dentro de un espacio seguro.",
  jardinCantidad: 419,
  jardinFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/girlsbg-1536x949.webp",

  infraTexto: "Garantizamos ambientes seguros y agradables para nuestros estudiantes invirtiendo",
  infraColegios: "En el mantenimiento de la planta física en las 20 Instituciones educativas de la Fundación Santa Isabel de Hungría",
  mantenimientoMonto: 857559282,
  ambientesFotos: [
    "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/lopez.webp",
    "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Imagen-de-WhatsApp-2023-03-07-a-las-17.09.29.webp",
    "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Imagen-de-WhatsApp-2023-03-07-a-las-17.15.18-rotated-1.webp",
  ],

  pdfs: [
    { titulo: "Informe de Gestión 2022", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/Fesih-Informe-de-Gestion-2022.pdf" },
    { titulo: "Estados Financieros al 31 de Diciembre de 2022", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/2.-Estados-Financieros-al-31-de-Diciembre-de-2022-FESIH.pdf" },
    { titulo: "Certificación Cumplimiento Requisitos 2022", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/3.-ESAL-FISH-Certificacion-Cumplimiento-Requisitos-2022.pdf" },
    { titulo: "Decreto 142 y Decreto 955", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/4.-Fesih-Decreto-142-y-Decreto-955.pdf" },
    { titulo: "Certificado de Cancillería", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/06/5.-CERTIFICADO-DE-CANCILLERIA-FESIH-20JUN23.pdf" },
    { titulo: "Certificación de Antecedentes 2022", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/6.-ESAL-FISH-Certificacion-de-Antecedentes-2022.pdf" },
    { titulo: "Acta CA MAR-10-2023", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/7.-ACTA-SIH-035-23-CA.-MAR-10-2023.pdf" },
    { titulo: "Certificación Cargos Directivos y Gerenciales", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/10.-ESAL-FISH-Certificacion-Cargos-Directivos-y-Gerenciales-2022.pdf" },
    { titulo: "Memoria Económica 2022", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/11.-FSIH-MEMORIA-ECONOMICA-2022.pdf" },
    { titulo: "Certificación Memoria Económica", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/11.1.-ESAL-Certificacion-Memoria-Economica-2022.pdf" },
    { titulo: "Certificado WEB 2022", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/12.-FESIH-Certificado-WEB-2022.pdf" },
  ],
};

// ─── FAUU ───────────────────────────────────────────────────────────────────

const FAUU: Fundacion2022 = {
  sigla: "FAUU",
  nombre: "Fundación Educativa Alberto Uribe Urdaneta",
  mision: "La Fundación Educativa Alberto Uribe Urdaneta de la Arquidiócesis de Cali, es una organización privada sin ánimo de lucro, que administra estratégicamente las Instituciones Educativas propias o confiadas a su cuidado, bajo los principios de la iglesia Católica, para que cumplan su misión social de educar.",
  vision: "Seremos reconocidos a nivel regional y nacional por generar impacto social, mediante una administración efectiva de los Colegios a nuestro cargo. Ampliaremos la oferta educativa y nos posicionaremos por la calidad de nuestro servicio, bajo los principios de la iglesia católica.",
  politicaCalidad: FESIH.politicaCalidad,
  mensajeDirectora: FESIH.mensajeDirectora,
  directoraNombre: FESIH.directoraNombre,

  heroVideoId: FESIH.heroVideoId,
  heroImage: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Imagen-de-WhatsApp-2023-03-07-a-las-15.41.13.webp",
  directoraFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/DSC_2222-1.webp",

  lideres: FESIH.lideres,

  calidadTexto: "Durante el Año 2022 logramos mantener la certificación del Sistema de Gestión de la Calidad bajo la norma ISO 9001:2015, a través del fortalecimiento de la cultura organizacional, la mejora en la gestión de los procesos y el sostenimiento de la satisfacción de nuestras partes interesadas. De la misma manera, alcanzamos la certificación de la NTC ISO 9001:2015 para el Colegio Santa Isabel de Hungría Sede Ciudad 2000, de Calendario B.",
  calidadImagen: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Urdaneta_Icontec.webp",

  educacionTexto: "Nuestro compromiso social en los colegios Arquidiocesanos, se fundamenta en brindar un servicio educativo de calidad en las diferentes zonas de influencia en las ciudades de Cali, Jamundí y Yumbo. Esta misión educadora brinda a nuestros estudiantes, no sólo las herramientas necesarias para su desarrollo académico, sino que también ofrece un espacio seguro donde lo emocional y lo espiritual se combinan para formarlos integralmente.",

  compromisoTexto: "Fruto de nuestro trabajo, logramos transformar vidas en nuestras comunidades educativas, impactando en la construcción de una sociedad más equitativa y justa.",

  totalEstudiantes: "7.731",
  totalEstudiantesNum: 7731,
  estudiantesEstratos: [
    { estrato: "0", cantidad: 6, tipo: "estudiantes" },
    { estrato: "1", cantidad: 2626, tipo: "estudiantes" },
    { estrato: "2", cantidad: 2722, tipo: "estudiantes" },
    { estrato: "3", cantidad: 1485, tipo: "estudiantes" },
    { estrato: "4", cantidad: 222, tipo: "estudiantes" },
    { estrato: "5", cantidad: 59, tipo: "estudiantes" },
    { estrato: "6", cantidad: 611, tipo: "estudiantes" },
  ],
  estudiantesImagen: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/02/IMG_0877-removebg-1-768x1152.webp",
  generoEstudiantes: { masculino: "50%", femenino: "50%" },
  generoDetalle: {
    ninos: 3866,
    ninas: 3865,
    ninoFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/aguacatal.webp",
    ninaFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/nina-1.webp",
  },
  diversidadEtnica: [
    { etnia: "Afrodescendientes", cantidad: 2700, foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Afro-Santa.webp" },
    { etnia: "Mestizos", cantidad: 4200, foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/mestizo-auu.webp" },
    { etnia: "Indígenas", cantidad: 600, foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/indigena-auu.webp" },
    { etnia: "Otros", cantidad: 231, foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/otrosauu.webp" },
  ],

  totalColaboradores: 344,
  talentoHumanoTexto: "Durante el 2022 contamos con un talento humano competente y comprometido de 344 colaboradores, quienes con su dedicación y profesionalismo hicieron posible nuestra misión educadora.",
  talentoHumanoFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/TH7-1.webp",
  talentoHumanoGenero: { masculino: "40%", femenino: "60%" },
  diversidadEtnicaColaboradores: [
    { etnia: "Afrodescendientes", cantidad: 120, foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/afro-1.webp" },
    { etnia: "Mestizos", cantidad: 180, foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Mestizo.webp" },
    { etnia: "Indígenas", cantidad: 35, foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Indigena.webp" },
    { etnia: "Otros", cantidad: 9, foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/otrosauu.webp" },
  ],

  colaboradoresEstratos: [
    { estrato: "1", cantidad: 23, tipo: "colaboradores" },
    { estrato: "2", cantidad: 114, tipo: "colaboradores" },
    { estrato: "3", cantidad: 158, tipo: "colaboradores" },
    { estrato: "4", cantidad: 44, tipo: "colaboradores" },
    { estrato: "5", cantidad: 5, tipo: "colaboradores" },
  ],

  medioAmbienteTexto: FESIH.medioAmbienteTexto,
  residuos: FESIH.residuos,

  arzobisposTexto: FESIH.arzobisposTexto,

  egresadosTexto: "Los estudiantes que culminan su proceso formativo con nosotros, se caracterizan por ser ejemplo de vida y valores cristianos, demostrando liderazgo activo y participativo en su actuar frente a los desafíos propios de sus realidades.",
  egresadosCifra: "780",
  egresadosFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/GA10-1.webp",
  becasTexto: "En el año lectivo 2021-2022, 8 estudiantes se beneficiaron con becas o auxilios en educación superior, producto de los resultados obtenidos en la Prueba Saber 11°.",

  convivenciaTexto: FESIH.convivenciaTexto,
  convivenciaDetalle: "Asociadas mayoritariamente con la violencia física y verbal, el consumo de sustancias psicoactivas y el uso inapropiado de redes sociales, las cuales permitieron realizar un abordaje que ha garantizado el acompañamiento y realización de un debido proceso entre los involucrados.",

  diversidadTexto: FESIH.diversidadTexto,
  diversidadFotos: [
    "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/GA19-1.webp",
    "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/GA18-1.webp",
    "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/GA20-1.webp",
  ],
  tomaTexto: FESIH.tomaTexto,
  universidades: FESIH.universidades,
  sistemaTexto: FESIH.sistemaTexto,

  videoPastoral: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/02/Arquidiocesis-Cali.mp4",
  pastoralTexto: FESIH.pastoralTexto,
  acompanamiento: FESIH.acompanamiento,
  acompanamientoFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/GP2-1.webp",
  promocion: FESIH.promocion,
  promocionFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/GP4-scaled-1-1536x1152.webp",
  formacionPastoral: FESIH.formacionPastoral,
  formacionPastoralFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Imagen-de-WhatsApp-2023-03-06-a-las-21.55.15-1.webp",
  pastoralActividadesEstudiantes: [
    { actividad: "Convivencias", cantidad: 5222 },
    { actividad: "Retiros", cantidad: 6374 },
    { actividad: "Tiempos Litúrgicos", cantidad: 7141 },
  ],
  pastoralActividadesColaboradores: [
    { actividad: "Convivencias", cantidad: 318 },
    { actividad: "Retiros", cantidad: 331 },
  ],

  recursosTexto: "Para llevar a cabo nuestra misión social de educar, contamos con un personal idóneo, competente y altamente comprometido.",
  contratosDirectos: 396,
  contratosIndirectos: 342,
  beneficiariosTotal: 2952,
  pensionados: 8,
  permanencia: "80%",

  climaTexto: "La Fundación Educativa, siendo cada vez más consciente de la necesidad de fomentar en los colaboradores un ambiente de satisfacción y de pertenencia, ha ido implementando diferentes actividades de reconocimiento.",
  capacitados: [
    { rol: "Docentes", cantidad: 1295 },
    { rol: "Coordinadores", cantidad: 86 },
    { rol: "Rectores", cantidad: 11 },
    { rol: "Secretarias", cantidad: 66 },
    { rol: "Servicios Generales", cantidad: 93 },
    { rol: "Psicólogas", cantidad: 9 },
    { rol: "Administrativos", cantidad: 99 },
  ],

  actividadesBienestar: FESIH.actividadesBienestar,

  auxiliosTexto: "Conscientes de la actual situación económica y social de nuestra región, desde los Colegios Arquidiocesanos, tenemos implementada una política de beneficios que busca favorecer la economía familiar, haciendo accesible el derecho a la educación.",
  apoyoFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/02/ninnnn-removebg-1-1024x683.webp",
  auxiliosMonto: "$653.136.299",
  auxiliosMontoNum: 653136299,
  auxiliosBeneficiados: "3.477 estudiantes",
  auxiliosBeneficiadosNum: 3477,

  jardinTexto: FESIH.jardinTexto,

  infraTexto: "Garantizamos ambientes seguros y agradables para nuestros estudiantes invirtiendo",
  infraColegios: "En el mantenimiento de la planta física en las 11 Instituciones educativas de la Fundación Alberto Uribe Urdaneta",
  mantenimientoMonto: 484757031,
  ambientesFotos: [
    "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Ambientes-escolares-favorables-4.webp",
  ],
  inversionesAdicionales: [
    { texto: "Se invirtieron en la construcción de 3 aulas en el colegio Parroquial Santiago Apóstol, permitiendo la atención de nuestra población en jornada única.", monto: 205803227, foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/G.F.-AULAS-2.webp" },
    { texto: "También se invirtieron en computadores y equipos de apoyo audiovisual.", monto: 156065180, foto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/Ambientes-escolares-favorables-3.webp" },
  ],

  graciasFoto: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/03/DSC_2182.webp",
  graciasTexto: "El apoyo de cada uno de ustedes es fundamental para seguir trabajando en este hermoso proyecto de educar. La palabra gracias no es suficiente para describir lo que hemos logrado como equipo: dejar la huella arquidiocesana en el corazón de nuestros niños, niñas y adolescentes.",

  pdfs: [
    { titulo: "Informe de Gestión 2022", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/Feauu-Informe-de-Gestion-2022.pdf" },
    { titulo: "Estados Financieros a 31 de Diciembre 2022", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/2.-Fauu-Estados-Financieros-a-31-De-Diciembre-2022.pdf" },
    { titulo: "Certificación Cumplimiento Requisitos 2022", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/3.-ESAL-FAU-Certificacion-Cumplimiento-Requisitos-2022.pdf" },
    { titulo: "Decreto 140 y Decreto 954", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/4.-Feauu-Decreto-140-y-Decreto-954.pdf" },
    { titulo: "Certificado de Cancillería", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/06/5.-CERTIFICADO-DE-CANCILLERIA-FEAUU-20JUN23.pdf" },
    { titulo: "Certificación Cargos Directivos y Gerenciales", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/6.-ESAL-FAU-Certificacion-Cargos-Directivos-y-Gerenciales-2022.pdf" },
    { titulo: "Acta CA MAR-10-2023", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/7.-ACTA-AUU-035-23-CA.MAR-10-2023.pdf" },
    { titulo: "Memoria Económica 2022", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/11.-FAU-MEMORIA-ECONOMICA-2022.pdf" },
    { titulo: "Certificación Memoria Económica", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/11.1-ESAL-FAU-Certificacion-Memoria-Economica-2022.pdf" },
    { titulo: "Certificado WEB 2022", href: "https://colegiosarquidiocesanos.edu.co/informegestion2022/wp-content/uploads/2023/05/12.-FEAUU-Certificado-WEB-2022.pdf" },
  ],
};

// ─── Export ─────────────────────────────────────────────────────────────────

export const INFORME_2022: Record<string, Fundacion2022> = {
  FESIH,
  FAUU,
};
