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

const RefreshIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
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
                href="/academy/ai-partner-mastery"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to AI Partner Mastery
              </Link>
            </m.div>

            <m.div variants={fadeUp}>
              <CourseProgress
                currentModule={4}
                totalModules={8}
                courseTitle="AI Partner Mastery"
              />
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
              Iterative Refinement
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "The first draft is never the final draft. The magic happens in the conversation between you and AI."
            </m.p>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg">

            {/* The Truth */}
            <div className="not-prose mb-12 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                The Truth
              </h2>
              <h3 className="text-2xl font-bold mb-4">AI Doesn't Get It Right The First Time</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Here's what beginners expect: "I'll write the perfect prompt, and AI will deliver perfect output."
                </p>
                <p>
                  Here's what actually happens: AI gives you something that's 70% right. You refine your input. AI gets you to 85%. You adjust again. Now you're at 95%. One more tweak, and you're done.
                </p>
                <p>
                  <strong>The people who are great with AI aren't great prompters.</strong> They're great iterators.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This module teaches you how to iterate like a pro.
                </p>
              </div>
            </div>

            {/* The One-Shot Trap */}
            <h2>The One-Shot Trap</h2>
            <p>
              Most frustration with AI comes from treating it like a one-shot tool:
            </p>

            <div className="not-prose my-8 p-5 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 mb-3 font-bold">The pattern that fails:</p>
              <div className="text-sm text-[var(--text-secondary)] space-y-3">
                <p><strong>You:</strong> [Write detailed prompt]</p>
                <p><strong>AI:</strong> [Generates response]</p>
                <p><strong>You:</strong> "This isn't quite right. Let me start over with a better prompt."</p>
                <p><strong>You:</strong> [Write new detailed prompt, slightly different]</p>
                <p><strong>AI:</strong> [Generates slightly different response]</p>
                <p><strong>You:</strong> "Still not right. Ugh, forget it."</p>
              </div>
            </div>

            <p>
              <strong>The problem:</strong> You're resetting every time instead of building on what worked. You're burning time reintroducing context instead of refining the output.
            </p>

            {/* The Refinement Loop */}
            <h2>The Refinement Loop</h2>
            <p>
              Great AI users treat every conversation as a loop, not a transaction. Here's the pattern:
            </p>

            <div className="not-prose my-8 space-y-4">
              {[
                {
                  step: "1",
                  title: "GENERATE",
                  desc: "Get AI to produce a first draft. Don't overthink it. The goal is to get something on the page."
                },
                {
                  step: "2",
                  title: "EVALUATE",
                  desc: "Review the output. What's working? What's missing? What's off-tone? Be specific."
                },
                {
                  step: "3",
                  title: "DIRECT",
                  desc: "Tell AI exactly what to change. Not 'make it better' — 'shorten paragraph 2, add more detail to the third point.'"
                },
                {
                  step: "4",
                  title: "REPEAT",
                  desc: "Loop until you're satisfied. Each iteration should get you 10-20% closer."
                }
              ].map((item, i) => (
                <div key={i} className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                      <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* See It In Action */}
            <h2>See It In Action</h2>
            <p>
              Let's walk through a real refinement loop. Task: Write a LinkedIn post about a client win.
            </p>

            <div className="not-prose my-8 space-y-6">
              {/* Round 1 */}
              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="text-xs font-mono text-id8-orange mb-3">ROUND 1: GENERATE</p>
                <div className="space-y-3 text-sm text-[var(--text-secondary)]">
                  <p><strong>You:</strong> "Write a LinkedIn post announcing we just helped Fundbridge (a fintech client) complete a brand strategy refresh. Use my collaboration protocol for tone and style."</p>
                  <p><strong>AI:</strong> [Generates a decent but generic post]</p>
                </div>
              </div>

              {/* Round 2 */}
              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="text-xs font-mono text-id8-orange mb-3">ROUND 2: EVALUATE + DIRECT</p>
                <div className="space-y-3 text-sm text-[var(--text-secondary)]">
                  <p><strong>You (evaluation):</strong> "This is solid, but it's leading with our accomplishment instead of the client's problem. And it's too formal for LinkedIn."</p>
                  <p><strong>You (direction):</strong> "Rewrite to: (1) Start with the problem Fundbridge was facing, (2) Make it conversational — like I'm explaining to a colleague, (3) End with a question to drive engagement."</p>
                  <p><strong>AI:</strong> [Generates improved version]</p>
                </div>
              </div>

              {/* Round 3 */}
              <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="text-xs font-mono text-id8-orange mb-3">ROUND 3: REFINE DETAILS</p>
                <div className="space-y-3 text-sm text-[var(--text-secondary)]">
                  <p><strong>You:</strong> "Great. Now (1) Make the opening line punchier — something that stops the scroll, (2) Cut the second paragraph by 30%, (3) Change the closing question to focus on founder-led branding, not branding in general."</p>
                  <p><strong>AI:</strong> [Delivers final version]</p>
                  <p><strong>You:</strong> "Perfect. This is ready to publish."</p>
                </div>
              </div>
            </div>

            <p>
              <strong>Notice:</strong> Three rounds. Each one is specific. Each one builds on the last. Total time: 8 minutes.
            </p>

            {/* The Feedback Formula */}
            <h2>The Feedback Formula</h2>
            <p>
              Vague feedback gets vague results. Specific feedback gets specific results. Here's the formula:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <div className="text-id8-orange mb-4 font-mono text-sm font-bold">THE FEEDBACK FORMULA</div>
              <div className="space-y-4">
                <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded">
                  <p className="font-bold mb-2">1. ACKNOWLEDGE WHAT WORKS</p>
                  <p className="text-sm text-[var(--text-secondary)]">"The structure is solid and the tone is right."</p>
                </div>
                <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded">
                  <p className="font-bold mb-2">2. IDENTIFY WHAT'S OFF</p>
                  <p className="text-sm text-[var(--text-secondary)]">"But paragraph 2 feels too technical for this audience."</p>
                </div>
                <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded">
                  <p className="font-bold mb-2">3. GIVE SPECIFIC DIRECTION</p>
                  <p className="text-sm text-[var(--text-secondary)]">"Rewrite paragraph 2 to explain the concept without jargon. Use an analogy if helpful."</p>
                </div>
              </div>
            </div>

            {/* Good vs Bad Feedback */}
            <h2>Good Feedback vs Bad Feedback</h2>

            <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="font-mono text-xs text-red-400 mb-3">BAD FEEDBACK (vague)</p>
                <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                  <li>"This isn't quite right."</li>
                  <li>"Make it better."</li>
                  <li>"It doesn't sound like me."</li>
                  <li>"Try again."</li>
                  <li>"More professional."</li>
                </ul>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="font-mono text-xs text-green-400 mb-3">GOOD FEEDBACK (specific)</p>
                <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                  <li>"The intro is too long. Cut it to two sentences."</li>
                  <li>"Use active voice in paragraph 3."</li>
                  <li>"Add a specific example to illustrate the second point."</li>
                  <li>"The tone is too casual for a client proposal."</li>
                  <li>"Replace the bullet list with a numbered sequence."</li>
                </ul>
              </div>
            </div>

            {/* The 3-Round Rule */}
            <h2>The 3-Round Rule</h2>
            <p>
              Most outputs reach 95% quality in three rounds:
            </p>

            <div className="not-prose my-8 p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-bold text-id8-orange mb-1">Round 1: Get the bones right</p>
                  <p className="text-[var(--text-secondary)]">Structure, key points, overall direction. Don't nitpick details yet.</p>
                </div>
                <div>
                  <p className="font-bold text-id8-orange mb-1">Round 2: Refine the substance</p>
                  <p className="text-[var(--text-secondary)]">Tone, depth, clarity. This is where you dial in what you actually want to say.</p>
                </div>
                <div>
                  <p className="font-bold text-id8-orange mb-1">Round 3: Polish the details</p>
                  <p className="text-[var(--text-secondary)]">Word choice, flow, final touches. The difference between good and great.</p>
                </div>
              </div>
            </div>

            <div className="not-prose my-8 p-4 bg-id8-orange/10 border border-id8-orange/30 rounded-lg">
              <p className="font-bold text-id8-orange mb-2">When to stop:</p>
              <p className="text-sm text-[var(--text-secondary)]">
                Stop when you'd be happy putting your name on it. If you're past round 5 and still not satisfied, the issue isn't refinement — you need to reset with clearer context or a different approach.
              </p>
            </div>

            {/* Advanced: The Comparison Technique */}
            <h2>Advanced: The Comparison Technique</h2>
            <p>
              Sometimes the best feedback is showing AI what you want by comparing to something else:
            </p>

            <div className="not-prose my-8 p-5 bg-green-500/10 border border-green-500/20 rounded-lg font-mono text-sm">
              <p className="text-green-400 mb-3">Example comparison prompt:</p>
              <div className="text-[var(--text-secondary)] whitespace-pre-wrap">
{`"Compare what you just wrote to this example I love:
[paste example]

Notice how the example:
- Uses short, punchy sentences
- Leads with the outcome, not the process
- Includes a personal anecdote

Rewrite your version to match those qualities, but keep the substance the same."`}
              </div>
            </div>

            {/* The Iteration Workflow */}
            <h2>Building Your Refinement Workflow</h2>
            <p>
              Create a reusable checklist for evaluating AI output. Here's a starting template:
            </p>

            <div className="not-prose my-8 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl font-mono text-xs">
              <div className="text-id8-orange mb-4 font-bold">REFINEMENT CHECKLIST</div>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <div>
                  <p className="font-bold mb-2">[ ] STRUCTURE</p>
                  <ul className="pl-4 space-y-1">
                    <li>- Does it follow the right format?</li>
                    <li>- Is the flow logical?</li>
                    <li>- Are sections in the right order?</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold mb-2">[ ] SUBSTANCE</p>
                  <ul className="pl-4 space-y-1">
                    <li>- Are the key points clear?</li>
                    <li>- Is there enough detail (but not too much)?</li>
                    <li>- Does it answer the actual question?</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold mb-2">[ ] TONE & VOICE</p>
                  <ul className="pl-4 space-y-1">
                    <li>- Does this sound like me?</li>
                    <li>- Is the formality level right for the audience?</li>
                    <li>- Any corporate jargon to remove?</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold mb-2">[ ] POLISH</p>
                  <ul className="pl-4 space-y-1">
                    <li>- Any awkward phrasing?</li>
                    <li>- Can I cut anything without losing meaning?</li>
                    <li>- Does the opening hook and closing stick?</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Common Refinement Patterns */}
            <h2>Common Refinement Patterns</h2>
            <p>
              Here are five refinement requests you'll use constantly:
            </p>

            <div className="not-prose my-8 space-y-3">
              {[
                {
                  pattern: "Make it shorter",
                  prompt: "Cut this by 30% without losing the core points."
                },
                {
                  pattern: "Make it more specific",
                  prompt: "Replace the generic examples with specific details from [context]."
                },
                {
                  pattern: "Adjust the tone",
                  prompt: "Rewrite this to be more [casual/formal/conversational/professional]."
                },
                {
                  pattern: "Restructure",
                  prompt: "Move the conclusion to the beginning and reorganize as: [new structure]."
                },
                {
                  pattern: "Add depth",
                  prompt: "Expand section 2 with more detail. Specifically, explain [what]."
                }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <p className="font-bold text-sm mb-1">{item.pattern}</p>
                  <p className="text-xs font-mono text-[var(--text-tertiary)]">"{item.prompt}"</p>
                </div>
              ))}
            </div>

            {/* When Iteration Fails */}
            <h2>When Iteration Fails</h2>
            <p>
              Sometimes, no amount of refinement gets you there. Signs it's time to reset:
            </p>

            <ul>
              <li>You're on round 6+ and still not satisfied</li>
              <li>Each iteration is making it worse, not better</li>
              <li>AI keeps misunderstanding your feedback</li>
              <li>You realize the initial approach was wrong</li>
            </ul>

            <div className="not-prose my-8 p-4 bg-id8-orange/10 border border-id8-orange/30 rounded-lg">
              <p className="font-bold text-id8-orange mb-2">How to reset gracefully:</p>
              <p className="text-sm text-[var(--text-secondary)] mb-3">
                "Let's start fresh. I realize the issue isn't the execution — I need to reframe the approach. Here's what I actually need..."
              </p>
              <p className="text-xs font-mono text-[var(--text-tertiary)]">
                Then share clearer context and a better-defined goal.
              </p>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <RefreshIcon />
                <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange">
                  Your Turn
                </h2>
              </div>
              <h3 className="text-2xl font-bold mb-4">Build: Your Refinement Workflow</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 45 minutes<br />
                <strong>You'll create:</strong> A personal refinement checklist and practice the 3-round loop
              </p>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-bold">BUILD YOUR CHECKLIST (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Customize the refinement checklist template for your work. What do you always check? What matters most?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-bold">PRACTICE: ROUND 1 (10 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Pick a real task. Get AI to generate a first draft. Don't worry if it's imperfect.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-bold">PRACTICE: ROUNDS 2-3 (15 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">Use your checklist to evaluate. Give specific feedback. Iterate to completion.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-id8-orange/20 text-id8-orange flex items-center justify-center font-bold">4</span>
                  <div>
                    <p className="font-bold">REFLECT (5 min)</p>
                    <p className="text-sm text-[var(--text-secondary)]">What feedback worked best? What would you do differently next time? Update your checklist.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <p className="text-sm font-bold mb-2">Pro tip:</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Save your best refinement prompts. If "cut this by 30% without losing key points" works great, reuse it. Build a library of proven feedback patterns.
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
                  "Great AI users aren't great prompters — they're great iterators. The magic happens in the refinement loop.",
                  "Use the 3-round rule: Get the bones right, refine the substance, polish the details.",
                  "Specific feedback gets specific results. Always tell AI exactly what to change and why.",
                  "Build on what works. Don't start over — iterate on the current output.",
                  "Know when to reset. If you're past round 5 and still not satisfied, the issue is context, not iteration."
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
              Sarah used to get frustrated when AI didn't nail it on the first try. Now she expects three rounds. She has a checklist. She gives specific feedback. And she gets to "publish-ready" in under 10 minutes, every time.
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
              moduleSlug="module-4"
              nextModulePath="/academy/ai-partner-mastery/module-5"
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
                href="/academy/ai-partner-mastery/module-3"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: Context Architecture
              </Link>
              <Link
                href="/academy/ai-partner-mastery"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Back to Course
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
