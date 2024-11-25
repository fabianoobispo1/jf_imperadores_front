'use client'
import { signOut } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Admin() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <p>Admin</p>
        <Button onClick={() => signOut()}>Log out</Button>
      </div>
    </ScrollArea>
  )
}
