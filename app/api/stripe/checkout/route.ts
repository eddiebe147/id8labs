import { NextRequest, NextResponse } from 'next/server'
import { stripe, COURSE_PRODUCTS, type CourseProductId } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

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
    const { productId } = body as { productId: CourseProductId }

    // Validate product ID
    if (!productId || !COURSE_PRODUCTS[productId]) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    const product = COURSE_PRODUCTS[productId]

    // Check if user has already purchased this course
    const { data: existingPurchase } = await supabase
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
    const { data: purchase, error: purchaseError } = await supabase
      .from('purchases')
      .insert({
        user_id: user.id,
        product_id: productId,
        amount: product.price,
        currency: product.currency,
        status: 'pending',
      })
      .select()
      .single()

    if (purchaseError || !purchase) {
      console.error('Error creating purchase record:', purchaseError)
      return NextResponse.json(
        { error: 'Failed to create purchase record' },
        { status: 500 }
      )
    }

    // Get or create Stripe customer
    let customerId: string | undefined

    const { data: customer } = await supabase
      .from('customers')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .single()

    if (customer?.stripe_customer_id) {
      customerId = customer.stripe_customer_id
    } else {
      // Create new Stripe customer
      const stripeCustomer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      })

      customerId = stripeCustomer.id

      // Save customer ID to database
      await supabase
        .from('customers')
        .upsert({
          id: user.id,
          stripe_customer_id: customerId,
        })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
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
      success_url: `${request.nextUrl.origin}/courses/${productId}?success=true`,
      cancel_url: `${request.nextUrl.origin}/courses/${productId}`,
      metadata: {
        user_id: user.id,
        product_id: productId,
        purchase_id: purchase.id,
      },
      customer_update: {
        address: 'auto',
      },
    })

    // Update purchase with checkout session ID
    await supabase
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
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
