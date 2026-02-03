# ID8Labs - Claude Coding Context

## Project Philosophy
**"Professional tools for the AI era" - Clean, scientific, credible company presence.**

**Design Principle:** "NO feature creep. NO RGB glows. NO heavy animations. Just clean, fast, credible."

## Design Philosophy
### **White Paper Edition**
- This is the **lab coat** - boring, scientific, professional, credible
- Products bring personality; the lab just needs to be **trusted**
- **Monochromatic only** - no colors except black, white, gray
- **Generous whitespace** - breathing room everywhere
- **Maximum credibility** - every design decision reinforces trust

## Tech Stack Rules
- **Next.js 14** - App Router, TypeScript strict mode
- **Tailwind CSS** - Utility-first styling, design system compliance
- **Framer Motion** - Subtle animations only (no heavy effects)
- **Inter font family** - Professional typography
- **Radix Icons** - Minimal iconography
- **React 18** - Modern patterns, no class components

## Color System (STRICT)
### **Light Mode**
- Background: `#FFFFFF` (pure white)
- Primary text: `#000000` (black)
- Secondary text: `#666666` (gray)
- Borders: `#E5E5E5`

### **Dark Mode**
- Background: `#0A0A0A` (near black)
- Primary text: `#FFFFFF` (white)
- Secondary text: `#999999` (gray)
- Borders: `#2A2A2A`

**NO OTHER COLORS ALLOWED** - This is a monochromatic system.

## Typography System
- **Font:** Inter (loaded from Google Fonts)
- **H1:** 3.5rem (56px), 700 weight
- **H2:** 2.5rem (40px), 700 weight
- **H3:** 2rem (32px), 600 weight
- **Body:** 1.125rem (18px), 400 weight
- **Small:** 0.875rem (14px), 400 weight

## Layout Standards
- **Max width:** 1200px (container)
- **Section spacing:** 6rem (96px) vertical
- **Component spacing:** 2rem-4rem depending on hierarchy
- **Mobile breakpoints:** sm:640px, md:768px, lg:1024px, xl:1280px

## Component Patterns
### **Page Structure**
```tsx
export default function PageName() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Header />
      <main className="pt-20">
        <Container>
          {/* Page content */}
        </Container>
      </main>
      <Footer />
    </div>
  )
}
```

### **Section Pattern**
```tsx
<section className="py-24">
  <Container>
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-6">Section Title</h2>
      <p className="text-xl text-gray-600">Section description</p>
    </div>
    {/* Section content */}
  </Container>
</section>
```

## Content Standards
### **Writing Voice**
- **Professional** but not corporate
- **Technical accuracy** without jargon
- **Confidence** without arrogance
- **Helpful** without being sales-y

### **Content Structure**
- **Headlines** should be clear and direct
- **Descriptions** should explain value, not features
- **Call-to-actions** should be obvious and low-friction

## Performance Requirements
- **Lighthouse score** >90 for Performance, Accessibility, SEO
- **Initial page load** <2 seconds
- **Core Web Vitals** all green
- **Bundle size** optimized (<500KB initial JS)

## What NOT to Do
### **Design Violations**
- **NO colors** except black/white/gray
- **NO heavy animations** - subtle motion only
- **NO feature creep** - every addition must justify its existence
- **NO RGB glows** or fancy effects
- **NO decorative elements** that don't serve function

### **Code Violations**
- **NO inline styles** - use Tailwind classes
- **NO hardcoded colors** - use design tokens
- **NO complex state** unless absolutely necessary
- **NO external dependencies** without justification
- **NO client-side rendering** for static content

## File Structure
```
/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
│   ├── ui/          # Base components (Button, Container, etc.)
│   └── sections/    # Page sections (Hero, Features, etc.)
├── lib/             # Utilities and helpers
├── public/          # Static assets
├── styles/          # Global styles
└── types/           # TypeScript type definitions
```

## Testing Standards
- **Unit tests** for utility functions
- **Component tests** for UI components
- **E2E tests** for critical user flows (contact forms, navigation)
- **Accessibility tests** for WCAG compliance
- **Performance tests** for Core Web Vitals

## SEO Requirements
- **Meta tags** properly configured
- **Open Graph** and Twitter cards
- **Sitemap** generated and up-to-date
- **Schema.org** markup for business info
- **Mobile-friendly** design
- **Page speed** optimized

## Content Management
- **Markdown** for blog posts and articles
- **Static generation** for all content
- **Image optimization** with Next.js Image component
- **Font optimization** with Next.js Font system

## Deployment Standards
- **Vercel** for hosting and deployment
- **Environment variables** for configuration
- **Build optimization** for production
- **Analytics** integration (privacy-focused)

---

**Remember:** This site represents id8Labs as a serious, professional company building tools for the AI era. Every pixel should reinforce credibility and trust.