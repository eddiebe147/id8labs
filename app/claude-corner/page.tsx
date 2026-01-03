import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/helpers'
import ClaudeCornerClient from './client'

export default async function ClaudeCornerPage() {
  // Server-side auth check
  const user = await getCurrentUser()

  if (!user) {
    // Redirect to sign-in with return URL
    redirect('/sign-in?redirect=/claude-corner')
  }

  return <ClaudeCornerClient user={{ id: user.id, email: user.email }} />
}
