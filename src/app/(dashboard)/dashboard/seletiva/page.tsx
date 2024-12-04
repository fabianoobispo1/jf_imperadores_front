import { ScrollArea } from '@/components/ui/scroll-area'
import BreadCrumb from '@/components/breadcrumb'

import { Tryout } from './tryout'

const breadcrumbItems = [{ title: 'Seletiva', link: '/dashboard/seletiva' }]
export default function page() {
  return (
    <ScrollArea className="h-full w-full">
      <div className="w-full space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <Tryout />
      </div>
    </ScrollArea>
  )
}
