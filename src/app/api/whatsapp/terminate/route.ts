import { NextResponse } from 'next/server'

export async function GET() {
  const response = await fetch(
    `${process.env.WHATSAPP_API_URL}/session/terminate/jfimperadores`,
    {
      headers: {
        accept: 'application/json',
        'x-api-key': process.env.WHATSAPP_API_KEY ?? '',
      },
    },
  )

  const data = await response.json()
  return NextResponse.json(data)
}
