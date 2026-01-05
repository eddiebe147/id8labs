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

export default function Module5Page() {
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
                currentModule={5}
                totalModules={8}
                courseTitle="AI for Leaders"
              />
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                Module 5
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                60 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Evaluating AI Vendors
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "We've had 23 vendor demos in the last two months. They all look good. How do I actually choose?"
            </m.p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">

            {/* The Problem */}
            <div className="not-prose mb-12 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                The Vendor Landscape
              </h2>
              <h3 className="text-2xl font-bold mb-4">500+ Tools, Same Pitch Deck</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  The AI vendor market is overwhelming. Over 500 "enterprise AI solutions" launched in the last 18 months. Most have identical marketing: "AI-powered," "10x productivity," "seamless integration," "enterprise-ready."
                </p>
                <p>
                  Behind the polished demos, capabilities vary wildly. Some are genuinely transformative. Some are wrappers around OpenAI's API with minimal value-add. Some will be out of business within 12 months.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  Your job as a leader isn't to become an AI expert — it's to ask the right questions and separate signal from noise. This module gives you the framework.
                </p>
              </div>
            </div>

            {/* The Six Dimensions */}
            <h2>The Vendor Evaluation Framework</h2>
            <p>
              Every AI vendor evaluation comes down to six dimensions. Most buyers only look at two (capability and pricing) and get burned. Here's the complete framework:
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
              {[
                {
                  icon: "🎯",
                  title: "CAPABILITY",
                  weight: "25%",
                  desc: "Does it actually solve your problem?",
                  questions: "Proven use cases, accuracy metrics, edge case handling"
                },
                {
                  icon: "🔌",
                  title: "INTEGRATION",
                  weight: "20%",
                  desc: "How easily does it fit your stack?",
                  questions: "API quality, data requirements, existing tool compatibility"
                },
                {
                  icon: "🔒",
                  title: "SECURITY",
                  weight: "20%",
                  desc: "Can you trust it with your data?",
                  questions: "Compliance, data handling, audit trails, privacy guarantees"
                },
                {
                  icon: "🤝",
                  title: "SUPPORT",
                  weight: "15%",
                  desc: "What happens when things break?",
                  questions: "SLAs, response times, training resources, account management"
                },
                {
                  icon: "💰",
                  title: "PRICING",
                  weight: "10%",
                  desc: "What's the real total cost?",
                  questions: "Pricing model clarity, scaling costs, hidden fees, lock-in"
                },
                {
                  icon: "🗺️",
                  title: "ROADMAP",
                  weight: "10%",
                  desc: "Will they be here in 2 years?",
                  questions: "Funding, team, market position, product velocity"
                },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-mono text-id8-orange">{item.weight}</span>
                  </div>
                  <h4 className="font-bold text-id8-orange">{item.title}</h4>
                  <p className="text-sm text-[var(--text-primary)] mt-1">{item.desc}</p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-2 italic">{item.questions}</p>
                </div>
              ))}
            </div>

            <p>
              <strong>Key insight:</strong> The weights shown are defaults. Adjust based on your context. A healthcare org might weight Security at 40%. A startup might weight Capability at 50% and Roadmap at 5%.
            </p>

            {/* Dimension Deep Dive: Capability */}
            <h2>Dimension 1: Capability</h2>
            <p>
              This is where vendors shine in demos and often disappoint in production. Here's what to actually assess:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Question</th>
                    <th className="text-left py-3 px-4">What You're Looking For</th>
                    <th className="text-left py-3 px-4 text-red-400">Red Flag</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Proven use cases</td>
                    <td className="py-3 px-4">3+ customers in your industry with measurable results</td>
                    <td className="py-3 px-4">"We're in beta with 2 companies..."</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Accuracy metrics</td>
                    <td className="py-3 px-4">Specific numbers: "92% accuracy on X task"</td>
                    <td className="py-3 px-4">"Industry-leading performance"</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Edge cases</td>
                    <td className="py-3 px-4">Clear explanation of failure modes and handling</td>
                    <td className="py-3 px-4">"It handles everything automatically"</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Customization</td>
                    <td className="py-3 px-4">You can adjust to your domain without vendor dependency</td>
                    <td className="py-3 px-4">"Our team will tune it for you" (ongoing cost)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Live demo</td>
                    <td className="py-3 px-4">They can demo with YOUR data in real-time</td>
                    <td className="py-3 px-4">Pre-recorded demo or "curated examples"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong>Action item:</strong> Ask for a reference customer in your industry. Call them directly. Ask: "What didn't work as promised?"
            </p>

            {/* Dimension Deep Dive: Integration */}
            <h2>Dimension 2: Integration</h2>
            <p>
              Integration is where hidden costs live. A tool that requires 6 months of custom engineering isn't "easy to integrate" no matter what the sales deck says.
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h3 className="font-bold mb-4">Integration Assessment Checklist</h3>
              <div className="space-y-3">
                {[
                  {
                    q: "Does it have pre-built connectors for your core systems?",
                    detail: "Not 'we can build one' — already exists and is maintained"
                  },
                  {
                    q: "What data format does it require?",
                    detail: "If you need to restructure your entire data warehouse, that's a 6-month project"
                  },
                  {
                    q: "Can you self-serve API integration or do you need vendor help?",
                    detail: "Vendor-dependent integration = ongoing consulting costs"
                  },
                  {
                    q: "What's the average time-to-value for similar customers?",
                    detail: "Real answer is usually 2-3x what they say in the demo"
                  },
                  {
                    q: "Who owns the integration code?",
                    detail: "If they do, you're locked in"
                  },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-id8-orange pl-4">
                    <p className="font-bold text-sm">{item.q}</p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-1">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dimension Deep Dive: Security */}
            <h2>Dimension 3: Security</h2>
            <p>
              Security isn't just compliance checkboxes. It's about trust, transparency, and what happens when things go wrong.
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Security Area</th>
                    <th className="text-left py-3 px-4 text-green-400">Must Have</th>
                    <th className="text-left py-3 px-4 text-yellow-400">Nice to Have</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Compliance</td>
                    <td className="py-3 px-4">SOC 2 Type 2, relevant industry certs (HIPAA, etc.)</td>
                    <td className="py-3 px-4">ISO 27001, additional regional compliance</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Data Handling</td>
                    <td className="py-3 px-4">Clear data retention policy, ability to delete on demand</td>
                    <td className="py-3 px-4">Zero-retention option, on-premise deployment</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Model Training</td>
                    <td className="py-3 px-4">Explicit opt-out from using your data for training</td>
                    <td className="py-3 px-4">Private model option (not shared infrastructure)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Audit Trail</td>
                    <td className="py-3 px-4">Logs of all AI interactions, exportable</td>
                    <td className="py-3 px-4">Real-time monitoring dashboard</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Breach Protocol</td>
                    <td className="py-3 px-4">Written incident response plan, notification SLA</td>
                    <td className="py-3 px-4">Cyber insurance, independent security audits</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong>Non-negotiable:</strong> If they can't provide a clear answer on whether your data trains their models, walk away. This should be a 5-second answer.
            </p>

            {/* Dimension Deep Dive: Support */}
            <h2>Dimension 4: Support</h2>
            <p>
              AI tools break in subtle ways. A chatbot that suddenly starts giving wrong answers. A classifier that drifts over time. You need support that understands AI failure modes, not just "have you tried restarting?"
            </p>

            <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="font-mono text-sm text-green-400 mb-2">Good Support Signals</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Named account manager (not rotating support queue)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">✓</span>
                    <span>SLA includes response AND resolution time</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Technical documentation you can actually follow</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Active community or user forum</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Regular training/onboarding for new team members</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-2">Bad Support Signals</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-red-400">✗</span>
                    <span>"Email us and we'll get back to you"</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Support is offshore with no AI expertise</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Documentation is just API reference (no examples)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">✗</span>
                    <span>No status page or uptime history published</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400">✗</span>
                    <span>"Premium support" is an expensive add-on</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Dimension Deep Dive: Pricing */}
            <h2>Dimension 5: Pricing</h2>
            <p>
              AI pricing is deliberately confusing. Per-user? Per-query? Per-token? Flat fee? The model matters less than transparency and predictability.
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Pricing Model</th>
                    <th className="text-left py-3 px-4">Good For</th>
                    <th className="text-left py-3 px-4">Watch Out For</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Per User</td>
                    <td className="py-3 px-4">Predictable teams, clear user counts</td>
                    <td className="py-3 px-4">Inactive user charges, "power user" surcharges</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Per API Call</td>
                    <td className="py-3 px-4">Variable usage, easy to model costs</td>
                    <td className="py-3 px-4">Runaway costs if usage spikes, no volume discounts</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Flat Rate</td>
                    <td className="py-3 px-4">Budget certainty, unlimited usage</td>
                    <td className="py-3 px-4">Hidden "fair use" limits, forced upgrades at scale</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Tiered</td>
                    <td className="py-3 px-4">Scaling organizations, clear upgrade path</td>
                    <td className="py-3 px-4">Artificial feature gates, forced tier jumps</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Custom/Enterprise</td>
                    <td className="py-3 px-4">Large deployments, negotiation leverage</td>
                    <td className="py-3 px-4">"Call us for pricing" = expensive, opaque</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-8 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertIcon />
                <div>
                  <p className="font-bold mb-2">The True Cost Formula</p>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    Don't just look at the sticker price. Calculate total cost of ownership:
                  </p>
                  <div className="font-mono text-xs bg-[var(--bg-primary)] p-3 rounded">
                    <p>TCO = Base License + Integration + Training + Support + Hidden Fees + Switching Cost</p>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-3">
                    Rule of thumb: If they quote $50K, budget $75-100K for year one when you include everything.
                  </p>
                </div>
              </div>
            </div>

            {/* Dimension Deep Dive: Roadmap */}
            <h2>Dimension 6: Roadmap</h2>
            <p>
              The AI vendor landscape is consolidating rapidly. You don't want to pick a tool that gets acqui-hired or shut down 18 months in.
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h3 className="font-bold mb-4">Vendor Stability Indicators</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-mono text-id8-orange mb-1">FUNDING & RUNWAY</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong>Look for:</strong> Series B+ funding, or profitable with clear revenue model. Avoid: Seed-stage with unclear path to revenue, or "stealth mode" companies.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-mono text-id8-orange mb-1">TEAM DEPTH</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong>Look for:</strong> 30+ employees with dedicated product, engineering, and support teams. Avoid: Founder-led demos (who's building the product?).
                  </p>
                </div>
                <div>
                  <p className="text-sm font-mono text-id8-orange mb-1">CUSTOMER BASE</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong>Look for:</strong> 50+ paying customers, mix of SMB and enterprise. Avoid: "Hundreds of users" (free tier doesn't count).
                  </p>
                </div>
                <div>
                  <p className="text-sm font-mono text-id8-orange mb-1">PRODUCT VELOCITY</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong>Look for:</strong> Regular releases (monthly/quarterly), public changelog, feature requests being shipped. Avoid: Last update was 6 months ago.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-mono text-id8-orange mb-1">MARKET POSITION</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong>Look for:</strong> Clear differentiation, cited in analyst reports (Gartner, Forrester). Avoid: "Me too" products with no unique angle.
                  </p>
                </div>
              </div>
            </div>

            {/* The Red Flags */}
            <h2>10 Red Flags That Should End the Evaluation</h2>
            <p>
              Some warning signs are instant disqualifiers. Here are the 10 red flags that should make you walk away:
            </p>

            <div className="not-prose my-8 space-y-4">
              {[
                {
                  flag: "They can't explain how the AI actually works",
                  why: "If they hide behind 'proprietary algorithms,' they either don't know or it's a basic implementation they're overselling."
                },
                {
                  flag: "No clear data privacy policy",
                  why: "In 2025, this is unacceptable. If they can't articulate data handling, they haven't thought it through."
                },
                {
                  flag: "References are all from the same industry/use case",
                  why: "They haven't proven versatility. You're a guinea pig for your use case."
                },
                {
                  flag: "Aggressive 'limited time' discounting",
                  why: "Desperation pricing suggests cash flow problems or poor product-market fit."
                },
                {
                  flag: "They won't do a pilot/POC with your data",
                  why: "If they won't prove it works before you pay, it probably doesn't work."
                },
                {
                  flag: "Contract has auto-renewal with no easy out",
                  why: "Lock-in tactics suggest they know churn is high once reality sets in."
                },
                {
                  flag: "They bad-mouth competitors instead of explaining value",
                  why: "Insecurity signal. Strong products don't need to tear down competition."
                },
                {
                  flag: "Unclear who owns the trained models",
                  why: "If they train on your data and own the model, you've just funded their product R&D."
                },
                {
                  flag: "No publicly available uptime/SLA history",
                  why: "Transparency is trust. If they won't share metrics, they're hiding something."
                },
                {
                  flag: "Implementation requires exclusive vendor services",
                  why: "You're locked into their consulting rates forever. Look for partner ecosystem instead."
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-red-400">{item.flag}</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{item.why}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* POC Protocol */}
            <h2>The Proof of Concept Protocol</h2>
            <p>
              Never buy without a POC. Here's how to structure one that actually proves value:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h3 className="font-bold mb-4">The 4-Week POC Framework</h3>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-id8-orange/20 text-id8-orange text-xs font-mono rounded">WEEK 1</span>
                    <p className="font-bold">Setup & Baseline</p>
                  </div>
                  <ul className="text-sm text-[var(--text-secondary)] space-y-1 ml-4">
                    <li>• Integration with test environment</li>
                    <li>• Load representative sample of your data</li>
                    <li>• Document current-state metrics (accuracy, time, cost)</li>
                    <li>• Define success criteria (be specific: "Reduce processing time from 4hrs to 30min")</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-id8-orange/20 text-id8-orange text-xs font-mono rounded">WEEK 2</span>
                    <p className="font-bold">Testing & Tuning</p>
                  </div>
                  <ul className="text-sm text-[var(--text-secondary)] space-y-1 ml-4">
                    <li>• Run tool on your actual workflows (not vendor examples)</li>
                    <li>• Identify failure modes and edge cases</li>
                    <li>• Tune/customize with vendor support</li>
                    <li>• Document what works and what doesn't</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-id8-orange/20 text-id8-orange text-xs font-mono rounded">WEEK 3</span>
                    <p className="font-bold">Real-World Validation</p>
                  </div>
                  <ul className="text-sm text-[var(--text-secondary)] space-y-1 ml-4">
                    <li>• 5-10 team members use it for real work</li>
                    <li>• Collect qualitative feedback (daily standup check-ins)</li>
                    <li>• Measure quantitative outcomes vs. baseline</li>
                    <li>• Identify training/onboarding gaps</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-id8-orange/20 text-id8-orange text-xs font-mono rounded">WEEK 4</span>
                    <p className="font-bold">Decision & Scaling Path</p>
                  </div>
                  <ul className="text-sm text-[var(--text-secondary)] space-y-1 ml-4">
                    <li>• Compare results to success criteria</li>
                    <li>• Calculate actual ROI (be conservative)</li>
                    <li>• Understand what scaling looks like (cost, complexity, support)</li>
                    <li>• Go/no-go decision with documented rationale</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Non-negotiable:</strong> The vendor must agree to success criteria upfront. If they won't commit to measurable outcomes, they don't believe in their product.
                </p>
              </div>
            </div>

            {/* Negotiation Leverage */}
            <h2>7 Negotiation Leverage Points</h2>
            <p>
              Most buyers accept vendor pricing as-is. That's leaving money on the table. Here are seven leverage points to negotiate better terms:
            </p>

            <div className="not-prose my-8 space-y-3">
              {[
                {
                  point: "Multi-Year Commitment",
                  tactic: "Offer 2-3 year contract in exchange for 20-30% annual discount",
                  caveat: "Only if POC proves value AND you negotiate exit clauses"
                },
                {
                  point: "Payment Terms",
                  tactic: "Prepay annually instead of monthly for 10-15% discount",
                  caveat: "Only with established vendors (not startups that might fold)"
                },
                {
                  point: "Reference Customer",
                  tactic: "Offer to be case study/reference in exchange for discount or free tier bump",
                  caveat: "Ensure you control messaging and have veto rights on content"
                },
                {
                  point: "Competitive Leverage",
                  tactic: "Show you're evaluating 2-3 alternatives (even if you have a favorite)",
                  caveat: "Don't bluff — actually have alternatives or it won't work"
                },
                {
                  point: "End of Quarter/Year",
                  tactic: "Enterprise sales reps have quotas — negotiate in final weeks of their Q4",
                  caveat: "Don't rush your evaluation just for a discount"
                },
                {
                  point: "Feature Bundling",
                  tactic: "Negotiate future features at current pricing (lock in before they charge for it)",
                  caveat: "Get it in writing with delivery timeline commitments"
                },
                {
                  point: "Exit Flexibility",
                  tactic: "Shorter initial term with option to extend, or clear cancellation terms",
                  caveat: "Better to pay slightly more and have flexibility than save 10% and be locked in"
                },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-bold">{item.point}</p>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">
                        <strong>Tactic:</strong> {item.tactic}
                      </p>
                      <p className="text-xs text-yellow-400 mt-2">
                        <strong>Caveat:</strong> {item.caveat}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build Your Vendor Evaluation Scorecard</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 30 minutes<br />
                <strong>You'll need:</strong> One vendor you're actively evaluating (or pick one from your research)
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Set your dimension weights (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Adjust the six dimensions based on your context. Total must equal 100%. Be honest about what matters most.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Score each dimension 1-10 (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Use the questions from each section. Score based on evidence, not sales pitch. Document your reasoning.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Calculate weighted score (2 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Multiply each dimension score by its weight, sum them up. This is your vendor's final score out of 10.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Identify red flags (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Review the 10 red flags list. Does this vendor trigger any? One red flag might outweigh a good score.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">5</span>
                  <div>
                    <p className="font-bold">Make your recommendation (3 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Based on score and flags: Proceed to POC, Keep evaluating, or Pass. Write one paragraph explaining why.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm font-bold mb-2">Scorecard Template</p>
                <div className="font-mono text-xs bg-[var(--bg-secondary)] p-3 rounded space-y-1">
                  <p>Capability:     [Score 1-10] × [Weight %] = [Weighted Score]</p>
                  <p>Integration:   [Score 1-10] × [Weight %] = [Weighted Score]</p>
                  <p>Security:      [Score 1-10] × [Weight %] = [Weighted Score]</p>
                  <p>Support:       [Score 1-10] × [Weight %] = [Weighted Score]</p>
                  <p>Pricing:       [Score 1-10] × [Weight %] = [Weighted Score]</p>
                  <p>Roadmap:       [Score 1-10] × [Weight %] = [Weighted Score]</p>
                  <p className="pt-2 border-t border-[var(--border)] mt-2">TOTAL SCORE: [Sum] / 10</p>
                </div>
                <p className="text-xs text-[var(--text-tertiary)] mt-3">
                  Scoring guide: 8-10 = Strong fit, proceed to POC | 6-7 = Possible fit, need more evidence | 5 or below = Pass
                </p>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A scored evaluation you can present to stakeholders with clear recommendation and supporting evidence. This becomes your template for all future vendor evaluations.
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
                  "Evaluate on six dimensions — Capability, Integration, Security, Support, Pricing, Roadmap. Weight them based on your context.",
                  "The 10 red flags are deal-breakers. One red flag should end the evaluation, regardless of how good the demo looked.",
                  "Always run a 4-week POC with YOUR data and clear success criteria before committing. No POC = no purchase.",
                  "True cost is 1.5-2x the sticker price when you include integration, training, and support. Budget accordingly.",
                  "You have more negotiation leverage than you think. Use multi-year terms, reference opportunities, and competitive alternatives to get better deals.",
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
              You now have a systematic framework for cutting through vendor hype and making evidence-based decisions. In the next module, we'll shift from buying AI to building it — understanding when to build custom solutions versus buying off the shelf.
            </p>

            {/* Module Complete */}
            <ModuleComplete
              courseSlug="ai-for-leaders"
              moduleSlug="module-5"
              nextModulePath="/academy/ai-for-leaders/module-6"
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
                href="/academy/ai-for-leaders/module-4"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: Building the Roadmap
              </Link>
              <Link
                href="/academy/ai-for-leaders/module-6"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Build vs Buy Decisions
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
