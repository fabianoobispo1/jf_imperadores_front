import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import NextTopLoader from 'nextjs-toploader'

import '@uploadthing/react/styles.css'
import './globals.css'
import ConvexClientProvider from '@/providers/ConvexClientProvider'
import AuthProvider from '@/providers/AuthProvider'
import { Toaster } from '@/components/ui/toaster'
import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider'

export const metadata: Metadata = {
  title: 'JF Imperadores',
  description: 'Página oficial do time JF Imperadores',
  keywords:
    'imperadores, jf imperadores, jfimperadores, futebolamericano, futebol ameriacno, fabr, juiz de fora imperadores, time imperadores, time jfimperadores, time jf imperadores',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={'font-inter overflow-hidden'}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextTopLoader showSpinner={false} />
          <ConvexClientProvider>
            <AuthProvider>
              <Toaster />
              <main className="">
                {children}
                <Analytics />
                <SpeedInsights />
              </main>
            </AuthProvider>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
