'use client'

import { m } from '@/components/motion'
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

const LightbulbIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2z"/>
  </svg>
)

const LayersIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
)

export default function Module4Page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-zone-text">
        <div className="container">
          <m.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-3xl"
          >
            <m.div variants={fadeUp}>
              <Link
                href="/courses/ai-conversation-fundamentals"
                className="inline-flex items-center gap-2 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors mb-6"
              >
                <ArrowLeftIcon />
                Back to Course
              </Link>
            </m.div>

            <m.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-sm font-mono mb-6"
            >
              <span>Module 4</span>
              <span className="text-id8-orange/50">•</span>
              <span>~10 min</span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              The Attention Budget
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed"
            >
              Why more context often makes things worse. How to feed information strategically.
            </m.p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* The Concept */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <LayersIcon />
              </span>
              <h2 className="text-2xl font-bold">The Concept</h2>
            </div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="prose prose-lg"
            >
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                AI has a limited context window — think of it as working memory. It can only "see" so much at once.
              </p>

              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                Here's the counterintuitive part: <strong className="text-[var(--text-primary)]">more isn't always better</strong>. More context often makes output worse because attention gets diluted.
              </p>

              <div className="p-6 bg-id8-orange/5 border border-id8-orange/20 rounded-xl">
                <p className="text-lg font-medium text-[var(--text-primary)] mb-2">The Rule:</p>
                <p className="text-[var(--text-primary)]">
                  Give the AI exactly what it needs to do the job. No more, no less.
                </p>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* The Desk Analogy */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">The Desk Analogy</h2>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl"
              >
                <div className="mb-3">
                  <span className="text-2xl">🗑️</span>
                </div>
                <h3 className="font-bold text-[var(--text-primary)] mb-2">Cluttered Desk</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  Important things get buried under context that doesn't matter for the current task.
                </p>
                <p className="text-sm text-[var(--text-primary)] font-mono bg-[var(--bg-secondary)] p-2 rounded">
                  Result: Unfocused, generic output
                </p>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="p-5 bg-[var(--bg-primary)] border border-id8-orange/30 rounded-xl"
              >
                <div className="mb-3">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-bold text-[var(--text-primary)] mb-2">Clean Desk</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  The AI sees exactly what matters. Work gets done efficiently and accurately.
                </p>
                <p className="text-sm text-[var(--text-primary)] font-mono bg-[var(--bg-secondary)] p-2 rounded">
                  Result: Focused, precise output
                </p>
              </m.div>
            </div>

            <p className="text-[var(--text-secondary)] text-sm">
              When you dump everything into the conversation hoping the AI will "figure it out," you're creating a cluttered desk. It has to sift through noise to find the signal.
            </p>
          </div>
        </div>
      </section>

      {/* Practical Tips */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <LightbulbIcon />
              </span>
              <h2 className="text-2xl font-bold">Practical Tips</h2>
            </div>

            <div className="space-y-4">
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg"
              >
                <h3 className="font-bold text-[var(--text-primary)] mb-2">1. Front-load what matters</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  Put the most important information first. The AI pays more attention to what comes early.
                </p>
                <div className="bg-[var(--bg-primary)] p-3 rounded text-sm">
                  <p className="text-[var(--text-tertiary)] mb-1">Bad:</p>
                  <p className="text-[var(--text-primary)] mb-3 italic">
                    "Here's my entire project history... oh and I need a subject line for this email."
                  </p>
                  <p className="text-[var(--text-tertiary)] mb-1">Good:</p>
                  <p className="text-[var(--text-primary)] italic">
                    "Write a subject line for this sales follow-up email. Context: meeting yesterday, discussed pricing, they seemed interested."
                  </p>
                </div>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg"
              >
                <h3 className="font-bold text-[var(--text-primary)] mb-2">2. Don't dump everything</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  More pages doesn't mean better output. Give context that's relevant to THIS task.
                </p>
                <div className="bg-[var(--bg-primary)] p-3 rounded text-sm">
                  <p className="text-[var(--text-tertiary)] mb-1">Ask yourself:</p>
                  <p className="text-[var(--text-primary)] italic">
                    "If I were delegating this to a human, what would they actually need to know?"
                  </p>
                </div>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg"
              >
                <h3 className="font-bold text-[var(--text-primary)] mb-2">3. Long conversations drift</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  After 10-15 back-and-forth messages, the AI starts losing track of what you're actually trying to do.
                </p>
                <div className="bg-[var(--bg-primary)] p-3 rounded text-sm">
                  <p className="text-[var(--text-tertiary)] mb-1">Solution:</p>
                  <p className="text-[var(--text-primary)] italic">
                    Start a new conversation and restate what you need with fresh context.
                  </p>
                </div>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg"
              >
                <h3 className="font-bold text-[var(--text-primary)] mb-2">4. Restating helps refocus</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  If output quality drops mid-conversation, summarize what you need again.
                </p>
                <div className="bg-[var(--bg-primary)] p-3 rounded text-sm">
                  <p className="text-[var(--text-primary)] italic">
                    "Let me refocus: I need three subject line options for a cold outreach email to CTOs. Keep them under 50 characters."
                  </p>
                </div>
              </m.div>
            </div>
          </div>
        </div>
      </section>

      {/* The Right Altitude */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Finding the Right Altitude</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              There's a sweet spot between too specific and too vague. Here's how to find it:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border border-[var(--border)] rounded-lg overflow-hidden">
                <thead className="bg-[var(--bg-primary)]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-bold text-[var(--text-primary)]">Too Specific</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-id8-orange">Just Right</th>
                    <th className="px-4 py-3 text-left text-sm font-bold text-[var(--text-primary)]">Too Vague</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[var(--border)]">
                    <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">
                      Micromanaging every detail, leaving no room for the AI to think
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--text-primary)] bg-id8-orange/5">
                      Clear intent with room to execute
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">
                      "Help me with this"
                    </td>
                  </tr>
                  <tr className="border-t border-[var(--border)]">
                    <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">
                      Brittle — breaks if anything changes
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--text-primary)] bg-id8-orange/5">
                      Flexible, consistent results
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">
                      Inconsistent results every time
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-id8-orange/5 border border-id8-orange/20 rounded-lg">
              <p className="text-sm font-medium text-[var(--text-primary)] mb-2">Example:</p>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-[var(--text-tertiary)] mb-1">Too specific:</p>
                  <p className="text-[var(--text-primary)] italic">
                    "Use exactly 47 words. Start with 'The'. Use the word 'innovative' in sentence 3..."
                  </p>
                </div>
                <div>
                  <p className="text-id8-orange mb-1">Just right:</p>
                  <p className="text-[var(--text-primary)] italic">
                    "Write a 50-word product description. Professional tone. Focus on time savings."
                  </p>
                </div>
                <div>
                  <p className="text-[var(--text-tertiary)] mb-1">Too vague:</p>
                  <p className="text-[var(--text-primary)] italic">
                    "Make it sound good"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Try This */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="p-6 bg-id8-orange/5 border-2 border-id8-orange/30 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-id8-orange/20 border border-id8-orange/40 rounded text-id8-orange text-xs font-mono uppercase tracking-wider">
                  Try This
                </span>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">The Attention Budget Test</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Take a prompt you've used recently. Try cutting it in half. Compare the results.
              </p>
              <div className="bg-[var(--bg-primary)] p-4 rounded-lg">
                <p className="text-sm text-[var(--text-primary)] mb-3">You'll often find:</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-id8-orange mt-0.5">•</span>
                    <span>The shorter version is clearer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-id8-orange mt-0.5">•</span>
                    <span>The AI focuses on what actually matters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-id8-orange mt-0.5">•</span>
                    <span>Output quality goes up, not down</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaway */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Key Takeaway</h2>
            <div className="p-5 bg-[var(--bg-primary)] border border-id8-orange/30 rounded-xl">
              <p className="text-lg text-[var(--text-primary)] leading-relaxed">
                The AI's attention is finite. <strong>More context ≠ better output.</strong> Give it exactly what it needs to do the job. No more, no less. Front-load what matters. Trim the rest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Link
                href="/courses/ai-conversation-fundamentals/module-3"
                className="btn bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeftIcon />
                Previous: The Iteration Loop
              </Link>
              <Link
                href="/courses/ai-conversation-fundamentals/module-5"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Putting It Together
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
