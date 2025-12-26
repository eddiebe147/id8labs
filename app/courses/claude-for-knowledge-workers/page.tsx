'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

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
    duration: "15 min",
    description: "Forget 'Code' — think 'Local Agent.' The 3 superpowers and your first delegation.",
    free: true,
  },
  {
    number: "1",
    title: "Your First Delegation",
    duration: "45 min",
    description: "File organization tasks that build confidence. Low-risk, high-value wins.",
    free: false,
  },
  {
    number: "2",
    title: "Working With Your Files",
    duration: "60 min",
    description: "Document processing, invoice organization, finding things across your computer.",
    free: false,
  },
  {
    number: "3",
    title: "The Writer's Workflow",
    duration: "60 min",
    description: "Voice notes → organized content → polished drafts in your voice.",
    free: false,
  },
  {
    number: "4",
    title: "Research & Analysis",
    duration: "60 min",
    description: "Competitive research, customer call synthesis, data analysis without code.",
    free: false,
  },
  {
    number: "5",
    title: "Personal Operations System",
    duration: "60 min",
    description: "CLAUDE.md, recurring workflows, email automation, building your second brain.",
    free: false,
  },
  {
    number: "6",
    title: "Power User Patterns",
    duration: "45 min",
    description: "MCP servers, long-running tasks, multi-step projects, troubleshooting.",
    free: false,
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

export default function ClaudeForKnowledgeWorkersPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'claude-for-knowledge-workers-waitlist',
          metadata: { course: 'claude-for-knowledge-workers' }
        }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-zone-text">
        <div className="container">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-6"
            >
              Coming Soon
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] font-bold tracking-tight mb-6"
            >
              Claude Code for{' '}
              <span className="text-gradient-orange">Knowledge Workers</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-2xl md:text-3xl text-[var(--text-secondary)] max-w-2xl mb-4 font-medium"
            >
              From Chatbot to Operating System
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] max-w-2xl mb-10 leading-relaxed"
            >
              Stop asking questions. Start delegating tasks. A structured course for writers, researchers, and operators who want to use Claude Code without writing code.
            </motion.p>

            {/* Waitlist Form */}
            <motion.div variants={fadeUp}>
              {status === 'success' ? (
                <div className="inline-flex items-center gap-3 px-6 py-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <CheckIcon />
                  <span className="text-green-400">You're on the waitlist! Check your email for next steps.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-id8-orange transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn btn-primary group inline-flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                    <ArrowRightIcon />
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="mt-3 text-red-400 text-sm">Something went wrong. Please try again.</p>
              )}
              <p className="mt-4 text-sm text-[var(--text-tertiary)]">
                Get early access + Module 0 free when we launch.
              </p>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
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

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-3xl mx-auto space-y-4"
          >
            {misconceptions.map((item, index) => (
              <motion.div
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
              </motion.div>
            ))}
          </motion.div>

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

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {audiences.map((audience, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="card"
              >
                <span className="text-id8-orange mb-4 block">{audience.icon}</span>
                <h3 className="text-xl font-bold mb-2">{audience.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  {audience.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

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
              6 modules. Zero code required.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Each module builds on the last. By the end, you'll have a personal operating system that handles the work you used to do manually.
            </p>
          </div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-3xl mx-auto space-y-4"
          >
            {modules.map((module, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className={`flex items-start gap-4 p-5 rounded-xl border transition-colors ${
                  module.free
                    ? 'bg-id8-orange/5 border-id8-orange/30'
                    : 'bg-[var(--bg-secondary)] border-[var(--border)] hover:border-[var(--border-light)]'
                }`}
              >
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
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm">{module.description}</p>
                </div>
                <span className="text-sm font-mono text-[var(--text-tertiary)] whitespace-nowrap">
                  {module.duration}
                </span>
              </motion.div>
            ))}
          </motion.div>
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

      {/* CTA Section */}
      <section className="section-spacing-lg relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,var(--id8-orange-light)_0%,transparent_70%)] opacity-30 pointer-events-none" />

        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Stop asking.{' '}
              <span className="text-gradient-orange">Start delegating.</span>
            </h2>
            <p className="text-xl text-[var(--text-secondary)] mb-10">
              Join the waitlist for early access and get Module 0 free when we launch.
            </p>

            {/* Waitlist Form (Repeated) */}
            {status === 'success' ? (
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <CheckIcon />
                <span className="text-green-400">You're on the waitlist!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-id8-orange transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn btn-primary group inline-flex items-center justify-center gap-2 whitespace-nowrap text-lg px-8 py-4"
                >
                  {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
                  <ArrowRightIcon />
                </button>
              </form>
            )}

            <p className="mt-6 text-sm font-mono text-[var(--text-tertiary)]">
              No spam. Just updates about the course launch.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
