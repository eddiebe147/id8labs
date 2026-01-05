'use client'

import { m } from '@/components/motion'
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
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

const MapIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" y1="3" x2="9" y2="18"/>
    <line x1="15" y1="6" x2="15" y2="21"/>
  </svg>
)

export default function Module2Page() {
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

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                Module 2
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                60 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Finding the Opportunities
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "I see the potential everywhere. I need a framework to identify where AI creates the most value."
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">

            {/* The Challenge */}
            <div className="not-prose mb-12 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                The Challenge
              </h2>
              <h3 className="text-2xl font-bold mb-4">Every Department Has Ideas. Not All Are Worth Pursuing.</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  You now understand what AI can do. The next question is: where should you apply it? In a typical organization, there are hundreds of potential use cases. Most will produce marginal gains. A few will transform outcomes.
                </p>
                <p>
                  Your job as a leader isn't to say yes to every AI pitch. It's to identify the opportunities where AI creates disproportionate value — where the impact justifies the investment, the risk, and the organizational change required.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module gives you a systematic framework to find those opportunities. By the end, you'll have a prioritized map of where AI can create real value in your organization.
                </p>
              </div>
            </div>

            {/* The Value Zones */}
            <h2>The Four Value Zones</h2>
            <p>
              AI creates value in four distinct areas. Every opportunity falls into one of these zones:
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
              {[
                {
                  icon: "💰",
                  zone: "COST REDUCTION",
                  desc: "Doing the same thing cheaper",
                  question: "Where are we spending time/money on repetitive work?",
                  example: "Automating invoice processing saves 40 hours/week"
                },
                {
                  icon: "📈",
                  zone: "REVENUE GROWTH",
                  desc: "Generating more value from existing assets",
                  question: "Where could we serve more customers or increase conversion?",
                  example: "Personalized recommendations increase average order value 18%"
                },
                {
                  icon: "⚡",
                  zone: "SPEED TO MARKET",
                  desc: "Compressing time-to-value",
                  question: "Where are delays costing us opportunities?",
                  example: "AI-assisted design cuts product iteration time from weeks to days"
                },
                {
                  icon: "🎯",
                  zone: "DECISION QUALITY",
                  desc: "Making better choices with better data",
                  question: "Where are we making decisions with incomplete information?",
                  example: "Predictive analytics reduce inventory stockouts by 35%"
                },
              ].map((item, i) => (
                <div key={i} className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <span className="text-3xl">{item.icon}</span>
                  <h4 className="font-bold mt-3 text-id8-orange text-sm">{item.zone}</h4>
                  <p className="text-sm text-[var(--text-primary)] mt-2 font-medium">{item.desc}</p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-3 italic">{item.question}</p>
                  <p className="text-xs text-green-400 mt-2 bg-green-400/10 p-2 rounded border border-green-400/20">{item.example}</p>
                </div>
              ))}
            </div>

            <p>
              <strong>Key insight:</strong> The best opportunities deliver value across multiple zones simultaneously. An AI system that speeds up customer support (Speed) while reducing support costs (Cost) is exponentially more valuable than one that only does one.
            </p>

            {/* Cost Reduction vs Revenue Growth */}
            <h2>Cost Reduction vs Revenue Growth: The Strategic Trade-off</h2>
            <p>
              Most organizations default to cost reduction use cases because they're easier to measure and justify. But revenue growth opportunities often create more value:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Dimension</th>
                    <th className="text-left py-3 px-4 text-blue-400">Cost Reduction</th>
                    <th className="text-left py-3 px-4 text-green-400">Revenue Growth</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">ROI Timeline</td>
                    <td className="py-3 px-4">Fast (3-6 months)</td>
                    <td className="py-3 px-4">Slower (6-18 months)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Measurement</td>
                    <td className="py-3 px-4">Direct, quantifiable</td>
                    <td className="py-3 px-4">Indirect, requires attribution</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Risk Profile</td>
                    <td className="py-3 px-4">Lower (internal process)</td>
                    <td className="py-3 px-4">Higher (customer-facing)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Ceiling</td>
                    <td className="py-3 px-4">Limited (can only reduce costs to zero)</td>
                    <td className="py-3 px-4">Unlimited (can grow indefinitely)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Stakeholder Impact</td>
                    <td className="py-3 px-4">Internal teams</td>
                    <td className="py-3 px-4">External customers</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Strategic Value</td>
                    <td className="py-3 px-4">Operational efficiency</td>
                    <td className="py-3 px-4">Competitive differentiation</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong>Strategic recommendation:</strong> Start with cost reduction to build confidence and free up resources. Graduate to revenue growth as your team gains AI fluency. The organizations that win long-term do both.
            </p>

            {/* Process Automation vs Decision Augmentation */}
            <h2>Process Automation vs Decision Augmentation: The Capability Spectrum</h2>
            <p>
              Within each value zone, AI can either automate existing processes or augment human decision-making. These require different implementations:
            </p>

            <div className="not-prose my-8 grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                <h3 className="text-lg font-bold mb-3 text-id8-orange">Process Automation</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  AI executes predefined workflows without human intervention
                </p>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-bold text-[var(--text-primary)] mb-1">Best for:</p>
                    <ul className="text-[var(--text-tertiary)] space-y-1 text-xs">
                      <li>• High-volume, low-complexity tasks</li>
                      <li>• Well-defined rules and criteria</li>
                      <li>• Low cost of errors</li>
                      <li>• Consistent data inputs</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold text-[var(--text-primary)] mb-1">Examples:</p>
                    <ul className="text-[var(--text-tertiary)] space-y-1 text-xs">
                      <li>• Automated data entry</li>
                      <li>• Email categorization</li>
                      <li>• Invoice processing</li>
                      <li>• Report generation</li>
                    </ul>
                  </div>

                  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                    <p className="text-xs text-blue-400">
                      <strong>Key Metric:</strong> Time saved per transaction
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                <h3 className="text-lg font-bold mb-3 text-id8-orange">Decision Augmentation</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  AI provides insights to help humans make better decisions
                </p>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-bold text-[var(--text-primary)] mb-1">Best for:</p>
                    <ul className="text-[var(--text-tertiary)] space-y-1 text-xs">
                      <li>• Complex, judgment-based decisions</li>
                      <li>• High stakes or uncertainty</li>
                      <li>• Pattern detection at scale</li>
                      <li>• Strategic planning</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-bold text-[var(--text-primary)] mb-1">Examples:</p>
                    <ul className="text-[var(--text-tertiary)] space-y-1 text-xs">
                      <li>• Sales forecasting</li>
                      <li>• Risk assessment</li>
                      <li>• Customer churn prediction</li>
                      <li>• Market opportunity analysis</li>
                    </ul>
                  </div>

                  <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded">
                    <p className="text-xs text-green-400">
                      <strong>Key Metric:</strong> Quality improvement in outcomes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p>
              <strong>Most successful implementations combine both.</strong> For example: AI automates initial customer support triage (automation) while surfacing customer sentiment trends to leadership (augmentation).
            </p>

            {/* Industry-Specific Use Case Mapping */}
            <h2>Industry-Specific Use Case Mapping</h2>
            <p>
              While AI capabilities are universal, application patterns vary by industry. Here are the highest-value opportunities by sector:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Financial Services</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-[var(--text-tertiary)] text-xs mb-1">Cost Reduction:</p>
                    <p className="text-[var(--text-secondary)]">Claims processing automation, fraud detection</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] text-xs mb-1">Revenue Growth:</p>
                    <p className="text-[var(--text-secondary)]">Personalized product recommendations, churn prediction</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Healthcare</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-[var(--text-tertiary)] text-xs mb-1">Cost Reduction:</p>
                    <p className="text-[var(--text-secondary)]">Administrative workflow automation, documentation</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] text-xs mb-1">Decision Quality:</p>
                    <p className="text-[var(--text-secondary)]">Diagnostic support, treatment optimization</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Retail & E-commerce</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-[var(--text-tertiary)] text-xs mb-1">Revenue Growth:</p>
                    <p className="text-[var(--text-secondary)]">Dynamic pricing, personalization engines</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] text-xs mb-1">Decision Quality:</p>
                    <p className="text-[var(--text-secondary)]">Inventory optimization, demand forecasting</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Manufacturing</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-[var(--text-tertiary)] text-xs mb-1">Cost Reduction:</p>
                    <p className="text-[var(--text-secondary)]">Predictive maintenance, quality control automation</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] text-xs mb-1">Speed to Market:</p>
                    <p className="text-[var(--text-secondary)]">Supply chain optimization, production scheduling</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Professional Services</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-[var(--text-tertiary)] text-xs mb-1">Cost Reduction:</p>
                    <p className="text-[var(--text-secondary)]">Document review, contract analysis</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] text-xs mb-1">Decision Augmentation:</p>
                    <p className="text-[var(--text-secondary)]">Research synthesis, precedent analysis</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Marketing & Media</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-[var(--text-tertiary)] text-xs mb-1">Speed to Market:</p>
                    <p className="text-[var(--text-secondary)]">Content generation, creative variation testing</p>
                  </div>
                  <div>
                    <p className="text-[var(--text-tertiary)] text-xs mb-1">Revenue Growth:</p>
                    <p className="text-[var(--text-secondary)]">Audience segmentation, campaign optimization</p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Opportunity Scoring Framework */}
            <h2>The Opportunity Scoring Framework</h2>
            <p>
              Not all opportunities are created equal. Use this framework to prioritize:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Criteria</th>
                    <th className="text-left py-3 px-4">Score 1-5</th>
                    <th className="text-left py-3 px-4">What to Look For</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Impact</td>
                    <td className="py-3 px-4">1 = Marginal<br/>5 = Transformative</td>
                    <td className="py-3 px-4">Will this materially affect key business metrics?</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Feasibility</td>
                    <td className="py-3 px-4">1 = Very hard<br/>5 = Easy</td>
                    <td className="py-3 px-4">Do we have the data, tools, and expertise?</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Speed</td>
                    <td className="py-3 px-4">1 = 12+ months<br/>5 = &lt;3 months</td>
                    <td className="py-3 px-4">How quickly can we see results?</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Risk</td>
                    <td className="py-3 px-4">1 = High risk<br/>5 = Low risk</td>
                    <td className="py-3 px-4">What's the downside if it fails?</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Strategic Fit</td>
                    <td className="py-3 px-4">1 = Off strategy<br/>5 = Core priority</td>
                    <td className="py-3 px-4">Does this align with our 3-year roadmap?</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong>How to use this:</strong> Score each opportunity 1-5 on each criterion. Multiply Impact × 2 for weighted scoring. Opportunities scoring 18+ are "high priority," 12-17 are "medium," below 12 are "low." Focus on high-priority opportunities first.
            </p>

            {/* Red Flags */}
            <h2>Red Flags: When to Say No</h2>
            <p>
              Some opportunities look good on paper but are traps. Watch for these warning signs:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Red Flag #1</p>
                <p className="font-bold">"We need AI to compete"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: FOMO-driven projects rarely succeed. Define the specific problem AI solves, not just "keeping up."</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Red Flag #2</p>
                <p className="font-bold">"This will eliminate the need for [entire department]"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: Massive displacement is rare and politically toxic. Focus on augmentation, not replacement.</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Red Flag #3</p>
                <p className="font-bold">"We can solve this once we clean up our data"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: Data cleanup projects take years and rarely finish. Find opportunities that work with messy data.</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Red Flag #4</p>
                <p className="font-bold">"The vendor said they could customize it for us"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: Customization means delays, cost overruns, and vendor lock-in. Prefer configurable over customizable.</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Red Flag #5</p>
                <p className="font-bold">"ROI is hard to measure, but we know it's valuable"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: If you can't measure success before you start, you can't prove success after. Define metrics upfront.</p>
              </div>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-6 bg-id8-orange/10 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Your AI Opportunity Map</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 30 minutes<br />
                <strong>You'll need:</strong> Whiteboard or spreadsheet, 2-3 stakeholders from different functions
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Brainstorm opportunities (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">List 10-15 potential AI use cases across your organization. Don't filter yet — just capture ideas.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Classify each by value zone (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Tag each opportunity: Cost Reduction, Revenue Growth, Speed to Market, or Decision Quality.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Classify by capability type (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Tag each: Process Automation, Decision Augmentation, or Both.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Score using the framework (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Rate each opportunity 1-5 on Impact, Feasibility, Speed, Risk, and Strategic Fit. Calculate total scores.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">5</span>
                  <div>
                    <p className="font-bold">Prioritize top 3 (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Identify your highest-scoring opportunities. These become your AI roadmap.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A prioritized Opportunity Map showing 10-15 use cases, classified by value zone and capability type, with scores and a clear top 3 for immediate action.
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
                  "AI creates value in four zones: Cost Reduction, Revenue Growth, Speed to Market, and Decision Quality. The best opportunities span multiple zones.",
                  "Cost reduction is easier to justify, but revenue growth has unlimited upside. Do both, but graduate toward growth as you mature.",
                  "Process automation saves time. Decision augmentation improves outcomes. Combine them for maximum impact.",
                  "Industry patterns exist, but every organization is unique. Use sector benchmarks as starting points, not constraints.",
                  "Score opportunities rigorously on Impact, Feasibility, Speed, Risk, and Strategic Fit. Focus ruthlessly on high-scoring opportunities.",
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
              You now have a map of where AI can create value in your organization. In the next module, we'll turn these opportunities into concrete plans with realistic timelines and budgets.
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
                href="/academy/ai-for-leaders/module-1"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: What AI Actually Does
              </Link>
              <Link
                href="/academy/ai-for-leaders/module-3"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Building Your Roadmap
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
