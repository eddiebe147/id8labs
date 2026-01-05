'use client'

import { m } from '@/components/motion'
import Link from 'next/link'
import CourseProgress from '@/components/CourseProgress'
import { ModuleComplete } from '@/components/progress'

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

const RefreshIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 4v6h6M23 20v-6h-6"/>
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
  </svg>
)

const AlertIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)

// Content data
const moves = [
  {
    name: "REDIRECT",
    when: "AI misunderstood your intent",
    phrase: "That's not quite it. I meant [X].",
    example: "You asked for 'simple pricing table' and got a complex chart. Say: 'Not quite — I meant a 3-column comparison with just plan names, prices, and top features.'",
    color: "yellow"
  },
  {
    name: "REFINE",
    when: "Output is mostly right but needs tweaking",
    phrase: "Good, but adjust [specific thing].",
    example: "You got a good draft but the tone is too formal. Say: 'This is close. Make it more conversational — like you're talking to a friend over coffee.'",
    color: "blue"
  },
  {
    name: "RESTART",
    when: "Completely off track",
    phrase: "Start fresh with better prompt",
    example: "You asked vaguely and got something useless. Don't iterate on garbage. Write a new prompt using the 5 levers.",
    color: "red"
  }
]

const decisionTable = [
  { quality: "70%+ right", move: "REFINE", example: "Good structure, wrong tone" },
  { quality: "50-70% right", move: "REDIRECT", example: "Wrong focus, but salvageable" },
  { quality: "Directionally wrong", move: "REDIRECT", example: "Misunderstood the core ask" },
  { quality: "Completely off", move: "RESTART", example: "Not even close to useful" },
]

export default function Module3Page() {
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

            <m.div variants={fadeUp}>
              <CourseProgress currentModule={3} totalModules={6} />
            </m.div>

            <m.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-sm font-mono mb-6"
            >
              <span>Module 3</span>
              <span className="text-id8-orange/50">•</span>
              <span>10 min</span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              The Iteration Loop
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed"
            >
              How to read AI output as feedback. When to refine, when to redirect, when to restart.
            </m.p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* The Mistake Most People Make */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-red-500">
                <AlertIcon />
              </span>
              <h2 className="text-2xl font-bold">The Mistake Most People Make</h2>
            </div>

            <p className="text-xl text-[var(--text-secondary)] mb-6 leading-relaxed">
              When the output isn't quite right, most people start completely over. They throw away the conversation and write a brand new prompt from scratch.
            </p>

            <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl">
              <p className="text-lg font-medium text-[var(--text-primary)] mb-2">
                Why this is wrong:
              </p>
              <p className="text-[var(--text-secondary)]">
                You're throwing away useful context. The AI already understands the domain, the general direction, the constraints. Starting over means re-teaching all of that.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Better Approach */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-green-500">
                <RefreshIcon />
              </span>
              <h2 className="text-2xl font-bold">The Better Approach</h2>
            </div>

            <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-xl mb-8">
              <p className="text-lg font-mono text-center text-[var(--text-primary)] mb-2">
                Prompt → Output → Diagnose → Adjust → Better Output
              </p>
              <p className="text-sm text-[var(--text-secondary)] text-center">
                Iteration is a conversation, not a slot machine
              </p>
            </div>

            <p className="text-[var(--text-secondary)]">
              When output isn't right, pause and diagnose: <strong className="text-[var(--text-primary)]">Why didn't this work?</strong> Did the AI misunderstand? Is it close but needs tweaking? Is it completely off base?
            </p>
          </div>
        </div>
      </section>

      {/* The Three Moves */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">The Three Moves</h2>

            <div className="space-y-6">
              {moves.map((move, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                  className={`p-6 border rounded-xl ${
                    move.color === 'yellow' ? 'bg-yellow-500/5 border-yellow-500/20' :
                    move.color === 'blue' ? 'bg-blue-500/5 border-blue-500/20' :
                    'bg-red-500/5 border-red-500/20'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`w-8 h-8 flex items-center justify-center border rounded-full text-sm font-mono ${
                      move.color === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' :
                      move.color === 'blue' ? 'bg-blue-500/10 border-blue-500/30 text-blue-500' :
                      'bg-red-500/10 border-red-500/30 text-red-500'
                    }`}>
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">
                      {move.name}
                    </h3>
                  </div>

                  {/* When to use */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                      Use when:
                    </p>
                    <p className="text-[var(--text-secondary)]">
                      {move.when}
                    </p>
                  </div>

                  {/* What to say */}
                  <div className="mb-4 p-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                    <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                      What to say:
                    </p>
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                      "{move.phrase}"
                    </p>
                  </div>

                  {/* Example */}
                  <div className="p-3 bg-[var(--bg-secondary)] rounded-lg">
                    <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-1">
                      Example:
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {move.example}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Decision Heuristic */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Decision Heuristic: Which Move?</h2>

            <p className="text-[var(--text-secondary)] mb-6">
              Use this quick decision tree when output isn't perfect:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border border-[var(--border)] rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-[var(--bg-primary)]">
                    <th className="text-left p-4 text-sm font-medium text-[var(--text-primary)] border-b border-[var(--border)]">
                      Output Quality
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-[var(--text-primary)] border-b border-[var(--border)]">
                      Move
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-[var(--text-primary)] border-b border-[var(--border)]">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {decisionTable.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-[var(--bg-primary)]' : 'bg-[var(--bg-secondary)]'}>
                      <td className="p-4 text-sm text-[var(--text-secondary)] border-b border-[var(--border)]">
                        {row.quality}
                      </td>
                      <td className="p-4 border-b border-[var(--border)]">
                        <span className={`inline-block px-2 py-1 text-xs font-mono rounded ${
                          row.move === 'REFINE' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                          row.move === 'REDIRECT' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                          'bg-red-500/10 text-red-500 border border-red-500/20'
                        }`}>
                          {row.move}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-[var(--text-secondary)] border-b border-[var(--border)]">
                        {row.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Real Iteration Examples */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Real Iteration Example</h2>

            <div className="space-y-4">
              {/* First attempt */}
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                  First Attempt
                </p>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  <strong className="text-[var(--text-primary)]">You:</strong> "Write an email to my team about the new project timeline."
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">AI:</strong> [Generic, formal email that doesn't match your voice]
                </p>
              </div>

              {/* Diagnosis */}
              <div className="flex items-center justify-center">
                <div className="px-4 py-2 bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-sm font-mono">
                  Diagnosis: 60% right → REDIRECT
                </div>
              </div>

              {/* Redirect */}
              <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                <p className="text-xs font-mono uppercase tracking-wider text-yellow-500 mb-2">
                  Redirect (clarify intent)
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">You:</strong> "Not quite. We're behind schedule and I need to be honest about that without creating panic. Tone should be: 'Here's what happened, here's the new plan, we've got this.'"
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  <strong className="text-[var(--text-primary)]">AI:</strong> [Better email, right tone, but too long]
                </p>
              </div>

              {/* Diagnosis 2 */}
              <div className="flex items-center justify-center">
                <div className="px-4 py-2 bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-sm font-mono">
                  Diagnosis: 85% right → REFINE
                </div>
              </div>

              {/* Refine */}
              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                <p className="text-xs font-mono uppercase tracking-wider text-blue-500 mb-2">
                  Refine (small adjustment)
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">You:</strong> "Good. Cut it to 3 paragraphs max. Keep the directness."
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  <strong className="text-[var(--text-primary)]">AI:</strong> [Perfect. Ready to send.]
                </p>
              </div>

              {/* Result */}
              <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                <p className="text-xs font-mono uppercase tracking-wider text-green-500 mb-2">
                  Result
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Two iterations, 90 seconds total. You got exactly what you needed by diagnosing quality and making the right move each time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Try This */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
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
                Your challenge: Practice diagnosing output
              </p>
              <p className="text-[var(--text-secondary)] mb-4">
                Next time you get imperfect output from AI, pause before starting over. Ask yourself:
              </p>
              <div className="space-y-2 text-[var(--text-secondary)]">
                <p>1. <strong className="text-[var(--text-primary)]">What percentage is this right?</strong> (Be honest)</p>
                <p>2. <strong className="text-[var(--text-primary)]">Why didn't it work perfectly?</strong> (Misunderstanding? Missing context? Wrong tone?)</p>
                <p>3. <strong className="text-[var(--text-primary)]">Which move fits?</strong> (Redirect, Refine, or Restart)</p>
              </div>
              <div className="mt-4 p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <p className="text-sm font-medium text-[var(--text-primary)] mb-2">Success looks like:</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  You get to a great result in 2-3 iterations instead of starting from scratch 5 times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Key Takeaways</h2>

            <div className="space-y-3">
              {[
                { num: 1, text: "Don't start over when output is imperfect. Iteration preserves useful context." },
                { num: 2, text: "Diagnose first: What percentage right? Why didn't it work? Which move fits?" },
                { num: 3, text: "REDIRECT when AI misunderstood. REFINE when it's close. RESTART when it's hopeless." },
                { num: 4, text: "The decision table is your friend: 70%+ = Refine, 50-70% = Redirect, <50% = Restart." },
                { num: 5, text: "Great results usually take 2-3 iterations. That's normal and much faster than starting over." },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
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
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <ModuleComplete
              courseSlug="ai-conversation-fundamentals"
              moduleSlug="module-3"
              nextModulePath="/courses/ai-conversation-fundamentals/module-4"
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-between mt-8">
              <Link
                href="/courses/ai-conversation-fundamentals/module-2"
                className="btn bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeftIcon />
                Previous: The Core Toolkit
              </Link>
              <Link
                href="/courses/ai-conversation-fundamentals/module-4"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: The Attention Budget
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
