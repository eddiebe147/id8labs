import Stripe from 'stripe'

// Lazy initialization to avoid build-time errors when env vars aren't available
let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured')
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-01-28.clover',
      typescript: true,
    })
  }
  return stripeInstance
}

// Re-export from unified products config for backwards compatibility
export { COURSE_PRODUCTS, type CourseProductId } from './products'
