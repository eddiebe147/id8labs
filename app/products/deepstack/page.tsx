import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'DeepStack - ID8Labs',
  description: 'Autonomous AI-powered trading system combining deep value investing with Claude integration. Sophisticated risk management, multi-strategy framework, and beautiful PipBoy-inspired CLI.',
}

export default function DeepStackPage() {
  return (
    <div className="container py-24">
      <article className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-12 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to products
        </Link>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <h1>DeepStack</h1>
            <span className="text-sm px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full">
              Core system complete
            </span>
          </div>
          <p className="text-2xl text-[var(--text-secondary)] mb-8">
            Autonomous AI-Powered Trading with Claude Integration
          </p>
        </header>

        {/* Description */}
        <section className="mb-16 space-y-6 text-lg leading-relaxed">
          <p>
            DeepStack is a sophisticated algorithmic trading system that combines deep value investing
            principles with modern AI analysis. Built for disciplined, systematic trading with comprehensive
            risk management.
          </p>
          <p>
            Trading involves substantial risk. Most traders lose money. DeepStack doesn't fix that—but it
            enforces discipline, manages risk systematically, and removes emotion from decisions.
          </p>
          <p>
            <strong className="text-id8-orange">Built on proven principles:</strong> Deep value investing,
            Kelly Criterion position sizing, multi-layer risk controls, and Claude AI for market analysis.
            Every trade is logged, every decision is auditable.
          </p>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Core Features</h2>
          <ul className="space-y-6 text-lg">
            <li className="flex gap-4">
              <span className="text-2xl text-id8-orange">●</span>
              <div>
                <strong>AI-Powered Analysis</strong> — Claude AI integration for market analysis,
                strategy execution, and risk assessment. Every decision includes AI reasoning.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl text-id8-orange">●</span>
              <div>
                <strong>Multi-Strategy Framework</strong> — Deep value investing, short squeeze detection,
                and pairs trading. Test strategies in paper trading before risking real capital.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl text-id8-orange">●</span>
              <div>
                <strong>Advanced Risk Management</strong> — Kelly Criterion sizing, portfolio heat tracking,
                stop losses, circuit breakers, and emergency stops. Multiple layers of protection.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl text-id8-orange">●</span>
              <div>
                <strong>PipBoy-Inspired CLI</strong> — Beautiful retro-futuristic terminal interface.
                Real-time dashboard, position monitoring, risk display, and market scanning.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl text-id8-orange">●</span>
              <div>
                <strong>Broker Integration</strong> — Interactive Brokers support with both live and
                paper trading modes. Test risk-free before going live.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl text-id8-orange">●</span>
              <div>
                <strong>Complete Audit Trail</strong> — Every trade, every decision, every AI analysis
                logged. Performance analytics and trade journaling built-in.
              </div>
            </li>
          </ul>
        </section>

        {/* Architecture */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">System Architecture</h2>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft p-6 font-mono text-sm overflow-x-auto">
            <pre className="text-[var(--text-secondary)]">{`┌─────────────────────────────────────────────────────┐
│                  DeepStack System                   │
├─────────────────────────────────────────────────────┤
│  🤖 AI Agents    │  📊 CLI         │  ⚙️  Backend   │
│  ├── Base        │  ├── Dashboard  │  ├── FastAPI   │
│  ├── Strategy    │  ├── Monitor    │  ├── IBKR      │
│  └── Risk        │  └── Scanner    │  └── Paper     │
├─────────────────────────────────────────────────────┤
│  📈 Strategies   │  🛡️ Risk Mgmt   │  💾 Data       │
│  ├── Deep Value  │  ├── Portfolio  │  ├── SQLite    │
│  ├── Squeeze     │  ├── Kelly      │  ├── Market    │
│  └── Pairs       │  └── Stops      │  └── Analytics │
└─────────────────────────────────────────────────────┘`}</pre>
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-16 p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
          <h3 className="text-2xl font-bold mb-4 text-id8-orange">Trading Philosophy</h3>
          <ul className="space-y-3 text-lg text-[var(--text-secondary)]">
            <li>• Deep Value Investing: Find undervalued companies with strong fundamentals</li>
            <li>• Short Squeeze Detection: Identify stocks with high short interest and catalysts</li>
            <li>• Risk Management: Never risk more than you can afford to lose</li>
            <li>• Systematic Approach: Remove emotion from trading decisions</li>
            <li>• Continuous Learning: Every trade is a learning opportunity</li>
          </ul>
        </section>

        {/* Disclaimer */}
        <section className="mb-16 p-6 bg-red-500/5 border-2 border-red-500/20 rounded-soft">
          <h3 className="text-xl font-bold mb-3 text-red-400">⚠️ Risk Disclaimer</h3>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Trading involves substantial risk of loss and is not suitable for every investor.
            Past performance does not guarantee future results. Only trade with money you can
            afford to lose. The developers of DeepStack are not responsible for any financial
            losses incurred through the use of this software.
          </p>
        </section>

        {/* Status */}
        <section className="pt-12 border-t border-[var(--border)]">
          <div className="space-y-4">
            <p className="text-lg text-[var(--text-secondary)]">
              <strong>Status:</strong> Core system complete, active testing phase
            </p>
            <p className="text-lg text-[var(--text-secondary)]">
              <strong>Tech Stack:</strong> Python, FastAPI, Claude AI, Interactive Brokers API,
              Node.js CLI
            </p>
            <p className="text-lg text-[var(--text-secondary)]">
              <strong>Repository:</strong> Private (systematic trading edge requires discretion)
            </p>
            <div className="pt-4">
              <a
                href="mailto:hello@id8labs.com?subject=DeepStack%20Interest"
                className="inline-flex items-center gap-2 text-lg px-8 py-4 border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-[var(--bg-primary)] transition-all duration-200 rounded-soft"
              >
                Express Interest
              </a>
            </div>
          </div>
        </section>
      </article>
    </div>
  )
}
