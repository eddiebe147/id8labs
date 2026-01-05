'use client'

import { m } from '@/components/motion'
import Link from 'next/link'
import { useState } from 'react'

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
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const TerminalIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="4 17 10 11 4 5"/>
    <line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
)

const CopyIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
)

const CheckIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const SparkleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v1m0 16v1m-8-9H3m18 0h-1m-2.636-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707"/>
    <circle cx="12" cy="12" r="4"/>
  </svg>
)

const RefreshIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10"/>
    <polyline points="1 20 1 14 7 14"/>
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
  </svg>
)

const RewindIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="11 19 2 12 11 5 11 19"/>
    <polygon points="22 19 13 12 22 5 22 19"/>
  </svg>
)

const ZapIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)

const AlertIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)

// Copyable code block component
function CopyableCode({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      {label && (
        <div className="text-xs font-mono text-id8-orange mb-2">{label}</div>
      )}
      <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <pre className="text-[var(--text-secondary)] whitespace-pre-wrap">{code}</pre>
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:border-id8-orange/50"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  )
}

// "Try This Now" interactive section
function TryThisNow({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="my-8 p-6 bg-id8-orange/5 border-2 border-id8-orange/30 rounded-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-id8-orange/20 rounded-full flex items-center justify-center">
          <TerminalIcon />
        </div>
        <div>
          <span className="text-xs font-mono text-id8-orange uppercase tracking-wider">Hands-On Exercise</span>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">{title}</h3>
        </div>
      </div>
      {children}
    </div>
  )
}

// Mentor aside component
function MentorNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 p-4 bg-[var(--bg-secondary)] border-l-4 border-id8-orange rounded-r-lg">
      <div className="flex items-start gap-3">
        <div className="text-2xl">💡</div>
        <div className="text-[var(--text-secondary)] italic">{children}</div>
      </div>
    </div>
  )
}

export default function Module8Page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-zone-text">
        <div className="container">
          <m.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-3xl"
          >
            <m.div variants={fadeUp}>
              <Link
                href="/courses/claude-for-knowledge-workers"
                className="inline-flex items-center gap-2 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors mb-6"
              >
                <ArrowLeftIcon />
                Back to Course
              </Link>
            </m.div>

            <m.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-sm font-mono mb-6"
            >
              <span>Module 8</span>
              <span className="text-id8-orange/50">•</span>
              <span>40 min</span>
              <span className="text-id8-orange/50">•</span>
              <span>Hands-On</span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Managing Long Sessions
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] mb-4 leading-relaxed"
            >
              Keep Claude sharp during complex projects. Learn when to reset, how to rewind, and what to do when Claude seems confused.
            </m.p>

            <m.div
              variants={fadeUp}
              className="flex items-center gap-2 text-sm text-id8-orange bg-id8-orange/10 px-4 py-2 rounded-lg w-fit"
            >
              <SparkleIcon />
              <span>Open Claude — we'll practice these techniques together</span>
            </m.div>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Split Tab Callout */}
      <section className="py-4 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 border-b border-[var(--border)]">
        <div className="container">
          <div className="flex items-center justify-center gap-3 text-center">
            <span className="text-lg">✨</span>
            <p className="text-sm text-[var(--text-secondary)]">
              <span className="font-medium text-[var(--text-primary)]">Pro Tip:</span> Use your browser's Split Tab feature to follow along side-by-side with Claude Code open.
            </p>
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
              New
            </span>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">Why Long Sessions Get Messy</h2>

              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                You've been working with Claude for an hour. You've explored three different approaches, changed your mind twice, and now Claude seems... confused. It's referencing things from 30 messages ago that are no longer relevant. Sound familiar?
              </p>

              <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl mb-6">
                <p className="text-lg font-medium text-[var(--text-primary)] mb-4">Here's what's happening:</p>
                <p className="text-[var(--text-secondary)]">
                  Claude remembers <strong className="text-[var(--text-primary)]">everything</strong> in the conversation. That's usually good — but when you've gone down rabbit holes and changed direction, all that old context creates noise. Claude tries to honor all of it, even the stuff you've moved past.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <div className="text-id8-orange mb-2">
                    <AlertIcon />
                  </div>
                  <p className="font-bold text-[var(--text-primary)] mb-1">Context Pollution</p>
                  <p className="text-sm text-[var(--text-secondary)]">Old, irrelevant info clutters Claude's working memory</p>
                </div>
                <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <div className="text-id8-orange mb-2">
                    <AlertIcon />
                  </div>
                  <p className="font-bold text-[var(--text-primary)] mb-1">Conflicting Instructions</p>
                  <p className="text-sm text-[var(--text-secondary)]">You said "do X" then later "actually do Y" — both are still in context</p>
                </div>
                <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <div className="text-id8-orange mb-2">
                    <AlertIcon />
                  </div>
                  <p className="font-bold text-[var(--text-primary)] mb-1">Drift</p>
                  <p className="text-sm text-[var(--text-secondary)]">Small misunderstandings compound over many exchanges</p>
                </div>
              </div>

              <MentorNote>
                This isn't a flaw — it's how conversation works. You just need tools to manage it. Think of it like a whiteboard that never gets erased. Sometimes you need to wipe a section clean.
              </MentorNote>
            </m.div>
          </div>
        </div>
      </section>

      {/* The Three Tools */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Your Three Context Tools</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Master these and you'll never feel stuck in a messy session again.
            </p>

            <div className="space-y-6">
              {/* Tool 1: Escape */}
              <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-id8-orange/20 rounded-full flex items-center justify-center text-id8-orange">
                    <ZapIcon />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">1. Escape (Stop Mid-Action)</h3>
                    <p className="text-sm text-[var(--text-secondary)]">When Claude is doing something wrong, stop it immediately</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-[var(--text-secondary)]">
                    If Claude starts down the wrong path — writing the wrong thing, reading the wrong file, taking too long — you can interrupt it.
                  </p>
                  <div className="p-3 bg-[var(--bg-secondary)] rounded-lg">
                    <p className="text-sm font-mono text-id8-orange mb-1">How to do it:</p>
                    <p className="text-sm text-[var(--text-secondary)]">Press <kbd className="px-2 py-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded text-xs">Escape</kbd> or <kbd className="px-2 py-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded text-xs">Ctrl+C</kbd> while Claude is responding</p>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] italic">
                    Example: Claude starts writing a 2000-word essay when you wanted bullet points. Escape. Redirect.
                  </p>
                </div>
              </div>

              {/* Tool 2: Rewind */}
              <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-id8-orange/20 rounded-full flex items-center justify-center text-id8-orange">
                    <RewindIcon />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">2. Rewind (Go Back in Time)</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Undo the last few exchanges like they never happened</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-[var(--text-secondary)]">
                    Sometimes you realize the conversation went wrong 3 messages ago. Instead of trying to correct course, just go back.
                  </p>
                  <div className="p-3 bg-[var(--bg-secondary)] rounded-lg">
                    <p className="text-sm font-mono text-id8-orange mb-1">How to do it:</p>
                    <p className="text-sm text-[var(--text-secondary)]">Type <code className="px-2 py-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded text-xs">/undo</code> to remove the last exchange, or click the rewind icon next to a message</p>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] italic">
                    Example: You gave Claude wrong context and it's been building on that mistake. Rewind to before you gave it, provide correct context, continue.
                  </p>
                </div>
              </div>

              {/* Tool 3: Compact/Reset */}
              <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-id8-orange/20 rounded-full flex items-center justify-center text-id8-orange">
                    <RefreshIcon />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">3. Compact / Fresh Start</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Summarize and compress, or start completely fresh</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-[var(--text-secondary)]">
                    After a long exploration, you know what you want. Compact the conversation to just the essentials, or start a new session with a clear brief.
                  </p>
                  <div className="p-3 bg-[var(--bg-secondary)] rounded-lg">
                    <p className="text-sm font-mono text-id8-orange mb-1">How to do it:</p>
                    <p className="text-sm text-[var(--text-secondary)]">Type <code className="px-2 py-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded text-xs">/compact</code> to summarize context, or start a new conversation entirely</p>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] italic">
                    Example: You've explored 5 approaches and settled on one. Compact removes the 4 rejected approaches from context.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Try This Now: The Tools */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <TryThisNow title="Practice the Three Tools">
              <p className="text-[var(--text-secondary)] mb-4">
                Let's practice each tool so you know how they feel. Open Claude and try these:
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                  <p className="font-bold text-[var(--text-primary)] mb-2">1. Practice Escape</p>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    Ask Claude to write something long, then interrupt it:
                  </p>
                  <CopyableCode code={`Write a detailed 1000-word essay about the history of coffee.`} />
                  <p className="text-sm text-[var(--text-secondary)] mt-2">
                    As soon as it starts, press Escape or Ctrl+C. Notice how you can stop it mid-sentence.
                  </p>
                </div>

                <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                  <p className="font-bold text-[var(--text-primary)] mb-2">2. Practice Rewind</p>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    Have a short exchange, then undo it:
                  </p>
                  <CopyableCode code={`Tell me a joke about programmers.`} />
                  <p className="text-sm text-[var(--text-secondary)] mt-2">
                    After Claude responds, type <code className="px-1 bg-[var(--bg-primary)] rounded">/undo</code>. The joke exchange disappears — Claude no longer remembers it.
                  </p>
                </div>

                <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                  <p className="font-bold text-[var(--text-primary)] mb-2">3. Practice Compact</p>
                  <p className="text-sm text-[var(--text-secondary)] mb-2">
                    After a few exchanges, compress the context:
                  </p>
                  <CopyableCode code={`/compact`} />
                  <p className="text-sm text-[var(--text-secondary)] mt-2">
                    Claude will summarize everything discussed. Now you have a clean, focused context.
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-sm text-[var(--text-primary)] font-medium">Success looks like:</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  You can confidently stop, rewind, or reset any session. No more feeling trapped in messy conversations.
                </p>
              </div>
            </TryThisNow>
          </div>
        </div>
      </section>

      {/* When to Use Each Tool */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">When to Use Each Tool</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-3 px-4 font-bold text-[var(--text-primary)]">Situation</th>
                    <th className="text-left py-3 px-4 font-bold text-[var(--text-primary)]">Tool</th>
                    <th className="text-left py-3 px-4 font-bold text-[var(--text-primary)]">Why</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Claude is writing the wrong format</td>
                    <td className="py-3 px-4"><span className="text-id8-orange font-mono">Escape</span></td>
                    <td className="py-3 px-4">Stop immediately, redirect</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">I gave wrong instructions 2 messages ago</td>
                    <td className="py-3 px-4"><span className="text-id8-orange font-mono">Rewind</span></td>
                    <td className="py-3 px-4">Undo the mistake, try again</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">We explored 5 options, picked one</td>
                    <td className="py-3 px-4"><span className="text-id8-orange font-mono">Compact</span></td>
                    <td className="py-3 px-4">Remove rejected options from context</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Session has been going for 2 hours</td>
                    <td className="py-3 px-4"><span className="text-id8-orange font-mono">Compact</span></td>
                    <td className="py-3 px-4">Summarize to keep context fresh</td>
                  </tr>
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 px-4">Claude seems confused about what I want</td>
                    <td className="py-3 px-4"><span className="text-id8-orange font-mono">Fresh Start</span></td>
                    <td className="py-3 px-4">Clean slate with clear instructions</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">I want to try a completely different approach</td>
                    <td className="py-3 px-4"><span className="text-id8-orange font-mono">Fresh Start</span></td>
                    <td className="py-3 px-4">Old approach would pollute new thinking</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <MentorNote>
              I used to push through messy sessions, trying to "correct" Claude with more instructions. Now I recognize when it's faster to just reset. Don't be afraid to use these tools — they're not admitting failure, they're smart workflow management.
            </MentorNote>
          </div>
        </div>
      </section>

      {/* The Strategic Reset */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">The Strategic Reset: Start Fresh With Context</h2>

            <p className="text-[var(--text-secondary)] mb-6">
              Sometimes the best move is starting a new conversation entirely. But here's the key: <strong className="text-[var(--text-primary)]">you bring the lessons learned with you.</strong>
            </p>

            <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl mb-6">
              <p className="font-bold text-[var(--text-primary)] mb-4">The Strategic Reset Pattern:</p>
              <ol className="space-y-3 text-[var(--text-secondary)]">
                <li className="flex gap-3">
                  <span className="text-id8-orange font-mono">1.</span>
                  <span>Before you reset, ask Claude: "Summarize what we've figured out so far in 3-4 bullet points."</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-id8-orange font-mono">2.</span>
                  <span>Copy that summary.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-id8-orange font-mono">3.</span>
                  <span>Start a new conversation.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-id8-orange font-mono">4.</span>
                  <span>Begin with: "Here's where I am on [project]: [paste summary]. Now I want to [next step]."</span>
                </li>
              </ol>
            </div>

            <TryThisNow title="Practice the Strategic Reset">
              <p className="text-[var(--text-secondary)] mb-4">
                Imagine you've been exploring a project with Claude and want to start fresh. Use this pattern:
              </p>

              <CopyableCode
                label="Step 1: Get the summary (in current session)"
                code={`Before we continue, summarize what we've figured out so far:
- What decisions have we made?
- What approach are we taking?
- What's the current status?

Give me 3-4 bullet points I can use to start a fresh session.`}
              />

              <div className="mt-4 mb-4 p-3 bg-[var(--bg-secondary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">Then:</strong> Copy the summary, start a new conversation, and begin with context.
                </p>
              </div>

              <CopyableCode
                label="Step 2: Start fresh (in new session)"
                code={`Here's where I am on [PROJECT]:

[PASTE YOUR SUMMARY HERE]

Now I want to [NEXT STEP]. Let's pick up from here with a clear focus.`}
              />
            </TryThisNow>
          </div>
        </div>
      </section>

      {/* Signs You Need to Reset */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Signs You Need a Reset</h2>

            <p className="text-[var(--text-secondary)] mb-6">
              Learn to recognize these signals — they mean it's time to use your context tools:
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-[var(--bg-primary)] border border-red-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">⚠️</span>
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">"Claude keeps referencing old things I've moved past"</p>
                    <p className="text-sm text-[var(--text-secondary)]">Use: <span className="text-id8-orange font-mono">Compact</span> or <span className="text-id8-orange font-mono">Fresh Start</span></p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-primary)] border border-red-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">⚠️</span>
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">"I have to repeat myself constantly"</p>
                    <p className="text-sm text-[var(--text-secondary)]">Use: <span className="text-id8-orange font-mono">Compact</span> to surface key decisions</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-primary)] border border-red-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">⚠️</span>
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">"Claude seems to contradict itself"</p>
                    <p className="text-sm text-[var(--text-secondary)]">Use: <span className="text-id8-orange font-mono">Rewind</span> to before the contradiction, or <span className="text-id8-orange font-mono">Fresh Start</span></p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-primary)] border border-red-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">⚠️</span>
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">"The outputs are getting worse, not better"</p>
                    <p className="text-sm text-[var(--text-secondary)]">Use: <span className="text-id8-orange font-mono">Fresh Start</span> with a clear, specific brief</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[var(--bg-primary)] border border-red-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">⚠️</span>
                  <div>
                    <p className="font-bold text-[var(--text-primary)]">"I feel frustrated and stuck"</p>
                    <p className="text-sm text-[var(--text-secondary)]">Use: <span className="text-id8-orange font-mono">Fresh Start</span> — your frustration signals the context is polluted</p>
                  </div>
                </div>
              </div>
            </div>

            <MentorNote>
              The best sessions aren't the ones without resets — they're the ones where you recognize quickly when a reset is needed. It's like driving: the best drivers aren't the ones who never brake, they're the ones who brake at the right times.
            </MentorNote>
          </div>
        </div>
      </section>

      {/* Proactive Session Hygiene */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Proactive Session Hygiene</h2>

            <p className="text-[var(--text-secondary)] mb-6">
              Don't wait until things are messy. Build these habits into your workflow:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">🕐 The 30-Minute Check</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Every 30 minutes of work, ask: "Is this conversation still focused? Do we need to compact?"
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">🎯 One Task, One Session</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  When switching to a completely different task, consider starting fresh rather than continuing.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">📝 Decision Checkpoints</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  When you make a key decision, confirm it: "So we're going with [X], correct? Let's proceed on that basis."
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">🧹 End-of-Exploration Compact</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  After exploring options, compact before implementing: "We explored A, B, C. We chose B. Summarize why and let's proceed."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Key Takeaways</h2>

            <div className="space-y-3">
              {[
                { num: 1, text: "Long sessions accumulate context — some helpful, some noise. You need tools to manage it." },
                { num: 2, text: "Escape stops Claude mid-action. Rewind undoes exchanges. Compact summarizes and clears." },
                { num: 3, text: "Strategic resets (fresh start with summary) beat pushing through messy contexts." },
                { num: 4, text: "Watch for warning signs: repetition, contradiction, declining quality, frustration." },
                { num: 5, text: "Proactive hygiene (30-min checks, one task per session) prevents most context problems." },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-3 p-3 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)]">
                  <span className="w-6 h-6 flex items-center justify-center bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-xs font-mono flex-shrink-0">
                    {item.num}
                  </span>
                  <p className="text-sm text-[var(--text-primary)]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Next */}
      <section className="section-spacing bg-id8-orange/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Now you can manage context within a session. But what about between sessions? How do you make Claude remember your projects, your preferences, your way of working?
            </p>
            <p className="text-lg text-[var(--text-primary)]">
              In <strong>Module 9: Project Memory</strong>, we'll learn how to create persistent context that survives across sessions — so Claude always knows your projects.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Link
                href="/courses/claude-for-knowledge-workers/module-7"
                className="btn bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeftIcon />
                Previous: Connecting Your Tools
              </Link>
              <Link
                href="/courses/claude-for-knowledge-workers/module-9"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Project Memory
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
