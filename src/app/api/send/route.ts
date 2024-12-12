import { Resend } from 'resend'

import { EmailTemplate } from '../../../components/email-template'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { email } = await request.json()
  try {
    const { data, error } = await resend.emails.send({
      from: 'JF Imperadores <nao-responda@jfimperadores.com.br>',
      to: [email],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'John' }),
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
