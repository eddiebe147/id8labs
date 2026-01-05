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

const ShieldIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

export default function Module4Page() {
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
              Model Governance
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "Which version of the model is in production? Who approved it? When was it last evaluated?"
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
                The Reality Check
              </h2>
              <h3 className="text-2xl font-bold mb-4">The Governance Gap</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Your model is making 100,000 decisions per day. Regulators want to know how it works. Legal wants audit trails. Finance wants to understand the risk. The data scientist who built it left six months ago.
                </p>
                <p>
                  Without governance, you can't answer basic questions: What data was used? What version is running? When was it last validated? Who approved deployment? This isn't bureaucracy — it's risk management.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module teaches you to build governance systems that make AI trustworthy, auditable, and reproducible — without drowning in paperwork.
                </p>
              </div>
            </div>

            {/* What is Model Governance */}
            <h2>What Model Governance Actually Means</h2>
            <p>
              Governance is the system that answers three questions about every model in production:
            </p>

            <div className="not-prose my-8 grid md:grid-cols-3 gap-4">
              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 mb-3">
                  <ShieldIcon />
                </div>
                <h4 className="font-bold text-id8-orange mb-2">LINEAGE</h4>
                <p className="text-sm text-[var(--text-secondary)]">Where did this model come from? What data trained it? What code produced it?</p>
              </div>
              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-400 mb-3">
                  <ShieldIcon />
                </div>
                <h4 className="font-bold text-id8-orange mb-2">ACCOUNTABILITY</h4>
                <p className="text-sm text-[var(--text-secondary)]">Who owns it? Who approved it? Who is responsible when it fails?</p>
              </div>
              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 mb-3">
                  <ShieldIcon />
                </div>
                <h4 className="font-bold text-id8-orange mb-2">REPRODUCIBILITY</h4>
                <p className="text-sm text-[var(--text-secondary)]">Can we recreate this exact model? Can we understand why it made a specific decision?</p>
              </div>
            </div>

            {/* The Model Lifecycle */}
            <h2>Framework: The Model Governance Lifecycle</h2>
            <p>
              Governance isn't a one-time checkbox. It's embedded throughout the model lifecycle:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">1</span>
                  <div>
                    <h4 className="font-bold text-id8-orange">Development Phase</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Track experiments, log hyperparameters, version datasets, document assumptions</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-[var(--bg-primary)] rounded">Experiment tracking</span>
                      <span className="text-xs px-2 py-1 bg-[var(--bg-primary)] rounded">Data versioning</span>
                      <span className="text-xs px-2 py-1 bg-[var(--bg-primary)] rounded">Code review</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold">2</span>
                  <div>
                    <h4 className="font-bold text-id8-orange">Validation Phase</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Test on held-out data, validate fairness, assess risk, document limitations</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-[var(--bg-primary)] rounded">Model cards</span>
                      <span className="text-xs px-2 py-1 bg-[var(--bg-primary)] rounded">Bias testing</span>
                      <span className="text-xs px-2 py-1 bg-[var(--bg-primary)] rounded">Risk assessment</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold">3</span>
                  <div>
                    <h4 className="font-bold text-id8-orange">Approval Phase</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Stakeholder sign-off, compliance review, deployment authorization</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-[var(--bg-primary)] rounded">Approval workflow</span>
                      <span className="text-xs px-2 py-1 bg-[var(--bg-primary)] rounded">Compliance checklist</span>
                      <span className="text-xs px-2 py-1 bg-[var(--bg-primary)] rounded">Audit trail</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">4</span>
                  <div>
                    <h4 className="font-bold text-id8-orange">Production Phase</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Monitor performance, track drift, maintain audit logs, plan retraining</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-[var(--bg-primary)] rounded">Monitoring</span>
                      <span className="text-xs px-2 py-1 bg-[var(--bg-primary)] rounded">Drift detection</span>
                      <span className="text-xs px-2 py-1 bg-[var(--bg-primary)] rounded">Incident logging</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold">5</span>
                  <div>
                    <h4 className="font-bold text-id8-orange">Retirement Phase</h4>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Archive model artifacts, document lessons learned, transition to replacement</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-[var(--bg-primary)] rounded">Archival</span>
                      <span className="text-xs px-2 py-1 bg-[var(--bg-primary)] rounded">Deprecation notice</span>
                      <span className="text-xs px-2 py-1 bg-[var(--bg-primary)] rounded">Retrospective</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Version Control for Models */}
            <h2>Version Control for Models</h2>
            <p>
              Code versioning is solved (git). Model versioning is still messy. Here's what you need to version and how:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Artifact</th>
                    <th className="text-left py-3 px-4">Why Version It</th>
                    <th className="text-left py-3 px-4 text-id8-orange">Tools</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Code</td>
                    <td className="py-3 px-4">Reproducibility, rollback, collaboration</td>
                    <td className="py-3 px-4">Git, GitHub, GitLab</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Data</td>
                    <td className="py-3 px-4">Training reproducibility, audit trails</td>
                    <td className="py-3 px-4">DVC, Delta Lake, LakeFS</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Model Weights</td>
                    <td className="py-3 px-4">Rollback, A/B testing, comparison</td>
                    <td className="py-3 px-4">MLflow, W&B, Model Registry</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Hyperparameters</td>
                    <td className="py-3 px-4">Experiment tracking, reproducibility</td>
                    <td className="py-3 px-4">MLflow, W&B, Neptune</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold">Environment</td>
                    <td className="py-3 px-4">Dependency reproducibility</td>
                    <td className="py-3 px-4">Docker, Conda, Poetry</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">Configuration</td>
                    <td className="py-3 px-4">Deployment settings, feature flags</td>
                    <td className="py-3 px-4">Git + config management</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="not-prose my-8 p-5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm font-mono text-blue-400 mb-2">The Reproducibility Test</p>
              <p className="text-sm text-[var(--text-primary)]">
                Can a new team member recreate the exact model from artifacts alone? If not, your versioning is incomplete. Run this test before every production deployment.
              </p>
            </div>

            {/* Model Cards */}
            <h2>Model Cards: Documentation That Actually Gets Used</h2>
            <p>
              A model card is a standardized document that describes a model's capabilities, limitations, and intended use. Here's a practical template:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h3 className="text-lg font-bold mb-4">Model Card Template</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-mono text-xs text-id8-orange mb-1">Basic Information</p>
                  <ul className="text-[var(--text-secondary)] space-y-1">
                    <li>• Model name and version</li>
                    <li>• Owner and maintainer</li>
                    <li>• Date deployed</li>
                    <li>• Model type and architecture</li>
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-xs text-id8-orange mb-1">Intended Use</p>
                  <ul className="text-[var(--text-secondary)] space-y-1">
                    <li>• Primary use cases</li>
                    <li>• Users and stakeholders</li>
                    <li>• Out-of-scope uses (what NOT to use it for)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-xs text-id8-orange mb-1">Training Data</p>
                  <ul className="text-[var(--text-secondary)] space-y-1">
                    <li>• Data sources and provenance</li>
                    <li>• Date range of training data</li>
                    <li>• Data preprocessing steps</li>
                    <li>• Known data limitations or biases</li>
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-xs text-id8-orange mb-1">Performance</p>
                  <ul className="text-[var(--text-secondary)] space-y-1">
                    <li>• Key metrics with confidence intervals</li>
                    <li>• Performance across demographic groups</li>
                    <li>• Edge cases and failure modes</li>
                    <li>• Latency and resource requirements</li>
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-xs text-id8-orange mb-1">Ethical Considerations</p>
                  <ul className="text-[var(--text-secondary)] space-y-1">
                    <li>• Potential for harm</li>
                    <li>• Fairness analysis results</li>
                    <li>• Mitigation strategies</li>
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-xs text-id8-orange mb-1">Operational</p>
                  <ul className="text-[var(--text-secondary)] space-y-1">
                    <li>• Monitoring thresholds</li>
                    <li>• Retraining schedule</li>
                    <li>• Escalation procedures</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Audit Trails */}
            <h2>Building Audit Trails</h2>
            <p>
              When regulators, legal, or executives ask "why did the model make this decision?", you need to be able to answer. Here's what to log:
            </p>

            <div className="not-prose my-8 space-y-4">
              {[
                {
                  title: "Prediction Logs",
                  desc: "Every prediction: input features, output, confidence, timestamp, model version",
                  retention: "90 days minimum, depends on regulation",
                  note: "Enable explanation reconstruction for high-stakes decisions"
                },
                {
                  title: "Model Change Logs",
                  desc: "Every model update: who, when, why, what changed, approval chain",
                  retention: "7 years minimum",
                  note: "Immutable log, append-only, cryptographic integrity"
                },
                {
                  title: "Data Access Logs",
                  desc: "Who accessed what data, when, for what purpose",
                  retention: "Per data policy, often 7 years",
                  note: "Required for GDPR, CCPA, industry regulations"
                },
                {
                  title: "Incident Logs",
                  desc: "Every failure, drift alert, rollback, and remediation action",
                  retention: "Permanent for major incidents",
                  note: "Postmortem documentation, root cause analysis"
                },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <h4 className="font-bold text-id8-orange mb-2">{item.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">{item.desc}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-yellow-500/20 rounded">Retention: {item.retention}</span>
                  </div>
                  <p className="text-xs text-[var(--text-tertiary)] mt-2 italic">{item.note}</p>
                </div>
              ))}
            </div>

            {/* Risk Classification */}
            <h2>Framework: Model Risk Classification</h2>
            <p>
              Not all models need the same level of governance. Classify models by risk and apply proportionate controls:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4">Risk Level</th>
                    <th className="text-left py-3 px-4">Criteria</th>
                    <th className="text-left py-3 px-4 text-green-400">Governance Required</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold text-green-400">Low Risk</td>
                    <td className="py-3 px-4">Internal tools, recommendations, no financial/legal impact</td>
                    <td className="py-3 px-4">Basic versioning, simple model card, quarterly review</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold text-yellow-400">Medium Risk</td>
                    <td className="py-3 px-4">Customer-facing, moderate financial impact, no protected classes</td>
                    <td className="py-3 px-4">Full versioning, detailed model card, monthly monitoring, approval workflow</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-bold text-orange-400">High Risk</td>
                    <td className="py-3 px-4">Significant financial impact, affects employment/credit/housing</td>
                    <td className="py-3 px-4">All above + fairness testing, external audit, explainability, legal review</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-red-400">Critical Risk</td>
                    <td className="py-3 px-4">Life safety, legal liability, regulatory mandate</td>
                    <td className="py-3 px-4">All above + real-time monitoring, human-in-the-loop, regulator approval</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Common Governance Mistakes */}
            <h2>Five Governance Mistakes That Invite Disaster</h2>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #1</p>
                <p className="font-bold">"We'll document it later"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: Later never comes. The person who built it leaves. Knowledge is lost. Document as you build, not after.</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #2</p>
                <p className="font-bold">"The data scientist owns governance"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: Governance is a team sport. Legal, compliance, business, and engineering all have roles. DS alone can't assess legal risk or business impact.</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #3</p>
                <p className="font-bold">"One governance process for all models"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: A content recommendation model doesn't need the same rigor as a loan approval model. Risk-based classification prevents over- and under-governance.</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #4</p>
                <p className="font-bold">"Governance is a gate, not a process"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: A one-time approval before deployment isn't governance. Continuous monitoring, periodic review, and lifecycle management are essential.</p>
              </div>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-sm text-red-400 mb-1">Mistake #5</p>
                <p className="font-bold">"We don't have compliance requirements"</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2">Reality: Even without formal regulation, you have liability. When a model fails and causes harm, you'll wish you had governance. Build it before you need it.</p>
              </div>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-6 bg-id8-orange/10 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Model Governance Framework</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 30 minutes<br />
                <strong>You'll need:</strong> List of your current or planned models in production
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Classify your models by risk (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">List every model in production or planned. Use the risk classification framework to assign Low, Medium, High, or Critical.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Assess current governance (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For each model, note: Is there versioning? A model card? An owner? Monitoring? Audit trail? Identify gaps.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Define governance requirements (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Map each risk level to specific requirements. What artifacts? What approvals? What monitoring? Be concrete.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Create your first model card (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Pick your highest-risk model. Draft a model card using the template. This becomes your standard.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong>Deliverable:</strong> A governance framework document with model inventory, risk classifications, governance requirements by risk level, and one complete model card as a template.
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
                  "Governance answers three questions: Where did this model come from? Who is accountable? Can we reproduce it?",
                  "Version everything: code, data, model weights, hyperparameters, environment, and configuration.",
                  "Model cards document capabilities, limitations, and intended use. They're not bureaucracy — they're risk management.",
                  "Classify models by risk. Low-risk models don't need the same governance as high-risk ones.",
                  "Build governance from day one. Retrofitting is expensive and often triggered by an incident you wish you'd prevented.",
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
              Good governance makes AI trustworthy. It enables faster iteration (because you can rollback), better debugging (because you know what changed), and reduced risk (because you can answer hard questions). In the next module, we'll tackle the journey from pilot to production — where governance becomes essential.
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
                href="/academy/ai-at-scale/module-3"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: Data Architecture for AI
              </Link>
              <Link
                href="/academy/ai-at-scale/module-5"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Scaling from Pilot to Production
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
