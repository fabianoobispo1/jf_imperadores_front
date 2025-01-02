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

  const { userEmail } = await req.json()
  if (!userEmail) {
    return new NextResponse('Missing required parameters', { status: 400 })
  }

  try {
    const customers = await stripe.customers.list({
      limit: 3,
    })
    console.log(customers)
    console.log(customers.data)

    const listSuccessfulPayments = async (email: string) => {
      const customers = await stripe.customers.list({
        email,
        limit: 1,
      })

      const customerId = customers.data[0]?.id

      if (customerId) {
        // Then get all successful payments for that customer
        const payments = await stripe.paymentIntents.list({
          customer: customerId,
          limit: 100,
        })

        return payments.data.filter((payment) => payment.status === 'succeeded')
      }

      return []
    }
    const listSubscriptionPayments = async (email: string) => {
      const customers = await stripe.customers.list({
        email,
        limit: 1,
      })
      const customerId = customers.data[0]?.id

      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'active',
        expand: ['data.default_payment_method'],
      })

      return subscriptions.data
    }

    const [payments, subscriptions] = await Promise.all([
      listSuccessfulPayments(userEmail),
      listSubscriptionPayments(userEmail),
    ])

    console.log(payments)
    console.log(subscriptions)

    return NextResponse.json({ url: 'dd' })
  } catch (error) {
    console.error('[STRIPE_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
