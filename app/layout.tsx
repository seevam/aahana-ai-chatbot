import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sahayata - Anonymous Domestic Violence Support',
  description: 'Anonymous, multilingual support for domestic violence victims in India',
  keywords: ['domestic violence', 'support', 'anonymous', 'help', 'India', 'Telugu', 'Hindi'],
  robots: 'noindex, nofollow', // Privacy: don't index the site
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
