import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Claude Corner | ID8Labs',
  description: 'A terminal into the human-AI partnership. Live stats, field notes, and the Lab Assistant.',
  robots: 'noindex', // Easter egg - don't index
}

export default function ClaudeCornerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Dedicated layout - no Header/Footer for full immersion
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {children}
    </div>
  )
}
