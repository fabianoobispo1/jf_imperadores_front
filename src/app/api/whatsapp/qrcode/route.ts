import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.API_WHATSAPP
  const apiKey = process.env.WHATSAPP_API_KEY

  if (!baseUrl || !apiKey) {
    return NextResponse.json(
      { error: 'WHATSAPP_API_URL or API_KEY not configured' },
      { status: 500 },
    )
  }

  const response = await fetch(`${baseUrl}/session/qr/jfimperadores9/image`, {
    headers: {
      accept: 'image/png',
      'x-api-key': apiKey,
    },
  })

  const imageBuffer = await response.arrayBuffer()
  return new NextResponse(imageBuffer, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}
