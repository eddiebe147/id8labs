import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function GET() {
  // Try raw fetch to Stripe API to bypass the SDK
  try {
    const response = await fetch('https://api.stripe.com/v1/customers?limit=1', {
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({
        status: 'STRIPE_ERROR',
        httpStatus: response.status,
        error: data.error,
      })
    }

    return NextResponse.json({
      status: 'SUCCESS',
      method: 'raw_fetch',
      customersCount: data.data?.length || 0,
    })
  } catch (fetchError) {
    // If raw fetch fails, try the SDK
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2025-12-15.clover',
        typescript: true,
        timeout: 60000,
        maxNetworkRetries: 5,
      })

      const customers = await stripe.customers.list({ limit: 1 })

      return NextResponse.json({
        status: 'SUCCESS',
        method: 'sdk',
        customersCount: customers.data.length,
      })
    } catch (sdkError: unknown) {
      const stripeError = sdkError as { type?: string; code?: string; statusCode?: number }
      return NextResponse.json({
        status: 'ERROR',
        fetchError: fetchError instanceof Error ? fetchError.message : 'Unknown fetch error',
        sdkError: sdkError instanceof Error ? sdkError.message : 'Unknown SDK error',
        stripeType: stripeError.type,
      })
    }
  }
}
