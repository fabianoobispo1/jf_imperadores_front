import { getErrorResponse } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log('ebtrou get')
  const userId = req.headers.get("X-USER-ID");

  if (!userId) {
    return getErrorResponse(
      401,
      "You are not logged in, please provide token to gain access"
    );
  }
  console.log(userId)

   const responseApi = await fetch(`${process.env.MINHA_API}/faperfilid`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id:userId
    })
  });

  if (responseApi.status === 200)  {
  }
  const user = await responseApi.json() 

  user.id  = user.faUsuario.id 
  user.name  = user.faUsuario.nome 
  user.email  = user.faUsuario.email 
  user.role  = 'user'
  user.verified  = false 
  user.createdAt  = user.faUsuario.created_at
  user.updatedAt  = user.faUsuario.created_at
  

  return NextResponse.json({
    status: "success",
    data: { user: { ...user, password: undefined } },
  });
}
