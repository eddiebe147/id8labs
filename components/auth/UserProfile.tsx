import { getCurrentUser } from '@/lib/auth/helpers'
import { SignOutButton } from './SignOutButton'
import Link from 'next/link'

export async function UserProfile() {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div className="flex gap-4">
        <Link
          href="/sign-in"
          className="px-4 py-2 text-text-light dark:text-text-dark hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
        >
          Sign in
        </Link>
        <Link
          href="/sign-up"
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white rounded-md transition-colors"
        >
          Sign up
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm">
        <p className="text-text-light dark:text-text-dark font-medium">
          {user.email}
        </p>
      </div>
      <SignOutButton className="px-4 py-2 text-sm text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light dark:hover:text-text-dark transition-colors">
        Sign out
      </SignOutButton>
    </div>
  )
}
