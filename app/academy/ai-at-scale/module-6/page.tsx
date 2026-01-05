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

const DollarIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
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
                href="/academy/ai-at-scale"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to AI at Scale
              </Link>
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
              Cost Management at Scale
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              Because GPU bills add up faster than you think
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
                The Cost Reality
              </h2>
              <h3 className="text-2xl font-bold mb-4">When Your AI Budget Becomes the CFO's Problem</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Month 1: $2,000 in API costs. Finance barely notices.<br />
                  Month 3: $15,000. You get a "just checking in" email.<br />
                  Month 6: $67,000. You're in a conference room explaining yourself.<br />
                  Month 9: $180,000. The project is under review.
                </p>
                <p>
                  This is the AI cost curve that kills projects. Not because the value isn't there, but because nobody forecasted what "at scale" actually means in dollar terms.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module teaches you to manage AI costs before they manage you.
                </p>
              </div>
            </div>

            {/* The Cost Drivers */}
            <h2>The Five Cost Drivers</h2>
            <p>
              AI costs are not monolithic. Understanding where money goes is the first step to controlling it:
            </p>

            <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <DollarIcon />
                  <h4 className="font-bold text-id8-orange">1. MODEL INFERENCE</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Cost per API call or prediction
                </p>
                <ul className="text-sm space-y-1 text-[var(--text-tertiary)]">
                  <li>• LLM API calls (OpenAI, Anthropic, etc.)</li>
                  <li>• Custom model serving compute</li>
                  <li>• GPU instance hours</li>
                  <li>• Scales linearly with volume</li>
                </ul>
              </div>

              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <DollarIcon />
                  <h4 className="font-bold text-id8-orange">2. DATA STORAGE</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Training data, embeddings, logs
                </p>
                <ul className="text-sm space-y-1 text-[var(--text-tertiary)]">
                  <li>• Vector database hosting</li>
                  <li>• Feature store infrastructure</li>
                  <li>• Training dataset storage</li>
                  <li>• Prediction logs and archives</li>
                </ul>
              </div>

              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <DollarIcon />
                  <h4 className="font-bold text-id8-orange">3. DATA PROCESSING</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  ETL, feature engineering, embeddings
                </p>
                <ul className="text-sm space-y-1 text-[var(--text-tertiary)]">
                  <li>• Batch processing pipelines</li>
                  <li>• Embedding generation</li>
                  <li>• Data quality checks</li>
                  <li>• Feature computation</li>
                </ul>
              </div>

              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <DollarIcon />
                  <h4 className="font-bold text-id8-orange">4. MODEL TRAINING</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Retraining, fine-tuning, experimentation
                </p>
                <ul className="text-sm space-y-1 text-[var(--text-tertiary)]">
                  <li>• Initial model training</li>
                  <li>• Periodic retraining runs</li>
                  <li>• Hyperparameter tuning</li>
                  <li>• A/B test model variants</li>
                </ul>
              </div>

              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg col-span-full">
                <div className="flex items-center gap-2 mb-3">
                  <DollarIcon />
                  <h4 className="font-bold text-id8-orange">5. INFRASTRUCTURE & TOOLING</h4>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  The supporting cast that enables everything else
                </p>
                <ul className="text-sm space-y-1 text-[var(--text-tertiary)]">
                  <li>• MLOps platform subscriptions (Weights & Biases, MLflow, etc.)</li>
                  <li>• Monitoring and observability tools</li>
                  <li>• Orchestration (Airflow, Prefect, etc.)</li>
                  <li>• Development environments and notebooks</li>
                </ul>
              </div>
            </div>

            {/* The Hidden Costs */}
            <h2>The Hidden Costs Nobody Warns You About</h2>
            <p>
              These are the costs that don't appear in vendor pricing pages but absolutely wreck budgets:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Hidden Cost #1</p>
                <p className="font-bold">Prompt Token Bloat</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  You send 500 tokens to get 50 back. But you pay for 550. Multiply by 100,000 calls/day and suddenly your context window is a budget line item. <strong>Fix:</strong> Compress prompts, cache system messages, use cheaper models for simple tasks.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Hidden Cost #2</p>
                <p className="font-bold">Duplicate Predictions</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Users refresh pages. Retry logic fires twice. Webhooks trigger redundantly. You're making the same prediction multiple times for the same input. <strong>Fix:</strong> Cache predictions with TTL, deduplicate requests, implement idempotency.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Hidden Cost #3</p>
                <p className="font-bold">Embedding Storage Explosion</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  1 million documents × 1536 dimensions × 4 bytes = 6GB of embeddings. Seems manageable. Now add versioning, backups, and indexes. You're at 50GB. Vector databases are not cheap at scale. <strong>Fix:</strong> Dimensionality reduction, prune old embeddings, compress with quantization.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Hidden Cost #4</p>
                <p className="font-bold">Development Environment Sprawl</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Every data scientist spins up a GPU instance for experiments. Half are left running overnight. Some are forgotten entirely. You're paying for idle compute. <strong>Fix:</strong> Auto-shutdown policies, shared dev environments, spot instances for experiments.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Hidden Cost #5</p>
                <p className="font-bold">Logging Everything Forever</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  You log every prediction for debugging. Good idea. But you never expire the logs. After a year, you have terabytes of logs costing thousands per month in storage. <strong>Fix:</strong> Retention policies, sample logs in production, move to cold storage after 30 days.
                </p>
              </div>
            </div>

            {/* The Cost Optimization Playbook */}
            <h2>The Cost Optimization Playbook</h2>
            <p>
              These are the levers you can pull to control costs without sacrificing quality. Ordered by impact and ease of implementation:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Strategy</th>
                    <th className="text-left py-3 px-4">Impact</th>
                    <th className="text-left py-3 px-4">Effort</th>
                    <th className="text-left py-3 px-4">How to Implement</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Caching</td>
                    <td className="py-3 px-4 text-green-400">High (30-60% savings)</td>
                    <td className="py-3 px-4">Low</td>
                    <td className="py-3 px-4">Cache identical requests for 5-60 min TTL</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Model Tiering</td>
                    <td className="py-3 px-4 text-green-400">High (40-70% savings)</td>
                    <td className="py-3 px-4">Medium</td>
                    <td className="py-3 px-4">Route simple tasks to smaller/cheaper models</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Batch Processing</td>
                    <td className="py-3 px-4 text-green-400">Medium (20-40% savings)</td>
                    <td className="py-3 px-4">Medium</td>
                    <td className="py-3 px-4">Batch non-urgent predictions, run off-peak</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Prompt Optimization</td>
                    <td className="py-3 px-4 text-green-400">Medium (15-30% savings)</td>
                    <td className="py-3 px-4">Low</td>
                    <td className="py-3 px-4">Compress prompts, remove verbose examples</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Rate Limiting</td>
                    <td className="py-3 px-4 text-yellow-400">Medium (prevents spikes)</td>
                    <td className="py-3 px-4">Low</td>
                    <td className="py-3 px-4">Cap requests per user/API key, queue excess</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Model Quantization</td>
                    <td className="py-3 px-4 text-green-400">High (50-75% compute)</td>
                    <td className="py-3 px-4">High</td>
                    <td className="py-3 px-4">Use int8/int4 quantized models where accuracy allows</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Autoscaling</td>
                    <td className="py-3 px-4 text-yellow-400">Medium (20-40% savings)</td>
                    <td className="py-3 px-4">Medium</td>
                    <td className="py-3 px-4">Scale to zero during low traffic, scale up on demand</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Spot Instances</td>
                    <td className="py-3 px-4 text-green-400">High (60-80% on training)</td>
                    <td className="py-3 px-4">Medium</td>
                    <td className="py-3 px-4">Use spot/preemptible for batch jobs and training</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Data Sampling</td>
                    <td className="py-3 px-4 text-yellow-400">Low-Medium (10-25%)</td>
                    <td className="py-3 px-4">Low</td>
                    <td className="py-3 px-4">Sample logs/metrics instead of storing all</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* The Model Tiering Strategy */}
            <h2>The Model Tiering Strategy</h2>
            <p>
              Not every task needs your most powerful (and expensive) model. Smart organizations use a tiered approach:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 text-xs font-mono bg-green-500/20 text-green-400 rounded">TIER 1: Cheap & Fast</span>
                    <span className="text-sm text-[var(--text-tertiary)]">$0.0001 - $0.001 per call</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    <strong>Use for:</strong> Classification, sentiment, simple Q&A, routing decisions
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    Examples: GPT-3.5-turbo, Claude Haiku, small fine-tuned models
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 text-xs font-mono bg-yellow-500/20 text-yellow-400 rounded">TIER 2: Balanced</span>
                    <span className="text-sm text-[var(--text-tertiary)]">$0.001 - $0.01 per call</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    <strong>Use for:</strong> Content generation, summarization, moderate complexity reasoning
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    Examples: GPT-4-turbo, Claude Sonnet, Gemini Pro
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 text-xs font-mono bg-red-500/20 text-red-400 rounded">TIER 3: Premium</span>
                    <span className="text-sm text-[var(--text-tertiary)]">$0.01 - $0.10+ per call</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    <strong>Use for:</strong> Complex reasoning, code generation, high-stakes decisions
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    Examples: GPT-4, Claude Opus, O1, specialized fine-tuned models
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm font-mono text-blue-400 mb-2">Implementation Pattern</p>
                <p className="text-sm text-[var(--text-primary)]">
                  Use a cheap classifier (Tier 1) to route requests: simple → Tier 1, moderate → Tier 2, complex → Tier 3. A well-tuned router can save 40-60% on inference costs with minimal accuracy loss.
                </p>
              </div>
            </div>

            {/* Cost Monitoring & Alerting */}
            <h2>Cost Monitoring & Alerting</h2>
            <p>
              You can't optimize what you don't measure. Set up these monitoring systems before costs get out of control:
            </p>

            <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-[var(--bg-secondary)] border-l-2 border-id8-orange rounded">
                <p className="font-mono text-xs text-id8-orange mb-2">Daily Cost Dashboard</p>
                <ul className="text-sm space-y-1 text-[var(--text-secondary)]">
                  <li>• Cost per service (inference, storage, training)</li>
                  <li>• Cost per model/endpoint</li>
                  <li>• Trend vs 7-day and 30-day average</li>
                  <li>• Top cost contributors</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border-l-2 border-id8-orange rounded">
                <p className="font-mono text-xs text-id8-orange mb-2">Unit Economics Tracking</p>
                <ul className="text-sm space-y-1 text-[var(--text-secondary)]">
                  <li>• Cost per prediction</li>
                  <li>• Cost per user</li>
                  <li>• Cost per transaction/session</li>
                  <li>• Revenue per dollar of AI cost</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border-l-2 border-id8-orange rounded">
                <p className="font-mono text-xs text-id8-orange mb-2">Budget Alerts</p>
                <ul className="text-sm space-y-1 text-[var(--text-secondary)]">
                  <li>• Alert at 50%, 75%, 90% of monthly budget</li>
                  <li>• Alert on 20%+ day-over-day increase</li>
                  <li>• Alert on anomalous spikes (3x+ average)</li>
                  <li>• Weekly cost forecast projection</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border-l-2 border-id8-orange rounded">
                <p className="font-mono text-xs text-id8-orange mb-2">Cost Attribution</p>
                <ul className="text-sm space-y-1 text-[var(--text-secondary)]">
                  <li>• Tag by team/department</li>
                  <li>• Tag by customer/tenant (if multi-tenant)</li>
                  <li>• Tag by feature/product area</li>
                  <li>• Tag by environment (dev/staging/prod)</li>
                </ul>
              </div>
            </div>

            {/* The Budget Conversation */}
            <h2>The Budget Conversation with Finance</h2>
            <p>
              Eventually, you'll need to justify AI spend to people who don't understand tokens or embeddings. Here's how to frame it:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-id8-orange mb-2">Don't Say:</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    "We need $50K/month for GPT-4 API calls to power our customer support chatbot."
                  </p>
                </div>
                <div>
                  <p className="font-bold text-green-400 mb-2">Do Say:</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    "We're spending $50K/month on AI to automate 60% of Tier 1 support tickets. This saves $120K/month in support labor costs, while improving response time from 4 hours to 30 seconds. Net savings: $70K/month. ROI: 140%."
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <p className="font-bold text-[var(--text-primary)]">The Finance-Friendly AI Budget Template:</p>
                <div className="text-sm space-y-2 text-[var(--text-secondary)]">
                  <p><strong>1. AI Spend:</strong> $50,000/month</p>
                  <p><strong>2. Value Created:</strong> $120,000/month in cost avoidance + $30,000 in incremental revenue</p>
                  <p><strong>3. Net Benefit:</strong> $100,000/month</p>
                  <p><strong>4. ROI:</strong> 200%</p>
                  <p><strong>5. Trend:</strong> Costs declining 10% month-over-month via optimization</p>
                </div>
              </div>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-6 bg-id8-orange/10 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Cost Optimization Playbook</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 40 minutes<br />
                <strong>You'll need:</strong> Current AI cost breakdown (or estimates for planned deployment)
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Map your cost drivers (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Break down current or projected costs across the 5 categories: inference, storage, processing, training, infrastructure. Be as specific as possible.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Identify hidden costs (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Review the 5 hidden costs. Which apply to you? Estimate the waste. Be honest about inefficiencies.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Prioritize optimization strategies (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">From the optimization playbook table, select 3-5 strategies. Estimate potential savings and implementation effort for your specific context.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Build your business case (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Use the Finance-Friendly Budget Template. Calculate ROI. Frame cost as investment with measurable return.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A cost optimization playbook with current cost breakdown, identified waste, prioritized optimization strategies, estimated savings, and finance-ready ROI justification. Share with leadership before costs become a crisis.
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
                  "AI costs scale non-linearly. What costs $2K in month 1 can become $180K by month 9 without optimization.",
                  "Hidden costs (prompt bloat, duplicate predictions, embedding storage) often exceed visible API costs.",
                  "Model tiering is the highest-impact optimization: route simple tasks to cheap models, complex tasks to expensive ones.",
                  "Caching and batch processing are low-effort, high-impact optimizations. Start here before complex solutions.",
                  "Frame AI spend in ROI terms for finance. $50K/month means nothing; $50K spend for $150K value gets approved.",
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
              Costs are predictable and controllable if you measure, monitor, and optimize continuously. The organizations that scale AI sustainably are the ones that treat it as a managed investment, not an uncontrolled expense. Next module: scaling your team to match your growing AI ambitions.
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
                href="/academy/ai-at-scale/module-5"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: Scaling to Production
              </Link>
              <Link
                href="/academy/ai-at-scale/module-7"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Team Scaling Patterns
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
