import { getErrorResponse } from "@/lib/helpers";
import {
  FaUsuarioInput,
  FaUsuarioSchema
} from "@/lib/validations/user.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FaUsuarioInput;
    const data = FaUsuarioSchema.parse(body);
  

    //minhaapi 
    const responseApi = await fetch(`${process.env.NEXT_PUBLIC_API_MINHA_BASE}/fausuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: data.nome,
        email: data.email,
        password: data.password,
        data_nascimento: data.data_nascimento+'T00:00:00.000Z'
      
      })
    });

    if (responseApi.status === 409)  {
      return getErrorResponse(409, "Email Ja cadastrado.");
    }
   
    if (responseApi.status === 201)  {

    const user = await responseApi.json() 
    //alteracoes de campos para que minha api funcione no frontend

    user.faUsuario.nome = user.faUsuario.nome
    user.faUsuario.role= 'user'
    user.faUsuario.photo= 'default.png'
    user.faUsuario.verified= false
    user.faUsuario.updatedAt = user.faUsuario.created_at

  
    return new NextResponse(
      JSON.stringify({
        status: "success",
        data: { user: { ...user, password: undefined } },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
    }

  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }

    if (error.code === "P2002") {
      return getErrorResponse(409, "user with that email already exists");
    }

    return getErrorResponse(500, error.message);
  }
}
