'use client'

import { m } from '@/components/motion'
import Link from 'next/link'
import { FoundationGate } from '@/components/progress'

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

// Icons
const CheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
)

// Data
const modules = [
  {
    number: "1",
    title: "Your First Real Conversation",
    duration: "45 min",
    description: "The 4D Framework — a repeatable approach that turns every AI interaction from hit-or-miss to predictable.",
    deliverable: "Proposal draft",
    href: "/academy/ai-partner-mastery/module-1",
  },
  {
    number: "2",
    title: "The Art of Context",
    duration: "60 min",
    description: "Why AI doesn't know you yet — and how to fix that permanently with a personal context document.",
    deliverable: "Personal context document",
    href: "/academy/ai-partner-mastery/module-2",
  },
  {
    number: "3",
    title: "Thinking Out Loud",
    duration: "60 min",
    description: "Use AI as a thinking partner, not just a writing tool. Structure your reasoning through conversation.",
    deliverable: "Decision analysis",
    href: "/academy/ai-partner-mastery/module-3",
  },
  {
    number: "4",
    title: "Your Second Brain",
    duration: "60 min",
    description: "Turn scattered notes, highlights, and ideas into structured insights you can actually use.",
    deliverable: "Knowledge synthesis workflow",
    href: "/academy/ai-partner-mastery/module-4",
  },
  {
    number: "5",
    title: "The Editing Partner",
    duration: "45 min",
    description: "Get AI to improve your writing without stealing your voice. The revision dance that preserves you.",
    deliverable: "Voice-preserving editing prompt",
    href: "/academy/ai-partner-mastery/module-5",
  },
  {
    number: "6",
    title: "Research Mode",
    duration: "60 min",
    description: "Go from 'tell me about X' to deep, nuanced understanding. Research that actually teaches you.",
    deliverable: "Research brief",
    href: "/academy/ai-partner-mastery/module-6",
  },
  {
    number: "7",
    title: "The Strategy Session",
    duration: "60 min",
    description: "Think through real problems with an AI that challenges your assumptions and finds blind spots.",
    deliverable: "Strategy document",
    href: "/academy/ai-partner-mastery/module-7",
  },
  {
    number: "8",
    title: "Building Your System",
    duration: "60 min",
    description: "Combine everything into a personal AI workflow playbook you can rely on day after day.",
    deliverable: "Personal AI workflow playbook",
    href: "/academy/ai-partner-mastery/module-8",
  },
]

const audiences = [
  { title: "Writers", description: "Want a thought partner for drafts, edits, and ideas" },
  { title: "Consultants", description: "Need to synthesize information faster" },
  { title: "Marketers", description: "Create content, campaigns, and strategy" },
  { title: "Coaches", description: "Prepare materials and session notes" },
  { title: "Entrepreneurs", description: "Wear 10 hats and need leverage on all of them" },
  { title: "Educators", description: "Develop curriculum and learning materials" },
]

export default function AIPartnerMasteryPage() {
  return (
    <FoundationGate>
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-zone-text">
        <div className="container">
          <m.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl"
          >
            {/* Breadcrumb */}
            <m.div variants={fadeUp} className="mb-8">
              <Link
                href="/academy"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to Academy
              </Link>
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-green-500 text-white rounded">
                Free Course
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                Course 1 of 4 • AI Academy
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] font-bold tracking-tight mb-6"
            >
              AI Partner{' '}
              <span className="text-gradient-orange">Mastery</span>
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-2xl md:text-3xl text-[var(--text-secondary)] max-w-2xl mb-4 font-medium"
            >
              How do I work WITH AI, not just use it?
            </m.p>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] max-w-2xl mb-10 leading-relaxed"
            >
              Stop getting inconsistent results. Build a repeatable system with the 4D Framework — the foundation everything else builds on.
            </m.p>

            {/* CTA */}
            <m.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/academy/ai-partner-mastery/module-1"
                className="btn btn-primary group inline-flex items-center justify-center gap-2"
              >
                Start Module 1
                <ArrowRightIcon />
              </Link>
              <a
                href="#curriculum"
                className="btn btn-secondary group inline-flex items-center justify-center gap-2"
              >
                View Curriculum
              </a>
            </m.div>

            <m.p variants={fadeUp} className="mt-4 text-sm text-[var(--text-tertiary)]">
              8 modules • ~8 hours • Completely free
            </m.p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* The Problem Section */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              The Problem
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              You've tried AI. It's{' '}
              <span className="text-gradient-orange">inconsistent</span>.
            </h2>
            <div className="space-y-4 text-lg text-[var(--text-secondary)] leading-relaxed">
              <p>
                Sometimes magic, sometimes garbage. You don't have a <strong className="text-[var(--text-primary)]">system</strong>. Every conversation starts from scratch.
              </p>
              <p>
                You're not really sure what you're doing differently on the good days vs. the bad days.
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                This course changes that.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Who This Is For
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              If you think for a living
            </h2>
          </div>

          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {audiences.map((audience, index) => (
              <m.div
                key={index}
                variants={fadeUp}
                className="flex items-start gap-3 p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg"
              >
                <span className="text-id8-orange flex-shrink-0 mt-0.5">
                  <CheckIcon />
                </span>
                <div>
                  <p className="font-bold text-[var(--text-primary)]">{audience.title}</p>
                  <p className="text-sm text-[var(--text-secondary)]">{audience.description}</p>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* The 4D Framework */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              The Core Framework
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              The 4D Framework
            </h2>
            <p className="text-lg text-[var(--text-secondary)]">
              A repeatable approach for any AI task. Learn it in Module 1, apply it everywhere else.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { step: "Define", description: "What's the real task? Not 'write something' — the actual goal." },
              { step: "Describe", description: "What context does AI need to help?" },
              { step: "Direct", description: "What specifically should AI do?" },
              { step: "Develop", description: "How do we iterate together?" },
            ].map((item, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-center"
              >
                <span className="text-4xl font-bold text-id8-orange mb-2 block">
                  {item.step.charAt(0)}
                </span>
                <h3 className="text-lg font-bold mb-2">{item.step}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="section-spacing bg-[var(--bg-secondary)]" id="curriculum">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Curriculum
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              8 modules. ~8 hours. Real deliverables.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Each module builds on the last. By the end, you'll have a personal AI workflow playbook you can rely on.
            </p>
          </div>

          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-3xl mx-auto space-y-4"
          >
            {modules.map((module, index) => (
              <m.div key={index} variants={fadeUp}>
                <Link
                  href={module.href}
                  className="flex items-start gap-4 p-5 rounded-xl border bg-[var(--bg-primary)] border-[var(--border)] hover:border-id8-orange/30 transition-colors group"
                >
                  <span className="text-2xl font-mono font-bold text-id8-orange">
                    {module.number}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold group-hover:text-id8-orange transition-colors">
                        {module.title}
                      </h3>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm mb-2">{module.description}</p>
                    <p className="text-xs font-mono text-id8-orange">
                      You'll build: {module.deliverable}
                    </p>
                  </div>
                  <span className="text-sm font-mono text-[var(--text-tertiary)] whitespace-nowrap">
                    {module.duration}
                  </span>
                </Link>
              </m.div>
            ))}
          </m.div>

          {/* Start CTA */}
          <div className="text-center mt-12">
            <Link
              href="/academy/ai-partner-mastery/module-1"
              className="btn btn-primary group inline-flex items-center justify-center gap-2"
            >
              Start Module 1
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* What You'll Build */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              What You'll Build
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Real deliverables, not just knowledge
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "The 4D Framework — A repeatable approach for any AI task",
              "Personal Context Document — So AI knows you and your work",
              "Decision Analysis — Using AI to think through real choices",
              "Knowledge Synthesis Workflow — Turning scattered notes into insights",
              "Voice-Preserving Editing Prompt — AI that improves without stealing your voice",
              "Research Brief — Deep understanding of a topic, fast",
              "Strategy Document — AI-assisted thinking on real problems",
              "Your AI Workflow Playbook — A personal system you can rely on",
            ].map((item, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg"
              >
                <span className="text-id8-orange flex-shrink-0 mt-0.5">
                  <CheckIcon />
                </span>
                <span className="text-[var(--text-primary)]">{item}</span>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service CTA */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Want Hands-On Help?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Learn faster with personalized guidance
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              This course teaches the frameworks. Our Workshop gives you 2 hours of live, personalized implementation for your specific work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="btn btn-primary group inline-flex items-center justify-center gap-2"
              >
                Explore Services
                <ArrowRightIcon />
              </Link>
              <Link
                href="/academy"
                className="btn btn-secondary group inline-flex items-center justify-center gap-2"
              >
                Browse All Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Next Course Teaser */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                  Up Next in AI Academy
                </p>
                <h3 className="text-xl font-bold mb-1">Course 2: AI for Leaders</h3>
                <p className="text-[var(--text-secondary)]">
                  Make informed AI decisions for your team or organization.
                </p>
              </div>
              <Link
                href="/academy/ai-for-leaders"
                className="btn btn-secondary group inline-flex items-center gap-2 whitespace-nowrap"
              >
                Preview Course
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </FoundationGate>
  )
}
