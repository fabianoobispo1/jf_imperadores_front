import BreadCrumb from '@/components/breadcrumb'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Heading } from '@/components/ui/heading'

import { Sorteio } from './sorteio'

const breadcrumbItems = [{ title: 'Sorteio', link: '/dashboard/perfil' }]
export default function page() {
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex-1 space-y-4 p-4 pt-6 ">
        <BreadCrumb items={breadcrumbItems} />
        <div className=" flex items-start justify-between gap-4">
          <Heading title={'Sorteio'} description={'Realiza sorteios.'} />
        </div>
        <Sorteio />
      </div>
    </ScrollArea>
  )
}
