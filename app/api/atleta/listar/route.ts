import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const atletas = await prisma.sFAAtleta.findMany({});

    return NextResponse.json(
      { message: 'Atletas recuperado com sucesso.', atletas: atletas },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Erro ao conectar ao banco de dados.' },
      { status: 500 }
    );
  }
}
