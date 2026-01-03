# ID8 Email System

This directory contains content and documentation for the ID8 email marketing system.

## Architecture

```
content/email/
├── sequences/                  # Drip campaign content
│   └── academy-onboarding/     # 7-email Academy welcome series
├── newsletters/                # Monthly newsletter content
│   ├── templates/              # Newsletter structure docs
│   └── issues/                 # Individual issue content
└── README.md                   # This file
```

## Technical Implementation

Email templates live in `lib/email/templates/`:
- `academy-onboarding-sequence.ts` - Academy onboarding emails
- `newsletter-template.ts` - Newsletter template system
- `ai-fundamentals-sequence.ts` - Free course nurture sequence

### API Routes

- `POST /api/email-sequences/trigger` - Start a sequence for a user
- `GET /api/email-sequences/cron` - Process pending emails (Vercel cron)
- `POST /api/newsletter/send` - Send newsletter broadcast

### Database Tables (Supabase)

- `email_sequences` - Track active sequences per user
- `email_sequence_logs` - Log all sent emails
- `newsletter_subscribers` - Newsletter subscriber list with tier info

## Email Sequences

### Academy Onboarding (7 emails)
Triggers: Stripe webhook on $99 Masterclass purchase

| Email | Timing | Subject |
|-------|--------|---------|
| 1 | Immediate | You're in. Here's your Academy access. |
| 2 | +1 day | The one thing that separates finishers from browsers |
| 3 | +3 days | Meet your implementation partner (MILO intro) |
| 4 | +7 days | Week one — where are you? |
| 5 | +14 days | You're halfway. Here's what changes now. |
| 6 | +21 days | One module left. Then: your certificate. |
| 7 | On completion | You did it. Here's your certificate. |

### AI Fundamentals Nurture (3 emails)
Triggers: Free course signup

| Email | Timing | Purpose |
|-------|--------|---------|
| 1 | Immediate | Value-add tip |
| 2 | +1 day | Social proof + soft pitch |
| 3 | +2 days | Direct pitch for paid course |

## Newsletter

**Name:** The Innovation Brief
**Frequency:** Monthly
**Audience:** All subscribers (tiered content)

### Content Structure

1. **The Big Idea** - One insight (150-200 words)
2. **Framework** - Actionable framework with steps
3. **Case Study** - Real example with results
4. **MILO Tip** [Academy Only] - Power-user prompt
5. **Graduate's Edge** [Academy Only] - Template/resource download
6. **Closing** - Personal note + CTA

### Audience Tiers

- **Free Tier**: Sections 1-3 + upgrade CTA
- **Academy Members**: Full newsletter + exclusive sections

## Sending Emails

### Start a Sequence
```typescript
// POST /api/email-sequences/trigger
{
  "email": "user@example.com",
  "sequenceId": "academy-onboarding",
  "source": "stripe-webhook"
}
```

### Send Newsletter
```typescript
// POST /api/newsletter/send
{
  "issueNumber": 1,
  "audienceFilter": "all" // or "academy" or "free"
}
```

## Resend Configuration

Required environment variables:
- `RESEND_API_KEY` - Resend API key
- `CRON_SECRET` - Secret for cron job authentication

Email sender: `Eddie @ ID8Labs <hello@id8labs.app>`

## Adding New Content

### New Sequence Email
1. Edit the sequence file in `lib/email/templates/`
2. Add the email function
3. Update the `totalSteps` and `schedule` config
4. Test via `/api/email-sequences/trigger`

### New Newsletter Issue
1. Add issue content to `lib/email/templates/newsletter-template.ts`
2. Export as `NEWSLETTER_ISSUE_N`
3. Update newsletter sending route to include new issue
4. Save markdown copy in `content/email/newsletters/issues/`
