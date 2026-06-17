# Bitácora de Errores y Soluciones — Colegios Arquidiocesanos

**Proyecto:** Plataforma Web Colegios Arquidiocesanos (`prototipo-cb`)  
**Formato:** Cada entrada tiene: Síntoma · Causa raíz · Solución aplicada · Estado

---

## ÍNDICE

- [E-01] PowerShell bloquea ejecución de scripts npm
- [E-02] npm instala en directorio incorrecto
- [E-03] Puerto 3000 en uso
- [E-04] `Module not found` al iniciar Next.js
- [E-05] `Cannot find module '../data/colegios'` en seed
- [E-06] TypeScript: "Parameter implicitly has 'any' type" (Prisma client no generado)
- [E-07] Next.js: `force-dynamic` + `generateStaticParams` en la misma página
- [E-08] TypeScript: `catch (e: any)` anti-pattern
- [E-09] Variables de entorno SMTP y Gemini faltantes en `.env.example`
- [E-10] Tailwind no detecta clases (rutas sin prefijo `./`)
- [E-11] Admin actualiza datos pero el sitio público no refleja los cambios
- [E-12] Error: `npx run db:seed` vs `npm run db:seed`
- [E-13] Middleware `isAdminApi` — código muerto (matcher vs función)
- [E-14] Prisma client: `lint errors on comentarioInforme`
- [E-15] Next.js 16 + React 19: conflicto de peer dependencies

---

## Errores de Entorno / Configuración

---

### [E-01] PowerShell bloquea ejecución de scripts npm

**Fecha detectada:** Mayo 2026  
**Severidad:** Bloqueante (no se puede iniciar el servidor)  
**Estado:** ✅ Solucionado (workaround documentado)

**Síntoma:**
```
npm : No se puede cargar el archivo C:\Program Files\nodejs\npm.ps1
porque la ejecución de scripts está deshabilitada en este sistema.
```

**Causa:**
La política de ejecución de PowerShell en Windows está configurada como `Restricted`, lo que impide ejecutar scripts `.ps1` de cualquier origen, incluyendo `npm.ps1`.

**Solución A — Workaround inmediato (sin cambiar política):**
Anteponer `cmd /c` a todos los comandos npm/npx en PowerShell:
```powershell
cmd /c "npm install --legacy-peer-deps"
cmd /c "npx prisma generate"
cmd /c "npm run dev"
cmd /c "npm run build"
```

**Solución B — Cambio de política de ejecución (permanente):**
```powershell
# Abrir PowerShell como Administrador
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
> `RemoteSigned` permite scripts locales sin firma, pero requiere firma en scripts descargados de internet.

**Notas:**
- Usar siempre la Solución A en pipelines de CI/CD (más seguro)
- La Solución B es preferible para desarrollo local activo

---

### [E-02] npm instala en directorio incorrecto (Windsurf)

**Fecha detectada:** Mayo 2026  
**Severidad:** Alta (instala dependencias en directorio equivocado)  
**Estado:** ✅ Solucionado

**Síntoma:**
`npm install` se ejecuta pero las dependencias se instalan en `C:\Users\...\AppData\Local\Programs\Windsurf` en lugar del directorio del proyecto.

**Causa:**
Windsurf (el IDE) fue el directorio de trabajo actual (`cwd`) al momento de ejecutar el comando desde la terminal integrada.

**Solución:**
Verificar siempre que el `cwd` sea `d:\ADM\Documents\Pagina Web\Colegios Arquidiocesanos\prototipo-cb` antes de ejecutar comandos npm. Nunca asumir el directorio de trabajo.

```powershell
# Verificar directorio actual
Get-Location

# Si es necesario navegar (en CMD, no PowerShell):
cd "D:\ADM\Documents\Pagina Web\Colegios Arquidiocesanos\prototipo-cb"
```

---

### [E-03] Puerto 3000 en uso

**Fecha detectada:** Mayo 2026  
**Severidad:** Baja (Next.js usa puerto alternativo automáticamente)  
**Estado:** ✅ Manejado

**Síntoma:**
```
⚠ Port 3000 is in use by process 15204, using available port 3001 instead.
```

**Causa:**
Hay otra instancia de `next dev` (u otro servidor) corriendo en el puerto 3000.

**Solución:**
```powershell
# Opción A: Matar el proceso existente por PID
taskkill /PID 15204 /F

# Opción B: Simplemente abrir el puerto alternativo asignado (ej: http://localhost:3001)

# Opción C: Verificar qué proceso ocupa el puerto
netstat -aon | findstr :3000
```

---

## Errores de Dependencias / Build

---

### [E-04] `Module not found: Can't resolve 'jose'` (y otras dependencias)

**Fecha detectada:** Durante el desarrollo inicial  
**Severidad:** Bloqueante  
**Estado:** ✅ Solucionado

**Síntoma:**
```
Module not found: Can't resolve 'jose'
Module not found: Can't resolve '@prisma/client'
Module not found: Can't resolve 'bcryptjs'
```

**Causa:**
Las dependencias están declaradas en `package.json` pero `npm install` no se ha ejecutado (o se ejecutó en el directorio incorrecto — ver [E-02]).

**Solución:**
```powershell
cmd /c "npm install --legacy-peer-deps"
```

---

### [E-15] Next.js 16 + React 19: conflicto de peer dependencies

**Fecha detectada:** Durante el desarrollo inicial  
**Severidad:** Media (npm install falla sin flag)  
**Estado:** ✅ Solucionado con flag

**Síntoma:**
```
npm error ERESOLVE unable to resolve dependency tree
npm error peer react@"^18" from lucide-react
```

**Causa:**
React 19 es más nuevo de lo que algunos paquetes de terceros (como Lucide React, Heroicons, etc.) declaran como compatible en su campo `peerDependencies`. npm 7+ rechaza instalaciones con conflictos de peer deps por defecto.

**Solución:**
```powershell
cmd /c "npm install --legacy-peer-deps"
```

> El flag `--legacy-peer-deps` ignora los conflictos de peer dependencies y los instala de todas formas (comportamiento de npm 6). Los paquetes funcionan en runtime con React 19 aunque no lo declaren.

**Alternativa futura:**
Cuando los paquetes actualicen sus `peerDependencies` para incluir React 19, el flag dejará de ser necesario.

---

### [E-05] `Cannot find module '../data/colegios'` en seed

**Fecha detectada:** Durante el desarrollo  
**Severidad:** Bloqueante para seed  
**Estado:** ✅ Solucionado

**Síntoma:**
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module 
'.../prototipo-cb/data/colegios' imported from '.../prisma/seed.ts'
```

**Causa:**
Node.js 22+ con `--experimental-strip-types` (para ejecutar TypeScript nativo) requiere extensiones de archivo explícitas en los imports ES Modules. El archivo `seed.ts` importaba sin extensión.

**Solución — Agregar extensión `.ts` en `prisma/seed.ts`:**
```typescript
// ANTES (falla)
import { colegios as colegiosSeed } from "../data/colegios";

// DESPUÉS (funciona)
import { colegios as colegiosSeed } from "../data/colegios.ts";
```

**Habilitar en `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "allowImportingTsExtensions": true
  }
}
```

---

### [E-06] TypeScript: "Parameter implicitly has 'any' type" (Prisma no generado)

**Fecha detectada:** Durante el desarrollo  
**Severidad:** Media (errores de tipo, no errores de runtime)  
**Estado:** ✅ Solucionado

**Síntoma:**
En archivos como `admin/noticias/page.tsx`:
```
Parameter 'n' implicitly has an 'any' type
```

**Causa:**
`@prisma/client` no ha sido generado todavía. Sin el cliente generado, el tipo de retorno de `prisma.noticia.findMany()` es `any[]`, por lo que los callbacks `.map(n => ...)` tienen el parámetro `n` con tipo `any` implícito.

**Solución:**
```powershell
cmd /c "npx prisma generate"
```

Ejecutar cada vez que `prisma/schema.prisma` cambia.

---

### [E-14] Lint errors: `comentarioInforme` no reconocido por Prisma Client

**Fecha detectada:** Durante el desarrollo de informes 2022  
**Severidad:** Media (errores TypeScript, chat IA no afectado)  
**Estado:** ✅ Solucionado

**Síntoma:**
```typescript
Property 'comentarioInforme' does not exist on type 'PrismaClient'
```

**Causa:**
El modelo `ComentarioInforme` fue agregado a `schema.prisma` pero `npx prisma generate` no se volvió a ejecutar para regenerar el cliente con el nuevo modelo.

**Solución:**
```powershell
cmd /c "npx prisma generate"
# Luego, si hay cambios en la estructura:
cmd /c "npx prisma db push"
```

**Regla general:** Siempre regenerar el cliente después de cualquier cambio al schema.

---

## Errores de Código TypeScript / Next.js

---

### [E-07] `force-dynamic` + `generateStaticParams` en la misma página

**Fecha detectada:** Revisión de código Mayo 2026  
**Severidad:** Media (advertencia silenciosa, `generateStaticParams` se ignora)  
**Estado:** ✅ Corregido

**Archivo afectado:** `app/noticias/[slug]/page.tsx`

**Síntoma:**
La página exporta simultáneamente `export const dynamic = "force-dynamic"` y `export async function generateStaticParams()`. No hay error en consola, pero `generateStaticParams` nunca se ejecuta.

**Causa:**
`force-dynamic` instruye a Next.js a siempre renderizar la página en el servidor en cada petición (SSR). Esto es incompatible con `generateStaticParams`, que sirve para pre-generar rutas estáticamente en build time (SSG). Cuando ambas coexisten, Next.js da prioridad a `force-dynamic` y descarta `generateStaticParams`.

**Solución aplicada:**
Eliminar `generateStaticParams` ya que la página usa datos en tiempo real desde Prisma (las noticias pueden cambiar dinámicamente).

```typescript
// ELIMINADO — era código muerto:
// export async function generateStaticParams() {
//   const noticias = await getNoticias();
//   return noticias.map((n) => ({ slug: n.slug }));
// }
```

**Nota:** Si en el futuro se quiere SSG (build-time), eliminar `force-dynamic` y restaurar `generateStaticParams`. No mezclar ambas.

---

### [E-08] TypeScript: `catch (e: any)` anti-pattern

**Fecha detectada:** Revisión de código Mayo 2026  
**Severidad:** Baja (TypeScript style issue)  
**Estado:** ✅ Corregido

**Archivo afectado:** `app/api/chat/route.ts`

**Síntoma:**
```typescript
} catch (e: any) {
  const message = e?.message || "Error procesando la consulta";
```

**Causa:**
El tipo `any` en un bloque `catch` desactiva la verificación de tipos de TypeScript para ese error. Es una práctica desaconsejada en TypeScript estricto.

**Solución aplicada:**
```typescript
// ANTES:
} catch (e: any) {
  const message = e?.message || "Error procesando la consulta";

// DESPUÉS:
} catch (e: unknown) {
  const message = e instanceof Error ? e.message : "Error procesando la consulta";
```

**Regla general:** Siempre usar `catch (e: unknown)` + type-narrowing con `instanceof Error`.

---

### [E-13] Middleware: código muerto en `isAdminApi` vs `config.matcher`

**Fecha detectada:** Revisión de código Mayo 2026  
**Severidad:** Baja (no es un bug de seguridad — las rutas API se protegen internamente)  
**Estado:** 📝 Documentado (no corregido para no alterar comportamiento actual)

**Archivo afectado:** `middleware.ts`

**Descripción:**
El middleware define una función `isAdminApi` que verifica si la ruta es `/api/noticias/` o `/api/colegios/` con métodos no-GET. Sin embargo, el `config.matcher` al final del archivo solo activa el middleware para rutas `/admin/:path*` y `/api/admin/:path*`. Como el middleware nunca se activa para `/api/noticias/` o `/api/colegios/`, la función `isAdminApi` nunca se ejecuta.

```typescript
// Esta función nunca es llamada:
function isAdminApi(pathname: string) {
  return pathname.startsWith("/api/noticias/") || 
         pathname.startsWith("/api/colegios/");
}

// El matcher no incluye esas rutas:
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
```

**Impacto:**
Ninguno en seguridad — los endpoints `PUT /api/noticias/[id]`, `DELETE /api/colegios/[id]`, etc. verifican la sesión internamente con `getSession()`. La protección funciona.

**Solución recomendada para futura limpieza:**
Eliminar la función `isAdminApi` del middleware ya que es código muerto, o bien agregar las rutas al `matcher` si se desea centralizar la protección.

---

## Errores de Configuración

---

### [E-09] Variables de entorno SMTP y Gemini faltantes en `.env.example`

**Fecha detectada:** Revisión de código Mayo 2026  
**Severidad:** Alta (formularios de correo fallan silenciosamente sin config SMTP)  
**Estado:** ✅ Corregido

**Descripción:**
El archivo `.env.example` no incluía las variables de entorno usadas por:
- `app/api/acoso/route.ts` → `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
- `app/api/comite-convivencia/route.ts` → mismas variables SMTP
- `app/api/contacto/route.ts` → mismas SMTP + `CONTACT_EMAIL`
- `lib/gemini.ts` → `GEMINI_API_KEY`, `GEMINI_MODEL`

**Solución aplicada:**
Actualizado `.env.example` con todas las variables faltantes y sus descripciones:

```bash
# Correo SMTP (formularios de acoso, CCL, trabaja con nosotros)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="tucorreo@gmail.com"
SMTP_PASS="tu-app-password-de-gmail"
CONTACT_EMAIL="seleccion@arquidiocesanos.edu.co"

# Google Gemini (módulo alternativo)
GEMINI_API_KEY="tu-api-key-de-google-gemini"
GEMINI_MODEL="gemini-2.0-flash"
```

---

### [E-10] Tailwind no detecta todas las clases (rutas `content` sin `./`)

**Fecha detectada:** Revisión de código Mayo 2026  
**Severidad:** Baja (puede causar clases ausentes en builds en ciertos sistemas)  
**Estado:** ✅ Corregido

**Archivo afectado:** `tailwind.config.js`

**Síntoma:**
En algunos entornos (especialmente Linux/macOS CI), Tailwind CSS no detecta todas las clases de los componentes.

**Causa:**
Los paths en `content` no tenían el prefijo `./`:
```javascript
// ANTES (incorrecto):
content: [
  'app/**/*.{js,ts,jsx,tsx,mdx}',
  'components/**/*.{js,ts,jsx,tsx,mdx}',
],
```

**Solución aplicada:**
```javascript
// DESPUÉS (correcto):
content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
],
```

---

## Errores de Datos / Contenido

---

### [E-11] Admin actualiza datos pero el sitio público no refleja los cambios

**Fecha detectada:** Durante el desarrollo  
**Severidad:** Alta (funcionalidad core del CMS rota)  
**Estado:** ✅ Solucionado

**Síntoma:**
Se edita una noticia o colegio desde `/admin`, pero al recargar `/noticias` o `/colegios` en el sitio público, los cambios no aparecen.

**Causa:**
Las páginas públicas leían datos desde archivos estáticos (`data/colegios.ts`, `data/noticias.ts`) en lugar de la base de datos Prisma. Next.js también puede cachear el resultado de una página Server Component si no está marcada como dinámica.

**Solución implementada:**
1. Migrar todas las páginas públicas a Server Components async que consulten Prisma via `lib/models.ts`
2. Agregar `export const dynamic = "force-dynamic"` en cada página que necesite datos en tiempo real

```typescript
// app/noticias/page.tsx
export const dynamic = "force-dynamic";

export default async function NoticiasPage() {
  const noticias = await getNoticias(); // ← desde Prisma, no desde data/
  return <NoticiasList noticias={noticias} />;
}
```

**Separación Server/Client:**
Las páginas con filtros interactivos usan un patrón de separación:
- `page.tsx` → Server Component (obtiene datos de Prisma, no usa hooks)
- `*List.tsx` → Client Component (recibe datos como props, usa useState para filtros)

---

### [E-12] Comando incorrecto para seed: `npx run db:seed`

**Fecha detectada:** Mayo 2026  
**Severidad:** Baja  
**Estado:** ✅ Documentado

**Síntoma:**
```
npm error Could not determine executable to run
```

**Causa:**
Se usó `npx run db:seed` que no es un comando válido. `npx` sirve para ejecutar paquetes/binarios, no scripts de `package.json`.

**Solución:**
```powershell
# CORRECTO — scripts de package.json usan npm run:
cmd /c "npm run db:seed"

# INCORRECTO:
npx run db:seed
```

---

## Pendientes / Limitaciones Conocidas Sin Resolver

| ID | Descripción | Impacto | Área |
|----|-------------|---------|------|
| L-01 | No hay rate limiting en `/api/auth/login` | Riesgo brute-force | Seguridad |
| L-02 | Almacenamiento en filesystem local (`/uploads/`) | No escala en hosting distribuido | Infraestructura |
| L-03 | SQLite no es adecuado para producción con concurrencia alta | Locking en escrituras simultáneas | BD |
| L-04 | Botones de compartir en noticias (Facebook/Twitter) sin `href` dinámico | No comparte realmente | UX |
| L-05 | Suscripción al boletín en noticias — botón sin handler | Funcionalidad ausente | Features |
| L-06 | Imágenes de informes 2023 sin insertar (embebidas en Elementor/CSS de WordPress) | Páginas sin fotos | Contenido |
| L-07 | `totalEstudiantes` en informes 2023 con valor `0` placeholder | "Datos pendientes" visible | Contenido |
| L-08 | No hay tests unitarios ni de integración | Cero cobertura | QA |
| L-09 | No hay sitemap XML dinámico generado desde Prisma | SEO subóptimo | SEO |
| L-10 | `lib/gemini.ts` disponible pero no conectado a ninguna ruta activa | Módulo inactivo | Código |

---

> Bitácora mantenida por el equipo de desarrollo.  
> Ver documentación completa en `DOCUMENTACION_TECNICA.md`.
