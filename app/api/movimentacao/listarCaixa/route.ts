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



   const  totalSaida = movimentacao
  .filter(movimentacao => movimentacao.tipo === 'Saida')
  .reduce((acc, movimentacao) => acc + (movimentacao.valor ?? 0), 0);

  const totalSaidaPago = movimentacao
  .filter(movimentacao => movimentacao.tipo === 'Saida')
  .filter(movimentacao => movimentacao.data_pagamento !== null)
  .reduce((acc, movimentacao) => acc + (movimentacao.valor ?? 0), 0);

  const totalEntrada = movimentacao
  .filter(movimentacao => movimentacao.tipo === 'Entrada')
  .reduce((acc, movimentacao) => acc + (movimentacao.valor ?? 0), 0);

  const totalEntradaPago = movimentacao
  .filter(movimentacao => movimentacao.tipo === 'Entrada')
  .filter(movimentacao => movimentacao.data_pagamento !== null)
  .reduce((acc, movimentacao) => acc + (movimentacao.valor ?? 0), 0);




    return NextResponse.json(
      { message: 'Movimentação recuperada com sucesso.', caixa: {
       totalSaida: totalSaida,
       totalSaidaPago: totalSaidaPago,
       totalEntrada: totalEntrada,
       totalEntradaPago: totalEntradaPago,
      } },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Erro ao conectar ao banco de dados.' },
      { status: 500 }
    );
  }
}
