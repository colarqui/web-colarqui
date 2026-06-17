# Gestor de PDFs + Panel Admin + Chat con Gemini

Guía rápida para activar el nuevo módulo.

## 1. Instalar dependencias

```powershell
cmd /c "npm install --legacy-peer-deps"
```

## 2. Configurar variables de entorno

Copia el archivo `.env.example` a `.env` y rellena los valores:

```powershell
copy .env.example .env
```

Edita `.env`:

- `JWT_SECRET`: cadena aleatoria de 32+ caracteres
- `ADMIN_EMAIL` / `ADMIN_PASSWORD`: credenciales del admin inicial
- `GEMINI_API_KEY`: obténla en https://aistudio.google.com/apikey

## 3. Inicializar base de datos

```powershell
cmd /c "npx prisma generate"
cmd /c "npx prisma db push"
cmd /c "npm run db:seed"
```

Esto crea `prisma/dev.db` con:
- Usuario admin (credenciales según `.env`)
- 31 colegios importados desde `data/colegios.ts`
- 6 noticias importadas desde `data/noticias.ts`

## 4. Ejecutar en desarrollo

```powershell
cmd /c "npm run dev"
```

## 5. Rutas disponibles

### Público
- `/` — Homepage
- `/colegios`, `/noticias`, `/admisiones`, `/transparencia` — sitios existentes
- **`/documentos`** — nuevo: gestor público con chat IA sobre PDFs

### Admin (requiere login)
- `/admin/login` — login
- `/admin` — dashboard
- `/admin/noticias` — listar / crear / editar / eliminar noticias
- `/admin/colegios` — listar / editar colegios (los 31 están precargados)
- `/admin/documentos` — subir / activar / eliminar PDFs

## 6. Flujo del chat con Gemini

1. El admin sube un PDF en `/admin/documentos`.
2. Al subirlo, el servidor extrae el texto (via `pdf-parse`) y lo guarda en la BD.
3. En `/documentos` el usuario público selecciona uno o varios PDFs.
4. Escribe una pregunta en el chat.
5. El endpoint `/api/chat` envía la pregunta + el texto de los PDFs seleccionados a Gemini.
6. Gemini responde basándose **únicamente** en esos documentos.

> **Nota sobre escalabilidad**: Actualmente se envía el texto completo al modelo (hasta 30.000 caracteres por documento). Para PDFs muy grandes o muchas consultas, el siguiente paso sería implementar chunking + embeddings + búsqueda vectorial (RAG real). Para la primera versión, el enfoque directo es suficiente.

## 7. Estructura de archivos nuevos

```
prisma/
  schema.prisma              ← Modelos User, Colegio, Noticia, Documento
  seed.ts                    ← Semilla desde data/*.ts
lib/
  prisma.ts                  ← Cliente Prisma singleton
  auth.ts                    ← JWT + bcrypt (cookies httpOnly)
  gemini.ts                  ← Integración con @google/genai
  utils.ts                   ← slugify, formatBytes, safeJsonParse
middleware.ts                ← Protege /admin/* y /api/admin/*
app/
  admin/
    layout.tsx               ← Wrapper con sidebar
    AdminShell.tsx           ← Cliente (oculta sidebar en /login)
    page.tsx                 ← Dashboard
    login/page.tsx
    noticias/                ← CRUD
      page.tsx, NoticiaForm.tsx, nueva/, [id]/
    colegios/                ← CRUD
      page.tsx, ColegioForm.tsx, nuevo/, [id]/
    documentos/              ← Upload PDFs
      page.tsx, DocumentosManager.tsx
  documentos/                ← Gestor público + chat
    page.tsx, DocumentosChat.tsx
  api/
    auth/{login,logout,me}/route.ts
    noticias/route.ts & [id]/route.ts
    colegios/route.ts & [id]/route.ts
    documentos/route.ts & [id]/route.ts & [id]/descargar/route.ts
    chat/route.ts            ← Endpoint Gemini
uploads/                     ← PDFs subidos (gitignored)
```

## 8. Seguridad

- Contraseñas hasheadas con bcrypt (10 rounds)
- Sesiones JWT (HS256) en cookie `httpOnly`, expiración 7 días
- Middleware protege todas las rutas `/admin/*` y `/api/admin/*`
- Las mutaciones de `/api/noticias`, `/api/colegios`, `/api/documentos` validan sesión internamente
- Los PDFs se guardan con UUID para evitar colisiones y exposición de nombres

## 9. Cambiar contraseña del admin

Entra en `/admin/login`, luego ejecuta desde la DB manualmente o crea un endpoint adicional. Por ahora puedes re-ejecutar el seed con variables distintas:

```powershell
$env:ADMIN_PASSWORD="nuevaContraseña"; cmd /c "npm run db:seed"
```
