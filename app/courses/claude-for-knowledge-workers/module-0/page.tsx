'use client'

import { motion } from 'framer-motion'
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
const DownloadIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
  </svg>
)

const PlayIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
)

const CheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const TerminalIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="4 17 10 11 4 5"/>
    <line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
)

const outcomes = [
  "Understand what Claude Code actually is (hint: not for developers)",
  "Install Claude Code on your computer in under 2 minutes",
  "Complete your first real delegation task",
  "Shift from 'assistance' thinking to 'delegation' thinking",
]

const quickStart = [
  { step: "1", command: "curl -fsSL https://claude.ai/install.sh | bash", description: "Install Claude Code" },
  { step: "2", command: "claude", description: "Start a session" },
  { step: "3", command: "cd ~/Downloads", description: "Navigate to a folder" },
  { step: "4", command: '"Organize this folder by file type"', description: "Your first delegation" },
]

export default function Module0Page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-zone-text">
        <div className="container">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <Link
                href="/courses/claude-for-knowledge-workers"
                className="inline-flex items-center gap-2 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors mb-6"
              >
                <ArrowLeftIcon />
                Back to Course
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-sm font-mono mb-6"
            >
              <span>Module 0</span>
              <span className="text-id8-orange/50">•</span>
              <span>Free</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              The Mental Model Shift
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed"
            >
              15 minutes to understand what Claude Code actually is — and complete your first real delegation.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a
                href="/courses/module-0/module-0-mental-model-shift.pdf"
                download="Module-0-Mental-Model-Shift.pdf"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                <DownloadIcon />
                Download Guide (PDF)
              </a>
              <button
                disabled
                className="btn bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-tertiary)] cursor-not-allowed inline-flex items-center gap-2"
              >
                <PlayIcon />
                Watch Video (Coming Soon)
              </button>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* What You'll Learn */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">What You'll Learn</h2>

            <div className="space-y-4">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]"
                >
                  <span className="text-id8-orange flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-[var(--text-primary)]">{outcome}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-id8-orange">
                <TerminalIcon />
              </span>
              <h2 className="text-2xl font-bold">Quick Start</h2>
            </div>

            <div className="space-y-4">
              {quickStart.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="w-8 h-8 rounded-full bg-id8-orange/10 border border-id8-orange/30 flex items-center justify-center text-id8-orange font-mono text-sm flex-shrink-0">
                    {item.step}
                  </span>
                  <div className="flex-1">
                    <code className="block px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg font-mono text-sm text-[var(--text-primary)] mb-2">
                      {item.command}
                    </code>
                    <p className="text-sm text-[var(--text-tertiary)]">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Key Insight */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">The Key Insight</h2>

            <div className="p-6 bg-id8-orange/5 border border-id8-orange/20 rounded-xl">
              <p className="text-xl text-[var(--text-primary)] mb-4 font-medium">
                The shift is from <span className="text-[var(--text-tertiary)]">assistance</span> to{' '}
                <span className="text-id8-orange">delegation</span>.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                  <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-2">Old Way</p>
                  <p className="text-[var(--text-secondary)]">"Help me write interview questions"</p>
                </div>
                <div className="p-4 bg-[var(--bg-primary)] rounded-lg border border-id8-orange/30">
                  <p className="text-xs font-mono uppercase tracking-wider text-id8-orange mb-2">New Way</p>
                  <p className="text-[var(--text-primary)]">"Generate 15 interview questions based on this guest's bio. Save to /Prep/[Name].md"</p>
                </div>
              </div>

              <p className="text-[var(--text-secondary)] mt-6">
                One gives you <strong>suggestions</strong>. The other gives you <strong>deliverables</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for More?</h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8">
              Module 0 is just the beginning. The full course covers file organization, writing workflows, research automation, and building your personal operating system.
            </p>

            <Link
              href="/courses/claude-for-knowledge-workers"
              className="btn btn-primary group inline-flex items-center gap-2"
            >
              View Full Course
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
