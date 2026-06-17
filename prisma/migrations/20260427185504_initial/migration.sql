-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Colegio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "zona" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "facebook" TEXT,
    "calendario" TEXT NOT NULL,
    "jornadas" TEXT NOT NULL,
    "niveles" TEXT NOT NULL,
    "estudiantes" INTEGER NOT NULL DEFAULT 0,
    "docentes" INTEGER NOT NULL DEFAULT 0,
    "fundacion" INTEGER NOT NULL DEFAULT 2000,
    "egresados" INTEGER,
    "caracteristicas" TEXT NOT NULL,
    "logo" TEXT,
    "publicado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Noticia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "resumen" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "autor" TEXT NOT NULL,
    "imagen" TEXT NOT NULL,
    "destacada" BOOLEAN NOT NULL DEFAULT false,
    "publicada" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ColegioDetalle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "colegioSlug" TEXT NOT NULL,
    "ofertaTitulo" TEXT NOT NULL DEFAULT 'Nuestra Oferta Académica',
    "ofertaCopy" TEXT NOT NULL DEFAULT '',
    "ofertaItems" TEXT NOT NULL DEFAULT '[]',
    "equipo" TEXT NOT NULL DEFAULT '[]',
    "testimonios" TEXT NOT NULL DEFAULT '[]',
    "galeria" TEXT NOT NULL DEFAULT '[]',
    "costos" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "categoria" TEXT NOT NULL DEFAULT 'General',
    "nombreArchivo" TEXT NOT NULL,
    "rutaArchivo" TEXT NOT NULL,
    "tamano" INTEGER NOT NULL,
    "contenido" TEXT NOT NULL,
    "paginas" INTEGER NOT NULL DEFAULT 0,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Colegio_slug_key" ON "Colegio"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Noticia_slug_key" ON "Noticia"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ColegioDetalle_colegioSlug_key" ON "ColegioDetalle"("colegioSlug");
