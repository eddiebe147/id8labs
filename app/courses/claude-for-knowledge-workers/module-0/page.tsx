'use client'

import { m } from '@/components/motion'
import Link from 'next/link'
import MiniAudioPlayer from '@/components/MiniAudioPlayer'
import MiniVideoPlayer from '@/components/MiniVideoPlayer'
import EmailCapture from '@/components/EmailCapture'
import Image from 'next/image'
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

const outcomes = [
  "Understand what Claude Code actually is (hint: not for developers)",
  "Install Claude Code on your computer in under 2 minutes",
  "Complete your first real delegation task",
  "Shift from 'assistance' thinking to 'delegation' thinking",
]

const quickStart = [
  { step: "1", command: "curl -fsSL https://claude.ai/install.sh | bash", description: "Install Claude Code" },
  { step: "2", command: "claude", description: "Start a session" },
  { step: "3", command: "cd ~/Downloads", description: "Navigate to a folder" },
  { step: "4", command: '"Organize this folder by file type"', description: "Your first delegation" },
]

export default function Module0Page() {
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
              <span>Module 0</span>
              <span className="text-id8-orange/50">•</span>
              <span>Free</span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              The Mental Model Shift
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed"
            >
              15 minutes to understand what Claude Code actually is — and complete your first real delegation.
            </m.p>

            <m.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a
                href="/courses/module-0/module-0-the-mental-model-shift.pdf"
                download="Module-0-The-Mental-Model-Shift.pdf"
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
                  src="/courses/module-0/media/module-0-the-mental-model-shift.mp4"
                  title="The Mental Model Shift (Video)"
                  downloadName="Module-0-The-Mental-Model-Shift.mp4"
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
                  src="/courses/module-0/media/module-0-the-mental-model-shift.m4a"
                  title="The Mental Model Shift (Podcast)"
                  downloadName="Module-0-The-Mental-Model-Shift.m4a"
                />
              </m.div>

              {/* Mindmap */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)]"
              >
                <h3 className="font-semibold mb-3">Module Mindmap</h3>
                <a
                  href="/courses/module-0/media/module-0-mindmap.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Image
                    src="/courses/module-0/media/module-0-mindmap.png"
                    alt="Module 0 Mindmap - The Mental Model Shift"
                    width={800}
                    height={600}
                    className="w-full rounded-lg border border-[var(--border)] hover:border-id8-orange/50 transition-colors cursor-pointer"
                  />
                </a>
                <p className="text-sm text-[var(--text-tertiary)] mt-2">Click to view full size</p>
              </m.div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="section-spacing border-t border-[var(--border)]">
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
                  className="flex items-start gap-4 p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]"
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

      {/* Quick Start */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-id8-orange">
                <TerminalIcon />
              </span>
              <h2 className="text-2xl font-bold">Quick Start</h2>
            </div>

            <MentorNote>
              Don't just read these commands — actually run them. The mental shift happens when you experience it firsthand.
            </MentorNote>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-id8-orange/10 border border-id8-orange/30 flex items-center justify-center text-id8-orange font-mono text-sm flex-shrink-0">1</span>
                  <p className="text-sm text-[var(--text-tertiary)]">Install Claude Code</p>
                </div>
                <CopyableCode code="curl -fsSL https://claude.ai/install.sh | bash" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-id8-orange/10 border border-id8-orange/30 flex items-center justify-center text-id8-orange font-mono text-sm flex-shrink-0">2</span>
                  <p className="text-sm text-[var(--text-tertiary)]">Start a session</p>
                </div>
                <CopyableCode code="claude" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-id8-orange/10 border border-id8-orange/30 flex items-center justify-center text-id8-orange font-mono text-sm flex-shrink-0">3</span>
                  <p className="text-sm text-[var(--text-tertiary)]">Navigate to a folder</p>
                </div>
                <CopyableCode code="cd ~/Downloads" />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-id8-orange/10 border border-id8-orange/30 flex items-center justify-center text-id8-orange font-mono text-sm flex-shrink-0">4</span>
                  <p className="text-sm text-[var(--text-tertiary)]">Your first delegation</p>
                </div>
                <CopyableCode code={`"Organize this folder by file type"`} />
              </div>
            </div>

            <TryThisNow title="Complete Your First Delegation">
              <p className="text-[var(--text-secondary)] mb-4">
                Right now, open your terminal and try this exact sequence. Watch as Claude Code:
              </p>
              <ul className="space-y-2 text-[var(--text-secondary)] mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-id8-orange mt-1">•</span>
                  <span>Scans your Downloads folder</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-id8-orange mt-1">•</span>
                  <span>Creates subfolders (PDFs, Images, Documents, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-id8-orange mt-1">•</span>
                  <span>Moves files into the right places</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-id8-orange mt-1">•</span>
                  <span>Reports back what it did</span>
                </li>
              </ul>
              <p className="text-sm text-[var(--text-tertiary)]">
                This is delegation. You stated a goal. Claude Code delivered a result.
              </p>
            </TryThisNow>
          </div>
        </div>
      </section>

      {/* The Key Insight */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">The Key Insight</h2>

            <div className="p-6 bg-id8-orange/5 border border-id8-orange/20 rounded-xl">
              <p className="text-xl text-[var(--text-primary)] mb-4 font-medium">
                The shift is from <span className="text-[var(--text-tertiary)]">assistance</span> to{' '}
                <span className="text-id8-orange">delegation</span>.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                  <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-2">Old Way</p>
                  <p className="text-[var(--text-secondary)]">"Help me write interview questions"</p>
                </div>
                <div className="p-4 bg-[var(--bg-primary)] rounded-lg border border-id8-orange/30">
                  <p className="text-xs font-mono uppercase tracking-wider text-id8-orange mb-2">New Way</p>
                  <p className="text-[var(--text-primary)]">"Generate 15 interview questions based on this guest's bio. Save to /Prep/[Name].md"</p>
                </div>
              </div>

              <p className="text-[var(--text-secondary)] mt-6">
                One gives you <strong>suggestions</strong>. The other gives you <strong>deliverables</strong>.
              </p>
            </div>

            <MentorNote>
              This isn't about Claude being "smarter." It's about you thinking differently. When you delegate instead of ask, you get outcomes instead of options. That's the mental model shift.
            </MentorNote>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for More?</h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8">
              Module 0 is just the beginning. The full course covers file organization, writing workflows, research automation, and building your personal operating system.
            </p>

            <Link
              href="/courses/claude-for-knowledge-workers"
              className="btn btn-primary group inline-flex items-center gap-2 mb-12"
            >
              View Full Course
              <ArrowRightIcon />
            </Link>

            {/* Email Capture */}
            <div className="pt-8 border-t border-[var(--border)]">
              <EmailCapture
                source="module-0-cta"
                title="Get notified about new modules and tips"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
