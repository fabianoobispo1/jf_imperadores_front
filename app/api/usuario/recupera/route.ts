import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email } = body;
    const usuario = await prisma.sFAUser.findUnique({
      where: {
        email,
      },
    });

    return NextResponse.json(
      { message: "Usuário recuperado com sucesso.", user: usuario },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Erro ao conectar ao banco de dados." },
      { status: 500 },
    );
  }
}