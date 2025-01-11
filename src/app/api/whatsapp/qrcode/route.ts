import { NextResponse } from 'next/server'

export async function GET() {
  const response = await fetch(
    `${process.env.WHATSAPP_API_URL}/session/qr/jfimperadores/image`,
    {
      headers: {
        accept: 'image/png',
        'x-api-key': 'fabianotoken',
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
