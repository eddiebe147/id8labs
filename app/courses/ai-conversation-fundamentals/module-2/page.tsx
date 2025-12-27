'use client'

import { motion } from 'framer-motion'
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

const CheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const LightbulbIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2z"/>
  </svg>
)

// Content data
const levers = [
  {
    number: 1,
    name: "CLARITY",
    description: "Say exactly what you mean. Specify format, length, tone, audience, goal.",
    before: "Write about marketing",
    after: "Write a 200-word LinkedIn post about why small businesses should invest in email marketing before paid ads. Tone: conversational but credible. End with a question."
  },
  {
    number: 2,
    name: "EXAMPLES",
    description: "Show the pattern you want. 2-3 examples establish a pattern.",
    before: "Write a product description that's punchy",
    after: "Write a product description for my notebook. Here's an example of the style I want: [example]. Now write something similar..."
  },
  {
    number: 3,
    name: "THINKING",
    description: "Let the AI reason before answering. Use for math, comparisons, complex analysis.",
    before: "Should I lease or buy this car?",
    after: "Think through the financial and practical tradeoffs step by step, then give me your recommendation."
  },
  {
    number: 4,
    name: "STRUCTURE",
    description: "Organize complex requests with clear sections.",
    before: "Wall of text about email to client",
    after: "Structured with Context, Goals (numbered), Constraints"
  },
  {
    number: 5,
    name: "ROLE",
    description: "Set the expertise level.",
    before: "Explain how mortgages work",
    after: "You're a financial advisor explaining mortgages to a first-time homebuyer..."
  }
]

export default function Module2Page() {
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
              <CourseProgress currentModule={2} totalModules={6} />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-sm font-mono mb-6"
            >
              <span>Module 2</span>
              <span className="text-id8-orange/50">•</span>
              <span>15 min</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              The Core Toolkit
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed"
            >
              The 5 levers that control output quality. Master these and you'll consistently get better results.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Introduction */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg"
            >
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-6">
                You've learned to read AI output as diagnostic feedback. Now we're going to give you precise controls to shape that output.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Think of these as knobs on a mixing board. Each lever adjusts a different aspect of the response. Used together, they give you remarkable control.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The 5 Levers */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">The 5 Levers</h2>

            <div className="space-y-8">
              {levers.map((lever, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl"
                >
                  {/* Lever Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 flex items-center justify-center bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-sm font-mono">
                      {lever.number}
                    </span>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">
                      Lever {lever.number}: {lever.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-[var(--text-secondary)] mb-6">
                    {lever.description}
                  </p>

                  {/* Before/After Examples */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Before */}
                    <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                      <p className="text-xs font-mono uppercase tracking-wider text-red-500 mb-2">
                        Before
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {lever.before}
                      </p>
                    </div>

                    {/* After */}
                    <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                      <p className="text-xs font-mono uppercase tracking-wider text-green-500 mb-2">
                        After
                      </p>
                      <p className="text-sm text-[var(--text-primary)]">
                        {lever.after}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* When to Use Which Lever */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">When to Use Which Lever</h2>

            <div className="space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-medium text-[var(--text-primary)] mb-2">
                  Use <span className="text-id8-orange">CLARITY</span> when...
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  The output is directionally right but not quite what you wanted. Add specifics about format, length, tone, or goal.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-medium text-[var(--text-primary)] mb-2">
                  Use <span className="text-id8-orange">EXAMPLES</span> when...
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  You want a specific style or format that's hard to describe. Show 2-3 examples and ask for something similar.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-medium text-[var(--text-primary)] mb-2">
                  Use <span className="text-id8-orange">THINKING</span> when...
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  The task requires reasoning, comparison, or analysis. Math problems, tradeoff analysis, strategic decisions.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-medium text-[var(--text-primary)] mb-2">
                  Use <span className="text-id8-orange">STRUCTURE</span> when...
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  You're making a complex request with multiple parts. Break it into numbered sections or bullet points.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-medium text-[var(--text-primary)] mb-2">
                  Use <span className="text-id8-orange">ROLE</span> when...
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  You need expertise at a specific level. "Explain like I'm a beginner" vs. "Explain like I have a CS degree."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Combining Levers */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Combining Levers</h2>

            <p className="text-[var(--text-secondary)] mb-6">
              The real power comes from using multiple levers together. Here's an example using all 5:
            </p>

            <div className="p-6 bg-[var(--bg-primary)] border border-id8-orange/30 rounded-xl">
              <p className="text-xs font-mono uppercase tracking-wider text-id8-orange mb-3">
                All 5 Levers in Action
              </p>
              <div className="space-y-3 text-sm text-[var(--text-secondary)]">
                <p>
                  <span className="text-id8-orange font-medium">[ROLE]</span> You're a financial advisor with 15 years of experience.
                </p>
                <p>
                  <span className="text-id8-orange font-medium">[CLARITY]</span> Write a 300-word email to a 35-year-old professional who just got their first big raise. Tone: encouraging but practical.
                </p>
                <p>
                  <span className="text-id8-orange font-medium">[STRUCTURE]</span> Include: 1) Congratulations, 2) Three actionable suggestions, 3) A warning about lifestyle inflation, 4) Next steps.
                </p>
                <p>
                  <span className="text-id8-orange font-medium">[THINKING]</span> Think about what financial mistakes people at this stage commonly make, then write advice that addresses those specifically.
                </p>
                <p>
                  <span className="text-id8-orange font-medium">[EXAMPLES]</span> Here's an example of the tone I want: [paste example].
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Try This */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <LightbulbIcon />
              </span>
              <h2 className="text-2xl font-bold">Try This</h2>
            </div>

            <div className="p-6 bg-id8-orange/5 border border-id8-orange/20 rounded-xl">
              <p className="text-lg font-medium text-[var(--text-primary)] mb-4">
                Your challenge: Take a real task from your work
              </p>
              <p className="text-[var(--text-secondary)] mb-4">
                Think of something you actually need to write or figure out this week. Write a prompt using at least 3 of the 5 levers.
              </p>
              <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <p className="text-sm font-medium text-[var(--text-primary)] mb-2">Success looks like:</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-id8-orange flex-shrink-0 mt-0.5"><CheckIcon /></span>
                    You get a usable first draft
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-id8-orange flex-shrink-0 mt-0.5"><CheckIcon /></span>
                    You can see which levers made the biggest difference
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-id8-orange flex-shrink-0 mt-0.5"><CheckIcon /></span>
                    You understand why the output improved
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Key Takeaways</h2>

            <div className="space-y-3">
              {[
                { num: 1, text: "The 5 levers give you precise control: Clarity, Examples, Thinking, Structure, Role." },
                { num: 2, text: "Clarity is the most commonly needed lever. Be specific about format, length, tone, and goal." },
                { num: 3, text: "Examples are underrated. 2-3 good examples teach the pattern better than paragraphs of description." },
                { num: 4, text: "Use 'Thinking' for anything that requires reasoning. Let the AI show its work." },
                { num: 5, text: "Combining levers compounds their effectiveness. Don't be afraid to use all 5 on important tasks." },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-3 p-3 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)]">
                  <span className="w-6 h-6 flex items-center justify-center bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-xs font-mono flex-shrink-0">
                    {item.num}
                  </span>
                  <p className="text-sm text-[var(--text-primary)]">{item.text}</p>
                </div>
              ))}
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
                href="/courses/ai-conversation-fundamentals/module-1"
                className="btn bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeftIcon />
                Previous: The Mental Model Shift
              </Link>
              <Link
                href="/courses/ai-conversation-fundamentals/module-3"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: The Iteration Loop
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
