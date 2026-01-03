import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

// Products that trigger Academy onboarding email sequence
const ACADEMY_PRODUCTS = ['claude-for-knowledge-workers']

// Trigger the Academy onboarding email sequence
async function triggerAcademyOnboarding(email: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://id8labs.tech'
    const response = await fetch(`${baseUrl}/api/email-sequences/trigger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        sequenceId: 'academy-onboarding',
        source: 'stripe-purchase',
      }),
    })

    if (!response.ok) {
      console.error('Failed to trigger Academy onboarding:', await response.text())
    } else {
      console.log(`Academy onboarding sequence started for ${email}`)
    }
  } catch (error) {
    console.error('Error triggering Academy onboarding:', error)
  }
}

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
  const stripe = getStripe()

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

          // Trigger Academy onboarding for eligible products
          if (ACADEMY_PRODUCTS.includes(productId)) {
            const customerEmail = session.customer_email || session.customer_details?.email
            if (customerEmail) {
              await triggerAcademyOnboarding(customerEmail)
            } else {
              console.error('No customer email found for Academy onboarding')
            }
          }
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
