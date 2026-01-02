'use client'

import { m } from '@/components/motion'
import Link from 'next/link'
import { useState } from 'react'
import { PurchaseGate } from '@/components/PurchaseGate'

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

const BookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
  </svg>
)

const BrainIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2a4 4 0 014 4c0 1.1-.4 2.1-1 3l1 1c1.3-.6 2.6-1 4-1a4 4 0 110 8c-1.4 0-2.7-.4-4-1l-1 1c.6.9 1 1.9 1 3a4 4 0 11-8 0c0-1.1.4-2.1 1-3l-1-1c-1.3.6-2.6 1-4 1a4 4 0 110-8c1.4 0 2.7.4 4 1l1-1c-.6-.9-1-1.9-1-3a4 4 0 014-4z"/>
  </svg>
)

const FolderIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
  </svg>
)

const FileTextIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
)

const StarIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
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

export default function Module9Page() {
  return (
    <PurchaseGate productId="claude-for-knowledge-workers" moduleName="Module 9: Project Memory">
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
              <span>Module 9</span>
              <span className="text-id8-orange/50">•</span>
              <span>45 min</span>
              <span className="text-id8-orange/50">•</span>
              <span>Final Module</span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Project Memory
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] mb-4 leading-relaxed"
            >
              Make Claude remember your projects across sessions. Create persistent context so you never have to re-explain your work.
            </m.p>

            <m.div
              variants={fadeUp}
              className="flex items-center gap-2 text-sm text-id8-orange bg-id8-orange/10 px-4 py-2 rounded-lg w-fit"
            >
              <SparkleIcon />
              <span>Open Claude — we're creating your first project memory file</span>
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
              <h2 className="text-2xl font-bold mb-6">The Fresh Start Problem</h2>

              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                Every time you start a new Claude session, it's like meeting a new colleague who knows nothing about your work. You have to explain your project, your goals, your preferences — every single time.
              </p>

              <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl mb-6">
                <p className="text-lg font-medium text-[var(--text-primary)] mb-2">Sound familiar?</p>
                <p className="text-[var(--text-secondary)]">
                  "Okay so I'm working on a newsletter called [X], and I write in a conversational tone, and my audience is [Y], and I'm currently working on a series about [Z], and the last post was about..."
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-3 italic">
                  — You, at the start of every session
                </p>
              </div>

              <p className="text-[var(--text-secondary)] mb-6">
                What if Claude could <strong className="text-[var(--text-primary)]">remember all of this automatically?</strong> What if starting a new session felt like picking up where you left off with someone who already knows your work?
              </p>

              <MentorNote>
                This is the single biggest upgrade to how I work with Claude. Creating project memory files transformed Claude from a tool I use into a partner who understands my work.
              </MentorNote>
            </m.div>
          </div>
        </div>
      </section>

      {/* What is CLAUDE.md */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <BookIcon />
              </span>
              <h2 className="text-2xl font-bold">What is a Project Memory File?</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              A project memory file (called <code className="px-2 py-1 bg-[var(--bg-primary)] rounded">CLAUDE.md</code>) is a simple text file that Claude reads automatically at the start of every session when you're working in that folder.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BrainIcon />
                  <p className="font-bold text-[var(--text-primary)]">It Contains</p>
                </div>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• What this project is about</li>
                  <li>• Key decisions you've made</li>
                  <li>• Your preferences and style</li>
                  <li>• Important context Claude needs</li>
                  <li>• Where things are located</li>
                </ul>
              </div>
              <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <StarIcon />
                  <p className="font-bold text-[var(--text-primary)]">It Enables</p>
                </div>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• No more re-explaining your project</li>
                  <li>• Consistent outputs that match your style</li>
                  <li>• Claude knows your file structure</li>
                  <li>• Context that persists across sessions</li>
                  <li>• Teammates can share context with Claude</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-id8-orange/5 border border-id8-orange/20 rounded-lg">
              <p className="text-sm text-[var(--text-secondary)]">
                <strong className="text-[var(--text-primary)]">How it works:</strong> When you open Claude in a folder that contains a <code className="px-1 bg-[var(--bg-secondary)] rounded">CLAUDE.md</code> file, Claude reads it automatically. No commands needed — it just knows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Watch Me First */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Watch Me First: My Newsletter Project Memory</h2>

            <p className="text-[var(--text-secondary)] mb-6">
              Let me show you my actual project memory file for my newsletter. This is what Claude reads every time I work on content:
            </p>

            <CopyableCode
              label="My real CLAUDE.md for newsletter work:"
              code={`# Newsletter Project Memory

## What This Is
Weekly newsletter about AI tools for knowledge workers. ~2000 subscribers. Published every Tuesday.

## My Voice
- Conversational, like explaining to a smart friend
- Use "you" and "I" freely
- Short paragraphs (2-3 sentences max)
- Include real examples from my own work
- Avoid jargon unless I explain it immediately
- Okay to be opinionated

## Current Series
Working on a 4-part series about "delegation mindset" — treating AI as a colleague, not a search engine.
- Part 1: Published (The Mental Model Shift)
- Part 2: In progress (Your First Delegation)
- Part 3: Not started (When Delegation Fails)
- Part 4: Not started (Building Habits)

## File Structure
- /drafts/ — Current drafts in progress
- /published/ — Final versions that went out
- /ideas/ — Raw ideas and notes for future issues
- /templates/ — My standard formats (intro, main, CTA)

## Key Decisions
- No affiliate links (for now)
- Always include one actionable takeaway
- Subject lines: curiosity + benefit format
- Never more than 800 words

## Audience
Writers, consultants, small business owners who are AI-curious but not technical. They want practical, not theoretical.`}
            />

            <MentorNote>
              Notice it's not a rigid template — it's just everything I'd tell a new collaborator about this project. Write it like you're onboarding someone.
            </MentorNote>
          </div>
        </div>
      </section>

      {/* Try This Now: Create Your First */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <TryThisNow title="Create Your First Project Memory File">
              <p className="text-[var(--text-secondary)] mb-4">
                Pick a project you're currently working on — could be a writing project, a research project, a business initiative, anything. Let's create a memory file for it.
              </p>

              <p className="text-[var(--text-secondary)] mb-4">
                Ask Claude to help you create it:
              </p>

              <CopyableCode
                code={`Help me create a CLAUDE.md file for my project.

The project is: [DESCRIBE YOUR PROJECT IN 1-2 SENTENCES]

Ask me questions about:
1. What this project is and its goals
2. My voice/style preferences
3. Current status and what I'm working on
4. File structure (where things are)
5. Key decisions I've made
6. Who the audience is (if applicable)

Then create a CLAUDE.md file I can save to my project folder.`}
              />

              <p className="text-[var(--text-secondary)] mt-4 mb-4">
                Claude will interview you, then generate a complete project memory file. Save it as <code className="px-1 bg-[var(--bg-primary)] rounded">CLAUDE.md</code> in your project's root folder.
              </p>

              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-sm text-[var(--text-primary)] font-medium">Success looks like:</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Next time you open Claude in that folder, it already knows your project. Try asking "What am I working on?" — it should know.
                </p>
              </div>
            </TryThisNow>
          </div>
        </div>
      </section>

      {/* What to Include */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">What to Include in Your Project Memory</h2>

            <p className="text-[var(--text-secondary)] mb-6">
              Not every project needs every section. Here's a menu — pick what's relevant:
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-id8-orange"><FileTextIcon /></span>
                  <p className="font-bold text-[var(--text-primary)]">Project Overview</p>
                  <span className="text-xs bg-id8-orange/10 text-id8-orange px-2 py-0.5 rounded">Essential</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  What is this? What's the goal? 2-3 sentences that ground Claude in what you're building.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-id8-orange"><FolderIcon /></span>
                  <p className="font-bold text-[var(--text-primary)]">File Structure</p>
                  <span className="text-xs bg-id8-orange/10 text-id8-orange px-2 py-0.5 rounded">Essential</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Where are things? What's in each folder? Claude can navigate better when it knows the layout.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-id8-orange"><StarIcon /></span>
                  <p className="font-bold text-[var(--text-primary)]">Voice & Style</p>
                  <span className="text-xs bg-[var(--bg-primary)] text-[var(--text-tertiary)] px-2 py-0.5 rounded">For writing projects</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  How should outputs sound? Formal? Casual? What's your brand voice? Include examples if helpful.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-id8-orange"><CheckIcon /></span>
                  <p className="font-bold text-[var(--text-primary)]">Key Decisions</p>
                  <span className="text-xs bg-[var(--bg-primary)] text-[var(--text-tertiary)] px-2 py-0.5 rounded">Optional but helpful</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Decisions you've already made that Claude shouldn't question. "We're using X approach, not Y."
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-id8-orange"><BrainIcon /></span>
                  <p className="font-bold text-[var(--text-primary)]">Current Status</p>
                  <span className="text-xs bg-[var(--bg-primary)] text-[var(--text-tertiary)] px-2 py-0.5 rounded">Keep updated</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  What phase is the project in? What's being worked on now? Update this as things change.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-id8-orange"><BookIcon /></span>
                  <p className="font-bold text-[var(--text-primary)]">Audience / Stakeholders</p>
                  <span className="text-xs bg-[var(--bg-primary)] text-[var(--text-tertiary)] px-2 py-0.5 rounded">For client/public work</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Who is this for? What do they care about? What's their context? Helps Claude tailor outputs.
                </p>
              </div>
            </div>

            <MentorNote>
              Start simple. You can always add more later. A 10-line CLAUDE.md is better than no CLAUDE.md. You'll naturally discover what context helps most as you work.
            </MentorNote>
          </div>
        </div>
      </section>

      {/* Multiple Memory Files */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Building Your Memory System</h2>

            <p className="text-[var(--text-secondary)] mb-6">
              You're not limited to one file. Here's how a complete memory system looks:
            </p>

            <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl mb-6">
              <p className="font-mono text-sm text-[var(--text-secondary)] mb-4">Your folder structure:</p>
              <pre className="text-sm text-[var(--text-secondary)]">
{`~/.claude/
└── CLAUDE.md          ← Global: your voice, preferences, how you work

~/Projects/
├── Newsletter/
│   └── CLAUDE.md      ← Project-specific: newsletter details
├── Client-ABC/
│   └── CLAUDE.md      ← Project-specific: client context
└── Research-AI/
    └── CLAUDE.md      ← Project-specific: research focus`}
              </pre>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">Global Memory (~/.claude/CLAUDE.md)</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Your general preferences, voice, and working style. Loaded for every session, everywhere.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">Project Memory (in each project folder)</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Specific context for that project. Only loaded when you're working in that folder.
                </p>
              </div>
            </div>

            <TryThisNow title="Create Your Global Memory">
              <p className="text-[var(--text-secondary)] mb-4">
                Let's create a global memory file with your general preferences. This will apply to all your sessions:
              </p>

              <CopyableCode
                code={`Help me create a global CLAUDE.md file for ~/.claude/

This should contain my general preferences that apply to all projects:
- My communication style preferences
- How I like outputs formatted
- Common tasks I do
- Things you should always/never do when working with me

Interview me to understand my preferences, then create the file.`}
              />

              <p className="text-[var(--text-secondary)] mt-4">
                Save the output to <code className="px-1 bg-[var(--bg-primary)] rounded">~/.claude/CLAUDE.md</code>
              </p>
            </TryThisNow>
          </div>
        </div>
      </section>

      {/* Keeping It Updated */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Keeping Your Memory Fresh</h2>

            <p className="text-[var(--text-secondary)] mb-6">
              A memory file isn't "set and forget." Here's how to keep it useful:
            </p>

            <div className="space-y-4 mb-8">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">Weekly: Update "Current Status"</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Spend 2 minutes updating what you're working on. "Currently drafting Part 2" → "Currently editing Part 2"
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">After Big Decisions: Add to "Key Decisions"</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  When you make an important choice ("We're targeting enterprise, not SMB"), add it so Claude doesn't re-litigate.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">Monthly: Review and Prune</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Remove outdated info. Old status updates, completed milestones, decisions that no longer matter.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">When Claude Gets It Wrong: Add Clarification</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  If Claude keeps making the same mistake, add guidance to prevent it. "Don't use jargon" or "Always include examples"
                </p>
              </div>
            </div>

            <MentorNote>
              Think of it like onboarding documentation. If you hired someone new, you'd update their docs when things change. Same idea here — Claude is your persistent collaborator, and this is their briefing doc.
            </MentorNote>
          </div>
        </div>
      </section>

      {/* Real Examples */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Templates for Common Project Types</h2>

            <p className="text-[var(--text-secondary)] mb-6">
              Here are starter templates for different kinds of work. Copy and customize:
            </p>

            <div className="space-y-6">
              {/* Writing Project */}
              <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Writing Project (Blog, Newsletter, Book)</h3>
                <CopyableCode
                  code={`# [Project Name] Memory

## What This Is
[1-2 sentences: what are you writing and why]

## Voice & Style
- Tone: [formal/casual/conversational/academic]
- Perspective: [first person/second person/third person]
- Sentence length: [short and punchy / longer and flowing]
- Key trait: [what makes your voice distinctive]

## Audience
[Who reads this? What do they care about? What's their level of knowledge?]

## Current Work
- Working on: [current piece]
- Status: [drafting/editing/almost done]
- Next up: [what's after this]

## Structure
- /drafts/ — work in progress
- /published/ — completed pieces
- /ideas/ — future topics

## Rules
- [Things to always do]
- [Things to never do]`}
                />
              </div>

              {/* Research Project */}
              <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Research Project</h3>
                <CopyableCode
                  code={`# [Research Topic] Memory

## Research Question
[The main question you're investigating]

## Scope
- Focus areas: [what's included]
- Out of scope: [what you're NOT researching]
- Time period: [if relevant]

## Sources
- Primary: [where you're getting data]
- Key references: [important papers/books/sources]
- To explore: [sources you haven't gotten to yet]

## Current Status
- Phase: [discovery/deep dive/synthesis/writing]
- Working on: [current focus]
- Key findings so far: [bullet points]

## File Structure
- /sources/ — PDFs, articles, raw materials
- /notes/ — Your notes and annotations
- /synthesis/ — Emerging insights and frameworks
- /output/ — Final deliverables`}
                />
              </div>

              {/* Client Project */}
              <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Client Project</h3>
                <CopyableCode
                  code={`# [Client Name] Project Memory

## Client Overview
- Company: [what they do]
- Our engagement: [what we're doing for them]
- Key contact: [who we work with]

## Project Scope
[What we're delivering and by when]

## Client Preferences
- Communication style: [formal/casual]
- Decision maker: [who approves things]
- Hot buttons: [what they care most about]
- Avoid: [topics or approaches they don't like]

## Current Phase
- Status: [where we are]
- Deliverables: [what's due]
- Blockers: [what's slowing us down]

## Key Decisions Made
- [Decision 1: what we decided and why]
- [Decision 2: what we decided and why]

## Files
- /deliverables/ — work products for client
- /internal/ — our working documents
- /communications/ — emails and meeting notes`}
                />
              </div>
            </div>
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
                { num: 1, text: "CLAUDE.md files give Claude persistent memory. Create one in each project folder." },
                { num: 2, text: "Include: what the project is, file structure, your style, key decisions, current status." },
                { num: 3, text: "Global memory (~/.claude/CLAUDE.md) holds preferences that apply everywhere." },
                { num: 4, text: "Keep it updated — outdated memory is almost as bad as no memory." },
                { num: 5, text: "Start simple. A 10-line file is better than nothing. Expand as you learn what helps." },
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

      {/* Course Completion */}
      <section className="section-spacing bg-id8-orange/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Congratulations — You've Completed the Course!</h2>

            <p className="text-xl text-[var(--text-secondary)] mb-6">
              You now have the complete toolkit for working with Claude as a knowledge worker.
            </p>

            <div className="text-left p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl mb-8">
              <p className="font-bold text-[var(--text-primary)] mb-4">What you've learned:</p>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                <li className="flex items-center gap-2"><CheckIcon /><span>Module 0-5: Delegation mindset, files, writing, research, workflows</span></li>
                <li className="flex items-center gap-2"><CheckIcon /><span>Module 6: Custom commands — your saved prompts</span></li>
                <li className="flex items-center gap-2"><CheckIcon /><span>Module 7: Tool connections — Claude accessing your apps</span></li>
                <li className="flex items-center gap-2"><CheckIcon /><span>Module 8: Session management — staying sharp in long projects</span></li>
                <li className="flex items-center gap-2"><CheckIcon /><span>Module 9: Project memory — persistent context across sessions</span></li>
              </ul>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              You're no longer someone who "uses ChatGPT." You're someone who has a genuine AI collaborator — one that knows your work, matches your style, and amplifies what you can do.
            </p>

            <p className="text-2xl font-bold text-id8-orange mb-8">
              Welcome to the future of knowledge work.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses/claude-for-knowledge-workers"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Back to Course Overview
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Link
                href="/courses/claude-for-knowledge-workers/module-8"
                className="btn bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeftIcon />
                Previous: Managing Long Sessions
              </Link>
              <Link
                href="/courses/claude-for-knowledge-workers"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Course Overview
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </PurchaseGate>
  )
}
