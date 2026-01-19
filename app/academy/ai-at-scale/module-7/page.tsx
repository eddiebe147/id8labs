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

const UsersIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

export default function Module7Page() {
  return (
    <ModuleAnnotations courseSlug="ai-at-scale" moduleSlug="module-7">
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
                href="/academy/ai-at-scale"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to AI at Scale
              </Link>
            </m.div>

            <m.div variants={fadeUp}>
              <CourseProgress
                currentModule={7}
                totalModules={8}
                courseTitle="AI at Scale"
              />
            </m.div>

            <m.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-sm font-mono mb-6"
            >
              <span>Module 7</span>
              <span className="text-id8-orange/50">•</span>
              <span>~45 minutes</span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Team Scaling Patterns
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              From lone data scientist to AI platform team
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
                The Team Scaling Problem
              </h2>
              <h3 className="text-2xl font-bold mb-4">Why Your First Data Scientist Can't Be Your Entire AI Team</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  You hired a brilliant data scientist. She built a proof-of-concept that wowed leadership. Now the roadmap has 12 more AI projects and suddenly she's expected to be researcher, engineer, product manager, and on-call support.
                </p>
                <p>
                  Six months later, she's burned out. Half the projects are stalled. Production systems are held together with duct tape. You're back in the market, but you don't even know what role to hire for.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This is the team scaling trap. This module shows you how to build AI teams that scale with your ambitions.
                </p>
              </div>
            </div>

            {/* The Team Evolution Stages */}
            <h2>The Four Stages of AI Team Evolution</h2>
            <p>
              AI teams don't appear fully formed. They evolve through predictable stages. Understanding where you are helps you plan the next hire:
            </p>

            <div className="not-prose my-8 space-y-6">
              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 text-xs font-mono bg-blue-500/20 text-blue-400 rounded">STAGE 1</span>
                  <h4 className="font-bold text-id8-orange">The Lone Experimenter (0-1 people)</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  One data scientist or ML engineer doing everything: research, prototyping, demos, stakeholder management.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-mono text-xs text-green-400 mb-1">Good For:</p>
                    <ul className="text-[var(--text-tertiary)] space-y-1">
                      <li>• Initial POCs and exploration</li>
                      <li>• Learning what's possible</li>
                      <li>• Building executive buy-in</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-red-400 mb-1">Breaks At:</p>
                    <ul className="text-[var(--text-tertiary)] space-y-1">
                      <li>• 2+ concurrent projects</li>
                      <li>• First production deployment</li>
                      <li>• Any on-call requirements</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 text-xs font-mono bg-blue-500/20 text-blue-400 rounded">STAGE 2</span>
                  <h4 className="font-bold text-id8-orange">The Research + Engineering Split (2-4 people)</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  Data scientists focus on models. ML engineers handle deployment, infrastructure, and production.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-mono text-xs text-green-400 mb-1">Good For:</p>
                    <ul className="text-[var(--text-tertiary)] space-y-1">
                      <li>• 2-5 projects in flight</li>
                      <li>• First production models</li>
                      <li>• Establishing best practices</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-red-400 mb-1">Breaks At:</p>
                    <ul className="text-[var(--text-tertiary)] space-y-1">
                      <li>• 5+ production models</li>
                      <li>• Complex data pipelines</li>
                      <li>• Cross-team dependencies</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 text-xs font-mono bg-blue-500/20 text-blue-400 rounded">STAGE 3</span>
                  <h4 className="font-bold text-id8-orange">The Platform Team (5-12 people)</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  Specialized roles emerge: data engineering, MLOps, product management. Shared infrastructure and standards.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-mono text-xs text-green-400 mb-1">Good For:</p>
                    <ul className="text-[var(--text-tertiary)] space-y-1">
                      <li>• 10+ production models</li>
                      <li>• Reusable ML infrastructure</li>
                      <li>• Multiple product lines</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-red-400 mb-1">Breaks At:</p>
                    <ul className="text-[var(--text-tertiary)] space-y-1">
                      <li>• 20+ models across divisions</li>
                      <li>• Competing priorities</li>
                      <li>• Org-wide AI adoption</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-1 text-xs font-mono bg-blue-500/20 text-blue-400 rounded">STAGE 4</span>
                  <h4 className="font-bold text-id8-orange">The Distributed Model (12+ people)</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  Central platform team + embedded AI specialists in product teams. Center of excellence sets standards.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="font-mono text-xs text-green-400 mb-1">Good For:</p>
                    <ul className="text-[var(--text-tertiary)] space-y-1">
                      <li>• AI as core competency</li>
                      <li>• Enterprise-wide deployment</li>
                      <li>• Diverse use cases</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-red-400 mb-1">Watch Out For:</p>
                    <ul className="text-[var(--text-tertiary)] space-y-1">
                      <li>• Fragmentation and duplication</li>
                      <li>• Inconsistent quality</li>
                      <li>• Coordination overhead</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* The Role Breakdown */}
            <h2>The Role Breakdown: Who Does What</h2>
            <p>
              AI isn't a single job title. It's a constellation of specialized roles. Here's what each does and when you need them:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Role</th>
                    <th className="text-left py-3 px-4">Core Responsibility</th>
                    <th className="text-left py-3 px-4">Hire When...</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Data Scientist</td>
                    <td className="py-3 px-4">Model development, experimentation, analysis</td>
                    <td className="py-3 px-4">First hire for POCs and research</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">ML Engineer</td>
                    <td className="py-3 px-4">Model deployment, serving, productionization</td>
                    <td className="py-3 px-4">First production model goes live</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Data Engineer</td>
                    <td className="py-3 px-4">Data pipelines, ETL, feature engineering</td>
                    <td className="py-3 px-4">Data quality is blocking progress</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">MLOps Engineer</td>
                    <td className="py-3 px-4">Infrastructure, monitoring, automation</td>
                    <td className="py-3 px-4">3+ production models need managing</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">AI Product Manager</td>
                    <td className="py-3 px-4">Roadmap, prioritization, stakeholder alignment</td>
                    <td className="py-3 px-4">Team has 3+ people and competing priorities</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Research Scientist</td>
                    <td className="py-3 px-4">Novel algorithms, publications, deep R&D</td>
                    <td className="py-3 px-4">Competitive advantage requires innovation</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">AI Ethicist</td>
                    <td className="py-3 px-4">Bias detection, fairness, responsible AI</td>
                    <td className="py-3 px-4">Models impact users at scale or high-stakes domains</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-8 p-5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm font-mono text-blue-400 mb-2">Hiring Priority Rule</p>
              <p className="text-sm text-[var(--text-primary)]">
                Hire for bottlenecks, not resumes. If models are great but nothing ships, hire ML engineer before another data scientist. If production is stable but you're out of ideas, hire data scientist. Let pain points guide hiring, not org charts.
              </p>
            </div>

            {/* The Hiring Roadmap */}
            <h2>The Hiring Roadmap by Headcount</h2>
            <p>
              Here's a proven hiring sequence that scales AI teams from 1 to 20 people:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange rounded">
                <p className="font-mono text-xs text-id8-orange mb-1">Person #1</p>
                <p className="font-bold mb-1">Senior Data Scientist or ML Engineer</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Generalist who can prototype and ship. Bias toward shipping over perfect research. This person sets the culture.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange rounded">
                <p className="font-mono text-xs text-id8-orange mb-1">Person #2</p>
                <p className="font-bold mb-1">ML Engineer (if #1 was DS) or Data Scientist (if #1 was MLE)</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Complete the research-to-production loop. Two people who can collaborate from idea to deployment.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange rounded">
                <p className="font-mono text-xs text-id8-orange mb-1">Person #3</p>
                <p className="font-bold mb-1">Data Engineer</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Data quality and pipelines are now the constraint. Free up DS/MLE to focus on models.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange rounded">
                <p className="font-mono text-xs text-id8-orange mb-1">People #4-5</p>
                <p className="font-bold mb-1">Junior-to-Mid DS or MLE + AI Product Manager</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Scale execution capacity. PM keeps team aligned and unblocks dependencies.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange rounded">
                <p className="font-mono text-xs text-id8-orange mb-1">People #6-8</p>
                <p className="font-bold mb-1">MLOps Engineer + 2 more DS/MLE</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Infrastructure is now the bottleneck. MLOps builds reusable platform. More DS/MLE for feature velocity.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange rounded">
                <p className="font-mono text-xs text-id8-orange mb-1">People #9-12</p>
                <p className="font-bold mb-1">Specialize by Domain or Technical Area</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  NLP specialist, computer vision specialist, senior data engineer, another MLOps engineer. Depth over breadth now.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange rounded">
                <p className="font-mono text-xs text-id8-orange mb-1">People #13+</p>
                <p className="font-bold mb-1">Scale Based on Strategy</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Build out central platform team OR embed specialists in product teams. Add research scientists if innovation is competitive moat. Consider AI ethicist if impact is significant.
                </p>
              </div>
            </div>

            {/* Build vs Buy vs Partner */}
            <h2>Build vs Buy vs Partner</h2>
            <p>
              Hiring isn't the only way to scale capabilities. Smart organizations use a mix:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Strategy</th>
                    <th className="text-left py-3 px-4">Best For</th>
                    <th className="text-left py-3 px-4">Watch Out For</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Build (hire full-time)</td>
                    <td className="py-3 px-4">Core competencies, ongoing work, proprietary IP</td>
                    <td className="py-3 px-4">Slow to hire, expensive, retention risk</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Buy (SaaS/APIs)</td>
                    <td className="py-3 px-4">Commoditized AI (vision, NLP, speech), non-differentiating</td>
                    <td className="py-3 px-4">Vendor lock-in, cost at scale, limited customization</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Partner (consultants)</td>
                    <td className="py-3 px-4">Specialized expertise, time-boxed projects, skill gaps</td>
                    <td className="py-3 px-4">Expensive hourly, knowledge doesn't transfer, dependencies</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Upskill (train existing)</td>
                    <td className="py-3 px-4">Engineers learning ML, analysts learning Python</td>
                    <td className="py-3 px-4">Time investment, productivity dip during learning</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <p className="font-bold text-id8-orange mb-3">The 70-20-10 Rule for AI Capabilities</p>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li><strong>70% Buy:</strong> Use third-party APIs for commoditized AI (OpenAI, Google Vision, etc.)</li>
                <li><strong>20% Build:</strong> Hire for core, differentiating AI capabilities unique to your business</li>
                <li><strong>10% Partner:</strong> Bring in consultants for specialized projects and to fill temporary gaps</li>
              </ul>
              <p className="text-sm text-[var(--text-tertiary)] mt-3">
                Adjust ratios based on how strategic AI is to your competitive advantage. If AI is your product, flip to 70% build.
              </p>
            </div>

            {/* Team Culture & Rituals */}
            <h2>Team Culture & Rituals</h2>
            <p>
              The difference between functional and dysfunctional AI teams often comes down to culture and process:
            </p>

            <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-green-400 mb-2">Do This</h4>
                <ul className="text-sm space-y-2 text-[var(--text-secondary)]">
                  <li>✓ Weekly model review: what shipped, what's blocked</li>
                  <li>✓ Bi-weekly paper/tool review: share learnings</li>
                  <li>✓ Monthly metric review: track business impact</li>
                  <li>✓ Blameless postmortems when models fail</li>
                  <li>✓ Clear ownership: one DRI per model</li>
                  <li>✓ Experiment logging: track all attempts</li>
                  <li>✓ Code review for reproducibility</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-red-400 mb-2">Avoid This</h4>
                <ul className="text-sm space-y-2 text-[var(--text-secondary)]">
                  <li>✗ Research with no deployment path</li>
                  <li>✗ Models in production with no owner</li>
                  <li>✗ Accuracy as the only success metric</li>
                  <li>✗ Undocumented data pipelines</li>
                  <li>✗ Zero knowledge sharing between DS</li>
                  <li>✗ Building before understanding the problem</li>
                  <li>✗ Hero culture and single points of failure</li>
                </ul>
              </div>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: 12-Month Hiring Roadmap</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 30 minutes<br />
                <strong>You'll need:</strong> Current team state, project roadmap, budget constraints
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Assess current state (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">How many people? What roles? What stage are you in (1-4)? Be honest about capabilities vs needs.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Identify bottlenecks (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">What's blocking progress? Data quality? Deployment? Research capacity? Prioritization? Map bottlenecks to roles that would unblock them.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Plan your next 3 hires (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Use the hiring roadmap as a guide. For each hire: role, why now, what they'll unlock. Include realistic timeline (hiring takes 2-4 months).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Apply 70-20-10 rule (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Which capabilities should you buy vs build vs partner? Be strategic. Not everything requires a full-time hire.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A 12-month hiring roadmap with current state, identified bottlenecks, prioritized roles, hiring timeline, and build/buy/partner strategy. Share with leadership to align on team growth and budget.
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
                  "AI teams evolve through four stages: Lone Experimenter → Research+Engineering → Platform Team → Distributed Model.",
                  "Hire for bottlenecks, not org charts. If nothing ships, hire ML engineer. If deployed models are stale, hire data scientist.",
                  "The first 3 hires set the trajectory: generalist DS or MLE, then the opposite, then data engineer.",
                  "Use 70-20-10 rule: 70% buy commoditized AI, 20% build differentiating capabilities, 10% partner for gaps.",
                  "Culture matters more than headcount. Weekly reviews, blameless postmortems, and clear ownership beat heroics.",
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
              Teams are the foundation of everything else. Get the people and structure right, and technology challenges become solvable. Get it wrong, and no amount of budget or tools will save you. Next module: building the architecture that supports your growing AI ambitions for the next decade.
            </p>

            {/* Module Complete */}
            <ModuleComplete
              courseSlug="ai-at-scale"
              moduleSlug="module-7"
              nextModulePath="/academy/ai-at-scale/module-8"
            />

          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Link
                href="/academy/ai-at-scale/module-6"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: Cost Management
              </Link>
              <Link
                href="/academy/ai-at-scale/module-8"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Enterprise AI Architecture
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
