'use client'

import { useState } from 'react'
import { m } from '@/components/motion'
import Link from 'next/link'
import Image from 'next/image'
import MiniAudioPlayer from '@/components/MiniAudioPlayer'
import MiniVideoPlayer from '@/components/MiniVideoPlayer'
import { PurchaseGate } from '@/components/PurchaseGate'
import AuthGate from '@/components/auth/AuthGate'

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
const DownloadIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
  </svg>
)

const PlayIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
)

const CheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

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

const SearchIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
)

const TargetIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
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

const ShieldCheckIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
)

const CopyIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
)

const CheckIconSmall = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

// Interactive Components
function CopyableCode({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      {label && (
        <p className="text-xs font-mono text-id8-orange mb-2">{label}</p>
      )}
      <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg p-4 font-mono text-sm">
        <pre className="whitespace-pre-wrap text-[var(--text-primary)]">{code}</pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:border-id8-orange/50"
          aria-label="Copy to clipboard"
        >
          {copied ? <CheckIconSmall /> : <CopyIcon />}
        </button>
      </div>
    </div>
  )
}

function TryThisNow({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="my-8 p-6 bg-id8-orange/5 border-2 border-id8-orange/30 rounded-xl">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-id8-orange">
          <TerminalIcon />
        </span>
        <h3 className="text-lg font-bold text-id8-orange">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

function MentorNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 p-4 border-l-4 border-id8-orange/50 bg-[var(--bg-secondary)] rounded-r-lg">
      <p className="text-sm text-[var(--text-secondary)]">
        <span className="font-medium text-[var(--text-primary)]">💡 </span>
        {children}
      </p>
    </div>
  )
}

// Module 4 content
const outcomes = [
  "Turn research questions into actionable briefings using the Research Briefing Workflow",
  "Conduct competitive analysis — company deep dives and landscape overviews",
  "Perform market research — trends, customer profiles, sentiment analysis",
  "Synthesize long documents — contracts, reports, meeting notes",
  "Chain research into action — recommendations, comparisons, draft communications",
  "Verify and fact-check information with confidence levels",
]

const researchCapabilities = [
  { category: "Claude Does Well", items: ["Finding current information on companies, people, topics", "Comparing products, services, or approaches", "Gathering data from multiple sources into one place", "Fact-checking and verification", "Tracking down specific information you vaguely remember"] },
  { category: "Claude Struggles With", items: ["Paywalled content (can't log into your subscriptions)", "Very recent news (there can be delays)", "Proprietary databases or internal company information", "Information that simply doesn't exist online"] },
]

const researchPatterns = [
  { type: "Research Briefing", pattern: '"Research [topic/company/person]. I want to understand: [specific aspects]. Create a briefing covering: [sections]. Include sources for key claims. Save to ~/Documents/Research/[filename].md"' },
  { type: "Competitive Analysis", pattern: '"Research [competitor company]. I want to understand: their product/service offering, pricing (if public), target customer, key differentiators, recent news. Create a one-page briefing with sources."' },
  { type: "Market Landscape", pattern: '"Research top players in [market]. For each: what they offer, size/funding, target customer, positioning. Then analyze: gaps, patterns, underserved areas."' },
  { type: "Trend Report", pattern: '"Research current trends in [industry/topic]. What\'s changing, emerging, declining, predicted. Focus on last 12 months. Include specific examples and sources."' },
]

const documentPatterns = [
  {
    type: "Contract Review",
    delegation: '"Read this contract at [file path]. Extract: key obligations for each party, important dates and deadlines, termination conditions, liability clauses, anything unusual or concerning. Present as a summary I can review quickly."',
  },
  {
    type: "Report Digest",
    delegation: '"Read this 50-page report at [file path]. Give me: the main conclusions, the key data points, the recommendations, and anything surprising or controversial. Keep it under 2 pages."',
  },
  {
    type: "Meeting Notes Synthesis",
    delegation: '"Read all files in ~/Documents/MeetingNotes/ProjectX/. Synthesize into: key decisions made, action items (and who owns them), open questions, and current project status."',
  },
]

const actionPatterns = [
  { type: "Research → Recommendations", pattern: '"Research [topic]. Based on what you find, give me 3-5 specific recommendations for how I should [action]. Explain your reasoning for each."' },
  { type: "Research → Comparison", pattern: '"Research these 5 options: [list]. Compare them across these criteria: [list]. Create a comparison table. Give me your recommendation and why."' },
  { type: "Research → Outreach", pattern: '"Research [company/person]. Based on what you learn, draft an outreach email that references something specific about them and explains why [my offer] is relevant."' },
]

export default function Module4Page() {
  return (
    <AuthGate moduleName="Module 4: Automation & Efficiency">
    <PurchaseGate productId="claude-for-knowledge-workers" moduleName="Module 4: Automation & Efficiency">
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
              <span>Module 4</span>
              <span className="text-id8-orange/50">•</span>
              <span>60 min</span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Research & Analysis
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed"
            >
              From dozens of browser tabs to actionable insights. Claude doesn't just help you search — it helps you synthesize. The shift is from "help me search" to "research this and tell me what I need to know."
            </m.p>

            <m.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a
                href="/courses/module-4/module-4-research-and-analysis.pdf"
                download="Module-4-Research-And-Analysis.pdf"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                <DownloadIcon />
                Download Guide (PDF)
              </a>
              <a
                href="#media"
                className="btn bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
              >
                <PlayIcon />
                Watch or Listen
              </a>
            </m.div>
          </m.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
      </section>

      {/* Split Tab Callout */}
      <section className="py-4 bg-id8-orange/5 border-b border-id8-orange/20">
        <div className="container">
          <div className="max-w-3xl mx-auto flex items-center gap-3 text-sm">
            <span className="text-id8-orange">💡</span>
            <p className="text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Pro tip:</strong> Open Claude Code in a split tab alongside this lesson. Practice each delegation as you learn it — the patterns stick better when you try them immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Media Section */}
      <section id="media" className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Watch or Listen</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Choose your format — same content, different experience.
            </p>

            <div className="space-y-6">
              {/* Video Player */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <MiniVideoPlayer
                  src="/courses/module-4/media/module-4-research-and-analysis.mp4"
                  title="Research & Analysis (Video)"
                  downloadName="Module-4-Research-And-Analysis.mp4"
                />
              </m.div>

              {/* Audio Player */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <MiniAudioPlayer
                  src="/courses/module-4/media/module-4-research-and-analysis.m4a"
                  title="Research & Analysis (Podcast)"
                  downloadName="Module-4-Research-And-Analysis.m4a"
                />
              </m.div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg"
            >
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-6">
                You've learned to process files at scale in Module 2 and write with Claude as a partner in Module 3. You can organize invoices, turn voice notes into drafts, and edit with precision.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                Now we're tackling research — one of the most time-consuming parts of knowledge work.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Think about how you research today. You open a dozen browser tabs. You skim articles, copy quotes into notes, lose track of where you found things. You spend hours gathering information, then more hours trying to make sense of it all. <strong className="text-[var(--text-primary)]">Claude Code changes this fundamentally.</strong>
              </p>
            </m.div>
          </div>
        </div>
      </section>

      {/* What Claude Can Research */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <SearchIcon />
              </span>
              <h2 className="text-2xl font-bold">What Claude Can Research</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-8">
              Claude Code can search the web, read websites, and synthesize information from multiple sources. When connected to tools like Perplexity or Firecrawl, it becomes even more powerful.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {researchCapabilities.map((section, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    section.category === "Claude Does Well"
                      ? "bg-green-500/5 border-green-500/20"
                      : "bg-amber-500/5 border-amber-500/20"
                  }`}
                >
                  <p className={`text-sm font-mono uppercase tracking-wider mb-3 ${
                    section.category === "Claude Does Well" ? "text-green-500" : "text-amber-500"
                  }`}>
                    {section.category}
                  </p>
                  <ul className="text-sm text-[var(--text-secondary)] space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="p-6 bg-id8-orange/5 border border-id8-orange/20 rounded-xl">
              <p className="text-lg font-medium text-[var(--text-primary)] mb-2">Document Research:</p>
              <p className="text-[var(--text-secondary)]">
                Claude can also research across your own files — something we touched on in Module 2's semantic search section. This is powerful for finding relevant past work, synthesizing notes from multiple meetings, extracting insights from interview transcripts, and reviewing contracts for specific terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">What You'll Learn</h2>

            <div className="space-y-4">
              {outcomes.map((outcome, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)]"
                >
                  <span className="text-id8-orange flex-shrink-0 mt-0.5">
                    <CheckIcon />
                  </span>
                  <span className="text-[var(--text-primary)]">{outcome}</span>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research Briefing Workflow */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <TargetIcon />
              </span>
              <h2 className="text-2xl font-bold">The Research Briefing Workflow</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              This is the core research workflow: turning a question into an actionable briefing. The delegation formula still applies: Context + Outcome + Location.
            </p>

            <div className="space-y-4 mb-6">
              {researchPatterns.map((pattern, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg"
                >
                  <p className="text-sm font-mono text-id8-orange mb-2">{pattern.type}</p>
                  <code className="block text-sm text-[var(--text-primary)] bg-[var(--bg-primary)] p-3 rounded">
                    {pattern.pattern}
                  </code>
                </m.div>
              ))}
            </div>

            <div className="p-6 bg-id8-orange/5 border border-id8-orange/20 rounded-xl">
              <p className="text-lg font-medium text-[var(--text-primary)] mb-2">Eddie's Real Example: Cast Research</p>
              <p className="text-[var(--text-secondary)]">
                "I produce reality television. Before filming, I need to understand each cast member — their background, their social media presence, any public controversies, their relationships. Used to take a researcher half a day per person. Now I give Claude their names and basic info: 'Research these 10 cast members. For each one, find: social media presence and follower counts, any news coverage, relationship history if public, potential storylines, and red flags we should know about.' Ten detailed briefings in 15 minutes. My team reviews and adds context, but the grunt work is done."
              </p>
            </div>

            <TryThisNow title="Create Your First Research Briefing">
              <p className="text-[var(--text-secondary)] mb-4">
                Pick something you're genuinely curious about — a competitor, a potential partner, a market trend, or a person you'll be meeting with. Use this template:
              </p>
              <CopyableCode
                code={`Research [company/person/topic]. I want to understand:
- [Specific aspect 1]
- [Specific aspect 2]
- [Specific aspect 3]

Create a briefing covering: background, key facts, recent developments, and anything surprising. Include sources for key claims. Save to ~/Documents/Research/briefing.md`}
                label="Research briefing delegation template"
              />
              <p className="text-sm text-[var(--text-tertiary)] mt-3">
                Start small — one topic, 3-5 aspects. You can always ask follow-up questions to go deeper.
              </p>
            </TryThisNow>
          </div>
        </div>
      </section>

      {/* Competitive Analysis */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Competitive Analysis</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              One of the highest-value research applications: understanding your competition.
            </p>

            <div className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl mb-6">
              <p className="text-lg font-medium text-[var(--text-primary)] mb-4">Eddie's Competitive Analysis Story:</p>
              <p className="text-[var(--text-secondary)]">
                "When I was building ID8Labs, I needed to understand the AI tools landscape. Not just the big players — the niche tools, the emerging competitors, the ones targeting similar customers. I told Claude: 'Research AI tools for non-technical knowledge workers. Focus on writing assistants, research tools, and automation platforms. For each one, tell me: what it does, who it's for, pricing, and what makes it different. Organize by category. Note any patterns you see.' Took 20 minutes. Saved me a week of browsing and note-taking. The analysis wasn't perfect — I had to verify some details — but the structure was there. I could think strategically instead of drowning in tabs."
              </p>
            </div>

            <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
              <p className="text-sm text-amber-500 font-mono uppercase tracking-wider mb-2">Pro Tip</p>
              <p className="text-sm text-[var(--text-secondary)]">
                Ask for gaps and patterns: "What's everyone doing the same? What's underserved? Where are the opportunities?" This turns raw research into strategic insight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Synthesizing Documents */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <FileTextIcon />
              </span>
              <h2 className="text-2xl font-bold">Synthesizing Long Documents</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              Claude excels at turning long, complex documents into actionable summaries.
            </p>

            <div className="space-y-4 mb-6">
              {documentPatterns.map((pattern, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg"
                >
                  <p className="text-sm font-mono text-id8-orange mb-2">{pattern.type}</p>
                  <code className="block text-sm text-[var(--text-primary)] bg-[var(--bg-primary)] p-3 rounded">
                    {pattern.delegation}
                  </code>
                </m.div>
              ))}
            </div>

            <div className="p-6 bg-id8-orange/5 border border-id8-orange/20 rounded-xl">
              <p className="text-lg font-medium text-[var(--text-primary)] mb-2">Eddie's Document Tip:</p>
              <p className="text-[var(--text-secondary)]">
                "I get a lot of industry reports. PDFs, 50-100 pages each. Used to sit unread in my Downloads folder. Now I tell Claude: 'Read this report. Give me the 10 things I need to know, and tell me if there's anything that directly affects my business.' Takes 2 minutes. I actually read reports now."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research + Action */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Research → Action</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Research is only valuable if it leads to action. Here's how to chain research into next steps.
            </p>

            <div className="space-y-4">
              {actionPatterns.map((pattern, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg"
                >
                  <p className="text-sm font-mono text-id8-orange mb-2">{pattern.type}</p>
                  <code className="block text-sm text-[var(--text-primary)] bg-[var(--bg-secondary)] p-3 rounded">
                    {pattern.pattern}
                  </code>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verification */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <ShieldCheckIcon />
              </span>
              <h2 className="text-2xl font-bold">Verification and Fact-Checking</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              Claude can make mistakes. Sources can be wrong. Verification matters.
            </p>

            <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg mb-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-mono text-id8-orange mb-2">Fact-Check Request</p>
                  <code className="block text-sm text-[var(--text-primary)] bg-[var(--bg-primary)] p-3 rounded">
                    "Here's a claim I found: [claim]. Verify this. Find multiple sources that confirm or contradict it. Tell me how confident I should be in this information."
                  </code>
                </div>
                <div>
                  <p className="text-sm font-mono text-id8-orange mb-2">Source Check</p>
                  <code className="block text-sm text-[var(--text-primary)] bg-[var(--bg-primary)] p-3 rounded">
                    "I'm using this statistic in a presentation: [statistic]. Find the original source. Check if it's still current. Find any contradicting data."
                  </code>
                </div>
              </div>
            </div>

            <div className="p-6 bg-id8-orange/5 border border-id8-orange/20 rounded-xl">
              <p className="text-lg font-medium text-[var(--text-primary)] mb-2">Eddie's Verification Rule:</p>
              <p className="text-[var(--text-secondary)]">
                "I never publish research without verification on key claims. My rule: if a number or fact is going to influence a decision, I tell Claude: 'Find me a second source for this.' If it can't, I'm more cautious. This has saved me from embarrassing mistakes multiple times."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <TerminalIcon />
              </span>
              <h2 className="text-2xl font-bold">Your Challenge: The Competitive Briefing</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              This week, complete a real research project:
            </p>

            <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg mb-6">
              <ol className="text-sm text-[var(--text-secondary)] space-y-3">
                <li><strong>1.</strong> Pick a research target — a competitor, a potential partner, a market you're curious about, or a trend in your industry</li>
                <li><strong>2.</strong> Craft your delegation:
                  <code className="block mt-2 p-3 bg-[var(--bg-secondary)] rounded text-[var(--text-primary)]">
                    "Research [target]. I want to understand: [list 3-5 specific aspects]. Create a briefing that's actionable — tell me what I need to know and what I should do with this information. Include sources for key claims. Save to ~/Documents/Research/[filename].md"
                  </code>
                </li>
                <li><strong>3.</strong> Review the output — What's useful? What needs verification? What's missing?</li>
                <li><strong>4.</strong> Add a follow-up — Ask Claude to go deeper on one aspect, or to turn the research into a specific action item</li>
              </ol>
            </div>

            <div className="p-4 bg-id8-orange/5 border border-id8-orange/20 rounded-lg">
              <p className="text-sm font-medium text-[var(--text-primary)] mb-2">Success looks like:</p>
              <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                <li>• You have a structured briefing on something relevant to your work</li>
                <li>• You saved hours compared to manual research</li>
                <li>• You know which claims need verification</li>
                <li>• You can actually use this information</li>
              </ul>
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
                { num: 1, text: "Claude researches and synthesizes. Not just finding information — turning it into actionable briefings. The shift is from \"help me search\" to \"research this and tell me what I need to know.\"" },
                { num: 2, text: "Competitive analysis in minutes. Company deep dives, landscape overviews, market positioning — work that used to take days now takes minutes." },
                { num: 3, text: "Your files are a research database. Semantic search across your own documents. Meeting notes, contracts, past work — all searchable by meaning." },
                { num: 4, text: "Research → Action. Don't stop at information. Ask for recommendations, comparisons, or draft communications based on what Claude finds." },
                { num: 5, text: "Verification matters. Claude can be wrong. Sources can be outdated. Build verification into your workflow for anything important." },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-3 p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
                  <span className="w-6 h-6 flex items-center justify-center bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-xs font-mono flex-shrink-0">
                    {item.num}
                  </span>
                  <p className="text-sm text-[var(--text-primary)]">{item.text}</p>
                </div>
              ))}
            </div>

            <MentorNote>
              Research is where Claude Code truly shines for knowledge workers. You've likely spent entire days doing what now takes 15 minutes. The key shift: stop thinking of Claude as a search engine. Think of it as a research analyst who can synthesize multiple sources into exactly what you need.
            </MentorNote>
          </div>
        </div>
      </section>

      {/* Mindmap Section */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Module Overview</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Visual map of everything covered in this module.
            </p>
            <div className="rounded-xl overflow-hidden border border-[var(--border)]">
              <Image
                src="/courses/module-4/media/module-4-mindmap.png"
                alt="Module 4 Mindmap - Research & Analysis"
                width={800}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Link
                href="/courses/claude-for-knowledge-workers/module-3"
                className="btn bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeftIcon />
                Previous: Writing With Claude
              </Link>
              <Link
                href="/courses/claude-for-knowledge-workers"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Building Workflows
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </PurchaseGate>
    </AuthGate>
  )
}
