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

const FileCheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <path d="M9 15l2 2 4-4"/>
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
                href="/academy/private-ai"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to Private AI
              </Link>
            </m.div>

            <m.div variants={fadeUp}>
              <CourseProgress
                currentModule={6}
                totalModules={8}
                courseTitle="Private AI"
              />
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                Module 6
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                60 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Compliance Frameworks
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "We need to prove our AI is compliant with GDPR, HIPAA, and SOC2. Where do we even start?"
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
                The Compliance Reality
              </h2>
              <h3 className="text-2xl font-bold mb-4">Private AI Simplifies Compliance — But Doesn't Eliminate It</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  One of the strongest arguments for private AI is compliance. By keeping data on-premises, you sidestep many of the regulatory headaches that come with cloud-based AI services.
                </p>
                <p>
                  But compliance is more than data residency. Regulators care about transparency, accountability, auditability, and data subject rights — none of which are automatically solved by running AI locally.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module shows you how to map your private AI deployment to GDPR, HIPAA, SOC2, and other frameworks. By the end, you'll have a compliance mapping you can show auditors.
                </p>
              </div>
            </div>

            {/* The Three Major Frameworks */}
            <h2>The Three Major Frameworks</h2>
            <p>
              Most organizations need to comply with one or more of these frameworks. Each has different priorities:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <FileCheckIcon />
                  <div>
                    <h4 className="font-bold text-id8-orange">GDPR (General Data Protection Regulation)</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      <strong>Applies to:</strong> Any organization processing data of EU residents<br />
                      <strong>Focus:</strong> Data subject rights, lawful processing, privacy by design<br />
                      <strong>Penalties:</strong> Up to 4% of global revenue or €20M, whichever is higher
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <FileCheckIcon />
                  <div>
                    <h4 className="font-bold text-id8-orange">HIPAA (Health Insurance Portability and Accountability Act)</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      <strong>Applies to:</strong> Healthcare providers, insurers, and their vendors in the US<br />
                      <strong>Focus:</strong> Protected Health Information (PHI) security and privacy<br />
                      <strong>Penalties:</strong> Up to $1.5M per violation category per year, plus criminal charges
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <FileCheckIcon />
                  <div>
                    <h4 className="font-bold text-id8-orange">SOC2 (Service Organization Control 2)</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      <strong>Applies to:</strong> Service providers storing customer data (voluntary)<br />
                      <strong>Focus:</strong> Security, availability, processing integrity, confidentiality, privacy<br />
                      <strong>Penalties:</strong> None (voluntary), but required by enterprise customers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p>
              <strong>Key insight:</strong> These frameworks overlap significantly. Controls that satisfy GDPR often satisfy HIPAA and SOC2. Build once, map to multiple frameworks.
            </p>

            {/* GDPR Requirements */}
            <h2>GDPR: What You Must Prove</h2>
            <p>
              GDPR has seven core principles. For each, here's what compliance looks like for private AI:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Principle</th>
                    <th className="text-left py-3 px-4">What It Requires</th>
                    <th className="text-left py-3 px-4">How Private AI Helps</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Lawfulness</td>
                    <td className="py-3 px-4">Legal basis for processing (consent, contract, legitimate interest)</td>
                    <td className="py-3 px-4">Same requirement regardless of cloud vs. private</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Purpose Limitation</td>
                    <td className="py-3 px-4">Use data only for specified, explicit purposes</td>
                    <td className="py-3 px-4">Easier to enforce with isolated AI system</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Data Minimization</td>
                    <td className="py-3 px-4">Collect only necessary data</td>
                    <td className="py-3 px-4">Control over training data selection</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Accuracy</td>
                    <td className="py-3 px-4">Keep data up-to-date and correct</td>
                    <td className="py-3 px-4">Direct control over data pipelines</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Storage Limitation</td>
                    <td className="py-3 px-4">Retain data only as long as necessary</td>
                    <td className="py-3 px-4">Implement automated deletion policies</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Integrity & Confidentiality</td>
                    <td className="py-3 px-4">Secure against unauthorized access</td>
                    <td className="py-3 px-4">Network isolation, encryption (see Module 5)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Accountability</td>
                    <td className="py-3 px-4">Demonstrate compliance with all principles</td>
                    <td className="py-3 px-4">Audit logs, documentation, policies</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* GDPR Data Subject Rights */}
            <h2>GDPR: Data Subject Rights</h2>
            <p>
              GDPR gives individuals eight rights regarding their data. Your AI system must support all of them:
            </p>

            <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Right to Access (Art. 15)</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Individuals can request copies of their personal data.
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Implementation:</strong> Query interface to retrieve all data associated with a user ID. Export in machine-readable format.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Right to Rectification (Art. 16)</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Individuals can correct inaccurate data.
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Implementation:</strong> Update mechanisms for training data and model knowledge. Retrain if necessary.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Right to Erasure (Art. 17)</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  "Right to be forgotten" — delete personal data on request.
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Implementation:</strong> Hard delete from all datastores. May require model retraining if data was in training set.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Right to Restrict Processing (Art. 18)</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Temporarily stop processing while disputes are resolved.
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Implementation:</strong> Flag mechanism to block data from queries without deleting it.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Right to Data Portability (Art. 20)</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Receive data in structured, machine-readable format.
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Implementation:</strong> Export to JSON/CSV. Include all personal data processed by AI.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Right to Object (Art. 21)</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Object to processing for direct marketing or legitimate interests.
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Implementation:</strong> Opt-out mechanisms. Remove data from AI processing pipelines.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Rights Related to Automated Decision-Making (Art. 22)</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Not to be subject to purely automated decisions with legal effects.
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Implementation:</strong> Human review for consequential decisions. Explainability mechanisms.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Right to Withdraw Consent (Art. 7.3)</h4>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  Withdraw consent as easily as it was given.
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  <strong>Implementation:</strong> Self-service consent management. Immediate effect on AI processing.
                </p>
              </div>
            </div>

            <div className="not-prose my-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm">
                <strong>Critical challenge:</strong> The "Right to Erasure" is particularly difficult for AI. Once data is in a trained model, removing it requires retraining without that data. Many organizations maintain separate training datasets precisely for this reason.
              </p>
            </div>

            {/* HIPAA Requirements */}
            <h2>HIPAA: Protecting Health Information</h2>
            <p>
              HIPAA focuses on Protected Health Information (PHI). If your AI processes PHI, you must comply with the Security Rule and Privacy Rule:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Requirement</th>
                    <th className="text-left py-3 px-4">What It Means</th>
                    <th className="text-left py-3 px-4">Private AI Implementation</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Access Controls</td>
                    <td className="py-3 px-4">Limit PHI access to authorized users only</td>
                    <td className="py-3 px-4">RBAC, unique user IDs, emergency access procedures</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Audit Controls</td>
                    <td className="py-3 px-4">Log all PHI access and modifications</td>
                    <td className="py-3 px-4">Comprehensive audit logging (Module 5)</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Integrity Controls</td>
                    <td className="py-3 px-4">Protect PHI from improper alteration</td>
                    <td className="py-3 px-4">Checksums, version control, tamper detection</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Transmission Security</td>
                    <td className="py-3 px-4">Encrypt PHI in transit</td>
                    <td className="py-3 px-4">TLS 1.3 for all API communication</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Encryption at Rest</td>
                    <td className="py-3 px-4">Encrypt PHI stored on disk</td>
                    <td className="py-3 px-4">AES-256 encryption for all PHI datastores</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Minimum Necessary</td>
                    <td className="py-3 px-4">Access only PHI needed for specific purpose</td>
                    <td className="py-3 px-4">Data minimization in training sets and queries</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Business Associate Agreements</td>
                    <td className="py-3 px-4">Contracts with vendors handling PHI</td>
                    <td className="py-3 px-4">Not applicable if fully on-prem (no vendors)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Breach Notification</td>
                    <td className="py-3 px-4">Report PHI breaches within 60 days</td>
                    <td className="py-3 px-4">Incident response plan, breach detection systems</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              <strong>Private AI advantage:</strong> By running on-premises, you eliminate most third-party risk. No Business Associate Agreements needed with cloud AI providers. You control the entire security perimeter.
            </p>

            {/* SOC2 Requirements */}
            <h2>SOC2: Trust Service Criteria</h2>
            <p>
              SOC2 is voluntary but increasingly required by enterprise customers. It evaluates five Trust Service Criteria:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Security (Required)</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Focus:</strong> Protection against unauthorized access<br />
                  <strong>Evidence needed:</strong> Access controls, firewalls, encryption, incident response procedures<br />
                  <strong>How to demonstrate:</strong> Module 5 security controls, penetration testing results, audit logs
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Availability (Optional)</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Focus:</strong> System uptime and reliability<br />
                  <strong>Evidence needed:</strong> Redundancy, disaster recovery, SLA monitoring<br />
                  <strong>How to demonstrate:</strong> Uptime metrics, backup procedures, failover tests
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Processing Integrity (Optional)</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Focus:</strong> System processes data accurately and completely<br />
                  <strong>Evidence needed:</strong> Input validation, error handling, data quality checks<br />
                  <strong>How to demonstrate:</strong> Quality assurance testing, model validation procedures
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Confidentiality (Optional)</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Focus:</strong> Sensitive information protected as agreed<br />
                  <strong>Evidence needed:</strong> Encryption, access controls, NDAs, data classification<br />
                  <strong>How to demonstrate:</strong> Encryption policies, access logs, data handling procedures
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Privacy (Optional)</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Focus:</strong> Personal information collected, used, retained, disclosed per commitments<br />
                  <strong>Evidence needed:</strong> Privacy notice, consent mechanisms, data retention policies<br />
                  <strong>How to demonstrate:</strong> GDPR compliance documentation, data subject request handling
                </p>
              </div>
            </div>

            <p>
              <strong>SOC2 audit process:</strong> Independent auditor evaluates your controls over 3-12 months (Type I: point-in-time, Type II: period of time). Private AI makes this easier because you control the entire stack.
            </p>

            {/* Compliance Documentation */}
            <h2>Documentation: What Auditors Need</h2>
            <p>
              Compliance is about proving what you do. Documentation is how you prove it:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h3 className="text-lg font-bold mb-4">Essential Compliance Documents</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-sm mb-1">1. Data Processing Inventory (GDPR Art. 30)</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    What: Comprehensive list of all data processing activities<br />
                    Must include: Purpose, data categories, recipients, retention periods, security measures<br />
                    For AI: Document what data trains models, how it's processed, where it's stored
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-sm mb-1">2. Data Protection Impact Assessment (DPIA)</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    What: Risk analysis for high-risk processing (required for AI under GDPR)<br />
                    Must include: Necessity assessment, risk evaluation, mitigation measures<br />
                    For AI: Assess bias risks, automated decision-making, large-scale profiling
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-sm mb-1">3. Security Policies and Procedures</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    What: Written policies governing security controls<br />
                    Must include: Access control, encryption, incident response, backup/recovery<br />
                    For AI: Model security, prompt filtering, output validation (Module 5)
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-sm mb-1">4. Audit Logs and Access Records</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    What: Technical evidence of who accessed what and when<br />
                    Must include: User ID, timestamp, action taken, data accessed<br />
                    For AI: Query logs, model access, configuration changes, data exports
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-sm mb-1">5. Training and Awareness Records</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    What: Proof that employees understand compliance requirements<br />
                    Must include: Training materials, attendance records, acknowledgment forms<br />
                    For AI: Responsible AI training, data handling procedures, security awareness
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-sm mb-1">6. Incident Response Plan</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    What: Documented procedures for handling breaches and security incidents<br />
                    Must include: Detection, containment, notification, remediation steps<br />
                    For AI: Model compromise, data exfiltration, prompt injection attacks
                  </p>
                </div>
              </div>
            </div>

            {/* Common Pitfalls */}
            <h2>Five Compliance Pitfalls</h2>
            <p>
              Organizations often stumble on these compliance issues:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Pitfall #1</p>
                <p className="font-bold">Assuming On-Prem Equals Compliant</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Private AI solves data residency but not the other 90% of compliance requirements. You still need access controls, encryption, audit trails, etc.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Pitfall #2</p>
                <p className="font-bold">Incomplete Data Inventory</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Not documenting what data trains your models. When data subject requests arrive, you can't respond because you don't know what's in your training set.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Pitfall #3</p>
                <p className="font-bold">No Mechanism for Data Subject Rights</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Building AI without designing for GDPR rights (access, erasure, portability). Retrofitting these capabilities is expensive and time-consuming.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Pitfall #4</p>
                <p className="font-bold">Insufficient Audit Logging</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Logging only errors instead of all access. Auditors want to see who queried the AI, what data they accessed, and when. No logs = failed audit.
                </p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Pitfall #5</p>
                <p className="font-bold">Treating Compliance as One-Time Event</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Compliance is continuous. Regulations change, new vulnerabilities emerge, your system evolves. Annual reviews are minimum; quarterly is better.
                </p>
              </div>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Compliance Mapping</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 30 minutes<br />
                <strong>You'll need:</strong> List of compliance frameworks that apply to your organization
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Identify Applicable Frameworks (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      List which frameworks apply: GDPR (EU data?), HIPAA (healthcare?), SOC2 (enterprise customers?), others (CCPA, PCI-DSS, etc.)
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Map Current Controls to Requirements (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      For your primary framework, create a table: Requirement | Current Control | Status (Compliant/Partial/Missing)
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Document Evidence Gaps (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      For each "Partial" or "Missing" item, note: What evidence is missing? Who owns creating it? When can it be ready?
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Create Remediation Timeline (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Prioritize gaps by regulatory risk. Create timeline for closing each gap. Share with compliance and legal teams.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A compliance mapping document that shows which requirements you meet, which you partially meet, and which are gaps. This is exactly what auditors ask for.
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
                  "Private AI simplifies compliance by eliminating third-party data sharing, but doesn't eliminate other requirements.",
                  "GDPR requires support for eight data subject rights. Design these into your AI system from the start, not as an afterthought.",
                  "HIPAA focuses on PHI security. If you handle health data, encryption, access controls, and audit logging are mandatory.",
                  "SOC2 is voluntary but increasingly required by enterprise customers. It validates your security controls through independent audit.",
                  "Documentation proves compliance. Without audit trails, policies, and DPIAs, you can't demonstrate compliance no matter how good your controls are.",
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
              Compliance gives you permission to operate. But to operate effectively, your private AI needs to be fast. In the next module, we'll optimize performance without sacrificing privacy.
            </p>

          </div>

          <ModuleComplete
            courseSlug="private-ai"
            moduleSlug="module-6"
            nextModulePath="/academy/private-ai/module-7"
          />
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Link
                href="/academy/private-ai/module-5"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: Security Hardening
              </Link>
              <Link
                href="/academy/private-ai/module-7"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Performance Optimization
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
