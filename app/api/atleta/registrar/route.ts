import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      atleta
    } = body;

    
    const verifyAtleta = await prisma.sFAAtleta.findUnique({
      where:{
        email:atleta.email
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
      { message: 'Atleta cadastrado com sucesso.', atleta: newAtleta  },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Erro ao conectar ao banco de dados.' },
      { status: 500 }
    );
  }
}
