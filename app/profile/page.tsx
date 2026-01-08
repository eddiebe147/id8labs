import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Package, Plus } from 'lucide-react'
import { getCurrentUser } from '@/lib/auth/helpers'
import { UserStacksList } from '@/components/profile/UserStacksList'

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/sign-in?redirect=/profile')
  }

  return (
    <main className="relative">
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">My Stacks</h1>
                <p className="text-xl text-[var(--text-secondary)]">{user.email}</p>
              </div>
              <Link
                href="/stackshack"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--id8-orange)] text-white rounded-lg hover:bg-[var(--id8-orange-hover)] font-medium transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create New Stack
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <UserStacksList userId={user.id} />
          </div>
        </div>
      </section>
    </main>
  )
}
