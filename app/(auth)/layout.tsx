import BrandName from '@/components/BrandName'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12">
          <Link href="/" className="inline-block">
            <BrandName className="text-3xl" />
          </Link>
        </header>
        <main className="flex items-center justify-center">
          <div className="w-full max-w-md">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
