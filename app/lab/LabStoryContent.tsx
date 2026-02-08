'use client'

import Link from 'next/link'
import { m, useInView } from '@/components/motion'
import { useRef, useState, useEffect } from 'react'
import { featuredHomeProducts } from '@/lib/home-products'

// Section data for navigation
const sections = [
  { id: 'origin', title: 'Where It Started' },
  { id: 'thesis', title: 'The Thesis' },
  { id: 'proof', title: 'What We Shipped' },
  { id: 'system', title: 'The System' },
  { id: 'method', title: 'How I Build' },
  { id: 'ecosystem', title: 'The Ecosystem' },
  { id: 'public', title: 'Working in Public' },
  { id: 'contact', title: 'Get in Touch' },
]

// Fade-in animation component
function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  )
}

// Sticky section header component
function StickySection({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="mb-16 scroll-mt-32">
      <div className="sticky top-20 z-10 mb-6 -mx-4 px-4 py-4 backdrop-blur-md bg-[var(--bg-primary)]/80 rounded-subtle">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      <FadeInSection>
        <div className="space-y-6 text-lg leading-relaxed">{children}</div>
      </FadeInSection>
    </section>
  )
}

// Side navigation component
function SideNavigation({ activeSection }: { activeSection: string }) {
  return (
    <nav className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-20">
      <ul className="space-y-4">
        {sections.map((section) => {
          const isActive = activeSection === section.id
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="group flex items-center gap-3 text-sm transition-all"
                aria-label={`Jump to ${section.title}`}
              >
                <div
                  className={`h-2 rounded-full transition-all ${
                    isActive
                      ? 'w-12 bg-id8-orange'
                      : 'w-8 bg-[var(--border)] group-hover:w-10 group-hover:bg-[var(--text-secondary)]'
                  }`}
                />
                <span
                  className={`transition-all ${
                    isActive
                      ? 'text-id8-orange font-medium opacity-100'
                      : 'text-[var(--text-secondary)] opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {section.title}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

// Map product names to what they offload
const productOffloads: Record<string, string> = {
  Composer: 'context & continuity',
  HOMER: 'deal lifecycle management',
  DeepStack: 'pattern recognition & emotional guardrails',
  MILO: 'signal-to-noise task management',
}

export default function LabStoryContent() {
  const [activeSection, setActiveSection] = useState('origin')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id)
            }
          })
        },
        {
          rootMargin: '-20% 0px -60% 0px',
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <div className="container py-24 relative">
      <SideNavigation activeSection={activeSection} />

      <article className="max-w-3xl mx-auto">
        {/* Back Link */}
        <FadeInSection>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-id8-orange mb-12 transition-colors rounded-gentle"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to home
          </Link>
        </FadeInSection>

        {/* Header */}
        <header className="mb-16">
          <FadeInSection>
            <h1 className="mb-6">The Lab Story</h1>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>I started as a cameraman.</p>
              <p>
                First 48. Orange County Choppers. 90 Day Fiance. Twenty years of production
                work — from hands-on camera to story development, cast management, and the invisible
                infrastructure that turns chaos into narrative. Somewhere in there, I stopped
                capturing footage and started architecting systems.
              </p>
              <p>
                That shift is what this lab is about.
              </p>
            </div>
          </FadeInSection>
        </header>

        {/* Where It Started */}
        <StickySection id="origin" title="Where It Started">
          <p>
            The hardest part of production was never the work itself. It was the mental overhead.
            Holding a complex project in your head while simultaneously trying to develop it.
            Remembering what you decided three weeks ago so you can focus on what comes next.
          </p>
          <p>
            When AI tools arrived, they promised to help — but every session started the same way.
            Re-uploading documents. Re-explaining context. Rebuilding from scratch. By the third
            revision, the AI had forgotten half the project.
          </p>
          <p className="text-2xl font-bold text-id8-orange">
            Context rot.
          </p>
          <p>
            That was the named problem. Not that AI forgot — but what that forgetting cost: creative
            bandwidth. Every time I rebuilt context, that was mental energy not available for actual
            creative work. Repetitive cognitive labor masquerading as progress.
          </p>
          <p>
            The question became: <span className="font-bold">what cognitive work should not be done by a human?</span>
          </p>
          <p>
            ID8Composer was the first answer — an AI writing partner that actually remembers your
            story world across sessions. That was product one. The lab kept going.
          </p>
        </StickySection>

        {/* The Thesis */}
        <StickySection id="thesis" title="The Thesis">
          <p className="text-2xl font-bold text-id8-orange mb-4">
            AI as an auxiliary layer of the brain.
          </p>
          <div className="mt-8 space-y-6">
            <div>
              <p className="font-bold text-id8-orange mb-2">Offload context management.</p>
              <p>
                Let the system remember so you can focus on creating.
              </p>
            </div>
            <div>
              <p className="font-bold text-id8-orange mb-2">Automate pattern recognition.</p>
              <p>
                Let the system surface signals so you can focus on decisions.
              </p>
            </div>
            <div>
              <p className="font-bold text-id8-orange mb-2">Build systems, not features.</p>
              <p>
                A feature solves one problem once. A system solves categories of problems continuously.
                The goal is compounding leverage — tools that get more valuable as you use them.
              </p>
            </div>
          </div>
          <p className="mt-8">
            What this is <span className="font-bold">not:</span> replacement. Not a content machine.
            Not a chatbot. This is cognitive extension — an additional layer of processing that
            handles the work your brain shouldn&apos;t waste cycles on.
          </p>
          <p>
            In 2025, this was speculative. In 2026, it&apos;s proven. Four products shipping. An
            operating system connecting them. Forty-nine essays documenting the process. The thesis
            held up.
          </p>
        </StickySection>

        {/* What We Shipped */}
        <StickySection id="proof" title="What We Shipped">
          <p>
            Every product is a specific answer to: &ldquo;What cognitive work can I offload?&rdquo;
          </p>
          <div className="py-8 px-6 border border-[var(--border)] rounded-soft bg-[var(--bg-secondary)]">
            <div className="grid gap-4">
              {featuredHomeProducts.map((product) => (
                <div key={product.name} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-bold">{product.name}</span>
                    {product.statusLabel && (
                      <span className="text-[var(--text-tertiary)] text-sm ml-2">{product.statusLabel}</span>
                    )}
                    <span className="text-[var(--text-secondary)]">
                      {' '}&mdash; Offloads {productOffloads[product.name] || product.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p>
            Composer handles context so you can create. HOMER handles deal complexity so you can
            close. DeepStack handles market analysis so you can decide. MILO handles task noise
            so you can focus. Each one removes a category of cognitive overhead.
          </p>
        </StickySection>

        {/* The System That Runs the Lab */}
        <StickySection id="system" title="The System That Runs the Lab">
          <p>
            The products solve individual problems. HYDRA connects them all.
          </p>
          <p>
            HYDRA is the operating system behind this lab — 23 automated jobs, 4 AI agents (MILO
            as coordinator plus 3 domain specialists), SQLite for local state, and Telegram for
            natural language control. It runs the infrastructure so I can focus on building.
          </p>
          <div className="pl-6 border-l-4 border-id8-orange space-y-4 rounded-subtle">
            <div>
              <p className="font-bold text-id8-orange mb-1">Economics</p>
              <p className="text-[var(--text-secondary)]">
                $300/month. 75% cost reduction from traditional multi-agent systems. Premium
                coordination (Claude) plus free execution (open models).
              </p>
            </div>
            <div>
              <p className="font-bold text-id8-orange mb-1">The recursion</p>
              <p className="text-[var(--text-secondary)]">
                AI as cognitive leverage to build a system that provides cognitive leverage.
                The thesis eating its own tail.
              </p>
            </div>
          </div>
          <p>
            HYDRA isn&apos;t a product for sale. It&apos;s proof-of-thesis — a living demonstration that
            the cognitive leverage model works at the systems level, not just the tool level.
          </p>
          <p>
            The full technical breakdown is in the{' '}
            <Link
              href="/writing/building-ai-human-os-v2"
              className="border-b-2 border-id8-orange text-id8-orange hover:opacity-70 transition-opacity"
            >
              HYDRA essay
            </Link>
            .
          </p>
        </StickySection>

        {/* How I Build */}
        <StickySection id="method" title="How I Build">
          <p>
            <span className="font-bold">Problem-first.</span> Every tool starts with friction
            experienced in production. Not &ldquo;wouldn&apos;t it be nice if&rdquo; — but &ldquo;I
            need this right now or this project fails.&rdquo;
          </p>
          <p>
            <span className="font-bold">Ship to learn.</span> The first version teaches what the
            real version needs. Production feedback over planning documents.
          </p>
          <p>
            <span className="font-bold">Cross-domain pattern recognition.</span> Filmmaking and
            mycology have more in common than you&apos;d think — both are about how systems grow, how
            networks form, how small changes cascade. Wildlife biology teaches you to observe
            without interfering. Trading systems teach you to build guardrails against your own
            worst instincts.
          </p>
          <p>
            <span className="font-bold">Working in public.</span> Ship before polished. Let real
            feedback shape the direction.
          </p>
          <p>
            <span className="font-bold">Claude as creative partner.</span> Director/Builder
            pattern — I plan and review, AI executes scoped tasks. It&apos;s the thesis applied to the
            build process itself.
          </p>
        </StickySection>

        {/* The Ecosystem */}
        <StickySection id="ecosystem" title="The Ecosystem">
          <p>
            What started as a workshop has grown into four pillars.
          </p>
          <div className="pl-6 border-l-4 border-id8-orange space-y-6 rounded-subtle">
            <div>
              <p className="font-bold text-id8-orange mb-1">Products</p>
              <p className="text-[var(--text-secondary)]">
                Composer, HOMER, DeepStack, MILO, Pipeline, LLC Ops — each targeting a different
                category of cognitive overhead.
              </p>
            </div>
            <div>
              <p className="font-bold text-id8-orange mb-1">Education</p>
              <p className="text-[var(--text-secondary)]">
                Academy courses on AI workflows and prompt engineering. StackShack with 228+ free
                Claude Code skills. Learn by building, not watching.
              </p>
            </div>
            <div>
              <p className="font-bold text-id8-orange mb-1">Services</p>
              <p className="text-[var(--text-secondary)]">
                AI implementation consulting for businesses that know AI matters but need help
                making it operational.{' '}
                <Link
                  href="/services"
                  className="border-b border-id8-orange text-id8-orange hover:opacity-70 transition-opacity"
                >
                  Learn more
                </Link>
                .
              </p>
            </div>
            <div>
              <p className="font-bold text-id8-orange mb-1">Writing</p>
              <p className="text-[var(--text-secondary)]">
                49+ essays on building in public — technical breakdowns, product thinking, and the
                philosophy behind the tools.
              </p>
            </div>
          </div>
        </StickySection>

        {/* Working in Public */}
        <StickySection id="public" title="Working in Public">
          <p>
            Forty-nine essays published. Open source tools (MILO, StackShack skills). Free Academy
            courses. Everything built in the open.
          </p>
          <p>
            The philosophy: ship before ready, iterate on real feedback, document as you go. Trust
            through transparency.
          </p>
          <p>
            The{' '}
            <Link
              href="/writing/building-ai-human-os-v2"
              className="border-b-2 border-id8-orange text-id8-orange hover:opacity-70 transition-opacity"
            >
              HYDRA article
            </Link>
            {' '}is a good example — a 4,000-word technical breakdown of the entire AI-Human OS,
            published for anyone to read and learn from. That&apos;s the standard: build something
            real, then show exactly how it works.
          </p>
          <p className="font-bold">
            If you&apos;re here, you&apos;re watching the lab in real time. Stick around. It keeps going.
          </p>
        </StickySection>

        {/* Signature */}
        <FadeInSection>
          <section className="mb-16 text-center">
            <p className="text-xl font-bold">Eddie Belaval</p>
            <p className="text-[var(--text-secondary)]">Miami, 2026</p>
          </section>
        </FadeInSection>

        {/* Get in Touch */}
        <StickySection id="contact" title="Get in Touch">
          <div className="pt-8 space-y-6">
            <p className="text-[var(--text-secondary)]">
              Questions? Feedback? Want to collaborate?
            </p>
            <p>
              Email me at{' '}
              <a
                href="mailto:eb@id8labs.tech"
                className="border-b-2 border-id8-orange text-id8-orange hover:opacity-70 transition-opacity rounded-gentle"
              >
                eb@id8labs.tech
              </a>
            </p>
            <p>
              Want to work together?{' '}
              <Link
                href="/services"
                className="border-b-2 border-id8-orange text-id8-orange hover:opacity-70 transition-opacity rounded-gentle"
              >
                Book a call
              </Link>
            </p>
            <div className="flex items-center gap-6 pt-4 text-sm text-[var(--text-tertiary)]">
              <a
                href="https://twitter.com/eddiebe"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-id8-orange transition-colors"
              >
                X / Twitter
              </a>
              <a
                href="https://github.com/eddiebelaval"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-id8-orange transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </StickySection>
      </article>
    </div>
  )
}
