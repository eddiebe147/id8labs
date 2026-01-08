import { Flame } from 'lucide-react'
import { getTrendingSkills } from '@/lib/analytics'
import { SkillCard } from '@/components/skills/SkillCard'

export async function TrendingSection() {
  const trendingSkills = await getTrendingSkills(6)

  if (trendingSkills.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-[var(--bg-secondary)]">
      <div className="container">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <Flame className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <p className="text-[var(--text-secondary)] mt-1">
              Skills with the highest install-to-view ratio
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} variant="default" />
          ))}
        </div>
      </div>
    </section>
  )
}
