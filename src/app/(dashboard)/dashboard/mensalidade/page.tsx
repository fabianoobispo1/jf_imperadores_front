import { ScrollArea } from '@/components/ui/scroll-area'
import BreadCrumb from '@/components/breadcrumb'
import { Heading } from '@/components/ui/heading'

import { Produtos } from './produtos'

const breadcrumbItems = [
  { title: 'Mensalidade', link: '/dashboard/mensalidade' },
]
export default function Page() {
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex-1 space-y-4 p-4 pt-6 ">
        <BreadCrumb items={breadcrumbItems} />
        <div className=" flex items-start justify-between gap-4">
          <Heading title={'Mensalidade'} description={'....'} />
        </div>
        <Produtos />
      </div>
    </ScrollArea>
  )
}
