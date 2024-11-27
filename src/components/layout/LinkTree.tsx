'use client'

import { ScrollArea } from '../ui/scroll-area'

interface Props {
  nomeTela: string
}

export default function LinkTree({ nomeTela }: Props) {
  return <ScrollArea className="h-full felx">{nomeTela}</ScrollArea>
}
