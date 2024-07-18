import { MovimentacaoClient } from '@/components/tables/movimentacao-tables/client';
import prisma from '@/lib/prisma';
import { startOfMonth } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      id, 
      data_pagamento
    } = body;

    const date = new Date(data_pagamento);
    const startOfMonthDate = startOfMonth(date);

    console.log(data_pagamento)
    console.log(startOfMonthDate)

    // Verificar se já existe uma entrada para o mês e ano especificados na tabela caixa
    let retornoCaixa = await prisma.sFACaixa.findFirst({
      where: {
        data_mes_referencia: {
          gte: startOfMonthDate,
          lt: new Date(startOfMonthDate.getFullYear(), startOfMonthDate.getMonth() + 1, 1)
        }
      }
    });

    if (!retornoCaixa) {
      // Adicionar nova entrada
      retornoCaixa = await prisma.sFACaixa.create({
        data: {
          valor: 0,
          data_mes_referencia: startOfMonthDate,
        }
      });
      
    }
  
    //realiza a baixa do movimento
    const novaMovimentacao = await prisma.sFAMovimentacao.update({
      where:{
        id,
        data_pagamento: null
      },
      data: {
        data_pagamento
      },
    }); 
    

    if (novaMovimentacao) {
      let valor: number | null = 0;

      if (retornoCaixa.valor != null){
        valor = retornoCaixa.valor
      }
      

      if (novaMovimentacao.tipo === "Entrada" && novaMovimentacao.valor != null){
        valor += novaMovimentacao.valor 
      }
      if (novaMovimentacao.tipo === "Saida" && novaMovimentacao.valor != null){
        valor -= novaMovimentacao.valor
      }
    

   
      //atualiza o valor na tabela caixa 
      const updateCaixa = await prisma.sFACaixa.update({
        where:{
          id : retornoCaixa.id
        },
        data: {
          valor
        },
      }); 

    }
    
    
   

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
