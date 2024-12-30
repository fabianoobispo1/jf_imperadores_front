import { NextResponse } from 'next/server'

export async function GET() {
  const response = await fetch(
    'https://webhook.fabianoobispo.com.br/session/start/comunidadezdg',
    {
      headers: {
        accept: 'application/json',
        'x-api-key': 'comunidadezdg.com.br',
      },
    },
  )

  const data = await response.json()
  return NextResponse.json(data)
}
