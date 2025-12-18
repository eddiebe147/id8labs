import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'DeepStack - ID8Labs',
  description: 'AI-powered trading research platform. Claude-powered analysis, professional charts, thesis tracking, trade journaling, prediction markets, and an emotional firewall. Research only—we never execute trades.',
}

const features = [
  {
    icon: '🤖',
    title: 'AI Research Chat',
    description: 'Claude-powered analysis with 30+ tools for market research, thesis development, and strategy backtesting. Extended thinking mode for deep reasoning.',
  },
  {
    icon: '📊',
    title: 'Professional Charts',
    description: 'TradingView-style charts with 30+ indicators, drawing tools, and multi-timeframe analysis. Real-time data streaming.',
  },
  {
    icon: '🎯',
    title: 'Thesis Engine',
    description: 'Develop, track, and validate trading hypotheses with live monitoring and validation scores. Connect theses to prediction markets.',
  },
  {
    icon: '📓',
    title: 'Trade Journal',
    description: 'Log trades with emotion tracking, P&L calculation, screenshot capture, and rich text notes. AI discovers behavioral patterns.',
  },
  {
    icon: '🔮',
    title: 'Prediction Markets',
    description: 'Live odds from Kalshi & Polymarket with thesis linking. Event-based betting and probability tracking.',
  },
  {
    icon: '🔬',
    title: 'Deep Research Hub',
    description: 'Perplexity AI integration for earnings analysis, SEC filings, company profiles, and market summaries.',
  },
  {
    icon: '🛡️',
    title: 'Emotional Firewall',
    description: 'Real-time cognitive state detection. Blocks revenge trading, overtrading patterns, and emotional exhaustion.',
  },
  {
    icon: '⚡',
    title: 'Options Suite',
    description: 'Full options chains, Greeks analysis, multi-leg strategy builder with visual payoff diagrams.',
  },
]

const additionalFeatures = [
  'Stock Screener with natural language queries',
  'Paper trading with full position tracking',
  'Politicians tracker for congressional trades',
  'Command palette (Cmd/Ctrl+K)',
  '40+ customizable dashboard widgets',
  'Mobile-optimized with PWA support',
]

export default function DeepStackPage() {
  return (
    <div className="container py-24">
      <article className="max-w-4xl mx-auto">
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
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <h1>DeepStack</h1>
            <span className="text-sm px-3 py-1 bg-green-500/10 text-green-400 rounded-full">
              Live
            </span>
            <span className="text-sm px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-full">
              v2.5.0
            </span>
          </div>
          <p className="text-2xl text-[var(--text-secondary)] mb-8">
            AI-Powered Trading Research Platform
          </p>
          <a
            href="https://deepstack.trade"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg px-8 py-4 bg-green-500 text-white hover:bg-green-600 transition-all duration-200 rounded-soft font-medium"
          >
            Launch DeepStack
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </header>

        {/* Disclaimer Banner */}
        <section className="mb-16 p-6 bg-amber-500/10 border-2 border-amber-500/30 rounded-soft">
          <p className="text-lg text-amber-300 font-medium">
            Research Only. Not Financial Advice.
          </p>
          <p className="text-[var(--text-secondary)] mt-2">
            DeepStack is a research and analysis platform. It does NOT execute trades on your behalf.
            Trading involves significant risk. AI can hallucinate—verify all data independently.
          </p>
        </section>

        {/* Description */}
        <section className="mb-16 space-y-6 text-lg leading-relaxed">
          <p>
            Think of DeepStack as having a research analyst in your pocket. It combines conversational AI
            with professional-grade market tools—helping you develop, test, and track your trading ideas
            with discipline.
          </p>
          <p>
            Built for traders who want to think more clearly about markets. The Emotional Firewall
            detects revenge trading and overtrading patterns in real-time. The Thesis Engine forces
            you to articulate your hypothesis before entering a position. The Journal tracks not just
            P&L but your emotional state—because the data shows your losses cluster around specific
            cognitive patterns.
          </p>
        </section>

        {/* Core Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-[var(--text-secondary)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Also Included</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {additionalFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-lg">
                <span className="text-green-400">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {/* Tiers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Tier */}
            <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-[var(--text-secondary)] mb-6">Learn the platform</p>
              <ul className="space-y-3 text-[var(--text-secondary)]">
                <li>• 10 AI queries per 12 hours</li>
                <li>• 15-minute delayed data</li>
                <li>• Basic charts with indicators</li>
                <li>• 5 watchlist symbols</li>
                <li>• 1 active Thesis</li>
                <li>• Unlimited journal entries</li>
                <li>• Basic Emotional Firewall</li>
              </ul>
            </div>
            {/* Pro Tier */}
            <div className="p-6 bg-green-500/5 border-2 border-green-500/30 rounded-soft">
              <h3 className="text-2xl font-bold mb-2 text-green-400">Pro</h3>
              <p className="text-[var(--text-secondary)] mb-6">For serious researchers</p>
              <ul className="space-y-3 text-[var(--text-secondary)]">
                <li>• Unlimited AI queries</li>
                <li>• Real-time market data</li>
                <li>• Advanced charts + drawing tools</li>
                <li>• Unlimited watchlists</li>
                <li>• Full Options Suite</li>
                <li>• Deep Research Hub</li>
                <li>• Prediction Markets integration</li>
                <li>• AI Pattern Learning</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16 p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-soft">
          <h3 className="text-2xl font-bold mb-6">Built With</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="font-bold text-lg">Next.js 15</p>
              <p className="text-sm text-[var(--text-secondary)]">Frontend</p>
            </div>
            <div>
              <p className="font-bold text-lg">Claude AI</p>
              <p className="text-sm text-[var(--text-secondary)]">Analysis</p>
            </div>
            <div>
              <p className="font-bold text-lg">Alpaca</p>
              <p className="text-sm text-[var(--text-secondary)]">Market Data</p>
            </div>
            <div>
              <p className="font-bold text-lg">Supabase</p>
              <p className="text-sm text-[var(--text-secondary)]">Database</p>
            </div>
          </div>
        </section>

        {/* Full Disclaimer */}
        <section className="mb-16 p-6 bg-red-500/5 border-2 border-red-500/20 rounded-soft">
          <h3 className="text-xl font-bold mb-3 text-red-400">Risk Disclaimer</h3>
          <div className="text-[var(--text-secondary)] leading-relaxed space-y-3">
            <p>
              <strong>No Trade Execution:</strong> This platform does NOT execute trades on your behalf.
            </p>
            <p>
              <strong>Risk Warning:</strong> Trading in financial markets involves significant risk.
              You may lose some or all of your investment. Past performance does not guarantee future results.
            </p>
            <p>
              <strong>Not a Recommendation:</strong> Nothing on this platform constitutes a recommendation
              to buy, sell, or hold any security.
            </p>
            <p>
              <strong>AI Limitations:</strong> AI can hallucinate. Verify all data independently.
            </p>
            <p>
              The developers of DeepStack are not responsible for any financial losses incurred through
              the use of this software.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-12 border-t border-[var(--border)] text-center">
          <a
            href="https://deepstack.trade"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg px-10 py-5 bg-green-500 text-white hover:bg-green-600 transition-all duration-200 rounded-soft font-medium"
          >
            Try DeepStack Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
          <p className="mt-4 text-[var(--text-secondary)]">
            No credit card required
          </p>
        </section>
      </article>
    </div>
  )
}
