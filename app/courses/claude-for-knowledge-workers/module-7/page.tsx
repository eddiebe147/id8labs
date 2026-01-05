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

const PlugIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2v5M6 7v3a6 6 0 0012 0V7M6 13v4a2 2 0 002 2h8a2 2 0 002-2v-4"/>
  </svg>
)

const DatabaseIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
)

const GlobeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
)

const FileIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
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

// Tool card component
function ToolCard({ name, icon, description, status }: { name: string; icon: React.ReactNode; description: string; status: 'available' | 'coming-soon' }) {
  return (
    <div className={`p-4 bg-[var(--bg-primary)] border rounded-lg ${status === 'available' ? 'border-green-500/30' : 'border-[var(--border)]'}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-id8-orange">{icon}</span>
          <h3 className="font-bold text-[var(--text-primary)]">{name}</h3>
        </div>
        <span className={`text-xs font-mono px-2 py-1 rounded ${status === 'available' ? 'bg-green-500/10 text-green-500' : 'bg-[var(--bg-secondary)] text-[var(--text-tertiary)]'}`}>
          {status === 'available' ? 'Available' : 'Coming Soon'}
        </span>
      </div>
      <p className="text-sm text-[var(--text-secondary)]">{description}</p>
    </div>
  )
}

export default function Module7Page() {
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
              <span>Module 7</span>
              <span className="text-id8-orange/50">•</span>
              <span>50 min</span>
              <span className="text-id8-orange/50">•</span>
              <span>Hands-On</span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Connecting Your Tools
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] mb-4 leading-relaxed"
            >
              Let Claude read your Notion pages, browse the web, access your files, and more. This is where Claude stops being just a chat and becomes part of your workflow.
            </m.p>

            <m.div
              variants={fadeUp}
              className="flex items-center gap-2 text-sm text-id8-orange bg-id8-orange/10 px-4 py-2 rounded-lg w-fit"
            >
              <SparkleIcon />
              <span>Open Claude in another window — we're connecting tools together</span>
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

      {/* The Big Idea */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">The Big Idea: Claude Can Use Tools</h2>

              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
                Until now, Claude could only see what you pasted into the chat or what files you pointed it to. But here's what most people don't realize: <strong className="text-[var(--text-primary)]">Claude can connect to other apps.</strong>
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="font-bold text-[var(--text-primary)] mb-2">Before: The Copy-Paste Workflow</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    "Let me open Notion... find that page... copy the content... paste it into Claude... get the output... copy it back... paste it into Notion..."
                  </p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="font-bold text-[var(--text-primary)] mb-2">After: Direct Access</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    "Hey Claude, read my project notes in Notion and create a status update." Claude reads Notion directly — no copying, no pasting.
                  </p>
                </div>
              </div>

              <MentorNote>
                This feature is called MCP (Model Context Protocol) — but you don't need to know that. Just know that Claude can plug into your other tools like a universal adapter. We'll call them "connections" to keep it simple.
              </MentorNote>
            </m.div>
          </div>
        </div>
      </section>

      {/* What Tools Can Claude Connect To? */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <PlugIcon />
              </span>
              <h2 className="text-2xl font-bold">What Can Claude Connect To?</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              The list is growing, but here are the connections most useful for knowledge workers:
            </p>

            <div className="space-y-4 mb-8">
              <ToolCard
                name="Web Browsing"
                icon={<GlobeIcon />}
                description="Claude can visit URLs and read web pages. Research without the tab-switching."
                status="available"
              />
              <ToolCard
                name="File System"
                icon={<FileIcon />}
                description="Read and write files on your computer. Process documents, save outputs, organize folders."
                status="available"
              />
              <ToolCard
                name="Notion"
                icon={<DatabaseIcon />}
                description="Read your Notion pages and databases. Query your knowledge base without leaving Claude."
                status="available"
              />
              <ToolCard
                name="Google Drive"
                icon={<FileIcon />}
                description="Access your Google Docs, Sheets, and files. Work with cloud documents directly."
                status="available"
              />
              <ToolCard
                name="GitHub"
                icon={<DatabaseIcon />}
                description="Read repositories, create issues, manage code. Even if you're not a developer, great for documentation."
                status="available"
              />
            </div>

            <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
              <p className="text-sm text-[var(--text-secondary)]">
                <strong className="text-[var(--text-primary)]">More connections are being added constantly.</strong> The technical community is building new ones every week. By the time you read this, there may be connections for Slack, Airtable, Todoist, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Watch Me First */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Watch Me First: Using the Web Connection</h2>

            <p className="text-[var(--text-secondary)] mb-6">
              Let's start with the simplest connection: web browsing. Claude can visit URLs and read their content. Here's how I use it:
            </p>

            <div className="space-y-6 mb-8">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="text-sm font-mono text-id8-orange mb-2">My workflow: Research without tab hell</p>
                <p className="text-[var(--text-secondary)]">
                  Instead of opening 10 tabs and skimming articles, I give Claude a list of URLs and ask it to extract what I need. It reads them all, synthesizes the information, and gives me a summary.
                </p>
              </div>

              <CopyableCode
                label="Example prompt I use:"
                code={`Read these articles about [TOPIC]:
- [URL 1]
- [URL 2]
- [URL 3]

For each article:
1. Main argument in one sentence
2. Key evidence or data points
3. What's missing or questionable

Then synthesize: What's the consensus? Where do they disagree? What should I look into further?`}
              />
            </div>

            <TryThisNow title="Test Web Browsing">
              <p className="text-[var(--text-secondary)] mb-4">
                Let's see if web browsing works in your Claude setup. Paste this:
              </p>

              <CopyableCode
                code={`Visit this URL and tell me what the page is about:
https://en.wikipedia.org/wiki/Prompt_engineering

Give me a 2-sentence summary.`}
              />

              <p className="text-[var(--text-secondary)] mt-4 mb-4">
                If Claude reads the page and gives you a summary, web browsing is working! If it says it can't access URLs, we'll troubleshoot that.
              </p>

              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <p className="text-sm text-[var(--text-primary)] font-medium mb-1">If it didn't work:</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Web browsing may need to be enabled in your Claude settings</li>
                  <li>• Some Claude interfaces have browsing, others don't</li>
                  <li>• Claude Code (terminal) always has file access but web varies by setup</li>
                </ul>
              </div>
            </TryThisNow>
          </div>
        </div>
      </section>

      {/* Setting Up Connections */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Setting Up Connections (MCP Servers)</h2>

            <p className="text-[var(--text-secondary)] mb-6">
              Here's the honest truth: setting up new connections requires a bit of technical setup. But once it's done, it's done forever. Let me walk you through the process.
            </p>

            <div className="space-y-4 mb-8">
              <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">Step 1: Find the connection you want</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Connections are called "MCP servers." You can find them at <a href="https://github.com/modelcontextprotocol/servers" target="_blank" rel="noopener noreferrer" className="text-id8-orange hover:underline">github.com/modelcontextprotocol/servers</a> or by searching "MCP server [tool name]".
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">Step 2: Add it to your Claude config</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Each connection has instructions. Usually you add a few lines to a config file. Claude walks you through this.
                </p>
              </div>

              <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">Step 3: Restart Claude and test</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  After adding the connection, restart Claude. Then try using it — "Read my Notion page at [URL]" for example.
                </p>
              </div>
            </div>

            <MentorNote>
              Don't worry if this sounds technical. In the next exercise, you'll ask Claude to help you set up a connection. Claude is really good at walking you through this kind of thing — it knows its own configuration.
            </MentorNote>
          </div>
        </div>
      </section>

      {/* Try This Now: Set Up Notion */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <TryThisNow title="Set Up the Notion Connection (Optional but Powerful)">
              <p className="text-[var(--text-secondary)] mb-4">
                If you use Notion, this is a game-changer. Ask Claude to help you set it up:
              </p>

              <CopyableCode
                code={`I want to connect you to my Notion workspace so you can read my pages.

Help me set up the Notion MCP server. Walk me through:
1. What I need to install
2. How to get my Notion API key
3. Where to add the configuration
4. How to test that it works

Go step by step and wait for me to confirm each step before continuing.`}
              />

              <p className="text-[var(--text-secondary)] mt-4 mb-4">
                Claude will guide you through the setup. It typically takes 5-10 minutes the first time.
              </p>

              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-sm text-[var(--text-primary)] font-medium">Once connected, you can:</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1 mt-2">
                  <li>• "Read my project notes in Notion and summarize them"</li>
                  <li>• "Find all my meeting notes from last week"</li>
                  <li>• "What tasks are marked as in-progress in my task database?"</li>
                </ul>
              </div>
            </TryThisNow>
          </div>
        </div>
      </section>

      {/* Practical Workflows */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Practical Workflows With Connected Tools</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Here's how I actually use these connections in my daily work:
            </p>

            <div className="space-y-6">
              {/* Workflow 1 */}
              <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Research Synthesis</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Instead of reading 5 articles and taking notes, Claude does the first pass.
                </p>
                <CopyableCode
                  code={`I'm researching [TOPIC]. Read these sources:
- [URL 1]
- [URL 2]
- [URL 3]

Create a research brief:
1. Key facts (with source attribution)
2. Conflicting information
3. Gaps - what's not covered
4. Questions I should investigate further

Save to ~/Documents/Research/[topic]-brief.md`}
                />
              </div>

              {/* Workflow 2 */}
              <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Notion → Status Update</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Pull project info from Notion, create a formatted update.
                </p>
                <CopyableCode
                  code={`Read my project page in Notion: [NOTION URL]

Create a status update email for my stakeholders:
- What's completed this week
- What's in progress
- Any blockers or risks
- Next week's priorities

Keep it under 200 words. Professional but friendly tone.`}
                />
              </div>

              {/* Workflow 3 */}
              <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Competitive Research</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Analyze competitor websites and summarize findings.
                </p>
                <CopyableCode
                  code={`Visit these competitor websites:
- [Competitor 1 URL]
- [Competitor 2 URL]
- [Competitor 3 URL]

For each, identify:
1. Their main value proposition
2. Pricing model (if visible)
3. Key features they highlight
4. Target audience signals

Then: How do we compare? What are they doing that we're not?`}
                />
              </div>

              {/* Workflow 4 */}
              <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Content Research</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Pull information for an article or post you're writing.
                </p>
                <CopyableCode
                  code={`I'm writing about [TOPIC].

Research phase:
1. Visit the top 3 Google results for "[SEARCH QUERY]"
2. Find relevant statistics and data points
3. Identify common angles and unique angles
4. Note any experts or sources I should cite

Compile into a research document I can use while writing.`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Note */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">A Note on Security and Privacy</h2>

            <div className="p-6 bg-amber-500/10 border border-amber-500/30 rounded-xl mb-6">
              <p className="text-[var(--text-primary)] font-medium mb-2">Important to understand:</p>
              <ul className="text-sm text-[var(--text-secondary)] space-y-2">
                <li>• When Claude connects to a tool, it can only do what you've authorized</li>
                <li>• Notion connections use API keys that YOU create and can revoke anytime</li>
                <li>• Claude doesn't store your tool credentials — they live in your local config</li>
                <li>• You can see what Claude is doing (it tells you when it's reading/writing)</li>
              </ul>
            </div>

            <MentorNote>
              I only connect Claude to tools where I'm comfortable with it seeing the data. My Notion workspace? Yes. My personal journal? No. Use the same judgment you'd use giving a new employee access to systems.
            </MentorNote>
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
                <p className="font-bold text-[var(--text-primary)] mb-2">"Claude says it can't access that URL"</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Some sites block automated access — try a different source</li>
                  <li>• Paywalled content won't work unless you provide the text</li>
                  <li>• Very dynamic sites (heavy JavaScript) may not load fully</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">"The Notion connection isn't working"</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• Make sure your API key has access to the specific pages you're requesting</li>
                  <li>• The page must be shared with your integration in Notion settings</li>
                  <li>• Try restarting Claude after config changes</li>
                </ul>
              </div>

              <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg">
                <p className="font-bold text-[var(--text-primary)] mb-2">"This is too technical for me"</p>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  <li>• That's okay! Start with just web browsing (no setup required)</li>
                  <li>• Ask Claude to walk you through any setup step by step</li>
                  <li>• You don't need every connection — pick one that would help most</li>
                </ul>
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
                { num: 1, text: "Claude can connect to external tools — web, Notion, files, and more. No more copy-paste workflows." },
                { num: 2, text: "Connections are set up once. After that, Claude can access them whenever you need." },
                { num: 3, text: "Start with web browsing (usually works out of the box) before adding other tools." },
                { num: 4, text: "Claude can help you set up connections. Just ask it to walk you through the process." },
                { num: 5, text: "Only connect tools you're comfortable with. You control what Claude can access." },
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
              Now Claude can access your tools. But what happens during long, complex sessions when context gets cluttered? How do you keep Claude focused when you've been working together for an hour?
            </p>
            <p className="text-lg text-[var(--text-primary)]">
              In <strong>Module 8: Managing Long Sessions</strong>, we'll learn how to keep Claude sharp, reset context when needed, and handle the inevitable "Claude seems confused" moments.
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
                href="/courses/claude-for-knowledge-workers/module-6"
                className="btn bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeftIcon />
                Previous: Custom Commands
              </Link>
              <Link
                href="/courses/claude-for-knowledge-workers/module-8"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Managing Long Sessions
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
