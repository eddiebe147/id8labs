interface StatItem {
  value: number
  label: string
  highlight?: boolean
}

interface StackStatsProps {
  stats: StatItem[]
}

export function StackStats({ stats }: StackStatsProps): React.ReactElement {
  return (
    <div className="flex items-center justify-center gap-8 mb-8">
      {stats.map((stat, index) => (
        <div key={index}>
          <div className={`text-3xl font-bold ${stat.highlight ? 'text-[var(--id8-orange)]' : ''}`}>
            {stat.value}
          </div>
          <div className="text-sm text-[var(--text-secondary)]">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}

interface StackItem {
  type: string
}

export function buildStackStats(items: StackItem[]): StatItem[] {
  const skills = items.filter((item) => item.type === 'skill')
  const agents = items.filter((item) => item.type === 'agent')
  const commands = items.filter((item) => item.type === 'command')
  const settings = items.filter((item) => item.type === 'setting')

  const stats: StatItem[] = [
    { value: items.length, label: items.length === 1 ? 'Item' : 'Items', highlight: true },
  ]

  if (skills.length > 0) {
    stats.push({ value: skills.length, label: skills.length === 1 ? 'Skill' : 'Skills' })
  }
  if (agents.length > 0) {
    stats.push({ value: agents.length, label: agents.length === 1 ? 'Agent' : 'Agents' })
  }
  if (commands.length > 0) {
    stats.push({ value: commands.length, label: commands.length === 1 ? 'Command' : 'Commands' })
  }
  if (settings.length > 0) {
    stats.push({ value: settings.length, label: settings.length === 1 ? 'Setting' : 'Settings' })
  }

  return stats
}

export function groupItemsByType<T extends { type: string }>(items: T[]): {
  skills: T[]
  agents: T[]
  commands: T[]
  settings: T[]
} {
  return {
    skills: items.filter((item) => item.type === 'skill'),
    agents: items.filter((item) => item.type === 'agent'),
    commands: items.filter((item) => item.type === 'command'),
    settings: items.filter((item) => item.type === 'setting'),
  }
}
