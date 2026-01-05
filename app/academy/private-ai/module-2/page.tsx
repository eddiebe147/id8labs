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

const GlobeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const MapPinIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

export default function Module2Page() {
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
                currentModule={2}
                totalModules={8}
                courseTitle="Private AI"
              />
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                Module 2
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                40 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Understanding Data Residency
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "Where does my data actually go when I use AI?"
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
                The Geography of Your Data
              </h2>
              <h3 className="text-2xl font-bold mb-4">Why Location Matters More Than You Think</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  You type a prompt into ChatGPT from your office in London. Where does that data go? The answer isn't "the cloud" — it's specific physical servers in specific countries, governed by specific laws.
                </p>
                <p>
                  Data residency isn't just technical trivia. It determines which privacy laws apply, who can compel access to your data, and whether you're compliant with industry regulations. Get it wrong, and you're exposed to legal liability, regulatory fines, and competitive risk.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module maps the journey your data takes through cloud AI services, explains the jurisdictional implications, and teaches you how to maintain control through local processing.
                </p>
              </div>
            </div>

            {/* The Data Journey */}
            <h2>The Data Journey: From Your Device to the Cloud</h2>
            <p>
              When you use a cloud AI service, your data travels through multiple hops before returning a response. Each hop introduces a new jurisdiction, a new set of laws, and a new potential access point.
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">1</span>
                  <div>
                    <p className="font-bold">Your Device (Origin)</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Data originates on your computer, phone, or network. Governed by local laws (GDPR in EU, CCPA in California, etc.).</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">2</span>
                  <div>
                    <p className="font-bold">ISP & Transit Networks</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Data travels through internet service providers and backbone networks. May cross international borders even before reaching the AI provider.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">3</span>
                  <div>
                    <p className="font-bold">API Gateway (Entry Point)</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Provider's front door. Often geo-distributed (nearest edge server), but data is logged and may be routed to central processing.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">4</span>
                  <div>
                    <p className="font-bold">Processing Infrastructure</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">The actual AI model runs here. Could be US-based AWS, Google Cloud in Belgium, Azure in Singapore — you often don't control this.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">5</span>
                  <div>
                    <p className="font-bold">Storage & Logging (Optional)</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">If the provider logs requests (for debugging, quality, compliance), data may be stored in a different region entirely.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-sm">6</span>
                  <div>
                    <p className="font-bold">Return Path</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Response travels back through the same network hops. Each step is a potential interception or logging point.</p>
                  </div>
                </div>
              </div>
            </div>

            <p>
              <strong>Critical insight:</strong> Even if you're in Germany and the AI provider promises "EU data residency," your data may route through US-based CDNs, be processed on servers with US parent companies subject to US surveillance laws, or be logged in regions you didn't authorize.
            </p>

            {/* Cloud vs Local Processing */}
            <h2>Cloud vs Local Processing: The Tradeoff Matrix</h2>
            <p>
              Understanding data residency requires comparing cloud and local deployment options. Here's the honest assessment of each approach:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Factor</th>
                    <th className="text-left py-3 px-4">Cloud Processing</th>
                    <th className="text-left py-3 px-4">Local Processing</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Data Location</td>
                    <td className="py-3 px-4">Provider's infrastructure (multi-region, may cross borders)</td>
                    <td className="py-3 px-4">Your infrastructure (single location, full control)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Jurisdiction</td>
                    <td className="py-3 px-4">Subject to provider's home laws + processing region laws</td>
                    <td className="py-3 px-4">Only your local laws apply</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Access Control</td>
                    <td className="py-3 px-4">Provider has access; may be compelled to share with governments</td>
                    <td className="py-3 px-4">You control access; no third-party visibility</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Performance</td>
                    <td className="py-3 px-4">Network latency, variable (depends on distance to servers)</td>
                    <td className="py-3 px-4">Low latency, predictable (local processing)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Scalability</td>
                    <td className="py-3 px-4">Elastic (provider handles scaling)</td>
                    <td className="py-3 px-4">Fixed by hardware (you manage capacity)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Cost Structure</td>
                    <td className="py-3 px-4">Pay-per-use (can get expensive at scale)</td>
                    <td className="py-3 px-4">Upfront hardware (cheaper at high volume)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Model Updates</td>
                    <td className="py-3 px-4">Automatic (provider manages)</td>
                    <td className="py-3 px-4">Manual (you deploy updates)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Compliance Audit</td>
                    <td className="py-3 px-4">Depends on vendor attestations (you trust, don't verify)</td>
                    <td className="py-3 px-4">Full audit trail (you own the logs)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              The right choice depends on your risk tolerance, compliance requirements, and usage volume. But for sensitive data, local processing is the only way to guarantee jurisdictional control.
            </p>

            {/* Jurisdictional Risks */}
            <h2>Jurisdictional Landmines</h2>
            <p>
              Different regions have different rules about data access, retention, and government surveillance. Here are the major considerations by geography:
            </p>

            <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPinIcon />
                  <p className="font-bold text-id8-orange">United States</p>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Laws:</strong> FISA 702 allows warrantless surveillance of foreign communications. Cloud Act permits government access to data stored by US companies, even if physically located abroad.
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  <strong>Risk:</strong> If your cloud provider is a US company (OpenAI, Anthropic, AWS, Google), US authorities can compel access regardless of where data is stored.
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPinIcon />
                  <p className="font-bold text-id8-orange">European Union</p>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Laws:</strong> GDPR requires data minimization, right to erasure, and strict cross-border transfer rules. Schrems II ruling invalidated Privacy Shield framework.
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  <strong>Risk:</strong> Transferring EU citizen data to US providers without Standard Contractual Clauses or other safeguards is illegal. Fines can reach 4% of global revenue.
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPinIcon />
                  <p className="font-bold text-id8-orange">China</p>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Laws:</strong> Cybersecurity Law and Data Security Law require data localization for critical information infrastructure. Government access is broad and mandatory.
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  <strong>Risk:</strong> If operating in China, data must stay within Chinese borders. Using foreign cloud AI services may be non-compliant or blocked entirely.
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPinIcon />
                  <p className="font-bold text-id8-orange">Russia</p>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Laws:</strong> Federal Law 242-FZ mandates that personal data of Russian citizens be stored on servers physically located in Russia.
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  <strong>Risk:</strong> Cloud AI providers without Russian data centers cannot legally process Russian citizen data. Enforcement is strict.
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPinIcon />
                  <p className="font-bold text-id8-orange">India</p>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Laws:</strong> Digital Personal Data Protection Act (2023) introduces data localization for sensitive personal data and cross-border transfer restrictions.
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  <strong>Risk:</strong> Rapidly evolving rules. Cloud providers scrambling to add Indian data centers. Uncertainty around enforcement.
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPinIcon />
                  <p className="font-bold text-id8-orange">Five Eyes (US, UK, CA, AU, NZ)</p>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Laws:</strong> Intelligence-sharing agreement. Data in one country can be accessed by authorities in all five.
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  <strong>Risk:</strong> Storing data in UK/Canada/Australia doesn't protect it from US surveillance. The alliance shares intelligence broadly.
                </p>
              </div>
            </div>

            {/* The Illusion of "Regional" Cloud */}
            <h2>The Illusion of "Regional" Cloud Deployments</h2>
            <p>
              Cloud providers offer "regional" deployments (e.g., "AWS Europe," "Google Cloud EU"). This sounds reassuring, but it's not the same as true data residency. Here's why:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="font-bold mb-2">Parent Company Jurisdiction</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Even if your data is physically in Germany on AWS servers, Amazon is a US company subject to US law. The Cloud Act allows US authorities to compel access regardless of data location.
                </p>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="font-bold mb-2">Cross-Region Backups</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Many providers replicate data across regions for disaster recovery. Your "EU-only" data may have replicas in US data centers. Read the fine print.
                </p>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="font-bold mb-2">Support & Engineering Access</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Cloud provider support teams (often US-based) can access your data for troubleshooting. This access creates a cross-border data flow you didn't explicitly authorize.
                </p>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="font-bold mb-2">Model Training & Improvement</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  AI providers may aggregate anonymized data across regions to improve models. Your data leaves its original jurisdiction in anonymized form (which may not satisfy regulations).
                </p>
              </div>
            </div>

            <p>
              <strong>Takeaway:</strong> "Regional cloud" is better than nothing, but it's not true data residency. For compliance-critical use cases, local deployment is the only guarantee.
            </p>

            {/* Local Processing Options */}
            <h2>Local Processing: Your Options</h2>
            <p>
              To achieve true data residency, you need to process AI workloads locally. Here are the primary approaches:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-id8-orange mb-2">On-Premises Servers</p>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Deploy AI models on your own hardware in your own data center. Maximum control, zero third-party access.
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Best for:</strong> Enterprises with existing infrastructure, regulated industries (finance, healthcare, defense)
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-id8-orange mb-2">Edge Devices (Laptops, Workstations)</p>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Run models directly on user devices. Data never leaves the machine. Perfect for individual knowledge workers.
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Best for:</strong> Professionals handling sensitive client data (lawyers, accountants, consultants)
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-id8-orange mb-2">Private Cloud (VPC with Hardware Isolation)</p>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Dedicated hardware within a cloud provider's data center, with contractual guarantees that no other customer or provider employee can access it.
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Best for:</strong> Organizations that need cloud scalability but require physical isolation (hybrid approach)
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-id8-orange mb-2">Hybrid (Local + Cloud Orchestration)</p>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Sensitive processing happens locally; non-sensitive tasks (like model updates or aggregated analytics) use cloud. Requires careful data classification.
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Best for:</strong> Organizations with mixed sensitivity data that want to optimize cost and performance
                </p>
              </div>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Data Flow Mapping Template</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 25 minutes<br />
                <strong>You'll need:</strong> List of AI tools you use, basic understanding of your data types
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Map your current AI data flows (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For each AI tool, document: Where does data originate? What service processes it? Where is that service hosted? What jurisdiction governs it?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Identify jurisdictional risks (7 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Check each service against the Jurisdictional Landmines section. Flag any flows that cross sensitive borders (EU to US, within Five Eyes, etc.).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Assess "regional cloud" claims (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">If you use "EU-only" or "regional" services, verify: Is the parent company still US-based? Are backups replicated cross-region? Does support have access?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Design your ideal state (3 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For each high-risk flow, propose a local processing alternative. Mark which should move to on-prem, edge, or private cloud.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A visual flow diagram showing current-state data flows with jurisdictions labeled, plus a target-state architecture with local processing for sensitive data. This becomes your data residency roadmap.
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
                  "Your data travels through 6+ hops when using cloud AI. Each hop crosses jurisdictions and introduces risk.",
                  "Cloud vs local is a tradeoff: scalability and convenience vs control and compliance. For sensitive data, control wins.",
                  "Jurisdictional risks vary by region. US Cloud Act, EU GDPR, and China's localization laws create conflicting requirements.",
                  "Regional cloud deployments are better than nothing, but parent company jurisdiction still applies. True residency requires local processing.",
                  "Local processing options include on-premises, edge devices, private cloud, and hybrid approaches. Choose based on your sensitivity and scale needs.",
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
              You now understand where your data goes and what jurisdictional risks you face. In the next module, we'll get practical: how to deploy local LLMs with the right hardware, models, and configurations for private AI.
            </p>

          </div>

          <ModuleComplete
            courseSlug="private-ai"
            moduleSlug="module-2"
            nextModulePath="/academy/private-ai/module-3"
          />
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Link
                href="/academy/private-ai/module-1"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: The Case for Private AI
              </Link>
              <Link
                href="/academy/private-ai/module-3"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Deploying Local LLMs
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
