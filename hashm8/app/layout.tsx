import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'hashm8',
  description: 'Created by ToolWorks.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
