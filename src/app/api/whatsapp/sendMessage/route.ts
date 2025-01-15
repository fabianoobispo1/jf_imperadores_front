import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  const baseUrl = process.env.API_WHATSAPP
  const apiKey = process.env.WHATSAPP_API_KEY

  if (!baseUrl || !apiKey) {
    return NextResponse.json(
      { error: 'WHATSAPP_API_URL or API_KEY not configured' },
      { status: 500 },
    )
  }

  const response = await fetch(`${baseUrl}/client/sendMessage/jfimperadores6`, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  return NextResponse.json(data)
}
