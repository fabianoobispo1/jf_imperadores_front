import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { text } = body;
    const newTodo = await prisma.sFATodo.create({
      data: { text },
    });

    return NextResponse.json(
      { message: 'Todo cadastrado com sucesso.', todo: newTodo },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Erro ao conectar ao banco de dados.' },
      { status: 500 }
    );
  }
}
