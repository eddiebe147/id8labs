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

const DatabaseIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
)

const LayersIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
)

const ShieldIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const ZapIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
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
                href="/academy/ai-at-scale"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to AI at Scale
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
              Data Architecture for AI
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "Your model is only as good as your data. But your data is only as useful as your architecture lets it be."
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
              <h3 className="text-2xl font-bold mb-4">Why Most AI Projects Are Actually Data Projects</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Your data scientists spend 80% of their time finding, cleaning, and preparing data. Not because they're bad at their jobs—because your data architecture wasn't designed for AI. It was designed for reports.
                </p>
                <p>
                  The difference between an AI team that ships and one that struggles isn't their ML skills. It's whether they can get clean, labeled, point-in-time correct data in hours instead of weeks. Data architecture is the difference.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module teaches you to design data systems that make AI development fast—feature stores, data quality pipelines, and architecture patterns that turn "we need 3 weeks to get the data" into "here's the feature, already computed."
                </p>
              </div>
            </div>

            {/* Section 1: The Data Hierarchy */}
            <div className="not-prose mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-id8-orange/20 rounded">
                  <LayersIcon />
                </div>
                <h2 className="text-2xl font-bold">The AI Data Hierarchy</h2>
              </div>

              <div className="space-y-6">
                <p className="text-[var(--text-secondary)]">
                  AI data architecture has distinct layers. Each must be solid before the next is useful:
                </p>

                <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-[var(--bg-primary)] rounded-lg border-l-4 border-id8-orange">
                      <div className="font-mono text-id8-orange">L5</div>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)]">AI Applications</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Production models serving predictions to users and systems</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-[var(--bg-primary)] rounded-lg border-l-4 border-purple-500">
                      <div className="font-mono text-purple-400">L4</div>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)]">Feature Store</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Computed, versioned features ready for training and serving</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-[var(--bg-primary)] rounded-lg border-l-4 border-blue-500">
                      <div className="font-mono text-blue-400">L3</div>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)]">Analytics Layer</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Clean, modeled data optimized for analysis and aggregation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-[var(--bg-primary)] rounded-lg border-l-4 border-green-500">
                      <div className="font-mono text-green-400">L2</div>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)]">Data Warehouse</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Structured, schema-validated data with quality guarantees</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-[var(--bg-primary)] rounded-lg border-l-4 border-yellow-500">
                      <div className="font-mono text-yellow-400">L1</div>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)]">Data Lake</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Raw data from all sources, stored at full fidelity</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-[var(--bg-primary)] rounded-lg border-l-4 border-gray-500">
                      <div className="font-mono text-gray-400">L0</div>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)]">Source Systems</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Operational databases, APIs, event streams, files</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-id8-orange/10 border-l-4 border-id8-orange">
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">The critical insight:</strong> Most organizations have L0-L2 and jump straight to L5. They're missing L3-L4, which is why data scientists spend weeks instead of hours on data prep.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Feature Stores */}
            <div className="not-prose mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-id8-orange/20 rounded">
                  <DatabaseIcon />
                </div>
                <h2 className="text-2xl font-bold">Feature Stores: The Missing Layer</h2>
              </div>

              <div className="space-y-6">
                <p className="text-[var(--text-secondary)]">
                  A feature store is a centralized repository for ML features. It solves three critical problems: feature reuse, training-serving consistency, and point-in-time correctness.
                </p>

                <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                  <h3 className="text-lg font-bold mb-4">Feature Store Components</h3>
                  <div className="grid gap-4">
                    <div className="p-4 bg-[var(--bg-primary)] rounded-lg">
                      <h4 className="font-bold text-id8-orange mb-2">Feature Registry</h4>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Catalog of all features with metadata: definition, owner, data source, freshness requirements, statistics. Makes features discoverable and documented.
                      </p>
                    </div>
                    <div className="p-4 bg-[var(--bg-primary)] rounded-lg">
                      <h4 className="font-bold text-id8-orange mb-2">Offline Store</h4>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Historical feature values for training. Stores time-series data enabling point-in-time lookups. Typically backed by data warehouse (BigQuery, Snowflake, Databricks).
                      </p>
                    </div>
                    <div className="p-4 bg-[var(--bg-primary)] rounded-lg">
                      <h4 className="font-bold text-id8-orange mb-2">Online Store</h4>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Low-latency feature serving for real-time predictions. Stores latest feature values. Typically backed by Redis, DynamoDB, or specialized databases.
                      </p>
                    </div>
                    <div className="p-4 bg-[var(--bg-primary)] rounded-lg">
                      <h4 className="font-bold text-id8-orange mb-2">Feature Transformation Engine</h4>
                      <p className="text-sm text-[var(--text-secondary)]">
                        Computes features from raw data. Same code for batch (training) and streaming (serving) to prevent skew. Handles aggregations, joins, and transformations.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)]">
                        <th className="text-left py-3 px-4 font-mono uppercase text-xs text-[var(--text-tertiary)]">Problem</th>
                        <th className="text-left py-3 px-4 font-mono uppercase text-xs text-[var(--text-tertiary)]">Without Feature Store</th>
                        <th className="text-left py-3 px-4 font-mono uppercase text-xs text-[var(--text-tertiary)]">With Feature Store</th>
                      </tr>
                    </thead>
                    <tbody className="text-[var(--text-secondary)]">
                      <tr className="border-b border-[var(--border)]">
                        <td className="py-3 px-4 font-bold text-id8-orange">Feature Discovery</td>
                        <td className="py-3 px-4">"Does anyone have customer lifetime value calculated?"</td>
                        <td className="py-3 px-4">Search registry, find 12 LTV variants with documentation</td>
                      </tr>
                      <tr className="border-b border-[var(--border)]">
                        <td className="py-3 px-4 font-bold text-id8-orange">Recomputation</td>
                        <td className="py-3 px-4">Every model team writes their own feature code</td>
                        <td className="py-3 px-4">Compute once, use across all models</td>
                      </tr>
                      <tr className="border-b border-[var(--border)]">
                        <td className="py-3 px-4 font-bold text-id8-orange">Training-Serving Skew</td>
                        <td className="py-3 px-4">Different code paths, subtle bugs</td>
                        <td className="py-3 px-4">Same computation, different stores</td>
                      </tr>
                      <tr className="border-b border-[var(--border)]">
                        <td className="py-3 px-4 font-bold text-id8-orange">Point-in-Time</td>
                        <td className="py-3 px-4">Data leakage bugs from using future data</td>
                        <td className="py-3 px-4">Automatic point-in-time joins</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded">
                  <p className="text-sm font-mono text-blue-400 mb-2">Tool Recommendations</p>
                  <p className="text-sm text-[var(--text-primary)]">
                    <strong>Open source:</strong> Feast, Feathr <br/>
                    <strong>Managed:</strong> Tecton, Databricks Feature Store, AWS SageMaker Feature Store <br/>
                    <strong>Start simple:</strong> Even a well-organized data warehouse with point-in-time views beats no feature store
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Feature Engineering Framework */}
            <div className="not-prose mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-id8-orange/20 rounded">
                  <ZapIcon />
                </div>
                <h2 className="text-2xl font-bold">Feature Engineering Framework</h2>
              </div>

              <div className="space-y-6">
                <p className="text-[var(--text-secondary)]">
                  Great features come from domain knowledge plus systematic engineering. Here's a framework for building features that improve models:
                </p>

                <div className="grid gap-4">
                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <h3 className="text-lg font-bold mb-3 text-id8-orange">1. Entity Features</h3>
                    <p className="text-[var(--text-secondary)] mb-3">
                      Static or slowly-changing attributes of your prediction entity (user, product, transaction).
                    </p>
                    <div className="text-sm text-[var(--text-tertiary)]">
                      <strong>Examples:</strong> user_age, account_type, product_category, customer_tier<br/>
                      <strong>Freshness:</strong> Daily or slower
                    </div>
                  </div>

                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <h3 className="text-lg font-bold mb-3 text-id8-orange">2. Aggregation Features</h3>
                    <p className="text-[var(--text-secondary)] mb-3">
                      Summary statistics over time windows: counts, sums, averages, min/max of related events.
                    </p>
                    <div className="text-sm text-[var(--text-tertiary)]">
                      <strong>Examples:</strong> purchases_last_30d, avg_order_value_90d, support_tickets_7d<br/>
                      <strong>Freshness:</strong> Hourly to daily depending on use case
                    </div>
                  </div>

                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <h3 className="text-lg font-bold mb-3 text-id8-orange">3. Behavioral Features</h3>
                    <p className="text-[var(--text-secondary)] mb-3">
                      Patterns in behavior: sequences, frequencies, trends, velocities.
                    </p>
                    <div className="text-sm text-[var(--text-tertiary)]">
                      <strong>Examples:</strong> login_frequency_trend, purchase_velocity, session_sequence_length<br/>
                      <strong>Freshness:</strong> Depends on prediction latency requirements
                    </div>
                  </div>

                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <h3 className="text-lg font-bold mb-3 text-id8-orange">4. Contextual Features</h3>
                    <p className="text-[var(--text-secondary)] mb-3">
                      Information about the prediction context: time, location, device, session state.
                    </p>
                    <div className="text-sm text-[var(--text-tertiary)]">
                      <strong>Examples:</strong> hour_of_day, day_of_week, is_mobile, items_in_cart<br/>
                      <strong>Freshness:</strong> Real-time
                    </div>
                  </div>

                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <h3 className="text-lg font-bold mb-3 text-id8-orange">5. Interaction Features</h3>
                    <p className="text-[var(--text-secondary)] mb-3">
                      Combinations and ratios between features that capture relationships.
                    </p>
                    <div className="text-sm text-[var(--text-tertiary)]">
                      <strong>Examples:</strong> revenue_per_visit, return_rate, conversion_vs_average<br/>
                      <strong>Freshness:</strong> Same as underlying features
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-id8-orange/10 border-l-4 border-id8-orange">
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">Feature engineering principle:</strong> The best features encode domain knowledge. Work with business experts to identify what signals actually predict outcomes. Automated feature engineering rarely beats thoughtful domain-driven features.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4: Data Quality */}
            <div className="not-prose mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-id8-orange/20 rounded">
                  <ShieldIcon />
                </div>
                <h2 className="text-2xl font-bold">Data Quality for AI</h2>
              </div>

              <div className="space-y-6">
                <p className="text-[var(--text-secondary)]">
                  Bad data in, bad predictions out. Data quality for AI goes beyond traditional data quality—you need to catch issues that affect model performance specifically.
                </p>

                <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                  <h3 className="text-lg font-bold mb-4">The Data Quality Stack</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-mono text-sm">1</div>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)]">Schema Validation</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Types, nullability, enums. Catches pipeline breaks immediately. Tools: Great Expectations, dbt tests, Pandera</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-mono text-sm">2</div>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)]">Business Rule Validation</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Domain-specific constraints. Revenue greater than 0, age in valid range, date sequences logical. Encodes business knowledge.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-mono text-sm">3</div>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)]">Statistical Monitoring</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Distribution shifts, outliers, anomalies. Catches drift before it impacts models. Tools: Evidently, WhyLabs, Monte Carlo</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-mono text-sm">4</div>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)]">Freshness Monitoring</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Data arriving on time? Stale features cause silent model degradation. Track data timestamp vs. wall clock.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-mono text-sm">5</div>
                      <div>
                        <h4 className="font-bold text-[var(--text-primary)]">Lineage Tracking</h4>
                        <p className="text-sm text-[var(--text-secondary)]">Where did this data come from? What transformations were applied? Critical for debugging and compliance.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-5 bg-[var(--bg-secondary)] border-l-4 border-green-500 rounded-xl">
                    <h3 className="text-lg font-bold mb-2 text-green-400">Good Data Quality Practices</h3>
                    <ul className="space-y-2 text-[var(--text-secondary)] text-sm">
                      <li>+ Fail pipelines on schema violations</li>
                      <li>+ Alert on distribution shifts before training</li>
                      <li>+ Version data with model experiments</li>
                      <li>+ Document data sources and transforms</li>
                      <li>+ Monitor freshness SLAs</li>
                    </ul>
                  </div>

                  <div className="p-5 bg-[var(--bg-secondary)] border-l-4 border-red-500 rounded-xl">
                    <h3 className="text-lg font-bold mb-2 text-red-400">Common Data Quality Failures</h3>
                    <ul className="space-y-2 text-[var(--text-secondary)] text-sm">
                      <li>- Silently filling nulls with zeros</li>
                      <li>- Training on data from wrong time period</li>
                      <li>- Using future data (label leakage)</li>
                      <li>- Ignoring encoding changes in categoricals</li>
                      <li>- Missing values that changed meaning</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Labeling at Scale */}
            <div className="not-prose mb-12">
              <h2 className="text-2xl font-bold mb-6">Labeling: The Hidden Bottleneck</h2>

              <div className="space-y-6">
                <p className="text-[var(--text-secondary)]">
                  Supervised learning needs labels. At scale, labeling becomes the constraint. Here's how to approach it systematically:
                </p>

                <div className="grid gap-4">
                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <h3 className="text-lg font-bold mb-3 text-id8-orange">Label Sources (Best to Hardest)</h3>
                    <div className="space-y-3 text-[var(--text-secondary)]">
                      <div className="flex justify-between items-center p-3 bg-[var(--bg-primary)] rounded">
                        <span><strong className="text-[var(--text-primary)]">Organic labels:</strong> User actions as implicit labels</span>
                        <span className="text-xs font-mono text-green-400">Free</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-[var(--bg-primary)] rounded">
                        <span><strong className="text-[var(--text-primary)]">Programmatic labels:</strong> Rule-based label generation</span>
                        <span className="text-xs font-mono text-green-400">Cheap</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-[var(--bg-primary)] rounded">
                        <span><strong className="text-[var(--text-primary)]">Model-assisted:</strong> Pre-label with model, human review</span>
                        <span className="text-xs font-mono text-yellow-400">Medium</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-[var(--bg-primary)] rounded">
                        <span><strong className="text-[var(--text-primary)]">Crowd sourcing:</strong> Scale9AI, Amazon MTurk</span>
                        <span className="text-xs font-mono text-yellow-400">Medium</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-[var(--bg-primary)] rounded">
                        <span><strong className="text-[var(--text-primary)]">Expert labeling:</strong> Domain specialists for complex tasks</span>
                        <span className="text-xs font-mono text-red-400">Expensive</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                    <h3 className="text-lg font-bold mb-3 text-id8-orange">Label Quality Practices</h3>
                    <ul className="space-y-2 text-[var(--text-secondary)]">
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span><strong className="text-[var(--text-primary)]">Clear guidelines:</strong> Detailed instructions with examples reduce inter-annotator disagreement</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span><strong className="text-[var(--text-primary)]">Multiple annotators:</strong> 3+ labels per example, aggregate with voting or weighted average</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span><strong className="text-[var(--text-primary)]">Calibration sets:</strong> Known-answer examples to monitor annotator quality</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span><strong className="text-[var(--text-primary)]">Continuous feedback:</strong> Review disagreements to improve guidelines</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-id8-orange/10 border-l-4 border-id8-orange">
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">Reality check:</strong> The cost of bad labels is higher than the cost of good labels. A noisy label set limits model ceiling. Invest in labeling quality—it compounds.
                  </p>
                </div>
              </div>
            </div>

            {/* Your Turn Exercise */}
            <div className="not-prose mb-12 p-8 bg-id8-orange/10 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-6">Build: Feature Store Design Document</h3>

              <div className="space-y-6 text-[var(--text-secondary)]">
                <p className="text-lg">
                  Design the feature store architecture for your organization. This exercise takes 45-60 minutes.
                </p>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 flex items-center justify-center text-id8-orange font-mono text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)] mb-2">Inventory Your Current Features</h4>
                      <p className="text-sm">
                        List the features your ML models currently use. Where do they come from? How are they computed? Who maintains them? Note any duplication across teams.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 flex items-center justify-center text-id8-orange font-mono text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)] mb-2">Design Your Feature Taxonomy</h4>
                      <p className="text-sm">
                        Using the 5 feature types (entity, aggregation, behavioral, contextual, interaction), categorize your features. Identify which entities they attach to.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 flex items-center justify-center text-id8-orange font-mono text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)] mb-2">Define Freshness Requirements</h4>
                      <p className="text-sm">
                        For each feature category, determine: batch (daily), near-real-time (hourly), or real-time (seconds). This drives architecture decisions.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 flex items-center justify-center text-id8-orange font-mono text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)] mb-2">Select Storage Components</h4>
                      <p className="text-sm">
                        Choose your offline store (warehouse), online store (low-latency), and registry. Consider: existing infrastructure, team skills, scale requirements.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 flex items-center justify-center text-id8-orange font-mono text-sm">
                      5
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--text-primary)] mb-2">Design Data Quality Checks</h4>
                      <p className="text-sm">
                        For your most critical features, define: schema validation rules, business rule constraints, statistical bounds, and freshness SLAs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl mt-6">
                  <h4 className="font-bold mb-2">Deliverable Template</h4>
                  <p className="text-sm font-mono text-[var(--text-tertiary)]">
                    FEATURE INVENTORY: [count by category]<br/>
                    FRESHNESS TIERS: [batch | near-real-time | real-time]<br/>
                    OFFLINE STORE: [technology + rationale]<br/>
                    ONLINE STORE: [technology + rationale]<br/>
                    REGISTRY: [technology + rationale]<br/>
                    QUALITY CHECKS: [per critical feature]<br/>
                    MIGRATION PLAN: [phase 1, 2, 3]
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
                    <strong className="text-[var(--text-primary)]">AI projects are data projects:</strong> Data architecture determines AI velocity. Invest in the plumbing—it's not glamorous but it's the bottleneck.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-id8-orange">
                    <CheckIcon />
                  </div>
                  <p className="text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">Feature stores are the missing layer:</strong> They solve reuse, consistency, and point-in-time correctness. Even a simple version dramatically accelerates data science.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-id8-orange">
                    <CheckIcon />
                  </div>
                  <p className="text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">Five feature types cover most needs:</strong> Entity, aggregation, behavioral, contextual, and interaction features. Systematic feature engineering beats random experimentation.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-id8-orange">
                    <CheckIcon />
                  </div>
                  <p className="text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">Data quality has 5 layers:</strong> Schema, business rules, statistics, freshness, and lineage. Each catches different failure modes. Skip none.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-id8-orange">
                    <CheckIcon />
                  </div>
                  <p className="text-[var(--text-secondary)]">
                    <strong className="text-[var(--text-primary)]">Labeling is the hidden bottleneck:</strong> Start with organic labels when possible, invest in quality over quantity, and treat labeling as an ongoing process, not a one-time project.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Link
                href="/academy/ai-at-scale/module-2"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: MLOps Fundamentals
              </Link>
              <Link
                href="/academy/ai-at-scale/module-4"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Model Governance
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
