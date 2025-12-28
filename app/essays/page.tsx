import { getAllEssays, type Essay } from '@/lib/essays'
import { EssaysList } from './essays-list'

export default function EssaysPage() {
  // Server-side: fetch all essays (can use fs module)
  const allEssays = getAllEssays()

  // Pass to client component for interactivity
  return <EssaysList essays={allEssays} />
}
