import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const movimentacao = await prisma.sFAMovimentacao.findMany({
      orderBy: {
        created_at: 'asc'
      }
    });

    return NextResponse.json(
      { message: 'Movimentação recuperada com sucesso.', movimentacao: movimentacao },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Erro ao conectar ao banco de dados.' },
      { status: 500 }
    );
  }
}
