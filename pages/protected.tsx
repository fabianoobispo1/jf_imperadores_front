import { Layout } from '@vercel/examples-ui'
import { useRouter } from 'next/router'
import { Page,Button } from '@vercel/examples-ui'
import { USER_TOKEN } from '@lib/constants'
import  GlobalNav  from './components/global-nav'

export default function Protected() {
  const { reload } = useRouter()

  return (
    <>
    <GlobalNav />
    <Page>
{/* 
      <Text variant="h1" className="mb-6">
        JWT Authentication (Protected page)
      </Text>
      <section className="space-y-4">
        <Text>
          This page is protected, you cannot reach it unless you have the{' '}
          <Code>{USER_TOKEN}</Code> JWT Cookie. If you remove the cookie, the
          next time you visit this page, you will be redirected to the{' '}
          <Link href="/">index page</Link>.
        </Text> */}
        <Button
          onClick={() => {
            fetch('/api/expire', { method: 'POST' }).then(() => reload())
          }}
        >
          Sair
        </Button>
{/*       </section>*/}
    </Page> 
    </>
    
  )
}

Protected.Layout = Layout
