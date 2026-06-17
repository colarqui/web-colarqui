# Prototipo Colegios Arquidiocesanos

Prototipo mínimo de la nueva web de Colegios Arquidiocesanos de Cali.

## Estructura

- **Homepage** (`/`): Hero con buscador, estadísticas, colegios destacados, comparador de calendarios
- **Listado de Colegios** (`/colegios`): Filtros por tipo, calendario y zona
- **Landing de Colegio** (`/colegios/[slug]`): Página individual con galería, testimonios, info de contacto

## Datos

Los datos están hardcodeados en `/data/colegios.ts` para este prototipo:
- 3 colegios de ejemplo (Chiquinquirá, San Pedro Claver, Llano Verde Aguacatal)

## Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en modo desarrollo
npm run dev

# 3. Abrir http://localhost:3000
```

## Build para producción

```bash
npm run build
```

El build estático se generará en la carpeta `/dist`.

## Tecnologías

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (iconos)

## Notas

Este es un prototipo funcional para validar la estructura y diseño. 
En la versión final se conectaría con un CMS (Sanity) para gestionar los 31 colegios.
