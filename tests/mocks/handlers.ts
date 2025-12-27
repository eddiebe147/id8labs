import { http, HttpResponse } from 'msw'

// Mock Stripe API responses
export const stripeHandlers = [
  // Create checkout session
  http.post('https://api.stripe.com/v1/checkout/sessions', async ({ request }) => {
    return HttpResponse.json({
      id: 'cs_test_mock_session_123',
      url: 'https://checkout.stripe.com/test',
      payment_intent: 'pi_test_mock_123',
      metadata: {
        user_id: 'test-user-id',
        product_id: 'claude-for-knowledge-workers',
        purchase_id: 'purchase-123',
      },
    })
  }),

  // Create customer
  http.post('https://api.stripe.com/v1/customers', async () => {
    return HttpResponse.json({
      id: 'cus_test_mock_123',
      email: 'test@example.com',
    })
  }),
]

// Mock Supabase API responses
export const supabaseHandlers = [
  // Auth - get user
  http.get('https://test.supabase.co/auth/v1/user', () => {
    return HttpResponse.json({
      id: 'test-user-id',
      email: 'test@example.com',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
    })
  }),

  // Purchases table - select
  http.get('https://test.supabase.co/rest/v1/purchases', ({ request }) => {
    const url = new URL(request.url)
    const status = url.searchParams.get('status')
    const select = url.searchParams.get('select')

    // Default: Return empty for existing purchase check (no prior purchases)
    if (status === 'eq.completed') {
      return HttpResponse.json([])
    }

    // For single record with limit=1
    if (select === 'id' || url.searchParams.get('limit') === '1') {
      return HttpResponse.json([])
    }

    return HttpResponse.json([])
  }),

  // Purchases table - insert
  http.post('https://test.supabase.co/rest/v1/purchases', async () => {
    return HttpResponse.json([{
      id: 'purchase-123',
      user_id: 'test-user-id',
      product_id: 'claude-for-knowledge-workers',
      amount: 9900,
      currency: 'usd',
      status: 'pending',
      created_at: new Date().toISOString(),
    }])
  }),

  // Purchases table - update
  http.patch('https://test.supabase.co/rest/v1/purchases*', async () => {
    return HttpResponse.json([{
      id: 'purchase-123',
      status: 'completed',
    }])
  }),

  // Customers table - select
  http.get('https://test.supabase.co/rest/v1/customers*', () => {
    return HttpResponse.json([])
  }),

  // Customers table - upsert
  http.post('https://test.supabase.co/rest/v1/customers', async () => {
    return HttpResponse.json([{
      id: 'test-user-id',
      stripe_customer_id: 'cus_test_mock_123',
    }])
  }),
]

// Mock Resend API responses
export const resendHandlers = [
  // Send email
  http.post('https://api.resend.com/emails', async () => {
    return HttpResponse.json({
      id: 'email_test_mock_123',
    })
  }),

  // Create contact
  http.post('https://api.resend.com/audiences/*/contacts', async () => {
    return HttpResponse.json({
      id: 'contact_test_mock_123',
    })
  }),
]

export const handlers = [
  ...stripeHandlers,
  ...supabaseHandlers,
  ...resendHandlers,
]
