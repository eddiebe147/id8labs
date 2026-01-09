'use client'

import { useState } from 'react'
import { m } from '@/components/motion'
import Link from 'next/link'
import CheckoutButton from '@/components/CheckoutButton'
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

const FolderIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
  </svg>
)

const MicIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
    <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/>
  </svg>
)

const SearchIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
)

const SettingsIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
)

const XIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="w-5 h-5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6"/>
  </svg>
)

// Data
const misconceptions = [
  { wrong: "It's for developers", right: "It's for anyone with files and information to process" },
  { wrong: "You need to write code", right: "You describe what you want in plain English" },
  { wrong: "It's just a better chatbot", right: "It's an agent that can actually DO the work" },
]

const modules = [
  {
    number: "0",
    title: "The Mental Model Shift",
    duration: "30 min",
    description: "Installation + your first delegation (Downloads cleanup). The mindset shift from chatbot to agent.",
    free: true,
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-0",
  },
  {
    number: "1",
    title: "Your First Delegation",
    duration: "45 min",
    description: "10 Quick Wins to build confidence. Low-risk, high-value delegations you can undo in 30 seconds.",
    free: false,
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-1",
  },
  {
    number: "2",
    title: "Working With Your Files",
    duration: "60 min",
    description: "Document processing, invoice organization, semantic search. Find anything by meaning.",
    free: false,
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-2",
  },
  {
    number: "3",
    title: "Writing With Claude",
    duration: "60 min",
    description: "Voice notes → drafts, editing workflows, finding and preserving your voice.",
    free: false,
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-3",
  },
  {
    number: "4",
    title: "Research & Analysis",
    duration: "60 min",
    description: "Web research, competitive analysis, synthesizing sources into actionable insights.",
    free: false,
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-4",
  },
  {
    number: "5",
    title: "Building Workflows",
    duration: "60 min",
    description: "Recurring tasks, reusable prompts, automation. Your personal operating system.",
    free: false,
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-5",
  },
  {
    number: "6",
    title: "Custom Commands",
    duration: "45 min",
    description: "Save your best prompts as reusable commands. Type one word, get consistent results every time.",
    free: false,
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-6",
    isNew: true,
  },
  {
    number: "7",
    title: "Connecting Your Tools",
    duration: "50 min",
    description: "Let Claude read your Notion, browse the web, access files. Claude becomes part of your workflow.",
    free: false,
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-7",
    isNew: true,
  },
  {
    number: "8",
    title: "Managing Long Sessions",
    duration: "40 min",
    description: "Keep Claude sharp during complex projects. Reset, rewind, and recover from messy contexts.",
    free: false,
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-8",
    isNew: true,
  },
  {
    number: "9",
    title: "Project Memory",
    duration: "45 min",
    description: "Make Claude remember your projects across sessions. Persistent context that survives restarts.",
    free: false,
    available: true,
    href: "/courses/claude-for-knowledge-workers/module-9",
    isNew: true,
  },
]

const audiences = [
  {
    icon: <MicIcon />,
    title: "Writers",
    description: "Voice memos to organized outlines to polished drafts. Research synthesis. Multi-platform content repurposing.",
  },
  {
    icon: <SearchIcon />,
    title: "Researchers",
    description: "Competitive analysis. Interview transcript synthesis. Pattern recognition across hundreds of documents.",
  },
  {
    icon: <FolderIcon />,
    title: "Operators",
    description: "File organization. Invoice processing. Recurring workflows. The operational grunt work that eats your day.",
  },
  {
    icon: <SettingsIcon />,
    title: "Producers",
    description: "Complex projects with lots of moving pieces, documents, and logistics. From chaos to structure.",
  },
]

const notFor = [
  "Developers (you have plenty of resources)",
  "Complete beginners who've never used AI",
  "People who want to build software",
]

const faqs = [
  {
    question: "Do I need programming experience?",
    answer: "No. This course is specifically designed for non-developers. You'll describe what you want in plain English, and Claude will do the technical work. If you can write an email, you can use Claude Code."
  },
  {
    question: "What if I get stuck?",
    answer: "Email support is included with the full course. Send your question to support@id8labs.io and we'll help you troubleshoot. Most students find the step-by-step video walkthroughs answer 95% of questions."
  },
  {
    question: "Is there a refund policy?",
    answer: "Yes. 30-day money-back guarantee, no questions asked. If the course isn't what you expected, just email within 30 days of purchase for a full refund."
  },
  {
    question: "How long do I have access?",
    answer: "Lifetime access. Buy once, access forever. You'll also get all future updates and new modules as they're released at no additional cost."
  },
  {
    question: "What's the difference from Claude's official tutorials?",
    answer: "Anthropic's tutorials are great—but they're written for developers. This course assumes zero coding background and focuses on real-world knowledge work: file processing, writing workflows, research synthesis, and recurring tasks. We speak your language, not code."
  }
]

export default function ClaudeForKnowledgeWorkersPage() {
  return (
    <FoundationGate>
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-zone-text">
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
              10-Module Course • ~7 Hours
            </m.p>

            <m.h1
              variants={fadeUp}
              className="text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] font-bold tracking-tight mb-6"
            >
              Claude Code for{' '}
              <span className="text-gradient-orange">Knowledge Workers</span>
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-2xl md:text-3xl text-[var(--text-secondary)] max-w-2xl mb-4 font-medium"
            >
              From Chatbot to Operating System
            </m.p>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] max-w-2xl mb-10 leading-relaxed"
            >
              Stop asking questions. Start delegating tasks. A structured course for writers, researchers, and operators who want to use Claude Code without writing code.
            </m.p>

            {/* CTA Buttons */}
            <m.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/courses/claude-for-knowledge-workers/module-0"
                className="btn btn-primary group inline-flex items-center justify-center gap-2"
              >
                Start Free Module
                <ArrowRightIcon />
              </Link>
              <a
                href="#pricing"
                className="btn btn-secondary group inline-flex items-center justify-center gap-2"
              >
                Get Full Course — $99
              </a>
            </m.div>
            <m.p variants={fadeUp} className="mt-4 text-sm text-[var(--text-tertiary)]">
              Module 0 is completely free. No credit card required.
            </m.p>

            {/* Cross-link to free fundamentals course */}
            <m.div variants={fadeUp} className="mt-8 pt-6 border-t border-[var(--border)]">
              <p className="text-sm text-[var(--text-secondary)]">
                New to AI conversations?{' '}
                <Link
                  href="/courses/ai-conversation-fundamentals"
                  className="text-green-400 hover:text-green-300 transition-colors inline-flex items-center gap-1"
                >
                  <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-green-500 text-white rounded mr-1">Free</span>
                  Start with AI Fundamentals
                  <ArrowRightIcon />
                </Link>
              </p>
            </m.div>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Split Tab Feature Callout */}
      <section className="py-6 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 border-b border-[var(--border)]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <p className="font-bold text-[var(--text-primary)]">
                  Pro Tip: Use Split Tab for Side-by-Side Learning
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Open Claude Code in one tab, this course in another. New Split Tab feature lets you work alongside the lessons in real-time.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full whitespace-nowrap">
              New Feature
            </span>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              The Naming Problem
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              "Claude Code" scares away the people{' '}
              <span className="text-gradient-orange">who need it most</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Most people hear "Code" and assume it's for developers. They're wrong. Here's what Claude Code actually is — and isn't:
            </p>
          </div>

          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-3xl mx-auto space-y-4"
          >
            {misconceptions.map((item, index) => (
              <m.div
                key={index}
                variants={fadeUp}
                className="grid md:grid-cols-2 gap-4"
              >
                <div className="flex items-center gap-3 px-5 py-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                  <span className="text-red-400 flex-shrink-0">
                    <XIcon />
                  </span>
                  <span className="text-[var(--text-secondary)] line-through decoration-red-400/50">
                    {item.wrong}
                  </span>
                </div>
                <div className="flex items-center gap-3 px-5 py-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                  <span className="text-green-400 flex-shrink-0">
                    <CheckIcon />
                  </span>
                  <span className="text-[var(--text-primary)]">
                    {item.right}
                  </span>
                </div>
              </m.div>
            ))}
          </m.div>

          <div className="max-w-3xl mx-auto mt-12 text-center">
            <p className="text-xl text-[var(--text-primary)] font-medium">
              The shift is from <span className="text-[var(--text-tertiary)]">assistance</span> to{' '}
              <span className="text-id8-orange">delegation</span>.
            </p>
            <p className="mt-4 text-[var(--text-secondary)]">
              "Help me write interview questions" → "Here are the cast files. Generate interview questions for each person based on their background. Save them to the prep folder."
            </p>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Who This Is For
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Not another developer tutorial
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              This course is specifically designed for knowledge workers who process information daily.
            </p>
          </div>

          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {audiences.map((audience, index) => (
              <m.div
                key={index}
                variants={fadeUp}
                className="card"
              >
                <span className="text-id8-orange mb-4 block">{audience.icon}</span>
                <h3 className="text-xl font-bold mb-2">{audience.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {audience.description}
                </p>
              </m.div>
            ))}
          </m.div>

          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm font-mono uppercase tracking-widest text-[var(--text-tertiary)] mb-4">
              Not for
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {notFor.map((item, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border)] rounded-full text-sm text-[var(--text-tertiary)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="section-spacing border-t border-[var(--border)]" id="curriculum">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Curriculum
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              10 modules. ~7 hours. Zero code required.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Each module builds on the last. By the end, you'll have a personal operating system that handles the work you used to do manually.
            </p>
          </div>

          <m.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-3xl mx-auto space-y-4"
          >
            {modules.map((module, index) => {
              const cardContent = (
                <>
                  <span className={`text-2xl font-mono font-bold ${module.free ? 'text-id8-orange' : 'text-[var(--text-tertiary)]'}`}>
                    {module.number}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold">{module.title}</h3>
                      {module.free && (
                        <span className="text-xs font-mono uppercase tracking-wider text-id8-orange bg-id8-orange/10 px-2 py-0.5 rounded">
                          Free
                        </span>
                      )}
                      {(module as typeof module & { isNew?: boolean }).isNew && (
                        <span className="text-xs font-mono uppercase tracking-wider text-green-400 bg-green-500/10 px-2 py-0.5 rounded animate-pulse">
                          New
                        </span>
                      )}
                      {!module.available && (
                        <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] bg-[var(--bg-primary)] px-2 py-0.5 rounded">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm">{module.description}</p>
                  </div>
                  <span className="text-sm font-mono text-[var(--text-tertiary)] whitespace-nowrap">
                    {module.duration}
                  </span>
                </>
              )

              const cardClass = `flex items-start gap-4 p-5 rounded-xl border transition-colors ${
                module.free
                  ? 'bg-id8-orange/5 border-id8-orange/30 hover:border-id8-orange/50'
                  : module.available
                  ? 'bg-[var(--bg-secondary)] border-[var(--border)] hover:border-id8-orange/30'
                  : 'bg-[var(--bg-secondary)] border-[var(--border)] opacity-60'
              }`

              return (
                <m.div key={index} variants={fadeUp}>
                  {module.available ? (
                    <Link href={module.href} className={cardClass}>
                      {cardContent}
                    </Link>
                  ) : (
                    <div className={cardClass}>
                      {cardContent}
                    </div>
                  )}
                </m.div>
              )
            })}
          </m.div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Instructor
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Built by someone who uses this daily
              </h2>
            </div>

            <div className="card">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-id8-orange/20 to-id8-orange/5 flex items-center justify-center text-2xl font-bold text-id8-orange flex-shrink-0">
                  EB
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Eddie Belaval</h3>
                  <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
                    I run two businesses — one produces reality television (90 Day Fiancé, Teen Mom), the other builds AI tools for developers. Neither requires me to write code daily. But Claude Code has become the most important tool in both.
                  </p>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    I use Claude Code to generate interview questions, grind through logistics, run web searches with Perplexity and Firecrawl, manage my LLC with AI agents, and build media pipelines. What took days now takes hours.
                  </p>
                  <div className="mt-4 pt-4 border-t border-[var(--border)]">
                    <Link
                      href="/essays/claude-code-isnt-for-coders"
                      className="inline-flex items-center gap-2 text-id8-orange hover:underline group text-sm"
                    >
                      Read the full story
                      <ArrowRightIcon />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-spacing-lg relative" id="pricing">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] aspect-square bg-[radial-gradient(circle,var(--id8-orange-light)_0%,transparent_70%)] opacity-30 pointer-events-none" />

        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Pricing
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Stop asking.{' '}
              <span className="text-gradient-orange">Start delegating.</span>
            </h2>
          </div>

          <div className="max-w-lg mx-auto">
            {/* Full Course Card */}
            <div className="card bg-[var(--bg-secondary)] border-2 border-id8-orange/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-id8-orange text-zone-text text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                Full Access
              </div>
              <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-br-lg">
                Save $98
              </div>

              <div className="text-center pt-8">
                <h3 className="text-2xl font-bold mb-2">Complete Course</h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  All 10 modules + lifetime updates
                </p>
                <p className="text-sm text-green-400 font-mono uppercase tracking-wider mb-4">
                  Founder's Launch Special
                </p>

                <div className="mb-6">
                  <span className="text-2xl text-[var(--text-tertiary)] line-through mr-2">$197</span>
                  <span className="text-5xl font-bold text-id8-orange">$99</span>
                  <span className="text-[var(--text-tertiary)] ml-2">one-time</span>
                </div>

                <ul className="text-left space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-id8-orange flex-shrink-0 mt-0.5"><CheckIcon /></span>
                    <span>All 10 modules (~7 hours of content)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-id8-orange flex-shrink-0 mt-0.5"><CheckIcon /></span>
                    <span>Video, podcast, PDF, and mindmap for each module</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-id8-orange flex-shrink-0 mt-0.5"><CheckIcon /></span>
                    <span>Lifetime access + future updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-id8-orange flex-shrink-0 mt-0.5"><CheckIcon /></span>
                    <span>Real-world delegation templates</span>
                  </li>
                </ul>

                <CheckoutButton
                  productId="claude-for-knowledge-workers"
                  className="text-lg py-4"
                >
                  Get Full Course
                </CheckoutButton>
              </div>
            </div>

            {/* Free Module CTA */}
            <div className="text-center mt-8">
              <p className="text-[var(--text-secondary)] mb-4">
                Not ready to commit? Try Module 0 for free.
              </p>
              <Link
                href="/courses/claude-for-knowledge-workers/module-0"
                className="text-id8-orange hover:underline inline-flex items-center gap-2 group"
              >
                Start Free Module
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Common questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>
    </div>
    </FoundationGate>
  )
}

// FAQ Accordion Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-[var(--border)] rounded-lg overflow-hidden bg-[var(--bg-primary)]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--bg-secondary)] transition-colors"
      >
        <span className="font-bold text-lg pr-4">{question}</span>
        <span className={`text-id8-orange flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDownIcon />
        </span>
      </button>

      <m.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 pt-0 text-[var(--text-secondary)] leading-relaxed">
          {answer}
        </div>
      </m.div>
    </m.div>
  )
}
