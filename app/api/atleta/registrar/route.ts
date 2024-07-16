import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      atleta
    } = body;


    const verifyAtleta = await prisma.sFAAtleta.findUnique({
      where: {
        email: atleta.email
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

    //envio de email asim que cadastra um atleta com status de ativo
   console.log(atleta.ativo)
    if (atleta.ativo === true) {
      //so descomentar
      
      const mailerSend = new MailerSend({
        apiKey: process.env.MAILERSEND_API ?? ''
      });
  
      const sentFrom = new Sender("no-reply@jfimperadores.com.br", "Jf Imperadores");
     
      const recipients = [
        new Recipient(atleta.email, atleta.nome)
      ];
  console.log(recipients)
      const html = "<div><h1>Titulo Mensagem</h1> <p>-</p> <p>Uma mensagem motivacional....</p></div>"
      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject("Bem Vindo ao time!")
        .setHtml(html)
  
     
      await mailerSend.email.send(emailParams) 
      .then((response) => console.log(response.body))
      .catch((error) => console.log(error));

    }   

    //

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
