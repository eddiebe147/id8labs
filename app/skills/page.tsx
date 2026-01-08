import Link from 'next/link'
import { getAllSkills } from '@/lib/skills'

export default async function SkillsPage() {
  const skills = await getAllSkills()

  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold mb-8">Skills Marketplace</h1>
      <p className="mb-8">Loaded {skills.length} skills from database.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.slice(0, 3).map((skill) => (
          <div key={skill.id} className="p-6 border rounded-lg">
            <h3 className="font-bold">{skill.name}</h3>
            <p className="text-sm text-gray-500">{skill.description}</p>
          </div>
        ))}
      </div>
      
      <Link href="/" className="text-blue-500 hover:underline block mt-8">
        Back to Home
      </Link>
    </div>
  )
}
