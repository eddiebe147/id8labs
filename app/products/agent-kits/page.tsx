'use client'

import { useState, useEffect, Suspense } from 'react'
import { m } from '@/components/motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  ArrowRight,
  Check,
  Download,
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
  Briefcase,
  TrendingUp,
  Palette,
  Search,
  Settings,
  MessageSquare,
} from 'lucide-react'
import AgentKitCheckout from '@/components/checkout/AgentKitCheckout'
import AgentKitOnboarding from '@/components/products/AgentKitOnboarding'

// ============================================
// C-SUITE PERSONAS DATA
// ============================================

interface Persona {
  productId: string
  name: string
  role: string
  tagline: string
  hook: string
  description: string
  price: number
  skillCount: number
  icon: React.ReactNode
  accentColor: string
  popular?: boolean
  voiceExample: string
  // Detailed specs
  coreSkills: string[]
  mcps: { name: string; purpose: string }[]
  plugins: string[]
  triggers: string[]
  features: string[]
  perfectFor: string[]
  roi: string
}

const personas: Persona[] = [
  {
    productId: 'persona-builder',
    name: 'The Builder',
    role: 'CTO / Technical Lead',
    tagline: 'Ships production code',
    hook: "Stop hiring. Start shipping.",
    description: "Your technical co-founder. 15 years of shipping production systems. Writes code that works, ships features that matter, keeps technical debt manageable. Direct, efficient, pragmatic.",
    price: 79,
    skillCount: 27,
    icon: <Code className="w-6 h-6" />,
    accentColor: 'blue',
    popular: true,
    voiceExample: "Here's the implementation. Three files modified. Tests passing. Ready for review.",
    coreSkills: [
      'Python', 'JavaScript/TypeScript', 'React', 'Node.js', 'SQL',
      'API Integration', 'Docker', 'GitHub Actions', 'Cloud Deploy',
      'Serverless', 'Infrastructure as Code', 'Prompt Engineering',
      'Agent Design', 'MCP Builder', 'API Docs', 'README',
      'Wireframes', 'Frontend Design', 'React Components', 'Landing Pages',
    ],
    mcps: [
      { name: 'GitHub', purpose: 'Code management, PRs, issues' },
      { name: 'Supabase', purpose: 'Database, auth, edge functions' },
      { name: 'Playwright', purpose: 'Testing, browser automation' },
    ],
    plugins: ['testing-suite', 'feature-dev', 'git-workflow'],
    triggers: ['build', 'implement', 'code', 'deploy', 'fix', 'debug', 'test', 'API', 'database', 'architecture'],
    features: [
      'Full-stack development (React, Node, Python)',
      'Database design and optimization',
      'CI/CD pipeline management',
      'Code review and quality gates',
      'Performance optimization',
      'AI/ML integration',
    ],
    perfectFor: [
      'Solo founders building MVPs',
      'Teams needing senior technical oversight',
      'Developers wanting code review on every commit',
    ],
    roi: 'Replaces $15-20k/month in senior developer oversight',
  },
  {
    productId: 'persona-ceo',
    name: 'The CEO',
    role: 'Strategic Lead / Founder',
    tagline: 'Sets the vision, makes the calls',
    hook: "Clarity over consensus. Speed over perfection.",
    description: "Your strategic partner. Makes decisions with incomplete information—and owns them. Sees around corners. Keeps you focused on what actually matters. Delegates ruthlessly.",
    price: 79,
    skillCount: 23,
    icon: <Briefcase className="w-6 h-6" />,
    accentColor: 'violet',
    voiceExample: "Here's my decision. This aligns with our Q2 goals. Builder: ship by Friday. CMO: prep launch messaging.",
    coreSkills: [
      'Project Planning', 'Roadmap', 'Sprint Planning', 'OKRs',
      'KPI Dashboard', 'Risk Assessment', 'Prioritization',
      'Meeting Agenda', 'Decision Log', 'Strategy Framework',
      'SWOT Analysis', 'Business Plan', 'Pitch Deck', 'One-Pager',
    ],
    mcps: [
      { name: 'Memory', purpose: 'Long-term context and decisions' },
      { name: 'Notion', purpose: 'Strategic documents, roadmaps' },
    ],
    plugins: ['operations-manager', 'strategic-think-tank'],
    triggers: ['strategy', 'decision', 'priority', 'roadmap', 'vision', 'goals', 'pivot', 'focus', 'should we'],
    features: [
      'Strategic planning and vision setting',
      'Priority management and resource allocation',
      'Decision-making frameworks',
      'Team coordination and delegation',
      'OKR setting and tracking',
      'Risk assessment and mitigation',
    ],
    perfectFor: [
      'Founders needing strategic clarity',
      'Teams with priority conflicts',
      'Anyone drowning in decisions',
    ],
    roi: 'Ships 3-5x more by eliminating decision paralysis',
  },
  {
    productId: 'persona-cfo',
    name: 'The CFO',
    role: 'Finance & Compliance',
    tagline: 'Protects the money, manages the risk',
    hook: "Your $50k back office. For $79.",
    description: "Your financial guardian. 20 years in finance, from Big 4 to startup CFO. Protects cash, manages risk, keeps you compliant. Cautious, precise, protective.",
    price: 79,
    skillCount: 15,
    icon: <Shield className="w-6 h-6" />,
    accentColor: 'emerald',
    voiceExample: "Before we proceed, let me review the numbers. Runway impact: 0.8 months. Tax note: deductible under Section 179.",
    coreSkills: [
      'Financial Model', 'Budget Template', 'Expense Report',
      'Invoice Processing', 'Revenue Forecast', 'NDA',
      'Terms of Service', 'Privacy Policy', 'Contract Review',
      'Compliance Checklist', 'Business Plan', 'Pitch Deck',
    ],
    mcps: [
      { name: 'Supabase', purpose: 'Financial data storage' },
    ],
    plugins: ['llc-ops'],
    triggers: ['finance', 'budget', 'expense', 'tax', 'compliance', 'legal', 'contract', 'revenue', 'cost', 'runway'],
    features: [
      'Automatic expense categorization',
      'Quarterly tax estimate calculations',
      'Compliance calendar with reminders',
      'Contract review and analysis',
      'Cash flow projections',
      'S-Corp election analysis',
    ],
    perfectFor: [
      'Solo founders managing their own LLC',
      'Anyone who hates tax season',
      'Founders without a bookkeeper',
    ],
    roi: 'Replaces $50k+/year in accountant and advisor fees',
  },
  {
    productId: 'persona-cmo',
    name: 'The CMO',
    role: 'Growth & Content',
    tagline: 'Builds the audience, drives the growth',
    hook: "Distribution beats creation. Every time.",
    description: "Your growth engine. Former head of growth at a unicorn. Knows what makes content spread and campaigns convert. Energetic, creative, audience-obsessed.",
    price: 79,
    skillCount: 40,
    icon: <TrendingUp className="w-6 h-6" />,
    accentColor: 'pink',
    voiceExample: "This could go viral if we position it right. Here's the hook. Let's test it on Twitter first.",
    coreSkills: [
      'Email Composer', 'Cold Outreach', 'Newsletter', 'LinkedIn Posts',
      'Twitter Threads', 'Instagram Captions', 'YouTube Descriptions',
      'Blog Posts', 'Copywriting', 'Ad Copy', 'Taglines', 'Storytelling',
      'Sales Playbook', 'Customer Persona', 'Marketing Brief', 'GTM Plan',
      'Press Release', 'Case Study',
    ],
    mcps: [
      { name: 'Firecrawl', purpose: 'Web research, competitor analysis' },
      { name: 'Playwright', purpose: 'Social media automation' },
    ],
    plugins: ['social-media-manager', 'content-publishing', 'x-viral-optimizer'],
    triggers: ['marketing', 'content', 'social', 'audience', 'growth', 'brand', 'campaign', 'viral', 'launch'],
    features: [
      'Multi-platform content strategy',
      'Viral hook crafting',
      'Launch coordination',
      'Email marketing automation',
      'SEO optimization',
      'Audience research and personas',
    ],
    perfectFor: [
      'Founders launching products',
      'Teams needing content strategy',
      'Anyone building an audience',
    ],
    roi: 'Saves 15+ hours/week on content creation',
  },
  {
    productId: 'persona-coo',
    name: 'The COO',
    role: 'Operations & Process',
    tagline: 'Makes things run smoothly',
    hook: "Good systems free people to do their best work.",
    description: "Your operations backbone. Turns chaos into systems. Documents what works. Makes sure handoffs don't drop. Systematic, organized, process-driven.",
    price: 49,
    skillCount: 19,
    icon: <Settings className="w-6 h-6" />,
    accentColor: 'amber',
    voiceExample: "Let me document this as an SOP for next time. Here's the process. Who owns this?",
    coreSkills: [
      'Project Plan', 'Roadmap', 'Sprint Planning', 'Task Breakdown',
      'Checklist Generator', 'SOP', 'Meeting Agenda', 'Facilitation Guide',
      'Retrospective', 'Decision Log', 'RACI Matrix',
      'Job Description', 'Interview Questions', 'Onboarding Docs',
    ],
    mcps: [
      { name: 'Notion', purpose: 'Documentation, wikis, databases' },
    ],
    plugins: ['operations-manager'],
    triggers: ['process', 'operations', 'workflow', 'SOP', 'efficiency', 'team', 'hiring', 'onboarding', 'meeting'],
    features: [
      'SOP creation and management',
      'Meeting facilitation and agendas',
      'Onboarding documentation',
      'Process optimization',
      'Team coordination',
      'Retrospective facilitation',
    ],
    perfectFor: [
      'Teams scaling operations',
      'Founders tired of reinventing wheels',
      'Anyone needing better documentation',
    ],
    roi: 'Reduces operational overhead by 40%',
  },
  {
    productId: 'persona-creative',
    name: 'The Creative Director',
    role: 'Design & Media',
    tagline: 'Shapes the look, guards the brand',
    hook: "Good design is invisible. Great design is unforgettable.",
    description: "Your visual guardian. Former agency creative lead. Obsessed with typography, color, and the details that make design sing. Taste-driven, precise, brand-protective.",
    price: 49,
    skillCount: 30,
    icon: <Palette className="w-6 h-6" />,
    accentColor: 'rose',
    voiceExample: "The visual hierarchy needs work. CTA competes with headline. Here's the fix—specific hex values included.",
    coreSkills: [
      'Logo Concepts', 'Brand Guidelines', 'Color Palettes', 'Typography Pairing',
      'Mood Boards', 'Infographics', 'Wireframes', 'Frontend Design',
      'Landing Pages', 'Flowcharts', 'System Diagrams', 'Storytelling',
      'Scripts', 'Shot List', 'Story Beats', 'Treatment',
    ],
    mcps: [
      { name: 'Playwright', purpose: 'Visual testing, screenshots' },
    ],
    plugins: ['nana-image-generator', 'notebooklm-producer'],
    triggers: ['design', 'visual', 'brand', 'logo', 'colors', 'typography', 'layout', 'UI', 'UX', 'aesthetic'],
    features: [
      'Brand identity development',
      'UI/UX design specs',
      'Image generation prompting',
      'Design system creation',
      'Visual quality review',
      'Media production planning',
    ],
    perfectFor: [
      'Teams needing brand consistency',
      'Founders without design skills',
      'Anyone creating visual content',
    ],
    roi: 'Saves $5k+/project in design costs',
  },
  {
    productId: 'persona-analyst',
    name: 'The Analyst',
    role: 'Research & Intelligence',
    tagline: 'Finds the truth in the data',
    hook: "Data without context is noise. I find the signal.",
    description: "Your research engine. Former McKinsey analyst. Turns ambiguity into clarity through research. Thorough, objective, evidence-based. Always cites sources.",
    price: 49,
    skillCount: 19,
    icon: <Search className="w-6 h-6" />,
    accentColor: 'cyan',
    voiceExample: "The data suggests three possible interpretations. Here's what the evidence shows. Confidence: High.",
    coreSkills: [
      'Web Research', 'Competitive Analysis', 'Market Research',
      'Academic Research', 'Patent Search', 'News Monitoring',
      'Data Cleaning', 'Exploratory Analysis', 'Statistical Analysis',
      'Sentiment Analysis', 'Trend Analysis', 'Survey Analysis',
      'Literature Review', 'Report Synthesis', 'SWOT Analysis',
    ],
    mcps: [
      { name: 'Perplexity', purpose: 'AI-powered research' },
      { name: 'Firecrawl', purpose: 'Web scraping and research' },
    ],
    plugins: ['market-intelligence-analyst'],
    triggers: ['research', 'data', 'analysis', 'market', 'competitive', 'trend', 'report', 'insights', 'study'],
    features: [
      'Market sizing and research',
      'Competitive landscape analysis',
      'Trend identification',
      'Data synthesis and reporting',
      'Due diligence support',
      'Confidence-level assessments',
    ],
    perfectFor: [
      'Founders entering new markets',
      'Teams needing competitive intel',
      'Anyone making data-driven decisions',
    ],
    roi: 'Saves 20+ hours/week on research',
  },
]

const cSuitePrice = 299
const totalIndividualPrice = personas.reduce((sum, p) => sum + p.price, 0)
const cSuiteSavings = totalIndividualPrice - cSuitePrice
const totalSkills = personas.reduce((sum, p) => sum + p.skillCount, 0)

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

function PersonaCard({
  persona,
  onPurchase,
  isExpanded,
  onToggle,
}: {
  persona: Persona
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
    rose: 'border-rose-500/30 bg-rose-500/5',
    cyan: 'border-cyan-500/30 bg-cyan-500/5',
  }

  const textColorMap: Record<string, string> = {
    blue: 'text-blue-400',
    emerald: 'text-emerald-400',
    violet: 'text-violet-400',
    amber: 'text-amber-400',
    pink: 'text-pink-400',
    rose: 'text-rose-400',
    cyan: 'text-cyan-400',
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative rounded-2xl border transition-all ${
        persona.popular
          ? 'border-[var(--id8-orange)]/50 shadow-[0_0_60px_-15px_rgba(255,107,0,0.4)]'
          : 'border-white/10 hover:border-white/20'
      } bg-white/[0.02]`}
    >
      {persona.popular && (
        <div className="absolute -top-3 left-6 px-3 py-1 bg-[var(--id8-orange)] text-white text-xs font-bold rounded-full flex items-center gap-1">
          <Star className="w-3 h-3" />
          MOST POPULAR
        </div>
      )}

      {/* Main Content */}
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${colorMap[persona.accentColor]} text-white`}>
              {persona.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{persona.name}</h3>
              <p className="text-sm text-zinc-400">{persona.role}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">${persona.price}</div>
            <div className="text-xs text-zinc-500">{persona.skillCount} skills</div>
          </div>
        </div>

        {/* Hook */}
        <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xl font-semibold text-[var(--id8-orange)]">"{persona.hook}"</p>
        </div>

        {/* Description */}
        <p className="text-zinc-300 leading-relaxed mb-6">{persona.description}</p>

        {/* Voice Example */}
        <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 border-l-4 border-l-[var(--id8-orange)]">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-[var(--id8-orange)]" />
            <span className="text-xs font-semibold text-[var(--id8-orange)] uppercase tracking-wider">Voice Sample</span>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed italic">"{persona.voiceExample}"</p>
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {persona.features.map((feature) => (
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
          <p className="text-emerald-200 text-sm">{persona.roi}</p>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          {isExpanded ? 'Hide Details' : 'Show Skills, MCPs & Triggers'}
          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Expanded Details */}
        {isExpanded && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-white/10 pt-6 mt-4"
          >
            {/* MCPs */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[var(--id8-orange)]" />
                MCP Integrations
              </h4>
              <div className="space-y-2">
                {persona.mcps.map((mcp) => (
                  <div key={mcp.name} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <div className="w-2 h-2 rounded-full bg-[var(--id8-orange)] flex-shrink-0" />
                    <div>
                      <span className="font-medium text-white">{mcp.name}</span>
                      <span className="text-zinc-500 ml-2">— {mcp.purpose}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plugins */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--id8-orange)]" />
                Plugins
              </h4>
              <div className="flex flex-wrap gap-2">
                {persona.plugins.map((plugin) => (
                  <span
                    key={plugin}
                    className={`px-3 py-1.5 rounded-full text-xs bg-white/5 border border-white/10 ${textColorMap[persona.accentColor]}`}
                  >
                    {plugin}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Skills */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Brain className="w-4 h-4 text-[var(--id8-orange)]" />
                Core Skills ({persona.skillCount})
              </h4>
              <div className="flex flex-wrap gap-2">
                {persona.coreSkills.slice(0, 12).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 rounded text-xs bg-white/5 text-zinc-400"
                  >
                    {skill}
                  </span>
                ))}
                {persona.coreSkills.length > 12 && (
                  <span className="px-2 py-1 rounded text-xs bg-white/10 text-zinc-300">
                    +{persona.coreSkills.length - 12} more
                  </span>
                )}
              </div>
            </div>

            {/* Trigger Keywords */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-[var(--id8-orange)]" />
                Auto-Triggers
              </h4>
              <p className="text-xs text-zinc-500 mb-2">Automatically activates when you mention:</p>
              <div className="flex flex-wrap gap-2">
                {persona.triggers.map((trigger) => (
                  <code
                    key={trigger}
                    className="px-2 py-1 rounded text-xs bg-zinc-800 text-zinc-300 font-mono"
                  >
                    {trigger}
                  </code>
                ))}
              </div>
            </div>

            {/* Perfect For */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-[var(--id8-orange)]" />
                Perfect For
              </h4>
              <div className="flex flex-wrap gap-2">
                {persona.perfectFor.map((useCase) => (
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
          onClick={() => onPurchase(persona.productId)}
          className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group ${
            persona.popular
              ? 'bg-[var(--id8-orange)] text-white hover:bg-[var(--id8-orange)]/90'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Download className="w-5 h-5" />
          Hire {persona.name}
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
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const checkoutParam = searchParams.get('checkout')
    if (checkoutParam) {
      const validProductIds = personas.map(p => p.productId).concat(['c-suite-bundle'])
      if (validProductIds.includes(checkoutParam)) {
        setCheckoutProduct(checkoutParam)
        window.history.replaceState({}, '', '/products/agent-kits')
      }
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--id8-orange)]/5 via-transparent to-transparent" />

        <div className="relative max-w-[1200px] mx-auto">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white mb-8 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </Link>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[var(--id8-orange)]/10 text-[var(--id8-orange)]">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-[var(--id8-orange)]">AI Executive Team</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
              Your AI
              <span className="text-[var(--id8-orange)]"> C-Suite.</span>
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed mb-4">
              Not just agents. <span className="text-zinc-200">Colleagues.</span>
            </p>
            <p className="text-lg text-zinc-400 leading-relaxed mb-8">
              7 AI executives, each with distinct expertise, voice, and judgment.
              Talk to them like team members. They collaborate automatically when tasks span domains.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold text-white">7</div>
                <div className="text-sm text-zinc-500">Executive Personas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{totalSkills}+</div>
                <div className="text-sm text-zinc-500">Bundled Skills</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">187</div>
                <div className="text-sm text-zinc-500">Skills Coming</div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 border-y border-white/10 bg-white/[0.01]">
        <div className="max-w-[1200px] mx-auto">
          <m.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-12 text-center"
          >
            Why Personas?
          </m.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueProp
              icon={<MessageSquare className="w-6 h-6" />}
              title="Talk Like Colleagues"
              description="'Hey Builder, implement this API.' 'CEO, should we pursue this opportunity?' Natural delegation to the right expert."
            />
            <ValueProp
              icon={<Brain className="w-6 h-6" />}
              title="Distinct Expertise"
              description="Each persona has specialized skills, MCPs, and judgment. The CFO thinks differently than the CMO."
            />
            <ValueProp
              icon={<GitBranch className="w-6 h-6" />}
              title="Auto-Collaboration"
              description="Cross-domain tasks automatically convene the right personas. Launch a feature? Builder + CMO + CFO coordinate."
            />
            <ValueProp
              icon={<Zap className="w-6 h-6" />}
              title="Keyword Triggers"
              description="Say 'budget' and the CFO activates. Say 'deploy' and the Builder steps up. Smart routing built-in."
            />
            <ValueProp
              icon={<FileText className="w-6 h-6" />}
              title="187 Skills Included"
              description="Full skill marketplace access. Each persona comes equipped with 15-40 relevant skills from the library."
            />
            <ValueProp
              icon={<Clock className="w-6 h-6" />}
              title="5-Minute Setup"
              description="Drop the persona files in ~/.claude/personas/. Instant access to your entire executive team."
            />
          </div>
        </div>
      </section>

      {/* Onboarding */}
      <section className="px-6 py-16">
        <div className="max-w-[1200px] mx-auto">
          <AgentKitOnboarding />
        </div>
      </section>

      {/* C-Suite Bundle Banner */}
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
                  <Users className="w-5 h-5 text-[var(--id8-orange)]" />
                  <span className="text-sm font-semibold text-[var(--id8-orange)] uppercase tracking-wider">Best Value</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Full C-Suite</h3>
                <p className="text-zinc-400">
                  All 7 personas • {totalSkills}+ skills • Auto-collaboration mode • Complete executive team
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm text-zinc-500 line-through">${totalIndividualPrice}</div>
                  <div className="text-4xl font-bold text-white">${cSuitePrice}</div>
                  <div className="text-sm font-semibold text-emerald-400">Save ${cSuiteSavings}</div>
                </div>
                <button
                  onClick={() => setCheckoutProduct('c-suite-bundle')}
                  className="px-8 py-4 rounded-xl bg-[var(--id8-orange)] text-white font-semibold hover:bg-[var(--id8-orange)]/90 transition-all flex items-center gap-2 group"
                >
                  Hire the Team
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* All Personas */}
      <section className="px-6 py-16">
        <div className="max-w-[1200px] mx-auto">
          <m.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-8"
          >
            Meet the Team
          </m.h2>

          <div className="space-y-8">
            {personas.map((persona) => (
              <PersonaCard
                key={persona.productId}
                persona={persona}
                onPurchase={setCheckoutProduct}
                isExpanded={expandedPersona === persona.productId}
                onToggle={() => setExpandedPersona(expandedPersona === persona.productId ? null : persona.productId)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Org Chart */}
      <section className="px-6 py-16 border-t border-white/10">
        <div className="max-w-[800px] mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              They Work Together
            </h2>
            <p className="text-zinc-400 mb-8">
              The CEO coordinates. The Builder implements. The CFO reviews costs.
              <br />
              Auto-collaboration for cross-domain tasks.
            </p>

            {/* Simple Org Chart */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <pre className="text-xs md:text-sm text-zinc-400 font-mono leading-relaxed">
{`                    ┌─────────────┐
                    │   The CEO   │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐       ┌─────▼─────┐      ┌─────▼─────┐
   │ Builder │       │    CMO    │      │    CFO    │
   └────┬────┘       └─────┬─────┘      └───────────┘
        │                  │
   ┌────▼────┐       ┌─────▼─────┐
   │Creative │       │  Analyst  │
   └─────────┘       └───────────┘

        ┌─────────────┐
        │    COO      │ (Cross-functional)
        └─────────────┘`}
              </pre>
            </div>
          </m.div>
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
              Start with one. Scale to seven.
            </h2>
            <p className="text-zinc-400 mb-8">
              Most founders start with The Builder + The CEO.
              <br />
              Add personas as your needs grow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setCheckoutProduct('persona-builder')}
                className="px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all"
              >
                Start with The Builder ($79)
              </button>
              <button
                onClick={() => setCheckoutProduct('c-suite-bundle')}
                className="px-6 py-3 rounded-xl bg-[var(--id8-orange)] text-white font-semibold hover:bg-[var(--id8-orange)]/90 transition-all"
              >
                Hire Full C-Suite ($299)
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
