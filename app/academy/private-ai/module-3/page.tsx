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

const BoxIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
)

const CodeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
)

const ScaleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13"/>
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
                href="/academy/private-ai"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to Private AI
              </Link>
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                Module 3
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                60 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Model Selection for Privacy
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "Which models can I actually run privately, and which are worth the tradeoffs?"
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
                The Model Landscape
              </h2>
              <h3 className="text-2xl font-bold mb-4">Choosing Models That Respect Your Constraints</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Not all AI models are created equal — especially when it comes to private deployment.
                  Closed models like GPT-4 and Claude can only be used via API. Open models like Llama
                  and Mistral can be self-hosted with full control.
                </p>
                <p>
                  But "open" doesn't mean "equal." Models vary dramatically in size, capability, license
                  restrictions, and hardware requirements. The best model for you depends on your specific
                  use case, deployment strategy, and resource constraints.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module maps the open model ecosystem and gives you a framework for choosing models
                  that maximize capability while respecting your privacy requirements.
                </p>
              </div>
            </div>

            {/* Model Categories */}
            <h2>Understanding Model Categories</h2>
            <p>
              The AI model landscape breaks down into three categories, each with different privacy implications:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
                    <BoxIcon />
                  </span>
                  <div>
                    <p className="font-bold text-red-400">Closed / Proprietary</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">GPT-4, Claude, Gemini. Only accessible via API. Data must be sent to provider servers. No self-hosting option.</p>
                    <p className="text-sm font-mono text-red-400 mt-2">Privacy: Not compatible with private deployment</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center">
                    <BoxIcon />
                  </span>
                  <div>
                    <p className="font-bold text-yellow-400">Open Weights (Restricted License)</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Llama 2/3 (Meta), Gemma (Google). Weights available for download but with usage restrictions. Can self-host, but license limits commercial use or requires attribution.</p>
                    <p className="text-sm font-mono text-yellow-400 mt-2">Privacy: Compatible with license compliance</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">
                    <BoxIcon />
                  </span>
                  <div>
                    <p className="font-bold text-green-400">Fully Open (Permissive License)</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Mistral, Falcon, MPT, BLOOM. Weights and often training code available under Apache 2.0 or similar. Full commercial rights, can be modified and redistributed.</p>
                    <p className="text-sm font-mono text-green-400 mt-2">Privacy: Fully compatible with any deployment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Model Comparison */}
            <h2>Model Comparison: The Privacy-First Ranking</h2>
            <p>
              Here's how the major open models stack up for private deployment, ranked by the combination
              of capability, efficiency, and license flexibility:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Model Family</th>
                    <th className="text-left py-3 px-4">Sizes</th>
                    <th className="text-left py-3 px-4">License</th>
                    <th className="text-left py-3 px-4">Strengths</th>
                    <th className="text-left py-3 px-4">Min. Hardware</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Llama 3</td>
                    <td className="py-3 px-4">8B, 70B</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">Community</span></td>
                    <td className="py-3 px-4">Best overall, strong reasoning</td>
                    <td className="py-3 px-4">16GB RAM (8B)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Mistral / Mixtral</td>
                    <td className="py-3 px-4">7B, 8x7B</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Apache 2.0</span></td>
                    <td className="py-3 px-4">Best efficiency, code, MoE</td>
                    <td className="py-3 px-4">16GB RAM (7B)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Qwen 2</td>
                    <td className="py-3 px-4">0.5B-72B</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">Qwen License</span></td>
                    <td className="py-3 px-4">Multilingual, long context</td>
                    <td className="py-3 px-4">8GB RAM (1.8B)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Phi-3</td>
                    <td className="py-3 px-4">3.8B, 14B</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">MIT</span></td>
                    <td className="py-3 px-4">Best small model, reasoning</td>
                    <td className="py-3 px-4">8GB RAM (3.8B)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Gemma 2</td>
                    <td className="py-3 px-4">2B, 9B, 27B</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">Gemma Terms</span></td>
                    <td className="py-3 px-4">Strong benchmarks, Google quality</td>
                    <td className="py-3 px-4">8GB RAM (2B)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">CodeLlama</td>
                    <td className="py-3 px-4">7B, 13B, 34B</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">Llama 2</span></td>
                    <td className="py-3 px-4">Code generation, completion</td>
                    <td className="py-3 px-4">16GB RAM (7B)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">DeepSeek Coder</td>
                    <td className="py-3 px-4">1.3B-33B</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">DeepSeek</span></td>
                    <td className="py-3 px-4">Best open code model</td>
                    <td className="py-3 px-4">8GB RAM (1.3B)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Size vs Capability */}
            <h2>The Size-Capability Tradeoff</h2>
            <p>
              Model size (measured in parameters) correlates with capability — but not linearly. A well-trained
              7B model often outperforms a poorly-trained 13B model. And quantization can let you run
              larger models on smaller hardware.
            </p>

            <div className="not-prose my-8">
              <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                <h3 className="text-xl font-bold mb-4">Model Size Guidelines</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 text-center">
                      <span className="text-2xl font-bold text-green-400">1-3B</span>
                    </div>
                    <div className="flex-1 p-3 bg-[var(--bg-primary)] rounded">
                      <p className="font-bold">Edge / Mobile</p>
                      <p className="text-sm text-[var(--text-secondary)]">Fast inference, simple tasks, classification, basic chat. Can run on phones, Raspberry Pi.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-16 text-center">
                      <span className="text-2xl font-bold text-yellow-400">7-8B</span>
                    </div>
                    <div className="flex-1 p-3 bg-[var(--bg-primary)] rounded">
                      <p className="font-bold">Sweet Spot for Most Use Cases</p>
                      <p className="text-sm text-[var(--text-secondary)]">Good reasoning, code generation, summarization. Runs on consumer GPUs (RTX 3080+) or M1+ Macs.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-16 text-center">
                      <span className="text-2xl font-bold text-orange-400">13-14B</span>
                    </div>
                    <div className="flex-1 p-3 bg-[var(--bg-primary)] rounded">
                      <p className="font-bold">Enhanced Reasoning</p>
                      <p className="text-sm text-[var(--text-secondary)]">Better at complex tasks, nuanced responses. Needs 24GB+ VRAM or high RAM for CPU inference.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-16 text-center">
                      <span className="text-2xl font-bold text-purple-400">30-70B</span>
                    </div>
                    <div className="flex-1 p-3 bg-[var(--bg-primary)] rounded">
                      <p className="font-bold">Near-GPT-4 Capability</p>
                      <p className="text-sm text-[var(--text-secondary)]">Frontier-level performance. Requires multi-GPU setup (A100s) or heavy quantization.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantization */}
            <h2>Quantization: Running Bigger Models on Less Hardware</h2>
            <p>
              Quantization reduces model precision (from 16-bit floats to 8-bit, 4-bit, or even lower),
              dramatically reducing memory requirements with modest quality loss. This is how you run
              a 70B model on a consumer GPU.
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Quantization</th>
                    <th className="text-left py-3 px-4">Memory Use</th>
                    <th className="text-left py-3 px-4">Quality Impact</th>
                    <th className="text-left py-3 px-4">Speed Impact</th>
                    <th className="text-left py-3 px-4">Best For</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">FP16 (None)</td>
                    <td className="py-3 px-4">2 bytes/param</td>
                    <td className="py-3 px-4"><span className="text-green-400">None</span></td>
                    <td className="py-3 px-4">Baseline</td>
                    <td className="py-3 px-4">When hardware supports it</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">INT8</td>
                    <td className="py-3 px-4">1 byte/param</td>
                    <td className="py-3 px-4"><span className="text-green-400">Minimal</span></td>
                    <td className="py-3 px-4">Faster on CPU</td>
                    <td className="py-3 px-4">Production deployments</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Q5_K_M (5-bit)</td>
                    <td className="py-3 px-4">~0.65 bytes/param</td>
                    <td className="py-3 px-4"><span className="text-yellow-400">Small</span></td>
                    <td className="py-3 px-4">Good balance</td>
                    <td className="py-3 px-4">General use</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Q4_K_M (4-bit)</td>
                    <td className="py-3 px-4">~0.5 bytes/param</td>
                    <td className="py-3 px-4"><span className="text-yellow-400">Noticeable</span></td>
                    <td className="py-3 px-4">Fast</td>
                    <td className="py-3 px-4">Memory-constrained</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Q2_K (2-bit)</td>
                    <td className="py-3 px-4">~0.3 bytes/param</td>
                    <td className="py-3 px-4"><span className="text-red-400">Significant</span></td>
                    <td className="py-3 px-4">Fastest</td>
                    <td className="py-3 px-4">Extreme edge cases only</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-8 p-4 bg-id8-orange/10 border border-id8-orange/30 rounded-lg">
              <p className="font-mono text-sm text-id8-orange mb-2">Memory Calculator</p>
              <p className="text-sm text-[var(--text-secondary)] mb-3">Rough formula for estimating model memory:</p>
              <div className="bg-[var(--bg-primary)] p-3 rounded font-mono text-sm">
                <p>Memory (GB) = Parameters (B) x Bytes per param + Overhead (2-4GB)</p>
                <p className="text-[var(--text-tertiary)] mt-2">Examples:</p>
                <p className="text-[var(--text-secondary)]">7B model, Q4: 7 x 0.5 + 3 = ~6.5GB</p>
                <p className="text-[var(--text-secondary)]">70B model, Q4: 70 x 0.5 + 4 = ~39GB</p>
              </div>
            </div>

            {/* Specialized Models */}
            <h2>Specialized Models for Specific Tasks</h2>
            <p>
              General-purpose models work for most tasks, but specialized models often outperform them
              significantly in narrow domains. Consider task-specific models when:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <CodeIcon />
                  </span>
                  <div>
                    <p className="font-bold">Code Generation</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1"><strong>DeepSeek Coder, CodeLlama, StarCoder</strong> — Trained specifically on code, understand syntax, patterns, and best practices better than general models.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <ScaleIcon />
                  </span>
                  <div>
                    <p className="font-bold">Embeddings</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1"><strong>nomic-embed, bge-large, e5-large</strong> — Specialized for semantic search and RAG. Much smaller and faster than chat models.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">
                    <BoxIcon />
                  </span>
                  <div>
                    <p className="font-bold">Domain-Specific</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1"><strong>BioMistral, LegalLlama, FinGPT</strong> — Fine-tuned on domain data for healthcare, legal, finance. Better accuracy on specialized terminology.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* License Deep Dive */}
            <h2>License Implications: What You Can Actually Do</h2>
            <p>
              Open weights doesn't mean open rights. Before deploying, verify your use case is covered:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">License</th>
                    <th className="text-left py-3 px-4">Commercial Use</th>
                    <th className="text-left py-3 px-4">Modification</th>
                    <th className="text-left py-3 px-4">Redistribution</th>
                    <th className="text-left py-3 px-4">Notable Restrictions</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Apache 2.0</td>
                    <td className="py-3 px-4"><span className="text-green-400">Yes</span></td>
                    <td className="py-3 px-4"><span className="text-green-400">Yes</span></td>
                    <td className="py-3 px-4"><span className="text-green-400">Yes</span></td>
                    <td className="py-3 px-4">Must include license notice</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">MIT</td>
                    <td className="py-3 px-4"><span className="text-green-400">Yes</span></td>
                    <td className="py-3 px-4"><span className="text-green-400">Yes</span></td>
                    <td className="py-3 px-4"><span className="text-green-400">Yes</span></td>
                    <td className="py-3 px-4">None</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Llama 2/3</td>
                    <td className="py-3 px-4"><span className="text-yellow-400">Conditional</span></td>
                    <td className="py-3 px-4"><span className="text-green-400">Yes</span></td>
                    <td className="py-3 px-4"><span className="text-yellow-400">With license</span></td>
                    <td className="py-3 px-4">700M+ MAU needs Meta approval</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Gemma</td>
                    <td className="py-3 px-4"><span className="text-yellow-400">Conditional</span></td>
                    <td className="py-3 px-4"><span className="text-green-400">Yes</span></td>
                    <td className="py-3 px-4"><span className="text-yellow-400">With terms</span></td>
                    <td className="py-3 px-4">Can't train competing models</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Creative ML</td>
                    <td className="py-3 px-4"><span className="text-red-400">Check terms</span></td>
                    <td className="py-3 px-4"><span className="text-yellow-400">Varies</span></td>
                    <td className="py-3 px-4"><span className="text-yellow-400">Varies</span></td>
                    <td className="py-3 px-4">Often non-commercial</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="font-mono text-sm text-red-400 mb-2">License Warning</p>
              <p className="text-sm text-[var(--text-secondary)]">
                Fine-tuned models inherit the base model's license. A "fine-tuned Llama" model on Hugging Face
                is still bound by Meta's Llama license, regardless of what the fine-tuner claims. Always
                check the base model's terms before deploying.
              </p>
            </div>

            {/* Evaluation Framework */}
            <h2>How to Evaluate Models for Your Use Case</h2>
            <p>
              Benchmarks tell part of the story, but real-world performance on your specific tasks matters more.
              Here's a systematic approach:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">1</span>
                  <div>
                    <p className="font-bold">Define Your Test Set</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Create 20-50 representative prompts from your actual use cases. Include edge cases and failure modes you've seen with other models.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">2</span>
                  <div>
                    <p className="font-bold">Establish Scoring Criteria</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">For each prompt, define what a "good" answer looks like. Score 1-5 on accuracy, helpfulness, safety, and format adherence.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">3</span>
                  <div>
                    <p className="font-bold">Test Multiple Models</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Run your test set through 3-5 candidate models. Keep prompts and settings identical for fair comparison.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">4</span>
                  <div>
                    <p className="font-bold">Measure Performance Metrics</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Track tokens/second, time to first token, memory usage, and cost per request. A slower but more accurate model may be better.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">5</span>
                  <div>
                    <p className="font-bold">Factor in Practical Constraints</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Can your target hardware run it? Does the license allow your use case? Is the model actively maintained?</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <h2>Practical Recommendations by Use Case</h2>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Use Case</th>
                    <th className="text-left py-3 px-4">Recommended Model</th>
                    <th className="text-left py-3 px-4">Size</th>
                    <th className="text-left py-3 px-4">Why</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">General Assistant</td>
                    <td className="py-3 px-4">Llama 3 8B Instruct</td>
                    <td className="py-3 px-4">8B</td>
                    <td className="py-3 px-4">Best balance of capability and efficiency</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Code Completion</td>
                    <td className="py-3 px-4">DeepSeek Coder</td>
                    <td className="py-3 px-4">6.7B</td>
                    <td className="py-3 px-4">Purpose-built for code, fast</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">RAG / Search</td>
                    <td className="py-3 px-4">nomic-embed-text</td>
                    <td className="py-3 px-4">137M</td>
                    <td className="py-3 px-4">Top embeddings, tiny footprint</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Edge / Mobile</td>
                    <td className="py-3 px-4">Phi-3 Mini</td>
                    <td className="py-3 px-4">3.8B</td>
                    <td className="py-3 px-4">Best small model performance</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Complex Reasoning</td>
                    <td className="py-3 px-4">Llama 3 70B</td>
                    <td className="py-3 px-4">70B</td>
                    <td className="py-3 px-4">Closest to GPT-4 open model</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Multilingual</td>
                    <td className="py-3 px-4">Qwen 2</td>
                    <td className="py-3 px-4">7B</td>
                    <td className="py-3 px-4">Best non-English performance</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-6 bg-id8-orange/10 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Model Selection Matrix</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 30 minutes<br />
                <strong>You'll need:</strong> List of your AI use cases from Module 1, deployment architecture from Module 2
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Map use cases to model requirements (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For each use case, determine: task type (chat, code, embeddings), required capability level, acceptable latency, and hardware constraints.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Select candidate models (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Using the comparison tables, identify 2-3 candidate models for each use case. Verify license compatibility.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Create evaluation plan (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Define your test set and scoring criteria. Plan how you'll run comparative evaluations.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A model selection matrix showing: use case, candidate models, quantization level,
                  expected hardware, and license status. Ready for evaluation testing.
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
                  "Open models now rival closed models for many tasks. Llama 3 70B approaches GPT-4 on most benchmarks.",
                  "Model size isn't everything — a well-trained 7B model often beats a 13B model trained on lower-quality data.",
                  "Quantization is your friend. 4-bit quantization cuts memory 4x with modest quality loss.",
                  "License matters. 'Open weights' doesn't mean 'do whatever you want.' Verify before deploying.",
                  "Always evaluate on your specific use cases. Benchmarks predict general trends, not your exact performance.",
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
              You now have a framework for selecting models that balance capability with your privacy
              and resource constraints. In the next module, we'll dive into data handling protocols —
              how to prepare, classify, and protect sensitive data when using AI systems.
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
                href="/academy/private-ai/module-2"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Module 2: Deployment Options
              </Link>
              <Link
                href="/academy/private-ai/module-4"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Data Handling Protocols
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
