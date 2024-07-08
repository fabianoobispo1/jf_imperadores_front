import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
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
    } = body;

    const verifyAtleta = await prisma.sFAAtleta.findUnique({
      where:{
        email
      }
    })

    if (verifyAtleta) {
      return NextResponse.json(
        { message: 'Atleta já cadastrado com esse Email' },
        { status: 409 }
      );
    }

    const newAtleta = await prisma.sFAAtleta.create({
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
      { message: 'Atleta cadastrado com sucesso.', atleta: newAtleta },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Erro ao conectar ao banco de dados.' },
      { status: 500 }
    );
  }
}
