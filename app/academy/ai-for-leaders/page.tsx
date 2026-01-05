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
    title: "What AI Actually Does",
    duration: "45 min",
    description: "Cut through the hype. Understand what AI can and can't do — in terms a leader can use.",
    deliverable: "AI Capability Assessment",
    href: "/academy/ai-for-leaders/module-1",
  },
  {
    number: "2",
    title: "Finding the Opportunities",
    duration: "60 min",
    description: "Map where AI creates value in your specific context. Not generic advice — your situation.",
    deliverable: "Opportunity Map",
    href: "/academy/ai-for-leaders/module-2",
  },
  {
    number: "3",
    title: "The Build/Buy/Partner Decision",
    duration: "60 min",
    description: "When to build in-house, buy off-the-shelf, or partner with specialists. A framework that actually helps.",
    deliverable: "Decision framework",
    href: "/academy/ai-for-leaders/module-3",
  },
  {
    number: "4",
    title: "Assembling Your Team",
    duration: "45 min",
    description: "What roles and skills you need at each stage. Avoid the expensive mistakes.",
    deliverable: "Team structure plan",
    href: "/academy/ai-for-leaders/module-4",
  },
  {
    number: "5",
    title: "Evaluating AI Vendors",
    duration: "60 min",
    description: "There are 500+ AI tools. Here's how to choose without getting burned.",
    deliverable: "Vendor evaluation scorecard",
    href: "/academy/ai-for-leaders/module-5",
  },
  {
    number: "6",
    title: "Managing AI Risk",
    duration: "60 min",
    description: "What could go wrong? Privacy, bias, hallucination, dependency. How to manage each.",
    deliverable: "Risk register",
    href: "/academy/ai-for-leaders/module-6",
  },
  {
    number: "7",
    title: "Measuring AI ROI",
    duration: "45 min",
    description: "How do you know if AI is working? Metrics that actually matter for your business.",
    deliverable: "ROI framework",
    href: "/academy/ai-for-leaders/module-7",
  },
  {
    number: "8",
    title: "Leading the Change",
    duration: "60 min",
    description: "Your team is skeptical, scared, or over-hyped. How to bring everyone along.",
    deliverable: "Change management playbook",
    href: "/academy/ai-for-leaders/module-8",
  },
]

const audiences = [
  { title: "Founders", description: "Making build/buy/partner decisions for startups" },
  { title: "Executives", description: "Setting AI strategy for organizations" },
  { title: "Managers", description: "Evaluating how AI fits into team workflows" },
  { title: "Board Members", description: "Need to ask the right questions" },
  { title: "Consultants", description: "Advising clients on AI adoption" },
  { title: "Directors", description: "Leading digital transformation initiatives" },
]

export default function AIForLeadersPage() {
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
                Course 2 of 4 • AI Academy
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] font-bold tracking-tight mb-6"
            >
              AI for{' '}
              <span className="text-gradient-orange">Leaders</span>
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-2xl md:text-3xl text-[var(--text-secondary)] max-w-2xl mb-4 font-medium"
            >
              How do I make AI decisions for my team or organization?
            </m.p>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] max-w-2xl mb-10 leading-relaxed"
            >
              You don't need to become a technologist. You need to become a better questioner. Get the frameworks to evaluate, decide, and lead.
            </m.p>

            {/* CTA */}
            <m.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/academy/ai-for-leaders/module-1"
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
              Everyone's talking about AI.{' '}
              <span className="text-gradient-orange">Nobody's making sense.</span>
            </h2>
            <div className="space-y-4 text-lg text-[var(--text-secondary)] leading-relaxed">
              <p>
                Vendors promise transformation. Your team is experimenting without strategy. Your competitors claim they're "AI-first" (whatever that means).
              </p>
              <p>
                And you're supposed to make decisions about <strong className="text-[var(--text-primary)]">budgets, hires, and direction</strong> — without a technical background.
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                This course gives you the frameworks to decide with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Marcus */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="card">
              <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Guide
              </p>
              <h3 className="text-xl font-bold mb-4">Meet Marcus Williams</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Marcus is a partner at a 50-person management consulting firm. He's built a successful practice over 15 years, but he's watching the landscape shift.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                His competitors are talking about "AI-powered insights." His analysts spend 40% of their time on research and report writing. His clients are asking if his firm uses AI.
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                Marcus isn't technical. He's never written code. But he's a sharp strategic thinker who's built and led teams. He needs frameworks, not tutorials.
              </p>
              <p className="text-[var(--text-secondary)] mt-4 italic">
                His journey through this course mirrors yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Who This Is For
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              If you make AI decisions without implementing them
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
                className="flex items-start gap-3 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg"
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

      {/* Curriculum Section */}
      <section className="section-spacing bg-[var(--bg-secondary)]" id="curriculum">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Curriculum
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              8 modules. ~8 hours. Leadership frameworks.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Every module answers a version of the same question: "What should I do about AI — and how do I know if it's working?"
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
              href="/academy/ai-for-leaders/module-1"
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
              Decision tools, not theory
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "AI Capability Assessment — What AI can actually do for your org",
              "Opportunity Map — Where AI creates value in your context",
              "Build/Buy/Partner Framework — How to evaluate your options",
              "Team Structure Plan — What roles and skills you need",
              "Vendor Evaluation Scorecard — Choose among 500+ AI tools",
              "Risk Register — What could go wrong and how to manage it",
              "ROI Framework — How to measure if AI is working",
              "Change Management Playbook — How to bring your team along",
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
              Want Strategic Support?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Implement with expert guidance
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              This course teaches the frameworks. Our Sprint gives you 4 weeks of hands-on implementation with an AI strategist who's done this before.
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

      {/* Course Navigation */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Previous Course */}
              <Link
                href="/academy/ai-partner-mastery"
                className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl hover:border-id8-orange/30 transition-colors group"
              >
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                  ← Previous Course
                </p>
                <h3 className="text-lg font-bold group-hover:text-id8-orange transition-colors">AI Partner Mastery</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Learn to work WITH AI, not just use it.
                </p>
              </Link>

              {/* Next Course */}
              <Link
                href="/academy/private-ai"
                className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl hover:border-id8-orange/30 transition-colors group"
              >
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                  Next Course →
                </p>
                <h3 className="text-lg font-bold group-hover:text-id8-orange transition-colors">Private AI for Sensitive Work</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Use AI when privacy and compliance matter.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </FoundationGate>
  )
}
