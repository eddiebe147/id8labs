# ID8Labs Deployment Guide

## 🚀 Vercel Deployment

The site is deployed via **Vercel**.

### Automatic Deployment
Vercel automatically deploys the site whenever changes are pushed to the `main` branch.

### Domains
- **Primary:** `id8labs.app` (Active)

### DNS Configuration
To point a domain to Vercel, use the following records:

**A Record:**
- Name: `@`
- Value: `76.76.21.21`

**CNAME Record:**
- Name: `www`
- Value: `cname.vercel-dns.com`

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

**Dev server:** http://localhost:3000
