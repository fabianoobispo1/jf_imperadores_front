import BreadCrumb from '@/components/breadcrumb'

import { Mensalidades } from './mensalidades'

const breadcrumbItems = [
  { title: 'Mensalidades', link: '/dashboard/mensalidades' },
]
export default function Page() {
  return (
    <div className="w-full space-y-4 p-4 pt-6 ">
      <BreadCrumb items={breadcrumbItems} />
      <Mensalidades />
    </div>
  )
}
