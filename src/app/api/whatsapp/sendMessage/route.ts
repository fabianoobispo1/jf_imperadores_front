import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  const response = await fetch(
    'https://webhook.fabianoobispo.com.br/client/sendMessage/comunidadezdg',
    {
      method: 'POST',
      headers: {
        accept: '*/*',
        'x-api-key': 'comunidadezdg.com.br',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  )

  const data = await response.json()
  return NextResponse.json(data)
}
