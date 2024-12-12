import { Resend } from 'resend'

import { EmailTemplate } from '../../../components/emailTemplates/email-template'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { email, idRecuperaSenha, tipoMensagem } = await request.json()
  if (tipoMensagem === 'redefinirSenha') {
    try {
      const { data, error } = await resend.emails.send({
        from: 'JF Imperadores <nao-responda@jfimperadores.com.br>',
        to: [email],
        subject: 'Recupar senha',
        react: EmailTemplate({ firstName: idRecuperaSenha }),
      })

      if (error) {
        console.log(error)
        return Response.json({ error }, { status: 500 })
      }

      return Response.json(data)
    } catch (error) {
      return Response.json({ error }, { status: 500 })
    }
  }
}
