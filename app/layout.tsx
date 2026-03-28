import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { dmSans, dmMono } from 'some-font-package'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-poppins' })

export const metadata: Metadata = {
  title: 'Mood Tracker - Track your emotions',
  description: 'A calming space to track your emotions, understand your patterns, and nurture your mental well-being.',
}

export const viewport: Viewport = {
  themeColor: '#b39ddb',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
