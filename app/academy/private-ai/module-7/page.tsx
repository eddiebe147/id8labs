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

const SpeedometerIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
)

const CpuIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="4" width="16" height="16" rx="2"/>
    <rect x="9" y="9" width="6" height="6"/>
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>
  </svg>
)

const MemoryIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="6" width="18" height="12" rx="1"/>
    <path d="M3 10h18M7 6v-2M12 6v-2M17 6v-2M7 18v2M12 18v2M17 18v2"/>
  </svg>
)

export default function Module7Page() {
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

            <m.div variants={fadeUp}>
              <CourseProgress
                currentModule={7}
                totalModules={8}
                courseTitle="Private AI"
              />
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                Module 7
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                45 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Performance Optimization
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "Our private AI works, but it's too slow for production. How do we get cloud-like speed without sending data outside?"
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
                The Speed Challenge
              </h2>
              <h3 className="text-2xl font-bold mb-4">Private AI Can Be Fast — If You Know Where to Optimize</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  The biggest complaint about private AI: "It's slow." Cloud providers have spent billions optimizing their inference infrastructure. Can you match that on your own hardware?
                </p>
                <p>
                  The answer is: you can get close enough for most use cases. The secret isn't throwing more hardware at the problem — it's understanding where your bottlenecks actually are and fixing them systematically.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module teaches you to identify performance bottlenecks, optimize inference without sacrificing quality, and build systems that scale with demand — all while keeping data private.
                </p>
              </div>
            </div>

            {/* Understanding Performance Bottlenecks */}
            <h2>Where Private AI Slows Down</h2>
            <p>
              Performance problems in private AI typically fall into four categories. Each requires different optimization strategies:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <CpuIcon />
                  <div>
                    <h4 className="font-bold text-id8-orange">Compute Bottleneck</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      <strong>Symptom:</strong> GPU/CPU at 100% utilization, requests queuing<br />
                      <strong>Cause:</strong> Model too large for hardware, no batching, inefficient inference<br />
                      <strong>Impact:</strong> Slow response times, limited throughput
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <MemoryIcon />
                  <div>
                    <h4 className="font-bold text-id8-orange">Memory Bottleneck</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      <strong>Symptom:</strong> Out-of-memory errors, system swapping, slow model loading<br />
                      <strong>Cause:</strong> Model doesn't fit in VRAM, large context windows, no offloading<br />
                      <strong>Impact:</strong> Crashes, extremely slow inference, limited batch sizes
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <SpeedometerIcon />
                  <div>
                    <h4 className="font-bold text-id8-orange">I/O Bottleneck</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      <strong>Symptom:</strong> Slow model loading, disk thrashing, network delays<br />
                      <strong>Cause:</strong> Model on slow storage, RAG retrieval from spinning disks<br />
                      <strong>Impact:</strong> Long cold starts, slow document retrieval, inconsistent latency
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <SpeedometerIcon />
                  <div>
                    <h4 className="font-bold text-id8-orange">Architecture Bottleneck</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      <strong>Symptom:</strong> Good hardware utilization but still slow end-to-end<br />
                      <strong>Cause:</strong> Synchronous processing, no caching, inefficient prompts<br />
                      <strong>Impact:</strong> Wasted compute, poor user experience, can't scale
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p>
              <strong>First step:</strong> Identify which bottleneck you're facing. The solution for a compute bottleneck is completely different from an architecture bottleneck.
            </p>

            {/* Quantization */}
            <h2>Quantization: Smaller Models, Same Quality</h2>
            <p>
              Quantization reduces model precision from 32-bit or 16-bit floating point to 8-bit, 4-bit, or even lower. This dramatically reduces memory usage and speeds up inference.
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Precision</th>
                    <th className="text-left py-3 px-4">Memory Reduction</th>
                    <th className="text-left py-3 px-4">Speed Gain</th>
                    <th className="text-left py-3 px-4">Quality Impact</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">FP32 (baseline)</td>
                    <td className="py-3 px-4">—</td>
                    <td className="py-3 px-4">—</td>
                    <td className="py-3 px-4">Full quality</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">FP16 / BF16</td>
                    <td className="py-3 px-4">50%</td>
                    <td className="py-3 px-4">~2x</td>
                    <td className="py-3 px-4">Negligible loss</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">INT8</td>
                    <td className="py-3 px-4">75%</td>
                    <td className="py-3 px-4">~3-4x</td>
                    <td className="py-3 px-4">Minor loss (1-2%)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">INT4 (GPTQ/AWQ)</td>
                    <td className="py-3 px-4">87.5%</td>
                    <td className="py-3 px-4">~5-6x</td>
                    <td className="py-3 px-4">Noticeable (3-5%)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">2-bit</td>
                    <td className="py-3 px-4">93.75%</td>
                    <td className="py-3 px-4">~8x</td>
                    <td className="py-3 px-4">Significant (10%+)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm">
                <strong>Recommendation:</strong> Start with INT8 quantization. It gives significant speedup with minimal quality loss. Only go to INT4 if you need to fit a larger model in limited VRAM.
              </p>
            </div>

            <h3>Quantization Methods</h3>
            <p>
              Not all quantization is equal. The method matters as much as the bit depth:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">GPTQ (GPU-Optimized)</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>How it works:</strong> Quantizes weights using calibration data, optimized for GPU inference<br />
                  <strong>Best for:</strong> 4-bit quantization on NVIDIA GPUs<br />
                  <strong>Trade-off:</strong> Requires calibration data, but better quality than naive quantization
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">AWQ (Activation-Aware)</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>How it works:</strong> Preserves important weights based on activation patterns<br />
                  <strong>Best for:</strong> When quality matters more than raw speed<br />
                  <strong>Trade-off:</strong> Slightly slower than GPTQ, but better quality at same bit depth
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">GGUF (CPU-Optimized)</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>How it works:</strong> Llama.cpp format optimized for CPU inference<br />
                  <strong>Best for:</strong> Running on CPU or CPU+GPU hybrid<br />
                  <strong>Trade-off:</strong> Excellent CPU performance, not optimal for pure GPU
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">BitsAndBytes</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>How it works:</strong> Runtime quantization integrated with Hugging Face<br />
                  <strong>Best for:</strong> Quick testing, no pre-quantized model available<br />
                  <strong>Trade-off:</strong> Slower than pre-quantized, but very convenient
                </p>
              </div>
            </div>

            {/* Batching and Caching */}
            <h2>Batching: Process Multiple Requests Together</h2>
            <p>
              GPUs are designed for parallel processing. Batching multiple requests together can dramatically improve throughput:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Metric</th>
                    <th className="text-left py-3 px-4">No Batching</th>
                    <th className="text-left py-3 px-4">Batch Size 4</th>
                    <th className="text-left py-3 px-4">Batch Size 16</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Throughput</td>
                    <td className="py-3 px-4">10 req/s</td>
                    <td className="py-3 px-4">35 req/s</td>
                    <td className="py-3 px-4">80 req/s</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Individual latency</td>
                    <td className="py-3 px-4">100ms</td>
                    <td className="py-3 px-4">115ms</td>
                    <td className="py-3 px-4">200ms</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">GPU utilization</td>
                    <td className="py-3 px-4">30%</td>
                    <td className="py-3 px-4">70%</td>
                    <td className="py-3 px-4">95%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong>Key insight:</strong> Batching increases throughput at the cost of individual request latency. Choose your batch size based on your requirements:
            </p>

            <ul>
              <li><strong>Interactive chat:</strong> Small batches (1-4) to minimize latency</li>
              <li><strong>Bulk processing:</strong> Large batches (16-64) to maximize throughput</li>
              <li><strong>Mixed workloads:</strong> Dynamic batching with latency SLOs</li>
            </ul>

            <h3>Continuous Batching</h3>
            <p>
              Traditional batching waits for all requests in a batch to complete before returning any results. Continuous batching returns results as they complete, reducing latency for faster requests:
            </p>

            <div className="not-prose my-8 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
              <p className="text-sm text-[var(--text-secondary)]">
                <strong>How it works:</strong> When one request in the batch finishes, immediately start processing a new one while others continue. Results stream back as they complete.
              </p>
              <p className="text-sm text-[var(--text-secondary)] mt-2">
                <strong>Tools that support this:</strong> vLLM, TensorRT-LLM, text-generation-inference (TGI)
              </p>
            </div>

            {/* KV Cache Optimization */}
            <h2>KV Cache: Eliminate Redundant Computation</h2>
            <p>
              The Key-Value cache stores computed attention values so they don't need to be recomputed for each new token. Proper KV cache management is crucial for performance:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">KV Cache Memory Usage</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  For a 7B parameter model with 4096 context length:<br />
                  KV cache memory = 2 × layers × heads × head_dim × sequence_length × batch_size × precision<br />
                  <strong>Example:</strong> 32 layers × 32 heads × 128 dim × 4096 seq × 4 batch × 2 bytes = ~4GB
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Optimization Strategies</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-2 mt-2">
                  <li><strong>PagedAttention (vLLM):</strong> Manages KV cache like virtual memory, reducing waste by 60-90%</li>
                  <li><strong>Sliding window:</strong> Only cache recent tokens, good for models that support it (Mistral)</li>
                  <li><strong>Quantized KV cache:</strong> Use INT8 for cache even if model is FP16</li>
                  <li><strong>Prefix caching:</strong> Share cache for common system prompts across requests</li>
                </ul>
              </div>
            </div>

            {/* Inference Engines */}
            <h2>Inference Engine Comparison</h2>
            <p>
              The right inference engine can double or triple your performance without any model changes:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Engine</th>
                    <th className="text-left py-3 px-4">Best For</th>
                    <th className="text-left py-3 px-4">Key Features</th>
                    <th className="text-left py-3 px-4">Complexity</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">vLLM</td>
                    <td className="py-3 px-4">High throughput serving</td>
                    <td className="py-3 px-4">PagedAttention, continuous batching, OpenAI-compatible API</td>
                    <td className="py-3 px-4">Low</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">TensorRT-LLM</td>
                    <td className="py-3 px-4">Maximum NVIDIA GPU perf</td>
                    <td className="py-3 px-4">Custom CUDA kernels, FP8 support, inflight batching</td>
                    <td className="py-3 px-4">High</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">llama.cpp</td>
                    <td className="py-3 px-4">CPU inference, edge devices</td>
                    <td className="py-3 px-4">Pure C++, GGUF format, Apple Silicon optimized</td>
                    <td className="py-3 px-4">Low</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">TGI (HuggingFace)</td>
                    <td className="py-3 px-4">Easy deployment, HF ecosystem</td>
                    <td className="py-3 px-4">Flash Attention, tensor parallelism, streaming</td>
                    <td className="py-3 px-4">Medium</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Ollama</td>
                    <td className="py-3 px-4">Local development, simplicity</td>
                    <td className="py-3 px-4">One-click setup, model library, REST API</td>
                    <td className="py-3 px-4">Very Low</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm">
                <strong>Starting point:</strong> Use vLLM for production GPU deployment. It offers the best balance of performance and ease of use. Only move to TensorRT-LLM if you need every last bit of performance and have the engineering resources.
              </p>
            </div>

            {/* Hardware Optimization */}
            <h2>Hardware Optimization</h2>
            <p>
              Before buying more GPUs, make sure you're using what you have effectively:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">GPU Memory Hierarchy</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li><strong>HBM (VRAM):</strong> Fast but limited — keep model weights here</li>
                  <li><strong>System RAM:</strong> Larger, slower — use for offloading when needed</li>
                  <li><strong>NVMe SSD:</strong> Slowest — only for model loading, not inference</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Multi-GPU Strategies</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li><strong>Tensor parallelism:</strong> Split model across GPUs, needed for large models</li>
                  <li><strong>Pipeline parallelism:</strong> Each GPU handles different layers, good for throughput</li>
                  <li><strong>Data parallelism:</strong> Each GPU runs complete model, handles different requests</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">When to Offload to CPU</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>Model doesn't fit in VRAM even with quantization</li>
                  <li>Low request volume (don't need GPU speed)</li>
                  <li>Specific layers that are memory-heavy but not compute-heavy</li>
                </ul>
              </div>
            </div>

            {/* Prompt Optimization */}
            <h2>Prompt Optimization</h2>
            <p>
              The cheapest optimization is using fewer tokens. Every token in your prompt costs compute:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Technique</th>
                    <th className="text-left py-3 px-4">Token Savings</th>
                    <th className="text-left py-3 px-4">Implementation</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Remove verbose instructions</td>
                    <td className="py-3 px-4">20-40%</td>
                    <td className="py-3 px-4">Audit system prompts, remove redundancy</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Use shorter few-shot examples</td>
                    <td className="py-3 px-4">30-50%</td>
                    <td className="py-3 px-4">Minimize example length while maintaining quality</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Compress RAG context</td>
                    <td className="py-3 px-4">40-60%</td>
                    <td className="py-3 px-4">Summarize retrieved docs before injection</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Dynamic context selection</td>
                    <td className="py-3 px-4">Variable</td>
                    <td className="py-3 px-4">Only include relevant context per request</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Limit output length</td>
                    <td className="py-3 px-4">Variable</td>
                    <td className="py-3 px-4">Set max_tokens appropriately, use stop sequences</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Caching Strategies */}
            <h2>Caching Strategies</h2>
            <p>
              Don't recompute what you've already computed. Caching at multiple levels dramatically improves performance:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Response Cache</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>What:</strong> Cache complete responses for identical queries<br />
                  <strong>When:</strong> FAQs, common queries, deterministic tasks<br />
                  <strong>Tool:</strong> Redis, Memcached, or simple in-memory cache
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Semantic Cache</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>What:</strong> Cache responses for semantically similar queries<br />
                  <strong>When:</strong> Questions with many phrasings (customer support)<br />
                  <strong>Tool:</strong> Vector store with similarity threshold
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Embedding Cache</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>What:</strong> Cache document embeddings for RAG<br />
                  <strong>When:</strong> Documents queried frequently, don't change often<br />
                  <strong>Tool:</strong> Persistent vector store (Qdrant, Milvus, pgvector)
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Prefix Cache</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>What:</strong> Cache KV values for common system prompts<br />
                  <strong>When:</strong> Same system prompt across many requests<br />
                  <strong>Tool:</strong> vLLM prefix caching, TensorRT-LLM cached prompts
                </p>
              </div>
            </div>

            {/* Monitoring and Profiling */}
            <h2>Monitoring: Know Your Metrics</h2>
            <p>
              You can't optimize what you don't measure. Track these metrics for every deployment:
            </p>

            <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Time to First Token (TTFT)</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  How long until the model starts responding. Users notice latency here most.
                </p>
                <p className="text-xs text-[var(--text-tertiary)] mt-2">
                  <strong>Target:</strong> &lt;500ms for interactive, &lt;2s for bulk
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Tokens Per Second (TPS)</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Generation speed once started. Affects perceived responsiveness.
                </p>
                <p className="text-xs text-[var(--text-tertiary)] mt-2">
                  <strong>Target:</strong> &gt;30 TPS for chat, &gt;100 TPS for bulk
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Throughput (Req/s)</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Total requests processed per second across all users.
                </p>
                <p className="text-xs text-[var(--text-tertiary)] mt-2">
                  <strong>Target:</strong> Depends on expected load + 2x headroom
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">GPU Utilization</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Are you using your hardware effectively? Low util = optimization opportunity.
                </p>
                <p className="text-xs text-[var(--text-tertiary)] mt-2">
                  <strong>Target:</strong> &gt;80% during peak load
                </p>
              </div>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Performance Benchmark</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 20 minutes<br />
                <strong>You'll need:</strong> Running model, test prompts, monitoring tools
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Create Baseline Measurement (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Run 100 test prompts through your current setup. Record: TTFT, TPS, total time, GPU utilization. This is your baseline.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Identify Bottleneck (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Check: Is GPU at 100%? (compute-bound) Is memory near limit? (memory-bound) Is GPU underutilized? (architecture-bound)
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Apply One Optimization (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Based on bottleneck: Try quantization (memory), enable batching (architecture), or try different inference engine (compute).
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Measure Again (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Run same 100 prompts. Compare to baseline. Document the improvement (or regression). Repeat with next optimization.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A before/after comparison showing which optimizations gave the best results for your specific workload. This guides future infrastructure investments.
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
                  "Identify your bottleneck first. Compute, memory, I/O, and architecture bottlenecks each require different solutions.",
                  "Quantization is the highest-impact optimization. INT8 gives 3-4x speedup with minimal quality loss for most use cases.",
                  "Batching trades latency for throughput. Use small batches for interactive workloads, large batches for bulk processing.",
                  "The right inference engine matters more than you think. vLLM can double throughput compared to naive implementations.",
                  "Measure before and after every change. Without benchmarks, you're guessing, not optimizing.",
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
              Fast private AI is achievable. But speed means nothing if the system breaks. In the final module, we'll cover maintenance and updates — keeping your private AI current and secure as the landscape evolves.
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
                href="/academy/private-ai/module-6"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: Compliance Frameworks
              </Link>
              <Link
                href="/academy/private-ai/module-8"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Maintenance & Updates
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
