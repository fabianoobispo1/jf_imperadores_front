'use client'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AdminPageProps {
  isMobile: boolean
}

export default function AdminPage({ isMobile }: AdminPageProps) {
  const [buttonText, setButtonText] = useState('copie sua URL')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        'https://linktree.jfimperadores.com.br',
      )
      setButtonText('Copiado!')
      setTimeout(() => setButtonText('copie sua URL'), 2000) // Volta ao texto original após 2 segundos
    } catch (err) {
      console.error('Erro ao copiar para a área de transferência: ', err)
    }
  }

  return (
    <div className={cn(isMobile, {})}>
      <div className="bg-teal-200 h-28 flex flex-col justify-center gap-4 items-start p-2">
        <p>
          <span>🔥 Your Linktree is live: </span>
          <Link
            className="underline"
            href="https://linktree.jfimperadores.com.br"
            target="_blank"
          >
            https://linktree.jfimperadores.com.br
          </Link>
        </p>
        <Button className="rounded-full" onClick={handleCopy}>
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
