export interface Noticia {
  id: string;
  slug: string;
  titulo: string;
  resumen: string;
  contenido: string;
  categoria: string;
  fecha: string;
  autor: string;
  imagen: string;
  destacada: boolean;
}

export const noticias: Noticia[] = [
  {
    id: "1",
    slug: "resultados-icfes-2024",
    titulo: "Colegios Arquidiocesanos destacan en resultados ICFES 2024",
    resumen: "Nuestros colegios obtuvieron resultados sobresalientes en las pruebas Saber 11, superando el promedio nacional en todas las áreas evaluadas.",
    contenido: `
Los Colegios Arquidiocesanos de Cali han obtenido resultados excepcionales en las pruebas ICFES 2024, consolidándose como las instituciones educativas de mayor excelencia académica en la región.

## Resultados Destacados

Los colegios San Juan Eudes, San Pedro Claver y La Anunciación ocuparon los primeros lugares en el ranking distrital, con puntajes que superan ampliamente el promedio nacional.

### Áreas de Mayor Desempeño

- **Matemáticas**: 15% por encima del promedio nacional
- **Ciencias Naturales**: 12% por encima del promedio
- **Lectura Crítica**: 18% por encima del promedio
- **Inglés**: 22% por encima del promedio

## Compromiso con la Excelencia

"Estos resultados reflejan el compromiso de nuestros docentes y la calidad de la formación integral que brindamos", afirmó el Director de los Colegios Arquidiocesanos.

La preparación para estas pruebas incluyó no solo el fortalecimiento académico, sino también el desarrollo de habilidades socioemocionales que permiten a nuestros estudiantes enfrentar los desafíos con confianza y determinación.
    `,
    categoria: "Académico",
    fecha: "2024-11-15",
    autor: "Oficina de Comunicaciones",
    imagen: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    destacada: true,
  },
  {
    id: "2",
    slug: "inscripciones-2025",
    titulo: "Inscripciones abiertas para el año escolar 2025",
    resumen: "Ya puedes iniciar el proceso de inscripción para el próximo año escolar. Conoce los requisitos y fechas importantes.",
    contenido: `
## Proceso de Inscripción 2025

Los Colegios Arquidiocesanos de Cali abren el proceso de inscripciones para el año escolar 2025. Invitamos a las familias interesadas a conocer nuestra oferta educativa y unirse a nuestra comunidad.

### Fechas Importantes

- **Inicio de inscripciones**: 1 de noviembre de 2024
- **Cierre de inscripciones**: 15 de diciembre de 2024
- **Entrevistas familiares**: Enero 2025
- **Publicación de resultados**: 15 de enero de 2025

### Requisitos

- Formulario de inscripción completado
- Fotocopia del documento de identidad del estudiante
- Fotocopia del documento de identidad de los acudientes
- Certificado de notas del año anterior
- Paz y salvo de la institución anterior
- Certificado de conducta

## Plataforma RUNACHAY

El proceso de inscripción se realiza a través de nuestra plataforma RUNACHAY, donde podrás:

- Completar el formulario en línea
- Adjuntar los documentos requeridos
- Realizar el seguimiento de tu solicitud
- Recibir notificaciones sobre el proceso

¡Te esperamos para ser parte de nuestra familia arquidiocesana!
    `,
    categoria: "Admisiones",
    fecha: "2024-11-01",
    autor: "Departamento de Admisiones",
    imagen: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800",
    destacada: true,
  },
  {
    id: "3",
    slug: "dia-familia-2024",
    titulo: "Celebramos el Día de la Familia Arquidiocesana",
    resumen: "Más de 5,000 personas se reunieron en la celebración anual que fortalece los lazos de nuestra comunidad educativa.",
    contenido: `
El pasado sábado celebramos el Día de la Familia Arquidiocesana en los predios del Colegio San Juan Eudes, con una asistencia récord de más de 5,000 personas de toda nuestra comunidad educativa.

## Actividades Realizadas

La jornada incluyó diversas actividades para todas las edades:

- **Juegos tradicionales**: Competencias de trompo, yoyo y rayuela
- **Actividades deportivas**: Fútbol, baloncesto y voleibol mixto
- **Presentaciones artísticas**: Danzas folclóricas y música en vivo
- **Feria gastronómica**: Platos típicos de la región
- **Misa de acción de gracias**: Celebración eucarística presidida por Monseñor Dario de Jesús Monsalve

## Mensaje del Arzobispo

"La familia es el primer seminario de la vida cristiana. En los Colegios Arquidiocesanos trabajamos para fortalecer los valores que se aprenden en el hogar", expresó Monseñor Dario.

Este evento representa el espíritu de comunidad que caracteriza a nuestra red educativa, donde padres de familia, estudiantes y docentes construyen juntos una sociedad más justa y fraterna.
    `,
    categoria: "Comunidad",
    fecha: "2024-10-20",
    autor: "Pastoral Juvenil",
    imagen: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
    destacada: true,
  },
  {
    id: "4",
    slug: "olimpiadas-matematicas",
    titulo: "Estudiantes ganan Olimpiadas Matemáticas Regionales",
    resumen: "Representantes de nuestros colegios obtuvieron medallas de oro y plata en la competencia regional de matemáticas.",
    contenido: `
## Triunfo en Matemáticas

Estudiantes de los Colegios Arquidiocesanos brillaron en las Olimpiadas Matemáticas Regionales 2024, obteniendo 3 medallas de oro, 5 de plata y 4 de bronce.

### Ganadores Destacados

**Medalla de Oro:**
- Carlos Andrés Ramírez - Colegio San Juan Eudes (Grado 11)
- María Fernanda López - Colegio La Anunciación (Grado 10)
- Juan David Martínez - Colegio San Pedro Claver (Grado 11)

**Medalla de Plata:**
- Ana Lucía Gómez - Colegio San Juan Eudes (Grado 9)
- Santiago Pérez - Colegio La Anunciación (Grado 11)
- Y otros 3 estudiantes más

## Preparación

Los estudiantes se prepararon durante 6 meses con el apoyo de sus profesores de matemáticas y recursos especializados de la Universidad Javeriana de Cali.

Felicitamos a todos los participantes y a sus familias por este logro académico que refleja la calidad de nuestra formación en ciencias exactas.
    `,
    categoria: "Académico",
    fecha: "2024-09-15",
    autor: "Departamento de Matemáticas",
    imagen: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    destacada: false,
  },
  {
    id: "5",
    slug: "nueva-alianza-universidad",
    titulo: "Alianza estratégica con Universidad Javeriana de Cali",
    resumen: "Firmamos convenio para fortalecer la formación STEM y crear rutas de acceso preferencial para nuestros graduados.",
    contenido: `
## Convenio de Cooperación

Los Colegios Arquidiocesanos y la Universidad Javeriana de Cali firmaron un convenio de cooperación académica que beneficiará a nuestros estudiantes en su formación y acceso a la educación superior.

## Beneficios del Convenio

### Para Estudiantes:
- Acceso a laboratorios especializados de la universidad
- Participación en programas de mentoría
- Cursos de nivelación gratuitos
- Descuentos en programas de pregrado

### Para Docentes:
- Capacitaciones en metodologías innovadoras
- Acceso a recursos bibliográficos
- Programas de actualización académica

### Para Instituciones:
- Intercambio de buenas prácticas
- Desarrollo de proyectos conjuntos
- Investigación educativa colaborativa

"Esta alianza fortalece nuestra misión de formar jóvenes íntegros y competentes, preparados para continuar sus estudios en las mejores universidades del país", manifestó el Rector de los Colegios Arquidiocesanos.
    `,
    categoria: "Institucional",
    fecha: "2024-08-30",
    autor: "Rectoría",
    imagen: "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
    destacada: false,
  },
  {
    id: "6",
    slug: "proyecto-ambiental",
    titulo: "Colegios Arquidiocesanos se unen por el planeta",
    resumen: "Lanzamos la iniciativa 'Escuelas Verdes' para reducir nuestra huella de carbono y educar en sostenibilidad.",
    contenido: `
## Escuelas Verdes

Los Colegios Arquidiocesanos de Cali se comprometen con el cuidado de la casa común mediante el lanzamiento del programa "Escuelas Verdes", una iniciativa integral de sostenibilidad ambiental.

## Objetivos del Programa

- Reducir el consumo de energía en un 20% para 2025
- Implementar sistemas de reciclaje en todos los colegios
- Crear huertas escolares orgánicas
- Eliminar el uso de plásticos de un solo uso
- Plantar 1,000 árboles nativos en Cali

## Acciones Implementadas

### Energía
Instalación de paneles solares en 5 colegios piloto, generando una reducción del 30% en el consumo energético.

### Residuos
Programa de separación en la fuente con puntos de reciclaje en cada aula y área común.

### Educación
Integración de la dimensión ambiental en el currículo escolar desde preescolar hasta grado 11.

## Compromiso Laudato Si'

Esta iniciativa responde al llamado del Papa Francisco en la encíclica Laudato Si' sobre el cuidado de nuestra casa común. Invitamos a toda la comunidad educativa a unirse a este esfuerzo por un futuro más sostenible.
    `,
    categoria: "Pastoral",
    fecha: "2024-08-15",
    autor: "Equipo de Sostenibilidad",
    imagen: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    destacada: false,
  },
];

export const getNoticiaBySlug = (slug: string): Noticia | undefined => {
  return noticias.find((n) => n.slug === slug);
};

export const getNoticiasDestacadas = (): Noticia[] => {
  return noticias.filter((n) => n.destacada).slice(0, 3);
};

export const getNoticiasByCategoria = (categoria: string): Noticia[] => {
  return noticias.filter((n) => n.categoria === categoria);
};

export const formatFecha = (fecha: string): string => {
  const date = new Date(fecha);
  return date.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
