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

    // pagamento realizado com sucesso
    // stripe trigger payment_intent.succeeded
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent

      await convex.mutation(api.mensalidade.create, {
        tipo: 'avulsa', // or 'recorrente' based on your payment type
        email: paymentIntent.receipt_email || '',
        client_secret_stripe: paymentIntent.client_secret || '',
        id_payment_stripe: paymentIntent.id,
        valor: paymentIntent.amount / 100, // Convert from cents to actual currency
        data_pagamento: Date.now(),
        data_cancelamento: 0,
        cancelado: false,
      })

      return NextResponse.json({ status: 'success' }, { status: 200 })
    }

    if (
      event.type === 'customer.subscription.created' ||
      event.type === 'invoice.paid'
    ) {
      const subscription = event.data.object as Stripe.Subscription

      const customer = (await stripe.customers.retrieve(
        subscription.customer as string,
      )) as Stripe.Customer

      await convex.mutation(api.mensalidade.create, {
        tipo: 'recorrente',
        email: customer.email || '',
        client_secret_stripe: subscription.latest_invoice as string,
        id_payment_stripe: subscription.id,
        valor: subscription.items.data[0].price.unit_amount! / 100,
        data_pagamento: Date.now(),
        data_cancelamento: 0,
        cancelado: false,
      })
      return NextResponse.json({ status: 'success' }, { status: 200 })
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription

      await convex.mutation(api.mensalidade.updateCancelamento, {
        id_payment_stripe: subscription.id,
        cancelado: true,
        data_cancelamento: Date.now(),
      })
    }

    if (event.type === 'payment_intent.canceled') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent

      await convex.mutation(api.mensalidade.updateCancelamento, {
        id_payment_stripe: paymentIntent.id,
        cancelado: true,
        data_cancelamento: Date.now(),
      })

      return NextResponse.json({ status: 'success' }, { status: 200 })
    }

    // Handle other event types
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
