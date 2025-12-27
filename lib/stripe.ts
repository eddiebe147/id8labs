import Stripe from 'stripe'

// Lazy initialization to avoid build-time errors when env vars aren't available
let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured')
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
    })
  }
  return stripeInstance
}

// Deprecated: use getStripe() instead
export const stripe = {
  get webhooks() {
    return getStripe().webhooks
  },
  get checkout() {
    return getStripe().checkout
  },
}

// Course product configuration
export const COURSE_PRODUCTS = {
  'claude-for-knowledge-workers': {
    name: 'Claude Code for Knowledge Workers',
    description: 'Complete 6-module course + lifetime updates',
    price: 9900, // $99.00 in cents (Founder's Launch Special - was $197)
    currency: 'usd',
  },
} as const

export type CourseProductId = keyof typeof COURSE_PRODUCTS
