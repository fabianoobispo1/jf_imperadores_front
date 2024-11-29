'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Icons } from '@/components/icons'
import { navItems } from '@/constants/data'
import { cn } from '@/lib/utils'

export default function BottomMenu() {
  const path = usePathname()
  if (!navItems?.length) {
    return <></>
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-21 border-t bg-background/95 backdrop-blur">
      <nav className="flex h-14  items-center justify-between ">
        {/* Garante espaçamento dinâmico entre os itens */}
        {navItems.map((item, index) => {
          const Icon = Icons[item.icon || 'arrowRight']
          return (
            <Link
              key={index}
              href={item.disabled ? '/' : item.href || ''}
              // className="flex  items-center text-sm font-medium text-muted-foreground"
              className={cn(
                'w-full h-h-full flex flex-col items-center justify-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                path === item.href ? 'bg-accent' : 'transparent',
                item.disabled && 'cursor-not-allowed opacity-80',
              )}
            >
              {/* Ícone */}
              <Icon className={`size-5`} />

              {/* Nome */}
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
