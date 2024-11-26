import type { Metadata } from 'next'
import './globals.css'
import NextTopLoader from 'nextjs-toploader'

import ConvexClientProvider from '@/providers/ConvexClientProvider'
import AuthProvider from '@/providers/AuthProvider'
import '@uploadthing/react/styles.css'
import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider'
import { auth } from '@/auth/auth'
import Header from '@/components/layout/header'
import Sidebar from '@/components/layout/sidebar'

export const metadata: Metadata = {
  title: 'Principal',
  description: 'Pagina inicial do meu sistema',
  keywords:
    'Fabiano Bispo Canedo, Fabiano Bispo, fabiano bispo, fabianoobispo, @fabianoobispo, fabiano bispo canedo',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
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
              {session ? <Header /> : <></>}

              <div className="flex h-screen overflow-hidden">
                {/*  {session ? <Sidebar /> : <></>} */}

                <main className="flex-1 overflow-hidden pt-16">{children}</main>
              </div>
            </AuthProvider>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
