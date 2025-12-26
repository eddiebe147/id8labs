import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  const supabase = createAdminClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Get the user ID from metadata
        const userId = session.metadata?.user_id
        const productId = session.metadata?.product_id

        if (!userId || !productId) {
          console.error('Missing user_id or product_id in session metadata')
          break
        }

        // Update purchase status to completed
        const { error } = await supabase
          .from('purchases')
          .update({
            status: 'completed',
            stripe_payment_intent_id: session.payment_intent as string,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_checkout_session_id', session.id)

        if (error) {
          console.error('Error updating purchase:', error)
        } else {
          console.log(`Purchase completed for user ${userId}, product ${productId}`)
        }
        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session

        // Mark purchase as expired/cancelled
        await supabase
          .from('purchases')
          .update({
            status: 'expired',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_checkout_session_id', session.id)
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge

        // Mark purchase as refunded
        await supabase
          .from('purchases')
          .update({
            status: 'refunded',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_payment_intent_id', charge.payment_intent)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
