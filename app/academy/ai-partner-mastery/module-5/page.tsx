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

const LayersIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
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
                href="/academy/ai-partner-mastery"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to AI Partner Mastery
              </Link>
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
              Complex Problem Decomposition
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "The problem isn't too big for AI. You just haven't broken it down yet."
            </m.p>
          </m.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">

            {/* The Scenario */}
            <div className="not-prose mb-12 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                The Scenario
              </h2>
              <h3 className="text-2xl font-bold mb-4">Meet Marcus Okafor</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Marcus is the VP of Operations at MedFlow, a healthcare logistics company managing supply chains for 200+ hospitals across the Southeast. He's three weeks into a massive project: redesigning their entire vendor onboarding process.
                </p>
                <p>
                  The current system is a nightmare. It takes 6-9 months to onboard a new medical supplier. Multiple departments are involved. Compliance requirements vary by state. Some hospitals use different procurement systems. There's a literal binder of "special cases" that's 400 pages long.
                </p>
                <p>
                  The board wants this fixed in 90 days.
                </p>
                <p>
                  Marcus opens his laptop and stares at a blank document titled "Vendor Onboarding Redesign Strategy." He's been staring at it for three days. He knows everything that's wrong. He just doesn't know where to start.
                </p>
                <p>
                  He tries AI: <em>"Help me redesign a vendor onboarding process for healthcare logistics."</em>
                </p>
                <p>
                  The response is a generic 12-step process that could apply to any industry. It mentions "stakeholder alignment" and "process mapping" without addressing any of the actual complexity he's dealing with.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  The problem isn't AI. It's that Marcus handed AI a boulder when it needs gravel.
                </p>
              </div>
            </div>

            {/* The Core Insight */}
            <h2>The Core Insight</h2>
            <p>
              AI is exceptionally good at solving problems. But like any good problem solver, it needs the problem properly defined first.
            </p>
            <p>
              <strong>The mistake most people make:</strong> They treat complex challenges as single, monolithic problems and expect AI to "figure it out." But AI works best when you break complexity into clear, solvable components.
            </p>

            <div className="not-prose my-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="font-mono text-sm text-red-400 mb-2">What doesn't work:</p>
              <p className="text-[var(--text-secondary)]">
                "Help me redesign our entire vendor onboarding process."
              </p>
            </div>

            <div className="not-prose my-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="font-mono text-sm text-green-400 mb-2">What works:</p>
              <p className="text-[var(--text-secondary)]">
                "I need to break down a complex redesign project. Let's start by identifying the distinct decision points in our current process, then isolate which ones create the most delay."
              </p>
            </div>

            <p>
              The difference? The second approach acknowledges that "redesign the process" isn't one problem — it's dozens. And each one is solvable if you separate them.
            </p>

            {/* The Decomposition Canvas */}
            <h2>The Decomposition Canvas</h2>
            <p>
              This is a structured way to break any complex problem into AI-solvable parts. It works for strategic planning, operational redesign, product development, organizational change — anything that feels "too big."
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="flex items-center gap-2 mb-6">
                <LayersIcon />
                <h3 className="text-xl font-bold">The 5-Layer Breakdown</h3>
              </div>
              <div className="space-y-6">
                <div className="border-l-4 border-id8-orange pl-4">
                  <h4 className="font-bold text-lg mb-2">Layer 1: Stakeholder Map</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    Who's involved? What does each person/group care about?
                  </p>
                  <div className="text-xs font-mono bg-[var(--bg-primary)] p-3 rounded">
                    <strong>AI's role:</strong> Help identify hidden stakeholders, map conflicting priorities, suggest engagement strategies
                  </div>
                </div>

                <div className="border-l-4 border-id8-orange pl-4">
                  <h4 className="font-bold text-lg mb-2">Layer 2: Constraint Catalog</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    What can't change? Legal requirements, technical limitations, budget realities?
                  </p>
                  <div className="text-xs font-mono bg-[var(--bg-primary)] p-3 rounded">
                    <strong>AI's role:</strong> Categorize constraints, identify which are hard vs. soft, find creative ways to work within them
                  </div>
                </div>

                <div className="border-l-4 border-id8-orange pl-4">
                  <h4 className="font-bold text-lg mb-2">Layer 3: Decision Sequence</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    What decisions must be made, and in what order? What depends on what?
                  </p>
                  <div className="text-xs font-mono bg-[var(--bg-primary)] p-3 rounded">
                    <strong>AI's role:</strong> Map dependencies, identify critical path decisions, suggest optimal sequencing
                  </div>
                </div>

                <div className="border-l-4 border-id8-orange pl-4">
                  <h4 className="font-bold text-lg mb-2">Layer 4: Component Isolation</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    Which parts can be solved independently? What can run in parallel?
                  </p>
                  <div className="text-xs font-mono bg-[var(--bg-primary)] p-3 rounded">
                    <strong>AI's role:</strong> Break monolithic problems into discrete workstreams, identify quick wins vs. long-term work
                  </div>
                </div>

                <div className="border-l-4 border-id8-orange pl-4">
                  <h4 className="font-bold text-lg mb-2">Layer 5: Success Metrics</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    How do we know each component is working? What does "done" look like?
                  </p>
                  <div className="text-xs font-mono bg-[var(--bg-primary)] p-3 rounded">
                    <strong>AI's role:</strong> Define measurable outcomes, create validation criteria, suggest testing approaches
                  </div>
                </div>
              </div>
            </div>

            {/* See It In Action */}
            <h2>See It In Action</h2>
            <p>
              Here's how Marcus used the Decomposition Canvas with AI:
            </p>

            <div className="not-prose my-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg font-mono text-sm">
              <p className="text-green-400 mb-4">Marcus's decomposition session:</p>
              <div className="text-[var(--text-secondary)] space-y-4 whitespace-pre-wrap">
{`I need to break down a complex problem. I'm redesigning our vendor onboarding process for a healthcare logistics company. Currently takes 6-9 months, involves multiple departments, lots of compliance variation.

Let's use a layered approach:

LAYER 1 - STAKEHOLDER MAP
Who's actually involved in this process right now? Help me think through:
- Who touches vendor onboarding at any point?
- What does each group care most about?
- Where do their priorities conflict?

[AI responds with stakeholder analysis]

Good. Now...

LAYER 2 - CONSTRAINT CATALOG
What absolutely can't change? Help me separate:
- Legal/regulatory requirements (non-negotiable)
- Technical limitations (real vs. perceived)
- Political realities (what people won't accept)

[AI helps categorize constraints]

Now...

LAYER 3 - DECISION SEQUENCE
If we map the current process, what are the actual decision points? Not tasks — decisions. Where does someone have to say yes/no or make a choice?

[AI maps decision points]

This is helpful. Now...

LAYER 4 - COMPONENT ISOLATION
Looking at those decision points, which ones could we redesign independently? What could we parallelize? What must stay sequential?

[AI identifies independent workstreams]

Finally...

LAYER 5 - SUCCESS METRICS
For each component we just isolated, how do we know if the redesign is working? What would we measure?`}
              </div>
            </div>

            <p>
              <strong>What happened:</strong> In 90 minutes, Marcus went from "staring at a blank page" to having a clear project structure with 6 independent workstreams, each with defined success criteria.
            </p>
            <p>
              The key: He didn't ask AI to solve the problem. He used AI to decompose it into solvable parts.
            </p>

            {/* Common Decomposition Patterns */}
            <h2>Common Decomposition Patterns</h2>
            <p>
              Different types of complex problems benefit from different decomposition approaches:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4 text-id8-orange">Problem Type</th>
                    <th className="text-left py-3 px-4 text-id8-orange">Best Decomposition</th>
                    <th className="text-left py-3 px-4 text-id8-orange">AI's Contribution</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-semibold">Strategic Planning</td>
                    <td className="py-3 px-4">Time horizons (30/60/90 day)</td>
                    <td className="py-3 px-4">Sequence initiatives, identify dependencies</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-semibold">Process Redesign</td>
                    <td className="py-3 px-4">Decision points + workflows</td>
                    <td className="py-3 px-4">Map current state, isolate bottlenecks</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-semibold">Product Development</td>
                    <td className="py-3 px-4">User journeys + features</td>
                    <td className="py-3 px-4">Prioritize based on impact, find MVPs</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-semibold">Organizational Change</td>
                    <td className="py-3 px-4">Stakeholder groups + concerns</td>
                    <td className="py-3 px-4">Surface resistance points, design interventions</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">Crisis Response</td>
                    <td className="py-3 px-4">Urgency tiers (now/soon/later)</td>
                    <td className="py-3 px-4">Triage actions, assign resources</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* The Decomposition-First Habit */}
            <h2>The Decomposition-First Habit</h2>
            <p>
              High-performers who work with AI develop a specific habit: <strong>They never hand AI a complex problem directly.</strong>
            </p>
            <p>
              Instead, they pause and ask: <em>"What are the layers here?"</em>
            </p>

            <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-xs text-red-400 mb-2">BEFORE (Direct Approach)</p>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>"Help me with this big project"</li>
                  <li>AI gives generic framework</li>
                  <li>Doesn't fit your situation</li>
                  <li>You try to adapt it</li>
                  <li>Get stuck, give up</li>
                </ul>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="font-mono text-xs text-green-400 mb-2">AFTER (Decomposition-First)</p>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li>"Let's break this down first"</li>
                  <li>AI helps map the layers</li>
                  <li>Each layer gets specific treatment</li>
                  <li>Build bottom-up solutions</li>
                  <li>Actually finish the work</li>
                </ul>
              </div>
            </div>

            {/* Advanced Technique: The "What Would Need to Be True?" Framework */}
            <h2>Advanced Technique: The "What Would Need to Be True?" Framework</h2>
            <p>
              When a problem feels impossibly complex, try this with AI:
            </p>

            <div className="not-prose my-8 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg font-mono text-sm">
              <p className="text-[var(--text-primary)] mb-4">The WWNBT prompt pattern:</p>
              <div className="text-[var(--text-secondary)] space-y-3 whitespace-pre-wrap">
{`I have a complex goal: [state your objective]

Let's work backwards. What would need to be true for this to work?

Help me identify:
1. Preconditions - what must exist before we start?
2. Enabling conditions - what must we create?
3. Success conditions - what proves it's working?

Then, for each condition, let's break it down further until we get to concrete, actionable components.`}
              </div>
            </div>

            <p>
              This approach turns "impossible" into "here's what needs to happen" — and suddenly you have a roadmap.
            </p>

            {/* When Decomposition Reveals the Real Problem */}
            <h2>When Decomposition Reveals the Real Problem</h2>
            <p>
              Sometimes the act of breaking down a problem reveals that you're solving the wrong thing entirely.
            </p>

            <div className="not-prose my-8 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
              <p className="text-sm italic text-[var(--text-secondary)] mb-4">
                Marcus discovered this during his decomposition. When he mapped decision points, he realized that 80% of the onboarding delay came from a single bottleneck: the legal compliance review that happened at the END of the process.
              </p>
              <p className="text-sm text-[var(--text-secondary)]">
                Moving that review to the BEGINNING reduced onboarding time from 6 months to 6 weeks. He didn't need to redesign the entire process. He just needed to resequence one decision point.
              </p>
              <p className="text-sm font-bold text-[var(--text-primary)] mt-4">
                The decomposition didn't just help him solve the problem. It helped him find the REAL problem.
              </p>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-6 bg-id8-orange/10 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Your Problem Decomposition Canvas</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 60 minutes<br />
                <strong>You'll need:</strong> A complex problem you're currently facing (strategic, operational, organizational, or creative)
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Name the Problem (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Write a one-sentence description of the challenge. Be specific about the desired outcome.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Layer 1: Stakeholder Map (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Use AI to identify everyone affected. Map their priorities and conflicts.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Layer 2: Constraint Catalog (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">List everything that can't change. Separate hard constraints from soft ones.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Layer 3: Decision Sequence (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Map the actual decision points. What must be decided, and in what order?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">5</span>
                  <div>
                    <p className="font-bold">Layer 4: Component Isolation (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Break it into independent workstreams. What can be solved in parallel?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">6</span>
                  <div>
                    <p className="font-bold">Layer 5: Success Metrics (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Define how you'll know each component is working. Make it measurable.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-xs font-mono text-id8-orange mb-2">DELIVERABLE</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  A one-page canvas with all 5 layers completed. You should be able to see your complex problem as a set of discrete, solvable components.
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
                  "AI is excellent at solving problems, but only if you break complexity into clear components first.",
                  "The Decomposition Canvas (5 layers: Stakeholders, Constraints, Decisions, Components, Metrics) turns overwhelming challenges into structured workstreams.",
                  "Different problem types need different decomposition patterns — learn to recognize which approach fits your situation.",
                  "Develop the decomposition-first habit: never hand AI a monolithic problem. Always break it down first.",
                  "Sometimes the act of decomposition reveals that you're solving the wrong problem — and that insight is more valuable than any solution."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-id8-orange flex-shrink-0 mt-0.5"><CheckIcon /></span>
                    <span className="text-[var(--text-primary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Closing Story */}
            <p className="italic text-[var(--text-secondary)] border-l-2 border-id8-orange pl-4">
              Marcus finished the vendor onboarding redesign in 60 days instead of 90. But more importantly, his team now uses the Decomposition Canvas for every major initiative. They've stopped getting stuck on "where do we even start?" Because they know: you start by breaking it down.
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
                href="/academy/ai-partner-mastery/module-4"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: Managing Collaboration State
              </Link>
              <Link
                href="/academy/ai-partner-mastery/module-6"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Quality Assurance Patterns
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
