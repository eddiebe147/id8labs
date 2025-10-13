import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lexicon | ID8Labs',
  description:
    'GitHub for story universes. Version-controlled wiki for managing complex story universes, world-building canon, and narrative consistency across franchises.',
  keywords: [
    'Lexicon',
    'Story Universe',
    'World Building',
    'Canon Management',
    'Version Control',
    'Narrative Consistency',
    'Game Development',
  ],
  openGraph: {
    title: 'Lexicon | ID8Labs',
    description:
      'GitHub for story universes. Version-controlled wiki for world-building and canon management.',
    type: 'website',
    url: 'https://id8labs.com/lexicon',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lexicon | ID8Labs',
    description:
      'GitHub for story universes. Version-controlled wiki for world-building and canon management.',
  },
}

export default function LexiconLayout({ children }: { children: React.ReactNode }) {
  return children
}
