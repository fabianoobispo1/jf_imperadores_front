import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  appInfo: {
    name: 'jf-imperadores',
  },
})

export async function POST(req: Request) {
  const headersList = headers()
  const apiKey = (await headersList).get('x-api-key')

  if (!apiKey || apiKey + 'valido' !== process.env.API_KEY_SECRET) {
    return NextResponse.json(
      { error: 'Unauthorized - Invalid API Key' },
      { status: 401 },
    )
  }

  const { productId, default_price, userEmail, mode } = await req.json()

  if (!productId || !default_price || !userEmail || !mode) {
    return new NextResponse('Missing required parameters', { status: 400 })
  }
  try {
    const paymentMethodTypes: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] =
      mode === 'subscription' ? ['card'] : ['card', 'boleto']

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      success_url:
        `${process.env.NEXTAUTH_URL}/dashboard/mensalidade/success/` +
        userEmail,
      cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/mensalidade/`,
      payment_method_types: paymentMethodTypes,
      mode,
      locale: 'pt-BR',
      customer_email: userEmail,
      line_items: [
        {
          price: default_price,
          quantity: 1,
        },
      ],
    }

    if (mode !== 'subscription') {
      sessionConfig.customer_creation = 'always'
    }

    const session = await stripe.checkout.sessions.create(sessionConfig)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[STRIPE_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
