import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      id, 
      data_pagamento
    } = body;


    const novaMovimentacao = await prisma.sFAMovimentacao.update({
      where:{
        id
      },
      data: {
        data_pagamento
      },
    });

    return NextResponse.json(
      { message: 'Movimentação atualizada com sucesso.', movimentacao: novaMovimentacao },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Erro ao conectar ao banco de dados.' },
      { status: 500 }
    );
  }
}
