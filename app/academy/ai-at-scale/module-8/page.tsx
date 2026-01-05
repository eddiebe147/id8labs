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

const LayersIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
)

export default function Module8Page() {
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
                href="/academy/ai-at-scale"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to AI at Scale
              </Link>
            </m.div>

            <m.div variants={fadeUp}>
              <CourseProgress
                currentModule={8}
                totalModules={8}
                courseTitle="AI at Scale"
              />
            </m.div>

            <m.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-sm font-mono mb-6"
            >
              <span>Module 8</span>
              <span className="text-id8-orange/50">•</span>
              <span>~60 minutes</span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Enterprise AI Architecture
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              Building for the next 10 years, not the next demo
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
                The Architecture Problem
              </h2>
              <h3 className="text-2xl font-bold mb-4">When Your "Temporary" AI Solution Becomes Permanent Infrastructure</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  You built an MVP. It worked. So you built another one. And another. Now you have 15 AI services, each architected differently, none talking to each other, all maintained by different teams.
                </p>
                <p>
                  Adding a new model takes weeks of custom integration. Security is inconsistent. Costs are opaque. Every team reinvents the wheel. Technical debt compounds daily.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This is what happens when you build for demos instead of decades. This module teaches you to architect AI systems that scale, adapt, and last.
                </p>
              </div>
            </div>

            {/* The Architecture Principles */}
            <h2>The Five Principles of Scalable AI Architecture</h2>
            <p>
              These principles separate temporary hacks from lasting infrastructure. They're not trendy. They're timeless:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">1️⃣</span>
                  <h4 className="font-bold text-id8-orange">Separation of Concerns</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Models, data, infrastructure, and applications are distinct layers with clear boundaries
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Why it matters:</strong> Allows teams to evolve each layer independently. Swap models without rewriting apps. Update infrastructure without touching data pipelines.
                </p>
              </div>

              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">2️⃣</span>
                  <h4 className="font-bold text-id8-orange">API-First Design</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Every AI capability exposed through versioned, documented, stable APIs
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Why it matters:</strong> Internal and external consumption look identical. Enables discovery, reuse, and governance at scale.
                </p>
              </div>

              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">3️⃣</span>
                  <h4 className="font-bold text-id8-orange">Declarative Over Imperative</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Define what you want (desired state) not how to do it (implementation steps)
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Why it matters:</strong> Infrastructure as code. Reproducible environments. Self-healing systems. Easier to reason about and maintain.
                </p>
              </div>

              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">4️⃣</span>
                  <h4 className="font-bold text-id8-orange">Observability by Design</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Logging, metrics, and tracing built in, not bolted on
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Why it matters:</strong> Debug production issues in minutes, not days. Understand system behavior. Make data-driven optimization decisions.
                </p>
              </div>

              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">5️⃣</span>
                  <h4 className="font-bold text-id8-orange">Graceful Degradation</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Systems continue operating (with reduced functionality) when components fail
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Why it matters:</strong> AI models will fail. APIs will timeout. Servers will crash. Your architecture should expect this and handle it elegantly.
                </p>
              </div>
            </div>

            {/* The Reference Architecture */}
            <h2>The Reference Architecture</h2>
            <p>
              Here's a proven architecture that scales from 1 model to 100+. It's opinionated but flexible. Use it as a starting point, not a straitjacket:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <LayersIcon />
                    <h4 className="font-bold text-id8-orange">Layer 1: Data Foundation</h4>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    Where raw data becomes model-ready features
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-[var(--bg-primary)] rounded">
                      <p className="font-mono text-xs text-green-400 mb-1">Components</p>
                      <ul className="text-[var(--text-tertiary)] space-y-1">
                        <li>• Data lake (raw storage)</li>
                        <li>• Data warehouse (structured)</li>
                        <li>• Feature store (ML-ready)</li>
                        <li>• Vector database (embeddings)</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-[var(--bg-primary)] rounded">
                      <p className="font-mono text-xs text-blue-400 mb-1">Responsibilities</p>
                      <ul className="text-[var(--text-tertiary)] space-y-1">
                        <li>• Data ingestion & ETL</li>
                        <li>• Quality validation</li>
                        <li>• Feature engineering</li>
                        <li>• Version control</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <LayersIcon />
                    <h4 className="font-bold text-id8-orange">Layer 2: Model Platform</h4>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    Where models are trained, evaluated, and served
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-[var(--bg-primary)] rounded">
                      <p className="font-mono text-xs text-green-400 mb-1">Components</p>
                      <ul className="text-[var(--text-tertiary)] space-y-1">
                        <li>• Training infrastructure</li>
                        <li>• Model registry</li>
                        <li>• Inference servers</li>
                        <li>• Experiment tracking</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-[var(--bg-primary)] rounded">
                      <p className="font-mono text-xs text-blue-400 mb-1">Responsibilities</p>
                      <ul className="text-[var(--text-tertiary)] space-y-1">
                        <li>• Model development</li>
                        <li>• Hyperparameter tuning</li>
                        <li>• Model serving</li>
                        <li>• Performance monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <LayersIcon />
                    <h4 className="font-bold text-id8-orange">Layer 3: Application Services</h4>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    Where AI capabilities become business features
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-[var(--bg-primary)] rounded">
                      <p className="font-mono text-xs text-green-400 mb-1">Components</p>
                      <ul className="text-[var(--text-tertiary)] space-y-1">
                        <li>• API gateway</li>
                        <li>• Business logic layer</li>
                        <li>• Workflow orchestration</li>
                        <li>• User interfaces</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-[var(--bg-primary)] rounded">
                      <p className="font-mono text-xs text-blue-400 mb-1">Responsibilities</p>
                      <ul className="text-[var(--text-tertiary)] space-y-1">
                        <li>• Request routing</li>
                        <li>• Business rules</li>
                        <li>• User experience</li>
                        <li>• Integration APIs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <LayersIcon />
                    <h4 className="font-bold text-id8-orange">Layer 4: Cross-Cutting Concerns</h4>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    Shared services that support all layers
                  </p>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="p-3 bg-[var(--bg-primary)] rounded">
                      <p className="font-mono text-xs text-green-400 mb-1">Components</p>
                      <ul className="text-[var(--text-tertiary)] space-y-1">
                        <li>• Auth & authorization</li>
                        <li>• Logging & monitoring</li>
                        <li>• Secret management</li>
                        <li>• CI/CD pipelines</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-[var(--bg-primary)] rounded">
                      <p className="font-mono text-xs text-blue-400 mb-1">Responsibilities</p>
                      <ul className="text-[var(--text-tertiary)] space-y-1">
                        <li>• Security & compliance</li>
                        <li>• Observability</li>
                        <li>• Deployment automation</li>
                        <li>• Cost tracking</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* The Build vs Buy Decision Matrix */}
            <h2>The Build vs Buy Decision Matrix</h2>
            <p>
              Not every layer needs to be built from scratch. Here's how to decide what to build vs buy:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Component</th>
                    <th className="text-left py-3 px-4">Build If...</th>
                    <th className="text-left py-3 px-4">Buy If...</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Data Pipeline</td>
                    <td className="py-3 px-4">Complex transformations, proprietary data</td>
                    <td className="py-3 px-4">Standard ETL, cloud-native data</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Feature Store</td>
                    <td className="py-3 px-4">Unique feature requirements, high volume</td>
                    <td className="py-3 px-4">Standard ML features, getting started</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Model Training</td>
                    <td className="py-3 px-4">Proprietary algorithms, competitive moat</td>
                    <td className="py-3 px-4">Standard ML tasks, non-differentiating</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Inference Serving</td>
                    <td className="py-3 px-4">Extreme scale, custom optimization</td>
                    <td className="py-3 px-4">Standard serving, managed is cheaper</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Monitoring</td>
                    <td className="py-3 px-4">Never. Use existing tools.</td>
                    <td className="py-3 px-4">Always. Established vendors exist.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">LLM APIs</td>
                    <td className="py-3 px-4">Building foundational models yourself</td>
                    <td className="py-3 px-4">Using LLMs as capabilities (99% of cases)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-8 p-5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm font-mono text-blue-400 mb-2">The 80/20 Rule for AI Architecture</p>
              <p className="text-sm text-[var(--text-primary)]">
                80% of your architecture should use proven, boring technology. The 20% you build custom should be where you have genuine differentiation. Everything else is overhead that distracts from your core value.
              </p>
            </div>

            {/* Architecture Decision Records */}
            <h2>Architecture Decision Records (ADRs)</h2>
            <p>
              Document your architectural decisions with this simple template. It prevents amnesia and makes onboarding new team members dramatically faster:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <p className="font-bold text-id8-orange mb-3">ADR Template</p>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-mono text-xs text-green-400 mb-1">Title</p>
                  <p className="text-[var(--text-secondary)]">Short, descriptive name (e.g., "Use Postgres for Feature Store")</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-green-400 mb-1">Status</p>
                  <p className="text-[var(--text-secondary)]">Proposed | Accepted | Deprecated | Superseded</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-green-400 mb-1">Context</p>
                  <p className="text-[var(--text-secondary)]">What forces are at play? What are the constraints? What problem are we solving?</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-green-400 mb-1">Decision</p>
                  <p className="text-[var(--text-secondary)]">What we decided to do. Be specific and concrete.</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-green-400 mb-1">Consequences</p>
                  <p className="text-[var(--text-secondary)]">What becomes easier? What becomes harder? Trade-offs accepted.</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-green-400 mb-1">Alternatives Considered</p>
                  <p className="text-[var(--text-secondary)]">What else we looked at and why we didn't choose it.</p>
                </div>
              </div>
            </div>

            {/* Common Architecture Mistakes */}
            <h2>Five Architecture Mistakes That Kill Scale</h2>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #1</p>
                <p className="font-bold">Tightly Coupling Models to Applications</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Embedding model logic in app code means you can't iterate on models without redeploying apps. <strong>Fix:</strong> Models behind APIs, apps consume predictions, never model internals.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #2</p>
                <p className="font-bold">No Model Versioning Strategy</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  You deploy a new model version. It breaks 3 apps you didn't know existed. Chaos ensues. <strong>Fix:</strong> Semantic versioning, deprecation timelines, parallel deployment.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #3</p>
                <p className="font-bold">Building a Data Monolith</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  One giant database that every model pulls from. Any schema change is a negotiation. Performance degrades as teams compete for resources. <strong>Fix:</strong> Domain-driven data architecture, clear ownership, federated approach.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #4</p>
                <p className="font-bold">Ignoring the Cold Start Problem</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  First request takes 30 seconds because you're loading a 2GB model. Users give up. <strong>Fix:</strong> Model preloading, warm pools, caching, or smaller models.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #5</p>
                <p className="font-bold">No Clear Data Lineage</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Model accuracy drops. You can't trace which data changed or why. Debugging is impossible. <strong>Fix:</strong> Data versioning, feature lineage tracking, reproducible pipelines.
                </p>
              </div>
            </div>

            {/* Migration Strategy */}
            <h2>Migration Strategy: From Chaos to Architecture</h2>
            <p>
              You already have AI in production. It's messy. Here's how to migrate to proper architecture without breaking everything:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange rounded">
                <p className="font-mono text-xs text-id8-orange mb-1">Phase 1: Inventory & Assessment (Week 1-2)</p>
                <p className="font-bold mb-1">Know what you have</p>
                <ul className="text-sm text-[var(--text-tertiary)] space-y-1 mt-2">
                  <li>• Map all existing AI services and dependencies</li>
                  <li>• Document current data flows and model deployment processes</li>
                  <li>• Identify the biggest pain points and technical debt</li>
                  <li>• Prioritize by impact and migration difficulty</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange rounded">
                <p className="font-mono text-xs text-id8-orange mb-1">Phase 2: Define Target Architecture (Week 3-4)</p>
                <p className="font-bold mb-1">Design your future state</p>
                <ul className="text-sm text-[var(--text-tertiary)] space-y-1 mt-2">
                  <li>• Use the reference architecture as a starting point</li>
                  <li>• Write ADRs for major architectural decisions</li>
                  <li>• Get buy-in from stakeholders on timeline and approach</li>
                  <li>• Define success metrics for the migration</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange rounded">
                <p className="font-mono text-xs text-id8-orange mb-1">Phase 3: Parallel Build (Month 2-4)</p>
                <p className="font-bold mb-1">Build new alongside old</p>
                <ul className="text-sm text-[var(--text-tertiary)] space-y-1 mt-2">
                  <li>• Stand up foundational layers (data, model platform)</li>
                  <li>• Migrate one low-risk model as proof of concept</li>
                  <li>• Run parallel for validation (shadow mode)</li>
                  <li>• Document learnings and iterate on architecture</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange rounded">
                <p className="font-mono text-xs text-id8-orange mb-1">Phase 4: Incremental Migration (Month 5-12)</p>
                <p className="font-bold mb-1">Move services one at a time</p>
                <ul className="text-sm text-[var(--text-tertiary)] space-y-1 mt-2">
                  <li>• Migrate services in priority order</li>
                  <li>• Maintain backward compatibility during transition</li>
                  <li>• Monitor performance and rollback if needed</li>
                  <li>• Decommission old systems only after validation</li>
                </ul>
              </div>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Architecture Decision Record</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 45 minutes<br />
                <strong>You'll need:</strong> One significant architectural decision you're facing (or have made recently)
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Identify the decision (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Pick a real architectural decision: which database, which ML platform, build vs buy, monolith vs microservices for ML, etc.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Document the context (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">What's the problem? What constraints exist (budget, timeline, skills, compliance)? What are the forces in play?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Explore alternatives (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">List 2-3 viable options. For each: pros, cons, costs, risks. Be objective about trade-offs.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Make and document the decision (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Choose one option. Document the decision, rationale, and expected consequences using the ADR template.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A complete Architecture Decision Record following the template. Store it in your repo (docs/adr/). Start a practice of documenting all significant decisions this way. Future you will be grateful.
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
                  "Architecture principles (separation of concerns, API-first, graceful degradation) matter more than specific technologies.",
                  "The 4-layer reference architecture (data, model platform, applications, cross-cutting concerns) scales from 1 to 100+ models.",
                  "Build custom only where you have differentiation. Buy proven, boring technology for everything else (80/20 rule).",
                  "Architecture Decision Records prevent organizational amnesia. Document why you made choices, not just what you chose.",
                  "Migration from chaos to architecture is incremental: inventory → design → parallel build → migrate services one at a time.",
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
              Good architecture is invisible when it works and obvious when it doesn't. The organizations that scale AI successfully are the ones that invested in architecture early, documented their decisions, and built systems designed to evolve. You now have the frameworks to do the same. Go build something that lasts.
            </p>

            {/* Module Complete */}
            <ModuleComplete
              courseSlug="ai-at-scale"
              moduleSlug="module-8"
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
                href="/academy/ai-at-scale/module-7"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: Team Scaling Patterns
              </Link>
              <Link
                href="/academy"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Back to Academy
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
