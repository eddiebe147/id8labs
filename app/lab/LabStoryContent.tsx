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
            AI showed up and everyone treated it like a magic content generator. Write me a script.
            Make me a story. Give me ten ideas. Make no mistakes.
          </p>
          <p>
            But nobody was building tools for how creative people actually work.
          </p>
          <p>
            We don't generate and move on. We iterate. We build context over weeks and months. We refine.
            We return to old ideas with new understanding. We need our tools to remember what we've already figured out.
          </p>
          <p>
            Every AI session started the same way: re-uploading documents, re-explaining characters,
            rebuilding context from scratch. By the third revision, the AI had forgotten half the story world.
          </p>
          <p className="text-2xl font-bold text-id8-orange">
            Context rot.
          </p>
          <p>
            It was killing momentum and wasting creative energy on repetition instead of development.
          </p>
          <p>
            So I built ID8Composer to solve it. That was the first product. It wasn't the last.
          </p>
        </StickySection>

        {/* How I Build */}
        <StickySection id="how-i-build" title="How I Build">
          <p>
            I don't build from whiteboards. I build from the field.
          </p>
          <p>
            Every feature in every tool exists because I personally hit a wall and needed a solution right then.
            Battle-tested in real production environments. Refined through actual creative work, not focus groups.
          </p>
          <p className="font-bold">
            That's the ID8Labs difference.
          </p>
          <p>
            I see patterns across domains that other people miss. Filmmaking and mycology have more in common
            than you'd think—both are about understanding how systems grow, how networks form, how small changes
            cascade. Wildlife biology teaches you to observe without interfering. Trading systems teach you to
            build guardrails against your own worst instincts.
          </p>
          <p>
            The best tools come from recognizing those connections.
          </p>
        </StickySection>

        {/* What This Lab Has Become */}
        <StickySection id="what-lab-became" title="What This Lab Has Become">
          <p>
            ID8Labs started as a workshop where I solved problems that tools ignored.
            It's grown into something more structured.
          </p>
          <p>
            Now there are three lanes:
          </p>
          <div className="pl-6 border-l-4 border-id8-orange space-y-4 rounded-subtle">
            <p>
              <span className="font-bold text-id8-orange">For Creators</span> — Tools that treat AI as a creative partner
              with memory. ID8Composer is the flagship: context management, knowledge bases, writing assistance
              that actually remembers your story world.
            </p>
            <p>
              <span className="font-bold text-[#A855F7]">For Builders</span> — Developer infrastructure and research tools.
              DeepStack for trading and predictive market research. Pipeline CLI for visual project management.
              The tools I build to build everything else.
            </p>
            <p>
              <span className="font-bold text-[#06B6D4]">For Fun</span> — Experiments. The weird stuff that might become
              products or might just be interesting. Because not everything needs a business case to be worth building.
            </p>
          </div>
          <p className="text-[var(--text-secondary)] font-medium italic">
            Products get personality. The lab stays focused.
          </p>
        </StickySection>

        {/* The Philosophy */}
        <StickySection id="philosophy" title="The Philosophy">
          <p className="text-2xl font-bold text-id8-orange mb-8">
            Tools for creators. Infrastructure for builders.
          </p>
          <div>
            <p className="font-bold text-id8-orange mb-2">AI should augment thinking, not replace it.</p>
            <p>
              These tools treat AI as a creative partner with functional memory—not a black box that
              forgets everything between sessions.
            </p>
          </div>
          <div>
            <p className="font-bold text-id8-orange mb-2">Build comprehensive systems, not isolated features.</p>
            <p>
              A feature solves one problem. A system solves a category of problems. I'm interested in systems.
            </p>
          </div>
          <div>
            <p className="font-bold text-id8-orange mb-2">Learn by building, not by theorizing.</p>
            <p>
              I'm not interested in the hypothetical best way to do something. I'm interested in what
              actually works when you're under deadline pressure with real stakes.
            </p>
          </div>
          <div>
            <p className="font-bold text-id8-orange mb-2">See the connections other people miss.</p>
            <p>
              Multidisciplinary thinking isn't a nice-to-have. It's the entire point. The innovations
              happen at the intersections.
            </p>
          </div>
        </StickySection>

        {/* The Shift */}
        <StickySection id="shift" title="The Shift">
          <p>
            Television is changing. The industry I spent twenty years in is transforming in ways that
            make this the right moment to transition.
          </p>
          <p>
            But more importantly: tools like Claude Code have arrived. For the first time, someone with
            deep domain expertise can actually build professional software without needing to become a
            full-time engineer first.
          </p>
          <p>
            I can take everything I learned in two decades of production—the problems nobody's solving,
            the workflows nobody's optimizing, the tools that should exist but don't—and actually build them myself.
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
              This lab is where I figure things out in public. The products that ship are the successful
              experiments. The ones that don't ship are the lessons learned.
            </p>
            <div className="grid gap-4 my-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full" />
                <span className="font-bold">ID8Composer v1.8161</span>
                <span className="text-[var(--text-secondary)]">— AI writing with memory</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full" />
                <span className="font-bold">DeepStack v2.5.0</span>
                <span className="text-[var(--text-secondary)]">— Trading & predictive market research</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full" />
                <span className="font-bold">Pipeline CLI</span>
                <span className="text-[var(--text-secondary)]">— Visual project dashboard</span>
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
