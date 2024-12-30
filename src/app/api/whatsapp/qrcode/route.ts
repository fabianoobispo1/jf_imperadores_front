import { NextResponse } from 'next/server'

export async function GET() {
  const response = await fetch(
    'https://webhook.fabianoobispo.com.br/session/qr/comunidadezdg/image',
    {
      headers: {
        accept: 'image/png',
        'x-api-key': 'comunidadezdg.com.br',
      },
    },
  )

  const imageBuffer = await response.arrayBuffer()
  return new NextResponse(imageBuffer, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
