import React from 'react'

// Minimal root layout — the (payload) route group provides its own html/body via RootLayout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
