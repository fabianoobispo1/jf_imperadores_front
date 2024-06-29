import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const todos = await prisma.sFATodo.findMany({
      include: {
        sfaUser: {
          select: {
            nome: true
          }
        }
      }
    });

    return NextResponse.json(
      { message: 'Todos recuperado com sucesso.', todos: todos },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Erro ao conectar ao banco de dados.' },
      { status: 500 }
    );
  }
}
