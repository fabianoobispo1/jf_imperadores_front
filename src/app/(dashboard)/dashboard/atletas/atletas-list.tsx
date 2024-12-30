import { ScrollArea } from '@/components/ui/scroll-area'
import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export const AtletasList = () => {
  const { open } = useSidebar()
  return (
    <div
      className={cn(
        'space-y-8 w-screen pr-4 ',
        open ? 'md:max-w-[calc(100%-16rem)] ' : 'md:max-w-[calc(100%-5rem)] ',
      )}
    >
      <div className="w-full overflow-auto">
        <div className="w-full pr-4">
          {/* Largura mínima para garantir que todas as colunas fiquem visíveis */}
          <ScrollArea className="h-[calc(80vh-220px)] w-full  rounded-md border  "></ScrollArea>
        </div>
      </div>
    </div>
  )
}
