import React from 'react'
import { redirect } from 'next/navigation'

import { auth } from '@/auth/auth'
import DinamicLayout from '@/components/layout/dinamicLayout'

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) redirect('/')
  return (
    <>
      <DinamicLayout />
      {children}
    </>
  )
}
