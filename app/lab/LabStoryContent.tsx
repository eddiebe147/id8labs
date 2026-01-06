'use client'

import Link from 'next/link'
import { m, useInView } from '@/components/motion'
import { useRef, useState, useEffect } from 'react'

// Section data for navigation
const sections = [
  { id: 'problem', title: 'The Problem' },
  { id: 'how-i-build', title: 'How I Build' },
  { id: 'what-lab-became', title: 'What This Lab Has Become' },
  { id: 'philosophy', title: 'The Philosophy' },
  { id: 'shift', title: 'The Shift' },
  { id: 'shipping', title: "What's Shipping" },
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

export default function LabStoryContent() {
  const [activeSection, setActiveSection] = useState('problem')

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
                First 48. Orange County Choppers. 90 Day Fiancé. Twenty years of production work taught me to see
                the machinery behind stories—not just what's on screen, but the systems that make them possible.
              </p>
              <p>
                Somewhere along the way, I stopped being the person who captures the footage and became the person
                who architects the whole thing. Story development. Production logistics. Cast management. The invisible
                infrastructure that turns chaos into narrative.
              </p>
            </div>
          </FadeInSection>
        </header>

        {/* The Problem */}
        <StickySection id="problem" title="The Problem I Couldn't Ignore">
          <p>
            AI showed up and everyone celebrated the wrong thing.
          </p>
          <p>
            "It can write!" they said. "It can generate ideas!" As if the bottleneck in creative work
            was ever the generation of raw material.
          </p>
          <p>
            The real bottleneck is cognitive. It's the mental load of holding a complex project in your
            head while simultaneously trying to develop it. It's the bandwidth consumed by remembering
            what you've already decided so you can focus on what comes next.
          </p>
          <p>
            Every AI session started the same way: re-uploading documents, re-explaining characters,
            rebuilding context from scratch. By the third revision, the AI had forgotten half the story world.
          </p>
          <p className="text-2xl font-bold text-id8-orange">
            Context rot.
          </p>
          <p>
            But the real problem wasn't that the AI forgot. It was what that forgetting cost me:
            creative bandwidth. Every time I had to rebuild context, that was mental energy
            not available for actual creative work. Repetitive cognitive labor masquerading as progress.
          </p>
          <p>
            I needed tools that would handle the low-level memory work so my brain could operate
            at the level where creative breakthroughs actually happen.
          </p>
          <p>
            So I built ID8Composer. That was the first product. It wasn't the last.
          </p>
        </StickySection>

        {/* How I Build */}
        <StickySection id="how-i-build" title="How I Build">
          <p>
            I don't build from whiteboards. I build from the field.
          </p>
          <p>
            Every tool starts with friction I personally experienced. Not "wouldn't it be nice if"—but
            "I need this right now or this project fails." Battle-tested in real production environments.
            Refined through actual creative work, not focus groups.
          </p>
          <p>
            The question I ask: <span className="font-bold">What cognitive work shouldn't I be doing?</span>
          </p>
          <p>
            What's repetitive? What's taxing my working memory without generating insight? What could
            a system handle so I can think about the things that actually require human judgment?
          </p>
          <p>
            That's the filter. That's what makes an ID8Labs tool worth building.
          </p>
          <p>
            I see patterns across domains that other people miss. Filmmaking and mycology have more in common
            than you'd think—both are about understanding how systems grow, how networks form, how small changes
            cascade. Wildlife biology teaches you to observe without interfering. Trading systems teach you to
            build guardrails against your own worst instincts.
          </p>
          <p>
            Cross-domain pattern recognition is itself a form of cognitive leverage. Insights from one field
            become tools in another.
          </p>
        </StickySection>

        {/* What This Lab Has Become */}
        <StickySection id="what-lab-became" title="What This Lab Has Become">
          <p>
            ID8Labs started as a workshop where I solved problems that other tools ignored.
            It's grown into something more structured—three lanes, each targeting different
            kinds of cognitive work to offload.
          </p>
          <div className="pl-6 border-l-4 border-id8-orange space-y-6 rounded-subtle">
            <div>
              <p className="font-bold text-id8-orange mb-1">For Creators</p>
              <p className="text-[var(--text-secondary)] text-sm mb-2">Offload: context management, continuity tracking</p>
              <p>
                ID8Composer handles the memory work so you can focus on the creative work. Knowledge bases,
                context persistence, writing assistance that actually remembers your story world across sessions.
              </p>
            </div>
            <div>
              <p className="font-bold text-[#A855F7] mb-1">For Builders</p>
              <p className="text-[var(--text-secondary)] text-sm mb-2">Offload: pattern recognition, data processing</p>
              <p>
                DeepStack handles market analysis so you can focus on decision-making. Pipeline CLI handles
                project state tracking so you can focus on the work itself. Infrastructure for people
                who build things.
              </p>
            </div>
            <div>
              <p className="font-bold text-[#06B6D4] mb-1">For Fun</p>
              <p className="text-[var(--text-secondary)] text-sm mb-2">Offload: nothing specific—this is play</p>
              <p>
                Experiments. The weird stuff that might become products or might just be interesting.
                Not everything needs a business case. Sometimes you build to learn what's possible.
              </p>
            </div>
          </div>
          <p className="text-[var(--text-secondary)] font-medium italic">
            Products get personality. The lab stays focused on the thesis.
          </p>
        </StickySection>

        {/* The Philosophy */}
        <StickySection id="philosophy" title="The Philosophy">
          <p className="text-2xl font-bold text-id8-orange mb-4">
            AI as an auxiliary layer of the brain.
          </p>
          <p className="text-xl mb-8">
            Handle the low-level repetitive work so there's bandwidth for high-level creative thinking.
          </p>
          <p>
            That's the core thesis. Not AI as replacement. Not AI as magic content machine. AI as cognitive
            extension—an additional layer of processing that handles the work your brain shouldn't waste
            cycles on.
          </p>
          <p>
            When you're building a story world, you shouldn't burn mental energy remembering what you
            decided three weeks ago about a character's backstory. When you're analyzing markets, you
            shouldn't spend hours on data formatting. When you're managing projects, you shouldn't
            track decay patterns manually.
          </p>
          <p>
            The brain has limited bandwidth. Every cycle spent on repetitive cognitive work is a cycle
            not available for the creative leaps, the strategic insights, the connections that actually matter.
          </p>
          <p className="font-bold">
            The tools I build are designed around this principle.
          </p>
          <div className="mt-8 space-y-6">
            <div>
              <p className="font-bold text-id8-orange mb-2">Offload context management.</p>
              <p>
                Let the system remember so you can focus on creating. That's what ID8Composer does.
              </p>
            </div>
            <div>
              <p className="font-bold text-id8-orange mb-2">Automate the pattern recognition.</p>
              <p>
                Let the system surface signals so you can focus on decisions. That's what DeepStack does.
              </p>
            </div>
            <div>
              <p className="font-bold text-id8-orange mb-2">Build systems, not features.</p>
              <p>
                A feature solves one problem once. A system solves categories of problems continuously.
                The goal is compounding leverage—tools that get more valuable as you use them.
              </p>
            </div>
          </div>
        </StickySection>

        {/* The Shift */}
        <StickySection id="shift" title="The Shift">
          <p>
            Television is changing. The industry I spent twenty years in is transforming in ways that
            make this the right moment to transition.
          </p>
          <p>
            But more importantly: tools like Claude Code have arrived. Not just AI that can write—AI
            that can be directed as a thinking extension. For the first time, someone with deep domain
            expertise can actually build professional software by focusing on what to build while the
            AI handles how to build it.
          </p>
          <p>
            That's the thesis in action. I'm using AI as cognitive leverage to build tools that provide
            cognitive leverage. It's recursive.
          </p>
          <p>
            I can take everything I learned in two decades of production—the problems nobody's solving,
            the workflows nobody's optimizing, the cognitive burdens nobody's offloading—and actually
            build solutions myself.
          </p>
          <p className="font-bold">
            That's what this lab is. The convergence of twenty years of knowing what's broken and the
            tools to finally fix it.
          </p>
          <p>
            ID8Composer proved the model works. DeepStack proved the lab can serve different domains.
            Pipeline CLI proved I can build the tools I need to build the tools I ship. The flywheel is spinning.
          </p>
        </StickySection>

        {/* What's Shipping */}
        <StickySection id="shipping" title="What's Shipping">
          <div className="py-8 px-6 border border-[var(--border)] rounded-soft bg-[var(--bg-secondary)]">
            <p>
              This lab is where I figure things out in public. Every product is a specific answer to:
              "What cognitive work can I offload?"
            </p>
            <div className="grid gap-4 my-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full" />
                <span className="font-bold">ID8Composer v1.8161</span>
                <span className="text-[var(--text-secondary)]">— Offloads context & continuity</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full" />
                <span className="font-bold">DeepStack v2.5.0</span>
                <span className="text-[var(--text-secondary)]">— Offloads pattern recognition</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full" />
                <span className="font-bold">Pipeline CLI</span>
                <span className="text-[var(--text-secondary)]">— Offloads project state tracking</span>
              </div>
            </div>
            <p className="font-bold">
              If you're here, you're early. Stick around. It gets interesting.
            </p>
          </div>
        </StickySection>

        {/* Signature */}
        <FadeInSection>
          <section className="mb-16 text-center">
            <p className="text-xl font-bold">Eddie Belaval</p>
            <p className="text-[var(--text-secondary)]">Miami, 2025</p>
          </section>
        </FadeInSection>

        {/* Contact */}
        <StickySection id="contact" title="Get in Touch">
          <div className="pt-8 space-y-4">
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
          </div>
        </StickySection>
      </article>
    </div>
  )
}
