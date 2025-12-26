'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import MiniAudioPlayer from '@/components/MiniAudioPlayer'
import MiniVideoPlayer from '@/components/MiniVideoPlayer'

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

const outcomes = [
  "Install Claude Code on your computer in under 2 minutes",
  "Master the Delegation Formula: Context + Outcome + Location",
  "Complete your first real file organization task",
  "Handle common issues like permissions and recovery",
  "Build confidence with low-risk, high-reward wins",
]

const delegationFormula = [
  { component: "Context", description: "What Claude needs to know", example: '"My Downloads folder has 3 years of accumulated files."' },
  { component: "Outcome", description: 'What "done" looks like', example: '"Organize by file type, delete old items."' },
  { component: "Location", description: "Where to work and save results", example: '"Work in ~/Downloads, summary to ~/Desktop."' },
]

export default function Module1Page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-zone-text">
        <div className="container">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <Link
                href="/courses/claude-for-knowledge-workers"
                className="inline-flex items-center gap-2 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors mb-6"
              >
                <ArrowLeftIcon />
                Back to Course
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-id8-orange/10 border border-id8-orange/30 rounded-full text-id8-orange text-sm font-mono mb-6"
            >
              <span>Module 1</span>
              <span className="text-id8-orange/50">•</span>
              <span>45 min</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            >
              Your First Delegation
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed"
            >
              Learn the delegation formula that makes Claude Code work every time — and clean up your Downloads folder in the process.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a
                href="/courses/module-1/module-1-your-first-delegation.pdf"
                download="Module-1-Your-First-Delegation.pdf"
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
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <MiniVideoPlayer
                  src="/courses/module-1/media/module-1-your-first-delegation.mp4"
                  title="Your First Delegation (Video)"
                  downloadName="Module-1-Your-First-Delegation.mp4"
                />
              </motion.div>

              {/* Audio Player */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <MiniAudioPlayer
                  src="/courses/module-1/media/module-1-your-first-delegation.m4a"
                  title="Your First Delegation (Podcast)"
                  downloadName="Module-1-Your-First-Delegation.m4a"
                />
              </motion.div>
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
                <motion.div
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
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Delegation Formula */}
      <section className="section-spacing bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">The Delegation Formula</h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Every effective delegation follows this pattern. Master it once, use it forever.
            </p>

            <div className="p-6 bg-id8-orange/5 border border-id8-orange/20 rounded-xl mb-8">
              <p className="text-2xl font-mono text-center text-[var(--text-primary)]">
                <span className="text-id8-orange">Context</span>
                {' + '}
                <span className="text-id8-orange">Outcome</span>
                {' + '}
                <span className="text-id8-orange">Location</span>
              </p>
            </div>

            <div className="space-y-4">
              {delegationFormula.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-id8-orange/10 border border-id8-orange/30 rounded text-id8-orange text-sm font-mono">
                      {item.component}
                    </span>
                    <span className="text-[var(--text-secondary)] text-sm">{item.description}</span>
                  </div>
                  <code className="block text-sm text-[var(--text-primary)] bg-[var(--bg-secondary)] p-3 rounded">
                    {item.example}
                  </code>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bad vs Good Delegation */}
      <section className="section-spacing border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">The Difference</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-tertiary)] mb-2">Asking (Old Way)</p>
                <p className="text-[var(--text-secondary)]">"Help me organize my Downloads folder."</p>
                <p className="text-sm text-[var(--text-tertiary)] mt-3">Starts a conversation. You still do the thinking.</p>
              </div>
              <div className="p-4 bg-[var(--bg-primary)] rounded-lg border border-id8-orange/30">
                <p className="text-xs font-mono uppercase tracking-wider text-id8-orange mb-2">Delegating (New Way)</p>
                <p className="text-[var(--text-primary)]">"Look at my Downloads folder. Group files by type into subfolders. Delete anything older than 6 months. Put a summary in ~/Desktop/cleanup-log.txt."</p>
                <p className="text-sm text-id8-orange/70 mt-3">Starts work. Claude executes autonomously.</p>
              </div>
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
              <h2 className="text-2xl font-bold">Your Challenge: The Downloads Audit</h2>
            </div>

            <p className="text-[var(--text-secondary)] mb-6">
              Copy this delegation into Claude Code and watch the magic happen:
            </p>

            <div className="p-4 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg mb-6">
              <code className="block text-sm text-[var(--text-primary)] whitespace-pre-wrap">
{`"Look at my Downloads folder. Tell me how many files are in there, how much space they're using, and what the oldest file is. Then organize everything into subfolders by file type. Delete anything that's over 6 months old unless it's a document or PDF. Put a summary of everything you did in ~/Desktop/downloads-cleanup.md."`}
              </code>
            </div>

            <div className="p-4 bg-id8-orange/5 border border-id8-orange/20 rounded-lg">
              <p className="text-sm font-medium text-[var(--text-primary)] mb-2">When you're done, you should have:</p>
              <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                <li>• A clean Downloads folder with organized subfolders</li>
                <li>• A summary file on your Desktop</li>
                <li>• The satisfying feeling of delegating instead of doing</li>
              </ul>
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
                src="/courses/module-1/media/module-1-mindmap.png"
                alt="Module 1 Mindmap - Mastering Claude Code Delegation"
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
                href="/courses/claude-for-knowledge-workers/module-0"
                className="btn bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] hover:border-id8-orange/50 transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeftIcon />
                Previous: The Mental Model Shift
              </Link>
              <Link
                href="/courses/claude-for-knowledge-workers"
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
