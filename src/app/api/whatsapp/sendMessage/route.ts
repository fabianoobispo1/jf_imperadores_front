import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  const response = await fetch(
    `${process.env.WHATSAPP_API_URL}/client/sendMessage/jfimperadores`,
    {
      method: 'POST',
      headers: {
        accept: '*/*',
        'x-api-key': process.env.WHATSAPP_API_KEY ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  )

  const data = await response.json()
  return NextResponse.json(data)
}
