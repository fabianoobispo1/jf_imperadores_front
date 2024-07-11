import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const atleta = await prisma.sFAAtleta.findMany({
      where: { id: String(id) }
    });

    return NextResponse.json(
      { message: 'Atleta recuperado com sucesso.', atleta: atleta },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Erro ao conectar ao banco de dados.' },
      { status: 500 }
    );
  }
}
