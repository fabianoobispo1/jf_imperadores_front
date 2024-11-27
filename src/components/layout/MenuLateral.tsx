'use client'
/* import Link from 'next/link'

import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle'

import { UserNav } from './user-nav' */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { LogOutIcon } from 'lucide-react'

import { navItems } from '@/constants/data'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { Icons } from '../icons'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

export default function MenuLateral() {
  const { data: session } = useSession()
  const path = usePathname()
  if (!navItems?.length) {
    return <></>
  }

  return (
    <div className="fixed bottom-0 left-0 top-0 z-20 w-40 lg:w-48 border-r bg-background/95 backdrop-blur p-4 flex flex-col justify-between">
      <div>
        <div className="pb-4">
          <Link href={'/admin'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </Link>
        </div>

        {navItems.map((item, index) => {
          const Icon = Icons[item.icon || 'arrowRight']
          return (
            <Link
              key={index}
              href={item.disabled ? '/' : item.href || ''}
              // className="flex  items-center text-sm font-medium text-muted-foreground"
              className={cn(
                'w-full h-h-full flex  items-center justify-start gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-amber-600',
                path === item.href ? 'text-amber-600' : 'transparent',
                item.disabled && 'cursor-not-allowed ',
              )}
            >
              {/* Ícone */}
              <Icon className={`size-5`} />

              {/* Nome */}
              <span>{item.title}</span>
            </Link>
          )
        })}
      </div>
      {/*   <Link
        className="flex items-center gap-2 hover:bg-accent rounded-full pl-2"
        href={'/account'}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={session?.user?.image ?? ''}
            alt={session?.user?.nome ?? ''}
          />
          <AvatarFallback>{session?.user?.nome?.[0]}</AvatarFallback>
        </Avatar>
        <p className="text-sm">{session?.user?.nome} </p>
      </Link> */}

      <Popover>
        <PopoverTrigger className="flex items-center gap-2 hover:bg-accent rounded-full pl-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session?.user?.image ?? ''}
              alt={session?.user?.nome ?? ''}
            />
            <AvatarFallback>{session?.user?.nome?.[0]}</AvatarFallback>
          </Avatar>
          <p className="text-sm">{session?.user?.nome} </p>
        </PopoverTrigger>
        <PopoverContent align="start">
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={session?.user?.image ?? ''}
                alt={session?.user?.nome ?? ''}
              />
              <AvatarFallback>{session?.user?.nome?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session?.user?.nome}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session?.user?.email}
              </p>
            </div>
          </div>
          <Separator className="my-4" />
          <Button className=" w-full rounded-full border-2 bg-white text-black hover:bg-accent">
            Criar nova Tela
          </Button>

          <p className="py-2">Conta</p>
          <p className="py-2">Suporte</p>

          <Separator className="my-4" />
          <button
            className=" cursor-pointer w-full h-h-full flex  items-center justify-start gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent"
            onClick={() => signOut()}
          >
            {/* Ícone */}
            <LogOutIcon />

            {/* Nome */}
            <span>Sing Out</span>
          </button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
