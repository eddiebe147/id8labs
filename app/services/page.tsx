'use client'

import { useEffect } from 'react'
import { m } from '@/components/motion'
import Link from 'next/link'
import { ServiceCard } from '@/components/ServiceCard'
import { getProductsByCategory } from '@/lib/products'

// Load Cal.com script globally for booking buttons
// Uses Cal.com's official embed pattern with queue-based initialization
function useCalScript() {
  useEffect(() => {
    // Check if Cal is already initialized
    const win = window as unknown as { Cal?: CallableFunction & { loaded?: boolean; q?: unknown[]; ns?: Record<string, unknown> } }
    if (win.Cal?.loaded) return

    // Cal.com's official embed snippet (queue-based pattern)
    // This creates a Cal function that queues calls until the script loads
    ;(function (C: Window, A: string, L: string) {
      const p = function (a: { q: unknown[] }, ar: unknown) { a.q.push(ar) }
      const d = C.document
      const w = C as unknown as { Cal: CallableFunction & { loaded?: boolean; q?: unknown[]; ns?: Record<string, CallableFunction & { q: unknown[] }> } }
      w.Cal = w.Cal || function (...args: unknown[]) {
        const cal = w.Cal as CallableFunction & { loaded?: boolean; q: unknown[]; ns: Record<string, CallableFunction & { q: unknown[] }> }
        if (!cal.loaded) {
          cal.ns = {}
          cal.q = cal.q || []
          d.head.appendChild(d.createElement('script')).src = A
          cal.loaded = true
        }
        if (args[0] === L) {
          const api = function (...apiArgs: unknown[]) { p(api as unknown as { q: unknown[] }, apiArgs) } as unknown as CallableFunction & { q: unknown[] }
          const namespace = args[1]
          api.q = api.q || []
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api
            p(cal.ns[namespace], args)
            p(cal as { q: unknown[] }, ['initNamespace', namespace])
          } else {
            p(cal as { q: unknown[] }, args)
          }
          return
        }
        p(cal as { q: unknown[] }, args)
      }
    })(window, 'https://app.cal.com/embed/embed.js', 'init')

    // Initialize Cal with branding
    const Cal = win.Cal
    if (Cal) {
      Cal('init', { origin: 'https://cal.com' })
      Cal('ui', {
        styles: { branding: { brandColor: '#FF6B35' } },
        hideEventTypeDetails: false,
      })
    }
  }, [])
}

// Animation variants
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Icon components
const ClockIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
)

const SparklesIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
)

const LayoutIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M3 9h18M9 21V9"/>
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

// Data
const problems = [
  { icon: <ClockIcon />, text: "You've bookmarked 47 tutorials you'll \"watch later\"" },
  { icon: <SparklesIcon />, text: "Every prompt feels like starting from scratch" },
  { icon: <LayoutIcon />, text: "You know there's a better way but can't find the time to build it" },
  { icon: <TrendingUpIcon />, text: "Meanwhile, competitors are shipping faster than you" },
]

const audiences = [
  {
    title: "Business owners drowning in busywork",
    description: "Emails, proposals, follow-ups eating your week. You need systems, not more hours.",
  },
  {
    title: "Founders shipping too slowly",
    description: "Your competitors are using AI to move faster. You need to catch up — now.",
  },
  {
    title: "Creative professionals scaling up",
    description: "More clients means more admin. AI handles the repetitive stuff so you can do the real work.",
  },
  {
    title: "Anyone tired of feeling behind",
    description: "You know AI matters. You just need someone to show you how to actually use it.",
  },
]

const credentials = [
  { highlight: "90 Day Fiancé", role: "— Story Production" },
  { highlight: "The First 48", role: "— Director of Photography" },
  { highlight: "High on the Hog (Netflix)", role: "— Cinematography" },
  { highlight: "Teen Mom", role: "— Camera & Production" },
  { highlight: "3+ years", role: "daily AI workflow integration" },
  { highlight: "ID8Labs", role: "— Founder, building AI tools for creators" },
]

// Get products from unified config
const aiImplementationServices = getProductsByCategory('ai-implementation')

export default function ServicesPage() {
  // Initialize Cal.com script
  useCalScript()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-zone-text">
        <div className="container">
          <m.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl"
          >
            <m.p
              variants={fadeUp}
              className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-6"
            >
              AI Implementation Services
            </m.p>

            <m.h1
              variants={fadeUp}
              className="text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] font-bold tracking-tight mb-8"
            >
              Stop watching tutorials.
              <br />
              <span className="text-gradient-orange">Start using AI.</span>
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mb-10 leading-relaxed"
            >
              You know AI matters. You've played with ChatGPT. But turning that into actual workflows that save you hours every week? That's where most people get stuck. We fix that.
            </m.p>

            <m.div variants={fadeUp}>
              <button
                data-cal-link="id8labs/15min"
                data-cal-config='{"layout":"month_view"}'
                className="btn btn-primary hover-lift group inline-flex items-center gap-3"
              >
                Book a Call
                <ArrowRightIcon />
              </button>
            </m.div>
          </m.div>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Academy Cross-link Banner */}
      <section className="py-6 bg-id8-orange/10 border-y border-id8-orange/20">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎓</span>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">Want to learn AI yourself?</p>
                <p className="text-sm text-[var(--text-secondary)]">Free courses on prompt engineering and AI workflows in the Academy</p>
              </div>
            </div>
            <Link
              href="/academy"
              className="btn bg-id8-orange text-white hover:bg-id8-orange/90 whitespace-nowrap group inline-flex items-center gap-2"
            >
              Visit Academy
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                The real problem isn't the tools.{' '}
                <span className="text-gradient-orange">It's implementation.</span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                You're tech-savvy. You're not afraid of new software. But between running your business and keeping up with the AI tsunami, something falls through the cracks: actually setting this stuff up.
              </p>
            </div>

            <m.ul
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="space-y-0"
            >
              {problems.map((problem, index) => (
                <m.li
                  key={index}
                  variants={fadeUp}
                  className="flex items-start gap-4 py-5 border-b border-[var(--border)] last:border-b-0"
                >
                  <span className="text-id8-orange flex-shrink-0 mt-0.5">
                    {problem.icon}
                  </span>
                  <span className="text-[var(--text-secondary)] text-lg">
                    {problem.text}
                  </span>
                </m.li>
              ))}
            </m.ul>
          </div>
        </div>
      </section>

      {/* AI Implementation Services Section */}
      <section className="section-spacing bg-[var(--bg-secondary)]" id="services">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Services
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Three ways to work together
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-lg mx-auto">
              From hands-on training to full implementation. Pick what fits.
            </p>
          </div>

          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {aiImplementationServices.map((product) => (
              <m.div key={product.id} variants={fadeUp}>
                <ServiceCard product={product} />
              </m.div>
            ))}
          </m.div>
        </div>
      </section>


      {/* Audience Section */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Who This Is For
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              You're in the right place if...
            </h2>
          </div>

          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto"
          >
            {audiences.map((audience, index) => (
              <m.div
                key={index}
                variants={fadeUp}
                className="card hover:border-[var(--border-light)]"
              >
                <h3 className="text-lg font-bold mb-2">{audience.title}</h3>
                <p className="text-[var(--text-secondary)]">{audience.description}</p>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Built by someone who's been{' '}
                <span className="text-gradient-orange">in the trenches</span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
                I'm not an AI researcher. I'm a producer who figured out how to make these tools actually work for creative, fast-moving operations.
              </p>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                20+ years in film and TV production taught me one thing: systems beat hustle. Now I build AI systems for people who don't have time to figure it out themselves.
              </p>
            </div>

            <m.ul
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="space-y-0"
            >
              {credentials.map((cred, index) => (
                <m.li
                  key={index}
                  variants={fadeUp}
                  className="py-4 border-b border-[var(--border)] last:border-b-0 font-mono text-sm"
                >
                  <span className="text-[var(--text-primary)] font-semibold">
                    {cred.highlight}
                  </span>{' '}
                  <span className="text-[var(--text-tertiary)]">
                    {cred.role}
                  </span>
                </m.li>
              ))}
            </m.ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing-lg relative">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] aspect-square bg-[radial-gradient(circle,var(--id8-orange-light)_0%,transparent_70%)] opacity-30 pointer-events-none" />

        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to stop playing catch-up?
            </h2>
            <p className="text-xl text-[var(--text-secondary)] mb-10">
              Book a 15-minute call. We'll figure out which option fits — or if this isn't right for you.
            </p>

            <button
              data-cal-link="id8labs/15min"
              data-cal-config='{"layout":"month_view"}'
              className="btn btn-primary hover-lift group inline-flex items-center gap-3 text-lg px-8 py-4"
            >
              Let's Talk
              <ArrowRightIcon />
            </button>

            <p className="mt-6 text-sm font-mono text-[var(--text-tertiary)]">
              No pitch. No pressure. Just a conversation.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
