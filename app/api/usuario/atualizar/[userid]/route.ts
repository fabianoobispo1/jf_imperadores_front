/* import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
console.log(userId)
  if (req.method === 'PUT') {
    try {
      const userData = req.body;

      console.log(userData)
      // Atualize o usuário no banco de dados
      const updatedUser = await prisma.sFAUser.update({
        where: { id: String(userId) },
        data: userData,
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Failed to update user data:', error);
      res.status(500).json({ error: 'Failed to update user data' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

 */
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  req: NextRequest,
  { params }: { params: { userid: string } }
) {
  try {
    const { userid } = params;
    const userData = await req.json();

    // Atualize o usuário no banco de dados
    const updatedUser = await prisma.sFAUser.update({
      where: { id: String(userid) },
      data: userData
    });

    return NextResponse.json(
      { message: 'Registro atualizado' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao atualizar o recurso', error },
      { status: 500 }
    );
  }
}
