import { NextRequest, NextResponse } from 'next/server'
import { stripeRaw } from '@/lib/stripe-raw'
import { getProduct, type ProductId } from '@/lib/products'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { isValidGitHubUsername } from '@/lib/github'

// Force Node.js runtime for consistency
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }
    // Admin client for database operations (bypasses RLS)
    const adminSupabase = createAdminClient()
    if (!adminSupabase) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to continue.' },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { productId, githubUsername } = body as {
      productId: ProductId
      githubUsername?: string
    }

    // Validate product ID and ensure it's a Stripe product
    const product = getProduct(productId)
    if (!product) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    if (product.purchaseType !== 'stripe') {
      return NextResponse.json(
        { error: 'This product cannot be purchased via checkout' },
        { status: 400 }
      )
    }

    if (product.price === null) {
      return NextResponse.json(
        { error: 'This product requires a custom quote' },
        { status: 400 }
      )
    }

    // Validate GitHub username for agent kits
    if (product.requiresGithub) {
      if (!githubUsername) {
        return NextResponse.json(
          { error: 'GitHub username is required for agent kit purchases' },
          { status: 400 }
        )
      }

      if (!isValidGitHubUsername(githubUsername)) {
        return NextResponse.json(
          { error: 'Invalid GitHub username format' },
          { status: 400 }
        )
      }
    }

    // Check if user has already purchased this course
    const { data: existingPurchase } = await adminSupabase
      .from('purchases')
      .select('id, status')
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .eq('status', 'completed')
      .single()

    if (existingPurchase) {
      return NextResponse.json(
        { error: 'You have already purchased this course' },
        { status: 400 }
      )
    }

    // Create purchase record with pending status
    const { data: purchase, error: purchaseError } = await adminSupabase
      .from('purchases')
      .insert({
        user_id: user.id,
        product_id: productId,
        amount: product.price,
        currency: product.currency,
        status: 'pending',
        // Include GitHub username for agent kit purchases
        ...(product.requiresGithub && githubUsername
          ? { github_username: githubUsername }
          : {}),
      })
      .select()
      .single()

    if (purchaseError || !purchase) {
      console.error('Error creating purchase record:', purchaseError)
      return NextResponse.json(
        { error: 'Failed to create purchase record', details: purchaseError?.message || 'Unknown error' },
        { status: 500 }
      )
    }

    // Get or create Stripe customer
    let customerId: string | undefined

    const { data: customer } = await adminSupabase
      .from('customers')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    if (customer?.stripe_customer_id) {
      customerId = customer.stripe_customer_id
    } else {
      // Create new Stripe customer using raw API (SDK has connection issues in Vercel)
      const stripeCustomer = await stripeRaw.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      })

      customerId = stripeCustomer.id

      // Save customer ID to database
      await adminSupabase
        .from('customers')
        .upsert({
          id: user.id,
          stripe_customer_id: customerId,
        })
    }

    // Create Stripe checkout session using raw API (SDK has connection issues in Vercel)
    const successUrl = product.successRedirect
      ? `${request.nextUrl.origin}${product.successRedirect}&session_id={CHECKOUT_SESSION_ID}`
      : `${request.nextUrl.origin}/services/success?type=${productId}&session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${request.nextUrl.origin}/services`

    const session = await stripeRaw.checkout.sessions.create({
      customer: customerId!,
      line_items: [
        {
          price_data: {
            currency: product.currency,
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        user_id: user.id,
        product_id: productId,
        purchase_id: purchase.id,
        // Include GitHub username for agent kit webhook processing
        ...(product.requiresGithub && githubUsername
          ? { github_username: githubUsername }
          : {}),
      },
      customer_update: {
        address: 'auto',
      },
    })

    // Update purchase with checkout session ID
    await adminSupabase
      .from('purchases')
      .update({
        stripe_checkout_session_id: session.id,
      })
      .eq('id', purchase.id)

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    })

  } catch (error) {
    console.error('Checkout error:', error)
    // Return more detailed error in development for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: errorMessage },
      { status: 500 }
    )
  }
}

