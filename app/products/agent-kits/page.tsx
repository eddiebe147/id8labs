'use client'

import { useState, useEffect, Suspense } from 'react'
import { m } from '@/components/motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  ArrowRight,
  Check,
  Download,
  Package,
  Sparkles,
  Users,
  Brain,
  Shield,
  Code,
  Zap,
  Clock,
  DollarSign,
  Target,
  Layers,
  GitBranch,
  FileText,
  Terminal,
  ChevronDown,
  Star,
} from 'lucide-react'
import AgentKitCheckout from '@/components/checkout/AgentKitCheckout'
import AgentKitOnboarding from '@/components/products/AgentKitOnboarding'

// ============================================
// AGENT KITS DATA - Full specifications
// ============================================

interface AgentKit {
  productId: string
  name: string
  tagline: string
  hook: string // The "sell this pen" line
  description: string
  price: number
  agentCount: number
  icon: React.ReactNode
  accentColor: string
  popular?: boolean
  origin?: string // Origin story for the kit
  originLink?: string // Link to full origin essay
  // Detailed specs
  agents: { name: string; role: string }[]
  features: string[]
  included: string[]
  useCases: string[]
  roi: string // Return on investment statement
}

const agentKits: AgentKit[] = [
  {
    productId: 'agent-kit-tmnt',
    name: 'TMNT Elite',
    tagline: '9-Agent SDK Dev Team',
    hook: "Stop hiring. Start shipping.",
    description: 'A complete software development team that lives in your terminal. Strategic oversight, architecture decisions, code review, QA, DevOps—all coordinated by AI agents that actually talk to each other.',
    price: 129,
    agentCount: 9,
    icon: <Users className="w-6 h-6" />,
    accentColor: 'blue',
    popular: true,
    origin: "I kept treating Claude like one person who could do everything—and nothing connected. Then I realized: I didn't have a mental model for how dev teams work. But I understood the Ninja Turtles. Leo plans, Donnie architects, Mikey builds, Raph enforces. Familiar relationships became scaffolding for new understanding.",
    originLink: "/essays/cowabunga-tmnt-ai-dev-team",
    agents: [
      { name: 'KRANG', role: 'Strategic Brain - Scope protection, priority management' },
      { name: 'Leonardo', role: 'Team Lead - Coordination, task delegation' },
      { name: 'Donatello', role: 'Architect - System design, patterns, tech decisions' },
      { name: 'Raphael', role: 'Security & Review - Code quality, vulnerability scanning' },
      { name: 'Michelangelo', role: 'Creative Dev - UI/UX, prototyping, experiments' },
      { name: 'Splinter', role: 'Mentor - Best practices, learning, wisdom' },
      { name: 'April', role: 'Communications - Docs, changelogs, user-facing copy' },
      { name: 'Casey', role: 'DevOps - CI/CD, deployment, infrastructure' },
      { name: 'Shredder', role: 'QA Adversary - Break things, edge cases, stress tests' },
    ],
    features: [
      'Multi-agent orchestration with handoffs',
      'Scope creep protection built-in',
      'Automatic code review on every change',
      'Architecture decision records',
      'Security scanning integrated',
      'Documentation generated automatically',
    ],
    included: [
      '9 fully configured SDK agents',
      'Orchestration system with handoff protocols',
      'Pattern library (50+ patterns)',
      'CLAUDE.md framework',
      'Setup wizard for 5-minute install',
    ],
    useCases: [
      'Solo founders building MVPs',
      'Small teams needing senior oversight',
      'Agencies handling multiple client projects',
      'Developers wanting code review on every commit',
    ],
    roi: 'Replaces $15-20k/month in senior developer oversight',
  },
  {
    productId: 'agent-kit-llc-ops',
    name: 'LLC Ops',
    tagline: '9-Agent Business Operations',
    hook: "Your $50k back office. For $79.",
    description: "Everything a solo founder hates doing—taxes, compliance, bookkeeping, quarterly planning—handled by AI agents that actually understand LLC operations. Built from running a real Florida LLC.",
    price: 79,
    agentCount: 9,
    icon: <Shield className="w-6 h-6" />,
    accentColor: 'emerald',
    agents: [
      { name: 'Tax Strategist', role: 'Deduction tracking, quarterly estimates, S-Corp analysis' },
      { name: 'Compliance Monitor', role: 'Filing deadlines, annual reports, state requirements' },
      { name: 'Asset Protector', role: 'Liability shields, insurance review, structure optimization' },
      { name: 'Bookkeeper', role: 'Transaction categorization, P&L, balance sheets' },
      { name: 'Cash Flow Analyst', role: 'Runway projections, burn rate, revenue forecasting' },
      { name: 'Quarterly Planner', role: 'OKRs, milestone tracking, strategic planning' },
      { name: 'Audit Preparer', role: 'Documentation, evidence gathering, red flag detection' },
      { name: 'Benefits Advisor', role: 'Retirement options, health insurance, tax-advantaged accounts' },
      { name: 'Mentor', role: 'LLC education, decision frameworks, founder coaching' },
    ],
    features: [
      'Automatic expense categorization',
      'Quarterly tax estimate calculations',
      'Compliance calendar with reminders',
      'Audit-ready documentation',
      'Cash flow projections',
      'S-Corp election analysis',
    ],
    included: [
      '9 specialized business agents',
      'CLAUDE.md with LLC context',
      'Slash commands for common tasks',
      'Workflow templates',
      'Notion integration guides',
      'Setup wizard',
    ],
    useCases: [
      'Solo founders managing their own LLC',
      'Freelancers transitioning to LLC structure',
      'Small business owners without a bookkeeper',
      'Anyone who hates tax season',
    ],
    roi: 'Replaces $50k+/year in accountant, bookkeeper, and advisor fees',
  },
  {
    productId: 'agent-kit-pipeline',
    name: 'Pipeline',
    tagline: '11-Stage Product Methodology',
    hook: "Ideas die in your notes. Ship them instead.",
    description: "The methodology that took ID8Labs from concept to production. 11 stages with hard gates, decay mechanics that punish stalling, and 8 AI agents that keep you honest. No more half-finished projects.",
    price: 79,
    agentCount: 8,
    icon: <Code className="w-6 h-6" />,
    accentColor: 'violet',
    agents: [
      { name: 'Concept Lock', role: 'Forces one-sentence clarity before anything else' },
      { name: 'Scope Fence', role: 'Defines boundaries, creates "not yet" list' },
      { name: 'Architecture Scout', role: 'Stack decisions, component mapping' },
      { name: 'Foundation Builder', role: 'Scaffolding, auth, database, deploy pipeline' },
      { name: 'Feature Blocker', role: 'Vertical slices only, no half-builds allowed' },
      { name: 'Integration Tester', role: 'Connects all pieces, validates data flow' },
      { name: 'Polish Agent', role: 'Error states, loading states, edge cases' },
      { name: 'Launch Prep', role: 'Docs, onboarding, analytics, marketing ready' },
    ],
    features: [
      '11 stages with explicit gates',
      'Decay mechanics (projects lose points when stalled)',
      'Checkpoint validation before advancement',
      'PIPELINE_STATUS.md tracking',
      'Override protocols with audit trail',
      'Built-in scope creep detection',
    ],
    included: [
      '8 stage-specific agents',
      'PIPELINE_STATUS.md template',
      'Decay calculation system',
      'Gate checklists for each stage',
      'Override documentation',
      'Setup wizard',
    ],
    useCases: [
      'Serial builders with too many unfinished projects',
      'Teams that struggle to ship',
      'Founders who over-engineer MVPs',
      'Anyone who needs external accountability',
    ],
    roi: 'Ships 3-5x more projects by eliminating abandonment',
  },
  {
    productId: 'agent-kit-foundry',
    name: 'Foundry',
    tagline: 'Self-Improving Dev Framework',
    hook: "Every project you build makes the next one faster.",
    description: "The meta-system. Captures patterns, decisions, and failures across all your projects. Learns what works for YOU specifically. After 10 projects, it knows your style better than you do.",
    price: 79,
    agentCount: 5,
    icon: <Brain className="w-6 h-6" />,
    accentColor: 'amber',
    agents: [
      { name: 'Pattern Extractor', role: 'Identifies reusable patterns from your code' },
      { name: 'Decision Archaeologist', role: 'Records why you made each choice' },
      { name: 'Anti-Pattern Detector', role: 'Catches mistakes before you repeat them' },
      { name: 'Cross-Project Synthesizer', role: 'Connects learnings across all projects' },
      { name: 'Evolution Tracker', role: 'Measures improvement over time' },
    ],
    features: [
      'Automatic pattern extraction',
      'Architecture Decision Records (ADRs)',
      'Anti-pattern library with explanations',
      'Cross-project knowledge graph',
      'Improvement metrics over time',
      'Personal style codification',
    ],
    included: [
      '5 learning-focused agents',
      'Pattern library starter kit',
      'ADR templates',
      'Knowledge graph structure',
      'Learning protocols',
      'Setup wizard',
    ],
    useCases: [
      'Developers building multiple projects',
      'Teams wanting institutional knowledge',
      'Anyone tired of solving the same problems',
      'Builders who want compounding returns',
    ],
    roi: 'Reduces time-to-ship by 40% after 5 projects',
  },
  {
    productId: 'agent-kit-factory',
    name: 'Factory',
    tagline: 'Multi-AI Creative Pipeline',
    hook: "Midjourney. Grok. Gemini. One workflow.",
    description: "Stop tab-switching between AI tools. Factory orchestrates Midjourney, Grok, Gemini, and others in one tracked workflow. Browser automation handles the clicking. You handle the taste.",
    price: 49,
    agentCount: 4,
    icon: <Sparkles className="w-6 h-6" />,
    accentColor: 'pink',
    agents: [
      { name: 'Orchestrator', role: 'Routes tasks to the right AI tool' },
      { name: 'Prompt Engineer', role: 'Optimizes prompts for each platform' },
      { name: 'Asset Tracker', role: 'Organizes outputs, maintains versions' },
      { name: 'Style Guardian', role: 'Ensures consistency across generations' },
    ],
    features: [
      'Multi-AI tool orchestration',
      'Browser automation via Playwright',
      'Centralized asset management',
      'Style consistency enforcement',
      'Batch processing support',
      'Version tracking for iterations',
    ],
    included: [
      '4 creative orchestration agents',
      'Playwright automation scripts',
      'Prompt template library',
      'Asset organization system',
      'Platform integration guides',
      'Setup wizard',
    ],
    useCases: [
      'Content creators using multiple AI tools',
      'Designers needing consistent outputs',
      'Marketing teams with high volume needs',
      'Anyone drowning in browser tabs',
    ],
    roi: 'Saves 10+ hours/week on AI tool management',
  },
]

const bundlePrice = 299
const totalIndividualPrice = agentKits.reduce((sum, kit) => sum + kit.price, 0)
const bundleSavings = totalIndividualPrice - bundlePrice
const totalAgents = agentKits.reduce((sum, kit) => sum + kit.agentCount, 0)

// ============================================
// COMPONENTS
// ============================================

function ValueProp({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--id8-orange)]/10 flex items-center justify-center text-[var(--id8-orange)]">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function FullKitCard({
  kit,
  onPurchase,
  isExpanded,
  onToggle,
}: {
  kit: AgentKit
  onPurchase: (productId: string) => void
  isExpanded: boolean
  onToggle: () => void
}) {
  const colorMap: Record<string, string> = {
    blue: 'border-blue-500/30 bg-blue-500/5',
    emerald: 'border-emerald-500/30 bg-emerald-500/5',
    violet: 'border-violet-500/30 bg-violet-500/5',
    amber: 'border-amber-500/30 bg-amber-500/5',
    pink: 'border-pink-500/30 bg-pink-500/5',
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative rounded-2xl border transition-all ${
        kit.popular
          ? 'border-[var(--id8-orange)]/50 shadow-[0_0_60px_-15px_rgba(255,107,0,0.4)]'
          : 'border-white/10 hover:border-white/20'
      } bg-white/[0.02]`}
    >
      {kit.popular && (
        <div className="absolute -top-3 left-6 px-3 py-1 bg-[var(--id8-orange)] text-white text-xs font-bold rounded-full flex items-center gap-1">
          <Star className="w-3 h-3" />
          MOST POPULAR
        </div>
      )}

      {/* Pizza Slice for TMNT */}
      {kit.productId === 'agent-kit-tmnt' && (
        <div className="absolute -top-4 -right-4 z-10 transform rotate-12">
          <div className="relative text-6xl drop-shadow-lg" title="Cowabunga!">
            🍕
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${colorMap[kit.accentColor]} text-white`}>
              {kit.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{kit.name}</h3>
              <p className="text-sm text-zinc-400">{kit.tagline}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">${kit.price}</div>
            <div className="text-xs text-zinc-500">{kit.agentCount} agents</div>
          </div>
        </div>

        {/* Hook - The "Sell This Pen" Line */}
        <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xl font-semibold text-[var(--id8-orange)]">"{kit.hook}"</p>
        </div>

        {/* Description */}
        <p className="text-zinc-300 leading-relaxed mb-6">{kit.description}</p>

        {/* Origin Story (if exists) */}
        {kit.origin && (
          <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 border-l-4 border-l-[var(--id8-orange)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-[var(--id8-orange)] uppercase tracking-wider">Origin Story</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed italic mb-2">{kit.origin}</p>
            {kit.originLink && (
              <Link
                href={kit.originLink}
                className="inline-flex items-center gap-1 text-sm text-[var(--id8-orange)] hover:underline"
              >
                Read the full story
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        )}

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {kit.features.map((feature) => (
            <div key={feature} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-zinc-300">{feature}</span>
            </div>
          ))}
        </div>

        {/* ROI Statement */}
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-400">Return on Investment</span>
          </div>
          <p className="text-emerald-200 text-sm">{kit.roi}</p>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          {isExpanded ? 'Hide Details' : 'Show All Agents & Specs'}
          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Expanded Details */}
        {isExpanded && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-white/10 pt-6 mt-4"
          >
            {/* Agents List */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-[var(--id8-orange)]" />
                All {kit.agentCount} Agents
              </h4>
              <div className="space-y-3">
                {kit.agents.map((agent) => (
                  <div key={agent.name} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                    <div className="w-2 h-2 rounded-full bg-[var(--id8-orange)] mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-white">{agent.name}</span>
                      <p className="text-sm text-zinc-400">{agent.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Package className="w-4 h-4 text-[var(--id8-orange)]" />
                What's Included
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {kit.included.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-[var(--id8-orange)]" />
                Perfect For
              </h4>
              <div className="flex flex-wrap gap-2">
                {kit.useCases.map((useCase) => (
                  <span
                    key={useCase}
                    className="px-3 py-1.5 rounded-full text-xs bg-white/5 border border-white/10 text-zinc-300"
                  >
                    {useCase}
                  </span>
                ))}
              </div>
            </div>
          </m.div>
        )}

        {/* CTA */}
        <button
          onClick={() => onPurchase(kit.productId)}
          className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group ${
            kit.popular
              ? 'bg-[var(--id8-orange)] text-white hover:bg-[var(--id8-orange)]/90'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Download className="w-5 h-5" />
          Get {kit.name}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </m.div>
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

function AgentKitsContent() {
  const [checkoutProduct, setCheckoutProduct] = useState<string | null>(null)
  const [expandedKit, setExpandedKit] = useState<string | null>(null)
  const searchParams = useSearchParams()

  // Auto-open checkout modal if redirected back from sign-in
  useEffect(() => {
    const checkoutParam = searchParams.get('checkout')
    if (checkoutParam) {
      // Validate the product ID exists
      const validProductIds = agentKits.map(k => k.productId).concat(['agent-kit-bundle'])
      if (validProductIds.includes(checkoutParam)) {
        setCheckoutProduct(checkoutParam)
        // Clean up URL without triggering a reload
        window.history.replaceState({}, '', '/products/agent-kits')
      }
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--id8-orange)]/5 via-transparent to-transparent" />

        <div className="relative max-w-[1200px] mx-auto">
          {/* Back Link */}
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white mb-8 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Link>

          {/* Hero Content */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]">
                <Package className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-[var(--id8-orange)]">Agent Kits</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
              AI teams that actually
              <span className="text-[var(--id8-orange)]"> work.</span>
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed mb-8">
              Not prompts. Not templates. Complete agent systems built from years of production use.
              <span className="text-zinc-300"> Configure once, delegate forever.</span>
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold text-white">{totalAgents}</div>
                <div className="text-sm text-zinc-500">Total Agents</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">5</div>
                <div className="text-sm text-zinc-500">Complete Kits</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">1</div>
                <div className="text-sm text-zinc-500">Year of Development</div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="px-6 py-16 border-y border-white/10 bg-white/[0.01]">
        <div className="max-w-[1200px] mx-auto">
          <m.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-12 text-center"
          >
            Why Agent Kits?
          </m.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueProp
              icon={<Clock className="w-6 h-6" />}
              title="5-Minute Setup"
              description="Each kit includes a Setup Wizard. Claude walks you through everything—no manual configuration needed."
            />
            <ValueProp
              icon={<Layers className="w-6 h-6" />}
              title="Production-Tested"
              description="Every kit was built to solve real problems. LLC Ops runs an actual LLC. TMNT Elite ships real software."
            />
            <ValueProp
              icon={<GitBranch className="w-6 h-6" />}
              title="Multi-Agent Coordination"
              description="Agents talk to each other. The architect informs the developer. The reviewer catches what the builder missed."
            />
            <ValueProp
              icon={<FileText className="w-6 h-6" />}
              title="Complete Systems"
              description="Not just prompts—full CLAUDE.md frameworks, slash commands, workflow templates, and documentation."
            />
            <ValueProp
              icon={<Terminal className="w-6 h-6" />}
              title="Claude Code Native"
              description="Built specifically for Claude Code CLI. Use natural language to invoke any agent, anytime."
            />
            <ValueProp
              icon={<Zap className="w-6 h-6" />}
              title="Immediate ROI"
              description="Stop paying for senior oversight, back office, or productivity tools. One purchase, unlimited use."
            />
          </div>
        </div>
      </section>

      {/* Onboarding Section */}
      <section className="px-6 py-16">
        <div className="max-w-[1200px] mx-auto">
          <AgentKitOnboarding />
        </div>
      </section>

      {/* Bundle Banner */}
      <section className="px-6 pb-8">
        <div className="max-w-[1200px] mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border-2 border-[var(--id8-orange)]/40 bg-gradient-to-r from-[var(--id8-orange)]/10 via-[var(--id8-orange)]/5 to-transparent"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-[var(--id8-orange)]" />
                  <span className="text-sm font-semibold text-[var(--id8-orange)] uppercase tracking-wider">Best Value</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Complete Agent Bundle</h3>
                <p className="text-zinc-400">
                  All 5 kits • {totalAgents} agents • Everything you need to build, ship, and run a business
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm text-zinc-500 line-through">${totalIndividualPrice}</div>
                  <div className="text-4xl font-bold text-white">${bundlePrice}</div>
                  <div className="text-sm font-semibold text-emerald-400">Save ${bundleSavings}</div>
                </div>
                <button
                  onClick={() => setCheckoutProduct('agent-kit-bundle')}
                  className="px-8 py-4 rounded-xl bg-[var(--id8-orange)] text-white font-semibold hover:bg-[var(--id8-orange)]/90 transition-all flex items-center gap-2 group"
                >
                  Get Bundle
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* All Kits Section */}
      <section className="px-6 py-16">
        <div className="max-w-[1200px] mx-auto">
          <m.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-8"
          >
            All Agent Kits
          </m.h2>

          <div className="space-y-8">
            {agentKits.map((kit) => (
              <FullKitCard
                key={kit.productId}
                kit={kit}
                onPurchase={setCheckoutProduct}
                isExpanded={expandedKit === kit.productId}
                onToggle={() => setExpandedKit(expandedKit === kit.productId ? null : kit.productId)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-[800px] mx-auto text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Still deciding?
            </h2>
            <p className="text-zinc-400 mb-8">
              Start with LLC Ops or Pipeline at $79. See how it transforms your workflow.
              <br />
              Then grab the bundle when you're ready for the full stack.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setCheckoutProduct('agent-kit-llc-ops')}
                className="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all"
              >
                Start with LLC Ops ($79)
              </button>
              <button
                onClick={() => setCheckoutProduct('agent-kit-bundle')}
                className="px-6 py-3 rounded-xl bg-[var(--id8-orange)] text-white font-semibold hover:bg-[var(--id8-orange)]/90 transition-all"
              >
                Get the Bundle ($299)
              </button>
            </div>
          </m.div>
        </div>
      </section>

      {/* Checkout Modal */}
      <AgentKitCheckout
        productId={checkoutProduct || ''}
        isOpen={checkoutProduct !== null}
        onClose={() => setCheckoutProduct(null)}
      />
    </div>
  )
}

export default function AgentKitsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="animate-pulse text-zinc-500">Loading...</div>
      </div>
    }>
      <AgentKitsContent />
    </Suspense>
  )
}
