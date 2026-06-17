import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { colegios as colegiosSeed } from "../data/colegios.ts";
import { noticias as noticiasSeed } from "../data/noticias.ts";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@arquidiocesanos.edu.co";
  const password = process.env.ADMIN_PASSWORD || "Admin123!";
  const name = process.env.ADMIN_NAME || "Administrador";

  // Admin
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, password: hash, name, role: "admin" },
  });
  console.log(`✓ Admin creado: ${email} / ${password}`);

  // Colegios
  for (const c of colegiosSeed) {
    await prisma.colegio.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        slug: c.slug,
        nombre: c.nombre,
        descripcion: c.descripcion,
        direccion: c.direccion,
        zona: c.zona,
        telefono: c.telefono,
        email: c.email,
        facebook: c.facebook ?? null,
        calendario: c.calendario,
        jornadas: JSON.stringify(c.jornadas),
        niveles: JSON.stringify(c.niveles),
        estudiantes: c.estudiantes,
        docentes: c.docentes,
        fundacion: c.fundacion,
        egresados: c.egresados ?? null,
        caracteristicas: JSON.stringify(c.caracteristicas),
        logo: c.logo ?? null,
        publicado: true,
      },
    });
  }
  console.log(`✓ ${colegiosSeed.length} colegios sembrados`);

  // Noticias
  for (const n of noticiasSeed) {
    await prisma.noticia.upsert({
      where: { slug: n.slug },
      update: {},
      create: {
        slug: n.slug,
        titulo: n.titulo,
        resumen: n.resumen,
        contenido: n.contenido,
        categoria: n.categoria,
        fecha: new Date(n.fecha),
        autor: n.autor,
        imagen: n.imagen,
        destacada: n.destacada,
        publicada: true,
      },
    });
  }
  console.log(`✓ ${noticiasSeed.length} noticias sembradas`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
