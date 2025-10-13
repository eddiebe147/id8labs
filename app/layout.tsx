import type { Metadata } from "next"
import { Inter, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MagneticCursor } from "@/components/magnetic-cursor"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "ID8Labs - Creative AI Innovation",
  description: "Multi-product creative AI company showcasing cutting-edge solutions",
  keywords: ["AI", "Creative Tech", "Innovation", "Software"],
  authors: [{ name: "ID8Labs" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://id8labs.com",
    title: "ID8Labs - Creative AI Innovation",
    description: "Multi-product creative AI company showcasing cutting-edge solutions",
    siteName: "ID8Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "ID8Labs - Creative AI Innovation",
    description: "Multi-product creative AI company showcasing cutting-edge solutions",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <ThemeProvider>
          <MagneticCursor />
          <Nav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
