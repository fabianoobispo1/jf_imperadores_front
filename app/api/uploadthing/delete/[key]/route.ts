import { NextRequest, NextResponse } from 'next/server';
import { utapi } from '../../core';

export async function GET(
  req: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const { key } = params;

    console.log(key)
    utapi.deleteFiles(key)

    return NextResponse.json(
        { message: 'Imagem Removida.' },
        { status: 200 }
      );

  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao atualizar o recurso', error },
      { status: 500 }
    );
  }
}
