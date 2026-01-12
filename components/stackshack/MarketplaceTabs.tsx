import Link from 'next/link'
import { Zap, Terminal, Settings, Package, Puzzle } from 'lucide-react'

export type MarketplaceTab = 'skills' | 'commands' | 'settings' | 'plugins' | 'kits'

interface TabConfig {
  id: MarketplaceTab
  label: string
  icon: React.ReactNode
  count?: number
}

interface MarketplaceTabsProps {
  activeTab?: MarketplaceTab
  counts?: {
    skills?: number
    commands?: number
    settings?: number
    plugins?: number
    kits?: number
  }
}

export function MarketplaceTabs({ activeTab = 'skills', counts }: MarketplaceTabsProps) {

  const tabs: TabConfig[] = [
    {
      id: 'skills',
      label: 'Skills',
      icon: <Zap className="w-4 h-4" />,
      count: counts?.skills,
    },
    {
      id: 'commands',
      label: 'Commands',
      icon: <Terminal className="w-4 h-4" />,
      count: counts?.commands,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
      count: counts?.settings,
    },
    {
      id: 'plugins',
      label: 'Plugins',
      icon: <Puzzle className="w-4 h-4" />,
      count: counts?.plugins,
    },
    {
      id: 'kits',
      label: 'Starter Kits',
      icon: <Package className="w-4 h-4" />,
      count: counts?.kits,
    },
  ]

  return (
    <div className="sticky top-0 z-30 bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border)]">
      <div className="container">
        <nav className="flex items-center justify-center gap-1 overflow-x-auto scrollbar-hide py-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            const href = tab.id === 'skills' ? '/stackshack' : '/stackshack?tab=' + tab.id

            return (
              <Link
                key={tab.id}
                href={href}
                className={
                  'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ' +
                  (isActive
                    ? 'bg-[var(--id8-orange)]/10 text-[var(--id8-orange)] border border-[var(--id8-orange)]/30'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]')
                }
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={
                      'px-1.5 py-0.5 text-xs rounded-full ' +
                      (isActive
                        ? 'bg-[var(--id8-orange)]/20 text-[var(--id8-orange)]'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]')
                    }
                  >
                    {tab.count}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
