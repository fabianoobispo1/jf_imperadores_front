import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      movimentacao
    } = body;


    const novaMovimentacao = await prisma.sFAMovimentacao.create({
      data: {
        tipo: movimentacao.tipo,
        nome: movimentacao.nome,
        descricao: movimentacao.descricao,
        data_pagamento: movimentacao.data_pagamento,
        data_vencimento: movimentacao.data_vencimento,
        valor: movimentacao.valor
      },
    });

    console.log(novaMovimentacao)
    

    return NextResponse.json(
      { message: 'Movimentação cadastrada com sucesso.', movimentacao: novaMovimentacao },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Erro ao conectar ao banco de dados.' },
      { status: 500 }
    );
  }
}
