import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analytics Dashboard',
  description: 'Real-time analytics dashboard for id8labs',
  robots: {
    index: false,
    follow: false,
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
