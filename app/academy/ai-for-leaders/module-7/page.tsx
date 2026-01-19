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

const AlertIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)

export default function Module7Page() {
  return (
    <ModuleAnnotations courseSlug="ai-for-leaders" moduleSlug="module-7">
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
                currentModule={7}
                totalModules={8}
                courseTitle="AI for Leaders"
              />
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                Module 7
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                45 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Measuring AI ROI
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "We invested in AI six months ago. How do I know if it's actually working?"
            </m.p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">

            {/* The Measurement Problem */}
            <div className="not-prose mb-12 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                The Measurement Problem
              </h2>
              <h3 className="text-2xl font-bold mb-4">Why Traditional ROI Doesn't Work for AI</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Your CFO wants a number. Your board wants proof. Your team wants validation that the AI investment was worth it. But when you try to measure AI ROI the traditional way — dollars spent versus dollars saved — the numbers rarely tell the full story.
                </p>
                <p>
                  Here's why: AI creates value in ways that don't fit neatly into spreadsheets. A customer service bot might reduce ticket volume (measurable) while simultaneously improving response quality (harder to measure) and revealing product issues through pattern analysis (nearly impossible to quantify).
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  The organizations that succeed with AI measurement don't try to force it into old frameworks. They build new ones — tailored to how AI actually creates value.
                </p>
              </div>
            </div>

            {/* Why AI ROI is Hard */}
            <h2>The Three Challenges of AI ROI</h2>
            <p>
              Before we dive into solutions, let's acknowledge what makes AI measurement uniquely difficult:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Challenge #1: Time Horizons Don't Match</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Traditional ROI measures payback in quarters. AI value accrues over years. Early metrics look disappointing while teams are learning. Real gains emerge 6-12 months in, after adoption stabilizes and workflows adapt.
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Challenge #2: Value Is Distributed</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  AI rarely creates value in one place. It saves time for Sarah in marketing, improves accuracy for the finance team, and accelerates onboarding for new hires. Individually, each benefit is small. Collectively, they're transformative. But no single department "owns" the ROI.
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Challenge #3: Counterfactuals Are Impossible</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  You can't run a control group. Once AI is deployed, you can't measure what would have happened without it. You're comparing to a baseline that keeps shifting as markets, teams, and expectations evolve.
                </p>
              </div>
            </div>

            <p>
              These challenges don't mean AI ROI is unmeasurable — they mean you need a framework designed for how AI actually works.
            </p>

            {/* Leading vs Lagging Indicators */}
            <h2>Leading vs Lagging Indicators</h2>
            <p>
              The secret to AI measurement is tracking both leading indicators (early signals) and lagging indicators (financial outcomes). Most organizations focus only on lagging metrics, then wonder why they can't course-correct before it's too late.
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4 text-blue-400">Leading Indicators</th>
                    <th className="text-left py-3 px-4 text-[var(--text-tertiary)]">What They Tell You</th>
                    <th className="text-left py-3 px-4 text-green-400">Lagging Indicators</th>
                    <th className="text-left py-3 px-4 text-[var(--text-tertiary)]">What They Tell You</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Adoption Rate</td>
                    <td className="py-3 px-4">Are people actually using it?</td>
                    <td className="py-3 px-4 font-bold">Revenue Impact</td>
                    <td className="py-3 px-4">Did it affect the bottom line?</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">User Satisfaction</td>
                    <td className="py-3 px-4">Do they find it valuable?</td>
                    <td className="py-3 px-4 font-bold">Cost Reduction</td>
                    <td className="py-3 px-4">Did expenses go down?</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Time Saved per Task</td>
                    <td className="py-3 px-4">Is it making work faster?</td>
                    <td className="py-3 px-4 font-bold">Market Share</td>
                    <td className="py-3 px-4">Did competitive position improve?</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Error Rate</td>
                    <td className="py-3 px-4">Is quality improving?</td>
                    <td className="py-3 px-4 font-bold">Customer Retention</td>
                    <td className="py-3 px-4">Are customers staying longer?</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Frequency of Use</td>
                    <td className="py-3 px-4">Is it becoming a habit?</td>
                    <td className="py-3 px-4 font-bold">Productivity per Employee</td>
                    <td className="py-3 px-4">Did output increase?</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong>Rule of thumb:</strong> If your leading indicators are trending up (high adoption, high satisfaction, measurable time savings), lagging indicators will eventually follow. If leading indicators are flat or declining, no amount of waiting will produce financial ROI.
            </p>

            {/* ROI by Value Zone */}
            <h2>ROI by Value Zone</h2>
            <p>
              Remember the three value zones from Module 2? Each zone requires different metrics. Don't measure an Efficiency Zone project with Experience Zone KPIs — you'll miss the point entirely.
            </p>

            <div className="not-prose my-8 space-y-6">
              {/* Efficiency Zone */}
              <div className="p-5 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">⚡</span>
                  <h4 className="font-bold text-blue-400">Efficiency Zone Metrics</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Goal: Do the same work faster, cheaper, or with fewer errors.
                </p>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">Time Saved</p>
                    <p className="text-[var(--text-tertiary)]">Hours per week, per user</p>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">Error Reduction</p>
                    <p className="text-[var(--text-tertiary)]">% decrease in mistakes</p>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">Throughput</p>
                    <p className="text-[var(--text-tertiary)]">Tasks completed per day</p>
                  </div>
                </div>
              </div>

              {/* Intelligence Zone */}
              <div className="p-5 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🧠</span>
                  <h4 className="font-bold text-purple-400">Intelligence Zone Metrics</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Goal: Make better decisions with better information.
                </p>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">Decision Quality</p>
                    <p className="text-[var(--text-tertiary)]">Outcome accuracy vs baseline</p>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">Forecast Accuracy</p>
                    <p className="text-[var(--text-tertiary)]">Prediction error rate</p>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">Insight Discovery</p>
                    <p className="text-[var(--text-tertiary)]">New patterns found per month</p>
                  </div>
                </div>
              </div>

              {/* Experience Zone */}
              <div className="p-5 bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">✨</span>
                  <h4 className="font-bold text-green-400">Experience Zone Metrics</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Goal: Create better experiences for customers or employees.
                </p>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">NPS / CSAT</p>
                    <p className="text-[var(--text-tertiary)]">Net Promoter Score change</p>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">Retention Rate</p>
                    <p className="text-[var(--text-tertiary)]">Customer/employee churn</p>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">Conversion Rate</p>
                    <p className="text-[var(--text-tertiary)]">% completing desired action</p>
                  </div>
                </div>
              </div>
            </div>

            <p>
              <strong>Pro tip:</strong> Most successful AI projects touch multiple zones. An AI-powered support tool might start in the Efficiency Zone (faster ticket resolution) but create Experience Zone value (happier customers) and Intelligence Zone insights (product improvement signals).
            </p>

            {/* The Attribution Challenge */}
            <h2>The Attribution Challenge</h2>
            <p>
              Your AI chatbot launched in Q2. Revenue increased 12% in Q3. Can you claim the chatbot drove that growth? Maybe. Maybe not. Here's how to isolate AI's actual contribution:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Method #1: A/B Testing</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Split users into control (no AI) and treatment (with AI) groups. Compare outcomes.
                </p>
                <p className="text-xs text-[var(--text-tertiary)] italic">
                  Best for: Customer-facing features where you can randomize exposure
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Method #2: Before/After Comparison</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Measure performance 90 days before AI, 90 days after AI. Control for seasonality and other variables.
                </p>
                <p className="text-xs text-[var(--text-tertiary)] italic">
                  Best for: Internal tools where A/B testing isn't practical
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Method #3: Cohort Analysis</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Compare teams/regions that adopted AI early vs late. Did early adopters see different outcomes?
                </p>
                <p className="text-xs text-[var(--text-tertiary)] italic">
                  Best for: Phased rollouts where adoption varies by group
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Method #4: Regression Analysis</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Model the relationship between AI usage intensity and outcomes. How much does each additional hour of AI use correlate with productivity?
                </p>
                <p className="text-xs text-[var(--text-tertiary)] italic">
                  Best for: Mature deployments with rich usage data
                </p>
              </div>
            </div>

            <p>
              The gold standard is Method #1 (A/B testing). But it's not always feasible. Methods #2-4 are better than guessing, as long as you're transparent about their limitations.
            </p>

            {/* Dashboard Template */}
            <h2>Essential Metrics by Use Case</h2>
            <p>
              Here's a practical starting point: the core metrics you should track for common AI use cases. Adapt these to your specific context.
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Use Case</th>
                    <th className="text-left py-3 px-4">Primary Metric</th>
                    <th className="text-left py-3 px-4">Secondary Metrics</th>
                    <th className="text-left py-3 px-4">Warning Signals</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Content Generation</td>
                    <td className="py-3 px-4">Time to first draft</td>
                    <td className="py-3 px-4">Edit cycles, publish rate</td>
                    <td className="py-3 px-4">Quality scores declining</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Customer Support Bot</td>
                    <td className="py-3 px-4">Resolution rate (no human)</td>
                    <td className="py-3 px-4">CSAT, time to resolution</td>
                    <td className="py-3 px-4">Escalation rate rising</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Sales Intelligence</td>
                    <td className="py-3 px-4">Lead conversion rate</td>
                    <td className="py-3 px-4">Time in funnel, deal size</td>
                    <td className="py-3 px-4">Reps ignoring recommendations</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Document Analysis</td>
                    <td className="py-3 px-4">Processing time per doc</td>
                    <td className="py-3 px-4">Accuracy rate, volume handled</td>
                    <td className="py-3 px-4">Error rate above 5%</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Predictive Analytics</td>
                    <td className="py-3 px-4">Forecast accuracy (MAPE)</td>
                    <td className="py-3 px-4">Confidence intervals, update frequency</td>
                    <td className="py-3 px-4">Predictions ignored by team</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Code Assistance</td>
                    <td className="py-3 px-4">Suggestions accepted (%)</td>
                    <td className="py-3 px-4">Lines written/day, bug rate</td>
                    <td className="py-3 px-4">Developers disabling tool</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Notice the "Warning Signals" column. These behavioral indicators often predict ROI problems before financial metrics show it.
            </p>

            {/* Common Measurement Mistakes */}
            <h2>Five Measurement Mistakes That Destroy Trust</h2>
            <p>
              These mistakes are common, avoidable, and deadly to AI credibility:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertIcon />
                  <div>
                    <p className="font-mono text-sm text-red-400 mb-1">Mistake #1</p>
                    <p className="font-bold">Tracking Vanity Metrics</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                      Celebrating "10,000 AI interactions!" when what matters is whether those interactions created value. High usage of a bad tool is not success.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertIcon />
                  <div>
                    <p className="font-mono text-sm text-red-400 mb-1">Mistake #2</p>
                    <p className="font-bold">Using the Wrong Baseline</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                      Comparing AI performance to your slowest manual process instead of your current optimized workflow. This inflates ROI and sets false expectations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertIcon />
                  <div>
                    <p className="font-mono text-sm text-red-400 mb-1">Mistake #3</p>
                    <p className="font-bold">Measuring Too Early</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                      Declaring failure (or success) in week 2. AI ROI requires a 90-day minimum before meaningful patterns emerge. Patience is required.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertIcon />
                  <div>
                    <p className="font-mono text-sm text-red-400 mb-1">Mistake #4</p>
                    <p className="font-bold">Ignoring Qualitative Benefits</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                      "We can't measure morale improvement, so we won't count it." Some of AI's biggest wins — reduced burnout, faster onboarding, better decision confidence — don't fit in spreadsheets. Acknowledge them anyway.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertIcon />
                  <div>
                    <p className="font-mono text-sm text-red-400 mb-1">Mistake #5</p>
                    <p className="font-bold">Forgetting Total Cost</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                      Calculating ROI on subscription cost alone, ignoring implementation time, training, integration work, and ongoing maintenance. True cost is 3-5x the sticker price.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Total Cost Equation */}
            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h3 className="text-lg font-bold mb-4">The True Cost of AI (First Year)</h3>
              <div className="space-y-2 text-sm text-[var(--text-secondary)] font-mono">
                <div className="flex justify-between border-b border-[var(--border)] pb-2">
                  <span>Tool subscription/licensing</span>
                  <span className="text-[var(--text-primary)]">$X</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border)] pb-2">
                  <span>Integration & setup (hours × rate)</span>
                  <span className="text-[var(--text-primary)]">+ $Y</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border)] pb-2">
                  <span>Training & change management</span>
                  <span className="text-[var(--text-primary)]">+ $Z</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border)] pb-2">
                  <span>Lost productivity during ramp-up</span>
                  <span className="text-[var(--text-primary)]">+ $A</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border)] pb-2">
                  <span>Ongoing maintenance & monitoring</span>
                  <span className="text-[var(--text-primary)]">+ $B</span>
                </div>
                <div className="flex justify-between pt-2 font-bold">
                  <span className="text-[var(--text-primary)]">True First-Year Cost</span>
                  <span className="text-id8-orange">= Total</span>
                </div>
              </div>
              <p className="text-xs text-[var(--text-tertiary)] mt-4 italic">
                Rule of thumb: If the tool costs $50K/year, budget $150-250K total for year one when you include all hidden costs.
              </p>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Your AI KPIs</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 20 minutes<br />
                <strong>You'll need:</strong> One AI use case you're measuring (or planning to)
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Identify the Value Zone (3 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Is this primarily Efficiency, Intelligence, or Experience? This determines which metrics matter most.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Choose 1 Primary, 2 Secondary Metrics (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Don't track everything. Pick what matters most. Use the dashboard template above as a starting point.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Define Your Baseline (4 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">What's the current state? Write down actual numbers, not estimates. If you don't have them, commit to gathering them before launch.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Set Success Thresholds (4 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">What improvement would make this worthwhile? Be realistic. A 15% efficiency gain is excellent. Don't promise 10x unless you have extraordinary evidence.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">5</span>
                  <div>
                    <p className="font-bold">Choose Your Attribution Method (4 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Can you A/B test? Run before/after? Use cohorts? Pick one method and commit to it. Imperfect measurement is better than no measurement.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A one-page measurement plan that specifies exactly what you'll track, how you'll track it, and what success looks like. Share this with stakeholders before launch.
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
                  "Traditional ROI frameworks fail for AI because value is distributed, time horizons don't match, and counterfactuals are impossible.",
                  "Track leading indicators (adoption, satisfaction, time saved) to predict lagging indicators (revenue, cost, retention) before it's too late to course-correct.",
                  "Different value zones require different metrics. Don't measure an Efficiency project with Experience KPIs.",
                  "Use A/B testing when possible, before/after comparisons when not. Imperfect attribution beats guessing.",
                  "True cost is 3-5x subscription price. Factor in integration, training, productivity loss, and ongoing maintenance.",
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
              You now have a measurement framework that actually works for AI. In the next module, we'll shift from metrics to people — how to lead the organizational change that makes AI adoption successful.
            </p>

            {/* Module Complete */}
            <ModuleComplete
              courseSlug="ai-for-leaders"
              moduleSlug="module-7"
              nextModulePath="/academy/ai-for-leaders/module-8"
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
                href="/academy/ai-for-leaders/module-6"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Module 6: Managing AI Risk
              </Link>
              <Link
                href="/academy/ai-for-leaders/module-8"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Leading the Change
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
