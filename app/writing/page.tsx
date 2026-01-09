import { Metadata } from 'next'
import { getAllWriting } from '@/lib/writing'
import { WritingList } from './writing-list'

export const metadata: Metadata = {
  title: 'Writing | ID8Labs',
  description: 'Essays, research, release notes, and the signal:noise newsletter on AI, automation, and building the future.',
}

// Revalidate every hour to pick up new content
export const revalidate = 3600  // 1 hour in seconds

export default function WritingPage() {
  // Server-side: fetch all writing content (essays + newsletters)
  const allWriting = getAllWriting()

  // Pass to client component for interactivity
  return <WritingList items={allWriting} />
}
