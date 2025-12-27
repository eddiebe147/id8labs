'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import EmailCapture from '@/components/EmailCapture'

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

const BookIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
)

// Data
const learningPoints = [
  "Why AI output is diagnostic feedback (and how to read it)",
  "The 5 levers that control output quality",
  "When to refine vs. redirect vs. restart",
  "Why more context often makes things worse",
  "Real examples across writing, analysis, research, and creative tasks"
]

const modules = [
  {
    number: "1",
    title: "The Mental Model Shift",
    duration: "~10 min",
    description: "Stop treating AI like a search engine. Start treating it like a conversation with diagnostic feedback.",
    href: "/courses/ai-conversation-fundamentals/module-1",
  },
  {
    number: "2",
    title: "The Core Toolkit",
    duration: "~15 min",
    description: "The 5 levers that control output quality: specificity, context, constraints, format, and iteration.",
    href: "/courses/ai-conversation-fundamentals/module-2",
  },
  {
    number: "3",
    title: "The Iteration Loop",
    duration: "~10 min",
    description: "How to read AI output as feedback. When to refine, when to redirect, when to restart.",
    href: "/courses/ai-conversation-fundamentals/module-3",
  },
  {
    number: "4",
    title: "The Attention Budget",
    duration: "~10 min",
    description: "Why more context often makes things worse. How to feed information strategically.",
    href: "/courses/ai-conversation-fundamentals/module-4",
  },
  {
    number: "5",
    title: "Putting It Together",
    duration: "~10 min",
    description: "Real examples: writing, analysis, research, creative work. See the patterns in action.",
    href: "/courses/ai-conversation-fundamentals/module-5",
  },
  {
    number: "6",
    title: "What's Next",
    duration: "~3 min",
    description: "Where to go from here. Resources, advanced techniques, and next steps.",
    href: "/courses/ai-conversation-fundamentals/module-6",
  },
]

export default function AIConversationFundamentalsPage() {
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
              Free Course • ~45 min
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] font-bold tracking-tight mb-6"
            >
              AI Conversation{' '}
              <span className="text-gradient-orange">Fundamentals</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-2xl md:text-3xl text-[var(--text-secondary)] max-w-2xl mb-4 font-medium"
            >
              The mental models that separate frustrated users from people who get results every time.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] max-w-2xl mb-10 leading-relaxed"
            >
              You've used ChatGPT. You've tried Claude. Sometimes it's magic. Sometimes it's useless. The difference isn't luck. It's understanding how to think about the conversation.
            </motion.p>

            {/* What You'll Learn */}
            <motion.div
              variants={fadeUp}
              className="mb-10 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl"
            >
              <h3 className="text-lg font-bold mb-4">What you'll learn:</h3>
              <ul className="space-y-3">
                {learningPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-id8-orange flex-shrink-0 mt-0.5">
                      <CheckIcon />
                    </span>
                    <span className="text-[var(--text-secondary)]">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/courses/ai-conversation-fundamentals/module-1"
                className="btn btn-primary group inline-flex items-center justify-center gap-2"
              >
                Start the Course
                <ArrowRightIcon />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Email Capture Section */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <EmailCapture
              source="ai-conversation-fundamentals-landing"
              title="Get notified when we release new courses"
            />
          </div>
        </div>
      </section>

      {/* Course Preview Section */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
              Course Preview
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              6 modules. 45 minutes. Zero fluff.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Each module builds a mental model that changes how you approach AI conversations. By the end, you'll know exactly what to do when you're not getting the results you want.
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
              <motion.div key={index} variants={fadeUp}>
                <Link
                  href={module.href}
                  className="flex items-start gap-4 p-5 rounded-xl border bg-[var(--bg-secondary)] border-[var(--border)] hover:border-id8-orange/30 transition-colors"
                >
                  <span className="text-2xl font-mono font-bold text-[var(--text-tertiary)]">
                    {module.number}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold">{module.title}</h3>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm">{module.description}</p>
                  </div>
                  <span className="text-sm font-mono text-[var(--text-tertiary)] whitespace-nowrap">
                    {module.duration}
                  </span>
                </Link>
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
                Built by someone who teaches this daily
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
                    I've spent hundreds of hours teaching people how to use AI tools effectively. The patterns are the same whether you're writing marketing copy, analyzing research, or processing files.
                  </p>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    This course distills those patterns into 45 minutes. It's the mental framework I wish I had when I started.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-spacing-lg relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,var(--id8-orange-light)_0%,transparent_70%)] opacity-30 pointer-events-none" />

        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-id8-orange/10 rounded-2xl mb-6">
              <BookIcon />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to understand{' '}
              <span className="text-gradient-orange">how this actually works?</span>
            </h2>
            <p className="text-xl text-[var(--text-secondary)] mb-8">
              45 minutes to change how you think about AI conversations. Forever.
            </p>
            <Link
              href="/courses/ai-conversation-fundamentals/module-1"
              className="btn btn-primary group inline-flex items-center justify-center gap-2 text-lg py-4 px-8"
            >
              Start Module 1
              <ArrowRightIcon />
            </Link>
            <p className="mt-4 text-sm text-[var(--text-tertiary)]">
              Completely free. No signup required.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
