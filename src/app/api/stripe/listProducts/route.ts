import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  appInfo: {
    name: 'jf-imperadores',
  },
})

export async function GET() {
  const headersList = headers()
  const apiKey = (await headersList).get('x-api-key')

  if (!apiKey || apiKey + 'valido' !== process.env.API_KEY_SECRET) {
    return NextResponse.json(
      { error: 'Unauthorized - Invalid API Key' },
      { status: 401 },
    )
  }

  try {
    const response = await stripe.products.list({
      expand: ['data.default_price'],
    })
    const produtos = response.data.map((produto) => {
      const price = produto.default_price as Stripe.Price

      return {
        id: produto.id,
        nome: produto.name,
        imageUrl: produto.images[0],
        preco: price.unit_amount,
        default_price: price.id,
      }
    })

    return NextResponse.json(produtos)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 },
    )
  }
}
