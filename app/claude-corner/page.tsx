import { getCurrentUser } from '@/lib/auth/helpers'
import ClaudeCornerClient from './client'

export default async function ClaudeCornerPage() {
  // Get user if logged in, but don't require auth
  const user = await getCurrentUser()

  return (
    <ClaudeCornerClient
      user={user ? { id: user.id, email: user.email } : null}
    />
  )
}
