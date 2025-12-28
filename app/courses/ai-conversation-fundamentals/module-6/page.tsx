'use client'

import { motion } from '@/components/motion'
import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'
import CourseFeedback from '@/components/CourseFeedback'

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

const CheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const SparklesIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M5.6 18.4L18.4 5.6"/>
  </svg>
)

const BookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
)

const ToolIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
)

const BriefcaseIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
)

const DiscordIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
)

const MessageCircleIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
)

const learnings = [
  {
    title: "The mental model shift",
    description: "AI output is diagnostic feedback, not final deliverables"
  },
  {
    title: "The 5 levers",
    description: "Specificity, context, constraints, format, iteration"
  },
  {
    title: "The iteration loop",
    description: "How to read output and decide: refine, redirect, or restart"
  },
  {
    title: "The attention budget",
    description: "More context doesn't always help. Front-load what matters."
  },
  {
    title: "The pattern",
    description: "Context + Task + Constraints + Quality bar — works every time"
  }
]

export default function Module6Page() {
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

            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-sm font-mono mb-6"
            >
              <span>Module 6</span>
              <span className="text-id8-orange/50">•</span>
              <span>~3 min</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              What's Next
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed"
            >
              You've completed the fundamentals. Here's what you've learned and where to go from here.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* What You've Learned */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-id8-orange">
                <SparklesIcon />
              </span>
              <h2 className="text-2xl font-bold">What You've Learned</h2>
            </div>

            <div className="space-y-3">
              {learnings.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]"
                >
                  <span className="text-id8-orange flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)] mb-1">{item.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-id8-orange/5 border border-id8-orange/20 rounded-xl">
              <p className="text-[var(--text-primary)] leading-relaxed">
                You now have the mental framework most people never develop. You understand how to think about AI conversations, how to read the feedback, and how to iterate toward better results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* But There's a Ceiling */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">But There's a Ceiling</h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-6">
                Chat interfaces like ChatGPT and Claude.ai are powerful for conversations. But they have limits.
              </p>

              <div className="p-5 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl mb-6">
                <p className="font-bold text-[var(--text-primary)] mb-3">What you CAN'T do in a chat interface:</p>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--text-tertiary)] mt-0.5">•</span>
                    <span>Process entire folders of files at once</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--text-tertiary)] mt-0.5">•</span>
                    <span>Run code and see real output</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--text-tertiary)] mt-0.5">•</span>
                    <span>Build recurring workflows that run automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--text-tertiary)] mt-0.5">•</span>
                    <span>Delegate file management, data cleanup, and system-level tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--text-tertiary)] mt-0.5">•</span>
                    <span>Actually take action on your computer</span>
                  </li>
                </ul>
              </div>

              <p className="text-[var(--text-secondary)] leading-relaxed">
                That's where <strong className="text-[var(--text-primary)]">Claude Code</strong> (formerly Claude Desktop) comes in. It's the same AI, but with the ability to read your files, run commands, and actually do work on your behalf.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTAs Section */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Ready for the Next Level?</h2>

            <div className="space-y-4">
              {/* CTA 1: Free Module 0 */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl hover:border-id8-orange/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-id8-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookIcon />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Try Module 0 Free</h3>
                    <p className="text-[var(--text-secondary)] mb-4">
                      Install Claude Code and clean up your Downloads folder in 10 minutes. Experience what it's like to delegate real work.
                    </p>
                    <Link
                      href="/courses/claude-for-knowledge-workers/module-0"
                      className="btn bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
                    >
                      Start Module 0
                      <ArrowRightIcon />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* CTA 2: Full Course */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="p-6 bg-id8-orange/5 border-2 border-id8-orange/30 rounded-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-id8-orange/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ToolIcon />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-[var(--text-primary)]">Get the Full Course</h3>
                      <span className="px-2 py-0.5 bg-id8-orange/20 text-id8-orange text-xs font-mono rounded">RECOMMENDED</span>
                    </div>
                    <p className="text-[var(--text-secondary)] mb-3">
                      <strong className="text-[var(--text-primary)]">Claude for Knowledge Workers</strong> — Learn to delegate file management, data processing, research, and more. 5 modules of hands-on practice.
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-lg text-[var(--text-tertiary)] line-through">$197</span>
                      <span className="text-2xl font-bold text-id8-orange">$99</span>
                      <span className="text-sm text-green-400 font-mono">Launch Special</span>
                    </div>
                    <Link
                      href="/courses/claude-for-knowledge-workers"
                      className="btn btn-primary group inline-flex items-center gap-2"
                    >
                      Get Full Access
                      <ArrowRightIcon />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* CTA 3: Services */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl hover:border-id8-orange/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <BriefcaseIcon />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Need Custom Help?</h3>
                    <p className="text-[var(--text-secondary)] mb-4">
                      Looking for 1-on-1 coaching, team training, or custom automation? View our consulting services.
                    </p>
                    <Link
                      href="/services"
                      className="btn bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
                    >
                      View Services
                      <ArrowRightIcon />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Discord Community */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 bg-[#5865F2]/10 border border-[#5865F2]/30 rounded-2xl text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#5865F2]/20 rounded-2xl mb-4 text-[#5865F2]">
                <DiscordIcon />
              </div>
              <h2 className="text-2xl font-bold mb-3">Join the Community</h2>
              <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
                Connect with other knowledge workers learning to delegate to AI. Share wins, ask questions, and see how others are using these patterns.
              </p>
              <a
                href="https://discord.gg/zun9MnNVcv"
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2] text-white hover:bg-[#4752C4] transition-colors rounded-xl font-semibold"
              >
                <DiscordIcon />
                Join Discord
              </a>
              <p className="text-sm text-[var(--text-tertiary)] mt-4">
                Free to join. No spam.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Feedback */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <CourseFeedback
              courseId="ai-conversation-fundamentals"
              courseName="AI Conversation Fundamentals"
            />
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-3">Stay in the Loop</h2>
              <p className="text-[var(--text-secondary)]">
                Get notified when we release new courses, tools, and resources.
              </p>
            </div>
            <EmailCapture
              source="ai-conversation-fundamentals-module-6"
              title="Join our mailing list for updates and tips"
            />
          </div>
        </div>
      </section>

      {/* Final Message */}
      <section className="section-spacing-lg relative border-t border-[var(--border)]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,var(--id8-orange-light)_0%,transparent_70%)] opacity-30 pointer-events-none" />

        <div className="container relative">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-id8-orange/10 rounded-2xl mb-6">
                <CheckIcon />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                You've Completed the{' '}
                <span className="text-gradient-orange">Fundamentals</span>
              </h2>
              <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
                You now think differently about AI conversations. The patterns you've learned here will serve you across every tool, every task, every domain.
              </p>
              <p className="text-lg text-[var(--text-secondary)]">
                Now go use it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Link
                href="/courses/ai-conversation-fundamentals/module-5"
                className="btn bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeftIcon />
                Previous: Putting It Together
              </Link>
              <Link
                href="/courses/ai-conversation-fundamentals"
                className="btn bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
              >
                Back to Course Overview
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
