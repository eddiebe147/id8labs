'use client'

import { m } from '@/components/motion'
import Link from 'next/link'
import { useState } from 'react'
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

const FolderIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
  </svg>
)

const LightbulbIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6M10 22h4M12 2v1M4.93 4.93l.7.7M2 12h1M4.93 19.07l.7-.7M12 17a5 5 0 100-10 5 5 0 000 10z"/>
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

export default function Module6Page() {
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
              <span>Module 6</span>
              <span className="text-id8-orange/50">•</span>
              <span>45 min</span>
              <span className="text-id8-orange/50">•</span>
              <span>Hands-On</span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Custom Commands
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] mb-4 leading-relaxed"
            >
              Save your best prompts as reusable commands. Type one word, get consistent results every time.
            </m.p>

            <m.div
              variants={fadeUp}
              className="flex items-center gap-2 text-sm text-id8-orange bg-id8-orange/10 px-4 py-2 rounded-lg w-fit"
            >
              <SparkleIcon />
              <span>Open Claude in another window — you'll be building alongside this lesson</span>
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

      {/* The Setup */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">What We're Learning (And Why It Matters)</h2>

              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                Remember in Module 5 when we talked about templates? Custom commands are templates that live inside Claude itself. Instead of copying and pasting your best prompts, you save them as commands.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="font-bold text-[var(--text-primary)] mb-2">Before: The Copy-Paste Life</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    "Where did I save that prompt? Let me search my notes... Found it. Copy. Paste. Fill in the blanks. Hope I got the latest version."
                  </p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="font-bold text-[var(--text-primary)] mb-2">After: One Word</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Type <code className="bg-[var(--bg-secondary)] px-1 rounded">/weekly-review</code> and Claude knows exactly what you want. Same great results, every time.
                  </p>
                </div>
              </div>

              <MentorNote>
                Here's something I wish someone told me earlier: the best prompts you'll ever write are the ones you've refined through use. Custom commands let you lock in those refinements so you never lose them.
              </MentorNote>
            </m.div>
          </div>
        </div>
      </section>

      {/* Watch Me First */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <LightbulbIcon />
              </span>
              <h2 className="text-2xl font-bold">Watch Me First: Creating My Writing Review Command</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              Let me show you how I created a command I use every single day. I'll walk through my actual process so you can see how it works.
            </p>

            <div className="space-y-6">
              <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <p className="text-sm font-mono text-id8-orange mb-2">Step 1: I noticed a pattern</p>
                <p className="text-[var(--text-secondary)]">
                  Every time I finished a draft, I was asking Claude the same thing: "Read this and tell me where it loses momentum, where the argument is weak, and what a skeptical reader would push back on." Same prompt, different drafts.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <p className="text-sm font-mono text-id8-orange mb-2">Step 2: I refined the prompt through use</p>
                <p className="text-[var(--text-secondary)]">
                  Over a few weeks, I added things: "Give me specific line numbers." "Don't sugarcoat it." "Prioritize the top 3 issues." Each draft made the prompt better.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <p className="text-sm font-mono text-id8-orange mb-2">Step 3: I saved it as a command</p>
                <p className="text-[var(--text-secondary)]">
                  Once the prompt was battle-tested, I created a file called <code className="bg-[var(--bg-secondary)] px-1 rounded">review-draft.md</code> in my <code className="bg-[var(--bg-secondary)] px-1 rounded">.claude/commands/</code> folder. Now I just type <code className="bg-[var(--bg-secondary)] px-1 rounded">/review-draft</code> and it runs my refined prompt.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm font-mono text-id8-orange mb-3">Here's my actual command file:</p>
              <CopyableCode
                code={`# Review Draft

You are my tough-but-fair editor. Read the draft I'm about to share and give me honest feedback.

Focus on:
1. **Momentum** - Where does the piece drag? Where might readers stop reading?
2. **Argument strength** - Where am I hand-waving instead of proving?
3. **Skeptic check** - What would a critical reader push back on?

Format your response as:
- Top 3 issues (most important first)
- Specific line-by-line notes
- One thing that's working well (so I don't accidentally cut it)

Don't sugarcoat. I'd rather fix problems now than publish weak work.

$ARGUMENTS`}
              />
            </div>

            <MentorNote>
              See that <code className="bg-[var(--bg-secondary)] px-1 rounded">$ARGUMENTS</code> at the end? That's a placeholder. When I type <code className="bg-[var(--bg-secondary)] px-1 rounded">/review-draft my-article.md</code>, Claude replaces $ARGUMENTS with "my-article.md". Your input goes right where you need it.
            </MentorNote>
          </div>
        </div>
      </section>

      {/* Try This Now #1 */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <TryThisNow title="Create Your Commands Folder">
              <p className="text-[var(--text-secondary)] mb-4">
                Let's set up the folder where your commands will live. Open Claude and paste this:
              </p>

              <CopyableCode
                code={`Create a folder at ~/.claude/commands/ if it doesn't exist.

Then create a simple test command file called hello.md with this content:

---
Say hello and tell me one interesting fact about the current season.
$ARGUMENTS
---

Confirm when done.`}
              />

              <div className="mt-4 p-4 bg-[var(--bg-secondary)] rounded-lg">
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong className="text-[var(--text-primary)]">What just happened:</strong> You created the folder where all your custom commands will live. The <code className="bg-[var(--bg-primary)] px-1 rounded">.claude</code> folder is a hidden folder in your home directory — it's where Claude stores its configuration.
                </p>
              </div>
            </TryThisNow>

            <TryThisNow title="Test Your First Command">
              <p className="text-[var(--text-secondary)] mb-4">
                Now let's see if it works. In Claude, type this exactly:
              </p>

              <CopyableCode code={`/hello`} />

              <p className="text-[var(--text-secondary)] mt-4 mb-4">
                Claude should greet you and share a seasonal fact. If it worked — congratulations, you just ran your first custom command!
              </p>

              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <p className="text-sm text-[var(--text-primary)] font-medium mb-1">If it didn't work:</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Make sure the folder is exactly <code className="bg-[var(--bg-secondary)] px-1 rounded">~/.claude/commands/</code></li>
                  <li>• Check that the file is named <code className="bg-[var(--bg-secondary)] px-1 rounded">hello.md</code> (not hello.txt)</li>
                  <li>• Try restarting Claude</li>
                </ul>
              </div>
            </TryThisNow>
          </div>
        </div>
      </section>

      {/* The Anatomy of a Command */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <FolderIcon />
              </span>
              <h2 className="text-2xl font-bold">The Anatomy of a Custom Command</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              Every command is just a markdown file with your prompt inside. Here's the structure:
            </p>

            <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg p-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-xs font-mono text-id8-orange bg-id8-orange/10 px-2 py-1 rounded">File Name</span>
                  <div>
                    <code className="text-[var(--text-primary)]">~/.claude/commands/your-command-name.md</code>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">The file name becomes the command. <code className="bg-[var(--bg-secondary)] px-1 rounded">weekly-review.md</code> → <code className="bg-[var(--bg-secondary)] px-1 rounded">/weekly-review</code></p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-xs font-mono text-id8-orange bg-id8-orange/10 px-2 py-1 rounded">Contents</span>
                  <div>
                    <p className="text-[var(--text-primary)]">Your prompt, written in plain text or markdown</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Write it exactly as you would paste it into Claude</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-xs font-mono text-id8-orange bg-id8-orange/10 px-2 py-1 rounded">$ARGUMENTS</span>
                  <div>
                    <p className="text-[var(--text-primary)]">Placeholder for what you type after the command</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1"><code className="bg-[var(--bg-secondary)] px-1 rounded">/review draft.md</code> → $ARGUMENTS becomes "draft.md"</p>
                  </div>
                </div>
              </div>
            </div>

            <MentorNote>
              I keep my command files simple. No fancy formatting, no complex logic. Just the prompt I want to run. The power is in consistency, not complexity.
            </MentorNote>
          </div>
        </div>
      </section>

      {/* Commands That Will Change Your Life */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Five Commands That Will Change Your Workflow</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              These are the commands I use most. Steal them, modify them, make them yours.
            </p>

            <div className="space-y-8">
              {/* Command 1 */}
              <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">1. The Daily Digest</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Summarize any long document in 60 seconds</p>
                  </div>
                  <span className="text-xs font-mono text-id8-orange bg-id8-orange/10 px-2 py-1 rounded">/digest</span>
                </div>
                <CopyableCode
                  label="digest.md"
                  code={`Read the following and give me a digestible summary:

1. **One-sentence summary** - What is this about?
2. **Key points** - 3-5 bullet points of what matters
3. **Action items** - What, if anything, should I do?
4. **Questions raised** - What's unclear or needs follow-up?

Keep it under 200 words total. I'm busy.

$ARGUMENTS`}
                />
              </div>

              {/* Command 2 */}
              <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">2. The Meeting Prep</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Never walk into a meeting unprepared again</p>
                  </div>
                  <span className="text-xs font-mono text-id8-orange bg-id8-orange/10 px-2 py-1 rounded">/prep</span>
                </div>
                <CopyableCode
                  label="prep.md"
                  code={`Help me prepare for this meeting:

Based on what I tell you about the meeting, create a prep doc with:

1. **Context** - What's the background? What led to this meeting?
2. **My goals** - What do I want to accomplish?
3. **Their perspective** - What might they want or be concerned about?
4. **Questions to ask** - 3-5 good questions to guide the conversation
5. **Potential outcomes** - What are the possible results?

Keep each section to 2-3 sentences max.

$ARGUMENTS`}
                />
              </div>

              {/* Command 3 */}
              <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">3. The Email Drafter</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Turn bullet points into polished emails</p>
                  </div>
                  <span className="text-xs font-mono text-id8-orange bg-id8-orange/10 px-2 py-1 rounded">/email</span>
                </div>
                <CopyableCode
                  label="email.md"
                  code={`Draft an email based on my notes below.

Tone: Professional but warm. Not stiff, not casual.
Length: As short as possible while being complete.
Structure:
- Clear subject line
- One main point per paragraph
- Specific ask or next step at the end

My notes:
$ARGUMENTS`}
                />
              </div>

              {/* Command 4 */}
              <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">4. The Decision Helper</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Think through decisions systematically</p>
                  </div>
                  <span className="text-xs font-mono text-id8-orange bg-id8-orange/10 px-2 py-1 rounded">/decide</span>
                </div>
                <CopyableCode
                  label="decide.md"
                  code={`Help me think through this decision:

1. **Clarify the decision** - What exactly am I deciding?
2. **Options** - What are my realistic choices? (at least 3)
3. **Criteria** - What matters most in this decision?
4. **Analysis** - How does each option score on my criteria?
5. **Recommendation** - Based on this analysis, what would you suggest?
6. **Pre-mortem** - If I choose the recommended option and it fails, what's the most likely reason?

Be direct. I want clarity, not hand-holding.

$ARGUMENTS`}
                />
              </div>

              {/* Command 5 */}
              <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">5. The Explain It</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Understand anything complex quickly</p>
                  </div>
                  <span className="text-xs font-mono text-id8-orange bg-id8-orange/10 px-2 py-1 rounded">/explain</span>
                </div>
                <CopyableCode
                  label="explain.md"
                  code={`Explain this to me like I'm smart but unfamiliar with the topic:

1. **What is it?** - One sentence definition
2. **Why does it matter?** - Why should I care?
3. **How does it work?** - The core mechanism in plain language
4. **Example** - A concrete example I can visualize
5. **Common misconceptions** - What do people get wrong about this?

No jargon unless you explain it. Assume I can handle complexity, just not insider language.

$ARGUMENTS`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Try This Now #2 */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <TryThisNow title="Build Your First Real Command">
              <p className="text-[var(--text-secondary)] mb-4">
                Pick ONE command from the list above that you'd actually use. Let's create it together. Copy this into Claude:
              </p>

              <CopyableCode
                code={`Create a custom command file for me.

Save it to ~/.claude/commands/[command-name].md

Use this content:
[PASTE THE COMMAND CONTENT YOU CHOSE]

Then tell me how to test it.`}
              />

              <p className="text-[var(--text-secondary)] mt-4 mb-4">
                After Claude creates the file, test it immediately with real content. For example:
              </p>

              <ul className="text-sm text-[var(--text-secondary)] space-y-2 mb-4">
                <li>• <code className="bg-[var(--bg-primary)] px-1 rounded">/digest</code> + paste a long article</li>
                <li>• <code className="bg-[var(--bg-primary)] px-1 rounded">/prep</code> + describe an upcoming meeting</li>
                <li>• <code className="bg-[var(--bg-primary)] px-1 rounded">/email</code> + your messy notes</li>
              </ul>

              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-sm text-[var(--text-primary)] font-medium">Success looks like:</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  You type one word, Claude runs your full prompt, and the output is immediately useful.
                </p>
              </div>
            </TryThisNow>
          </div>
        </div>
      </section>

      {/* Make It Yours */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Make It Yours: Creating Custom Commands</h2>

            <p className="text-[var(--text-secondary)] mb-6">
              The commands I shared are starting points. The real power comes from commands tailored to YOUR work. Here's how to create them:
            </p>

            <div className="space-y-4 mb-8">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">1. Notice your patterns</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  What do you ask Claude repeatedly? What prompts do you keep copying? Those are command candidates.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">2. Refine before you save</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Use a prompt several times. Improve it each time. Only save it as a command once it consistently gives you what you want.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">3. Name it for the action</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Good names: <code className="bg-[var(--bg-primary)] px-1 rounded">/review</code>, <code className="bg-[var(--bg-primary)] px-1 rounded">/summarize</code>, <code className="bg-[var(--bg-primary)] px-1 rounded">/draft-email</code>. Bad names: <code className="bg-[var(--bg-primary)] px-1 rounded">/thing1</code>, <code className="bg-[var(--bg-primary)] px-1 rounded">/prompt-v2-final</code>
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">4. Include $ARGUMENTS</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Put <code className="bg-[var(--bg-primary)] px-1 rounded">$ARGUMENTS</code> where your input should go. Usually at the end, but it can go anywhere in the prompt.
                </p>
              </div>
            </div>

            <TryThisNow title="Design a Command for YOUR Work">
              <p className="text-[var(--text-secondary)] mb-4">
                Think about something you do at least once a week. Maybe it's:
              </p>

              <ul className="text-sm text-[var(--text-secondary)] space-y-1 mb-4">
                <li>• Reviewing reports from your team</li>
                <li>• Writing social media posts</li>
                <li>• Summarizing research for a project</li>
                <li>• Preparing updates for your boss</li>
                <li>• Converting rough notes into documentation</li>
              </ul>

              <p className="text-[var(--text-secondary)] mb-4">
                Now ask Claude to help you create it:
              </p>

              <CopyableCode
                code={`I want to create a custom command for [YOUR TASK].

Here's what I typically need:
- [What the output should include]
- [The tone or format I prefer]
- [Any specific requirements]

Help me write a command file that I can save to ~/.claude/commands/

Include $ARGUMENTS where my input should go.`}
              />
            </TryThisNow>
          </div>
        </div>
      </section>

      {/* Common Hiccups */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Common Hiccups (And How to Fix Them)</h2>

            <div className="space-y-4">
              <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">"My command isn't showing up"</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Check the file is in <code className="bg-[var(--bg-secondary)] px-1 rounded">~/.claude/commands/</code> (not a subfolder)</li>
                  <li>• Make sure it's a .md file</li>
                  <li>• Try restarting Claude</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">"The output isn't what I expected"</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Your prompt might need refinement — this is normal!</li>
                  <li>• Try running it manually first, improve it, then update the file</li>
                  <li>• Be more specific about format, tone, or length</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">"I have too many commands and can't remember them"</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Start with 3-5 commands you'll actually use</li>
                  <li>• Use consistent naming (verb-noun: review-draft, prep-meeting)</li>
                  <li>• Type <code className="bg-[var(--bg-secondary)] px-1 rounded">/</code> in Claude to see available commands</li>
                </ul>
              </div>
            </div>

            <MentorNote>
              Don't worry about building the perfect command library on day one. Start with one command you'll use this week. Add another next week. In a month, you'll have a collection that genuinely fits how you work.
            </MentorNote>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Key Takeaways</h2>

            <div className="space-y-3">
              {[
                { num: 1, text: "Custom commands = saved prompts. Your best prompts, available with a single word." },
                { num: 2, text: "Commands live in ~/.claude/commands/ as .md files. The filename becomes the command." },
                { num: 3, text: "Use $ARGUMENTS for input. Whatever you type after the command goes there." },
                { num: 4, text: "Refine before you save. A command is only as good as the prompt inside it." },
                { num: 5, text: "Start small. 3-5 commands you'll actually use beats 50 you'll forget." },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
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
              Commands are powerful on their own. But what if Claude could access your other tools too? Your notes in Notion, your files in Google Drive, your project boards?
            </p>
            <p className="text-lg text-[var(--text-primary)]">
              In <strong>Module 7: Connecting Your Tools</strong>, we'll unlock Claude's ability to read and write to the apps you already use.
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
                href="/courses/claude-for-knowledge-workers/module-5"
                className="btn bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeftIcon />
                Previous: Building Workflows
              </Link>
              <Link
                href="/courses/claude-for-knowledge-workers/module-7"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Connecting Your Tools
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Module Complete */}
      <ModuleComplete
        courseSlug="claude-for-knowledge-workers"
        moduleSlug="module-6"
        nextModulePath="/courses/claude-for-knowledge-workers/module-7"
      />
    </div>
  )
}
