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

const WorkflowIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
  </svg>
)

export default function Module7Page() {
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
                currentModule={7}
                totalModules={8}
                courseTitle="AI Partner Mastery"
              />
            </m.div>

            <m.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider bg-id8-orange/20 text-id8-orange rounded">
                Module 7
              </span>
              <span className="text-sm font-mono text-[var(--text-tertiary)]">
                60 min
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Workflow Integration
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "AI is great... when I remember to use it. How do I make it part of how I actually work?"
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
              <h3 className="text-2xl font-bold mb-4">Meet Jordan Kim</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Jordan is a product manager at a fast-growing SaaS company. She's been through every module of this course. She's built frameworks, created QA checklists, practiced decomposition. She knows the techniques work.
                </p>
                <p>
                  But here's what actually happens on a Tuesday morning:
                </p>
                <p>
                  9:00 AM — Customer escalation email. Jordan types a quick response herself. Sends it. Only later realizes AI could have helped her think through the edge cases.
                </p>
                <p>
                  10:30 AM — Product roadmap planning meeting. Stakeholders debating priorities. Jordan takes notes manually. Forgets that AI could help her synthesize different perspectives in real-time.
                </p>
                <p>
                  2:00 PM — Writing release notes. Stares at blank doc for 10 minutes. Then remembers: "Oh, right. I could use AI for this." Spends 5 minutes finding her prompts from last time.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  Jordan doesn't have a skill problem. She has a workflow problem.
                </p>
                <p>
                  The gap isn't knowing how to use AI. It's making AI use automatic — embedded into the actual flow of her day, not something she has to remember to do.
                </p>
              </div>
            </div>

            {/* The Core Challenge */}
            <h2>The Core Challenge</h2>
            <p>
              Most people treat AI like a separate tool they go to when they think of it. Like opening a different app. This creates friction: <strong>you have to remember, context-switch, and manually translate between your work and the AI interaction.</strong>
            </p>
            <p>
              The result? AI use stays episodic. You use it for big tasks when you're intentional, but miss 80% of the opportunities in your daily flow.
            </p>

            <div className="not-prose my-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="font-bold text-red-400 mb-2">The Integration Gap</p>
              <p className="text-sm text-[var(--text-secondary)]">
                Knowing the techniques ≠ Using them automatically. Until AI is woven into your actual workflow, it stays optional. And optional means it gets dropped when you're busy.
              </p>
            </div>

            <p>
              The goal of this module: <strong>Turn AI from a tool you use to a layer in how you work.</strong>
            </p>

            {/* The Workflow Integration Map */}
            <h2>The Workflow Integration Map</h2>
            <p>
              This framework helps you identify where AI belongs in your actual daily practice. Not aspirationally — where it actually makes sense.
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="flex items-center gap-2 mb-6">
                <WorkflowIcon />
                <h3 className="text-xl font-bold">The 4 Integration Points</h3>
              </div>
              <div className="space-y-6">
                <div className="border-l-4 border-id8-orange pl-4">
                  <h4 className="font-bold text-lg mb-2">1. Trigger Points</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    Moments in your workflow where using AI should be automatic
                  </p>
                  <div className="text-xs font-mono bg-[var(--bg-primary)] p-3 rounded space-y-1">
                    <p><strong>Example triggers:</strong></p>
                    <p>• Before responding to a complex email</p>
                    <p>• When starting to draft any document</p>
                    <p>• After a meeting, before writing summary</p>
                    <p>• When facing a "blank page" moment</p>
                  </div>
                </div>

                <div className="border-l-4 border-id8-orange pl-4">
                  <h4 className="font-bold text-lg mb-2">2. Template Slots</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    Recurring work where you reuse the same AI pattern
                  </p>
                  <div className="text-xs font-mono bg-[var(--bg-primary)] p-3 rounded space-y-1">
                    <p><strong>Create templates for:</strong></p>
                    <p>• Weekly status reports</p>
                    <p>• Project kickoff documents</p>
                    <p>• Client communications</p>
                    <p>• Decision frameworks</p>
                  </div>
                </div>

                <div className="border-l-4 border-id8-orange pl-4">
                  <h4 className="font-bold text-lg mb-2">3. Review Checkpoints</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    Natural moments to use AI for quality check or second opinion
                  </p>
                  <div className="text-xs font-mono bg-[var(--bg-primary)] p-3 rounded space-y-1">
                    <p><strong>Built-in review points:</strong></p>
                    <p>• Before hitting send on important emails</p>
                    <p>• After first draft, before sharing</p>
                    <p>• When something feels off but you can't say why</p>
                    <p>• Before finalizing decisions</p>
                  </div>
                </div>

                <div className="border-l-4 border-id8-orange pl-4">
                  <h4 className="font-bold text-lg mb-2">4. Context Capture</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    Systems to preserve context so you don't start from zero each time
                  </p>
                  <div className="text-xs font-mono bg-[var(--bg-primary)] p-3 rounded space-y-1">
                    <p><strong>What to capture:</strong></p>
                    <p>• Your best prompts and patterns</p>
                    <p>• Project-specific context docs</p>
                    <p>• Examples of "known good" outputs</p>
                    <p>• Common scenarios + approaches</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Building Your Personal Integration Map */}
            <h2>Building Your Personal Integration Map</h2>
            <p>
              Here's the step-by-step process Jordan used to embed AI into her actual workflow:
            </p>

            <h3>Step 1: Map Your Weekly Workflow</h3>
            <p>
              Jordan listed every recurring task type in a typical week:
            </p>

            <div className="not-prose my-8 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg font-mono text-xs">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left">
                    <th className="py-2 px-2 text-id8-orange">Task</th>
                    <th className="py-2 px-2 text-id8-orange">Frequency</th>
                    <th className="py-2 px-2 text-id8-orange">Time Spent</th>
                    <th className="py-2 px-2 text-id8-orange">AI Potential</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-2 px-2">Customer escalations</td>
                    <td className="py-2 px-2">3-5/week</td>
                    <td className="py-2 px-2">30min each</td>
                    <td className="py-2 px-2 text-green-400">HIGH</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-2 px-2">Release notes</td>
                    <td className="py-2 px-2">1/week</td>
                    <td className="py-2 px-2">2 hours</td>
                    <td className="py-2 px-2 text-green-400">HIGH</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-2 px-2">Meeting summaries</td>
                    <td className="py-2 px-2">5/week</td>
                    <td className="py-2 px-2">15min each</td>
                    <td className="py-2 px-2 text-green-400">HIGH</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2">Feature specs</td>
                    <td className="py-2 px-2">2/month</td>
                    <td className="py-2 px-2">4 hours</td>
                    <td className="py-2 px-2 text-yellow-400">MEDIUM</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>Step 2: Identify Trigger Points</h3>
            <p>
              For each high-potential task, Jordan defined the exact moment AI should kick in:
            </p>

            <div className="not-prose my-8 space-y-3">
              <div className="p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded">
                <p className="font-bold text-sm mb-1">Customer Escalations</p>
                <p className="text-xs text-[var(--text-secondary)]"><strong>Trigger:</strong> When escalation email arrives, before typing response</p>
                <p className="text-xs text-[var(--text-secondary)]"><strong>AI Action:</strong> Analyze email, suggest response framework, identify edge cases</p>
              </div>
              <div className="p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded">
                <p className="font-bold text-sm mb-1">Release Notes</p>
                <p className="text-xs text-[var(--text-secondary)]"><strong>Trigger:</strong> When opening blank release notes doc</p>
                <p className="text-xs text-[var(--text-secondary)]"><strong>AI Action:</strong> Generate first draft from feature list, then I refine</p>
              </div>
              <div className="p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded">
                <p className="font-bold text-sm mb-1">Meeting Summaries</p>
                <p className="text-xs text-[var(--text-secondary)]"><strong>Trigger:</strong> Immediately after meeting, while notes are fresh</p>
                <p className="text-xs text-[var(--text-secondary)]"><strong>AI Action:</strong> Turn raw notes into structured summary with action items</p>
              </div>
            </div>

            <h3>Step 3: Create Template Slots</h3>
            <p>
              Jordan built prompt templates for recurring tasks and saved them where she works:
            </p>

            <div className="not-prose my-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg font-mono text-sm">
              <p className="text-green-400 mb-4">Example: Customer Escalation Template</p>
              <div className="text-[var(--text-secondary)] space-y-4 whitespace-pre-wrap">
{`CUSTOMER ESCALATION ANALYZER

Customer email:
[paste email]

Our product context:
- SaaS project management tool
- Customer is on Enterprise plan
- Recent changes: new integrations feature

Help me:
1. Identify the root issue (what they said vs. what they need)
2. Suggest a response framework
3. Flag any edge cases or risks in my response
4. Draft talking points for technical follow-up`}
              </div>
            </div>

            <h3>Step 4: Set Review Checkpoints</h3>
            <p>
              Jordan added AI review as a mandatory step before key handoffs:
            </p>

            <ul>
              <li><strong>Before sending customer-facing communications:</strong> Run through AI for tone check and edge case review</li>
              <li><strong>Before sharing strategy docs:</strong> Ask AI to critique assumptions and logic</li>
              <li><strong>Before final decision on roadmap:</strong> Use AI to pressure-test reasoning</li>
            </ul>

            {/* The Implementation Strategy */}
            <h2>The Implementation Strategy</h2>
            <p>
              Don't try to integrate AI everywhere at once. Jordan used this phased approach:
            </p>

            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4 text-id8-orange">Phase</th>
                    <th className="text-left py-3 px-4 text-id8-orange">Focus</th>
                    <th className="text-left py-3 px-4 text-id8-orange">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-semibold">Week 1</td>
                    <td className="py-3 px-4">Pick ONE high-frequency task. Make AI use mandatory for that task only.</td>
                    <td className="py-3 px-4">7 days</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-semibold">Week 2</td>
                    <td className="py-3 px-4">Refine that workflow based on what worked. Add ONE more task type.</td>
                    <td className="py-3 px-4">7 days</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4 font-semibold">Week 3-4</td>
                    <td className="py-3 px-4">Layer in review checkpoints. Make AI critique a habit before handoffs.</td>
                    <td className="py-3 px-4">14 days</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">Month 2</td>
                    <td className="py-3 px-4">Expand to remaining high-potential tasks. Build context capture system.</td>
                    <td className="py-3 px-4">30 days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Making It Stick: Environmental Design */}
            <h2>Making It Stick: Environmental Design</h2>
            <p>
              Jordan made three environmental changes to reduce friction:
            </p>

            <div className="not-prose my-8 grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">1. Prompt Library</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Saved best prompts in a searchable doc. Tagged by task type. No more "where was that good prompt I used?"
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">2. Desktop Shortcut</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  AI tool pinned to browser toolbar. Keyboard shortcut to open it. Removed "I forgot to open it" friction.
                </p>
              </div>
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <h4 className="font-bold mb-2">3. Context Docs</h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  Created standing context files for major projects. Copy-paste context instead of retyping every time.
                </p>
              </div>
            </div>

            {/* Measuring Integration Success */}
            <h2>Measuring Integration Success</h2>
            <p>
              How do you know if AI is actually integrated vs. still optional? Track these signals:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h3 className="font-bold mb-4">Good Integration Looks Like:</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li>✓ You use AI without consciously deciding to use it</li>
                <li>✓ You feel friction when you CAN'T use AI for something</li>
                <li>✓ Your workflows have AI built into the steps, not added after</li>
                <li>✓ You stop thinking "I should use AI for this" — you just do</li>
                <li>✓ Time saved compounds week over week</li>
              </ul>
              <h3 className="font-bold mt-6 mb-4">Poor Integration Looks Like:</h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li>✗ You finish tasks and then remember "I could have used AI"</li>
                <li>✗ AI use drops when you're busy (exactly when you need it most)</li>
                <li>✗ You re-solve the same problems because you didn't capture patterns</li>
                <li>✗ Using AI still feels like a separate activity</li>
                <li>✗ You can't explain your AI workflow to someone else</li>
              </ul>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Your Workflow Integration Map</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 60 minutes<br />
                <strong>You'll need:</strong> Your calendar/task list for a typical week
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">Map Weekly Tasks (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">List all recurring tasks. Note frequency, time spent, and AI potential (high/medium/low).</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">Define Trigger Points (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">For top 3 high-potential tasks, specify the exact moment AI should activate.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">Create Template Slots (20 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Build prompt templates for your most common scenarios. Save them somewhere accessible.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">Set Review Checkpoints (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Identify 2-3 natural review points where AI should verify your work.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] rounded-lg">
                <p className="text-xs font-mono text-id8-orange mb-2">DELIVERABLE</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  A one-page Workflow Integration Map showing trigger points, templates, and checkpoints. Start with ONE task this week.
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
                  "Knowing AI techniques doesn't mean you'll use them. Until AI is embedded in your workflow, it stays optional — and optional gets dropped.",
                  "The 4 Integration Points: Trigger Points (when AI activates), Template Slots (reusable patterns), Review Checkpoints (QA moments), Context Capture (don't start from zero).",
                  "Don't integrate everywhere at once. Start with ONE high-frequency task, make AI mandatory for it, then expand gradually.",
                  "Reduce friction through environmental design: prompt libraries, shortcuts, standing context documents.",
                  "Good integration means you stop thinking about using AI — it becomes the natural way you work."
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
              Six weeks after building her integration map, Jordan stopped tracking whether she used AI. It had become automatic. Customer escalations that used to take 30 minutes now take 12. Release notes that took 2 hours take 45 minutes. But more importantly, the mental load dropped. She's not making the same decisions over and over. The workflow thinks for her.
            </p>

          </div>
        </div>
      </section>

      {/* Module Complete */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <ModuleComplete
              courseSlug="ai-partner-mastery"
              moduleSlug="module-7"
              nextModulePath="/academy/ai-partner-mastery/module-8"
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
                href="/academy/ai-partner-mastery/module-6"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: Quality Assurance Patterns
              </Link>
              <Link
                href="/academy/ai-partner-mastery/module-8"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Advanced Orchestration
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
