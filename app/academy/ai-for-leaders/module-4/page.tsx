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

export default function Module4Page() {
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
                currentModule={4}
                totalModules={8}
                courseTitle="AI for Leaders"
              />
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                Module 4
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                45 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Assembling Your Team
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "We have the strategy. We have the budget. Now I need to know who actually builds this thing."
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
              <h3 className="text-2xl font-bold mb-4">Why AI Projects Fail on People, Not Technology</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  You've been to the vendor presentations. The technology is dazzling. The demos are flawless. The implementation timeline looks aggressive but doable. Six months later, your AI project is behind schedule, over budget, and struggling to deliver value.
                </p>
                <p>
                  Here's the uncomfortable truth: <strong>87% of AI projects fail to reach production.</strong> The culprit is rarely the technology. It's almost always the team composition — the wrong people, in the wrong roles, at the wrong time.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module teaches you how to assemble AI teams that actually ship. By the end, you'll know exactly who you need, when you need them, and how much they should cost.
                </p>
              </div>
            </div>

            {/* The People Problem */}
            <h2>The People Problem Nobody Talks About</h2>
            <p>
              AI projects demand a rare combination: deep technical expertise and practical business judgment. Most organizations try to solve this by hiring "unicorns" — people who supposedly possess both. This is a mistake.
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4 text-red-400">What Organizations Do</th>
                    <th className="text-left py-3 px-4 text-green-400">What Actually Works</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Hire a "Head of AI" immediately</td>
                    <td className="py-3 px-4">Start with a strategic advisor who defines what you need</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Look for full-stack AI unicorns</td>
                    <td className="py-3 px-4">Build complementary teams with distinct specializations</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Invest heavily in ML engineers upfront</td>
                    <td className="py-3 px-4">Start with AI product managers and platform engineers</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Build an in-house AI lab</td>
                    <td className="py-3 px-4">Contract specialists until use cases prove themselves</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Assume software engineers can learn AI</td>
                    <td className="py-3 px-4">Recognize AI engineering is a distinct discipline</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              The pattern is clear: organizations that succeed with AI don't try to hire perfectly-formed teams on Day 1. They build teams <em>iteratively</em>, matching capabilities to the maturity stage of their AI initiatives.
            </p>

            {/* The Three Stages */}
            <h2>Team Structure by Stage: MVP to Scale to Production</h2>
            <p>
              Your team needs change as your AI maturity evolves. Here's the right team composition at each stage:
            </p>

            <div className="not-prose my-8 space-y-6">
              {/* MVP Stage */}
              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-lg">1</span>
                  <h3 className="text-xl font-bold">MVP Stage (0-6 months)</h3>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  <strong>Goal:</strong> Prove value with one use case. Ship something that works.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-id8-orange mb-2">Core Team (3-4 people)</p>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>AI Product Manager</strong> — defines the use case and success metrics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>ML Engineer / Applied Scientist</strong> — builds the initial model</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>Platform Engineer</strong> — sets up infrastructure and deployment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>Business Domain Expert</strong> — validates approach and results</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-id8-orange mb-2">Contract/Advisory</p>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>AI Strategy Consultant</strong> (20% time) — validates direction</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>Data Engineer</strong> (contract) — pipeline setup only</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-3 bg-[var(--bg-primary)] rounded-lg">
                  <p className="text-xs text-[var(--text-tertiary)]">
                    <strong>Cost estimate:</strong> $80K-$150K/month (mix of FTE + contractors)<br/>
                    <strong>Key risk:</strong> Hiring too many people before proving the use case works
                  </p>
                </div>
              </div>

              {/* Scale Stage */}
              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-lg">2</span>
                  <h3 className="text-xl font-bold">Scale Stage (6-18 months)</h3>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  <strong>Goal:</strong> Expand to 3-5 use cases. Build reusable infrastructure.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-id8-orange mb-2">Expand Core Team (8-12 people)</p>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>AI Product Lead</strong> — manages roadmap across use cases</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>ML Engineers (2-3)</strong> — specialized by use case type</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>MLOps Engineer</strong> — monitoring, deployment, versioning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>Data Engineers (2)</strong> — pipeline maintenance and scaling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>AI Product Designers</strong> — UX for AI-powered features</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>Business Integration Leads (2-3)</strong> — change management</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-id8-orange mb-2">Add New Capabilities</p>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>AI Ethics Lead</strong> (internal or advisory) — governance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>Research Scientists</strong> (contract) — specialized model tuning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>QA/Testing Specialists</strong> — model validation and regression</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-3 bg-[var(--bg-primary)] rounded-lg">
                  <p className="text-xs text-[var(--text-tertiary)]">
                    <strong>Cost estimate:</strong> $200K-$400K/month (mostly FTE, selective contractors)<br/>
                    <strong>Key risk:</strong> Scaling team faster than infrastructure can support
                  </p>
                </div>
              </div>

              {/* Production Stage */}
              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-lg">3</span>
                  <h3 className="text-xl font-bold">Production Stage (18+ months)</h3>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  <strong>Goal:</strong> AI is core to operations. Focus on reliability, compliance, and continuous improvement.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-id8-orange mb-2">Mature Team Structure (15-25 people)</p>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>Head of AI / VP of AI</strong> — strategic leadership</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>ML Platform Team (4-6)</strong> — infrastructure, tools, frameworks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>Applied ML Teams (8-12)</strong> — organized by business domain</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>AI Governance Office (2-3)</strong> — compliance, risk, ethics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>AI Product Managers (3-5)</strong> — embedded in business units</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>Security & Compliance Lead</strong> — AI-specific risks</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-id8-orange mb-2">Ongoing Specialists</p>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>Research Scientists</strong> — R&D for next-gen capabilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>External Auditors</strong> — third-party model validation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-id8-orange mt-1">•</span>
                        <span><strong>Training & Enablement Team</strong> — upskilling the org</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-3 bg-[var(--bg-primary)] rounded-lg">
                  <p className="text-xs text-[var(--text-tertiary)]">
                    <strong>Cost estimate:</strong> $500K-$1M+/month (fully-staffed AI function)<br/>
                    <strong>Key risk:</strong> Becoming too centralized; losing connection to business needs
                  </p>
                </div>
              </div>
            </div>

            {/* AI Competency Matrix */}
            <h2>The AI Competency Matrix</h2>
            <p>
              Not all AI roles are created equal. Use this matrix to understand where each role sits on two dimensions: <strong>Technical vs Business</strong> and <strong>Strategic vs Operational</strong>.
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Role</th>
                    <th className="text-center py-3 px-4">Technical ↔ Business</th>
                    <th className="text-center py-3 px-4">Strategic ↔ Operational</th>
                    <th className="text-left py-3 px-4">Core Responsibility</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Head of AI</td>
                    <td className="py-3 px-4 text-center">Balanced</td>
                    <td className="py-3 px-4 text-center text-blue-400">Strategic</td>
                    <td className="py-3 px-4">Vision, roadmap, stakeholder alignment</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">AI Product Manager</td>
                    <td className="py-3 px-4 text-center text-green-400">Business-leaning</td>
                    <td className="py-3 px-4 text-center">Balanced</td>
                    <td className="py-3 px-4">Define use cases, success metrics, prioritization</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">ML Engineer</td>
                    <td className="py-3 px-4 text-center text-red-400">Technical</td>
                    <td className="py-3 px-4 text-center text-purple-400">Operational</td>
                    <td className="py-3 px-4">Build, train, and tune models</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Data Scientist</td>
                    <td className="py-3 px-4 text-center text-red-400">Technical</td>
                    <td className="py-3 px-4 text-center">Balanced</td>
                    <td className="py-3 px-4">Exploratory analysis, hypothesis testing, insights</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">MLOps Engineer</td>
                    <td className="py-3 px-4 text-center text-red-400">Technical</td>
                    <td className="py-3 px-4 text-center text-purple-400">Operational</td>
                    <td className="py-3 px-4">Deployment, monitoring, infrastructure reliability</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Data Engineer</td>
                    <td className="py-3 px-4 text-center text-red-400">Technical</td>
                    <td className="py-3 px-4 text-center text-purple-400">Operational</td>
                    <td className="py-3 px-4">Data pipelines, quality, transformation</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">AI Ethics Lead</td>
                    <td className="py-3 px-4 text-center">Balanced</td>
                    <td className="py-3 px-4 text-center text-blue-400">Strategic</td>
                    <td className="py-3 px-4">Risk assessment, governance, compliance frameworks</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Research Scientist</td>
                    <td className="py-3 px-4 text-center text-red-400">Technical</td>
                    <td className="py-3 px-4 text-center text-blue-400">Strategic</td>
                    <td className="py-3 px-4">Novel approaches, R&D, algorithm innovation</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong>How to use this:</strong> If your team skews too heavily toward one quadrant, you'll struggle. Too technical-operational? You'll build impressive models nobody uses. Too business-strategic? You'll have vision without execution.
            </p>

            {/* Hiring Profiles */}
            <h2>Detailed Hiring Profiles</h2>
            <p>
              Here are the four most critical roles, with specific guidance on what to look for:
            </p>

            <div className="not-prose my-8 space-y-6">
              {/* Data Scientist */}
              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                <h3 className="text-lg font-bold mb-3 text-id8-orange">Data Scientist</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-1">What they do</p>
                    <p>Explore data, identify patterns, build statistical models, generate insights that inform business decisions.</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Must-have skills</p>
                    <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
                      <li>Statistical analysis (regression, hypothesis testing, A/B testing)</li>
                      <li>Python or R fluency</li>
                      <li>SQL for data extraction and manipulation</li>
                      <li>Data visualization (Tableau, matplotlib, etc.)</li>
                      <li>Business acumen — can translate technical findings to business language</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Red flags</p>
                    <p className="text-[var(--text-secondary)]">Can't explain their work to non-technical audiences. No experience with messy, real-world data. Obsessed with algorithms but weak on business context.</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Typical comp (US, 2026)</p>
                    <p className="text-[var(--text-secondary)]">$120K-$180K (mid-level), $180K-$250K+ (senior/lead)</p>
                  </div>
                </div>
              </div>

              {/* ML Engineer */}
              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                <h3 className="text-lg font-bold mb-3 text-id8-orange">ML Engineer / Applied Scientist</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-1">What they do</p>
                    <p>Take models from prototype to production. Focus on performance, reliability, and integration with existing systems.</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Must-have skills</p>
                    <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
                      <li>Deep learning frameworks (PyTorch, TensorFlow, JAX)</li>
                      <li>Model training, tuning, and optimization</li>
                      <li>Software engineering fundamentals (version control, testing, CI/CD)</li>
                      <li>Cloud platforms (AWS SageMaker, GCP Vertex AI, Azure ML)</li>
                      <li>Production experience — has shipped models that served real users</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Red flags</p>
                    <p className="text-[var(--text-secondary)]">Only academic or Kaggle experience. Can't discuss deployment challenges. Weak on software engineering practices.</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Typical comp (US, 2026)</p>
                    <p className="text-[var(--text-secondary)]">$150K-$220K (mid-level), $220K-$350K+ (senior/staff)</p>
                  </div>
                </div>
              </div>

              {/* AI Product Manager */}
              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                <h3 className="text-lg font-bold mb-3 text-id8-orange">AI Product Manager</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-1">What they do</p>
                    <p>Define what gets built, why, and for whom. Bridge between business stakeholders and technical teams. Own success metrics.</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Must-have skills</p>
                    <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
                      <li>Product management fundamentals (user research, roadmapping, prioritization)</li>
                      <li>AI/ML literacy — doesn't need to code, but must understand capabilities and limits</li>
                      <li>Metrics-driven decision making</li>
                      <li>Stakeholder management and communication</li>
                      <li>Experience with AI product lifecycles (not just traditional software)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Red flags</p>
                    <p className="text-[var(--text-secondary)]">No technical background. Can't define success metrics. Hasn't worked with data scientists or ML engineers before.</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Typical comp (US, 2026)</p>
                    <p className="text-[var(--text-secondary)]">$140K-$200K (mid-level), $200K-$300K+ (senior/lead)</p>
                  </div>
                </div>
              </div>

              {/* AI Ethics Lead */}
              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                <h3 className="text-lg font-bold mb-3 text-id8-orange">AI Ethics / Governance Lead</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-1">What they do</p>
                    <p>Identify and mitigate risks related to bias, fairness, transparency, and compliance. Build governance frameworks.</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Must-have skills</p>
                    <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
                      <li>Understanding of AI ethics frameworks (fairness, accountability, transparency)</li>
                      <li>Risk assessment and mitigation strategies</li>
                      <li>Regulatory knowledge (GDPR, AI Act, industry-specific regulations)</li>
                      <li>Cross-functional collaboration — works with legal, compliance, and product teams</li>
                      <li>Technical enough to understand model behavior and limitations</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Red flags</p>
                    <p className="text-[var(--text-secondary)]">Purely academic background with no practical experience. Can't articulate business trade-offs. Sees ethics as a "blocker" rather than a product feature.</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-tertiary)] mb-1">Typical comp (US, 2026)</p>
                    <p className="text-[var(--text-secondary)]">$130K-$190K (mid-level), $190K-$280K+ (senior/head)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Build vs Borrow */}
            <h2>Build vs Borrow vs Upskill</h2>
            <p>
              Not every role needs to be a full-time hire. Here's when to hire, when to contract, and when to train existing staff:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Scenario</th>
                    <th className="text-left py-3 px-4 text-green-400">Recommended Approach</th>
                    <th className="text-left py-3 px-4">Why</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">First AI project, unclear ROI</td>
                    <td className="py-3 px-4 font-bold text-green-400">Contract specialists</td>
                    <td className="py-3 px-4">Minimize commitment until value is proven</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Multiple use cases validated</td>
                    <td className="py-3 px-4 font-bold text-green-400">Hire core team</td>
                    <td className="py-3 px-4">Consistent workload justifies full-time staff</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Specialized, one-time need</td>
                    <td className="py-3 px-4 font-bold text-green-400">Contract expert</td>
                    <td className="py-3 px-4">Expensive to hire and retain for rare skillset</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Strong software team, new to AI</td>
                    <td className="py-3 px-4 font-bold text-green-400">Upskill + hire 1-2 specialists</td>
                    <td className="py-3 px-4">Leverage existing talent with targeted expertise</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Strategic capability long-term</td>
                    <td className="py-3 px-4 font-bold text-green-400">Build in-house team</td>
                    <td className="py-3 px-4">Core competency requires ownership and control</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Governance and risk management</td>
                    <td className="py-3 px-4 font-bold text-green-400">Hybrid (internal lead + external audit)</td>
                    <td className="py-3 px-4">Need both internal advocacy and third-party validation</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong>Rule of thumb:</strong> Contract for experimentation. Hire for repetition. Upskill for cultural transformation.
            </p>

            {/* Common Mistakes */}
            <h2>Six Expensive Mistakes (And How to Avoid Them)</h2>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #1</p>
                <p className="font-bold">Hiring a "Head of AI" before you know what you're building</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  <strong>Why it fails:</strong> Senior leaders need direction. Without a validated use case, they'll spend months "strategizing" instead of shipping.<br/>
                  <strong>Instead:</strong> Start with an AI Product Manager who can validate use cases. Promote or hire the Head of AI once you have momentum.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #2</p>
                <p className="font-bold">Assuming software engineers can "pick up" ML on the job</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  <strong>Why it fails:</strong> ML engineering is a distinct discipline with different mental models, tools, and best practices.<br/>
                  <strong>Instead:</strong> Hire at least one experienced ML engineer. They can mentor software engineers who want to transition, but you need the expertise first.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #3</p>
                <p className="font-bold">Building a centralized "AI Lab" disconnected from business units</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  <strong>Why it fails:</strong> Labs produce impressive demos that don't solve real problems. Business units don't adopt what they didn't help build.<br/>
                  <strong>Instead:</strong> Embed AI talent in business units from the start. Central platform team is fine; central "innovation lab" usually fails.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #4</p>
                <p className="font-bold">Hiring only for technical skills and ignoring communication ability</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  <strong>Why it fails:</strong> AI projects live or die on stakeholder buy-in. Brilliant engineers who can't explain their work create friction and mistrust.<br/>
                  <strong>Instead:</strong> Assess communication skills in interviews. Ask candidates to explain a technical concept to a non-technical audience.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #5</p>
                <p className="font-bold">Skipping the AI Product Manager role</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  <strong>Why it fails:</strong> Without a dedicated product owner, engineers build what's technically interesting instead of what's business-critical.<br/>
                  <strong>Instead:</strong> The AI PM is your most important first hire. They define the problem, which makes every other hire more effective.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #6</p>
                <p className="font-bold">Treating AI governance as an afterthought</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  <strong>Why it fails:</strong> Retrofitting ethics and compliance is expensive and slow. You'll delay launches and create technical debt.<br/>
                  <strong>Instead:</strong> Add governance expertise early (even part-time or advisory). It's cheaper to build it in than to bolt it on later.
                </p>
              </div>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Exercise: Design Your Team Structure</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 30 minutes<br />
                <strong>You'll need:</strong> Your prioritized use case list (from Module 2) and realistic budget constraints
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Identify your stage (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Are you at MVP, Scale, or Production? Be honest about where you are, not where you want to be.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">List your must-have roles (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For your stage and use cases, which roles are non-negotiable? Which are nice-to-have? Reference the stage-based team structures above.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Decide: hire vs contract vs upskill (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For each must-have role, determine whether to hire full-time, contract, or train existing staff. Document your reasoning.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Estimate costs and timeline (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Use the comp ranges provided. Build a 6-month and 12-month budget. Be realistic about hiring timelines (3-6 months for specialized roles).</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A one-page team structure plan showing roles, timing (months 0-6 vs 6-12), hire/contract/upskill decisions, and budget by quarter. This becomes your hiring roadmap.
                </p>
              </div>

              <div className="mt-4 p-4 border border-id8-orange/30 rounded-lg">
                <p className="text-xs font-mono uppercase tracking-wider text-id8-orange mb-2">Template Structure</p>
                <div className="text-sm space-y-2 text-[var(--text-secondary)]">
                  <p><strong>Section 1:</strong> Current State (team size, skills, gaps)</p>
                  <p><strong>Section 2:</strong> Months 0-6 (roles, hire/contract, estimated cost)</p>
                  <p><strong>Section 3:</strong> Months 6-12 (next hires based on progress)</p>
                  <p><strong>Section 4:</strong> Key assumptions and risks</p>
                </div>
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
                  "AI teams must evolve by stage. Don't hire for Production when you're still at MVP — you'll waste money and lose focus.",
                  "The AI Competency Matrix prevents lopsided teams. Balance Technical/Business and Strategic/Operational or your projects will stall.",
                  "AI Product Manager is your most critical first hire. They define the problem, making every other hire more effective.",
                  "Contract for experimentation, hire for repetition, upskill for cultural transformation. Mix these approaches strategically.",
                  "Most AI failures trace to people problems, not technology. Communication skills matter as much as technical chops.",
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
              You now have a concrete hiring roadmap. You know which roles to prioritize, when to bring them on, and how much they'll cost. In the next module, we'll cover how to set budgets that align with AI's unique cost structure — and avoid the hidden expenses that derail projects.
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
                href="/academy/ai-for-leaders/module-3"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: From Concept to Execution
              </Link>
              <Link
                href="/academy/ai-for-leaders/module-5"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Budgeting for AI
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
