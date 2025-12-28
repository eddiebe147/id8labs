'use client'

import { motion } from '@/components/motion'
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

const FileTextIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
)

const BarChartIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="20" x2="12" y2="10"/>
    <line x1="18" y1="20" x2="18" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="16"/>
  </svg>
)

const LightbulbIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2z"/>
  </svg>
)

const MicIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
)

const SearchIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
)

export default function Module5Page() {
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
              <span>Module 5</span>
              <span className="text-id8-orange/50">•</span>
              <span>~10 min</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Putting It Together
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed"
            >
              Real examples across writing, analysis, research, and creative work. See the patterns in action.
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-6">
                You've learned the mental models. Now let's see them in practice. Each example shows the before and after—and why the "after" version gets better results.
              </p>
              <div className="p-4 bg-id8-orange/5 border border-id8-orange/20 rounded-lg">
                <p className="text-sm text-[var(--text-primary)]">
                  <strong>The pattern you'll see repeated:</strong> Context + Task + Constraints + Quality bar
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Example 1: Writing Task */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <FileTextIcon />
              </span>
              <h2 className="text-2xl font-bold">Example 1: Writing Task (Follow-up Email)</h2>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-red-500/10 text-red-500 text-xs font-mono rounded">BEFORE</span>
                </div>
                <p className="text-[var(--text-primary)] italic font-mono text-sm">
                  "Write a follow-up email"
                </p>
                <p className="text-xs text-[var(--text-tertiary)] mt-3">
                  Problem: No context, no goal, no tone guidance
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                // delay: 0.1 merged
                className="p-4 bg-[var(--bg-primary)] border border-id8-orange/30 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-id8-orange/20 text-id8-orange text-xs font-mono rounded">AFTER</span>
                </div>
                <div className="text-[var(--text-primary)] text-sm bg-[var(--bg-secondary)] p-3 rounded font-mono">
                  <p className="mb-2">
                    "Write a follow-up email to a prospect I met at a conference yesterday.
                  </p>
                  <p className="mb-2">
                    <strong>Context:</strong> We talked about their team's struggle with manual data entry. They seemed interested in our automation tool but didn't commit.
                  </p>
                  <p className="mb-2">
                    <strong>Goal:</strong> Schedule a 20-minute demo call next week.
                  </p>
                  <p className="mb-2">
                    <strong>Tone:</strong> Professional but conversational. Reference our conversation.
                  </p>
                  <p>
                    <strong>Length:</strong> Under 150 words."
                  </p>
                </div>
                <div className="mt-3 p-2 bg-id8-orange/5 rounded">
                  <p className="text-xs text-[var(--text-primary)]">
                    <strong>Why it works:</strong> Context (conference, their pain point), Task (schedule demo), Constraints (tone, length), Quality bar (reference conversation)
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Example 2: Analysis Task */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <BarChartIcon />
              </span>
              <h2 className="text-2xl font-bold">Example 2: Analysis Task (Sales Data)</h2>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-red-500/10 text-red-500 text-xs font-mono rounded">BEFORE</span>
                </div>
                <p className="text-[var(--text-primary)] italic font-mono text-sm">
                  "Analyze this data"
                </p>
                <p className="text-xs text-[var(--text-tertiary)] mt-3">
                  Problem: Which angle? For what purpose?
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                // delay: 0.1 merged
                className="p-4 bg-[var(--bg-primary)] border border-id8-orange/30 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-id8-orange/20 text-id8-orange text-xs font-mono rounded">AFTER</span>
                </div>
                <div className="text-[var(--text-primary)] text-sm bg-[var(--bg-secondary)] p-3 rounded font-mono">
                  <p className="mb-2">
                    "Analyze this Q4 sales data. I'm presenting to the executive team tomorrow.
                  </p>
                  <p className="mb-2">
                    <strong>Specific questions:</strong>
                  </p>
                  <ul className="ml-4 mb-2 space-y-1">
                    <li>• Which product categories drove growth?</li>
                    <li>• Did we hit our regional targets?</li>
                    <li>• Any concerning trends in customer retention?</li>
                  </ul>
                  <p className="mb-2">
                    <strong>Format:</strong> 3 bullet points per question. Lead with the answer, then supporting data.
                  </p>
                  <p>
                    <strong>Focus on:</strong> Actionable insights, not just numbers. If something needs attention, flag it."
                  </p>
                </div>
                <div className="mt-3 p-2 bg-id8-orange/5 rounded">
                  <p className="text-xs text-[var(--text-primary)]">
                    <strong>Why it works:</strong> Clear use case (exec presentation), Specific questions, Deliverable format, Permission to prioritize ("flag issues")
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Example 3: Creative Task */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <MicIcon />
              </span>
              <h2 className="text-2xl font-bold">Example 3: Creative Task (Podcast Ideas)</h2>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-red-500/10 text-red-500 text-xs font-mono rounded">BEFORE</span>
                </div>
                <p className="text-[var(--text-primary)] italic font-mono text-sm">
                  "Give me podcast episode ideas"
                </p>
                <p className="text-xs text-[var(--text-tertiary)] mt-3">
                  Problem: For what show? What audience? What style?
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                // delay: 0.1 merged
                className="p-4 bg-[var(--bg-primary)] border border-id8-orange/30 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-id8-orange/20 text-id8-orange text-xs font-mono rounded">AFTER</span>
                </div>
                <div className="text-[var(--text-primary)] text-sm bg-[var(--bg-secondary)] p-3 rounded font-mono">
                  <p className="mb-2">
                    "Generate 5 podcast episode ideas for a show about productivity for remote workers.
                  </p>
                  <p className="mb-2">
                    <strong>Show context:</strong> 30-minute episodes. Conversational, not preachy. Audience is knowledge workers tired of generic advice.
                  </p>
                  <p className="mb-2">
                    <strong>Recent topics we've covered:</strong> Deep work, async communication, avoiding burnout.
                  </p>
                  <p className="mb-2">
                    <strong>Format for each idea:</strong>
                  </p>
                  <ul className="ml-4 mb-2 space-y-1">
                    <li>• Episode title (punchy, max 6 words)</li>
                    <li>• 2-sentence description</li>
                    <li>• One counterintuitive angle or hook</li>
                  </ul>
                  <p>
                    <strong>Avoid:</strong> Anything we've done before. Generic 'tips and tricks' angles."
                  </p>
                </div>
                <div className="mt-3 p-2 bg-id8-orange/5 rounded">
                  <p className="text-xs text-[var(--text-primary)]">
                    <strong>Why it works:</strong> Show context (style, audience), What to avoid (past topics), Deliverable format (title + description + hook), Quality bar (counterintuitive)
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Example 4: Research Task */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <SearchIcon />
              </span>
              <h2 className="text-2xl font-bold">Example 4: Research Task (Decision Support)</h2>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-red-500/10 text-red-500 text-xs font-mono rounded">BEFORE</span>
                </div>
                <p className="text-[var(--text-primary)] italic font-mono text-sm">
                  "Tell me about solar panels"
                </p>
                <p className="text-xs text-[var(--text-tertiary)] mt-3">
                  Problem: Too broad. What's the decision?
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                // delay: 0.1 merged
                className="p-4 bg-[var(--bg-primary)] border border-id8-orange/30 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-id8-orange/20 text-id8-orange text-xs font-mono rounded">AFTER</span>
                </div>
                <div className="text-[var(--text-primary)] text-sm bg-[var(--bg-secondary)] p-3 rounded font-mono">
                  <p className="mb-2">
                    "I'm deciding whether to install solar panels on my house in northern California.
                  </p>
                  <p className="mb-2">
                    <strong>My situation:</strong>
                  </p>
                  <ul className="ml-4 mb-2 space-y-1">
                    <li>• Average monthly electric bill: $180</li>
                    <li>• Planning to stay in this house for 10+ years</li>
                    <li>• Upfront budget: ~$20k</li>
                  </ul>
                  <p className="mb-2">
                    <strong>What I need:</strong>
                  </p>
                  <ul className="ml-4 mb-2 space-y-1">
                    <li>• Realistic payback timeline</li>
                    <li>• Major risks or downsides I should know</li>
                    <li>• Whether to buy or lease</li>
                  </ul>
                  <p>
                    <strong>Skip:</strong> History of solar technology, general environmental benefits (I already support the idea)."
                  </p>
                </div>
                <div className="mt-3 p-2 bg-id8-orange/5 rounded">
                  <p className="text-xs text-[var(--text-primary)]">
                    <strong>Why it works:</strong> Specific situation (location, budget, timeline), Clear scope (decision factors), Explicit "skip this" (saves attention for what matters)
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* The Pattern */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <LightbulbIcon />
              </span>
              <h2 className="text-2xl font-bold">The Pattern</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              All four examples share the same structure. Once you see it, you can apply it to anything:
            </p>

            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 bg-[var(--bg-primary)] border border-id8-orange/30 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-xs font-mono flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)] mb-1">Context</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      What's the situation? Who's the audience? What constraints exist?
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                // delay: 0.1 merged
                className="p-4 bg-[var(--bg-primary)] border border-id8-orange/30 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-xs font-mono flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)] mb-1">Task</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      What exactly do you need? Be specific about the deliverable.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                // delay: 0.2 merged
                className="p-4 bg-[var(--bg-primary)] border border-id8-orange/30 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-xs font-mono flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)] mb-1">Constraints</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Format, length, tone, style. What are the boundaries?
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                // delay: 0.3 merged
                className="p-4 bg-[var(--bg-primary)] border border-id8-orange/30 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-xs font-mono flex-shrink-0">
                    4
                  </span>
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)] mb-1">Quality bar</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      What makes this "good"? What should it avoid? How will you know it's right?
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-6 p-4 bg-id8-orange/5 border border-id8-orange/20 rounded-lg">
              <p className="text-sm text-[var(--text-primary)]">
                <strong>Use this as a template.</strong> When you're not getting good results, check if you've covered all four pieces. One of them is probably missing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaway */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Key Takeaway</h2>
            <div className="p-5 bg-[var(--bg-primary)] border border-id8-orange/30 rounded-xl">
              <p className="text-lg text-[var(--text-primary)] leading-relaxed mb-4">
                Good prompts aren't magic. They're structured. They give the AI exactly what it needs to deliver what you want.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Context + Task + Constraints + Quality bar. Use this pattern, and you'll get consistent results across any domain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Link
                href="/courses/ai-conversation-fundamentals/module-4"
                className="btn bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeftIcon />
                Previous: The Attention Budget
              </Link>
              <Link
                href="/courses/ai-conversation-fundamentals/module-6"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: What's Next
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
