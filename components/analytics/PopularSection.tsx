import { TrendingUp } from 'lucide-react'
import { getPopularSkills } from '@/lib/analytics'
import { SkillCard } from '@/components/skills/SkillCard'

export async function PopularSection() {
  const popularSkills = await getPopularSkills(6)

  if (popularSkills.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <TrendingUp className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Most Popular</h2>
            <p className="text-[var(--text-secondary)] mt-1">
              Top skills & agents by install count
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} variant="default" />
          ))}
        </div>
      </div>
    </section>
  )
}
