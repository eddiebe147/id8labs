'use client'

import { motion } from '@/components/motion'
import Link from 'next/link'
import CourseProgress from '@/components/CourseProgress'

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
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6M10 22h4M15 8a3 3 0 11-6 0 3 3 0 016 0zM12 3v1M18.36 5.64l-.7.7M21 12h-1M3 12H2m3.64-6.36l.7.7"/>
  </svg>
)

export default function Module1Page() {
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
                href="/courses/ai-conversation-fundamentals"
                className="inline-flex items-center gap-2 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors mb-6"
              >
                <ArrowLeftIcon />
                Back to Course
              </Link>
            </motion.div>

            <motion.div variants={fadeUp}>
              <CourseProgress
                currentModule={1}
                totalModules={6}
                courseTitle="AI Conversation Fundamentals"
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-sm font-mono mb-6"
            >
              <span>Module 1</span>
              <span className="text-id8-orange/50">•</span>
              <span>~10 minutes</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              The Mental Model Shift
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] leading-relaxed"
            >
              Why AI is a collaborator, not a search engine — and what that means for how you use it.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* The Big Idea */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-3xl font-bold mb-6">The Big Idea</h2>

              <p className="text-lg text-[var(--text-primary)] mb-6 leading-relaxed">
                Most people treat AI like a search engine: <span className="font-mono text-id8-orange">Type query → Get result → If result is bad, try different words</span>. This is why they get inconsistent results.
              </p>

              <p className="text-lg text-[var(--text-primary)] mb-8 leading-relaxed">
                <strong>AI isn't a search engine. It's a collaborator</strong> — one that's trying to figure out what you actually want based on incomplete information.
              </p>

              {/* Comparison Table */}
              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[var(--border)]">
                      <th className="text-left py-4 px-4 font-bold text-[var(--text-primary)]">Search Engine</th>
                      <th className="text-left py-4 px-4 font-bold text-id8-orange">Collaborator</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--text-secondary)]">
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-4 px-4">Query → Result</td>
                      <td className="py-4 px-4 text-[var(--text-primary)]">Conversation → Refinement → Outcome</td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-4 px-4">One shot</td>
                      <td className="py-4 px-4 text-[var(--text-primary)]">Iterative</td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-4 px-4">Right or wrong</td>
                      <td className="py-4 px-4 text-[var(--text-primary)]">Closer or further</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4">You find info</td>
                      <td className="py-4 px-4 text-[var(--text-primary)]">You shape output together</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Key Insight */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold mb-6">The Key Insight: Output Is Diagnostic</h2>

              <p className="text-lg text-[var(--text-primary)] mb-6 leading-relaxed">
                When AI gives you something wrong, it's not failing. <strong>It's telling you what it thought you meant.</strong> Bad output = useful information about what was unclear in your input.
              </p>

              <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl mb-6">
                <p className="text-sm font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-4">Example</p>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-mono text-[var(--text-tertiary)] mb-2">You asked:</p>
                    <p className="font-mono text-[var(--text-primary)]">"Write me a bio"</p>
                  </div>

                  <div>
                    <p className="text-xs font-mono text-[var(--text-tertiary)] mb-2">AI wrote:</p>
                    <p className="text-[var(--text-secondary)] italic">A formal, third-person, 500-word professional biography</p>
                  </div>

                  <div>
                    <p className="text-xs font-mono text-id8-orange mb-2">What you learned:</p>
                    <p className="text-[var(--text-primary)]">You didn't specify tone, length, perspective, or context</p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-[var(--text-primary)] leading-relaxed">
                The AI's output just revealed four assumptions it made that you didn't intend. Now you know exactly what to clarify in your next message.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Mindset */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">The Mindset</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Old Mindset */}
                <div className="p-6 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)]">
                  <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-3">Instead of</p>
                  <p className="text-lg text-[var(--text-secondary)]">
                    "This AI is dumb, it didn't understand me"
                  </p>
                </div>

                {/* New Mindset */}
                <div className="p-6 bg-id8-orange/5 rounded-xl border border-id8-orange/30">
                  <p className="text-xs font-mono uppercase tracking-wider text-id8-orange mb-3">Try</p>
                  <p className="text-lg text-[var(--text-primary)]">
                    "What did the AI think I meant? What was I unclear about?"
                  </p>
                </div>
              </div>

              <p className="text-lg text-[var(--text-secondary)] mt-8 leading-relaxed">
                This shift in mindset is the foundation of everything else in this course. When you start treating AI output as <strong>information about your input</strong> rather than <strong>the final answer</strong>, you unlock the ability to iterate toward exactly what you need.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Try This Callout */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-id8-orange">
                  <LightbulbIcon />
                </span>
                <h3 className="text-2xl font-bold">Try This</h3>
              </div>

              <p className="text-lg text-[var(--text-primary)] mb-6 leading-relaxed">
                Think of a recent AI interaction that didn't go well. Ask yourself:
              </p>

              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-id8-orange/20 border border-id8-orange/40 flex items-center justify-center text-id8-orange font-bold flex-shrink-0">1</span>
                  <p className="text-[var(--text-primary)] flex-1 pt-1">What did I actually type?</p>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-id8-orange/20 border border-id8-orange/40 flex items-center justify-center text-id8-orange font-bold flex-shrink-0">2</span>
                  <p className="text-[var(--text-primary)] flex-1 pt-1">What did the AI produce?</p>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-id8-orange/20 border border-id8-orange/40 flex items-center justify-center text-id8-orange font-bold flex-shrink-0">3</span>
                  <p className="text-[var(--text-primary)] flex-1 pt-1">What assumptions did the AI make that I didn't intend?</p>
                </li>
                <li className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-id8-orange/20 border border-id8-orange/40 flex items-center justify-center text-id8-orange font-bold flex-shrink-0">4</span>
                  <p className="text-[var(--text-primary)] flex-1 pt-1">What could I have said differently?</p>
                </li>
              </ol>

              <p className="text-sm text-[var(--text-secondary)] mt-6 italic">
                This exercise is the diagnostic process in action. You're reverse-engineering what the AI inferred from your prompt.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/courses/ai-conversation-fundamentals"
                className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to Course Overview
              </Link>

              <Link
                href="/courses/ai-conversation-fundamentals/module-2"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Module 2 - Context Is Everything
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
