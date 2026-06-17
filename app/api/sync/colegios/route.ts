/**
 * API de sincronización de colegios para el CRM
 * Devuelve todos los colegios activos para importación
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    // Validar API Key
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.replace('Bearer ', '');
    
    if (apiKey !== process.env.SYNC_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'API key inválida' },
        { status: 401 }
      );
    }

    // Obtener colegios activos
    const colegios = await prisma.colegio.findMany({
      where: { publicado: true },
      orderBy: { nombre: 'asc' },
      select: {
        id: true,
        slug: true,
        nombre: true,
        descripcion: true,
        direccion: true,
        zona: true,
        telefono: true,
        email: true,
        facebook: true,
        calendario: true,
        jornadas: true,
        niveles: true,
        estudiantes: true,
        docentes: true,
        fundacion: true,
        egresados: true,
        caracteristicas: true,
        logo: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      count: colegios.length,
      data: colegios,
      syncedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error en sync/colegios:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Error al obtener colegios' },
      { status: 500 }
    );
  }
}
