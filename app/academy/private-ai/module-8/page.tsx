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

const RefreshIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 4v6h-6M1 20v-6h6"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </svg>
)

const ShieldIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const AlertIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
)

export default function Module8Page() {
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
                Module 8
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                45 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Maintenance & Updates
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "Our private AI is live. Now what? How do we keep it current, secure, and running smoothly as models and threats evolve?"
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
                The Maintenance Reality
              </h2>
              <h3 className="text-2xl font-bold mb-4">Deployment Is Day One, Not the Finish Line</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Launching your private AI is an achievement. But the real work starts now. Models become outdated. New vulnerabilities are discovered. Business requirements change. Without a maintenance strategy, your system will degrade.
                </p>
                <p>
                  Unlike cloud AI where the vendor handles updates, private AI puts you in control — and responsible for staying current.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module covers the ongoing work of keeping private AI healthy: model updates, security patches, monitoring, and building processes that scale with your deployment.
                </p>
              </div>
            </div>

            {/* The Maintenance Lifecycle */}
            <h2>The Maintenance Lifecycle</h2>
            <p>
              Private AI maintenance follows a continuous cycle. Each phase feeds into the next:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <RefreshIcon />
                  <div>
                    <h4 className="font-bold text-id8-orange">1. Monitor</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      Track performance, quality, security, and usage patterns. Detect problems before users notice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertIcon />
                  <div>
                    <h4 className="font-bold text-id8-orange">2. Assess</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      Evaluate new model releases, security advisories, and performance trends. Prioritize what needs attention.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <CalendarIcon />
                  <div>
                    <h4 className="font-bold text-id8-orange">3. Plan</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      Schedule updates, test in staging, prepare rollback procedures. Never update production without a plan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-start gap-3">
                  <ShieldIcon />
                  <div>
                    <h4 className="font-bold text-id8-orange">4. Execute</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">
                      Apply updates with minimal disruption. Validate changes, monitor for regressions, be ready to rollback.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p>
              The cycle repeats continuously. Organizations that treat maintenance as an afterthought eventually face emergencies; those with a process handle changes smoothly.
            </p>

            {/* Model Updates */}
            <h2>Model Updates: When and Why</h2>
            <p>
              New model versions release constantly. Not every update requires action. Here's how to evaluate:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Update Type</th>
                    <th className="text-left py-3 px-4">Urgency</th>
                    <th className="text-left py-3 px-4">When to Apply</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Security patch</td>
                    <td className="py-3 px-4 text-red-400">Critical</td>
                    <td className="py-3 px-4">Immediately after testing. Don't wait for next cycle.</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Bug fix</td>
                    <td className="py-3 px-4 text-yellow-400">High</td>
                    <td className="py-3 px-4">If bug affects your use case, prioritize. Otherwise, batch with other updates.</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Performance improvement</td>
                    <td className="py-3 px-4 text-blue-400">Medium</td>
                    <td className="py-3 px-4">Test in staging, compare metrics, update during maintenance window.</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">New capabilities</td>
                    <td className="py-3 px-4 text-green-400">Low</td>
                    <td className="py-3 px-4">Only if you need the new features. New != better for your use case.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Major version</td>
                    <td className="py-3 px-4 text-purple-400">Varies</td>
                    <td className="py-3 px-4">Significant testing required. May need prompt rewrites. Plan a project, not a patch.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm">
                <strong>Warning:</strong> Model updates can change behavior in subtle ways. A "better" model might not be better for your specific prompts. Always test with your actual use cases before production deployment.
              </p>
            </div>

            {/* Model Update Process */}
            <h3>Model Update Process</h3>
            <p>
              Follow this process for every model update:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h4 className="font-bold mb-4">Model Update Checklist</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <p className="font-bold">Read the release notes</p>
                    <p className="text-sm text-[var(--text-secondary)]">Understand what changed. Breaking changes? New parameters? Deprecated features?</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <p className="font-bold">Deploy to staging environment</p>
                    <p className="text-sm text-[var(--text-secondary)]">Never test in production. Use identical config to production.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center text-sm font-bold">3</span>
                  <div>
                    <p className="font-bold">Run evaluation suite</p>
                    <p className="text-sm text-[var(--text-secondary)]">Test with your prompts, your data, your expected outputs. Automated tests catch regressions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center text-sm font-bold">4</span>
                  <div>
                    <p className="font-bold">Compare performance metrics</p>
                    <p className="text-sm text-[var(--text-secondary)]">TTFT, TPS, memory usage. New version should meet or exceed baseline.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center text-sm font-bold">5</span>
                  <div>
                    <p className="font-bold">Manual spot-check</p>
                    <p className="text-sm text-[var(--text-secondary)]">Human review of critical prompts. Automated tests miss nuance.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center text-sm font-bold">6</span>
                  <div>
                    <p className="font-bold">Schedule production deployment</p>
                    <p className="text-sm text-[var(--text-secondary)]">During low-traffic window. Have rollback ready. Monitor closely for 24-48 hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center text-sm font-bold">7</span>
                  <div>
                    <p className="font-bold">Document the change</p>
                    <p className="text-sm text-[var(--text-secondary)]">Record what changed, why, any issues encountered. Future you will thank you.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Patching */}
            <h2>Security: Staying Protected</h2>
            <p>
              Private AI security isn't a one-time setup. Threats evolve. New vulnerabilities are discovered. Your security posture must evolve too:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Monitor Security Feeds</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>Subscribe to CVE feeds for your dependencies (NVIDIA, PyTorch, etc.)</li>
                  <li>Follow model provider security advisories</li>
                  <li>Track inference engine changelogs (vLLM, TensorRT-LLM)</li>
                  <li>Join relevant security mailing lists</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Regular Security Reviews</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li><strong>Weekly:</strong> Review access logs for anomalies</li>
                  <li><strong>Monthly:</strong> Audit API key usage and permissions</li>
                  <li><strong>Quarterly:</strong> Penetration testing or vulnerability scan</li>
                  <li><strong>Annually:</strong> Comprehensive security audit</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold text-id8-orange mb-2">Prompt Injection Defense Updates</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>New attack techniques emerge constantly</li>
                  <li>Update input filters based on threat intelligence</li>
                  <li>Test defenses against latest known attacks</li>
                  <li>Maintain adversarial test suite</li>
                </ul>
              </div>
            </div>

            {/* Dependency Management */}
            <h2>Dependency Management</h2>
            <p>
              Your AI doesn't run in isolation. It depends on frameworks, libraries, and infrastructure. Each needs maintenance:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Component</th>
                    <th className="text-left py-3 px-4">Update Frequency</th>
                    <th className="text-left py-3 px-4">Key Considerations</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">NVIDIA drivers/CUDA</td>
                    <td className="py-3 px-4">Quarterly</td>
                    <td className="py-3 px-4">Test with inference engine. Driver issues can cause silent failures.</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Inference engine</td>
                    <td className="py-3 px-4">Monthly check, quarterly update</td>
                    <td className="py-3 px-4">Performance improvements often significant. API may change.</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Python packages</td>
                    <td className="py-3 px-4">Monthly</td>
                    <td className="py-3 px-4">Pin versions. Use lockfiles. Security patches are priority.</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Container base images</td>
                    <td className="py-3 px-4">Monthly</td>
                    <td className="py-3 px-4">Security vulnerabilities in OS-level packages. Rebuild regularly.</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Vector database</td>
                    <td className="py-3 px-4">Quarterly</td>
                    <td className="py-3 px-4">Index format changes may require reindexing. Plan for downtime.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Operating system</td>
                    <td className="py-3 px-4">Monthly patches, annual major</td>
                    <td className="py-3 px-4">Security patches critical. Major versions need careful planning.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm">
                <strong>Pro tip:</strong> Use Dependabot, Renovate, or similar tools to automate dependency update PRs. Review and test before merging, but automation ensures you don't miss critical updates.
              </p>
            </div>

            {/* Monitoring and Alerting */}
            <h2>Monitoring: What to Watch</h2>
            <p>
              Continuous monitoring catches problems early. Set up alerts for these metrics:
            </p>

            <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Performance Metrics</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>Response latency (p50, p95, p99)</li>
                  <li>Throughput (requests/second)</li>
                  <li>Queue depth / wait time</li>
                  <li>GPU utilization and memory</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Quality Metrics</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>Output quality scores (if automated)</li>
                  <li>User feedback / ratings</li>
                  <li>Error rates by type</li>
                  <li>Regeneration / retry rates</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Security Metrics</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>Failed authentication attempts</li>
                  <li>Unusual access patterns</li>
                  <li>Blocked injection attempts</li>
                  <li>Audit log anomalies</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Infrastructure Metrics</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>Disk usage / growth rate</li>
                  <li>Network bandwidth</li>
                  <li>Container/process health</li>
                  <li>Backup success/failure</li>
                </ul>
              </div>
            </div>

            <h3>Alert Thresholds</h3>
            <p>
              Set alerts at two levels:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <h4 className="font-bold text-yellow-400 mb-2">Warning (Investigate)</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>Latency p95 &gt; 2x baseline</li>
                  <li>Error rate &gt; 1%</li>
                  <li>GPU utilization sustained &gt;90%</li>
                  <li>Disk usage &gt;70%</li>
                </ul>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h4 className="font-bold text-red-400 mb-2">Critical (Immediate Action)</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>Latency p95 &gt; 5x baseline</li>
                  <li>Error rate &gt; 5%</li>
                  <li>GPU OOM errors</li>
                  <li>Disk usage &gt;90%</li>
                  <li>Service unreachable</li>
                </ul>
              </div>
            </div>

            {/* Backup and Recovery */}
            <h2>Backup and Recovery</h2>
            <p>
              What do you back up? Everything you can't easily recreate:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Component</th>
                    <th className="text-left py-3 px-4">Backup Frequency</th>
                    <th className="text-left py-3 px-4">Recovery Priority</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Model weights (fine-tuned)</td>
                    <td className="py-3 px-4">After each training run</td>
                    <td className="py-3 px-4">Critical — training is expensive</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Training data</td>
                    <td className="py-3 px-4">Daily incremental</td>
                    <td className="py-3 px-4">Critical — may be irreplaceable</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Vector store indexes</td>
                    <td className="py-3 px-4">Daily</td>
                    <td className="py-3 px-4">High — rebuilding takes time</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Configuration files</td>
                    <td className="py-3 px-4">On every change (git)</td>
                    <td className="py-3 px-4">High — critical for recovery</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Prompts / templates</td>
                    <td className="py-3 px-4">On every change (git)</td>
                    <td className="py-3 px-4">High — institutional knowledge</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Audit logs</td>
                    <td className="py-3 px-4">Continuous replication</td>
                    <td className="py-3 px-4">Medium — compliance requirement</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-8 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
              <h4 className="font-bold mb-2">Recovery Testing</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                Backups are useless if you can't restore from them. Test recovery quarterly:
              </p>
              <ul className="text-sm text-[var(--text-secondary)] mt-2 space-y-1">
                <li>Can you spin up the system from scratch using backups?</li>
                <li>How long does full recovery take?</li>
                <li>Are there missing pieces only discovered during recovery?</li>
                <li>Document the recovery procedure. Test it with someone who didn't write it.</li>
              </ul>
            </div>

            {/* Documentation Maintenance */}
            <h2>Documentation: The Forgotten Maintenance</h2>
            <p>
              Documentation rots faster than code. Keep it current:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">What to Document</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li><strong>Architecture:</strong> How components connect, data flows</li>
                  <li><strong>Runbooks:</strong> Step-by-step for common operations</li>
                  <li><strong>Troubleshooting:</strong> Known issues and solutions</li>
                  <li><strong>Decision log:</strong> Why things are configured this way</li>
                  <li><strong>Contacts:</strong> Who knows what, escalation paths</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">When to Update</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>Every configuration change</li>
                  <li>After every incident (add to troubleshooting)</li>
                  <li>When onboarding new team members (they find gaps)</li>
                  <li>Quarterly review for accuracy</li>
                </ul>
              </div>
            </div>

            {/* Maintenance Schedule Template */}
            <h2>Maintenance Schedule Template</h2>
            <p>
              Use this schedule as a starting point for your maintenance cadence:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Frequency</th>
                    <th className="text-left py-3 px-4">Tasks</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Daily</td>
                    <td className="py-3 px-4">
                      Review alerts and metrics dashboard<br />
                      Check backup status<br />
                      Scan security feeds for critical advisories
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Weekly</td>
                    <td className="py-3 px-4">
                      Review access logs for anomalies<br />
                      Check disk usage trends<br />
                      Review user feedback / quality reports<br />
                      Assess new model releases for relevance
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Monthly</td>
                    <td className="py-3 px-4">
                      Apply security patches<br />
                      Update Python dependencies<br />
                      Review and update documentation<br />
                      Capacity planning review<br />
                      Audit API key permissions
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Quarterly</td>
                    <td className="py-3 px-4">
                      Evaluate model updates for deployment<br />
                      Update NVIDIA drivers/CUDA<br />
                      Security scan / penetration test<br />
                      Recovery test from backups<br />
                      Review and update prompts based on feedback
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Annually</td>
                    <td className="py-3 px-4">
                      Comprehensive security audit<br />
                      Major dependency updates (OS, frameworks)<br />
                      Architecture review<br />
                      Compliance re-certification<br />
                      Cost optimization review
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-6 bg-id8-orange/10 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Maintenance Runbook</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 25 minutes<br />
                <strong>You'll need:</strong> Your deployment documentation, calendar access
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Inventory Your Components (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      List every component: model, inference engine, vector DB, dependencies, infrastructure. Note current versions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Define Update Criteria (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      For each component: What triggers an update? Security only? All patches? Document thresholds.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Schedule Recurring Tasks (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Add calendar reminders for daily, weekly, monthly, quarterly tasks. Assign owners. Make it real.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Create First Runbook (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Write step-by-step procedure for one common task (e.g., "Apply security patch to inference engine"). Use as template for others.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A maintenance runbook with component inventory, update criteria, scheduled tasks, and at least one detailed procedure. This becomes your operational foundation.
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
                  "Maintenance is continuous, not occasional. Build processes that make it routine, not reactive.",
                  "Not every update needs immediate action. Prioritize security patches, evaluate features carefully, test everything before production.",
                  "Monitor proactively. Set alerts at warning thresholds so you can investigate before problems become emergencies.",
                  "Test your backups and recovery procedures. Untested backups are hopes, not plans.",
                  "Document as you go. The best time to document is when you're solving the problem. The second best time is now.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-id8-orange flex-shrink-0 mt-0.5"><CheckIcon /></span>
                    <span className="text-[var(--text-primary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Conclusion */}
            <div className="not-prose my-12 p-6 bg-id8-orange/10 border border-id8-orange/30 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Course Complete: Private AI Mastery</h2>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Congratulations. You've completed the Private AI course. You now understand:
                </p>
                <ul className="space-y-2">
                  <li><strong>Module 1:</strong> Why data privacy matters and the case for private AI</li>
                  <li><strong>Module 2:</strong> Deployment options — local, cloud, hybrid, edge</li>
                  <li><strong>Module 3:</strong> Selecting models that respect privacy constraints</li>
                  <li><strong>Module 4:</strong> Data handling protocols that keep sensitive data where it belongs</li>
                  <li><strong>Module 5:</strong> Security hardening against threats</li>
                  <li><strong>Module 6:</strong> Compliance frameworks — GDPR, HIPAA, SOC2</li>
                  <li><strong>Module 7:</strong> Performance optimization without cloud dependency</li>
                  <li><strong>Module 8:</strong> Maintenance and updates for long-term success</li>
                </ul>
                <p className="font-bold text-[var(--text-primary)] mt-6">
                  You have the knowledge to deploy, secure, and maintain private AI. The next step is execution.
                </p>
              </div>
            </div>

            {/* Closing */}
            <p className="italic text-[var(--text-secondary)] border-l-2 border-id8-orange pl-4">
              Private AI isn't about hiding from the cloud — it's about control. Control over your data, your models, your compliance, your costs. You now have the tools to make informed decisions about when private AI makes sense and how to do it well. Go build something remarkable.
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
                href="/academy/private-ai/module-7"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: Performance Optimization
              </Link>
              <Link
                href="/academy/ai-at-scale"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next Course: AI at Scale
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
