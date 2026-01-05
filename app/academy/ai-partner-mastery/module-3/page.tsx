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

const MessageCircleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
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
                href="/academy/ai-partner-mastery"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
              >
                <ArrowLeftIcon />
                Back to AI Partner Mastery
              </Link>
            </m.div>

            <m.div variants={fadeUp}>
              <CourseProgress
                currentModule={3}
                totalModules={8}
                courseTitle="AI Partner Mastery"
              />
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
              The Art of Conversation
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] italic"
            >
              "The best work happens when you stop asking and start talking."
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
              <h3 className="text-2xl font-bold mb-4">The 27-Message Breakthrough</h3>
              <div className="space-y-4 text-[var(--text-secondary)]">
                <p>
                  Marcus is a product designer at a Series A SaaS company. They're redesigning their onboarding flow, and he's stuck on a critical question: How do they collect user goals without making the signup process feel like an interrogation?
                </p>
                <p>
                  He's been in the same ChatGPT conversation for 45 minutes now. 27 messages deep. His coworker walks by and laughs: "Dude, just start over. You're confusing it."
                </p>
                <p>
                  But Marcus knows something his coworker doesn't: <strong>The conversation IS the work.</strong>
                </p>
                <p>
                  Message 1 was about survey design. Message 8 pivoted to progressive disclosure. Message 15 questioned whether they even needed upfront goals. Message 22 explored how games handle player motivation. Message 27 landed on a pattern neither Marcus nor the AI would have found alone.
                </p>
                <p className="font-bold text-[var(--text-primary)]">
                  This isn't a broken process. This is how breakthroughs happen.
                </p>
              </div>
            </div>

            {/* The Single-Prompt Trap */}
            <h2>The Single-Prompt Trap</h2>
            <p>
              Most people treat AI like a magic 8-ball: Shake it once, get an answer, done.
            </p>
            <p>
              When the answer isn't quite right, they do one of two things:
            </p>
            <ul>
              <li><strong>Start over</strong> — "Maybe if I phrase it differently..."</li>
              <li><strong>Give up</strong> — "I guess AI can't help with this."</li>
            </ul>
            <p>
              Both are wrong. The real power unlocks when you <em>stay in the conversation</em>.
            </p>

            <div className="not-prose my-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="font-mono text-sm text-red-400 mb-2">What starting over loses:</p>
              <ul className="text-[var(--text-secondary)] space-y-1 list-disc list-inside">
                <li>All the context you've built</li>
                <li>The AI's understanding of what you actually want</li>
                <li>The natural evolution of ideas</li>
                <li>The productive tangents that lead somewhere</li>
              </ul>
            </div>

            {/* Multi-Turn Mastery */}
            <h2>Multi-Turn Mastery: The Three Moves</h2>
            <p>
              Great AI conversations follow a pattern. Not rigid, but recognizable:
            </p>

            <div className="not-prose grid md:grid-cols-3 gap-4 my-8">
              {[
                {
                  title: "BUILD",
                  desc: "Add context, refine direction, layer in constraints"
                },
                {
                  title: "BRANCH",
                  desc: "Explore alternatives, test assumptions, follow tangents"
                },
                {
                  title: "CONVERGE",
                  desc: "Synthesize insights, make decisions, produce output"
                },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <h4 className="font-bold text-id8-orange mb-2">{item.title}</h4>
                  <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              ))}
            </div>

            <p>
              You're not meant to do all three in every conversation. But when you're doing real thinking work, you'll cycle through them naturally.
            </p>

            {/* Context Management */}
            <h2>Context Management: Your Working Memory</h2>
            <p>
              AI doesn't actually "remember" your conversation. It rereads the whole thing every time you send a message. This has implications:
            </p>

            <div className="not-prose my-8">
              <div className="grid gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="font-bold text-green-400 mb-2">What AI is good at remembering:</p>
                  <ul className="text-[var(--text-secondary)] space-y-1 text-sm list-disc list-inside">
                    <li>Facts you've stated ("Our users are primarily mobile")</li>
                    <li>Decisions you've made ("We're going with Option B")</li>
                    <li>The general thread of the conversation</li>
                    <li>Your tone and communication style</li>
                  </ul>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="font-bold text-yellow-400 mb-2">What gets fuzzy over time:</p>
                  <ul className="text-[var(--text-secondary)] space-y-1 text-sm list-disc list-inside">
                    <li>Details from 30+ messages ago</li>
                    <li>Which option was "Option A" vs "Option B"</li>
                    <li>Subtle nuances in earlier discussions</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3>The Memory Refresh Technique</h3>
            <p>
              When you feel the AI losing track, do a quick recap:
            </p>

            <div className="not-prose my-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg font-mono text-sm">
              <p className="text-green-400 mb-2">Marcus, Message 16:</p>
              <div className="text-[var(--text-secondary)] whitespace-pre-wrap">
{`Quick recap so we're aligned:
- We're designing for first-time users, mostly mobile
- We decided against a survey approach (feels like homework)
- We're exploring progressive disclosure instead
- The key question: How do we infer goals without asking directly?

Now let's look at...`}
              </div>
            </div>

            <p>
              This costs you 20 seconds. It saves minutes of confused back-and-forth.
            </p>

            {/* Building Momentum */}
            <h2>Building on AI Responses</h2>
            <p>
              The magic isn't in what AI says. It's in what you do with what AI says.
            </p>

            <h3>Pattern 1: The "Yes, And" Move</h3>
            <p>
              Borrowed from improv. Take AI's idea and extend it:
            </p>

            <div className="not-prose my-8 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg font-mono text-sm">
              <p className="text-id8-orange mb-2">AI suggests:</p>
              <p className="text-[var(--text-secondary)] mb-4">
                "You could track which features they explore first and use that to infer their goals."
              </p>
              <p className="text-green-400 mb-2">You respond:</p>
              <div className="text-[var(--text-secondary)] whitespace-pre-wrap">
{`I like this. And what if we made those first interactions deliberately open-ended?
Like instead of a tutorial, we give them 3 starter templates that represent different use cases.
Whichever they pick becomes the implied goal. Could we prototype what those templates would look like?`}
              </div>
            </div>

            <h3>Pattern 2: The Redirect</h3>
            <p>
              AI goes somewhere interesting but off-track. Steer it back:
            </p>

            <div className="not-prose my-8 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg font-mono text-sm">
              <p className="text-yellow-400 mb-2">You respond:</p>
              <div className="text-[var(--text-secondary)] whitespace-pre-wrap">
{`That's a solid approach for power users, but I want to stay focused on first-time users.
Let's table the advanced personalization for now. Back to the template idea...`}
              </div>
            </div>

            <h3>Pattern 3: The Contrast Request</h3>
            <p>
              Ask AI to show you the opposite or alternative:
            </p>

            <div className="not-prose my-8 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg font-mono text-sm">
              <div className="text-[var(--text-secondary)] whitespace-pre-wrap">
{`Show me the opposite approach: What if we DID ask directly but made it feel natural and conversational?
What would that look like?`}
              </div>
            </div>

            {/* The Conversation Flow */}
            <h2>Anatomy of a Great Conversation</h2>
            <p>
              Let's trace Marcus's actual 27-message thread:
            </p>

            <div className="not-prose my-8 space-y-3 text-sm">
              <div className="p-3 bg-[var(--bg-secondary)] border-l-2 border-blue-500">
                <p className="text-blue-400 mb-1">Messages 1-4: Exploration</p>
                <p className="text-[var(--text-secondary)]">Marcus shares the problem. AI suggests surveys. Marcus explains why that won't work. They agree on the core tension.</p>
              </div>
              <div className="p-3 bg-[var(--bg-secondary)] border-l-2 border-purple-500">
                <p className="text-purple-400 mb-1">Messages 5-11: Branching</p>
                <p className="text-[var(--text-secondary)]">AI offers 4 different approaches. Marcus picks one (progressive disclosure) and they go deep on it. Try a few variations.</p>
              </div>
              <div className="p-3 bg-[var(--bg-secondary)] border-l-2 border-yellow-500">
                <p className="text-yellow-400 mb-1">Messages 12-18: Tangent</p>
                <p className="text-[var(--text-secondary)]">Marcus asks about how games handle this. Productive detour into motivation design. Surfaces a key insight about "showing not asking."</p>
              </div>
              <div className="p-3 bg-[var(--bg-secondary)] border-l-2 border-green-500">
                <p className="text-green-400 mb-1">Messages 19-27: Convergence</p>
                <p className="text-[var(--text-secondary)]">They synthesize everything. Land on the template approach. Marcus asks for wireframe suggestions. AI helps structure them. Done.</p>
              </div>
            </div>

            <p>
              Notice: This isn't messy. It's <em>exploratory</em>. And that's exactly what complex problem-solving looks like.
            </p>

            {/* When to Branch vs When to Start Fresh */}
            <h2>When to Keep Going vs When to Start Fresh</h2>

            <div className="not-prose my-8">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="font-bold text-green-400 mb-3">Keep the conversation going when:</p>
                  <ul className="text-[var(--text-secondary)] space-y-2 text-sm">
                    <li className="flex gap-2"><span className="text-green-400">✓</span> You're building on previous ideas</li>
                    <li className="flex gap-2"><span className="text-green-400">✓</span> The context is still relevant</li>
                    <li className="flex gap-2"><span className="text-green-400">✓</span> You're in a productive flow</li>
                    <li className="flex gap-2"><span className="text-green-400">✓</span> The tangent connects to the main thread</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="font-bold text-red-400 mb-3">Start fresh when:</p>
                  <ul className="text-[var(--text-secondary)] space-y-2 text-sm">
                    <li className="flex gap-2"><span className="text-red-400">✗</span> You're pivoting to a totally different problem</li>
                    <li className="flex gap-2"><span className="text-red-400">✗</span> Earlier context is now misleading</li>
                    <li className="flex gap-2"><span className="text-red-400">✗</span> The conversation is truly stuck</li>
                    <li className="flex gap-2"><span className="text-red-400">✗</span> You want a totally fresh perspective</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Your Turn */}
            <div className="not-prose my-12 p-8 bg-gradient-to-br from-id8-orange/10 to-id8-orange/5 border border-id8-orange/30 rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Your Turn
              </h2>
              <h3 className="text-2xl font-bold mb-4">Build: Conversation Flow Templates</h3>
              <p className="text-[var(--text-secondary)] mb-6">
                <strong>Time needed:</strong> 60 minutes<br />
                <strong>You'll need:</strong> Access to ChatGPT, Claude, or similar AI
              </p>

              <div className="space-y-6">
                <div>
                  <p className="font-bold mb-3">Exercise 1: The 10-Turn Exploration (30 min)</p>
                  <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                    <p>Pick a real problem you're working on. Have a conversation with AI where you commit to at least 10 messages before producing anything final.</p>
                    <p className="font-mono bg-[var(--bg-secondary)] p-3 rounded">
                      Track: How does message 10 compare to what you would have gotten from message 1?
                    </p>
                  </div>
                </div>

                <div>
                  <p className="font-bold mb-3">Exercise 2: The Productive Tangent (15 min)</p>
                  <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                    <p>In an ongoing conversation, deliberately ask: "What's a completely different way to think about this?"</p>
                    <p>Follow that tangent for 3-4 messages. Then bring it back to your main thread.</p>
                  </div>
                </div>

                <div>
                  <p className="font-bold mb-3">Exercise 3: Build Your Flow Template (15 min)</p>
                  <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                    <p>Document your natural conversation pattern. When you're solving problems with AI, what's your typical flow?</p>
                    <div className="font-mono bg-[var(--bg-secondary)] p-3 rounded space-y-1">
                      <p>Example template:</p>
                      <p>1. Share problem + context</p>
                      <p>2. Get initial reactions</p>
                      <p>3. Explore 2-3 alternatives</p>
                      <p>4. Pick one and go deeper</p>
                      <p>5. Test edge cases</p>
                      <p>6. Request final output</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Techniques */}
            <div className="not-prose my-12 p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <h2 className="text-sm font-mono uppercase tracking-widest text-id8-orange mb-4">
                Advanced Techniques
              </h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <MessageCircleIcon />
                    The Context Anchor
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    Every 10-15 messages, drop a summary anchor:
                  </p>
                  <div className="font-mono text-sm bg-green-500/10 border border-green-500/20 p-3 rounded">
{`"So far we've established: [3-5 key points]. Now let's focus on..."`}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-2">The Perspective Shift</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    When stuck, ask AI to roleplay:
                  </p>
                  <div className="font-mono text-sm bg-green-500/10 border border-green-500/20 p-3 rounded">
{`"If you were a user seeing this for the first time, what would confuse you?"`}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-2">The Forcing Function</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    Force concrete outputs mid-conversation:
                  </p>
                  <div className="font-mono text-sm bg-green-500/10 border border-green-500/20 p-3 rounded">
{`"Before we go further, write out the exact wording we'd use for this button."`}
                  </div>
                </div>
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
                  "Long conversations aren't a bug—they're how breakthroughs happen. Stay in the thread.",
                  "AI doesn't truly remember, it rereads. Use recap messages to keep context sharp.",
                  "Master the three moves: Build context, Branch to explore, Converge to decide.",
                  "Build on responses with 'Yes, and'—the best ideas emerge from collaboration, not single prompts.",
                  "Know when to keep going (building on ideas) vs when to start fresh (totally new direction).",
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
              Marcus shipped the template-based onboarding. It tested 34% better than the old survey approach. But the real win? He now has a conversation flow he can reuse. The next design problem took 12 messages instead of 27. The one after that? Eight. He's not getting faster because AI is better. He's getting faster because he knows how to talk.
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
                href="/academy/ai-partner-mastery/module-2"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeftIcon />
                Previous: The Art of Context
              </Link>
              <Link
                href="/academy/ai-partner-mastery/module-4"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Complex Problem Decomposition
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
