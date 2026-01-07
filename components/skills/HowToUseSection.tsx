'use client'

import { useState } from 'react'
import { 
  BookOpen, 
  Download, 
  Zap, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Terminal, 
  Code2, 
  Package, 
  ChevronDown, 
  ChevronUp,
  LayoutGrid,
  Sparkles
} from 'lucide-react'

type TabType = 'agent-kits' | 'skills-vs-agents' | 'general-install'

export function HowToUseSection() {
  const [activeTab, setActiveTab] = useState<TabType>('agent-kits')

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold border border-blue-500/20">
            <BookOpen className="w-4 h-4" />
            Getting Started
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How to Install & Use StackShack
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
            Choose your workflow. From single skills to complete autonomous teams.
          </p>

          {/* Tab Navigation */}
          <div className="inline-flex flex-wrap justify-center gap-2 p-1 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
            <TabButton 
              isActive={activeTab === 'agent-kits'} 
              onClick={() => setActiveTab('agent-kits')}
              icon={<Package className="w-4 h-4" />}
              label="Agent Kits (Pro)"
            />
            <TabButton 
              isActive={activeTab === 'skills-vs-agents'} 
              onClick={() => setActiveTab('skills-vs-agents')}
              icon={<LayoutGrid className="w-4 h-4" />}
              label="Skills vs Agents"
            />
            <TabButton 
              isActive={activeTab === 'general-install'} 
              onClick={() => setActiveTab('general-install')}
              icon={<Terminal className="w-4 h-4" />}
              label="Installation Guide"
            />
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-5xl mx-auto min-h-[500px]">
          {activeTab === 'agent-kits' && <AgentKitsTab />}
          {activeTab === 'skills-vs-agents' && <SkillsVsAgentsTab />}
          {activeTab === 'general-install' && <GeneralInstallTab />}
        </div>
      </div>
    </section>
  )
}

/* =========================================================================
   TAB BUTTON COMPONENT
   ========================================================================= */
function TabButton({ 
  isActive, 
  onClick, 
  icon, 
  label 
}: { 
  isActive: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string 
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
        isActive 
          ? 'bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-sm ring-1 ring-[var(--border)]' 
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]/50'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

/* =========================================================================
   TAB 1: AGENT KITS (PREMIUM VALUE)
   ========================================================================= */
function AgentKitsTab() {
  return (
    <div className="animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl border-2 border-[var(--id8-orange)] bg-[var(--bg-primary)]">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--id8-orange)]/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="p-4 bg-[var(--id8-orange)] text-white rounded-2xl shadow-lg shadow-[var(--id8-orange)]/30">
              <Package className="w-10 h-10" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] text-xs font-bold uppercase tracking-wider rounded-full">
                <Sparkles className="w-3 h-3" />
                Recommended Way to Start
              </div>
              <h3 className="text-3xl font-bold mb-2">Agent Kits: Full Teams in a Box</h3>
              <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
                These aren't just regular agents. They are complete, multi-agent orchestration systems designed to handle complex, end-to-end workflows.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="p-5 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)]">
              <h4 className="font-bold mb-2 flex items-center gap-2 text-lg">
                <Users className="w-5 h-5 text-[var(--id8-orange)]" />
                Orchestrated Teams
              </h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Kits come with a lead "Brain" agent that delegates tasks to specialized sub-agents automatically. No micromanagement needed.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)]">
              <h4 className="font-bold mb-2 flex items-center gap-2 text-lg">
                <Terminal className="w-5 h-5 text-[var(--id8-orange)]" />
                Pre-Configured
              </h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Includes all necessary MCP server configs, prompts, and memory structures ready to go. Zero setup friction.
              </p>
            </div>
            <div className="p-5 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)]">
              <h4 className="font-bold mb-2 flex items-center gap-2 text-lg">
                <Zap className="w-5 h-5 text-[var(--id8-orange)]" />
                Production Ready
              </h4>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Built on the same architecture we use to build ID8Labs products. Field-tested in real production environments.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/skills/starter-kits" className="btn btn-primary px-8 py-3 text-lg">
              <Download className="w-5 h-5" />
              Browse Agent Kits
            </a>
            <div className="flex items-center gap-3 px-5 py-3 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-lg text-sm border border-[var(--border)] font-mono">
              <span className="text-[var(--id8-orange)]">$</span>
              <span>/install-kit [kit-name]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================================================================
   TAB 2: SKILLS VS AGENTS
   ========================================================================= */
function SkillsVsAgentsTab() {
  return (
    <div className="animate-fade-in grid md:grid-cols-2 gap-6">
      {/* Skills Card */}
      <div className="relative p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] h-full">
        <div className="absolute -top-4 left-8 px-4 py-1.5 bg-emerald-500 text-white text-sm font-bold rounded-full">
          Skills
        </div>
        <div className="flex items-center gap-3 mb-4 mt-2">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold">Task Specialists</h3>
        </div>
        <p className="text-[var(--text-secondary)] mb-6 min-h-[3rem]">
          Focused prompts that teach Claude Code how to perform specific tasks or solve particular problems.
        </p>
        
        <div className="space-y-4">
          <FeatureRow icon={<CheckCircle className="text-emerald-500" />} title="Single-purpose tools" desc="Each skill does one thing really well" />
          <FeatureRow icon={<CheckCircle className="text-emerald-500" />} title="Task-oriented" desc="Optimized for specific workflows" />
          <FeatureRow icon={<CheckCircle className="text-emerald-500" />} title="Mix & match" desc="Combine multiple skills for complex work" />
        </div>
      </div>

      {/* Agents Card */}
      <div className="relative p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] h-full">
        <div className="absolute -top-4 left-8 px-4 py-1.5 bg-purple-500 text-white text-sm font-bold rounded-full">
          Agents
        </div>
        <div className="flex items-center gap-3 mb-4 mt-2">
          <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold">Domain Experts</h3>
        </div>
        <p className="text-[var(--text-secondary)] mb-6 min-h-[3rem]">
          Personas with deep expertise in specific domains. They provide context, make decisions, and guide projects.
        </p>
        
        <div className="space-y-4">
          <FeatureRow icon={<CheckCircle className="text-purple-500" />} title="Domain expertise" desc="Deep knowledge in specific areas" />
          <FeatureRow icon={<CheckCircle className="text-purple-500" />} title="Strategic thinking" desc="Guides entire workflows and projects" />
          <FeatureRow icon={<CheckCircle className="text-purple-500" />} title="Best practices" desc="Enforces patterns and standards" />
        </div>
      </div>
    </div>
  )
}

function FeatureRow({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 w-5 h-5 flex-shrink-0">{icon}</div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-[var(--text-secondary)]">{desc}</p>
      </div>
    </div>
  )
}

/* =========================================================================
   TAB 3: GENERAL INSTALLATION (ACCORDIONS)
   ========================================================================= */
function GeneralInstallTab() {
  return (
    <div className="animate-fade-in space-y-4 max-w-3xl mx-auto">
      <AccordionItem 
        number="1"
        title="One-Click Install (Recommended)"
        subtitle="For individual skills and agents"
        color="emerald"
        defaultOpen={true}
      >
        <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] mt-2">
          <p className="text-[var(--text-secondary)] mb-4">
            Browse StackShack, click any skill or agent, and hit the "Add to Claude" button. This automatically updates your configuration.
          </p>
          <div className="flex items-center gap-2 text-sm text-emerald-500 font-medium">
            <CheckCircle className="w-4 h-4" />
            Easiest for beginners
          </div>
        </div>
      </AccordionItem>

      <AccordionItem 
        number="2"
        title="Install Starter Kits"
        subtitle="For getting productive immediately"
        color="purple"
      >
        <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] mt-2">
          <p className="text-[var(--text-secondary)] mb-4">
            Visit the Starter Kits page to install curated bundles of 10-15 skills designed for specific workflows (frontend dev, writing, data analysis).
          </p>
          <a href="/skills/starter-kits" className="text-sm text-purple-500 font-medium hover:underline flex items-center gap-1">
            Browse Starter Kits <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </AccordionItem>

      <AccordionItem 
        number="3"
        title="Manual Installation (Advanced)"
        subtitle="Full control via terminal"
        color="blue"
      >
        <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] mt-2 font-mono text-sm">
          <div className="flex items-center gap-2 mb-2 text-[var(--text-tertiary)]">
            <Terminal className="w-4 h-4" />
            <span>Terminal</span>
          </div>
          <div className="space-y-1">
            <div className="text-[var(--text-secondary)]">
              <span className="text-emerald-500">$</span> cd ~/.claude/
            </div>
            <div className="text-[var(--text-secondary)]">
              <span className="text-emerald-500">$</span> mkdir -p skills agents
            </div>
            <div className="text-[var(--text-secondary)]">
              <span className="text-emerald-500">$</span> curl -o skills/email-composer.md [url]
            </div>
          </div>
        </div>
      </AccordionItem>
    </div>
  )
}

function AccordionItem({ 
  number, 
  title, 
  subtitle, 
  color, 
  children,
  defaultOpen = false
}: { 
  number: string
  title: string
  subtitle: string
  color: 'emerald' | 'purple' | 'blue'
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  const colors = {
    emerald: 'bg-emerald-500/10 text-emerald-500',
    purple: 'bg-purple-500/10 text-purple-500',
    blue: 'bg-blue-500/10 text-blue-500',
  }

  return (
    <div className={`rounded-xl border transition-all duration-200 ${isOpen ? 'bg-[var(--bg-primary)] border-[var(--border)] ring-1 ring-[var(--border)]' : 'bg-[var(--bg-primary)] border-[var(--border)] hover:bg-[var(--bg-secondary)]'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-4 p-4 text-left"
      >
        <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg font-bold ${colors[color]}`}>
          {number}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-lg">{title}</h4>
          <p className="text-sm text-[var(--text-secondary)]">{subtitle}</p>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-[var(--text-tertiary)]" /> : <ChevronDown className="w-5 h-5 text-[var(--text-tertiary)]" />}
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 pl-[4.5rem] animate-slide-down">
          {children}
        </div>
      )}
    </div>
  )
}