import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { ConvexHttpClient } from 'convex/browser'

import { buffer } from 'node:stream/consumers'

import { api } from '../../../../../convex/_generated/api'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  appInfo: {
    name: 'jf-imperadores',
  },
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function POST(req: Request) {
  if (req.method === 'OPTIONS') {
    return NextResponse.json({}, { status: 200 })
  }

  try {
    const rawBody = await buffer(
      req.body as unknown as AsyncIterable<Uint8Array>,
    )
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { message: 'No stripe signature found' },
        { status: 400 },
      )
    }

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      endpointSecret,
    )

    // tenho que ler esses dois charge.succeeded e charge.refunded

    // pagamento realizado com sucesso
    // stripe trigger payment_intent.succeeded
    if (event.type === 'charge.succeeded') {
      const charge = event.data.object as Stripe.Charge

      /* const customer = (await stripe.customers.retrieve(
        paymentIntent.customer as string,
      )) as Stripe.Customer
*/
      const tipo =
        charge.description === 'Subscription creation' ||
        charge.description === 'Subscription update'
          ? 'recorrente'
          : 'avulsa'

      await convex.mutation(api.mensalidade.create, {
        tipo,
        email: charge.billing_details?.email || 'fbc623@gmail.com',
        customer: (charge.customer as string) || '',
        id_payment_stripe: charge.id,
        valor: charge.amount / 100, // Convert from cents to actual currency
        data_pagamento: Date.now(),
        data_cancelamento: 0,
        cancelado: false,
      })

      return NextResponse.json({ status: 'success' }, { status: 200 })
    }

    if (event.type === 'charge.refunded') {
      const charge = event.data.object as Stripe.Charge

      await convex.mutation(api.mensalidade.updateCancelamento, {
        id_payment_stripe: charge.id,
        data_cancelamento: Date.now(),
        cancelado: true,
      })

      return NextResponse.json({ status: 'success' }, { status: 200 })
    }
    console.log(`Handling event type: ${event.type}`)
    return NextResponse.json({ status: 'received' }, { status: 200 })
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    console.error('Webhook error:', errorMessage)
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 },
    )
  }
}
