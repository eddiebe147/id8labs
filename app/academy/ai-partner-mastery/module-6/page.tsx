'use client'

import { m } from '@/components/motion'
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
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const LightbulbIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6M10 22h4M12 2v1M12 8a4 4 0 0 0-4 4c0 1.1.45 2.1 1.17 2.83L10 16h4l.83-1.17A4 4 0 0 0 12 8z"/>
  </svg>
)

const ShieldCheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
)

export default function Module6Page() {
  return (
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
                href="/academy/ai-partner-mastery"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to AI Partner Mastery
              </Link>
            </m.div>

            <m.div variants={fadeUp}>
              <CourseProgress
                currentModule={6}
                totalModules={8}
                courseTitle="AI Partner Mastery"
              />
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                Module 6
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                45 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Quality Assurance Patterns
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "AI gave me an answer. But is it the RIGHT answer?"
            </m.p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">

            {/* The Scenario */}
            <div className="not-prose mb-12 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                The Scenario
              </h2>
              <h3 className="text-2xl font-bold mb-4">Meet Dr. Amara Patel</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Amara is a research director at BioSynth, a biotech startup developing next-gen antibiotics. She's preparing a grant proposal worth $4.2M. The deadline is in 48 hours.
                </p>
                <p>
                  She's been using AI to help draft sections of the proposal — literature reviews, methodology descriptions, preliminary data analysis. It's been incredibly helpful. She's moving 3x faster than she normally would.
                </p>
                <p>
                  But as she reviews the AI-generated section on competitive therapies, something catches her eye. The AI cited a 2023 study showing a 78% efficacy rate for a competing drug. That seems high. Amara pulls up the actual paper.
                </p>
                <p>
                  The study showed 78% efficacy... <em>in mice</em>. Human trials were only at 42%. The AI didn't lie, but it presented the number without crucial context. If this had made it into the grant proposal, it would have undermined their entire competitive advantage argument.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  Amara caught it this time. But what else might she have missed?
                </p>
              </div>
            </div>

            {/* The Core Challenge */}
            <h2>The Core Challenge</h2>
            <p>
              AI outputs are fast, fluent, and often very good. This creates a dangerous illusion: <strong>it sounds right, so it must be right.</strong>
            </p>
            <p>
              But AI can be:
            </p>
            <ul>
              <li><strong>Factually wrong</strong> (hallucinations, outdated info)</li>
              <li><strong>Contextually misleading</strong> (true facts, wrong framing)</li>
              <li><strong>Strategically misaligned</strong> (technically correct, but not what you actually need)</li>
              <li><strong>Subtly biased</strong> (patterns from training data you didn't intend)</li>
            </ul>

            <div className="not-prose my-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="font-bold text-red-400 mb-2">The Trust Trap</p>
              <p className="text-sm text-[var(--text-secondary)]">
                The better you get at using AI, the more you trust it. The more you trust it, the less you verify. The less you verify, the more likely something critical slips through.
              </p>
            </div>

            <p>
              You need a systematic QA approach — patterns that let you move fast while staying rigorous.
            </p>

            {/* The 3-Tier Verification System */}
            <h2>The 3-Tier Verification System</h2>
            <p>
              Not all AI outputs need the same level of scrutiny. The key is matching verification intensity to stakes and risk.
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheckIcon />
                <h3 className="text-xl font-bold">Tier 1: Spot Check (Low Stakes)</h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                For drafts, brainstorms, internal notes — work that won't leave your desk yet.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 text-id8-orange" />
                  <p className="text-sm">Does it pass the "sniff test"? Sound generally reasonable?</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 text-id8-orange" />
                  <p className="text-sm">Any obvious factual errors or logical gaps?</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 text-id8-orange" />
                  <p className="text-sm">Does it match what you asked for?</p>
                </div>
              </div>
              <p className="text-xs font-mono bg-[var(--bg-primary)] p-3 rounded mt-4">
                Time: 2-5 minutes per output
              </p>
            </div>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheckIcon />
                <h3 className="text-xl font-bold">Tier 2: Structured Review (Medium Stakes)</h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                For client deliverables, team presentations, published content — work others will see.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 text-id8-orange" />
                  <p className="text-sm">Fact-check key claims (especially numbers and citations)</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 text-id8-orange" />
                  <p className="text-sm">Verify tone and framing match your standards</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 text-id8-orange" />
                  <p className="text-sm">Run the "Would I sign my name to this?" test</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 text-id8-orange" />
                  <p className="text-sm">Check for missing context or nuance</p>
                </div>
              </div>
              <p className="text-xs font-mono bg-[var(--bg-primary)] p-3 rounded mt-4">
                Time: 10-20 minutes per output
              </p>
            </div>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheckIcon />
                <h3 className="text-xl font-bold">Tier 3: Full Validation (High Stakes)</h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                For legal documents, regulatory submissions, financial analysis, public statements — work with real consequences.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 text-id8-orange" />
                  <p className="text-sm">Verify EVERY factual claim against primary sources</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 text-id8-orange" />
                  <p className="text-sm">Cross-reference with domain experts</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 text-id8-orange" />
                  <p className="text-sm">Test for edge cases and unintended implications</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 text-id8-orange" />
                  <p className="text-sm">Run adversarial review: "How could this be wrong or misinterpreted?"</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckIcon className="flex-shrink-0 mt-0.5 text-id8-orange" />
                  <p className="text-sm">Document your verification process</p>
                </div>
              </div>
              <p className="text-xs font-mono bg-[var(--bg-primary)] p-3 rounded mt-4">
                Time: 30-60+ minutes per output
              </p>
            </div>

            {/* The Red Flag Checklist */}
            <h2>The Red Flag Checklist</h2>
            <p>
              Certain patterns in AI output should trigger immediate deeper verification:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4 text-id8-orange">Red Flag</th>
                    <th className="text-left py-3 px-4 text-id8-orange">Why It Matters</th>
                    <th className="text-left py-3 px-4 text-id8-orange">How to Verify</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-semibold">Specific numbers or statistics</td>
                    <td className="py-3 px-4">Easy to hallucinate, hard to spot</td>
                    <td className="py-3 px-4">Check original source directly</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-semibold">Recent events (post-training cutoff)</td>
                    <td className="py-3 px-4">AI can't know what happened after its training</td>
                    <td className="py-3 px-4">Independent research for anything time-sensitive</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-semibold">Legal or medical advice</td>
                    <td className="py-3 px-4">Liability and safety risks</td>
                    <td className="py-3 px-4">Always validate with licensed professional</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-semibold">Absolute statements ("always," "never")</td>
                    <td className="py-3 px-4">Oversimplification or missing nuance</td>
                    <td className="py-3 px-4">Look for exceptions and edge cases</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">Citations you can't access</td>
                    <td className="py-3 px-4">Could be fabricated references</td>
                    <td className="py-3 px-4">Verify the source exists and says what AI claims</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Using AI to QA AI */}
            <h2>Using AI to QA AI</h2>
            <p>
              One powerful technique: <strong>Use AI to verify its own work.</strong> This doesn't replace human review, but it catches many issues before you even look.
            </p>

            <div className="not-prose my-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg font-mono text-sm">
              <p className="text-green-400 mb-4">The Self-Critique Prompt:</p>
              <div className="text-[var(--text-secondary)] space-y-4 whitespace-pre-wrap">
{`You just generated the following content for me:

[paste AI output]

Now, critique it. What assumptions did you make? What could be wrong or misleading? What important context might be missing? Where should I fact-check?

Be brutally honest. I need to know where this might fail.`}
              </div>
            </div>

            <p>
              AI is often surprisingly good at identifying its own weaknesses — if you explicitly ask it to.
            </p>

            {/* The "Known Good" Comparison Method */}
            <h2>The "Known Good" Comparison Method</h2>
            <p>
              For recurring work types (reports, analysis, proposals), create reference examples of your best work. Then use them as benchmarks.
            </p>

            <div className="not-prose my-8 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg font-mono text-sm">
              <p className="text-[var(--text-primary)] mb-4">The Comparison Prompt:</p>
              <div className="text-[var(--text-secondary)] space-y-3 whitespace-pre-wrap">
{`Here's a report I wrote last quarter that represents my quality standard:

[paste your reference example]

Now here's the AI-generated draft for this quarter:

[paste AI output]

Compare them. Does the new version match the quality, depth, and specificity of the reference? What's missing or different? Where does it fall short?`}
              </div>
            </div>

            <p>
              This helps you calibrate quality expectations and catch when AI output is "good enough" versus "actually good."
            </p>

            {/* Building Your QA Checklist */}
            <h2>Building Your QA Checklist</h2>
            <p>
              The most effective QA happens when you have a pre-defined checklist for your specific work type. Here's how to build one:
            </p>

            <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold mb-3">For Strategic Documents</p>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>☐ Verify all competitive data</li>
                  <li>☐ Check market size claims</li>
                  <li>☐ Validate assumptions explicitly</li>
                  <li>☐ Test logic of recommendations</li>
                  <li>☐ Ensure strategic coherence</li>
                </ul>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold mb-3">For Technical Content</p>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>☐ Verify technical accuracy</li>
                  <li>☐ Check version/compatibility info</li>
                  <li>☐ Test code examples (if any)</li>
                  <li>☐ Validate against docs</li>
                  <li>☐ Ensure current best practices</li>
                </ul>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold mb-3">For Client Communications</p>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>☐ Tone matches relationship</li>
                  <li>☐ No overpromising</li>
                  <li>☐ Timelines are realistic</li>
                  <li>☐ Addresses their actual concern</li>
                  <li>☐ Clear next steps</li>
                </ul>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold mb-3">For Research/Analysis</p>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>☐ Sources are credible</li>
                  <li>☐ Data is current</li>
                  <li>☐ Stats have proper context</li>
                  <li>☐ Methodology is sound</li>
                  <li>☐ Conclusions follow from data</li>
                </ul>
              </div>
            </div>

            {/* When to Reject AI Output Entirely */}
            <h2>When to Reject AI Output Entirely</h2>
            <p>
              Sometimes the right answer isn't "fix it" — it's "start over." Here's when to reject AI output and try a different approach:
            </p>

            <ul>
              <li><strong>Multiple factual errors:</strong> If you're catching several mistakes, there are likely more you're missing.</li>
              <li><strong>Wrong conceptual framing:</strong> If AI fundamentally misunderstood the task, editing won't fix it.</li>
              <li><strong>Generic when you need specific:</strong> If it reads like a template instead of addressing your exact situation.</li>
              <li><strong>Missing your voice:</strong> If it would take longer to rewrite it in your style than to write from scratch.</li>
              <li><strong>Trust your gut:</strong> If something feels off but you can't pinpoint why, don't ship it.</li>
            </ul>

            <div className="not-prose my-8 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
              <p className="text-sm italic text-[var(--text-secondary)]">
                Remember: AI is here to accelerate your work, not replace your judgment. If reviewing and fixing the output takes longer than doing it yourself, that's data. Adjust your approach.
              </p>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Your Personal QA Checklist</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 45 minutes<br />
                <strong>You'll need:</strong> Recent AI outputs you've used + examples of your best work
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Categorize Your Work (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">List the 3-5 types of work you most commonly use AI for. Categorize by stakes (low/medium/high).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Identify Past Failures (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Review past AI outputs. Where have you caught errors? What patterns do you see?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Build Work-Type Checklists (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For each work type, create 5-7 specific verification points. Make them actionable.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Test Your Checklist (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Apply it to a recent AI output. Did it catch issues? Anything missing?</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-xs font-mono text-id8-orange mb-2">DELIVERABLE</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  A one-page QA Checklist document with work types, stakes levels, and specific verification steps. Keep this accessible for every AI session.
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
                  "AI fluency creates a dangerous illusion — just because it sounds right doesn't mean it is right.",
                  "Use the 3-Tier Verification System: match your QA intensity to the stakes (Spot Check / Structured Review / Full Validation).",
                  "Certain patterns trigger mandatory deeper review: specific numbers, recent events, legal/medical content, absolute statements, and inaccessible citations.",
                  "Use AI to QA AI — self-critique prompts catch many issues before you review, but never replace human judgment for high-stakes work.",
                  "Build work-type-specific QA checklists based on your actual failure patterns — generic verification misses domain-specific risks."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-id8-orange flex-shrink-0 mt-0.5"><CheckIcon /></span>
                    <span className="text-[var(--text-primary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Closing Story */}
            <p className="italic text-[var(--text-secondary)] border-l-2 border-id8-orange pl-4">
              Amara now runs every AI-generated section through her QA checklist before it goes into any grant proposal. She caught two more subtle errors in the next submission. The grant was approved. But more importantly, she sleeps better knowing her verification process is solid.
            </p>

          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Link
                href="/academy/ai-partner-mastery/module-5"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: Complex Problem Decomposition
              </Link>
              <Link
                href="/academy/ai-partner-mastery/module-7"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Workflow Integration
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
