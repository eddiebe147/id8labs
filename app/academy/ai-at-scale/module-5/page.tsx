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

const AlertIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/>
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
                href="/academy/ai-at-scale"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to AI at Scale
              </Link>
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
              Scaling from Pilot to Production
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              The valley of death between POC and production
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">

            {/* The Reality Check */}
            <div className="not-prose mb-12 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                The Valley of Death
              </h2>
              <h3 className="text-2xl font-bold mb-4">Why 87% of AI Projects Never Make It to Production</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Your pilot worked. The demo impressed executives. The ROI projections look incredible. Everyone is excited to scale this thing.
                </p>
                <p>
                  Then reality hits. The model that ran on 10,000 records chokes on 10 million. The inference time that was "good enough" in testing becomes unusable at scale. The cost per prediction that seemed reasonable now threatens to consume your entire cloud budget.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This is the valley of death. Most AI projects die here. This module shows you how to cross it.
                </p>
              </div>
            </div>

            {/* The Scaling Traps */}
            <h2>The Six Scaling Traps</h2>
            <p>
              Before we talk about what works, let's name what kills projects. These are the six most common traps that stop pilots from reaching production:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertIcon />
                  <div>
                    <p className="font-mono text-sm text-red-400 mb-1">Trap #1: The Clean Data Illusion</p>
                    <p className="font-bold">Your pilot used curated data. Production data is chaos.</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                      Pilot: 10,000 hand-picked, validated records<br />
                      Production: 10M records with missing fields, inconsistent formats, edge cases, and data quality issues you never imagined
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertIcon />
                  <div>
                    <p className="font-mono text-sm text-red-400 mb-1">Trap #2: The Performance Cliff</p>
                    <p className="font-bold">What runs in 200ms on test data takes 5 seconds in production.</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                      Linear scaling is a myth. Performance degrades non-linearly as data volume increases. Cache hits decrease. Joining large tables kills queries. Distributed systems introduce network latency.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertIcon />
                  <div>
                    <p className="font-mono text-sm text-red-400 mb-1">Trap #3: The Cost Explosion</p>
                    <p className="font-bold">$50 in API costs for the pilot becomes $50,000/month at scale.</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                      Pilot: 100 predictions/day = manageable<br />
                      Production: 100,000 predictions/day = you just became the CFO's problem
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertIcon />
                  <div>
                    <p className="font-mono text-sm text-red-400 mb-1">Trap #4: The Integration Nightmare</p>
                    <p className="font-bold">Your pilot was a Python script. Production has 47 dependencies.</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                      Real systems have authentication, authorization, logging, monitoring, error handling, retry logic, rate limiting, graceful degradation, and integration with legacy systems that don't speak REST.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertIcon />
                  <div>
                    <p className="font-mono text-sm text-red-400 mb-1">Trap #5: The Model Drift Surprise</p>
                    <p className="font-bold">Your model was trained on last year's data. The world changed.</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                      Customer behavior shifts. Product mix evolves. Seasonality emerges. Competitors react. Your model's accuracy quietly degrades from 94% to 76% over six months and nobody notices until it's a crisis.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertIcon />
                  <div>
                    <p className="font-mono text-sm text-red-400 mb-1">Trap #6: The People Problem</p>
                    <p className="font-bold">Your pilot had dedicated data scientists. Production needs operations.</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                      Who retrains the model? Who debugs inference failures at 2am? Who handles the angry VP when predictions are wrong? Your data scientists didn't sign up for on-call rotations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Production Readiness Framework */}
            <h2>The Production Readiness Framework</h2>
            <p>
              Here's the hard truth: production-ready AI is 20% model, 80% everything else. This framework covers the 80% that most teams ignore until it's too late.
            </p>

            <div className="not-prose my-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <h4 className="font-bold text-id8-orange mb-3">1. DATA QUALITY GATES</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    Build validation at every data ingestion point
                  </p>
                  <ul className="text-sm space-y-2 text-[var(--text-tertiary)]">
                    <li>• Schema validation on incoming data</li>
                    <li>• Automated data quality scoring</li>
                    <li>• Distribution drift detection</li>
                    <li>• Anomaly detection in inputs</li>
                    <li>• Graceful handling of bad data</li>
                  </ul>
                </div>

                <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <h4 className="font-bold text-id8-orange mb-3">2. PERFORMANCE OPTIMIZATION</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    Design for scale from day one
                  </p>
                  <ul className="text-sm space-y-2 text-[var(--text-tertiary)]">
                    <li>• Load testing at 10x expected volume</li>
                    <li>• Caching strategy for predictions</li>
                    <li>• Batch processing where possible</li>
                    <li>• Async inference for non-critical paths</li>
                    <li>• Database query optimization</li>
                  </ul>
                </div>

                <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <h4 className="font-bold text-id8-orange mb-3">3. COST CONTROLS</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    Budget constraints before they constrain you
                  </p>
                  <ul className="text-sm space-y-2 text-[var(--text-tertiary)]">
                    <li>• Cost per prediction monitoring</li>
                    <li>• Rate limiting and throttling</li>
                    <li>• Model quantization/compression</li>
                    <li>• Smart model selection per use case</li>
                    <li>• Reserved capacity vs on-demand</li>
                  </ul>
                </div>

                <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <h4 className="font-bold text-id8-orange mb-3">4. OBSERVABILITY</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    You can't fix what you can't see
                  </p>
                  <ul className="text-sm space-y-2 text-[var(--text-tertiary)]">
                    <li>• Prediction accuracy tracking</li>
                    <li>• Model performance dashboards</li>
                    <li>• Error rate and failure modes</li>
                    <li>• Latency percentiles (p50, p95, p99)</li>
                    <li>• Business metric correlation</li>
                  </ul>
                </div>

                <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <h4 className="font-bold text-id8-orange mb-3">5. MODEL LIFECYCLE</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    Continuous improvement, not one-and-done
                  </p>
                  <ul className="text-sm space-y-2 text-[var(--text-tertiary)]">
                    <li>• Automated retraining pipelines</li>
                    <li>• A/B testing new model versions</li>
                    <li>• Rollback mechanisms</li>
                    <li>• Version control for models + data</li>
                    <li>• Feedback loop from production</li>
                  </ul>
                </div>

                <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <h4 className="font-bold text-id8-orange mb-3">6. OPERATIONAL EXCELLENCE</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">
                    Build for 3am debugging
                  </p>
                  <ul className="text-sm space-y-2 text-[var(--text-tertiary)]">
                    <li>• Runbooks for common failures</li>
                    <li>• Automated alerting and escalation</li>
                    <li>• Circuit breakers and fallbacks</li>
                    <li>• On-call rotation and training</li>
                    <li>• Disaster recovery procedures</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* The Phased Rollout Strategy */}
            <h2>The Phased Rollout Strategy</h2>
            <p>
              Don't flip a switch from pilot to full production. Smart organizations use a phased approach that de-risks the transition.
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Phase</th>
                    <th className="text-left py-3 px-4">Traffic</th>
                    <th className="text-left py-3 px-4">Focus</th>
                    <th className="text-left py-3 px-4">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Shadow Mode</td>
                    <td className="py-3 px-4">0% (predictions logged, not used)</td>
                    <td className="py-3 px-4">Validate performance, cost, accuracy</td>
                    <td className="py-3 px-4">2-4 weeks</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Canary</td>
                    <td className="py-3 px-4">1-5% of traffic</td>
                    <td className="py-3 px-4">Catch edge cases, monitor impact</td>
                    <td className="py-3 px-4">1-2 weeks</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Gradual Ramp</td>
                    <td className="py-3 px-4">5% → 25% → 50%</td>
                    <td className="py-3 px-4">Scale infrastructure, tune performance</td>
                    <td className="py-3 px-4">3-6 weeks</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Full Release</td>
                    <td className="py-3 px-4">100% with fallback ready</td>
                    <td className="py-3 px-4">Maintain, optimize, iterate</td>
                    <td className="py-3 px-4">Ongoing</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-8 p-5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm font-mono text-blue-400 mb-2">Pro Tip</p>
              <p className="text-sm text-[var(--text-primary)]">
                <strong>Shadow mode is your safety net.</strong> Run predictions in parallel with your existing system without impacting users. Compare outputs. Measure performance. Find surprises before they become incidents. Organizations that skip shadow mode almost always regret it.
              </p>
            </div>

            {/* The Make-or-Break Metrics */}
            <h2>The Make-or-Break Metrics</h2>
            <p>
              You need different metrics in production than you had in your pilot. Here's what actually matters when you're at scale:
            </p>

            <div className="not-prose my-8 space-y-6">
              <div>
                <h4 className="font-bold text-id8-orange mb-2">Business Impact Metrics</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[var(--bg-secondary)] border-l-2 border-green-500 rounded">
                    <p className="font-mono text-xs text-green-400 mb-1">Revenue Impact</p>
                    <p className="text-sm">Incremental revenue attributed to AI vs baseline</p>
                  </div>
                  <div className="p-4 bg-[var(--bg-secondary)] border-l-2 border-green-500 rounded">
                    <p className="font-mono text-xs text-green-400 mb-1">Cost Savings</p>
                    <p className="text-sm">Automation savings minus infrastructure costs</p>
                  </div>
                  <div className="p-4 bg-[var(--bg-secondary)] border-l-2 border-green-500 rounded">
                    <p className="font-mono text-xs text-green-400 mb-1">Time Savings</p>
                    <p className="text-sm">Hours saved per week per user</p>
                  </div>
                  <div className="p-4 bg-[var(--bg-secondary)] border-l-2 border-green-500 rounded">
                    <p className="font-mono text-xs text-green-400 mb-1">User Adoption</p>
                    <p className="text-sm">Active users, frequency, retention rate</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-id8-orange mb-2">Technical Health Metrics</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[var(--bg-secondary)] border-l-2 border-blue-500 rounded">
                    <p className="font-mono text-xs text-blue-400 mb-1">Inference Latency</p>
                    <p className="text-sm">p50, p95, p99 response times</p>
                  </div>
                  <div className="p-4 bg-[var(--bg-secondary)] border-l-2 border-blue-500 rounded">
                    <p className="font-mono text-xs text-blue-400 mb-1">Error Rate</p>
                    <p className="text-sm">Failures per 10,000 predictions</p>
                  </div>
                  <div className="p-4 bg-[var(--bg-secondary)] border-l-2 border-blue-500 rounded">
                    <p className="font-mono text-xs text-blue-400 mb-1">Cost per Prediction</p>
                    <p className="text-sm">Compute + data + model serving costs</p>
                  </div>
                  <div className="p-4 bg-[var(--bg-secondary)] border-l-2 border-blue-500 rounded">
                    <p className="font-mono text-xs text-blue-400 mb-1">Model Freshness</p>
                    <p className="text-sm">Time since last training update</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-id8-orange mb-2">Model Performance Metrics</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[var(--bg-secondary)] border-l-2 border-purple-500 rounded">
                    <p className="font-mono text-xs text-purple-400 mb-1">Accuracy Trends</p>
                    <p className="text-sm">Weekly accuracy vs baseline (detect drift)</p>
                  </div>
                  <div className="p-4 bg-[var(--bg-secondary)] border-l-2 border-purple-500 rounded">
                    <p className="font-mono text-xs text-purple-400 mb-1">Prediction Distribution</p>
                    <p className="text-sm">Output distribution vs training (detect skew)</p>
                  </div>
                  <div className="p-4 bg-[var(--bg-secondary)] border-l-2 border-purple-500 rounded">
                    <p className="font-mono text-xs text-purple-400 mb-1">Feature Drift</p>
                    <p className="text-sm">Input data distribution changes</p>
                  </div>
                  <div className="p-4 bg-[var(--bg-secondary)] border-l-2 border-purple-500 rounded">
                    <p className="font-mono text-xs text-purple-400 mb-1">Human Override Rate</p>
                    <p className="text-sm">How often users reject predictions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Pre-Production Checklist */}
            <h2>The Pre-Production Checklist</h2>
            <p>
              Before you flip the switch, ensure you can answer "yes" to every item on this list. If you can't, you're not ready.
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="space-y-4">
                {[
                  {
                    category: "Data Quality",
                    items: [
                      "Input validation catches malformed data",
                      "Data pipeline has automated quality checks",
                      "System gracefully handles missing values",
                      "Outlier detection is in place"
                    ]
                  },
                  {
                    category: "Performance",
                    items: [
                      "Load tested at 10x expected traffic",
                      "P95 latency is acceptable to users",
                      "Autoscaling works under load",
                      "Database queries are optimized"
                    ]
                  },
                  {
                    category: "Cost",
                    items: [
                      "Cost per prediction is budgeted",
                      "Rate limiting prevents runaway costs",
                      "Cost alerting is configured",
                      "Reserved capacity where appropriate"
                    ]
                  },
                  {
                    category: "Observability",
                    items: [
                      "Dashboards show key metrics in real-time",
                      "Alerts fire on anomalies",
                      "Logs are centralized and searchable",
                      "Prediction accuracy is tracked"
                    ]
                  },
                  {
                    category: "Reliability",
                    items: [
                      "Fallback behavior is defined",
                      "Circuit breakers prevent cascading failures",
                      "Retry logic with exponential backoff",
                      "Disaster recovery plan exists"
                    ]
                  },
                  {
                    category: "Operations",
                    items: [
                      "Runbooks for common issues",
                      "On-call rotation is staffed",
                      "Model rollback procedure tested",
                      "Incident response plan documented"
                    ]
                  }
                ].map((section, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-id8-orange mb-2">{section.category}</h4>
                    <ul className="space-y-2">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1 w-4 h-4 accent-id8-orange" />
                          <span className="text-sm text-[var(--text-secondary)]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-6 bg-id8-orange/10 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Production Readiness Checklist</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 45 minutes<br />
                <strong>You'll need:</strong> Details of your current AI pilot or planned deployment
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Assess your current state (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For each of the 6 categories above (Data, Performance, Cost, Observability, Reliability, Operations), rate yourself 1-5. Be brutally honest.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Identify your gaps (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For anything below a 4, list the specific gaps. What's missing? What's broken? What's manual that should be automated?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Build your checklist (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Customize the checklist above for your specific project. Add your gaps. Remove items that don't apply. Be specific.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Estimate timelines (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For each gap, estimate effort: days, weeks, or months. Be realistic. Aggregate to get your true "time to production-ready."</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A production readiness checklist with current state assessment, identified gaps, specific action items, and realistic timeline. Share with your team and executives to set proper expectations.
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
                  "Production-ready AI is 20% model, 80% everything else. Most teams underestimate the 80%.",
                  "Shadow mode is non-negotiable. Run predictions in parallel before impacting users to find surprises early.",
                  "The six scaling traps (data quality, performance, cost, integration, drift, operations) kill most projects. Plan for all six.",
                  "Phased rollout de-risks deployment: shadow → canary → gradual ramp → full release with fallback.",
                  "Use the pre-production checklist ruthlessly. If you can't check every box, you're not ready for production.",
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
              The valley of death between pilot and production is real, but it's not insurmountable. Teams that use systematic approaches, measure what matters, and resist the urge to rush make it across. Next module: keeping your costs under control when you're running at scale.
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
                href="/academy/ai-at-scale"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to Course
              </Link>
              <Link
                href="/academy/ai-at-scale/module-6"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Cost Management at Scale
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
