# Launch Checklist for Claude Code for Knowledge Workers

## 1. Run Supabase Schema

Open: https://supabase.com/dashboard/project/rlzacttzdhmzypgjccri/sql/new

Copy and paste the entire contents of `lib/supabase/schema.sql` and click "Run".

This creates:
- `profiles` table (user info)
- `customers` table (Stripe customer mapping)
- `purchases` table (course purchases)
- `email_subscribers` table (Module 0 email capture)
- `has_purchased()` function
- Auto-create profile trigger

---

## 2. Configure Stripe

### Get API Keys
1. Go to https://dashboard.stripe.com/test/apikeys (test mode) or https://dashboard.stripe.com/apikeys (live)
2. Copy the **Secret key** (starts with `sk_test_` or `sk_live_`)

### Create Webhook
1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://id8labs.app/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `charge.refunded`
5. Click "Add endpoint"
6. Copy the **Signing secret** (starts with `whsec_`)

---

## 3. Add Environment Variables to Vercel

Run these commands (replace values with your actual keys):

```bash
# Stripe Secret Key
vercel env add STRIPE_SECRET_KEY production
# Paste: sk_live_xxxxxxxxxxxx

# Stripe Webhook Secret
vercel env add STRIPE_WEBHOOK_SECRET production
# Paste: whsec_xxxxxxxxxxxx
```

Or use the Vercel dashboard: https://vercel.com/eddies-projects-b49c74d7/id8labs/settings/environment-variables

---

## 4. Configure Supabase Auth (Email Templates)

1. Go to: https://supabase.com/dashboard/project/rlzacttzdhmzypgjccri/auth/templates

2. Edit "Confirm signup" template:
   - Make sure the redirect URL uses: `{{ .SiteURL }}/api/auth/callback`

3. Go to: https://supabase.com/dashboard/project/rlzacttzdhmzypgjccri/auth/url-configuration

4. Set:
   - Site URL: `https://id8labs.app`
   - Redirect URLs:
     - `https://id8labs.app/api/auth/callback`
     - `http://localhost:3000/api/auth/callback` (for local dev)

---

## 5. Deploy and Test

```bash
# Deploy to production
vercel --prod

# Test the flow:
# 1. Visit https://id8labs.app/courses/claude-for-knowledge-workers
# 2. Click "Start Free Module" → should work without auth
# 3. Click "Get Full Course" → should redirect to Stripe
# 4. Complete test purchase (use Stripe test card: 4242 4242 4242 4242)
# 5. After purchase, paid modules should be accessible
```

---

## Test Cards (Stripe Test Mode)

| Card Number | Scenario |
|-------------|----------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 0002 | Card declined |
| 4000 0000 0000 3220 | 3D Secure required |

Use any future expiry date and any 3-digit CVC.

---

## Environment Variables Summary

| Variable | Where to Get |
|----------|--------------|
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Developers → Webhooks → Your endpoint |
| `NEXT_PUBLIC_SUPABASE_URL` | Already set |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Already set |
| `SUPABASE_SERVICE_ROLE_KEY` | Already set |
| `RESEND_API_KEY` | Already set |

---

## Files Changed

- `lib/stripe.ts` - Stripe client + product config
- `lib/purchase.ts` - Purchase verification utility
- `lib/supabase/schema.sql` - Database schema
- `app/api/stripe/checkout/route.ts` - Creates checkout sessions
- `app/api/stripe/webhook/route.ts` - Handles payment events
- `app/(auth)/*` - Sign-in/sign-up pages
- `middleware.ts` - Auth + route protection
- `components/PurchaseGate.tsx` - Paywall for paid modules
- `components/CheckoutButton.tsx` - Checkout button
- Modules 1-5 - Wrapped with PurchaseGate
