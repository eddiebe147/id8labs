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

const LockIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
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
                href="/academy/private-ai"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to Private AI
              </Link>
            </m.div>

            <m.div variants={fadeUp}>
              <CourseProgress
                currentModule={1}
                totalModules={8}
                courseTitle="Private AI"
              />
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                Module 1
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                45 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              The Case for Private AI
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "We're sending our data to AI providers. Should I be worried?"
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
              <h3 className="text-2xl font-bold mb-4">Why Data Privacy Matters More Than You Think</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  You're using ChatGPT to draft client emails. Your team is uploading contracts to Claude for review. Marketing is feeding customer data into AI-powered analytics. Every day, your organization sends proprietary information to third-party AI providers.
                </p>
                <p>
                  Most leaders assume these platforms are "secure enough." They see privacy policies that mention encryption and compliance. They trust that major AI companies wouldn't misuse data. This assumption is dangerous.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module shows you exactly what happens to your data when you use cloud AI services — and why private AI deployment isn't just "nice to have" for certain organizations. It's essential.
                </p>
              </div>
            </div>

            {/* What Happens to Your Data */}
            <h2>What Actually Happens to Your Data</h2>
            <p>
              When you send a prompt to a cloud AI service, here's the journey your data takes:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">1</span>
                  <div>
                    <p className="font-bold">Transmission</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Your data leaves your network, travels through the internet (usually encrypted in transit), and arrives at the provider's servers.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">2</span>
                  <div>
                    <p className="font-bold">Processing</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">The provider's AI model processes your input. This happens on their infrastructure, under their security controls, in regions you may not control.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">3</span>
                  <div>
                    <p className="font-bold">Storage (Maybe)</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Depending on terms of service, your data may be logged for debugging, quality assurance, or model improvement. "We don't train on your data" doesn't mean "we don't store it."</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">4</span>
                  <div>
                    <p className="font-bold">Return</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">The response comes back through the same channels. You see the result. The provider sees everything that went in and came out.</p>
                  </div>
                </div>
              </div>
            </div>

            <p>
              <strong>The critical insight:</strong> Every piece of data you send becomes visible to the provider. They may have excellent security practices. They may promise not to misuse your data. But you've introduced a third party into your data chain — and with it, new risks.
            </p>

            {/* The Risk Matrix */}
            <h2>The Privacy Risk Matrix</h2>
            <p>
              Not all AI use cases carry equal privacy risk. Understanding where your use cases fall on this matrix determines how urgently you need private deployment:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Data Type</th>
                    <th className="text-left py-3 px-4">Risk Level</th>
                    <th className="text-left py-3 px-4">Cloud AI Safe?</th>
                    <th className="text-left py-3 px-4">Examples</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Public Information</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Low</span></td>
                    <td className="py-3 px-4 text-green-400">Yes</td>
                    <td className="py-3 px-4">Marketing copy, blog posts, public-facing content</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Internal Operations</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">Medium</span></td>
                    <td className="py-3 px-4 text-yellow-400">With Controls</td>
                    <td className="py-3 px-4">Meeting summaries, internal docs, project plans</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Competitive Intelligence</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs">High</span></td>
                    <td className="py-3 px-4 text-orange-400">Risky</td>
                    <td className="py-3 px-4">Roadmaps, strategy docs, financial projections</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Customer Data (PII)</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">Critical</span></td>
                    <td className="py-3 px-4 text-red-400">No</td>
                    <td className="py-3 px-4">Client records, customer support logs, user analytics</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Regulated Data</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">Critical</span></td>
                    <td className="py-3 px-4 text-red-400">No</td>
                    <td className="py-3 px-4">Healthcare (HIPAA), financial (SOX), legal (attorney-client)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Trade Secrets</td>
                    <td className="py-3 px-4"><span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">Critical</span></td>
                    <td className="py-3 px-4 text-red-400">No</td>
                    <td className="py-3 px-4">Source code, proprietary algorithms, R&D data</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              If your AI use cases involve anything in the "High" or "Critical" categories, you should be evaluating private deployment options. If you're in a regulated industry, private AI isn't optional — it's a compliance requirement.
            </p>

            {/* What "Private" Actually Means */}
            <h2>What "Private" Actually Means</h2>
            <p>
              The term "private AI" gets used loosely. Let's define it precisely. A truly private AI deployment has three characteristics:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <LockIcon />
                  <div>
                    <p className="font-bold">Data Never Leaves Your Control</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Input data, model processing, and outputs all happen within infrastructure you control — whether that's on-premises servers, private cloud instances, or edge devices.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <LockIcon />
                  <div>
                    <p className="font-bold">No Third-Party Visibility</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">The model provider, cloud host, or any other vendor cannot see your data, queries, or results. They may host the infrastructure, but they cannot access what runs on it.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <LockIcon />
                  <div>
                    <p className="font-bold">Audit Trail Under Your Ownership</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Logs, monitoring, and usage data stay within your security perimeter. You can prove compliance without relying on vendor attestations.</p>
                  </div>
                </div>
              </div>
            </div>

            <p>
              <strong>Beware partial solutions:</strong> "Enterprise plans" with isolated tenants, "dedicated instances" in a vendor's cloud, or "we promise not to train on your data" agreements are better than nothing — but they're not truly private. If the vendor can see your data (even if they promise not to), it's not private.
            </p>

            {/* Real-World Scenarios */}
            <h2>Real-World Privacy Failures</h2>
            <p>
              These scenarios are composites of actual incidents reported across industries:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-2">Law Firm</p>
                <p className="font-bold mb-2">Attorney uses ChatGPT to draft client memo</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Confidential client details entered as context. Opposing counsel later references specific language from a ChatGPT response eerily similar to the firm's strategy. Coincidence? Maybe. Provable violation of attorney-client privilege? Absolutely.
                </p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-2">Healthcare Startup</p>
                <p className="font-bold mb-2">Support team uses AI to summarize patient inquiries</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  HIPAA-protected health information uploaded to cloud AI service without business associate agreement. Discovered during compliance audit. $50K+ in fines, mandatory retraining, and reputation damage in a trust-sensitive industry.
                </p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-2">SaaS Company</p>
                <p className="font-bold mb-2">Engineer pastes code into AI for debugging help</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Proprietary algorithm accidentally shared with third-party AI. Six months later, a competitor launches a feature with suspiciously similar logic. No way to prove causation, but the leak originated from that single debugging session.
                </p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-2">Financial Services Firm</p>
                <p className="font-bold mb-2">Analyst uses AI to summarize M&A research</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Market-moving information uploaded to cloud AI the day before public announcement. No evidence of data breach, but regulatory inquiry into whether material non-public information was adequately protected. Legal fees exceeded $200K.
                </p>
              </div>
            </div>

            <p>
              The common thread: well-intentioned employees using powerful AI tools without understanding the privacy implications. The solution isn't banning AI — it's deploying it privately.
            </p>

            {/* The Compliance Landscape */}
            <h2>The Compliance Landscape</h2>
            <p>
              Different regulations impose different requirements. Here's how private AI maps to major compliance frameworks:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Regulation</th>
                    <th className="text-left py-3 px-4">Key Requirement</th>
                    <th className="text-left py-3 px-4">Cloud AI Risk</th>
                    <th className="text-left py-3 px-4">Private AI Advantage</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">GDPR</td>
                    <td className="py-3 px-4">Data minimization, right to erasure, processor agreements</td>
                    <td className="py-3 px-4">Cross-border transfers, data retention, vendor compliance</td>
                    <td className="py-3 px-4">Full data control, no third-party processors</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">HIPAA</td>
                    <td className="py-3 px-4">PHI protection, business associate agreements</td>
                    <td className="py-3 px-4">BAA coverage gaps, vendor access to PHI</td>
                    <td className="py-3 px-4">No external PHI exposure</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">SOX</td>
                    <td className="py-3 px-4">Financial data integrity, access controls</td>
                    <td className="py-3 px-4">Audit trail gaps, vendor access to financial data</td>
                    <td className="py-3 px-4">Complete audit trail, internal controls</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">CCPA/CPRA</td>
                    <td className="py-3 px-4">Consumer privacy rights, data sale restrictions</td>
                    <td className="py-3 px-4">Third-party sharing, opt-out complexity</td>
                    <td className="py-3 px-4">No third-party data sharing</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">ITAR/EAR</td>
                    <td className="py-3 px-4">Export control, technical data restrictions</td>
                    <td className="py-3 px-4">Cloud provider access = potential export</td>
                    <td className="py-3 px-4">Controlled environment, no foreign access</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* When Private AI Is Essential */}
            <h2>When Private AI Is Essential (Not Optional)</h2>
            <p>
              Private AI moves from "nice to have" to "mandatory" in these situations:
            </p>

            <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-id8-orange mb-2">Regulatory Requirement</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Your industry has data protection laws that cloud AI cannot satisfy (HIPAA, ITAR, financial regulations).
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-id8-orange mb-2">Competitive Advantage</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Your competitive moat depends on proprietary data or algorithms that cannot be exposed to third parties.
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-id8-orange mb-2">Customer Promises</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  You've contractually guaranteed customers that their data will not be shared with third parties.
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-id8-orange mb-2">Reputational Risk</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  A data leak or privacy incident would cause existential damage to your brand (finance, healthcare, legal).
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-id8-orange mb-2">Data Sovereignty</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  You operate in jurisdictions with strict data localization requirements (EU, China, certain industries).
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-id8-orange mb-2">Scale Economics</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Your AI usage volume makes cloud pricing unsustainable. Private deployment becomes cheaper at scale.
                </p>
              </div>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Privacy Needs Assessment</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 20 minutes<br />
                <strong>You'll need:</strong> List of current or planned AI use cases, basic understanding of your data types
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Inventory your AI use cases (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">List every way your organization currently uses or plans to use AI. Be specific: "Summarizing customer support tickets" not "AI for support."</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Classify data types (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For each use case, map it to the Risk Matrix categories (Public, Internal, Competitive, PII, Regulated, Trade Secrets).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Identify compliance requirements (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Which regulations apply to your data? Check the Compliance Landscape table. Be honest about edge cases.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Determine deployment requirements (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For each use case, mark it as "Cloud OK," "Private Preferred," or "Private Required." Use the "When Private AI Is Essential" criteria.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A one-page matrix showing your AI use cases, data sensitivity levels, compliance requirements, and recommended deployment approach. This becomes your privacy roadmap.
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
                  "Every cloud AI interaction exposes your data to third parties. If you wouldn't email it unencrypted, you shouldn't send it to cloud AI.",
                  "The Privacy Risk Matrix helps you classify use cases. Critical data demands private deployment — no exceptions.",
                  "True privacy means data never leaves your control, no third-party visibility, and audit trails you own.",
                  "Compliance frameworks (GDPR, HIPAA, SOX) have specific requirements that cloud AI often cannot satisfy.",
                  "Private AI is mandatory (not optional) when you have regulatory requirements, competitive data, or reputational risk.",
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
              You now understand why private AI matters and when it's essential. In the next module, we'll explore the deployment options available — local, cloud, hybrid, and edge — so you can choose the right architecture for your privacy requirements.
            </p>

          </div>

          <ModuleComplete
            courseSlug="private-ai"
            moduleSlug="module-1"
            nextModulePath="/academy/private-ai/module-2"
          />
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Link
                href="/academy/private-ai"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to Course
              </Link>
              <Link
                href="/academy/private-ai/module-2"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Deployment Options
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
