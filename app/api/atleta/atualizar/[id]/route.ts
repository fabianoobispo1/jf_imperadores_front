import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const body = await req.json();

    const {
      atleta
    } = body;

    const updatedAtleeta = await prisma.sFAAtleta.update({
      where: { id: String(id) },
      data: {
        cpf: atleta.cpf,
        nome: atleta.nome,
        email: atleta.email,
        ativo: atleta.ativo,
        data_nascimento: atleta.data_nascimento,
        data_inicio: atleta.data_inicio,
        setor: atleta.setor,
        posicao: atleta.posicao,
        numero: atleta.numero,
        altura: atleta.altura,
        pesso: atleta.pesso,
      },
    });

    

    return NextResponse.json(
      { message: 'Atleta atualizado', atleta:updatedAtleeta },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao atualizar o recurso', error },
      { status: 500 }
    );
  }
}
