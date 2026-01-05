'use client'

import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import {
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronRight,
  Terminal,
  ExternalLink,
  Copy,
  CheckCircle2,
  CreditCard,
  Github,
  Sparkles,
  Keyboard,
  Command,
  Search,
} from 'lucide-react'

// ============================================
// STEP DATA
// ============================================

interface SetupStep {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  required: boolean
  content: React.ReactNode
}

// ============================================
// COPY BUTTON COMPONENT
// ============================================

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm"
    >
      {copied ? (
        <>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
          <span className="text-zinc-400 group-hover:text-white transition-colors">
            {label || 'Copy'}
          </span>
        </>
      )}
    </button>
  )
}

// ============================================
// CODE BLOCK COMPONENT
// ============================================

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  return (
    <div className="relative group">
      <pre className="p-4 rounded-xl bg-black/50 border border-white/10 overflow-x-auto">
        <code className="text-sm text-emerald-400 font-mono">{code}</code>
      </pre>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton text={code} />
      </div>
    </div>
  )
}

// ============================================
// EXPANDABLE STEP COMPONENT
// ============================================

function ExpandableStep({
  step,
  isOpen,
  onToggle,
  stepNumber,
}: {
  step: SetupStep
  isOpen: boolean
  onToggle: () => void
  stepNumber: number
}) {
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.03] transition-colors">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 md:p-5 text-left"
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] font-bold text-sm">
          {stepNumber}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-lg font-semibold text-white">{step.title}</h4>
            {step.required && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
                Required
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-400 mt-0.5">{step.subtitle}</p>
        </div>
        <div className="p-2 rounded-lg bg-white/5 text-zinc-400">
          {step.icon}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 border-t border-white/10">
              {step.content}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// STEP CONTENT COMPONENTS
// ============================================

function ClaudeSubscriptionContent() {
  return (
    <div className="space-y-4 mt-4">
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-200 font-medium">Subscription Required</p>
            <p className="text-sm text-amber-200/70 mt-1">
              Agent Kits run inside Claude Code, which requires a paid Claude subscription.
              The kit purchase does NOT include the Claude subscription.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-semibold text-white">Claude Pro</h5>
            <span className="text-[var(--id8-orange)] font-bold">$20/mo</span>
          </div>
          <p className="text-sm text-zinc-400">Works great for most users. Recommended starting point.</p>
        </div>
        <div className="p-4 rounded-xl border border-[var(--id8-orange)]/30 bg-[var(--id8-orange)]/5">
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-semibold text-white">Claude Max</h5>
            <span className="text-[var(--id8-orange)] font-bold">$100/mo</span>
          </div>
          <p className="text-sm text-zinc-400">For heavy users. 5x the usage of Pro.</p>
        </div>
      </div>

      <a
        href="https://claude.ai/upgrade"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--id8-orange)] text-white font-semibold hover:bg-[var(--id8-orange)]/90 transition-all"
      >
        Get Claude Pro/Max
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  )
}

function TerminalContent() {
  return (
    <div className="space-y-6 mt-4">
      {/* Pro Tip */}
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-emerald-200 font-medium">Pro Tip: Spotlight Search</p>
            <p className="text-sm text-emerald-200/70 mt-1">
              This is the fastest way to open any app on your Mac. You'll use this constantly.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white font-bold text-sm flex-shrink-0">
            1
          </div>
          <div className="flex-1">
            <p className="text-white font-medium mb-2">Press the keyboard shortcut:</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20">
              <kbd className="px-2 py-1 rounded bg-white/10 text-white font-mono text-sm flex items-center gap-1">
                <Command className="w-3 h-3" />
                <span>⌘</span>
              </kbd>
              <span className="text-zinc-400">+</span>
              <kbd className="px-2 py-1 rounded bg-white/10 text-white font-mono text-sm">
                Space
              </kbd>
            </div>
            <p className="text-sm text-zinc-400 mt-2">
              On Windows: Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-xs">Win</kbd> key
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white font-bold text-sm flex-shrink-0">
            2
          </div>
          <div className="flex-1">
            <p className="text-white font-medium mb-2">Type "Terminal" and press Enter:</p>
            <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-center gap-3">
              <Search className="w-5 h-5 text-zinc-500" />
              <span className="text-white font-mono">Terminal</span>
              <span className="ml-auto px-2 py-1 rounded bg-white/10 text-xs text-zinc-400">↵ Enter</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm flex-shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-white font-medium">A black window appears with a blinking cursor</p>
            <p className="text-sm text-zinc-400 mt-1">
              That's Terminal! This is where you'll run commands. Don't worry—we'll tell you exactly what to type.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ClaudeCodeContent() {
  return (
    <div className="space-y-6 mt-4">
      <p className="text-zinc-300">
        Claude Code is the command-line interface that powers Agent Kits. Copy and paste this command into Terminal:
      </p>

      <CodeBlock code="npm install -g @anthropic-ai/claude-code" />

      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <h5 className="font-semibold text-white mb-2">Don't have npm?</h5>
        <p className="text-sm text-zinc-400 mb-3">
          npm comes with Node.js. If you get an error, install Node.js first:
        </p>
        <div className="space-y-2">
          <a
            href="https://nodejs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[var(--id8-orange)] hover:underline"
          >
            Download Node.js (includes npm)
            <ExternalLink className="w-3 h-3" />
          </a>
          <p className="text-xs text-zinc-500">
            Or on Mac: <code className="px-1.5 py-0.5 rounded bg-white/10 text-emerald-400">brew install node</code>
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-sm flex-shrink-0">
          <Check className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="text-white font-medium">Verify installation:</p>
          <CodeBlock code="claude --version" />
          <p className="text-sm text-zinc-400 mt-2">
            You should see a version number like <code className="text-emerald-400">1.0.x</code>
          </p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[var(--id8-orange)]/10 border border-[var(--id8-orange)]/20">
        <h5 className="font-semibold text-white mb-2">First time running Claude Code?</h5>
        <p className="text-sm text-zinc-300">
          Type <code className="px-1.5 py-0.5 rounded bg-white/10 text-[var(--id8-orange)]">claude</code> and press Enter.
          It will ask you to log in with your Claude account (the one with your subscription).
        </p>
      </div>
    </div>
  )
}

function GitHubContent() {
  return (
    <div className="space-y-6 mt-4">
      <p className="text-zinc-300">
        Agent Kits are delivered via private GitHub repositories. You'll get access after purchase.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
          <h5 className="font-semibold text-white mb-2 flex items-center gap-2">
            <Github className="w-4 h-4" />
            Already have GitHub?
          </h5>
          <p className="text-sm text-zinc-400 mb-3">
            You're all set! After purchase, you'll be invited to the kit repository.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            Ready to go
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[var(--id8-orange)]/30 bg-[var(--id8-orange)]/5">
          <h5 className="font-semibold text-white mb-2 flex items-center gap-2">
            <Github className="w-4 h-4" />
            Need an account?
          </h5>
          <p className="text-sm text-zinc-400 mb-3">
            GitHub is free. Takes 2 minutes to sign up.
          </p>
          <a
            href="https://github.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all"
          >
            Create GitHub Account
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
        <h5 className="font-semibold text-white mb-2">After purchase:</h5>
        <ol className="text-sm text-zinc-400 space-y-2 list-decimal list-inside">
          <li>You'll receive an email invitation to the kit repository</li>
          <li>Accept the invitation (check spam if you don't see it)</li>
          <li>Clone the repo or download the ZIP</li>
          <li>Run the Setup Wizard: <code className="px-1.5 py-0.5 rounded bg-white/10 text-emerald-400">claude</code> then "Read SETUP-WIZARD.md"</li>
        </ol>
      </div>
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function AgentKitOnboarding() {
  const [openStep, setOpenStep] = useState<string | null>(null)
  const [showOnboarding, setShowOnboarding] = useState(true)

  const steps: SetupStep[] = [
    {
      id: 'claude-subscription',
      title: 'Get Claude Pro or Max',
      subtitle: '$20/mo or $100/mo — NOT included with kit purchase',
      icon: <CreditCard className="w-5 h-5" />,
      required: true,
      content: <ClaudeSubscriptionContent />,
    },
    {
      id: 'terminal',
      title: 'Open Terminal',
      subtitle: 'The command line — easier than you think',
      icon: <Keyboard className="w-5 h-5" />,
      required: true,
      content: <TerminalContent />,
    },
    {
      id: 'claude-code',
      title: 'Install Claude Code',
      subtitle: 'One command in Terminal',
      icon: <Terminal className="w-5 h-5" />,
      required: true,
      content: <ClaudeCodeContent />,
    },
    {
      id: 'github',
      title: 'GitHub Account',
      subtitle: 'Free — for repository access',
      icon: <Github className="w-5 h-5" />,
      required: true,
      content: <GitHubContent />,
    },
  ]

  const toggleStep = (stepId: string) => {
    setOpenStep(openStep === stepId ? null : stepId)
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      {/* Header */}
      <div
        className="p-6 rounded-2xl border-2 border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-transparent cursor-pointer hover:border-amber-500/40 transition-colors"
        onClick={() => setShowOnboarding(!showOnboarding)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Before You Buy
                <ChevronDown
                  className={`w-5 h-5 text-amber-400 transition-transform ${showOnboarding ? 'rotate-180' : ''}`}
                />
              </h3>
              <p className="text-amber-200/70">
                Agent Kits require setup. New to this? We'll walk you through everything.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {showOnboarding && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-6 space-y-4">
              {/* Prerequisites Checklist */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                <h4 className="text-lg font-semibold text-white mb-4">What You Need</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                      <span className="text-red-400 text-xs">$</span>
                    </div>
                    <span className="text-zinc-300">Claude Pro/Max subscription</span>
                    <span className="text-zinc-500">($20-100/mo)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-zinc-300">Claude Code CLI</span>
                    <span className="text-zinc-500">(free)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-zinc-300">GitHub account</span>
                    <span className="text-zinc-500">(free)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-zinc-300">Terminal access</span>
                    <span className="text-zinc-500">(built into your computer)</span>
                  </div>
                </div>
              </div>

              {/* Setup Steps */}
              <div className="space-y-3">
                {steps.map((step, index) => (
                  <ExpandableStep
                    key={step.id}
                    step={step}
                    isOpen={openStep === step.id}
                    onToggle={() => toggleStep(step.id)}
                    stepNumber={index + 1}
                  />
                ))}
              </div>

              {/* Ready to Go */}
              <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <div>
                    <p className="text-emerald-200 font-medium">
                      Once you have all these, you're ready to purchase and use any Agent Kit!
                    </p>
                    <p className="text-sm text-emerald-200/70 mt-1">
                      After purchase, each kit includes a Setup Wizard that guides you through configuration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  )
}
