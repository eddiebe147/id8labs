import type { Metadata } from 'next'
import { Inter, Instrument_Serif, Fraunces } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { NeuralNetworkBg } from '@/components/foundation/neural-network-bg'
import { GoogleAnalytics } from '@/components/Analytics'
import LeadMagnetFunnel from '@/components/LeadMagnetFunnel'
import { MotionProvider } from '@/components/motion'

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
  title: {
    default: 'ID8Labs - Professional Tools for the AI Era',
    template: '%s | ID8Labs',
  },
  description: 'ID8Labs builds professional AI tools and offers Claude Code training. Products include Composer (AI writing partner), DeepStack (trading research), and live training for hooks, MCP servers, and production workflows.',
  keywords: [
    'AI tools',
    'Claude Code',
    'AI writing assistant',
    'Claude Code training',
    'MCP servers',
    'AI workflow automation',
    'professional AI tools',
    'ID8Labs',
    'DeepStack trading',
    'AI for creators',
  ],
  authors: [{ name: 'Eddie Belaval', url: 'https://id8labs.app' }],
  creator: 'Eddie Belaval',
  metadataBase: new URL('https://id8labs.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://id8labs.app',
    siteName: 'ID8Labs',
    title: 'ID8Labs - Professional Tools for the AI Era',
    description: 'AI tools for creators and builders. Claude Code training, Composer, DeepStack, and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ID8Labs - Professional Tools for the AI Era',
    description: 'AI tools for creators and builders. Claude Code training, Composer, DeepStack, and more.',
    creator: '@eddiebe147',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when you have them:
    // google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FF6B35" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.variable} ${instrumentSerif.variable} ${fraunces.variable}`}>
        <GoogleAnalytics />
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
          <MotionProvider>
            <div className="relative" style={{ zIndex: 1 }}>
              <Header />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </div>
            <LeadMagnetFunnel />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
