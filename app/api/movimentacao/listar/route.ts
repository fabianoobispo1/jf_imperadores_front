import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get('month');
  const year = searchParams.get('year');

  try {
    const movimentacao = await prisma.sFAMovimentacao.findMany({
      where: {
        data_vencimento: {
          gte: new Date(`${year}-${month}-01`),
          lt: new Date(`${year}-${String(Number(month) + 1).padStart(2, '0')}-01`),
        },
      },
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
