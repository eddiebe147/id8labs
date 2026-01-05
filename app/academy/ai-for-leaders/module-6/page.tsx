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

const ShieldAlertIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M12 8v4"/>
    <path d="M12 16h.01"/>
  </svg>
)

const AlertTriangleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)

const LockIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const EyeOffIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

const LinkIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
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
                href="/academy/ai-for-leaders"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to AI for Leaders
              </Link>
            </m.div>

            <m.div variants={fadeUp}>
              <CourseProgress
                currentModule={6}
                totalModules={8}
                courseTitle="AI for Leaders"
              />
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                Module 6
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                60 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Managing AI Risk
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "Our board asked what could go wrong with AI. I need a real answer, not platitudes."
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
              <h3 className="text-2xl font-bold mb-4">What Actually Goes Wrong With AI</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Most AI risk frameworks are academic exercises — comprehensive, theoretically sound, and completely useless when you're facing a real decision about deploying AI in your organization.
                </p>
                <p>
                  You don't need a 40-page risk assessment template. You need to know the four categories where AI systems actually fail, how to detect those failures early, and what controls prevent catastrophic outcomes.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module gives you a practical risk management framework you can implement this week. By the end, you'll have a risk register tailored to your specific AI initiatives.
                </p>
              </div>
            </div>

            {/* What Actually Goes Wrong */}
            <h2>What Actually Goes Wrong With AI</h2>
            <p>
              After analyzing hundreds of AI implementations, failures cluster into predictable patterns. Here's what actually happens when AI projects fail:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangleIcon />
                  <div>
                    <p className="font-bold text-red-400">The AI exposes customer data</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                      A chatbot trained on customer support tickets leaks PII. A document summarizer includes sensitive information in responses. An AI assistant stores conversations that contain confidential business data.
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-2 italic">Real cost: Regulatory fines, customer trust, legal liability</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangleIcon />
                  <div>
                    <p className="font-bold text-red-400">The AI discriminates systematically</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                      A resume screening tool filters out qualified candidates based on demographic patterns in training data. A loan approval system denies applications at different rates for protected classes. A performance review assistant reinforces existing biases.
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-2 italic">Real cost: Legal exposure, reputation damage, lost talent</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangleIcon />
                  <div>
                    <p className="font-bold text-red-400">The AI hallucinates confidently</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                      An AI generates plausible-sounding financial advice that's completely wrong. A legal research assistant cites cases that don't exist. A medical information bot provides dangerous health recommendations with absolute certainty.
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-2 italic">Real cost: Bad decisions, operational failures, safety incidents</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangleIcon />
                  <div>
                    <p className="font-bold text-red-400">The vendor changes everything</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                      A critical AI service raises prices 300%. A vendor pivots and sunsets the product you depend on. An API provider changes terms of service, breaking your use case. A model provider degrades performance to cut costs.
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-2 italic">Real cost: Stranded investment, operational disruption, emergency migration</p>
                  </div>
                </div>
              </div>
            </div>

            <p>
              Notice a pattern: These aren't theoretical risks. They're incidents that have already happened at scale, causing real financial and reputational damage.
            </p>

            {/* The Four Risk Categories */}
            <h2>The Four Risk Categories</h2>
            <p>
              Every AI risk falls into one of four buckets. Understanding these categories lets you build proportionate controls without over-engineering your risk management process.
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
              {[
                {
                  icon: "🔒",
                  title: "PRIVACY RISK",
                  severity: "Critical",
                  desc: "AI exposes, leaks, or mishandles sensitive data",
                  impact: "Regulatory fines, legal liability, customer trust loss",
                  examples: "PII leakage, data retention violations, cross-customer data exposure"
                },
                {
                  icon: "⚖️",
                  title: "BIAS RISK",
                  severity: "Critical",
                  desc: "AI produces systematically unfair outcomes",
                  impact: "Legal exposure, discrimination claims, reputation damage",
                  examples: "Hiring discrimination, loan approval bias, unfair content moderation"
                },
                {
                  icon: "🎭",
                  title: "HALLUCINATION RISK",
                  severity: "High",
                  desc: "AI confidently generates incorrect information",
                  impact: "Bad decisions, operational failures, safety incidents",
                  examples: "Fabricated citations, wrong financial data, dangerous medical advice"
                },
                {
                  icon: "🔗",
                  title: "DEPENDENCY RISK",
                  severity: "Medium",
                  desc: "Critical business processes rely on external AI services",
                  impact: "Service disruption, cost escalation, vendor lock-in",
                  examples: "Price increases, service shutdowns, API changes, model degradation"
                },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <span className={`text-xs font-mono px-2 py-1 rounded ${
                      item.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      item.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {item.severity}
                    </span>
                  </div>
                  <h4 className="font-bold text-id8-orange">{item.title}</h4>
                  <p className="text-sm text-[var(--text-primary)] mt-2">{item.desc}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-2"><strong>Impact:</strong> {item.impact}</p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-2 italic">{item.examples}</p>
                </div>
              ))}
            </div>

            {/* Privacy & Compliance Deep Dive */}
            <h2>Privacy & Compliance: The Non-Negotiables</h2>
            <p>
              Privacy risk is the most regulated category. If you're operating in the US or EU, you're subject to frameworks that impose real penalties for violations. Here's what you need to know:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Framework</th>
                    <th className="text-left py-3 px-4">Jurisdiction</th>
                    <th className="text-left py-3 px-4">Key Requirements for AI</th>
                    <th className="text-left py-3 px-4">Penalty Range</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">GDPR</td>
                    <td className="py-3 px-4">EU / European residents</td>
                    <td className="py-3 px-4">Consent for processing, right to explanation, data minimization, purpose limitation</td>
                    <td className="py-3 px-4 text-red-400">Up to €20M or 4% revenue</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">CCPA/CPRA</td>
                    <td className="py-3 px-4">California / CA residents</td>
                    <td className="py-3 px-4">Disclosure of AI use, opt-out rights, data sale restrictions, automated decision-making limits</td>
                    <td className="py-3 px-4 text-red-400">$2,500-$7,500 per violation</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">HIPAA</td>
                    <td className="py-3 px-4">US Healthcare</td>
                    <td className="py-3 px-4">PHI protection, Business Associate Agreements, encryption, audit trails, breach notification</td>
                    <td className="py-3 px-4 text-red-400">$100-$50,000 per record</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">SOC 2</td>
                    <td className="py-3 px-4">US (voluntary standard)</td>
                    <td className="py-3 px-4">Security controls, access management, data integrity, confidentiality measures</td>
                    <td className="py-3 px-4 text-yellow-400">Customer trust / sales impact</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h3 className="text-lg font-bold mb-4">Practical Privacy Controls for AI</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">1</span>
                  <div>
                    <p className="font-bold">Data Inventory</p>
                    <p className="text-sm text-[var(--text-secondary)]">Document exactly what data your AI systems process, where it's stored, and how long it's retained. Most privacy violations start with "we didn't know that data was there."</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">2</span>
                  <div>
                    <p className="font-bold">Data Minimization</p>
                    <p className="text-sm text-[var(--text-secondary)]">Only send AI systems the minimum data needed. If you don't need full customer records to generate a summary, strip PII before processing. Less data in = less risk exposure.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">3</span>
                  <div>
                    <p className="font-bold">Vendor Data Processing Agreements</p>
                    <p className="text-sm text-[var(--text-secondary)]">Every AI vendor must sign a DPA specifying they won't train on your data, how long they retain it, and their security standards. No DPA = no deployment.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">4</span>
                  <div>
                    <p className="font-bold">Access Controls</p>
                    <p className="text-sm text-[var(--text-secondary)]">Implement role-based access to AI tools. Not everyone needs access to customer data analysis. Limit exposure by limiting access.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">5</span>
                  <div>
                    <p className="font-bold">Audit Trails</p>
                    <p className="text-sm text-[var(--text-secondary)]">Log who accessed AI systems, what data they processed, and what outputs were generated. When regulators ask "who saw this data?", you need an answer.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bias & Fairness */}
            <h2>Bias Detection & Mitigation</h2>
            <p>
              AI systems inherit biases from training data and amplify them through scale. A hiring bias that affected 10 candidates manually now affects 10,000 automatically. Here's how to detect and mitigate bias before it becomes a legal liability:
            </p>

            <h3>The Three Types of AI Bias</h3>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">1. Training Data Bias</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  The AI learns from historical data that reflects past discrimination.
                </p>
                <p className="text-xs text-[var(--text-tertiary)] italic">
                  Example: A resume screener trained on 10 years of hiring data learns that "good candidates" match the demographic profile of past hires — who were 85% male due to historical bias.
                </p>
                <p className="text-sm text-[var(--text-primary)] mt-2">
                  <strong>Detection:</strong> Analyze training data for demographic imbalances. Audit historical outcomes for disparate impact.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">2. Proxy Bias</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  The AI uses seemingly neutral factors that correlate with protected characteristics.
                </p>
                <p className="text-xs text-[var(--text-tertiary)] italic">
                  Example: A loan approval model uses ZIP code as a factor, which correlates strongly with race and income — effectively discriminating without explicitly considering protected classes.
                </p>
                <p className="text-sm text-[var(--text-primary)] mt-2">
                  <strong>Detection:</strong> Correlation analysis between input features and protected attributes. Test for disparate impact across demographic groups.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">3. Feedback Loop Bias</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  The AI's decisions influence future data, which reinforces the original bias.
                </p>
                <p className="text-xs text-[var(--text-tertiary)] italic">
                  Example: A content recommendation system shows technical content primarily to men based on historical patterns, which causes fewer women to engage with technical content, which reinforces the pattern.
                </p>
                <p className="text-sm text-[var(--text-primary)] mt-2">
                  <strong>Detection:</strong> Monitor outcome distributions over time. Watch for divergence across demographic groups.
                </p>
              </div>
            </div>

            <h3>Practical Bias Mitigation Framework</h3>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Stage</th>
                    <th className="text-left py-3 px-4">Control</th>
                    <th className="text-left py-3 px-4">How to Implement</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Before Training</td>
                    <td className="py-3 px-4">Data Auditing</td>
                    <td className="py-3 px-4">Analyze training data for demographic representation. Balance datasets or apply sampling weights.</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">During Training</td>
                    <td className="py-3 px-4">Fairness Constraints</td>
                    <td className="py-3 px-4">Add fairness metrics to model optimization. Penalize disparate impact during training.</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Before Deployment</td>
                    <td className="py-3 px-4">Bias Testing</td>
                    <td className="py-3 px-4">Run model against test sets stratified by protected attributes. Measure outcome parity.</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">In Production</td>
                    <td className="py-3 px-4">Ongoing Monitoring</td>
                    <td className="py-3 px-4">Track decision distributions by demographic group. Alert on statistical anomalies.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Post-Deployment</td>
                    <td className="py-3 px-4">Human Review</td>
                    <td className="py-3 px-4">Sample AI decisions for manual review. Implement appeal processes for contested outcomes.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Hallucination Risk */}
            <h2>Hallucination Management: When AI Confidently Lies</h2>
            <p>
              Hallucinations — AI-generated information that's plausible but completely false — are the most insidious AI risk. Unlike errors that look wrong, hallucinations look right. They come with confident formatting, proper citations, and professional tone. Here's how to manage this risk:
            </p>

            <h3>Why Hallucinations Are Dangerous</h3>
            <p>
              Traditional software fails obviously. A database error throws an exception. A calculation bug produces nonsense numbers. But AI hallucinations pass the "looks right" test, which means they slip through human review and cause downstream damage.
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <p className="font-mono text-sm text-orange-400 mb-1">Real Incident</p>
                <p className="font-bold">Legal Brief Cited Fake Cases</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  A lawyer used ChatGPT to research case law. The AI generated six legal citations that sounded legitimate — complete with case names, dates, and holdings. All six were fabrications. The brief was filed in federal court. The lawyer faced sanctions.
                </p>
                <p className="text-xs text-[var(--text-tertiary)] mt-2"><strong>Root cause:</strong> No verification step. The user trusted confident output without checking primary sources.</p>
              </div>

              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <p className="font-mono text-sm text-orange-400 mb-1">Real Incident</p>
                <p className="font-bold">Financial Analysis Used Wrong Numbers</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  An AI-powered financial analysis tool generated a market report with specific revenue figures for competitors. The numbers were plausible, formatted professionally, and completely fabricated. A company made strategic decisions based on this false data.
                </p>
                <p className="text-xs text-[var(--text-tertiary)] mt-2"><strong>Root cause:</strong> No source attribution. The AI presented synthesized data as fact without linking to verified sources.</p>
              </div>
            </div>

            <h3>Risk-Based Deployment Framework</h3>
            <p>
              Not all use cases carry equal hallucination risk. Match your controls to the stakes:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Risk Level</th>
                    <th className="text-left py-3 px-4">Use Cases</th>
                    <th className="text-left py-3 px-4">Required Controls</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold text-green-400">Low Risk</td>
                    <td className="py-3 px-4">Brainstorming, first drafts, internal summaries</td>
                    <td className="py-3 px-4">User awareness, clear labeling as AI-generated</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold text-yellow-400">Medium Risk</td>
                    <td className="py-3 px-4">Customer-facing content, data analysis, reports</td>
                    <td className="py-3 px-4">Human review, fact-checking process, citations required</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-red-400">High Risk</td>
                    <td className="py-3 px-4">Legal, medical, financial, compliance decisions</td>
                    <td className="py-3 px-4">Expert verification, multiple review layers, audit trail</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Hallucination Risk Mitigation</h3>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">1</span>
                  <div>
                    <p className="font-bold">Never Use AI for High-Stakes Factual Claims Alone</p>
                    <p className="text-sm text-[var(--text-secondary)]">Legal, financial, medical, or compliance use cases require human verification of every factual claim. No exceptions.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">2</span>
                  <div>
                    <p className="font-bold">Require Source Attribution</p>
                    <p className="text-sm text-[var(--text-secondary)]">Configure AI systems to cite sources for factual claims. If the AI can't provide a verifiable source, treat the claim as suspect.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">3</span>
                  <div>
                    <p className="font-bold">Implement Confidence Scoring</p>
                    <p className="text-sm text-[var(--text-secondary)]">Flag low-confidence outputs for human review. Some AI systems provide confidence scores — use them. If confidence is below a threshold, route to human verification.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">4</span>
                  <div>
                    <p className="font-bold">Use Retrieval-Augmented Generation (RAG)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Ground AI responses in your verified knowledge base. RAG systems retrieve relevant documents first, then generate responses based on retrieved content — reducing hallucination risk.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">5</span>
                  <div>
                    <p className="font-bold">Train Users to Distrust</p>
                    <p className="text-sm text-[var(--text-secondary)]">The most effective control is cultural. Train your team to verify AI-generated factual claims before using them in decisions. Make verification a reflex, not an afterthought.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vendor Dependency */}
            <h2>Vendor Dependency Risk</h2>
            <p>
              Unlike privacy, bias, and hallucination risks — which are about AI misbehaving — dependency risk is about losing access to AI you rely on. It's the least dramatic but most common risk category.
            </p>

            <h3>The Four Dependency Failure Modes</h3>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Failure Mode</th>
                    <th className="text-left py-3 px-4">What Happens</th>
                    <th className="text-left py-3 px-4">Real Example</th>
                    <th className="text-left py-3 px-4">Mitigation</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Price Shock</td>
                    <td className="py-3 px-4">Vendor dramatically raises prices after you're dependent</td>
                    <td className="py-3 px-4">OpenAI increased API prices 3x in 6 months for some models</td>
                    <td className="py-3 px-4">Multi-vendor architecture, usage caps, contract price locks</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Service Sunset</td>
                    <td className="py-3 px-4">Vendor discontinues the product you depend on</td>
                    <td className="py-3 px-4">Google shuttered multiple AI APIs with 6-month notice</td>
                    <td className="py-3 px-4">Avoid startups for critical paths, plan migration windows</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Terms Change</td>
                    <td className="py-3 px-4">Vendor updates terms to prohibit your use case</td>
                    <td className="py-3 px-4">Multiple AI vendors banned competitive intelligence use</td>
                    <td className="py-3 px-4">Review ToS quarterly, maintain internal AI capabilities</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Performance Degradation</td>
                    <td className="py-3 px-4">Vendor quietly reduces model quality to cut costs</td>
                    <td className="py-3 px-4">Multiple reports of "GPT-4 getting dumber" as OpenAI optimized</td>
                    <td className="py-3 px-4">Automated quality monitoring, version pinning where possible</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Dependency Risk Controls</h3>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">1. Critical Path Assessment</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Map which business processes depend on external AI services. If the vendor disappears tomorrow, what breaks? Categorize as: nice-to-have, important, or critical. Critical paths need redundancy.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">2. Multi-Vendor Strategy</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  For critical AI applications, architect for vendor interchangeability. Use abstraction layers. Test fallback vendors quarterly. Don't optimize so heavily for one vendor that switching becomes impossible.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">3. Usage Monitoring & Caps</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Set spending caps on AI services. Monitor usage trends. An unexpected 10x increase in API calls means either a success (scale) or a problem (runaway automation). Know which before the bill arrives.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">4. Performance Baselines</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Establish quality benchmarks for vendor AI services. Run automated tests monthly. If performance degrades beyond threshold, you need to know before users complain.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">5. Exit Strategy Documentation</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Document how you'd migrate away from each AI vendor. What data needs to be extracted? What prompts need to be adapted? What code needs to change? Write this down before you need it.
                </p>
              </div>
            </div>

            {/* Risk Register Template */}
            <h2>Your Risk Register: The Practical Framework</h2>
            <p>
              A risk register is a living document that catalogs your AI risks, assigns ownership, and tracks mitigation status. Here's the template that actually works:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Column</th>
                    <th className="text-left py-3 px-4">What to Document</th>
                    <th className="text-left py-3 px-4">Example Entry</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">AI System</td>
                    <td className="py-3 px-4">Name of the AI tool or implementation</td>
                    <td className="py-3 px-4">Customer Support Chatbot (Intercom + GPT-4)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Risk Category</td>
                    <td className="py-3 px-4">Privacy, Bias, Hallucination, or Dependency</td>
                    <td className="py-3 px-4">Privacy, Hallucination</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Specific Risk</td>
                    <td className="py-3 px-4">What could go wrong, specifically</td>
                    <td className="py-3 px-4">Chatbot leaks customer PII to other users; provides incorrect billing information</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Impact</td>
                    <td className="py-3 px-4">Business consequence if risk materializes</td>
                    <td className="py-3 px-4">GDPR violation ($), customer trust loss, operational disruption</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Likelihood</td>
                    <td className="py-3 px-4">Low / Medium / High (based on controls)</td>
                    <td className="py-3 px-4">Medium (mitigated by filtering, monitoring)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Severity</td>
                    <td className="py-3 px-4">Low / Medium / High / Critical</td>
                    <td className="py-3 px-4">High</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Current Controls</td>
                    <td className="py-3 px-4">What's already in place to mitigate</td>
                    <td className="py-3 px-4">PII filtering, response logging, human handoff for billing questions</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Gaps</td>
                    <td className="py-3 px-4">What's missing from current controls</td>
                    <td className="py-3 px-4">No automated PII detection, no hallucination rate monitoring</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Action Items</td>
                    <td className="py-3 px-4">Specific next steps to close gaps</td>
                    <td className="py-3 px-4">Implement PII detection layer (Q2), set up weekly hallucination audits (Q1)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Owner</td>
                    <td className="py-3 px-4">Who's accountable for mitigation</td>
                    <td className="py-3 px-4">Sarah Chen (Product), Mike Torres (Compliance)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Review Date</td>
                    <td className="py-3 px-4">When to reassess this risk</td>
                    <td className="py-3 px-4">2024-04-15 (quarterly review)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-8 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <p className="font-bold mb-2">Risk Register Anti-Patterns</p>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex gap-2">
                  <span className="text-yellow-400">•</span>
                  <span><strong>Creating it once and never updating:</strong> The register is worthless if it's not a living document. Schedule quarterly reviews.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-400">•</span>
                  <span><strong>Making it too comprehensive:</strong> A 50-row spreadsheet no one reads is worse than a 10-row document everyone uses.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-400">•</span>
                  <span><strong>No clear ownership:</strong> "The team" is not an owner. Name names. Assign accountability.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-400">•</span>
                  <span><strong>Treating all risks equally:</strong> Prioritize. Focus mitigation effort on high-severity, high-likelihood risks first.</span>
                </li>
              </ul>
            </div>

            {/* Exercise */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Your Risk Register</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 30 minutes<br />
                <strong>You'll need:</strong> List of current or planned AI implementations, spreadsheet or document tool
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Inventory your AI systems (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">List every AI tool or implementation in use or planned. Include vendor name and use case.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Map risks to categories (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For each system, identify which of the four risk categories apply. Be specific about what could go wrong.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Score likelihood and severity (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Use simple High/Medium/Low ratings. Be honest about current controls — most will have gaps.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Document current controls and gaps (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">What's already protecting you? What's missing? Don't sugarcoat — gaps are normal at this stage.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">5</span>
                  <div>
                    <p className="font-bold">Assign owners and next steps (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For your top 3 risks (highest severity + likelihood), name an owner and define one specific action item with a deadline.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A risk register you can present to leadership or your board. It should answer "what are our AI risks?" and "who's managing them?" with clarity.
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
                  "AI risks cluster into four categories: Privacy (data leakage), Bias (discrimination), Hallucination (false information), and Dependency (vendor risk). Map every AI system to these categories.",
                  "Privacy compliance isn't optional. GDPR, CCPA, and HIPAA impose real penalties. Implement data minimization, vendor DPAs, and audit trails before deploying AI with customer data.",
                  "Bias detection requires proactive testing. Analyze training data, test for disparate impact, and monitor production outcomes by demographic group. Bias that goes undetected becomes legal liability.",
                  "Hallucinations are the silent killer. They look right, sound confident, and slip past review. Never use AI for high-stakes factual claims without human verification and source attribution.",
                  "Vendor dependency is inevitable but manageable. Assess critical paths, maintain multi-vendor optionality, and document exit strategies. The time to plan vendor migration is before you need it.",
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
              You now have a framework to identify, assess, and mitigate AI risks systematically. Your risk register is the operational tool that turns this framework into action. Treat it as a living document — review quarterly, update as you deploy new AI systems, and use it to demonstrate responsible AI governance to leadership and regulators.
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
                href="/academy/ai-for-leaders"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to Course
              </Link>
              <Link
                href="/academy/ai-for-leaders"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Back to Course Overview
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
