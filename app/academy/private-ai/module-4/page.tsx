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

const ShieldIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

export default function Module4Page() {
  return (
    <ModuleAnnotations courseSlug="private-ai" moduleSlug="module-4">
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
                currentModule={4}
                totalModules={8}
                courseTitle="Private AI"
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
              Data Handling Protocols
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "How do we make sure sensitive data actually stays protected?"
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
              <h3 className="text-2xl font-bold mb-4">Keep Sensitive Data Where It Belongs</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  You've chosen your deployment architecture and selected your model. But private AI isn't just about where the model runs — it's about how data flows through your entire system. A single misconfigured endpoint or overlooked log file can expose everything you worked to protect.
                </p>
                <p>
                  Most data breaches in AI systems happen not because the model itself leaks data, but because the infrastructure around it wasn't designed with privacy as a first-class concern. Logs capture full prompts. APIs accidentally route sensitive data to cloud providers. Caches store unencrypted outputs indefinitely.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module walks you through the complete data lifecycle in a private AI system — from input validation to output sanitization to long-term storage. You'll learn exactly how to ensure sensitive data never leaks, even by accident.
                </p>
              </div>
            </div>

            {/* The Data Flow */}
            <h2>The Complete Data Flow</h2>
            <p>
              In a private AI system, data moves through seven distinct stages. Each stage is a potential leak point. Let's map them all:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">1</span>
                  <div>
                    <p className="font-bold">Input Collection</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">User enters prompt through UI, API, or integration. First point where sensitive data enters the system.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">2</span>
                  <div>
                    <p className="font-bold">Classification & Routing</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">System determines sensitivity level and routes to appropriate model endpoint (cloud, private cloud, local, edge).</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">3</span>
                  <div>
                    <p className="font-bold">Preprocessing & Context Injection</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Prompt engineering, RAG context retrieval, any transformations before model sees input.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">4</span>
                  <div>
                    <p className="font-bold">Model Inference</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Model processes input and generates output. This is where your deployment choice from Module 2 matters.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">5</span>
                  <div>
                    <p className="font-bold">Output Sanitization</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Filter model output for PII leakage, inappropriate content, or sensitive information that shouldn't be returned.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">6</span>
                  <div>
                    <p className="font-bold">Response Delivery</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Send output back to user. Ensure encryption in transit (TLS), log only what's necessary.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">7</span>
                  <div>
                    <p className="font-bold">Long-Term Storage (If Any)</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Conversation history, analytics, model training data. Requires strictest controls.</p>
                  </div>
                </div>
              </div>
            </div>

            <p>
              <strong>Critical insight:</strong> Every arrow between these stages is a potential leak. Your job is to ensure sensitive data is protected at each transition.
            </p>

            {/* Data Classification */}
            <h2>Data Classification: The Foundation</h2>
            <p>
              Before you can protect data, you need to know what you're protecting. Build a classification framework with clear rules:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Sensitivity Level</th>
                    <th className="text-left py-3 px-4">Definition</th>
                    <th className="text-left py-3 px-4">Examples</th>
                    <th className="text-left py-3 px-4">Routing</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Public</span></td>
                    <td className="py-3 px-4">Already public or intended for public release</td>
                    <td className="py-3 px-4">Marketing copy, blog posts, public FAQs</td>
                    <td className="py-3 px-4">Any endpoint (cloud OK)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">Internal</span></td>
                    <td className="py-3 px-4">Non-sensitive business information</td>
                    <td className="py-3 px-4">Meeting notes, project plans, internal docs</td>
                    <td className="py-3 px-4">Private cloud with controls</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs">Confidential</span></td>
                    <td className="py-3 px-4">Competitive or strategic information</td>
                    <td className="py-3 px-4">Roadmaps, financials, customer lists</td>
                    <td className="py-3 px-4">Local deployment only</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">Restricted</span></td>
                    <td className="py-3 px-4">Legally protected or regulated data</td>
                    <td className="py-3 px-4">PII, PHI, financial records, trade secrets</td>
                    <td className="py-3 px-4">Air-gapped local or edge only</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong>Implementation approach:</strong> Use automated detection (DLP tools, regex patterns, ML classifiers) AND manual tagging. Automation catches 80%, humans handle edge cases.
            </p>

            {/* Input Validation */}
            <h2>Input Validation & Sanitization</h2>
            <p>
              Before data even reaches your model, validate and sanitize it. This protects against prompt injection attacks and accidental data leakage:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold mb-2">PII Detection</p>
                <p className="text-sm text-[var(--text-secondary)] mb-2">Use pattern matching and NER (Named Entity Recognition) to detect:</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Email addresses, phone numbers, SSNs, credit card numbers</li>
                  <li>• Names, addresses, dates of birth (when combined with other identifiers)</li>
                  <li>• IP addresses, device IDs, session tokens</li>
                  <li>• <strong>Action:</strong> Block, redact, or route to more secure endpoint</li>
                </ul>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold mb-2">Prompt Injection Protection</p>
                <p className="text-sm text-[var(--text-secondary)] mb-2">Detect attempts to manipulate model behavior:</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Check for "Ignore previous instructions" patterns</li>
                  <li>• Flag unusual formatting (excessive newlines, special chars)</li>
                  <li>• Detect jailbreak attempts ("You are now in DAN mode...")</li>
                  <li>• <strong>Action:</strong> Reject, sanitize, or require human review</li>
                </ul>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold mb-2">Size & Rate Limits</p>
                <p className="text-sm text-[var(--text-secondary)] mb-2">Prevent abuse and accidental data dumps:</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Max input length (prevent giant data pastes)</li>
                  <li>• Rate limiting per user/API key (prevent scraping)</li>
                  <li>• File upload restrictions (size, type, content scanning)</li>
                  <li>• <strong>Action:</strong> Enforce limits before model sees data</li>
                </ul>
              </div>
            </div>

            {/* Context Injection */}
            <h2>Safe Context Injection (RAG & Retrieval)</h2>
            <p>
              If you're using RAG (Retrieval-Augmented Generation), your vector database becomes a privacy-sensitive asset. Protect it:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold mb-2">Embedding Privacy</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Generate embeddings locally (not via cloud embedding APIs)</li>
                  <li>• Use open embedding models (nomic-embed, bge, e5) that you control</li>
                  <li>• Encrypt vector database at rest</li>
                  <li>• Implement access controls on chunks (user/role-based filtering)</li>
                </ul>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold mb-2">Retrieval Filtering</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Filter retrieved chunks by classification level before injection</li>
                  <li>• Don't mix Public and Restricted data in same context window</li>
                  <li>• Redact sensitive parts of chunks if possible (names, IDs)</li>
                  <li>• Log what was retrieved (for audit trail) but not in plaintext</li>
                </ul>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold mb-2">Context Separation</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Best practice:</strong> Maintain separate vector databases for different sensitivity levels. Public, Internal, Confidential, Restricted each get isolated storage. Query only the appropriate one based on input classification.
                </p>
              </div>
            </div>

            {/* Output Sanitization */}
            <h2>Output Sanitization & Validation</h2>
            <p>
              Models can inadvertently leak training data or repeat sensitive input. Sanitize outputs before returning to users:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold mb-2">PII Redaction</p>
                <p className="text-sm text-[var(--text-secondary)] mb-2">Scan model outputs for accidentally leaked PII:</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Run same NER detection as input validation</li>
                  <li>• Check for verbatim chunks from training data (if detectable)</li>
                  <li>• Redact or mask detected PII before sending response</li>
                  <li>• Log redactions for review</li>
                </ul>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold mb-2">Content Filtering</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Check for harmful content (hate speech, explicit material)</li>
                  <li>• Detect potential IP violations (code snippets from proprietary systems)</li>
                  <li>• Flag outputs that reveal internal system details</li>
                  <li>• <strong>Action:</strong> Block, sanitize, or require human review</li>
                </ul>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold mb-2">Watermarking (Optional)</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  For high-stakes deployments, embed invisible watermarks in outputs to trace leaks. Techniques include synonym substitution patterns, whitespace encoding, or generative watermarks. Trade-off: Adds complexity and may affect quality.
                </p>
              </div>
            </div>

            {/* Logging & Monitoring */}
            <h2>Logging & Monitoring (Without Leaking Data)</h2>
            <p>
              You need logs for debugging and compliance. But full prompt/response logging defeats the purpose of private AI. Log strategically:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">What to Log</th>
                    <th className="text-left py-3 px-4">How to Log It</th>
                    <th className="text-left py-3 px-4">Retention</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Metadata</td>
                    <td className="py-3 px-4">User ID, timestamp, model used, tokens, latency, classification level</td>
                    <td className="py-3 px-4">1 year (analytics)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Prompts (Public/Internal)</td>
                    <td className="py-3 px-4">Full text, encrypted at rest</td>
                    <td className="py-3 px-4">30-90 days (debugging)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Prompts (Confidential/Restricted)</td>
                    <td className="py-3 px-4">Hash only (SHA-256), no plaintext</td>
                    <td className="py-3 px-4">30 days (deduplication)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Responses</td>
                    <td className="py-3 px-4">Sanitized + encrypted, or hash only for Restricted</td>
                    <td className="py-3 px-4">30-90 days</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Errors</td>
                    <td className="py-3 px-4">Stack trace + sanitized input excerpt (first 100 chars)</td>
                    <td className="py-3 px-4">1 year (debugging)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Security Events</td>
                    <td className="py-3 px-4">Full details, encrypted, immutable</td>
                    <td className="py-3 px-4">7 years (compliance)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="font-mono text-sm text-red-400 mb-2">Logging Warning</p>
              <p className="text-sm text-[var(--text-secondary)]">
                Default logging in most frameworks captures full HTTP requests/responses. This includes prompts, responses, auth tokens — everything. <strong>Disable default logging</strong> and implement custom privacy-aware logging. Popular culprits: Express.js morgan, Django debug logs, Flask default logger.
              </p>
            </div>

            {/* Storage & Retention */}
            <h2>Long-Term Storage & Retention</h2>
            <p>
              If you store conversation history or training data, apply the strictest controls:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold mb-2">Encryption</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• <strong>At rest:</strong> AES-256, keys managed separately (KMS, vault)</li>
                  <li>• <strong>In transit:</strong> TLS 1.3+, certificate pinning for critical paths</li>
                  <li>• <strong>In use:</strong> Consider confidential computing (SGX, SEV) for highest sensitivity</li>
                  <li>• Rotate keys periodically (quarterly for Restricted data)</li>
                </ul>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold mb-2">Access Controls</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Role-Based Access Control (RBAC) — minimum necessary principle</li>
                  <li>• Audit all access to Restricted data (who, when, what)</li>
                  <li>• Require MFA for accessing sensitive data stores</li>
                  <li>• Time-limited access grants (temporary elevation)</li>
                </ul>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold mb-2">Retention Policies</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Define clear retention periods per classification level</li>
                  <li>• Automate deletion (don't rely on manual cleanup)</li>
                  <li>• Implement "right to be forgotten" workflow for GDPR</li>
                  <li>• Archive (encrypted, offline) what must be kept for compliance</li>
                </ul>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold mb-2">Backups</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Critical:</strong> Backups inherit sensitivity of source data. Encrypt backups with separate keys, store in secure location (ideally offline for Restricted), test restoration regularly, and include backups in retention/deletion policies.
                </p>
              </div>
            </div>

            {/* Incident Response */}
            <h2>Data Breach Incident Response</h2>
            <p>
              Despite best efforts, breaches happen. Have a plan:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Detection</p>
                    <p className="text-sm text-[var(--text-secondary)]">Monitor for anomalies: unusual data access patterns, failed auth attempts, unexpected data exports. Set up alerts for Restricted data access.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Containment</p>
                    <p className="text-sm text-[var(--text-secondary)]">Immediately isolate affected systems. Revoke compromised credentials. Disable affected endpoints. Preserve evidence (logs, disk images).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Assessment</p>
                    <p className="text-sm text-[var(--text-secondary)]">Determine scope: What data was exposed? How many users affected? Classification level of leaked data? Timeline of breach.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Notification</p>
                    <p className="text-sm text-[var(--text-secondary)]">GDPR: 72 hours to notify authorities. HIPAA: 60 days. CCPA: "without unreasonable delay." Notify affected users. Prepare public statement if necessary.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">5</span>
                  <div>
                    <p className="font-bold">Remediation</p>
                    <p className="text-sm text-[var(--text-secondary)]">Fix root cause, rotate all credentials, review access logs, update security controls, conduct post-mortem, update incident response plan.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Data Flow Diagram</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 25 minutes<br />
                <strong>You'll need:</strong> Your AI use cases, deployment architecture, model selection
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Map your data flow (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Draw the seven-stage flow for your primary use case. Label each stage with: where it happens (client, API gateway, model server, database), what security controls apply, and sensitivity level of data at that stage.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Identify leak points (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Mark every arrow/transition where data could leak (logs, errors, caches, backups, third-party services). Be paranoid.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Define controls for each leak point (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For each identified leak point, specify: What control prevents leakage? (encryption, sanitization, access control, etc.) How is it enforced? How is compliance verified?</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A visual data flow diagram showing all seven stages, every potential leak point clearly marked, and security controls annotated at each stage. This becomes your implementation blueprint.
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
                  "Data flows through seven stages in an AI system. Each transition is a potential leak point — map them all.",
                  "Classification is the foundation. You can't protect data you haven't classified. Build a clear framework with automated detection.",
                  "Logs are a privacy landmine. Default logging frameworks capture everything — disable them and implement privacy-aware custom logging.",
                  "Sanitize inputs AND outputs. PII detection on inputs prevents leaks in. Same detection on outputs catches model hallucinations of sensitive data.",
                  "Encryption, access controls, and retention policies aren't optional. Apply them to all stored data, especially Restricted classification.",
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
              You've now completed the Private AI course. You understand why privacy matters, how to choose deployment architectures, which models to use, and how to protect data throughout the entire lifecycle. You have the frameworks to build truly private AI systems that deliver capability without compromising security.
            </p>

          </div>

          <ModuleComplete
            courseSlug="private-ai"
            moduleSlug="module-4"
            nextModulePath="/academy/private-ai/module-5"
          />
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Link
                href="/academy/private-ai/module-3"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: Model Selection for Privacy
              </Link>
              <Link
                href="/academy/private-ai"
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
    </ModuleAnnotations>
  )
}
