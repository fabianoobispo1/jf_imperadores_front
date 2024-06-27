import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, nome, email, data_nascimento } = body;
  


    if (!id || !nome || !email || !data_nascimento) {
      return NextResponse.json({ message: 'Missing required fields' });
    }
 
    const usuario = await prisma.sFAUser.update({
      where: {
        id,
      },
      data:{
        nome,
        email, 
        data_nascimento
      }
    });

    if(!usuario){
      return NextResponse.json(
        { message: "Usuário nâo atualizado.", user: id },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Usuário atualizado com sucesso.", user: id },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Erro ao conectar ao banco de dados." },
      { status: 500 },
    );
  }
}