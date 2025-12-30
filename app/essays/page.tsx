import { getAllEssays, type Essay } from '@/lib/essays'
import { EssaysList } from './essays-list'

// Revalidate every hour to pick up scheduled posts
// Scheduled essays become visible when their publishDate arrives
export const revalidate = 3600  // 1 hour in seconds

export default function EssaysPage() {
  // Server-side: fetch all essays (can use fs module)
  const allEssays = getAllEssays()

  // Pass to client component for interactivity
  return <EssaysList essays={allEssays} />
}
