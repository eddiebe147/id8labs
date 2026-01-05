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

export default function Module1Page() {
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
                currentModule={1}
                totalModules={8}
                courseTitle="AI at Scale"
              />
            </m.div>

            <m.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-sm font-mono mb-6"
            >
              <span>Module 1</span>
              <span className="text-id8-orange/50">•</span>
              <span>~60 minutes</span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              The AI Infrastructure Stack
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "We need GPUs, but I have no idea how many or what kind. And why is everyone talking about H100s?"
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
              <h3 className="text-2xl font-bold mb-4">The Infrastructure Iceberg</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Everyone sees the AI model. Few see the infrastructure underneath. For every impressive demo, there's a GPU cluster humming somewhere, a model serving layer handling requests, and a compute bill that would make your CFO nervous.
                </p>
                <p>
                  The difference between "AI demo" and "AI in production" is infrastructure. Understanding this stack is the difference between a successful scale-up and a very expensive failed experiment.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module maps the full AI infrastructure stack. By the end, you'll know exactly what you need, what it costs, and where the money actually goes.
                </p>
              </div>
            </div>

            {/* The Stack Overview */}
            <h2>The AI Infrastructure Stack</h2>
            <p>
              Think of AI infrastructure as a seven-layer cake. Each layer has its own requirements, costs, and failure modes:
            </p>

            <div className="not-prose my-8 space-y-3">
              {[
                { layer: "7", name: "Application Layer", desc: "User-facing interfaces, APIs, integrations", color: "bg-purple-500/20 border-purple-500/30" },
                { layer: "6", name: "Orchestration Layer", desc: "Load balancing, request routing, auto-scaling", color: "bg-blue-500/20 border-blue-500/30" },
                { layer: "5", name: "Model Serving Layer", desc: "Inference servers, model versioning, caching", color: "bg-cyan-500/20 border-cyan-500/30" },
                { layer: "4", name: "Training Layer", desc: "Distributed training, hyperparameter tuning", color: "bg-green-500/20 border-green-500/30" },
                { layer: "3", name: "Data Layer", desc: "Feature stores, data pipelines, storage", color: "bg-yellow-500/20 border-yellow-500/30" },
                { layer: "2", name: "Compute Layer", desc: "GPUs, TPUs, specialized accelerators", color: "bg-orange-500/20 border-orange-500/30" },
                { layer: "1", name: "Foundation Layer", desc: "Networking, storage, container orchestration", color: "bg-red-500/20 border-red-500/30" },
              ].map((item, i) => (
                <div key={i} className={`p-4 rounded-lg border ${item.color}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-mono font-bold text-id8-orange">{item.layer}</span>
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)]">{item.name}</h4>
                      <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p>
              <strong>Key insight:</strong> Most organizations focus only on layers 4-7 (the "AI" parts) and underestimate layers 1-3 (the foundation). This is where projects fail.
            </p>

            {/* GPU Deep Dive */}
            <h2>The GPU Landscape: A Practical Guide</h2>
            <p>
              Not all GPUs are created equal. Here's the current landscape and what each tier is good for:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">GPU</th>
                    <th className="text-left py-3 px-4">Memory</th>
                    <th className="text-left py-3 px-4">Best For</th>
                    <th className="text-left py-3 px-4 text-id8-orange">Approx. Cost/hr</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">NVIDIA H100</td>
                    <td className="py-3 px-4">80GB HBM3</td>
                    <td className="py-3 px-4">Large model training, LLM inference at scale</td>
                    <td className="py-3 px-4">$3-5/hr (cloud)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">NVIDIA A100</td>
                    <td className="py-3 px-4">40/80GB HBM2e</td>
                    <td className="py-3 px-4">Production inference, medium model training</td>
                    <td className="py-3 px-4">$1.50-3/hr (cloud)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">NVIDIA L4</td>
                    <td className="py-3 px-4">24GB GDDR6</td>
                    <td className="py-3 px-4">Inference, fine-tuning smaller models</td>
                    <td className="py-3 px-4">$0.50-1/hr (cloud)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">NVIDIA T4</td>
                    <td className="py-3 px-4">16GB GDDR6</td>
                    <td className="py-3 px-4">Budget inference, small model development</td>
                    <td className="py-3 px-4">$0.20-0.50/hr (cloud)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">AMD MI300X</td>
                    <td className="py-3 px-4">192GB HBM3</td>
                    <td className="py-3 px-4">Large model training, cost alternative to H100</td>
                    <td className="py-3 px-4">$2-4/hr (limited availability)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* The Memory Wall */}
            <h2>The Memory Wall</h2>
            <p>
              The single biggest constraint in AI infrastructure isn't compute speed — it's memory. Here's why:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-id8-orange mb-2">Model Size vs GPU Memory</h4>
                  <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                    <li><span className="font-mono">7B params</span> = ~14GB (FP16)</li>
                    <li><span className="font-mono">13B params</span> = ~26GB (FP16)</li>
                    <li><span className="font-mono">70B params</span> = ~140GB (FP16)</li>
                    <li><span className="font-mono">405B params</span> = ~810GB (FP16)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-id8-orange mb-2">The Math</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Each parameter in FP16 = 2 bytes. A 70B model needs 140GB just to load. Add activations, KV cache, and batch size, and you need 200GB+ for comfortable inference.
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">
                    This is why H100s (80GB) often run in clusters of 2-8 for large models.
                  </p>
                </div>
              </div>
            </div>

            <p>
              <strong>Quantization is your friend:</strong> INT8 cuts memory in half, INT4 cuts it to 25%. A 70B model can run on a single 80GB GPU with INT4 quantization — with acceptable quality loss for many use cases.
            </p>

            {/* Framework: The Compute Decision Matrix */}
            <h2>Framework: The Compute Decision Matrix</h2>
            <p>
              Use this matrix to determine your infrastructure strategy:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Workload</th>
                    <th className="text-left py-3 px-4">Volume</th>
                    <th className="text-left py-3 px-4 text-green-400">Recommended</th>
                    <th className="text-left py-3 px-4 text-id8-orange">Why</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">LLM Inference</td>
                    <td className="py-3 px-4">&lt;1K req/day</td>
                    <td className="py-3 px-4">API (OpenAI, Anthropic)</td>
                    <td className="py-3 px-4">No infrastructure overhead</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">LLM Inference</td>
                    <td className="py-3 px-4">1K-100K req/day</td>
                    <td className="py-3 px-4">Managed GPU (Together, Replicate)</td>
                    <td className="py-3 px-4">Cost optimization, data control</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">LLM Inference</td>
                    <td className="py-3 px-4">&gt;100K req/day</td>
                    <td className="py-3 px-4">Self-hosted (vLLM, TGI)</td>
                    <td className="py-3 px-4">Economics favor ownership</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Fine-tuning</td>
                    <td className="py-3 px-4">Occasional</td>
                    <td className="py-3 px-4">Spot instances</td>
                    <td className="py-3 px-4">70% cost savings</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Pre-training</td>
                    <td className="py-3 px-4">Any</td>
                    <td className="py-3 px-4">Reserved instances / On-prem</td>
                    <td className="py-3 px-4">Predictable, long-running</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Model Serving Architecture */}
            <h2>Model Serving: The Hidden Complexity</h2>
            <p>
              Getting a model running locally is easy. Serving it at scale is where things get interesting:
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
              {[
                {
                  title: "Request Batching",
                  desc: "Group multiple requests to maximize GPU utilization. Critical for cost efficiency.",
                  metric: "Can reduce per-request latency by 80%"
                },
                {
                  title: "KV Cache Management",
                  desc: "Store attention states to avoid recomputation. Memory-intensive but essential.",
                  metric: "PagedAttention can save 50% memory"
                },
                {
                  title: "Model Sharding",
                  desc: "Split large models across multiple GPUs. Tensor parallelism vs pipeline parallelism.",
                  metric: "Required for models >80GB"
                },
                {
                  title: "Quantization Runtime",
                  desc: "Run quantized models without quality loss. GPTQ, AWQ, GGUF formats.",
                  metric: "2-4x memory reduction"
                },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <h4 className="font-bold text-id8-orange mb-2">{item.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">{item.desc}</p>
                  <p className="text-xs font-mono text-green-400">{item.metric}</p>
                </div>
              ))}
            </div>

            {/* The Cost Reality */}
            <h2>The Cost Reality</h2>
            <p>
              Let's run real numbers on what AI infrastructure costs at scale:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h3 className="text-xl font-bold mb-4">Scenario: 100K LLM requests per day</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--text-secondary)]">API Approach (GPT-4 equivalent)</span>
                  <span className="font-mono text-red-400">~$3,000-5,000/month</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--text-secondary)]">Managed GPU (70B model)</span>
                  <span className="font-mono text-yellow-400">~$2,000-3,500/month</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                  <span className="text-[var(--text-secondary)]">Self-hosted (2x A100)</span>
                  <span className="font-mono text-green-400">~$1,500-2,500/month</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[var(--text-secondary)]">Self-hosted + Quantization (1x A100)</span>
                  <span className="font-mono text-green-400">~$800-1,200/month</span>
                </div>
              </div>
              <p className="text-sm text-[var(--text-tertiary)] mt-4 italic">
                Note: Self-hosted requires engineering time. Factor in $10-20K/month for a dedicated ML engineer.
              </p>
            </div>

            {/* Framework: The Build vs Buy Calculator */}
            <h2>Framework: The Build vs Buy Calculator</h2>
            <p>
              When does self-hosting make sense? Use this framework:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Calculate your monthly API spend</p>
                    <p className="text-sm text-[var(--text-secondary)]">If it's under $5K/month, self-hosting rarely makes economic sense.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Estimate equivalent GPU cost</p>
                    <p className="text-sm text-[var(--text-secondary)]">Use our table above. Include 24/7 operation, not just peak hours.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Add engineering overhead</p>
                    <p className="text-sm text-[var(--text-secondary)]">0.25-0.5 FTE minimum for maintenance. More for custom features.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Consider non-cost factors</p>
                    <p className="text-sm text-[var(--text-secondary)]">Data privacy, latency requirements, customization needs.</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-id8-orange/10 border border-id8-orange/30 rounded-lg">
                <p className="text-sm font-bold text-id8-orange">The Breakeven Rule</p>
                <p className="text-sm text-[var(--text-secondary)]">Self-hosting typically breaks even at $10-15K/month API spend — assuming you have ML engineering capacity.</p>
              </div>
            </div>

            {/* Common Mistakes */}
            <h2>Five Infrastructure Mistakes That Kill Projects</h2>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #1</p>
                <p className="font-bold">"We'll optimize later"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: Infrastructure decisions compound. A naive serving setup can cost 10x more than an optimized one. Design for efficiency from day one.</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #2</p>
                <p className="font-bold">"We need the biggest GPU"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: H100s are overkill for most inference workloads. Match hardware to actual needs. A100s or L4s often provide better cost-performance.</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #3</p>
                <p className="font-bold">"Our model needs to run locally"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: Unless you have specific compliance or latency requirements, cloud GPUs are almost always more cost-effective than on-prem.</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #4</p>
                <p className="font-bold">"We'll just use Kubernetes"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: GPU scheduling in K8s is complex. Without expertise, you'll waste 50%+ of your GPU capacity. Consider managed ML platforms first.</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #5</p>
                <p className="font-bold">"We don't need monitoring"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: GPU utilization, memory usage, request latency — if you can't measure it, you can't optimize it. Monitoring should be day-one infrastructure.</p>
              </div>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Infrastructure Requirements Document</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 30 minutes<br />
                <strong>You'll need:</strong> Your current or planned AI workload specifications
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Map your workload (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">List every AI task: inference types, training needs, request volumes. Be specific about model sizes.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Calculate memory requirements (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Use the formula: params x 2 bytes (FP16) + 50% overhead for KV cache and activations.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Apply the Compute Decision Matrix (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For each workload, determine: API vs Managed GPU vs Self-hosted.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Price it out (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Use real pricing from AWS, GCP, or your preferred cloud. Include all seven stack layers.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A one-page infrastructure requirements document with workload mapping, compute recommendations, and monthly cost estimates.
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
                  "The AI infrastructure stack has seven layers. Most teams only plan for four and get burned by the other three.",
                  "Memory, not compute, is the primary constraint. Know your model's memory footprint before choosing hardware.",
                  "Self-hosting breaks even around $10-15K/month API spend — assuming you have ML engineering capacity.",
                  "Model serving complexity is where most teams underestimate. Batching, caching, and sharding are essential at scale.",
                  "Start with APIs, graduate to managed GPUs, then self-host when economics demand it. Don't skip steps.",
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
              You now understand the infrastructure that makes AI possible at scale. In the next module, we'll build the MLOps pipelines that keep this infrastructure running — without waking you up at 3am.
            </p>

          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing">
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
                href="/academy/ai-at-scale/module-2"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: MLOps Fundamentals
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
