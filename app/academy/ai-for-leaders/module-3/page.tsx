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

export default function Module3Page() {
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
                href="/academy/ai-for-leaders"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to AI for Leaders
              </Link>
            </m.div>

            <m.div variants={fadeUp}>
              <CourseProgress
                currentModule={3}
                totalModules={8}
                courseTitle="AI for Leaders"
              />
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                Module 3
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                45 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              The Build/Buy/Partner Decision
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "We've identified the use case. Now comes the decision that will shape everything: how do we actually implement this?"
            </m.p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">

            {/* The Strategic Choice */}
            <div className="not-prose mb-12 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                The Strategic Choice
              </h2>
              <h3 className="text-2xl font-bold mb-4">Why This Isn't Just a Technical Decision</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  You've validated your AI use case. You know it has value. Now comes the question that determines success or failure: how will you bring this to life?
                </p>
                <p>
                  Most leaders treat this as a procurement decision. It's not. The build/buy/partner choice fundamentally shapes your team structure, budget trajectory, risk profile, competitive positioning, and organizational learning.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module gives you a decision framework that accounts for all these factors — not just upfront cost.
                </p>
              </div>
            </div>

            {/* The Three Paths */}
            <h2>The Three Paths</h2>
            <p>
              Every AI implementation follows one of three strategies. Each has a specific risk-reward profile, timeline, and organizational impact.
            </p>

            <div className="not-prose grid md:grid-cols-3 gap-4 my-8">
              <div className="p-5 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="inline-block px-3 py-1 text-xs font-mono uppercase bg-blue-500/20 text-blue-400 rounded mb-3">
                  Build
                </div>
                <h4 className="font-bold text-lg mb-2">Custom Development</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Develop in-house with your team or a dedicated build partner
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">+</span>
                    <span className="text-[var(--text-secondary)]">Full control and customization</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">+</span>
                    <span className="text-[var(--text-secondary)]">Competitive differentiation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">+</span>
                    <span className="text-[var(--text-secondary)]">No vendor lock-in</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">-</span>
                    <span className="text-[var(--text-secondary)]">Longest time to value</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">-</span>
                    <span className="text-[var(--text-secondary)]">Highest upfront investment</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">-</span>
                    <span className="text-[var(--text-secondary)]">Requires specialized talent</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="inline-block px-3 py-1 text-xs font-mono uppercase bg-green-500/20 text-green-400 rounded mb-3">
                  Buy
                </div>
                <h4 className="font-bold text-lg mb-2">Off-the-Shelf Solution</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Purchase and configure an existing AI product or platform
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">+</span>
                    <span className="text-[var(--text-secondary)]">Fastest deployment</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">+</span>
                    <span className="text-[var(--text-secondary)]">Predictable costs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">+</span>
                    <span className="text-[var(--text-secondary)]">Proven, battle-tested</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">-</span>
                    <span className="text-[var(--text-secondary)]">Limited customization</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">-</span>
                    <span className="text-[var(--text-secondary)]">Vendor dependency</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">-</span>
                    <span className="text-[var(--text-secondary)]">No competitive advantage</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <div className="inline-block px-3 py-1 text-xs font-mono uppercase bg-purple-500/20 text-purple-400 rounded mb-3">
                  Partner
                </div>
                <h4 className="font-bold text-lg mb-2">Strategic Partnership</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Co-develop with a specialist who shares expertise and risk
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">+</span>
                    <span className="text-[var(--text-secondary)]">Access to deep expertise</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">+</span>
                    <span className="text-[var(--text-secondary)]">Shared risk and investment</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">+</span>
                    <span className="text-[var(--text-secondary)]">Custom + battle-tested</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">-</span>
                    <span className="text-[var(--text-secondary)]">Requires relationship mgmt</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">-</span>
                    <span className="text-[var(--text-secondary)]">Ongoing dependencies</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">-</span>
                    <span className="text-[var(--text-secondary)]">Alignment challenges</span>
                  </div>
                </div>
              </div>
            </div>

            <p>
              <strong>Critical insight:</strong> There is no universally "best" path. The right choice depends on your specific context — your capabilities, timeline, competitive position, and risk tolerance.
            </p>

            {/* Decision Matrix */}
            <h2>The Decision Matrix</h2>
            <p>
              Here's how each path performs across the key decision criteria:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Criteria</th>
                    <th className="text-left py-3 px-4 text-blue-400">Build</th>
                    <th className="text-left py-3 px-4 text-green-400">Buy</th>
                    <th className="text-left py-3 px-4 text-purple-400">Partner</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Time to Value</td>
                    <td className="py-3 px-4">6-18 months</td>
                    <td className="py-3 px-4">1-3 months</td>
                    <td className="py-3 px-4">3-9 months</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Upfront Cost</td>
                    <td className="py-3 px-4">$200K - $2M+</td>
                    <td className="py-3 px-4">$10K - $100K</td>
                    <td className="py-3 px-4">$50K - $500K</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Ongoing Cost</td>
                    <td className="py-3 px-4">High (team, infra)</td>
                    <td className="py-3 px-4">Medium (licenses)</td>
                    <td className="py-3 px-4">Medium-High (retainer)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Control</td>
                    <td className="py-3 px-4">Complete</td>
                    <td className="py-3 px-4">Limited</td>
                    <td className="py-3 px-4">Shared</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Expertise Required</td>
                    <td className="py-3 px-4">High</td>
                    <td className="py-3 px-4">Low</td>
                    <td className="py-3 px-4">Medium</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Implementation Risk</td>
                    <td className="py-3 px-4">High</td>
                    <td className="py-3 px-4">Low</td>
                    <td className="py-3 px-4">Medium</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Competitive Advantage</td>
                    <td className="py-3 px-4">High</td>
                    <td className="py-3 px-4">None</td>
                    <td className="py-3 px-4">Medium</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Organizational Learning</td>
                    <td className="py-3 px-4">Maximum</td>
                    <td className="py-3 px-4">Minimal</td>
                    <td className="py-3 px-4">High</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Notice the trade-off patterns: speed vs. control, cost predictability vs. competitive advantage, risk mitigation vs. organizational learning.
            </p>

            {/* Hidden Costs */}
            <h2>What Vendors Don't Tell You: The Hidden Costs</h2>
            <p>
              Every path has costs that don't appear in the initial proposal. Here's what to watch for:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertIcon />
                  <h4 className="font-bold text-red-400">BUILD: Hidden Costs</h4>
                </div>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span><strong>Talent Acquisition:</strong> AI engineers command premium salaries and are hard to recruit</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span><strong>Failed Experiments:</strong> Budget 30-40% of development time for approaches that won't work</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span><strong>Infrastructure Creep:</strong> GPU costs, MLOps tools, and monitoring stack add up fast</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span><strong>Maintenance Burden:</strong> Models degrade over time and require continuous retraining</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span><strong>Opportunity Cost:</strong> Your team is building infrastructure instead of features</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertIcon />
                  <h4 className="font-bold text-red-400">BUY: Hidden Costs</h4>
                </div>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span><strong>Integration Complexity:</strong> "Plug and play" rarely means what you think it means</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span><strong>Data Migration:</strong> Getting your data into vendor format is expensive and risky</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span><strong>Price Escalation:</strong> Per-user or per-transaction pricing scales painfully</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span><strong>Customization Charges:</strong> Every "small tweak" comes with a professional services fee</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span><strong>Exit Penalties:</strong> Vendor lock-in makes switching extremely costly</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertIcon />
                  <h4 className="font-bold text-red-400">PARTNER: Hidden Costs</h4>
                </div>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span><strong>Alignment Overhead:</strong> Coordinating across organizations takes time and energy</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span><strong>Knowledge Transfer Gaps:</strong> You don't own the expertise, creating ongoing dependency</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span><strong>Strategic Misalignment:</strong> Partner priorities can shift, leaving you exposed</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span><strong>IP Complications:</strong> Who owns the models, data, and improvements? Get this clear upfront.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">•</span>
                    <span><strong>Transition Risk:</strong> If the partnership ends, can you continue operating?</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Capability-Criticality Framework */}
            <h2>The Capability-Criticality Framework</h2>
            <p>
              The single most useful tool for making this decision: map each use case on two dimensions — <strong>your current capability</strong> and <strong>business criticality</strong>.
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="relative w-full aspect-square max-w-xl mx-auto">
                {/* Grid background */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-2">
                  {/* Low Capability / Low Criticality - BUY */}
                  <div className="bg-green-500/10 border border-green-500/30 rounded p-4 flex flex-col items-center justify-center text-center">
                    <div className="text-xs font-mono text-green-400 mb-2">BUY</div>
                    <div className="text-xs text-[var(--text-tertiary)]">Off-the-shelf solution</div>
                  </div>

                  {/* High Capability / Low Criticality - EXPERIMENT */}
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-4 flex flex-col items-center justify-center text-center">
                    <div className="text-xs font-mono text-yellow-400 mb-2">EXPERIMENT</div>
                    <div className="text-xs text-[var(--text-tertiary)]">Build internally to learn</div>
                  </div>

                  {/* Low Capability / High Criticality - PARTNER */}
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded p-4 flex flex-col items-center justify-center text-center">
                    <div className="text-xs font-mono text-purple-400 mb-2">PARTNER</div>
                    <div className="text-xs text-[var(--text-tertiary)]">Strategic partnership</div>
                  </div>

                  {/* High Capability / High Criticality - BUILD */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4 flex flex-col items-center justify-center text-center">
                    <div className="text-xs font-mono text-blue-400 mb-2">BUILD</div>
                    <div className="text-xs text-[var(--text-tertiary)]">Custom development</div>
                  </div>
                </div>

                {/* Axes */}
                <div className="absolute -bottom-8 left-0 right-0 text-center">
                  <div className="text-xs font-mono text-[var(--text-tertiary)]">
                    Your Capability →
                  </div>
                </div>
                <div className="absolute -left-24 top-0 bottom-0 flex items-center">
                  <div className="text-xs font-mono text-[var(--text-tertiary)] -rotate-90 whitespace-nowrap">
                    Business Criticality →
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-3 text-sm text-[var(--text-secondary)]">
                <p><strong className="text-green-400">BUY (Low/Low):</strong> Non-critical functions where you have no expertise. Use proven solutions.</p>
                <p><strong className="text-purple-400">PARTNER (Low/High):</strong> Critical functions where you lack capability. Get expert help fast.</p>
                <p><strong className="text-blue-400">BUILD (High/High):</strong> Core differentiators where you have strength. Invest for competitive advantage.</p>
                <p><strong className="text-yellow-400">EXPERIMENT (High/Low):</strong> Learning opportunities where failure is cheap. Build to develop capability.</p>
              </div>
            </div>

            {/* Real Examples */}
            <h2>Real-World Examples</h2>
            <p>
              Here's how three organizations made this decision for different use cases:
            </p>

            <div className="not-prose my-8 space-y-6">
              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold">Mid-Market SaaS Company</h4>
                  <span className="px-3 py-1 text-xs font-mono bg-green-500/20 text-green-400 rounded">BUY</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  <strong>Use Case:</strong> Customer support chatbot
                </p>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  <strong>Decision:</strong> Purchased Intercom's AI agent platform
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Reasoning:</strong> Customer support wasn't a competitive differentiator. They needed fast time-to-value and proven reliability. The off-the-shelf solution handled 60% of tier-1 tickets within 30 days. Building this would have taken 6 months and diverted engineering resources from product development.
                </p>
              </div>

              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold">Healthcare Analytics Startup</h4>
                  <span className="px-3 py-1 text-xs font-mono bg-blue-500/20 text-blue-400 rounded">BUILD</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  <strong>Use Case:</strong> Predictive patient risk scoring
                </p>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  <strong>Decision:</strong> Built custom ML models in-house
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Reasoning:</strong> This was their core product. They had deep domain expertise in healthcare and strong ML talent. The accuracy improvements from custom models directly translated to revenue. Generic solutions couldn't match the nuance their customers required. They allocated 40% of engineering to this initiative.
                </p>
              </div>

              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold">Regional Bank</h4>
                  <span className="px-3 py-1 text-xs font-mono bg-purple-500/20 text-purple-400 rounded">PARTNER</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  <strong>Use Case:</strong> Fraud detection system
                </p>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  <strong>Decision:</strong> Partnered with fraud detection specialist
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Reasoning:</strong> Fraud detection was business-critical but they lacked ML expertise. Off-the-shelf solutions were too generic for their regional patterns. A partner brought specialized fraud ML expertise, handled model updates as fraud patterns evolved, and shared implementation risk. The bank maintained control over decision thresholds and customer experience.
                </p>
              </div>
            </div>

            {/* Exercise Box */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Your Decision Framework</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 30 minutes<br />
                <strong>You'll need:</strong> Your validated AI use cases from Module 2
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Rate your capability (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For each use case, honestly assess: do you have the technical talent, data infrastructure, and domain expertise to build this? Rate 1-10.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Rate business criticality (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">How essential is this to your competitive position? How much would failure hurt? Rate 1-10.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Plot on the framework (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Place each use case in the 2x2 matrix. Where does it land? What does the framework recommend?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Apply hidden costs filter (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For your recommended path, list out 3-5 hidden costs specific to your situation. How do they change the calculus?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">5</span>
                  <div>
                    <p className="font-bold">Make your decision (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Commit to Build, Buy, or Partner for your highest-priority use case. Write down your reasoning in 3 sentences.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A decision matrix showing where each use case falls, the recommended path, and a one-paragraph justification that accounts for hidden costs and organizational context.
                </p>
              </div>
            </div>

            {/* Decision Rules of Thumb */}
            <h2>Decision Rules of Thumb</h2>
            <p>
              When in doubt, use these heuristics:
            </p>

            <div className="not-prose my-8 space-y-3">
              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange">
                <p className="text-sm"><strong>If you're resource-constrained:</strong> Default to Buy. Speed and predictability matter more than control.</p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange">
                <p className="text-sm"><strong>If you have strong technical teams:</strong> Build for differentiation, Partner for speed, Buy for commodity functions.</p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange">
                <p className="text-sm"><strong>If you're in a regulated industry:</strong> Partner or Build. You need control over data, models, and decision logic.</p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange">
                <p className="text-sm"><strong>If this is your first AI project:</strong> Buy or Partner. Learn before you build infrastructure.</p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange">
                <p className="text-sm"><strong>If your competitive moat depends on it:</strong> Build or Partner. Don't hand your advantage to a vendor selling the same tool to competitors.</p>
              </div>
            </div>

            {/* Common Mistakes */}
            <h2>Five Common Mistakes</h2>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #1</p>
                <p className="font-bold">"We'll build MVP then decide"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Reality: By the time you've built an MVP, you've already committed to Build. The switching cost is massive. Make the strategic choice before you write code.
                </p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #2</p>
                <p className="font-bold">"This vendor can do everything"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Reality: Platforms that claim to solve every AI use case are mediocre at most. Best-of-breed beats all-in-one for serious implementations.
                </p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #3</p>
                <p className="font-bold">"We need control, so we'll build"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Reality: Building gives you control over the code, not the outcome. If you lack expertise, building just gives you controlled failure.
                </p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #4</p>
                <p className="font-bold">"Partnerships are low-risk"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Reality: Bad partnerships are worse than bad vendors. Misaligned incentives, IP disputes, and dependency create lasting damage.
                </p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #5</p>
                <p className="font-bold">"We can always switch later"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Reality: Switching costs are higher than you think. Data migration, retraining users, workflow disruption — plan for a 3-year commitment minimum.
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
                  "Build/Buy/Partner isn't a procurement decision — it shapes your competitive position, team structure, and organizational learning.",
                  "The Capability-Criticality framework reveals the right path: Buy (low/low), Partner (low/high), Build (high/high), Experiment (high/low).",
                  "Every path has hidden costs. Account for talent, integration, alignment, and switching costs before you commit.",
                  "Default to Buy for commodity functions, Partner for critical gaps in expertise, Build for competitive differentiation.",
                  "Make the strategic choice before you build an MVP. Switching costs make early decisions sticky.",
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
              You've chosen your implementation path. Now comes the people question: who's going to make this happen? In the next module, we'll tackle team structure, roles, and the talent decisions that determine whether AI initiatives succeed or stall.
            </p>

            {/* Module Complete */}
            <ModuleComplete
              courseSlug="ai-for-leaders"
              moduleSlug="module-3"
              nextModulePath="/academy/ai-for-leaders/module-4"
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
                href="/academy/ai-for-leaders/module-2"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Module 2: Finding the Opportunities
              </Link>
              <Link
                href="/academy/ai-for-leaders/module-4"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Assembling Your Team
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
