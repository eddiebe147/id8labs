/**
 * Raw Stripe API client using fetch
 *
 * The Stripe SDK has connection issues in Vercel's serverless environment.
 * This module provides direct fetch-based API calls that work reliably.
 */

const STRIPE_API_BASE = 'https://api.stripe.com/v1'

function getStripeKey(): string {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  return key
}

interface StripeApiOptions {
  method?: 'GET' | 'POST' | 'DELETE'
  body?: Record<string, unknown>
}

async function stripeRequest<T>(endpoint: string, options: StripeApiOptions = {}): Promise<T> {
  const { method = 'GET', body } = options

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${getStripeKey()}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
  }

  if (body && method === 'POST') {
    // Convert object to URL-encoded form data (Stripe API format)
    fetchOptions.body = encodeFormData(body)
  }

  const response = await fetch(`${STRIPE_API_BASE}${endpoint}`, fetchOptions)
  const data = await response.json()

  if (!response.ok) {
    const error = new Error(data.error?.message || 'Stripe API error')
    ;(error as Error & { stripeError: unknown }).stripeError = data.error
    throw error
  }

  return data as T
}

/**
 * Encode an object as URL-encoded form data with proper Stripe array/object notation
 */
function encodeFormData(obj: Record<string, unknown>, prefix = ''): string {
  const parts: string[] = []

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue

    const fullKey = prefix ? `${prefix}[${key}]` : key

    if (typeof value === 'object' && !Array.isArray(value)) {
      parts.push(encodeFormData(value as Record<string, unknown>, fullKey))
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'object') {
          parts.push(encodeFormData(item as Record<string, unknown>, `${fullKey}[${index}]`))
        } else {
          parts.push(`${encodeURIComponent(`${fullKey}[${index}]`)}=${encodeURIComponent(String(item))}`)
        }
      })
    } else {
      parts.push(`${encodeURIComponent(fullKey)}=${encodeURIComponent(String(value))}`)
    }
  }

  return parts.filter(p => p).join('&')
}

// Stripe API Types
export interface StripeCustomer {
  id: string
  email: string | null
  metadata: Record<string, string>
}

export interface StripeCheckoutSession {
  id: string
  url: string | null
  customer: string
  metadata: Record<string, string>
}

export interface StripeLineItem {
  price_data: {
    currency: string
    product_data: {
      name: string
      description?: string
    }
    unit_amount: number
  }
  quantity: number
}

// API Methods
export const stripeRaw = {
  customers: {
    async create(params: {
      email?: string
      metadata?: Record<string, string>
    }): Promise<StripeCustomer> {
      return stripeRequest<StripeCustomer>('/customers', {
        method: 'POST',
        body: params,
      })
    },

    async list(params?: { limit?: number }): Promise<{ data: StripeCustomer[] }> {
      const query = params?.limit ? `?limit=${params.limit}` : ''
      return stripeRequest(`/customers${query}`)
    },
  },

  checkout: {
    sessions: {
      async create(params: {
        customer: string
        line_items: StripeLineItem[]
        mode: 'payment' | 'subscription'
        success_url: string
        cancel_url: string
        metadata?: Record<string, string>
        customer_update?: {
          address?: 'auto' | 'never'
        }
      }): Promise<StripeCheckoutSession> {
        return stripeRequest<StripeCheckoutSession>('/checkout/sessions', {
          method: 'POST',
          body: params,
        })
      },
    },
  },
}
