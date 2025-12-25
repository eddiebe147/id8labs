import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Implementation Services | ID8Labs',
  description: 'Stop watching tutorials. Start using AI. From hands-on workshops to full AI integration — get actual workflows that save you hours every week.',
  openGraph: {
    title: 'AI Implementation Services | ID8Labs',
    description: 'Stop watching tutorials. Start using AI. From hands-on workshops to full AI integration.',
    url: 'https://id8labs.app/services',
    siteName: 'ID8Labs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Implementation Services | ID8Labs',
    description: 'Stop watching tutorials. Start using AI.',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
