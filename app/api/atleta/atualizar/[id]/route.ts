import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const { cpf,
      nome,
      email,
      ativo,
      data_nascimento,
      data_inicio,
      setor,
      posicao,
      numero,
      altura,
      pesso } = await req.json();

    const updatedTodo = await prisma.sFAAtleta.update({
      where: { id: String(id) },
      data: {
        cpf,
        nome,
        email,
        ativo,
        data_nascimento,
        data_inicio,
        setor,
        posicao,
        numero,
        altura,
        pesso
      },
    });

    

    return NextResponse.json(
      { message: 'Atleta atualizado' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao atualizar o recurso', error },
      { status: 500 }
    );
  }
}
