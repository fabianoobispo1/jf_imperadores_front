'use client'

import { ScrollArea } from '../ui/scroll-area'

interface Props {
  nomeTela: string
}

export default function LinkTree({ nomeTela }: Props) {
  return (
    <ScrollArea className="h-full felx bg-background/95">
      <p className="hidden">{nomeTela}</p>
    </ScrollArea>
  )
}
