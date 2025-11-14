import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'DevFlow - All-in-One Developer Utilities',
  description: 'Beautiful, fast, and privacy-focused developer toolkit with 50+ utilities',
  keywords: ['developer tools', 'utilities', 'encoders', 'converters', 'formatters'],
  authors: [{ name: 'DevFlow' }],
  creator: 'DevFlow',
  publisher: 'DevFlow',
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
