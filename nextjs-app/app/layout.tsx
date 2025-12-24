import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NFC Payment 2025 H2',
  description: 'NFC Payment Interface',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}

