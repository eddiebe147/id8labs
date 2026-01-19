'use client'

import { m } from '@/components/motion'
import Link from 'next/link'
import CourseProgress from '@/components/CourseProgress'
import { ModuleComplete } from '@/components/progress'
import { ModuleAnnotations } from '@/components/annotations'

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
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <path d="M9 18h6M10 22h4M12 2v1M12 8a4 4 0 0 0-4 4c0 1.1.45 2.1 1.17 2.83L10 16h4l.83-1.17A4 4 0 0 0 12 8z"/>
  </svg>
)

export default function Module1Page() {
  return (
    <ModuleAnnotations courseSlug="ai-for-leaders" moduleSlug="module-1">
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-zone-text">
        <div className="container">
          <m.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-3xl"
          >
            {/* Breadcrumb */}
            <m.div variants={fadeUp} className="mb-8">
              <Link
                href="/academy/ai-for-leaders"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to AI for Leaders
              </Link>
            </m.div>

            <m.div variants={fadeUp}>
              <CourseProgress
                currentModule={1}
                totalModules={8}
                courseTitle="AI for Leaders"
              />
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                Module 1
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                45 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              What AI Actually Does
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "Every vendor promises AI will transform our business. I just need to know what's real."
            </m.p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">

            {/* The Reality Check */}
            <div className="not-prose mb-12 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                The Reality Check
              </h2>
              <h3 className="text-2xl font-bold mb-4">What AI Can and Can't Do — Right Now</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  You've heard the claims: AI will automate everything, replace knowledge workers, and fundamentally reshape every industry within years. Some of this is true. Most of it is vendor hype designed to create urgency around purchasing decisions.
                </p>
                <p>
                  As a leader, you need a clear mental model — not optimistic projections or worst-case fears, but a practical understanding of what current AI systems can reliably do, what they struggle with, and what remains firmly in the "not yet" category.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module gives you that mental model. By the end, you'll be able to evaluate any AI claim with clarity.
                </p>
              </div>
            </div>

            {/* The Hype Gap */}
            <h2>The Hype vs Reality Gap</h2>
            <p>
              Before we dive into capabilities, let's acknowledge the elephant in the room: there's a massive gap between AI marketing and AI reality.
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4 text-red-400">What Vendors Say</th>
                    <th className="text-left py-3 px-4 text-green-400">What's Actually True</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">"AI understands your business"</td>
                    <td className="py-3 px-4">AI processes patterns in text — it has no understanding</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">"Set it and forget it"</td>
                    <td className="py-3 px-4">AI requires ongoing supervision and refinement</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">"10x productivity instantly"</td>
                    <td className="py-3 px-4">Productivity gains are real but require learning curves</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">"Replaces expensive consultants"</td>
                    <td className="py-3 px-4">AI amplifies experts; it doesn't replace judgment</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">"Works out of the box"</td>
                    <td className="py-3 px-4">Customization and training are almost always needed</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              This isn't cynicism — it's clarity. AI is genuinely powerful. But that power comes with constraints that vendors don't emphasize in sales presentations.
            </p>

            {/* The Four Archetypes */}
            <h2>The Four AI Archetypes</h2>
            <p>
              Every AI application falls into one of four categories. Understanding these archetypes lets you quickly assess any AI tool's real capability:
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
              {[
                {
                  icon: "🔍",
                  title: "PATTERN RECOGNITION",
                  desc: "Finding signals in data that humans miss",
                  examples: "Fraud detection, image classification, demand forecasting"
                },
                {
                  icon: "✍️",
                  title: "GENERATION",
                  desc: "Creating new content based on learned patterns",
                  examples: "Text, code, images, audio, video synthesis"
                },
                {
                  icon: "📊",
                  title: "ANALYSIS",
                  desc: "Processing and summarizing large volumes of information",
                  examples: "Document analysis, sentiment tracking, research synthesis"
                },
                {
                  icon: "⚙️",
                  title: "AUTOMATION",
                  desc: "Executing repetitive tasks with consistent logic",
                  examples: "Workflow triggers, data entry, routing decisions"
                },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <span className="text-2xl">{item.icon}</span>
                  <h4 className="font-bold mt-2 text-id8-orange">{item.title}</h4>
                  <p className="text-sm text-[var(--text-primary)] mt-1">{item.desc}</p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-2 italic">{item.examples}</p>
                </div>
              ))}
            </div>

            <p>
              <strong>Key insight:</strong> Most overpromised AI solutions fail because they claim capabilities outside their archetype. A generation tool sold as "analysis" will disappoint. An automation tool sold as "intelligent decision-making" will fail.
            </p>

            {/* The Capability Matrix */}
            <h2>The Capability Matrix</h2>
            <p>
              For each archetype, here's what AI handles well versus poorly:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Archetype</th>
                    <th className="text-left py-3 px-4 text-green-400">Handles Well</th>
                    <th className="text-left py-3 px-4 text-red-400">Struggles With</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Pattern Recognition</td>
                    <td className="py-3 px-4">High-volume data, consistent patterns, historical trends</td>
                    <td className="py-3 px-4">Novel situations, low data volume, edge cases</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Generation</td>
                    <td className="py-3 px-4">First drafts, variations, format conversion</td>
                    <td className="py-3 px-4">Factual accuracy, original research, nuanced tone</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Analysis</td>
                    <td className="py-3 px-4">Summarization, categorization, trend identification</td>
                    <td className="py-3 px-4">Strategic interpretation, causation vs correlation</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Automation</td>
                    <td className="py-3 px-4">Rule-based tasks, consistent processes, high volume</td>
                    <td className="py-3 px-4">Exceptions, context-dependent decisions, creativity</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* The Can AI Do This Checklist */}
            <h2>The "Can AI Do This?" Checklist</h2>
            <p>
              When evaluating whether AI can handle a task, run through these five questions:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Is it pattern-based or judgment-based?</p>
                    <p className="text-sm text-[var(--text-secondary)]">AI excels at patterns. If it requires nuanced judgment, human oversight is essential.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">What's the cost of being wrong?</p>
                    <p className="text-sm text-[var(--text-secondary)]">Low-stakes tasks are ideal for AI. High-stakes decisions need human validation.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Is the input data clean and consistent?</p>
                    <p className="text-sm text-[var(--text-secondary)]">Garbage in, garbage out. AI amplifies data quality issues.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Can a human verify the output?</p>
                    <p className="text-sm text-[var(--text-secondary)]">If you can't tell good output from bad, you can't use AI safely.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">5</span>
                  <div>
                    <p className="font-bold">Is it repetitive enough to justify automation?</p>
                    <p className="text-sm text-[var(--text-secondary)]">One-off tasks rarely justify AI investment. Volume matters.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Five Myths */}
            <h2>Five Myths That Lead to Failed Projects</h2>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Myth #1</p>
                <p className="font-bold">"AI will figure out what we need"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: AI requires extremely specific direction. Vague goals produce vague results.</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Myth #2</p>
                <p className="font-bold">"More data is always better"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: Relevant, clean data beats volume. Most organizations have data quality issues, not data quantity issues.</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Myth #3</p>
                <p className="font-bold">"AI will reduce headcount"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: AI reshapes roles and creates new ones. Organizations that use AI for augmentation outperform those using it for replacement.</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Myth #4</p>
                <p className="font-bold">"We need to move fast or fall behind"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: Thoughtful implementation beats rushed deployment. Most AI failures come from moving too fast, not too slow.</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Myth #5</p>
                <p className="font-bold">"Our industry is different"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: AI capabilities are universal. Industry-specific nuance matters for implementation, not for assessing core capability.</p>
              </div>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: AI Capability Assessment</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 20 minutes<br />
                <strong>You'll need:</strong> One task or process you're considering for AI
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Name the task (2 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Write it down specifically. Not "improve customer service" but "respond to tier-1 support tickets."</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Identify the archetype (3 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Is this Pattern Recognition, Generation, Analysis, or Automation? Be honest.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Run the 5-question checklist (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Answer each question honestly. Write down your answers.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Score your confidence (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">On a scale of 1-10, how confident are you that AI can handle this task reliably?</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A one-page assessment you can share with stakeholders that clearly explains what AI can and can't do for this specific use case.
                </p>
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="not-prose my-12 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <LightbulbIcon />
                <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange">
                  Key Takeaways
                </h2>
              </div>
              <ul className="space-y-3">
                {[
                  "AI excels at pattern-based tasks and struggles with judgment-based ones. Know the difference.",
                  "Four archetypes cover all AI: Pattern Recognition, Generation, Analysis, and Automation. Map any tool to one.",
                  "The 5-question checklist protects you from oversold solutions. Use it on every vendor pitch.",
                  "Data quality matters more than data volume. Most AI failures trace back to data issues.",
                  "Thoughtful beats fast. The organizations winning with AI moved carefully, not quickly.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-id8-orange flex-shrink-0 mt-0.5"><CheckIcon /></span>
                    <span className="text-[var(--text-primary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Closing */}
            <p className="italic text-[var(--text-secondary)] border-l-2 border-id8-orange pl-4">
              You now have the mental model to evaluate AI claims with clarity. In the next module, we'll use this framework to find the specific opportunities where AI creates real value for your organization.
            </p>

            {/* Module Complete */}
            <ModuleComplete
              courseSlug="ai-for-leaders"
              moduleSlug="module-1"
              nextModulePath="/academy/ai-for-leaders/module-2"
            />

          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Link
                href="/academy/ai-for-leaders"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to Course
              </Link>
              <Link
                href="/academy/ai-for-leaders/module-2"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Finding the Opportunities
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </ModuleAnnotations>
  )
}
