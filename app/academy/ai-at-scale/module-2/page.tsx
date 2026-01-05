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

const RefreshIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
  </svg>
)

const GitBranchIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="6" y1="3" x2="6" y2="15"/>
    <circle cx="18" cy="6" r="3"/>
    <circle cx="6" cy="18" r="3"/>
    <path d="M18 9a9 9 0 0 1-9 9"/>
  </svg>
)

const AlertIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/>
  </svg>
)

const ActivityIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
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
                href="/academy/ai-at-scale"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to AI at Scale
              </Link>
            </m.div>

            <m.div variants={fadeUp}>
              <CourseProgress
                currentModule={2}
                totalModules={8}
                courseTitle="AI at Scale"
              />
            </m.div>

            <m.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-sm font-mono mb-6"
            >
              <span>Module 2</span>
              <span className="text-id8-orange/50">•</span>
              <span>~60 minutes</span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              MLOps Fundamentals
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "Models don't fail in development. They fail at 3am when the data pipeline breaks and nobody's watching."
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
              <h3 className="text-2xl font-bold mb-4">Why ML Models Die in Production</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Your data science team built a model that's 95% accurate. Six months later, it's making wrong predictions. The model code didn't change. The data did—slowly, invisibly, until one day customers started complaining.
                </p>
                <p>
                  This is why MLOps exists. Not to make data scientists' lives harder, but to ensure that the models you ship today still work tomorrow. Most organizations can build ML models. Very few can keep them running.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module teaches you the MLOps lifecycle—how to build pipelines that detect problems before users do, retrain automatically when needed, and let you sleep through the night.
                </p>
              </div>
            </div>

            {/* Section 1: What is MLOps */}
            <div className="not-prose mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-id8-orange/20 rounded">
                  <RefreshIcon />
                </div>
                <h2 className="text-2xl font-bold">What MLOps Actually Means</h2>
              </div>

              <div className="space-y-6">
                <p className="text-[var(--text-secondary)]">
                  MLOps is DevOps for machine learning. But ML has unique challenges that traditional DevOps doesn't address: data versioning, model decay, experiment tracking, and the fact that code changes are often less important than data changes.
                </p>

                <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                  <h3 className="text-lg font-bold mb-4">The MLOps Lifecycle</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-id8-orange/20 flex items-center justify-center text-id8-orange font-mono text-sm">1</div>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)]">Data Management</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Version, validate, and monitor your training data. Track lineage from raw sources to processed features.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-id8-orange/20 flex items-center justify-center text-id8-orange font-mono text-sm">2</div>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)]">Experiment Tracking</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Log every model training run with its parameters, metrics, and artifacts. Make experiments reproducible.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-id8-orange/20 flex items-center justify-center text-id8-orange font-mono text-sm">3</div>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)]">Model Training Pipelines</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Automate the full training workflow: data loading, preprocessing, training, evaluation, and artifact storage.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-id8-orange/20 flex items-center justify-center text-id8-orange font-mono text-sm">4</div>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)]">Model Registry</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Store models with metadata, version them, and manage promotion through dev/staging/prod environments.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-id8-orange/20 flex items-center justify-center text-id8-orange font-mono text-sm">5</div>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)]">Deployment & Serving</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Deploy models as APIs, batch jobs, or embedded services. Handle scaling, rollbacks, and A/B testing.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-id8-orange/20 flex items-center justify-center text-id8-orange font-mono text-sm">6</div>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)]">Monitoring & Observability</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Track model performance, detect drift, and trigger alerts when predictions degrade.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-id8-orange/10 border-l-4 border-id8-orange">
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">The key insight:</strong> MLOps is not about tools. It's about treating ML as a continuous process, not a one-time project. The model you ship today is not the model you'll be running in 6 months.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: The 5 Core Pipeline Components */}
            <div className="not-prose mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-id8-orange/20 rounded">
                  <GitBranchIcon />
                </div>
                <h2 className="text-2xl font-bold">The 5 Core Pipeline Components</h2>
              </div>

              <div className="space-y-6">
                <p className="text-[var(--text-secondary)]">
                  Every production ML system needs these five components. Skip one, and you'll be debugging at 3am.
                </p>

                <div className="grid gap-4">
                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-id8-orange">1. Data Pipeline</h3>
                      <span className="px-2 py-1 text-xs font-mono bg-blue-500/20 text-blue-400 rounded">Extract-Transform-Load</span>
                    </div>
                    <p className="text-[var(--text-secondary)] mb-4">
                      Moves data from sources (databases, APIs, files) to your training environment. Handles cleaning, validation, and transformation.
                    </p>
                    <div className="text-sm text-[var(--text-tertiary)]">
                      <strong className="text-[var(--text-primary)]">Tools:</strong> Apache Airflow, Prefect, Dagster, dbt
                    </div>
                    <div className="mt-3 p-3 bg-[var(--bg-primary)] rounded text-sm">
                      <strong className="text-[var(--text-primary)]">Critical capability:</strong> Schema validation. If upstream data changes shape, your pipeline should fail loudly, not silently corrupt your model.
                    </div>
                  </div>

                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-id8-orange">2. Feature Store</h3>
                      <span className="px-2 py-1 text-xs font-mono bg-purple-500/20 text-purple-400 rounded">Feature Management</span>
                    </div>
                    <p className="text-[var(--text-secondary)] mb-4">
                      Centralized repository of features used for training and serving. Ensures training-serving consistency and enables feature reuse.
                    </p>
                    <div className="text-sm text-[var(--text-tertiary)]">
                      <strong className="text-[var(--text-primary)]">Tools:</strong> Feast, Tecton, Databricks Feature Store, AWS SageMaker Feature Store
                    </div>
                    <div className="mt-3 p-3 bg-[var(--bg-primary)] rounded text-sm">
                      <strong className="text-[var(--text-primary)]">Critical capability:</strong> Point-in-time correctness. Training features must reflect what was known at prediction time, not future data.
                    </div>
                  </div>

                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-id8-orange">3. Training Orchestrator</h3>
                      <span className="px-2 py-1 text-xs font-mono bg-green-500/20 text-green-400 rounded">Experiment Management</span>
                    </div>
                    <p className="text-[var(--text-secondary)] mb-4">
                      Manages the training workflow: data prep, model training, hyperparameter tuning, validation, and artifact storage.
                    </p>
                    <div className="text-sm text-[var(--text-tertiary)]">
                      <strong className="text-[var(--text-primary)]">Tools:</strong> MLflow, Kubeflow, Weights & Biases, Neptune
                    </div>
                    <div className="mt-3 p-3 bg-[var(--bg-primary)] rounded text-sm">
                      <strong className="text-[var(--text-primary)]">Critical capability:</strong> Reproducibility. Any experiment should be re-runnable with identical results given the same data snapshot.
                    </div>
                  </div>

                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-id8-orange">4. Model Registry</h3>
                      <span className="px-2 py-1 text-xs font-mono bg-yellow-500/20 text-yellow-400 rounded">Model Versioning</span>
                    </div>
                    <p className="text-[var(--text-secondary)] mb-4">
                      Central repository for trained models. Stores model artifacts, metadata, lineage, and manages promotion between environments.
                    </p>
                    <div className="text-sm text-[var(--text-tertiary)]">
                      <strong className="text-[var(--text-primary)]">Tools:</strong> MLflow Model Registry, Seldon Core, BentoML
                    </div>
                    <div className="mt-3 p-3 bg-[var(--bg-primary)] rounded text-sm">
                      <strong className="text-[var(--text-primary)]">Critical capability:</strong> Rollback. If a new model performs poorly, you need one-click return to the previous version.
                    </div>
                  </div>

                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-id8-orange">5. Serving Infrastructure</h3>
                      <span className="px-2 py-1 text-xs font-mono bg-red-500/20 text-red-400 rounded">Deployment</span>
                    </div>
                    <p className="text-[var(--text-secondary)] mb-4">
                      Exposes models as APIs or batch jobs. Handles autoscaling, load balancing, A/B testing, and canary deployments.
                    </p>
                    <div className="text-sm text-[var(--text-tertiary)]">
                      <strong className="text-[var(--text-primary)]">Tools:</strong> Seldon Core, KServe, TensorFlow Serving, Triton Inference Server
                    </div>
                    <div className="mt-3 p-3 bg-[var(--bg-primary)] rounded text-sm">
                      <strong className="text-[var(--text-primary)]">Critical capability:</strong> Shadow mode. Run new models alongside old ones without affecting users, compare results before switching.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: MLOps Maturity Levels */}
            <div className="not-prose mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-id8-orange/20 rounded">
                  <ActivityIcon />
                </div>
                <h2 className="text-2xl font-bold">MLOps Maturity Levels</h2>
              </div>

              <div className="space-y-6">
                <p className="text-[var(--text-secondary)]">
                  Not everyone needs full MLOps from day one. Match your maturity to your scale and risk tolerance:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)]">
                        <th className="text-left py-3 px-4 font-mono uppercase text-xs text-[var(--text-tertiary)]">Level</th>
                        <th className="text-left py-3 px-4 font-mono uppercase text-xs text-[var(--text-tertiary)]">What You Have</th>
                        <th className="text-left py-3 px-4 font-mono uppercase text-xs text-[var(--text-tertiary)]">Good For</th>
                        <th className="text-left py-3 px-4 font-mono uppercase text-xs text-[var(--text-tertiary)]">Risk</th>
                      </tr>
                    </thead>
                    <tbody className="text-[var(--text-secondary)]">
                      <tr className="border-b border-[var(--border)]">
                        <td className="py-3 px-4">
                          <span className="font-mono text-id8-orange">Level 0</span>
                          <div className="text-xs text-[var(--text-tertiary)]">Manual</div>
                        </td>
                        <td className="py-3 px-4">Jupyter notebooks, manual deployment, no versioning</td>
                        <td className="py-3 px-4">POCs, internal tools, low-stakes predictions</td>
                        <td className="py-3 px-4 text-red-400">High - no reproducibility</td>
                      </tr>
                      <tr className="border-b border-[var(--border)]">
                        <td className="py-3 px-4">
                          <span className="font-mono text-id8-orange">Level 1</span>
                          <div className="text-xs text-[var(--text-tertiary)]">Automated Training</div>
                        </td>
                        <td className="py-3 px-4">Automated training pipeline, experiment tracking, model registry</td>
                        <td className="py-3 px-4">Models retrained weekly, 1-5 models in production</td>
                        <td className="py-3 px-4 text-yellow-400">Medium - manual deployment</td>
                      </tr>
                      <tr className="border-b border-[var(--border)]">
                        <td className="py-3 px-4">
                          <span className="font-mono text-id8-orange">Level 2</span>
                          <div className="text-xs text-[var(--text-tertiary)]">CI/CD for ML</div>
                        </td>
                        <td className="py-3 px-4">Automated testing, staging environments, automated deployment</td>
                        <td className="py-3 px-4">Daily retraining, 5-20 models, production-critical</td>
                        <td className="py-3 px-4 text-green-400">Low - full automation</td>
                      </tr>
                      <tr className="border-b border-[var(--border)]">
                        <td className="py-3 px-4">
                          <span className="font-mono text-id8-orange">Level 3</span>
                          <div className="text-xs text-[var(--text-tertiary)]">Full MLOps</div>
                        </td>
                        <td className="py-3 px-4">Feature stores, drift detection, automated retraining triggers, A/B testing</td>
                        <td className="py-3 px-4">Continuous learning, 20+ models, ML is core product</td>
                        <td className="py-3 px-4 text-green-400">Minimal - self-healing</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-id8-orange/10 border-l-4 border-id8-orange">
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">Reality check:</strong> Most companies should aim for Level 2. Level 3 requires significant investment and is only justified if ML is a core differentiator. Don't over-engineer.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4: Model Drift */}
            <div className="not-prose mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-id8-orange/20 rounded">
                  <AlertIcon />
                </div>
                <h2 className="text-2xl font-bold">Understanding Model Drift</h2>
              </div>

              <div className="space-y-6">
                <p className="text-[var(--text-secondary)]">
                  Drift is why production models degrade over time. Understanding the types helps you build the right monitoring:
                </p>

                <div className="grid gap-4">
                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <h3 className="text-lg font-bold mb-3 text-id8-orange">Data Drift (Covariate Shift)</h3>
                    <p className="text-[var(--text-secondary)] mb-3">
                      The distribution of input features changes. Your model trained on summer data doesn't work in winter. Users from a new market have different behavior patterns.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-[var(--text-primary)]">Detection:</strong>
                        <p className="text-[var(--text-tertiary)]">Compare input distributions (mean, variance, quantiles) between training and serving data</p>
                      </div>
                      <div>
                        <strong className="text-[var(--text-primary)]">Response:</strong>
                        <p className="text-[var(--text-tertiary)]">Retrain on recent data or add new training examples from drifted distribution</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <h3 className="text-lg font-bold mb-3 text-id8-orange">Concept Drift</h3>
                    <p className="text-[var(--text-secondary)] mb-3">
                      The relationship between inputs and outputs changes. User preferences evolve. Economic conditions shift. What was a "good" prediction last year isn't anymore.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-[var(--text-primary)]">Detection:</strong>
                        <p className="text-[var(--text-tertiary)]">Monitor prediction accuracy against delayed ground truth (when available)</p>
                      </div>
                      <div>
                        <strong className="text-[var(--text-primary)]">Response:</strong>
                        <p className="text-[var(--text-tertiary)]">Fundamental model update—may need new features or architecture</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <h3 className="text-lg font-bold mb-3 text-id8-orange">Prediction Drift</h3>
                    <p className="text-[var(--text-secondary)] mb-3">
                      The distribution of model outputs changes, even without data drift. Useful when you don't have ground truth—if predictions suddenly skew high or low, something's wrong.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-[var(--text-primary)]">Detection:</strong>
                        <p className="text-[var(--text-tertiary)]">Track prediction distributions over time (histograms, statistical tests)</p>
                      </div>
                      <div>
                        <strong className="text-[var(--text-primary)]">Response:</strong>
                        <p className="text-[var(--text-tertiary)]">Investigate root cause—likely data drift or upstream pipeline issue</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                  <h3 className="text-lg font-bold mb-4">The Monitoring Pyramid</h3>
                  <div className="space-y-3 text-[var(--text-secondary)] text-sm">
                    <div className="flex items-start gap-3">
                      <div className="font-mono text-id8-orange">Layer 1:</div>
                      <span><strong className="text-[var(--text-primary)]">Infrastructure</strong> - Is the model endpoint up? What's the latency? Error rate?</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="font-mono text-id8-orange">Layer 2:</div>
                      <span><strong className="text-[var(--text-primary)]">Data Quality</strong> - Are inputs valid? Missing features? Out-of-range values?</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="font-mono text-id8-orange">Layer 3:</div>
                      <span><strong className="text-[var(--text-primary)]">Data Drift</strong> - Have input distributions changed from training?</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="font-mono text-id8-orange">Layer 4:</div>
                      <span><strong className="text-[var(--text-primary)]">Prediction Drift</strong> - Have output distributions changed unexpectedly?</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="font-mono text-id8-orange">Layer 5:</div>
                      <span><strong className="text-[var(--text-primary)]">Model Performance</strong> - Is accuracy degrading? (Requires ground truth)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Common MLOps Mistakes */}
            <div className="not-prose mb-12">
              <h2 className="text-2xl font-bold mb-6">Five MLOps Mistakes That Kill Production Systems</h2>

              <div className="space-y-4">
                <div className="p-5 bg-[var(--bg-secondary)] border-l-4 border-red-500 rounded-xl">
                  <h3 className="text-lg font-bold mb-2 text-red-400">1. Training-Serving Skew</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    Different feature computation code for training vs. serving. Looks fine in testing, breaks silently in production.
                  </p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    <strong>Fix:</strong> Use a feature store or shared feature computation code for both training and serving.
                  </p>
                </div>

                <div className="p-5 bg-[var(--bg-secondary)] border-l-4 border-red-500 rounded-xl">
                  <h3 className="text-lg font-bold mb-2 text-red-400">2. Ignoring Data Versioning</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    You can reproduce the model code but not the training data. "The model trained differently this time" with no idea why.
                  </p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    <strong>Fix:</strong> Version training data alongside model code. Tools like DVC or Delta Lake help.
                  </p>
                </div>

                <div className="p-5 bg-[var(--bg-secondary)] border-l-4 border-red-500 rounded-xl">
                  <h3 className="text-lg font-bold mb-2 text-red-400">3. No Rollback Strategy</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    New model ships, predictions go bad, and nobody knows how to go back. Panic ensues.
                  </p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    <strong>Fix:</strong> Keep previous model version deployed in shadow mode. One-click rollback always available.
                  </p>
                </div>

                <div className="p-5 bg-[var(--bg-secondary)] border-l-4 border-red-500 rounded-xl">
                  <h3 className="text-lg font-bold mb-2 text-red-400">4. Monitoring Only Accuracy</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    Accuracy requires ground truth, which often arrives with a delay. By the time accuracy drops, users have been affected for days.
                  </p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    <strong>Fix:</strong> Monitor input drift and prediction drift—these catch problems before ground truth is available.
                  </p>
                </div>

                <div className="p-5 bg-[var(--bg-secondary)] border-l-4 border-red-500 rounded-xl">
                  <h3 className="text-lg font-bold mb-2 text-red-400">5. Manual Retraining</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    Someone has to remember to retrain the model. They get busy. Model decays. Months pass.
                  </p>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    <strong>Fix:</strong> Automated retraining on schedule (weekly) or triggered by drift detection. Human approves promotion, not training.
                  </p>
                </div>
              </div>
            </div>

            {/* Your Turn Exercise */}
            <div className="not-prose mb-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-6">Build: MLOps Pipeline Design</h3>

              <div className="space-y-6 text-[var(--text-secondary)]">
                <p className="text-lg">
                  Design an MLOps pipeline for a real model in your organization. This exercise takes 45-60 minutes.
                </p>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 flex items-center justify-center text-id8-orange font-mono text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)] mb-2">Choose a Model</h4>
                      <p className="text-sm">
                        Pick a model that's either in production or being considered for production. If you don't have one, use this scenario: a customer churn prediction model that scores users daily.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 flex items-center justify-center text-id8-orange font-mono text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)] mb-2">Map the Data Flow</h4>
                      <p className="text-sm">
                        Document: Where does training data come from? What transformations are needed? Where do features live? How does serving data reach the model?
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 flex items-center justify-center text-id8-orange font-mono text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)] mb-2">Design the 5 Components</h4>
                      <p className="text-sm">
                        For each of the 5 core components (data pipeline, feature store, training orchestrator, model registry, serving), specify: tool choice, key capabilities needed, and who owns it.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 flex items-center justify-center text-id8-orange font-mono text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)] mb-2">Define Monitoring Strategy</h4>
                      <p className="text-sm">
                        For each layer of the monitoring pyramid, specify: what metrics to track, what thresholds trigger alerts, and what automated responses exist.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 flex items-center justify-center text-id8-orange font-mono text-sm">
                      5
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)] mb-2">Identify Your Current Maturity Level</h4>
                      <p className="text-sm">
                        Based on the maturity levels, where are you now? What's the target level? What are the gaps to address?
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl mt-6">
                  <h4 className="font-bold mb-2">Deliverable Template</h4>
                  <p className="text-sm font-mono text-[var(--text-tertiary)]">
                    MODEL: [name]<br/>
                    DATA SOURCES: [list]<br/>
                    PIPELINE COMPONENTS: [tool + owner for each]<br/>
                    MONITORING METRICS: [per layer]<br/>
                    CURRENT LEVEL: [0-3]<br/>
                    TARGET LEVEL: [0-3]<br/>
                    GAPS: [list]
                  </p>
                </div>
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="not-prose mb-12 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Key Takeaways
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-id8-orange">
                    <CheckIcon />
                  </div>
                  <p className="text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">MLOps is continuous:</strong> Treat ML as an ongoing process, not a one-time project. The model you ship today will need retraining, monitoring, and maintenance.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-id8-orange">
                    <CheckIcon />
                  </div>
                  <p className="text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">Five components are essential:</strong> Data pipeline, feature store, training orchestrator, model registry, and serving infrastructure. Skip one, and you'll debug at 3am.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-id8-orange">
                    <CheckIcon />
                  </div>
                  <p className="text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">Match maturity to needs:</strong> Not everyone needs Level 3 MLOps. Most companies should aim for Level 2—automated training and deployment with good monitoring.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-id8-orange">
                    <CheckIcon />
                  </div>
                  <p className="text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">Drift kills models:</strong> Data drift, concept drift, and prediction drift cause models to degrade. Monitor for all three—don't wait for accuracy to drop.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-id8-orange">
                    <CheckIcon />
                  </div>
                  <p className="text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">Reproducibility is non-negotiable:</strong> Version data alongside code. Ensure training-serving consistency. Always have a rollback plan.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Link
                href="/academy/ai-at-scale/module-1"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: The AI Infrastructure Stack
              </Link>
              <Link
                href="/academy/ai-at-scale/module-3"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Data Architecture for AI
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
