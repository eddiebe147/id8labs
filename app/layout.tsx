import type { Metadata } from 'next'
import { Inter, Instrument_Serif, Fraunces } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { NeuralNetworkBg } from '@/components/foundation/neural-network-bg'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-crimson',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['900'],
  display: 'swap',
  variable: '--font-fraunces',
})

export const metadata: Metadata = {
  title: 'ID8Labs - Professional Tools for the AI Era',
  description: 'ID8Labs builds category-defining professional tools for creative professionals in the AI era.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${instrumentSerif.variable} ${fraunces.variable}`}>
        {/* Neural Network Background - "Thoughtful Brain" settings */}
        <NeuralNetworkBg
          neuronCount={120}
          connectionDensity={79}
          rotationSpeed={0.0015}
          fireRate={6}
          orangeIntensity={100}
          parallaxFactor={0.04}
        />

        <ThemeProvider>
          <div className="relative" style={{ zIndex: 1 }}>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
