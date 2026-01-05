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

const NetworkIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1"/>
    <circle cx="12" cy="5" r="1"/>
    <circle cx="12" cy="19" r="1"/>
    <circle cx="5" cy="12" r="1"/>
    <circle cx="19" cy="12" r="1"/>
    <line x1="12" y1="6" x2="12" y2="11"/>
    <line x1="12" y1="13" x2="12" y2="18"/>
    <line x1="6" y1="12" x2="11" y2="12"/>
    <line x1="13" y1="12" x2="18" y2="12"/>
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
                href="/academy/ai-partner-mastery"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to AI Partner Mastery
              </Link>
            </m.div>

            <m.div variants={fadeUp}>
              <CourseProgress
                currentModule={8}
                totalModules={8}
                courseTitle="AI Partner Mastery"
              />
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                Module 8
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                60 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Advanced Orchestration
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "I can use AI for individual tasks. But what about coordinating multiple AI capabilities for complex work?"
            </m.p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
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
              <h3 className="text-2xl font-bold mb-4">Meet Elena Rodriguez</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Elena runs strategic initiatives at a global manufacturing company. She's working on a project that feels impossible: redesigning their entire supply chain strategy to account for climate risk over the next decade.
                </p>
                <p>
                  This isn't a single AI task. It's many interconnected capabilities she needs to coordinate:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Research on climate scenarios and supply chain vulnerabilities</li>
                  <li>• Analysis of current supplier locations vs. risk zones</li>
                  <li>• Strategic frameworks for resilience planning</li>
                  <li>• Stakeholder communication materials (board, suppliers, operations teams)</li>
                  <li>• Financial modeling of different scenarios</li>
                  <li>• Implementation roadmap with phased rollout</li>
                </ul>
                <p>
                  Elena can use AI for each piece individually. But the real power would be orchestrating all these capabilities together — having insights from research feed into analysis, analysis inform strategy, strategy shape stakeholder communication, and so on.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  She doesn't need better individual AI outputs. She needs to conduct an AI symphony.
                </p>
              </div>
            </div>

            {/* The Core Concept */}
            <h2>The Core Concept</h2>
            <p>
              Most people use AI in a linear way: one task, one output, move on. But the most powerful work happens when you <strong>orchestrate multiple AI capabilities in sequence or parallel</strong> — where outputs from one interaction become inputs to the next, building toward a larger goal.
            </p>
            <p>
              This is orchestration: coordinating different AI roles and capabilities like you'd coordinate a team.
            </p>

            <div className="not-prose my-8 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
              <p className="font-bold mb-2">Orchestration vs. Individual Tasks</p>
              <table className="w-full text-sm mt-3">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-2 text-red-400">Individual Tasks</th>
                    <th className="text-left py-2 text-green-400">Orchestrated Workflow</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-2">Ask AI for research</td>
                    <td className="py-2">Chain research → synthesis → strategy → communication</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-2">Get one output, start over</td>
                    <td className="py-2">Outputs build on each other, context compounds</td>
                  </tr>
                  <tr>
                    <td className="py-2">You manually connect pieces</td>
                    <td className="py-2">AI helps connect and validate across stages</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* The Orchestration Playbook */}
            <h2>The Orchestration Playbook</h2>
            <p>
              Here's a framework for coordinating multiple AI capabilities:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="flex items-center gap-2 mb-6">
                <NetworkIcon />
                <h3 className="text-xl font-bold">The 5-Stage Orchestration Pattern</h3>
              </div>
              <div className="space-y-6">
                <div className="border-l-4 border-id8-orange pl-4">
                  <h4 className="font-bold text-lg mb-2">Stage 1: Define the End State</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    What's the final deliverable? Be specific about format, audience, and success criteria.
                  </p>
                  <div className="text-xs font-mono bg-[var(--bg-primary)] p-3 rounded">
                    <strong>Example:</strong> "A 15-page board presentation on climate supply chain strategy with specific recommendations, risk analysis, and 3-year roadmap."
                  </div>
                </div>

                <div className="border-l-4 border-id8-orange pl-4">
                  <h4 className="font-bold text-lg mb-2">Stage 2: Map the Component Tasks</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    Break the work into distinct capabilities. What different "modes" of AI do you need?
                  </p>
                  <div className="text-xs font-mono bg-[var(--bg-primary)] p-3 rounded">
                    <strong>Modes:</strong> Researcher, Analyst, Strategist, Writer, Critic, Synthesizer
                  </div>
                </div>

                <div className="border-l-4 border-id8-orange pl-4">
                  <h4 className="font-bold text-lg mb-2">Stage 3: Design the Flow</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    What's the sequence? Which tasks must happen first? What can run in parallel?
                  </p>
                  <div className="text-xs font-mono bg-[var(--bg-primary)] p-3 rounded">
                    <strong>Flow types:</strong> Sequential (A→B→C), Parallel (A+B→C), Iterative (A→B→A'→B')
                  </div>
                </div>

                <div className="border-l-4 border-id8-orange pl-4">
                  <h4 className="font-bold text-lg mb-2">Stage 4: Build Handoff Points</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    How does output from one stage become input to the next? Define what gets passed forward.
                  </p>
                  <div className="text-xs font-mono bg-[var(--bg-primary)] p-3 rounded">
                    <strong>Handoff pattern:</strong> "Here's what [Role A] found. Now [Role B], use this to..."
                  </div>
                </div>

                <div className="border-l-4 border-id8-orange pl-4">
                  <h4 className="font-bold text-lg mb-2">Stage 5: Run QA Loops</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    After each stage, verify quality and coherence before moving forward.
                  </p>
                  <div className="text-xs font-mono bg-[var(--bg-primary)] p-3 rounded">
                    <strong>QA questions:</strong> Does this answer the question? Is it compatible with prior stages? What's missing?
                  </div>
                </div>
              </div>
            </div>

            {/* See It In Action */}
            <h2>See It In Action: Elena's Climate Strategy Orchestration</h2>
            <p>
              Here's how Elena orchestrated multiple AI capabilities for her project:
            </p>

            <div className="not-prose my-8 space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange rounded">
                <p className="font-bold text-sm mb-2">Phase 1: Research Foundation</p>
                <p className="text-xs text-[var(--text-secondary)] mb-2"><strong>AI Role:</strong> Researcher</p>
                <p className="text-xs text-[var(--text-secondary)] mb-2"><strong>Task:</strong> "Analyze climate risk scenarios affecting global manufacturing supply chains over next 10 years. Focus on: water scarcity, extreme weather, regulatory changes."</p>
                <p className="text-xs text-[var(--text-secondary)]"><strong>Output:</strong> Structured risk landscape document</p>
              </div>

              <div className="px-4 text-center text-id8-orange">↓</div>

              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange rounded">
                <p className="font-bold text-sm mb-2">Phase 2: Current State Analysis</p>
                <p className="text-xs text-[var(--text-secondary)] mb-2"><strong>AI Role:</strong> Analyst</p>
                <p className="text-xs text-[var(--text-secondary)] mb-2"><strong>Task:</strong> "Given the risk landscape [paste Phase 1 output], analyze our current supplier network. Where are our vulnerabilities? Which locations have highest exposure?"</p>
                <p className="text-xs text-[var(--text-secondary)]"><strong>Output:</strong> Vulnerability matrix with prioritized risks</p>
              </div>

              <div className="px-4 text-center text-id8-orange">↓</div>

              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange rounded">
                <p className="font-bold text-sm mb-2">Phase 3: Strategic Options</p>
                <p className="text-xs text-[var(--text-secondary)] mb-2"><strong>AI Role:</strong> Strategist</p>
                <p className="text-xs text-[var(--text-secondary)] mb-2"><strong>Task:</strong> "Based on these vulnerabilities [paste Phase 2 output], generate 3-4 strategic approaches for building supply chain resilience. Trade-offs of each?"</p>
                <p className="text-xs text-[var(--text-secondary)]"><strong>Output:</strong> Strategic framework with options</p>
              </div>

              <div className="px-4 text-center text-id8-orange">↓</div>

              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange rounded">
                <p className="font-bold text-sm mb-2">Phase 4: Stakeholder Translation</p>
                <p className="text-xs text-[var(--text-secondary)] mb-2"><strong>AI Role:</strong> Communicator</p>
                <p className="text-xs text-[var(--text-secondary)] mb-2"><strong>Task:</strong> "Turn this strategy [paste Phase 3 output] into board-level presentation. Emphasize financial impact, competitive advantage, risk mitigation."</p>
                <p className="text-xs text-[var(--text-secondary)]"><strong>Output:</strong> Presentation outline and key messages</p>
              </div>

              <div className="px-4 text-center text-id8-orange">↓</div>

              <div className="p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange rounded">
                <p className="font-bold text-sm mb-2">Phase 5: Critical Review</p>
                <p className="text-xs text-[var(--text-secondary)] mb-2"><strong>AI Role:</strong> Critic</p>
                <p className="text-xs text-[var(--text-secondary)] mb-2"><strong>Task:</strong> "Review the entire logic chain from research to presentation. What assumptions might be flawed? What will the CFO challenge? Where's the analysis weakest?"</p>
                <p className="text-xs text-[var(--text-secondary)]"><strong>Output:</strong> Critical feedback + refinement suggestions</p>
              </div>
            </div>

            <p className="my-6">
              <strong>The result:</strong> In 3 days, Elena had a comprehensive strategy that would have taken her 3 weeks working solo. But more importantly, each stage improved the quality of the next — the orchestration created compound value.
            </p>

            {/* Common Orchestration Patterns */}
            <h2>Common Orchestration Patterns</h2>
            <p>
              Different types of complex work benefit from different orchestration structures:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4 text-id8-orange">Pattern</th>
                    <th className="text-left py-3 px-4 text-id8-orange">Flow</th>
                    <th className="text-left py-3 px-4 text-id8-orange">Best For</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-semibold">Linear Pipeline</td>
                    <td className="py-3 px-4">Research → Analysis → Strategy → Communication</td>
                    <td className="py-3 px-4">Strategic planning, reports, proposals</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-semibold">Parallel Synthesis</td>
                    <td className="py-3 px-4">Multiple analyses → Synthesis → Decision</td>
                    <td className="py-3 px-4">Multi-perspective decisions, due diligence</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-semibold">Iterative Refinement</td>
                    <td className="py-3 px-4">Draft → Critique → Refine → Critique → Finalize</td>
                    <td className="py-3 px-4">High-stakes documents, creative work</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">Hub & Spoke</td>
                    <td className="py-3 px-4">Central strategy → Multiple implementations</td>
                    <td className="py-3 px-4">Rollout plans, stakeholder communications</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* The Orchestration Template */}
            <h2>The Orchestration Template</h2>
            <p>
              Use this template to plan multi-stage AI workflows:
            </p>

            <div className="not-prose my-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg font-mono text-sm">
              <p className="text-green-400 mb-4">Orchestration Planning Template:</p>
              <div className="text-[var(--text-secondary)] space-y-4 whitespace-pre-wrap">
{`PROJECT: [Name]
END GOAL: [Specific deliverable]

ORCHESTRATION MAP:

Phase 1: [Name]
  Role: [What mode of AI?]
  Input: [What do I provide?]
  Output: [What does AI produce?]
  Handoff: [What moves to next phase?]

Phase 2: [Name]
  Role: [What mode of AI?]
  Input: [Phase 1 output + what else?]
  Output: [What does AI produce?]
  Handoff: [What moves to next phase?]

[Continue for each phase]

QA CHECKPOINTS:
  After Phase [X]: Check for [specific criteria]
  After Phase [Y]: Verify [alignment with goal]

EXPECTED TIME: [Total estimated duration]`}
              </div>
            </div>

            {/* Managing Context Across Stages */}
            <h2>Managing Context Across Stages</h2>
            <p>
              The biggest challenge in orchestration: keeping context coherent as you move between stages. Here's how to handle it:
            </p>

            <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Option 1: Single Session</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Keep all stages in one continuous AI conversation. Context stays intact automatically. Best for shorter workflows (2-4 stages).
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Option 2: Documented Handoffs</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Start fresh sessions but explicitly pass context: "Here's what we established in prior stages: [paste summary]." Best for longer workflows.
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Option 3: Context Document</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Maintain a running context doc that grows with each stage. Paste relevant sections as needed. Best for complex multi-day projects.
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">Option 4: Role Switching</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  In same session, explicitly tell AI to switch roles: "Now take on the role of [Critic] and review what we just created." Maintains all context.
                </p>
              </div>
            </div>

            {/* When Orchestration Makes Sense */}
            <h2>When Orchestration Makes Sense</h2>
            <p>
              Don't orchestrate everything. Use this approach when:
            </p>

            <ul>
              <li><strong>The work naturally has stages:</strong> Research, then analysis, then synthesis, etc.</li>
              <li><strong>Each stage benefits from different AI strengths:</strong> One part needs creativity, another needs rigor</li>
              <li><strong>Outputs build on each other:</strong> Later stages depend on insights from earlier ones</li>
              <li><strong>You need multiple perspectives:</strong> Different roles reviewing the same content</li>
              <li><strong>The stakes are high enough:</strong> The extra setup time pays off in quality</li>
            </ul>

            <div className="not-prose my-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="font-bold text-red-400 mb-2">When NOT to orchestrate:</p>
              <p className="text-sm text-[var(--text-secondary)]">
                Simple, one-shot tasks. Quick edits or drafts. Anything where the overhead of orchestration outweighs the benefit. Start simple, orchestrate when you hit the limits of single-task AI use.
              </p>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Your Orchestration Playbook</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 60 minutes<br />
                <strong>You'll need:</strong> A complex project you're currently working on (or planning)
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Define the End State (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">What's the final deliverable? Be specific about format, audience, and success criteria.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Map Component Tasks (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Break the work into distinct AI roles/capabilities. What different modes do you need?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Design the Flow (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Sketch the sequence. Which pattern fits? (Linear, Parallel, Iterative, Hub & Spoke)</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Define Handoffs (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For each phase, what output moves forward? How will you pass context?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">5</span>
                  <div>
                    <p className="font-bold">Run One Phase (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Test Phase 1 with AI. Does it produce what you need for Phase 2?</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-xs font-mono text-id8-orange mb-2">DELIVERABLE</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  An Orchestration Playbook: one-page map showing phases, roles, handoffs, and QA checkpoints. Use this as your template for complex AI workflows.
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
                  "The most powerful AI work happens through orchestration — coordinating multiple capabilities where outputs from one stage become inputs to the next.",
                  "The 5-Stage Pattern: Define End State → Map Components → Design Flow → Build Handoffs → Run QA Loops.",
                  "Different orchestration patterns fit different work: Linear Pipeline (strategic work), Parallel Synthesis (multi-perspective), Iterative Refinement (high-stakes), Hub & Spoke (rollouts).",
                  "Managing context is the key challenge. Options: single session, documented handoffs, context document, or role-switching within conversation.",
                  "Don't orchestrate everything — reserve it for complex, high-value work where the multi-stage approach creates compound value."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-id8-orange flex-shrink-0 mt-0.5"><CheckIcon /></span>
                    <span className="text-[var(--text-primary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Closing Story */}
            <p className="italic text-[var(--text-secondary)] border-l-2 border-id8-orange pl-4 mb-8">
              Elena's board presentation was approved. But the real win came three months later when she needed to do a similar analysis for a different risk domain. She pulled up her orchestration playbook, swapped in new context, and ran the same workflow in two days instead of three weeks. The playbook became her reusable system.
            </p>

            {/* Course Complete */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border-2 border-id8-orange rounded-xl text-center">
              <h2 className="text-3xl font-bold mb-4">You've Completed AI Partner Mastery</h2>
              <p className="text-lg text-[var(--text-secondary)] mb-6">
                You've moved from treating AI as a tool to orchestrating it as a thinking partner. You have frameworks, patterns, and systems that compound over time.
              </p>
              <p className="text-[var(--text-secondary)]">
                The difference between someone who's "used AI" and someone who's mastered AI partnership: you have repeatable systems. You don't start from scratch. You have playbooks.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Module Complete */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <ModuleComplete
              courseSlug="ai-partner-mastery"
              moduleSlug="module-8"
            />
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Link
                href="/academy/ai-partner-mastery/module-7"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: Workflow Integration
              </Link>
              <Link
                href="/academy"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Explore More Courses
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
