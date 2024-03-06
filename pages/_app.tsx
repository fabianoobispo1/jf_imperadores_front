import type { AppProps } from 'next/app'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import type { LayoutProps } from '@vercel/examples-ui/layout'
import { getLayout } from '@vercel/examples-ui'
import '@vercel/examples-ui/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = getLayout<LayoutProps>(Component)

  return (
/*     <Layout
      title="JWT Authentication"
      path="edge-middleware/jwt-authentication"
      deployButton={{ env: ['JWT_SECRET_KEY'] }}
    > */
    <>
     <Component {...pageProps} />
      <SpeedInsights />
      <Analytics />
    </>
     
 /*    </Layout> */
  )
}
