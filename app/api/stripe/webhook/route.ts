import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/server'
import { addRepoCollaborator, removeRepoCollaborator } from '@/lib/github'
import { getProduct, BUNDLE_KIT_IDS } from '@/lib/products'
import Stripe from 'stripe'

// Products that trigger Academy onboarding email sequence
const ACADEMY_PRODUCTS = ['claude-for-knowledge-workers']

// Check if a product is an agent kit
function isAgentKit(productId: string): boolean {
  return productId.startsWith('agent-kit-')
}

// Process agent kit purchase: add GitHub collaborator and create access records
async function processAgentKitPurchase(
  supabase: NonNullable<ReturnType<typeof createAdminClient>>,
  userId: string,
  productId: string,
  purchaseId: string,
  githubUsername: string,
  customerEmail: string
) {
  try {
    console.log(`Processing agent kit purchase: ${productId} for GitHub user: ${githubUsername}`)

    // 1. Add user as GitHub collaborator
    const { success, error: githubError, alreadyCollaborator } = await addRepoCollaborator(githubUsername)

    if (!success) {
      console.error(`Failed to add GitHub collaborator ${githubUsername}:`, githubError)
      // Don't fail the purchase - we can retry later
      // TODO: Queue for retry or notify admin
    } else {
      console.log(`GitHub access ${alreadyCollaborator ? 'already exists' : 'granted'} for ${githubUsername}`)
    }

    // 2. Determine which kits to grant access to
    const kitIds = productId === 'agent-kit-bundle'
      ? [...BUNDLE_KIT_IDS]
      : [productId]

    // 3. Create agent_kit_access records
    for (const kitId of kitIds) {
      const { error: accessError } = await supabase
        .from('agent_kit_access')
        .upsert({
          user_id: userId,
          github_username: githubUsername,
          kit_id: kitId,
          purchase_id: purchaseId,
          access_granted_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,kit_id',
        })

      if (accessError) {
        console.error(`Error creating access record for ${kitId}:`, accessError)
      }
    }

    // 4. Update purchase with GitHub invite status
    await supabase
      .from('purchases')
      .update({
        github_invite_sent: success,
        github_invite_sent_at: success ? new Date().toISOString() : null,
      })
      .eq('id', purchaseId)

    // 5. Send welcome email with setup instructions
    await sendAgentKitWelcomeEmail(customerEmail, productId, githubUsername)

    console.log(`Agent kit purchase processed successfully for ${githubUsername}`)
  } catch (error) {
    console.error('Error processing agent kit purchase:', error)
    // Don't throw - the payment is still successful
  }
}

// Send welcome email for agent kit purchases
async function sendAgentKitWelcomeEmail(email: string, productId: string, githubUsername: string) {
  try {
    const product = getProduct(productId)
    const productName = product?.name || 'Agent Kit'
    const isBundle = productId === 'agent-kit-bundle'

    // TODO: Integrate with Resend once email template is ready
    // For now, just log
    console.log(`[Email] Would send agent kit welcome to ${email}:`, {
      productName,
      githubUsername,
      isBundle,
      message: isBundle
        ? 'All 5 agent kits are now available in your GitHub repo!'
        : `${productName} is now available in your GitHub repo!`,
    })

    // Placeholder for actual email send:
    // const resend = getResend()
    // await resend.emails.send({
    //   from: 'ID8Labs <kits@id8labs.tech>',
    //   to: email,
    //   subject: `Your ${productName} is ready! 🚀`,
    //   react: AgentKitWelcomeEmail({ productName, githubUsername, isBundle }),
    // })
  } catch (error) {
    console.error('Error sending agent kit welcome email:', error)
  }
}

// Handle refund: remove GitHub access
async function handleAgentKitRefund(
  supabase: NonNullable<ReturnType<typeof createAdminClient>>,
  purchaseId: string
) {
  try {
    // Get the purchase to find GitHub username
    const { data: purchase } = await supabase
      .from('purchases')
      .select('github_username, user_id, product_id')
      .eq('id', purchaseId)
      .single()

    if (!purchase?.github_username) {
      console.log('No GitHub username found for refunded purchase')
      return
    }

    // Check if user has other active purchases that grant GitHub access
    const { data: otherPurchases } = await supabase
      .from('purchases')
      .select('id')
      .eq('user_id', purchase.user_id)
      .eq('status', 'completed')
      .like('product_id', 'agent-kit-%')
      .neq('id', purchaseId)

    // If no other agent kit purchases, remove collaborator access
    if (!otherPurchases || otherPurchases.length === 0) {
      console.log(`Removing GitHub access for ${purchase.github_username} due to refund`)
      await removeRepoCollaborator(purchase.github_username)
    }

    // Delete access records for the refunded purchase
    await supabase
      .from('agent_kit_access')
      .delete()
      .eq('purchase_id', purchaseId)

    console.log(`Agent kit access revoked for purchase ${purchaseId}`)
  } catch (error) {
    console.error('Error handling agent kit refund:', error)
  }
}

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
  if (!supabase) {
    console.error("Supabase admin client not configured")
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Get metadata from session
        const userId = session.metadata?.user_id
        const productId = session.metadata?.product_id
        const purchaseId = session.metadata?.purchase_id
        const githubUsername = session.metadata?.github_username

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

          const customerEmail = session.customer_email || session.customer_details?.email

          // Handle agent kit purchases
          if (isAgentKit(productId) && githubUsername && purchaseId && customerEmail) {
            await processAgentKitPurchase(
              supabase,
              userId,
              productId,
              purchaseId,
              githubUsername,
              customerEmail
            )
          }

          // Trigger Academy onboarding for eligible products
          if (ACADEMY_PRODUCTS.includes(productId)) {
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

        // Get the purchase to check if it's an agent kit
        const { data: purchase } = await supabase
          .from('purchases')
          .select('id, product_id')
          .eq('stripe_payment_intent_id', charge.payment_intent)
          .single()

        // Mark purchase as refunded
        await supabase
          .from('purchases')
          .update({
            status: 'refunded',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_payment_intent_id', charge.payment_intent)

        // Handle agent kit refund (remove GitHub access)
        if (purchase && isAgentKit(purchase.product_id)) {
          await handleAgentKitRefund(supabase, purchase.id)
        }
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
