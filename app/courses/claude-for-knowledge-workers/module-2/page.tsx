'use client'

import { m } from '@/components/motion'
import Link from 'next/link'
import Image from 'next/image'
import MiniAudioPlayer from '@/components/MiniAudioPlayer'
import MiniVideoPlayer from '@/components/MiniVideoPlayer'
import { PurchaseGate } from '@/components/PurchaseGate'
import AuthGate from '@/components/auth/AuthGate'
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

const FolderIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
)

const SearchIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
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
        {copied ? <CheckIconSmall /> : <CopyIcon />}
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

// Module 2 content
const outcomes = [
  "Understand what Claude can and cannot see on your computer",
  "Process documents at scale — summarize, extract, and organize",
  "Master invoice and receipt organization workflows",
  "Use semantic search to find files by meaning, not just filename",
  "Analyze storage and clean up disk space intelligently",
]

const claudeCanSee = [
  { category: "Can See", items: ["Your entire user folder (Documents, Downloads, Desktop, Pictures)", "Text files, PDFs, Word documents, spreadsheets", "Images (can describe what's in them)", "Code files, config files, markdown files", "Anything in folders you've granted access to"] },
  { category: "Cannot See", items: ["System files (protected by your OS)", "Files in folders you haven't granted permission for", "Content inside apps (like your email inbox or browser tabs)", "Cloud files that aren't synced locally"] },
]

const processingPatterns = [
  { task: "Summarize multiple files", pattern: '"Read all [files] in [folder]. Extract [specific info]. Create summary in [output file]."' },
  { task: "Batch rename with content", pattern: '"Rename files in [folder] using [pattern] based on information inside each file."' },
  { task: "Extract to spreadsheet", pattern: '"Extract [fields] from each file in [folder]. Create [filename].csv with the data."' },
  { task: "Find by meaning", pattern: '"Find files in [folder] related to [topic/project/concept]."' },
]

const realExamples = [
  {
    title: "The Invoice Dump",
    scenario: "47 receipts scattered across email, Downloads, and phone photos",
    delegation: '"Look at ~/Documents/LLC/ToProcess/. These are business expenses. Extract vendor, date, amount, and category (software, equipment, services, travel, meals). Rename each file. Move to ~/Documents/LLC/2024-Expenses/ organized by category. Create an expense-log.csv with all the data."',
    result: "3 minutes. CSV goes straight to the bookkeeper.",
  },
  {
    title: "The Storage Reclaim",
    scenario: "Running low on disk space, didn't want to buy a new drive",
    delegation: '"Audit my entire user folder. Find everything over 500MB that I haven\'t touched in a year. Find all duplicate files. Find any video files outside my Videos folder."',
    result: "90GB of recoverable space identified. Old iOS backups, duplicate downloads, video exports already uploaded elsewhere. 20 minutes to review and delete. Saved $200 on a new drive.",
  },
  {
    title: "Cast Research Briefings",
    scenario: "Producing a reality TV show, need briefings on 10 cast members",
    delegation: '"Research these 10 cast members. For each one, find: social media presence, any news coverage, relationship history, and potential storylines. Create a briefing document for each person, saved to ~/Documents/CastBriefings/."',
    result: "Ten detailed briefings in 15 minutes. Used to be half a day's work.",
  },
]

export default function Module2Page() {
  return (
    <AuthGate moduleName="Module 2: Working With Your Files">
    <PurchaseGate productId="claude-for-knowledge-workers" moduleName="Module 2: Working With Your Files">
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
              <span>Module 2</span>
              <span className="text-id8-orange/50">•</span>
              <span>60 min</span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Working With Your Files
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed"
            >
              Process files at scale. Summarize 50 PDFs. Extract data from contracts. Organize a year of invoices in minutes. This is where Claude Code stops being a novelty and starts saving you serious hours.
            </m.p>

            <m.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a
                href="/courses/module-2/module-2-working-with-your-files.pdf"
                download="Module-2-Working-With-Your-Files.pdf"
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
                  src="/courses/module-2/media/module-2-working-with-your-files.mp4"
                  title="Working With Your Files (Video)"
                  downloadName="Module-2-Working-With-Your-Files.mp4"
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
                  src="/courses/module-2/media/module-2-working-with-your-files.m4a"
                  title="Working With Your Files (Podcast)"
                  downloadName="Module-2-Working-With-Your-Files.m4a"
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
                You've built confidence with quick wins in Module 1. You've run delegations, handled Claude's questions, and started building the reflex to delegate instead of doing everything manually.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Now we're going deeper. This module is about processing files at scale — the kind of work that used to take hours and now takes minutes.
              </p>
            </m.div>
          </div>
        </div>
      </section>

      {/* What Claude Can See */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <FolderIcon />
              </span>
              <h2 className="text-2xl font-bold">What Claude Can Actually See</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-8">
              Before we process files, you need to understand what Claude can access. This affects what you can delegate.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {claudeCanSee.map((section, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    section.category === "Can See"
                      ? "bg-green-500/5 border-green-500/20"
                      : "bg-red-500/5 border-red-500/20"
                  }`}
                >
                  <p className={`text-sm font-mono uppercase tracking-wider mb-3 ${
                    section.category === "Can See" ? "text-green-500" : "text-red-500"
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
              <p className="text-lg font-medium text-[var(--text-primary)] mb-2">Eddie's Advice:</p>
              <p className="text-[var(--text-secondary)]">
                "I keep everything I want Claude to work with in my Documents folder. It's my 'Claude workspace.' If I download something I want processed, I move it there first. Clean boundaries = fewer permission headaches."
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

      {/* Document Processing Power */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Document Processing Power</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Claude doesn't just move files around — it reads them, understands them, and extracts exactly what you need.
            </p>

            <div className="space-y-4">
              {processingPatterns.map((pattern, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg"
                >
                  <p className="text-sm font-mono text-id8-orange mb-2">{pattern.task}</p>
                  <code className="block text-sm text-[var(--text-primary)] bg-[var(--bg-primary)] p-3 rounded">
                    {pattern.pattern}
                  </code>
                </m.div>
              ))}
            </div>

            <TryThisNow title="Process Your First Batch">
              <p className="text-[var(--text-secondary)] mb-4">
                Find a folder with multiple similar files (PDFs, invoices, documents). Try this delegation:
              </p>
              <CopyableCode
                code={`Look at ~/Downloads. Find all PDF files. For each one, extract the title and first paragraph. Create a summary.md file listing each PDF with its extracted info.`}
                label="Your batch processing delegation"
              />
              <p className="text-sm text-[var(--text-tertiary)] mt-4">
                Start with read-only operations like this. Once you see Claude accurately extracting information, you'll trust it to organize and rename.
              </p>
            </TryThisNow>
          </div>
        </div>
      </section>

      {/* Real Examples */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">Real Examples from Eddie's Workflow</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              These aren't hypotheticals. These are actual delegations that save hours every week.
            </p>

            <div className="space-y-6">
              {realExamples.map((example, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl"
                >
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{example.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">
                    <strong>Scenario:</strong> {example.scenario}
                  </p>
                  <div className="mb-4 p-3 bg-[var(--bg-secondary)] rounded-lg">
                    <p className="text-xs font-mono text-[var(--text-tertiary)] mb-1">The Delegation:</p>
                    <code className="text-sm text-[var(--text-primary)] block">{example.delegation}</code>
                  </div>
                  <p className="text-sm text-id8-orange font-medium">
                    Result: {example.result}
                  </p>
                </m.div>
              ))}
            </div>

            <MentorNote>
              Notice the pattern: be specific about what you want extracted, where it should go, and what format you need. The more precise your delegation, the less back-and-forth.
            </MentorNote>
          </div>
        </div>
      </section>

      {/* Semantic Search */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-id8-orange">
                <SearchIcon />
              </span>
              <h2 className="text-2xl font-bold">Finding Things (Semantic Search)</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              This is one of Claude's superpowers that most people don't realize: you can search your files by <strong className="text-[var(--text-primary)]">meaning</strong>, not just filename.
            </p>

            <div className="space-y-4 mb-8">
              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="text-sm font-mono text-id8-orange mb-2">Find forgotten work</p>
                <code className="block text-sm text-[var(--text-primary)] bg-[var(--bg-primary)] p-3 rounded">
                  "Look through ~/Documents/. Find any files related to presentations or pitch decks I created in 2023. List them with a one-sentence description of what each one contains."
                </code>
              </div>

              <div className="p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                <p className="text-sm font-mono text-id8-orange mb-2">The "I know I wrote this somewhere" problem</p>
                <code className="block text-sm text-[var(--text-primary)] bg-[var(--bg-primary)] p-3 rounded">
                  "Search my Documents folder for anything where I wrote about pricing strategies or how to price consulting services. Show me the relevant excerpts."
                </code>
              </div>
            </div>

            <div className="p-6 bg-id8-orange/5 border border-id8-orange/20 rounded-xl">
              <p className="text-lg font-medium text-[var(--text-primary)] mb-2">Eddie's Example:</p>
              <p className="text-[var(--text-secondary)]">
                "I write a lot. Essays, notes, client proposals, scripts. When I start a new project, I often remember 'I wrote something about this before.' Used to mean 30 minutes of searching. Now: 'Find anything I've written about AI tools for non-programmers.' Claude surfaces 8 files I'd forgotten about, including a draft that became the foundation for this course."
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
              <h2 className="text-2xl font-bold">Your Challenge: The Invoice Cleanup</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              This week, process real financial documents. Take <strong className="text-[var(--text-primary)]">10-20 receipts or invoices</strong> and run this workflow:
            </p>

            <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg mb-6">
              <ol className="text-sm text-[var(--text-secondary)] space-y-3">
                <li><strong>1.</strong> Move them to a processing folder: Create ~/Documents/ExpenseTest/</li>
                <li><strong>2.</strong> Run this delegation:
                  <code className="block mt-2 p-3 bg-[var(--bg-secondary)] rounded text-[var(--text-primary)]">
                    "Look at ~/Documents/ExpenseTest/. These are business expenses. For each file, extract: date, vendor, amount, and category (guess the category based on the vendor—software, travel, meals, services, equipment, or other). Rename each file to YYYY-MM-DD_Vendor_$Amount.pdf. Create an expense-summary.csv with all the data."
                  </code>
                </li>
                <li><strong>3.</strong> Review the results — check that Claude extracted the information correctly</li>
                <li><strong>4.</strong> Refine if needed — if categories are wrong, re-delegate with more specific instructions</li>
              </ol>
            </div>

            <div className="p-4 bg-id8-orange/5 border border-id8-orange/20 rounded-lg">
              <p className="text-sm font-medium text-[var(--text-primary)] mb-2">Success looks like:</p>
              <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                <li>• Your expenses are renamed consistently</li>
                <li>• You have a CSV that could go to a bookkeeper</li>
                <li>• You understand how Claude reads and extracts from documents</li>
                <li>• You spent minutes instead of an hour</li>
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
                { num: 1, text: "Claude reads documents. Not just filenames — actual content. PDFs, images, Word docs." },
                { num: 2, text: "Batch processing is the superpower. One delegation can process 50 files. Same formula: Context + Outcome + Location." },
                { num: 3, text: "Semantic search beats keyword search. \"Find anything about the Johnson project\" works better than hoping you named files well." },
                { num: 4, text: "Financial documents are a perfect use case. Receipts, invoices, expense reports — tedious, repetitive, perfect for delegation." },
                { num: 5, text: "Start with reports, then act. \"Show me what's there\" before \"delete everything old.\"" },
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

      {/* Mindmap Section */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Module Overview</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Visual map of everything covered in this module.
            </p>
            <div className="rounded-xl overflow-hidden border border-[var(--border)]">
              <Image
                src="/courses/module-2/media/module-2-mindmap.png"
                alt="Module 2 Mindmap - Working With Your Files"
                width={800}
                height={400}
                className="w-full h-auto"
              />
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
                href="/courses/claude-for-knowledge-workers/module-1"
                className="btn bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeftIcon />
                Previous: Your First Delegation
              </Link>
              <Link
                href="/courses/claude-for-knowledge-workers"
                className="btn btn-primary group inline-flex items-center gap-2"
              >
                Next: Writing With Claude
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
