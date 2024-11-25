'use client'
import { MenuIcon } from 'lucide-react'
import { useState } from 'react'

import { DashboardNav } from '@/components/dashboard-nav'
/* import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; */
import { navItems } from '@/constants/data'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export function MobileSidebar() {
  const [open, setOpen] = useState(false)
  console.log(open)
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <SheetHeader>
            <SheetTitle>Overview</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <DashboardNav items={navItems} isMobileNav={true} setOpen={setOpen} />
        </SheetContent>
      </Sheet>
    </>
  )
}
