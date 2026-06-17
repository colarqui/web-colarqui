# Documentación Técnica y de Uso — Plataforma Web Colegios Arquidiocesanos

**Última actualización:** Mayo 2026  
**Proyecto:** Sitio web institucional + Panel de Administración + Chat IA con PDFs  
**Fundaciones:** FESIH (Fundación Educativa Santa Isabel de Hungría) · FAUU (Fundación Educativa Alberto Uribe Urdaneta)  
**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS · Prisma ORM · SQLite · JWT · DeepSeek · Gemini

---

## 1. Stack Tecnológico

| Capa | Tecnología | Versión | Propósito |
|------|-----------|---------|-----------|
| Framework | Next.js | ^16.2.3 | App Router, Server Components, API Routes |
| Runtime | React | ^19.2.5 | UI rendering |
| Lenguaje | TypeScript | ^5 | Tipado estático |
| Estilos | Tailwind CSS | ^3.4.1 | Utility-first CSS |
| Íconos | Lucide React | ^0.344.0 | Iconografía SVG |
| ORM | Prisma | ^6.0.0 | Modelos de datos, queries seguros |
| Base de Datos | SQLite | — | Archivo local `prisma/dev.db` (desarrollo) |
| Auth JWT | jose | ^5.9.6 | Firma y verificación de tokens JWT |
| Password Hash | bcryptjs | ^2.4.3 | Hashing seguro de contraseñas |
| IA Principal | DeepSeek API | — | Chat Sara + gestor de documentos |
| IA Alternativa | @google/genai | ^1.0.0 | Módulo Gemini (disponible, no activo en rutas) |
| PDF Parse | pdf-parse | ^1.1.1 | Extracción de texto de PDFs para RAG |
| UUID | uuid | ^11.0.0 | Nombres únicos para archivos subidos |
| Correo | nodemailer | ^8.0.5 | Envío de formularios (acoso, CCL, CV) |

---

## 2. Estructura de Carpetas Completa

```
prototipo-cb/
├── app/
│   ├── layout.tsx                    ← Root layout (metadata global, ScrollToTop)
│   ├── page.tsx                      ← Homepage (Hero, Stats, Colegios, Noticias, Sara)
│   ├── not-found.tsx                 ← Página 404 personalizada
│   ├── globals.css                   ← Estilos globales + variables Tailwind
│   │
│   ├── colegios/
│   │   ├── page.tsx                  ← Listado público de colegios (Server Component)
│   │   ├── ColegiosList.tsx          ← Filtros y cards (Client Component)
│   │   └── [slug]/page.tsx           ← Detalle individual de colegio
│   │
│   ├── noticias/
│   │   ├── page.tsx                  ← Listado público (Server Component)
│   │   ├── NoticiasList.tsx          ← Filtros por categoría (Client Component)
│   │   └── [slug]/page.tsx           ← Artículo individual
│   │
│   ├── admisiones/
│   │   └── page.tsx                  ← Página estática de admisiones
│   │
│   ├── documentos/
│   │   └── page.tsx                  ← Gestor público de PDFs + Chat IA
│   │
│   ├── servicios/
│   │   └── pqrsf/page.tsx            ← Buzón PQRSF (formulario Zoho)
│   │
│   ├── quienes-somos/
│   │   ├── horizonte/page.tsx        ← Misión, Visión, Valores, Política de Calidad
│   │   ├── pastoral/page.tsx         ← Pastoral Educativa
│   │   ├── trabaja-con-nosotros/page.tsx ← Formulario hoja de vida + CV upload
│   │   └── directorio/page.tsx       ← Directorio telefónico (PDF)
│   │
│   ├── transparencia/
│   │   ├── page.tsx                  ← Portal de Transparencia (índice)
│   │   ├── protocolo-acoso/page.tsx  ← Protocolo prevención acoso + formulario denuncia
│   │   ├── comite-convivencia/page.tsx ← CCL FESIH / FAUU + formulario queja
│   │   └── informes-gestion-social/
│   │       ├── page.tsx              ← Portal de informes (tabs FESIH/FAUU, todos los años)
│   │       ├── 2022/
│   │       │   ├── page.tsx          ← Redirect → /informes-gestion-social
│   │       │   └── [fundacion]/page.tsx ← Informe completo 2022 (fesih/fauu)
│   │       ├── 2023/
│   │       │   ├── page.tsx          ← Redirect → /informes-gestion-social
│   │       │   └── [fundacion]/page.tsx ← Informe completo 2023 (fesih/fauu)
│   │       └── [fundacion]/
│   │           └── [anio]/page.tsx   ← Informes históricos 2017–2019 (PDFs)
│   │
│   ├── admin/
│   │   ├── layout.tsx                ← Layout admin (verifica sesión, AdminShell)
│   │   ├── page.tsx                  ← Dashboard (conteos, accesos rápidos)
│   │   ├── AdminShell.tsx            ← Sidebar + navbar del panel
│   │   ├── login/page.tsx            ← Formulario de login
│   │   ├── noticias/
│   │   │   ├── page.tsx              ← Lista noticias admin
│   │   │   ├── nueva/page.tsx        ← Formulario nueva noticia
│   │   │   ├── [id]/page.tsx         ← Editar noticia
│   │   │   └── NoticiaForm.tsx       ← Formulario compartido
│   │   ├── colegios/
│   │   │   ├── page.tsx              ← Lista colegios admin
│   │   │   ├── nuevo/page.tsx        ← Formulario nuevo colegio
│   │   │   ├── [id]/page.tsx         ← Editar colegio (datos base)
│   │   │   ├── [id]/detalle/page.tsx ← Editar oferta académica, equipo, galería, costos
│   │   │   └── ColegioForm.tsx       ← Formulario compartido
│   │   └── documentos/
│   │       └── page.tsx              ← Subida y gestión de PDFs
│   │
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts        ← POST: verifica credenciales, emite JWT cookie
│       │   ├── logout/route.ts       ← POST: borra cookie de sesión
│       │   └── me/route.ts           ← GET: info del usuario autenticado
│       ├── colegios/
│       │   ├── route.ts              ← GET (público), POST (admin)
│       │   ├── [id]/route.ts         ← GET/PUT/DELETE
│       │   └── detalle/route.ts      ← GET/PUT ColegioDetalle
│       ├── noticias/
│       │   ├── route.ts              ← GET (público), POST (admin)
│       │   └── [id]/route.ts         ← GET/PUT/DELETE
│       ├── documentos/
│       │   ├── route.ts              ← GET (público), POST upload+parse PDF (admin)
│       │   └── [id]/
│       │       ├── route.ts          ← GET/PUT/DELETE
│       │       └── descargar/route.ts ← GET: stream del archivo PDF
│       ├── chat/route.ts             ← POST: pregunta + documentIds → DeepSeek RAG
│       ├── sara/route.ts             ← POST: chat general Sara → DeepSeek
│       ├── informes-comentarios/route.ts ← GET/POST comentarios públicos
│       ├── pqrsf/route.ts            ← POST: reenvía FormData a Zoho Forms
│       ├── upload/route.ts           ← POST: sube imagen → /public/images/uploads/
│       ├── contacto/route.ts         ← POST: envía CV por email (nodemailer)
│       ├── acoso/route.ts            ← POST: envía denuncia de acoso (nodemailer)
│       └── comite-convivencia/route.ts ← POST: envía queja CCL (nodemailer)
│
├── components/
│   ├── Header.tsx                    ← Navegación principal (dropdowns, mobile menu)
│   ├── Footer.tsx                    ← Pie de página
│   ├── ChatIA.tsx                    ← Componente chat Sara (homepage)
│   ├── NoticiasDestacadas.tsx        ← Cards noticias en homepage
│   ├── StatsCounter.tsx              ← Contadores animados (homepage)
│   ├── ParticleField.tsx             ← Animación de partículas (hero)
│   ├── GalleryLightbox.tsx           ← Galería de imágenes con lightbox
│   ├── BeneficiosDescuentos.tsx      ← Sección beneficios en detalle colegio
│   ├── CostosAccordion.tsx           ← Acordeón de costos (Calendario B)
│   └── ScrollToTop.tsx               ← Botón scroll al inicio
│
├── lib/
│   ├── prisma.ts                     ← Singleton PrismaClient (evita hot-reload leaks)
│   ├── auth.ts                       ← JWT (SignJWT/jwtVerify), bcrypt, cookies
│   ├── models.ts                     ← Helpers Prisma → tipos UI, queries nombradas
│   ├── utils.ts                      ← slugify(), formatBytes(), safeJsonParse()
│   ├── deepseek.ts                   ← Wrapper DeepSeek API (OpenAI-compatible)
│   ├── gemini.ts                     ← Wrapper @google/genai (módulo alternativo)
│   ├── sara-context.ts               ← buildSaraSystemPrompt() – contexto institucional
│   └── colores-colegios.ts           ← Mapa slug → color primario por colegio
│
├── data/
│   ├── colegios.ts                   ← Datos estáticos de los 31 colegios (seed source)
│   ├── colegios-extra.ts             ← Datos extendidos por colegio (oferta, galería)
│   ├── noticias.ts                   ← 6 noticias de ejemplo (seed source)
│   ├── informe2022.ts                ← Datos completos informe gestión 2022 FESIH/FAUU
│   └── informe2023.ts                ← Datos completos informe gestión 2023 FESIH/FAUU
│
├── types/
│   └── app/                          ← Tipos globales de Next.js (layout, page)
│
├── prisma/
│   ├── schema.prisma                 ← Definición de modelos y datasource
│   ├── seed.ts                       ← Script de población inicial
│   ├── dev.db                        ← Base de datos SQLite (en .gitignore)
│   └── migrations/                   ← Historial de migraciones Prisma
│
├── public/
│   ├── logos/                        ← Logotipos colegios + favicon.png
│   └── images/                       ← Imágenes estáticas del sitio
│
├── uploads/                          ← PDFs subidos por admin (en .gitignore)
│
├── middleware.ts                     ← Protege /admin/* con JWT cookie
├── next.config.mjs                   ← images.unoptimized, allowedDevOrigins
├── tailwind.config.js                ← Colores brand, colegio, fontFamily
├── tsconfig.json                     ← Configuración TypeScript + path aliases
├── package.json                      ← Dependencias y scripts npm
├── .env.example                      ← Plantilla de variables de entorno
├── .gitignore                        ← node_modules, .next, .env, dev.db, uploads/
├── DOCUMENTACION_TECNICA.md          ← Este archivo
└── ERRORES_CONOCIDOS.md              ← Bitácora de errores y soluciones

```

---

## 3. Variables de Entorno

Copia `.env.example` a `.env` y completa todos los valores antes de iniciar.

| Variable | Obligatoria | Descripción |
|----------|------------|-------------|
| `DATABASE_URL` | Sí | Ruta al archivo SQLite: `file:./dev.db` |
| `JWT_SECRET` | Sí | Cadena aleatoria ≥32 chars para firmar JWTs |
| `ADMIN_EMAIL` | Seed | Email del admin inicial (solo para `db:seed`) |
| `ADMIN_PASSWORD` | Seed | Contraseña admin inicial (solo para `db:seed`) |
| `ADMIN_NAME` | Seed | Nombre visible del admin |
| `DEEPSEEK_API_KEY` | Sí | API Key de [platform.deepseek.com](https://platform.deepseek.com) |
| `GEMINI_API_KEY` | Opcional | API Key de Google AI Studio (módulo alternativo) |
| `GEMINI_MODEL` | Opcional | Modelo Gemini, default: `gemini-2.0-flash` |
| `SMTP_HOST` | Formularios | Host SMTP, ej: `smtp.gmail.com` |
| `SMTP_PORT` | Formularios | Puerto SMTP, ej: `587` |
| `SMTP_SECURE` | Formularios | `"true"` para puerto 465, `"false"` para 587 |
| `SMTP_USER` | Formularios | Correo remitente |
| `SMTP_PASS` | Formularios | App Password de Gmail (no la contraseña normal) |
| `CONTACT_EMAIL` | Formularios | Destino de hojas de vida (`/api/contacto`) |

> **Gmail App Password:** Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords), habilita 2FA y genera una App Password de 16 caracteres para usar como `SMTP_PASS`.

---

## 4. Instalación y Primer Arranque

```powershell
# IMPORTANTE: En Windows, usar cmd /c porque PowerShell bloquea scripts npm

# 1. Instalar dependencias
cmd /c "npm install --legacy-peer-deps"

# 2. Copiar variables de entorno y editar
copy .env.example .env
# Editar .env con valores reales (JWT_SECRET, DEEPSEEK_API_KEY, etc.)

# 3. Generar cliente Prisma (regenerar cada vez que cambie schema.prisma)
cmd /c "npx prisma generate"

# 4. Crear/sincronizar base de datos
cmd /c "npx prisma db push"

# 5. Poblar datos iniciales (colegios, noticias, usuario admin)
cmd /c "npm run db:seed"

# 6. Iniciar servidor de desarrollo
cmd /c "npm run dev"
# → http://localhost:3000
# → Panel admin: http://localhost:3000/admin/login
```

### Reset completo de la base de datos

```powershell
# Borrar base de datos y recrear
del prisma\dev.db
cmd /c "npx prisma db push"
cmd /c "npm run db:seed"
```

---

## 5. Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                     SITIO PÚBLICO                           │
│  /  /colegios  /noticias  /transparencia  /documentos       │
│         Server Components + Client Components               │
└──────────────────────────┬──────────────────────────────────┘
                           │  Server-side fetch
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    lib/models.ts                            │
│          getColegios() · getNoticias() · getColegioDetalle()│
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   Prisma ORM → SQLite                       │
│  User · Colegio · ColegioDetalle · Noticia                  │
│  Documento · ComentarioInforme                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   PANEL DE ADMIN                            │
│             /admin/* (protegido por middleware)             │
└──────────────────────────┬──────────────────────────────────┘
                           │  JWT Cookie
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   middleware.ts                             │
│         Verifica ca_admin_session cookie + jose             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   SISTEMA DE IA                             │
│  /api/sara   →  DeepSeek Chat  ←  sara-context.ts           │
│  /api/chat   →  DeepSeek RAG   ←  contenido PDFs (Prisma)  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   FORMULARIOS DE CORREO                     │
│  /api/contacto      →  nodemailer → SMTP                    │
│  /api/acoso         →  nodemailer → SMTP                    │
│  /api/comite-convivencia → nodemailer → SMTP                │
│  /api/pqrsf         →  Zoho Forms API (sin SMTP)            │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Modelos de Datos (Prisma Schema Actual)

### User
Usuarios administradores del panel.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (cuid) | ID único |
| `email` | String unique | Email de acceso |
| `password` | String | Hash bcrypt |
| `name` | String | Nombre visible |
| `role` | String | `"admin"` por defecto |

### Colegio
Información base de cada colegio (31 colegios arquidiocesanos).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (cuid) | ID único |
| `slug` | String unique | URL-safe, ej: `san-juan-bosco` |
| `nombre` | String | Nombre completo |
| `descripcion` | String | Texto descriptivo |
| `direccion` | String | Dirección física |
| `zona` | String | Norte / Sur / Centro / Oriente / Occidente |
| `telefono` | String | Número de contacto |
| `email` | String | Correo del colegio |
| `facebook` | String? | URL perfil Facebook |
| `calendario` | String | `"A"` o `"B"` |
| `jornadas` | String | JSON: `["Mañana","Tarde"]` |
| `niveles` | String | JSON: `["Preescolar","Primaria","Bachillerato"]` |
| `estudiantes` | Int | Número de estudiantes |
| `docentes` | Int | Número de docentes |
| `fundacion` | Int | Año de fundación |
| `egresados` | Int? | Total de egresados |
| `caracteristicas` | String | JSON: array de tags |
| `logo` | String? | Ruta relativa del logo |
| `publicado` | Boolean | Visible en el sitio público |

### ColegioDetalle
Contenido enriquecido por colegio (oferta, equipo, galería, costos).

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `colegioSlug` | String unique | FK hacia `Colegio.slug` |
| `ofertaTitulo` | String | Título de la sección académica |
| `ofertaCopy` | String | Texto descriptivo |
| `ofertaItems` | String | JSON: `[{icono, titulo, descripcion?}]` |
| `equipo` | String | JSON: `[{nombre, cargo, foto?}]` |
| `testimonios` | String | JSON: `[{texto, nombre, relacion, foto?, video?}]` |
| `galeria` | String | JSON: `[{url, alt?}]` |
| `costos` | String | JSON: `[{grado, matricula, descMatricula?, pension, descPension?}]` |

### Noticia

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (cuid) | ID único |
| `slug` | String unique | URL-safe |
| `titulo` | String | Título del artículo |
| `resumen` | String | Extracto breve |
| `contenido` | String | Texto completo |
| `categoria` | String | Académica / Institucional / Cultura / Deportes |
| `fecha` | DateTime | Fecha de publicación |
| `autor` | String | Nombre del autor |
| `imagen` | String | URL de la imagen principal |
| `destacada` | Boolean | Aparece en homepage |
| `publicada` | Boolean | Visible en el sitio público |

### Documento
PDFs subidos para el chat RAG.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (cuid) | ID único |
| `titulo` | String | Nombre visible |
| `descripcion` | String? | Descripción opcional |
| `categoria` | String | Ej: `"Manual"`, `"Política"`, `"General"` |
| `nombreArchivo` | String | Nombre original del archivo |
| `rutaArchivo` | String | UUID + ext en `/uploads/` |
| `tamano` | Int | Tamaño en bytes |
| `contenido` | String | Texto extraído con `pdf-parse` |
| `paginas` | Int | Número de páginas |
| `activo` | Boolean | Disponible para consulta |

### ComentarioInforme
Comentarios públicos en los informes de gestión social.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | String (cuid) | ID único |
| `fundacion` | String | `"FESIH"` o `"FAUU"` |
| `anio` | Int | Año del informe |
| `nombre` | String | Nombre del comentarista |
| `comentario` | String | Texto del comentario |
| `createdAt` | DateTime | Fecha/hora de creación |

---

## 7. Rutas Públicas (Sitemap)

| Ruta | Tipo | Descripción |
|------|------|-------------|
| `/` | Server | Homepage: hero, estadísticas, colegios destacados, noticias, Sara chat |
| `/colegios` | Server | Listado de los 31 colegios con filtros por zona/calendario/nivel |
| `/colegios/[slug]` | Server | Detalle: oferta académica, equipo, galería, testimonios, costos |
| `/noticias` | Server | Listado de noticias con filtro por categoría |
| `/noticias/[slug]` | Server | Artículo completo + noticias relacionadas |
| `/admisiones` | Static | Información del proceso de admisiones |
| `/documentos` | Client | Gestor de PDFs + chat IA (Sara) |
| `/servicios/pqrsf` | Client | Formulario PQRSF integrado con Zoho Forms |
| `/quienes-somos/horizonte` | Static | Misión, Visión, Valores, Principios, Política de Calidad |
| `/quienes-somos/pastoral` | Static | Pastoral Educativa |
| `/quienes-somos/trabaja-con-nosotros` | Client | Formulario hoja de vida con upload PDF |
| `/quienes-somos/directorio` | Static | Directorio telefónico (enlace a PDF) |
| `/transparencia` | Static | Portal de transparencia institucional |
| `/transparencia/protocolo-acoso` | Client | Protocolo + formulario denuncia (nodemailer) |
| `/transparencia/comite-convivencia` | Client | Info CCL + formulario queja (nodemailer) |
| `/transparencia/informes-gestion-social` | Client | Portal informes DIAN (tabs FESIH/FAUU, 2017–2025) |
| `/transparencia/informes-gestion-social/2022/fesih` | Client | Informe completo FESIH 2022 |
| `/transparencia/informes-gestion-social/2022/fauu` | Client | Informe completo FAUU 2022 |
| `/transparencia/informes-gestion-social/2023/fesih` | Client | Informe completo FESIH 2023 |
| `/transparencia/informes-gestion-social/2023/fauu` | Client | Informe completo FAUU 2023 |
| `/transparencia/informes-gestion-social/FESIH/[anio]` | Client | Informes históricos 2017–2019 FESIH (PDFs) |
| `/transparencia/informes-gestion-social/FAUU/[anio]` | Client | Informes históricos 2017–2019 FAUU (PDFs) |

### Rutas de Administración

| Ruta | Descripción |
|------|-------------|
| `/admin/login` | Formulario de acceso |
| `/admin` | Dashboard con conteos y accesos rápidos |
| `/admin/noticias` | Lista de noticias + crear/editar/eliminar |
| `/admin/noticias/nueva` | Formulario nueva noticia |
| `/admin/noticias/[id]` | Editar noticia existente |
| `/admin/colegios` | Lista de colegios + crear/editar/eliminar |
| `/admin/colegios/nuevo` | Formulario nuevo colegio |
| `/admin/colegios/[id]` | Editar datos base del colegio |
| `/admin/colegios/[id]/detalle` | Editar oferta, equipo, galería, costos |
| `/admin/documentos` | Subir PDFs + gestionar documentos para RAG |

---

## 8. API Endpoints

### Autenticación

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/auth/login` | No | `{email, password}` → cookie JWT `ca_admin_session` |
| POST | `/api/auth/logout` | No | Elimina cookie de sesión |
| GET | `/api/auth/me` | Cookie | Devuelve `{userId, email, name, role}` |

### Colegios

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/colegios` | No | Lista todos los colegios (JSON raw de Prisma) |
| POST | `/api/colegios` | Sí | Crea nuevo colegio |
| GET | `/api/colegios/[id]` | No | Obtiene colegio por ID |
| PUT | `/api/colegios/[id]` | Sí | Actualiza colegio |
| DELETE | `/api/colegios/[id]` | Sí | Elimina colegio |
| GET | `/api/colegios/detalle` | No | `?slug=X` → ColegioDetalle |
| PUT | `/api/colegios/detalle` | Sí | Upsert ColegioDetalle |

### Noticias

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/noticias` | No | Lista todas las noticias |
| POST | `/api/noticias` | Sí | Crea nueva noticia |
| GET | `/api/noticias/[id]` | No | Obtiene noticia por ID |
| PUT | `/api/noticias/[id]` | Sí | Actualiza noticia |
| DELETE | `/api/noticias/[id]` | Sí | Elimina noticia |

### Documentos (RAG)

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/api/documentos` | No | Lista documentos (sin campo `contenido`) |
| POST | `/api/documentos` | Sí | Sube PDF: guarda en `/uploads/`, extrae texto, crea Documento |
| GET | `/api/documentos/[id]` | No | Obtiene documento por ID |
| PUT | `/api/documentos/[id]` | Sí | Actualiza metadata (titulo, descripcion, activo) |
| DELETE | `/api/documentos/[id]` | Sí | Elimina registro + archivo físico |
| GET | `/api/documentos/[id]/descargar` | No | Devuelve el archivo PDF como stream |

### IA / Chat

| Método | Ruta | Auth | Body | Descripción |
|--------|------|------|------|-------------|
| POST | `/api/sara` | No | `{message, history?}` | Chat general Sara → DeepSeek |
| POST | `/api/chat` | No | `{question, documentIds[], history?}` | RAG sobre PDFs seleccionados → DeepSeek |

### Formularios

| Método | Ruta | Body | Descripción |
|--------|------|------|-------------|
| POST | `/api/pqrsf` | FormData (Zoho fields) | Reenvía a Zoho Forms |
| POST | `/api/contacto` | FormData: nombre, telefono, correo, cargo, files[] | CV → email SMTP |
| POST | `/api/acoso` | FormData: datos víctima + victimario + files[] | Denuncia → email SMTP |
| POST | `/api/comite-convivencia` | FormData: fundacion, nombre, email, descripcion, files[] | Queja CCL → email SMTP |
| GET | `/api/informes-comentarios` | `?fundacion=FESIH&anio=2022` | Lista comentarios |
| POST | `/api/informes-comentarios` | `{fundacion, anio, nombre, comentario}` | Crea comentario |

### Subida de Imágenes

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/api/upload` | Sí | Sube imagen (JPG/PNG/WEBP/GIF, máx 5MB) → `/public/images/uploads/` |

---

## 9. Sistema de IA

### 9.1 Chat Sara (homepage + docs)

Sara es el asistente virtual de Colegios Arquidiocesanos. Usa DeepSeek con un system prompt institucional definido en `lib/sara-context.ts`.

**Flujo `/api/sara`:**
```
Usuario escribe mensaje
        ↓
POST /api/sara { message, history }
        ↓
buildSaraSystemPrompt() → contexto completo del sitio
        ↓
deepseekChat([system, ...history, user_message])
        ↓
Respuesta de Sara
```

**Flujo `/api/chat` (RAG con PDFs):**
```
Usuario selecciona documentos + escribe pregunta
        ↓
POST /api/chat { question, documentIds[], history }
        ↓
Prisma: busca documentos, carga campo `contenido`
        ↓
Construye prompt: system + contexto PDFs + historial + pregunta
        ↓
deepseekChat(messages)
        ↓
Respuesta citando fuentes del documento
```

### 9.2 Módulo Gemini (alternativo)

El archivo `lib/gemini.ts` contiene un wrapper para `@google/genai`. Está disponible pero **no está conectado a ninguna ruta de producción actualmente**. Puede activarse fácilmente cambiando el import en `/api/chat/route.ts` si se desea migrar de DeepSeek a Gemini.

Requiere: `GEMINI_API_KEY` en `.env`.

### 9.3 Límites del sistema RAG actual

- Máximo 30,000 caracteres por documento en el prompt (≈7,500 tokens)
- Estrategia: contexto completo en ventana (sin embeddings/vectores)
- Para documentos muy largos, solo se procesa el texto de los primeros 30k chars
- Mejora futura: implementar chunking + embeddings (pgvector, Pinecone, etc.)

---

## 10. Informes de Gestión Social (Transparencia DIAN)

### 10.1 Estructura de URLs

Los informes siguen una jerarquía de rutas para cumplir con los requerimientos de publicación del DIAN:

```
/transparencia/informes-gestion-social
    ├── (portal con tabs FESIH/FAUU)
    ├── 2022/fesih     → datos en data/informe2022.ts  (FESIH)
    ├── 2022/fauu      → datos en data/informe2022.ts  (FAUU)
    ├── 2023/fesih     → datos en data/informe2023.ts  (FESIH)
    ├── 2023/fauu      → datos en data/informe2023.ts  (FAUU)
    ├── FESIH/2019     → PDFs en Google Drive
    ├── FESIH/2018     → PDFs en colegiosarquidiocesanos.edu.co
    ├── FESIH/2017     → PDFs en colegiosarquidiocesanos.edu.co
    ├── FAUU/2019      → PDFs en Google Drive
    ├── FAUU/2018      → PDFs en colegiosarquidiocesanos.edu.co
    └── FAUU/2017      → PDFs en colegiosarquidiocesanos.edu.co
```

### 10.2 Resolución de rutas dinámicas (Next.js)

Next.js resuelve correctamente el conflicto entre rutas estáticas y dinámicas: los segmentos `2022` y `2023` tienen prioridad sobre el segmento dinámico `[fundacion]`.

| Ruta visitada | Resuelve a |
|---------------|-----------|
| `/2022/fesih` | `2022/[fundacion]/page.tsx` con `params.fundacion = "fesih"` |
| `/FESIH/2019` | `[fundacion]/[anio]/page.tsx` con `params.fundacion = "FESIH"` |

> **Importante:** Los parámetros en `2022/[fundacion]` llegan en **minúscula** (`fesih`, `fauu`). El componente usa `.toUpperCase()` para mapear al objeto de datos. Los parámetros en `[fundacion]/[anio]` llegan en **MAYÚSCULA** tal como se pasan en la URL.

### 10.3 Separación de contenidos FESIH / FAUU

Las dos fundaciones son **entidades separadas** con contenidos distintos:
- **FESIH** = Fundación Educativa Santa Isabel de Hungría
- **FAUU** = Fundación Educativa Alberto Uribe Urdaneta

**Regla:** Nunca copiar automáticamente contenido de FESIH a FAUU. Agregar datos de FAUU solo cuando se proporcionan explícitamente.

Campos opcionales en la interfaz TypeScript (solo FESIH los tiene):
- `educacionVideo`
- `impactoVernaza`
- `generoDetalle`
- `diversidadEtnica`
- `estudiantesImagen`

### 10.4 Agregar un nuevo año de informe

1. Crear `data/informeAÑO.ts` con la interfaz correspondiente y datos de ambas fundaciones
2. Crear `app/transparencia/informes-gestion-social/AÑO/page.tsx` (redirect al portal)
3. Crear `app/transparencia/informes-gestion-social/AÑO/[fundacion]/page.tsx` (página completa)
4. Actualizar el array `REPORTES` en `informes-gestion-social/page.tsx` para ambas fundaciones

---

## 11. Autenticación y Seguridad

### 11.1 Flujo de Login

```
POST /api/auth/login
  1. Busca usuario en Prisma por email
  2. bcrypt.compare(passwordPlano, hashAlmacenado)
  3. SignJWT({ userId, email, name, role }, SECRET_KEY, HS256, exp: 7d)
  4. cookies().set("ca_admin_session", token, { httpOnly, secure, sameSite: "lax" })
  5. Responde { success: true }
```

### 11.2 Cookie de sesión

| Propiedad | Valor |
|-----------|-------|
| Nombre | `ca_admin_session` |
| HttpOnly | `true` (inaccesible desde JS) |
| Secure | `true` en producción |
| SameSite | `lax` |
| MaxAge | 7 días |

### 11.3 Protección de rutas

**Middleware (`middleware.ts`):** Intercepta `/admin/*` y redirige a login si no hay cookie válida.

**API Routes:** Cada endpoint de mutación llama a `getSession()` internamente como segunda capa de defensa:
```typescript
const session = await getSession();
if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
```

### 11.4 Limitaciones de seguridad conocidas (pendientes)

- No hay rate limiting en `/api/auth/login` (riesgo de brute-force)
- No hay CSRF token explícito (mitigado por SameSite=lax + cookie httpOnly)
- No hay log de auditoría de acciones admin

---

## 12. Branding y Estilos

### 12.1 Paleta de colores

| Token Tailwind | Hex | Uso |
|----------------|-----|-----|
| `brand-dark` | `#12100B` | Fondo oscuro, texto principal |
| `brand-gold` | `#FBB823` | Acento principal, CTAs, highlights |
| `brand-coral` | `#EE7363` | Decorativo (fondos, íconos) |
| `brand-coral-dark` | `#C24038` | Texto coral sobre fondo claro (AA accesible) |

### 12.2 Colores por colegio

Cada colegio tiene un color primario definido en `lib/colores-colegios.ts`. En las páginas de detalle, el color se aplica con CSS variables:
```css
--col-primary: R G B    /* ej: 0 86 163 para azul */
--col-primary-fg: R G B /* texto sobre el color primario */
--col-secondary: R G B  /* color de acento secundario */
```

Las clases Tailwind `colegio-primary`, `colegio-secondary` responden a estas variables.

### 12.3 Tipografía

- **Body:** Century Gothic (sistema) con fallback `system-ui, sans-serif`
- **Tailwind config:** declara `Inter` como `fontFamily.sans` (disponible para uso explícito)
- No se carga ninguna fuente web via `@import` — todo sistema/local

---

## 13. Preparación para Deploy

### 13.1 Checklist pre-deploy

- [ ] Todos los campos de `.env` completados con valores de producción
- [ ] `JWT_SECRET` generado con alta entropía (≥32 chars aleatorios)
- [ ] `DEEPSEEK_API_KEY` configurada y con créditos activos
- [ ] Variables SMTP configuradas (o formularios desactivados)
- [ ] `npm run build` ejecuta sin errores TypeScript
- [ ] `npx prisma generate` ejecutado después del último cambio a schema
- [ ] `npm run db:seed` ejecutado para cargar datos iniciales
- [ ] Contraseña admin cambiada (no usar `Admin123!` en producción)

### 13.2 Build de producción

```powershell
# Verificar que no hay errores TypeScript
cmd /c "npx tsc --noEmit"

# Build optimizado
cmd /c "npm run build"

# Iniciar en modo producción
cmd /c "npm start"
```

### 13.3 Consideraciones de infraestructura

| Aspecto | Actual (dev) | Recomendado (prod) |
|---------|-------------|---------------------|
| Base de datos | SQLite (`dev.db`) | PostgreSQL / PlanetScale |
| Almacenamiento PDFs | `/uploads/` local | S3 / Cloudflare R2 |
| Almacenamiento imágenes | `/public/images/uploads/` local | CDN / S3 |
| Deploy | Local | Vercel / Railway / VPS |
| BD migraciones | `prisma db push` | `prisma migrate deploy` |

### 13.4 Migración a PostgreSQL

1. Cambiar `datasource` en `schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
2. Actualizar `DATABASE_URL` en `.env` con URL de PostgreSQL
3. `npx prisma migrate deploy`

---

## 14. Guía de Uso — Panel de Administración

### 14.1 Acceso

- URL: `/admin/login`
- Credenciales: definidas en `.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`)
- Sesión: 7 días (cookie httpOnly)

### 14.2 Gestión de Noticias

1. Ir a `/admin/noticias`
2. **Nueva:** botón "+ Nueva noticia" → llena título, resumen, contenido, categoría, fecha, imagen
3. **Editar:** click en el nombre de la noticia
4. **Eliminar:** botón de basura en la lista (irreversible)
5. **Publicar/ocultar:** toggle en el formulario de edición (`publicada`)
6. **Destacar:** toggle `destacada` → aparece en homepage (máx 3 recomendadas)

> El slug se genera automáticamente desde el título. Se puede editar manualmente.

### 14.3 Gestión de Colegios

**Datos base (`/admin/colegios/[id]`):** nombre, dirección, zona, teléfono, jornadas, niveles, etc.

**Datos de detalle (`/admin/colegios/[id]/detalle`):**
- Oferta académica (ítems con ícono, título, descripción)
- Equipo directivo (nombre, cargo, foto)
- Testimonios (texto, persona, relación)
- Galería de imágenes
- Costos (solo colegios Calendario B): matrícula y pensión por grado

> Para subir imágenes en el detalle, se usa `/api/upload` que las guarda en `/public/images/uploads/`.

### 14.4 Gestión de Documentos (RAG)

1. Ir a `/admin/documentos`
2. **Subir:** seleccionar PDF, ingresar título, descripción y categoría → el sistema extrae el texto automáticamente con `pdf-parse`
3. **Activar/Desactivar:** toggle para incluir/excluir del chat
4. **Eliminar:** borra el registro de la DB y el archivo físico de `/uploads/`

Los documentos activos aparecen en `/documentos` (vista pública) para que los usuarios los seleccionen en el chat.

---

## 15. Roadmap / Pendientes

| Funcionalidad | Prioridad | Notas |
|---------------|-----------|-------|
| Rate limiting en `/api/auth/login` | Alta | Prevenir brute-force |
| Migración a PostgreSQL | Alta | Para producción real |
| Almacenamiento en S3/R2 | Alta | PDFs e imágenes |
| Log de auditoría admin | Media | Quién hizo qué y cuándo |
| Sección "Quiénes Somos → Reseña Histórica" | Media | Página `/quienes-somos/resena` |
| Informe FESIH/FAUU 2024 (migración desde WordPress) | Media | Actualmente enlace externo |
| Informe FESIH/FAUU 2025 | Baja | En elaboración |
| Subscripción boletín (sección noticias) | Baja | Botón sin funcionalidad activa |
| Botones de compartir en noticias | Baja | Facebook/Twitter sin `href` dinámico |
| Embeddings + vectores RAG | Baja | Mejorar precisión del chat |
| Tests unitarios (Vitest/Jest) | Media | Cero cobertura actual |
| Sitemap XML dinámico | Media | SEO — generado desde Prisma |
| Open Graph tags por página | Media | SEO — compartir en redes |

---

## 16. Referencias

- **Next.js App Router:** https://nextjs.org/docs/app
- **Prisma ORM:** https://www.prisma.io/docs
- **DeepSeek API:** https://platform.deepseek.com/docs
- **Google Gemini:** https://ai.google.dev/gemini-api/docs
- **Jose (JWT):** https://github.com/panva/jose
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Lucide Icons:** https://lucide.dev/icons
- **nodemailer:** https://nodemailer.com/

---

> Archivo mantenido por el equipo de desarrollo. Actualizar con cada sprint o cambio estructural.  
> Ver también: `ERRORES_CONOCIDOS.md` para bitácora de bugs y soluciones.
