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

const ShieldIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
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
                href="/academy/private-ai"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to Private AI
              </Link>
            </m.div>

            <m.div variants={fadeUp}>
              <CourseProgress
                currentModule={5}
                totalModules={8}
                courseTitle="Private AI"
              />
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
              Security Hardening
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "Our AI runs locally, but is it actually secure? How do we protect it from real threats?"
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
                The Security Reality
              </h2>
              <h3 className="text-2xl font-bold mb-4">Privacy Doesn't Equal Security</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  You've deployed private AI. Your data stays on-premises. No cloud provider can access your information. That's privacy — and it's essential.
                </p>
                <p>
                  But privacy and security are different problems. A private AI system can still be vulnerable to network attacks, insider threats, model poisoning, prompt injection, and data exfiltration.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module shows you how to harden your private AI deployment against real threats. By the end, you'll have a practical security checklist.
                </p>
              </div>
            </div>

            {/* The Threat Model */}
            <h2>Understanding Your Threat Model</h2>
            <p>
              Before you can secure your AI, you need to know what you're securing against. Different organizations face different threats:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <ShieldIcon />
                  <div>
                    <h4 className="font-bold text-id8-orange">External Attackers</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      Threat actors trying to breach your network, steal models, or extract training data
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-2 italic">
                      Common vectors: Network intrusion, API exploitation, model theft
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <ShieldIcon />
                  <div>
                    <h4 className="font-bold text-id8-orange">Insider Threats</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      Employees or contractors with legitimate access who misuse or exfiltrate data
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-2 italic">
                      Common vectors: Data extraction, unauthorized model access, credential abuse
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <ShieldIcon />
                  <div>
                    <h4 className="font-bold text-id8-orange">Model Poisoning</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      Corrupted training data or fine-tuning that introduces backdoors or bias
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-2 italic">
                      Common vectors: Supply chain attacks, malicious datasets, compromised updates
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <ShieldIcon />
                  <div>
                    <h4 className="font-bold text-id8-orange">Prompt Injection</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      Malicious inputs designed to bypass guardrails or extract sensitive information
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-2 italic">
                      Common vectors: Crafted prompts, embedded instructions, context manipulation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p>
              <strong>Critical insight:</strong> Most organizations focus exclusively on external threats while ignoring insider risks and model-level vulnerabilities. A comprehensive security posture addresses all four threat categories.
            </p>

            {/* The Security Layers */}
            <h2>The Five Security Layers</h2>
            <p>
              Effective AI security follows a defense-in-depth approach. Each layer provides redundant protection:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Layer</th>
                    <th className="text-left py-3 px-4">What It Protects</th>
                    <th className="text-left py-3 px-4">Implementation</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">1. Network</td>
                    <td className="py-3 px-4">Prevents unauthorized access to AI infrastructure</td>
                    <td className="py-3 px-4">Firewalls, VPNs, network segmentation, zero-trust architecture</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">2. Access Control</td>
                    <td className="py-3 px-4">Ensures only authorized users can interact with models</td>
                    <td className="py-3 px-4">RBAC, MFA, SSO integration, session management</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">3. Input Validation</td>
                    <td className="py-3 px-4">Blocks malicious prompts and injection attacks</td>
                    <td className="py-3 px-4">Prompt filtering, sanitization, rate limiting, content inspection</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">4. Model Protection</td>
                    <td className="py-3 px-4">Prevents model theft and tampering</td>
                    <td className="py-3 px-4">Encryption at rest, integrity checking, model versioning, watermarking</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">5. Monitoring</td>
                    <td className="py-3 px-4">Detects anomalies and security events in real-time</td>
                    <td className="py-3 px-4">Audit logs, SIEM integration, behavioral analytics, alerting</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Network Security */}
            <h2>Layer 1: Network Security</h2>
            <p>
              Your AI infrastructure should be network-isolated and accessible only through controlled entry points:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h3 className="text-lg font-bold mb-4">Network Security Checklist</h3>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">
                    <strong>AI servers on isolated VLAN:</strong> Separate network segment from general corporate infrastructure
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">
                    <strong>Firewall rules restrict ingress:</strong> Only approved IPs and ports can reach AI endpoints
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">
                    <strong>VPN required for remote access:</strong> No direct internet exposure of AI APIs
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">
                    <strong>Internal DNS only:</strong> AI services not resolvable from public DNS
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">
                    <strong>Network traffic encrypted:</strong> TLS 1.3 for all API communication
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm">
                    <strong>Egress filtering enabled:</strong> AI servers can't initiate arbitrary outbound connections
                  </span>
                </label>
              </div>
            </div>

            {/* Access Control */}
            <h2>Layer 2: Access Control</h2>
            <p>
              Implement the principle of least privilege. Users should have only the access they need, when they need it:
            </p>

            <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Role-Based Access (RBAC)</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>- <strong>Viewer:</strong> Read-only access to model outputs</li>
                  <li>- <strong>User:</strong> Can submit prompts and view responses</li>
                  <li>- <strong>Developer:</strong> Can fine-tune and deploy models</li>
                  <li>- <strong>Admin:</strong> Full system access including logs</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Authentication Controls</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>- <strong>MFA required:</strong> Mandatory for all users</li>
                  <li>- <strong>SSO integration:</strong> Use existing identity provider</li>
                  <li>- <strong>Session timeout:</strong> Auto-logout after inactivity</li>
                  <li>- <strong>API keys rotated:</strong> 90-day maximum lifetime</li>
                </ul>
              </div>
            </div>

            <p>
              <strong>Implementation tip:</strong> Integrate with your existing identity provider (Azure AD, Okta, etc.) rather than building custom authentication. This ensures consistent security policies across your organization.
            </p>

            {/* Input Validation */}
            <h2>Layer 3: Input Validation</h2>
            <p>
              Prompt injection is the most common attack vector against AI systems. Validate and sanitize all inputs:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Attack Type</th>
                    <th className="text-left py-3 px-4">How It Works</th>
                    <th className="text-left py-3 px-4">Defense</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Direct Injection</td>
                    <td className="py-3 px-4">"Ignore previous instructions and..."</td>
                    <td className="py-3 px-4">Prompt filtering, system message isolation</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Indirect Injection</td>
                    <td className="py-3 px-4">Hidden instructions in retrieved documents</td>
                    <td className="py-3 px-4">Document sanitization, source validation</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Context Manipulation</td>
                    <td className="py-3 px-4">Crafted conversation history to bypass guardrails</td>
                    <td className="py-3 px-4">Context sanitization, session isolation</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Data Exfiltration</td>
                    <td className="py-3 px-4">"Summarize all customer data you have access to"</td>
                    <td className="py-3 px-4">Output filtering, data access controls</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm">
                <strong>Real-world example:</strong> A financial services company discovered employees were using prompts like "Create a CSV of all client account balances" to extract data they shouldn't have access to. Their solution: implement output filtering that blocks structured data formats unless explicitly authorized.
              </p>
            </div>

            {/* Model Protection */}
            <h2>Layer 4: Model Protection</h2>
            <p>
              Your trained models are valuable intellectual property. Protect them from theft and tampering:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Encryption at Rest</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Model files encrypted using AES-256. Encryption keys stored in hardware security module (HSM) or key management service, separate from model storage.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Integrity Verification</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Cryptographic hashes (SHA-256) computed for all model files. Before loading, verify hash matches expected value. Detects tampering or corruption.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Version Control</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  All model changes tracked in version control system. Immutable audit trail of who modified what and when. Ability to roll back to known-good versions.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Model Watermarking</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Embed invisible fingerprints in model outputs. If your model is stolen and used elsewhere, watermarks prove ownership and enable detection.
                </p>
              </div>
            </div>

            {/* Monitoring */}
            <h2>Layer 5: Monitoring and Detection</h2>
            <p>
              Security is not set-and-forget. Continuous monitoring detects threats in real-time:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h3 className="text-lg font-bold mb-4">Essential Monitoring Capabilities</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-sm mb-1">Audit Logging</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong>Log every:</strong> User authentication, model query, configuration change, access denial<br />
                    <strong>Include:</strong> Timestamp, user ID, IP address, action taken, outcome<br />
                    <strong>Retention:</strong> Minimum 12 months for compliance
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-sm mb-1">Anomaly Detection</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong>Alert on:</strong> Unusual query patterns, off-hours access, bulk data requests, failed auth attempts<br />
                    <strong>Baseline:</strong> Establish normal usage patterns over 30 days<br />
                    <strong>Response:</strong> Automated threat response or human investigation
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-sm mb-1">Performance Metrics</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong>Track:</strong> Query volume, response times, error rates, resource utilization<br />
                    <strong>Purpose:</strong> Detect DoS attacks or resource exhaustion attempts<br />
                    <strong>Integration:</strong> Feed into existing infrastructure monitoring
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-sm mb-1">Security Information & Event Management (SIEM)</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong>Integrate AI logs with:</strong> Splunk, Datadog, ELK Stack, Azure Sentinel<br />
                    <strong>Correlation:</strong> Connect AI events with network, identity, and application logs<br />
                    <strong>Benefit:</strong> Holistic security visibility across entire infrastructure
                  </p>
                </div>
              </div>
            </div>

            {/* Common Vulnerabilities */}
            <h2>Five Common Vulnerabilities</h2>
            <p>
              Even well-intentioned deployments often miss these critical security issues:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Vulnerability #1</p>
                <p className="font-bold">Default Credentials</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Many AI platforms ship with default admin passwords. If not changed immediately, attackers can gain full system access.
                </p>
                <p className="text-xs text-green-400 mt-2">Fix: Force password change on first login. No default credentials allowed in production.</p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Vulnerability #2</p>
                <p className="font-bold">Unrestricted API Access</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  API endpoints exposed without rate limiting allow attackers to overwhelm your system or extract large amounts of data.
                </p>
                <p className="text-xs text-green-400 mt-2">Fix: Implement per-user rate limits. Monitor for bulk query patterns.</p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Vulnerability #3</p>
                <p className="font-bold">Unencrypted Model Storage</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Model files stored as plaintext on disk can be copied by anyone with filesystem access — including compromised service accounts.
                </p>
                <p className="text-xs text-green-400 mt-2">Fix: Encrypt all model files at rest. Use separate key management system.</p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Vulnerability #4</p>
                <p className="font-bold">Missing Audit Trails</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  Without comprehensive logging, you can't detect breaches, prove compliance, or investigate incidents.
                </p>
                <p className="text-xs text-green-400 mt-2">Fix: Log everything. Immutable audit trail with tamper detection.</p>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Vulnerability #5</p>
                <p className="font-bold">Overprivileged Service Accounts</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">
                  AI services running with admin privileges create massive blast radius if compromised. Attackers gain full system access.
                </p>
                <p className="text-xs text-green-400 mt-2">Fix: Principle of least privilege. Each service gets only necessary permissions.</p>
              </div>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Security Checklist</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 30 minutes<br />
                <strong>You'll need:</strong> Access to your AI infrastructure documentation
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Assess Current State (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Review your AI deployment against each of the five security layers. Mark each as: ✅ Implemented, ⚠️ Partial, ❌ Missing
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Identify Threat Model (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Which threats are most relevant to your organization? Rank them: External attackers, Insider threats, Model poisoning, Prompt injection
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Prioritize Gaps (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      List all missing or partial controls. Sort by: Critical (fix now), High (fix this quarter), Medium (fix this year)
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Create Remediation Plan (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      For each Critical item: Define the fix, assign an owner, set a deadline. Share with security team.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A security checklist that documents current state, identifies gaps, and provides a remediation roadmap. This becomes your baseline for continuous security improvement.
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
                  "Privacy and security are different. Private AI still requires comprehensive security controls.",
                  "Defense-in-depth: Five layers (Network, Access, Input Validation, Model Protection, Monitoring) provide redundant security.",
                  "Prompt injection is the most common attack vector. Input validation and output filtering are essential.",
                  "Monitoring detects threats in real-time. Without audit logs and anomaly detection, you're operating blind.",
                  "Most breaches exploit basics: default credentials, missing encryption, overprivileged accounts. Fix fundamentals first.",
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
              Security is an ongoing process, not a one-time checklist. In the next module, we'll tackle compliance frameworks — how to prove your security controls meet regulatory requirements.
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
                href="/academy/private-ai/module-4"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: Integration Playbook
              </Link>
              <Link
                href="/academy/private-ai/module-6"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Compliance Frameworks
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
