import BreadCrumb from '@/components/breadcrumb'

import { MessagesForm } from './messages-form'

export default function MessagesPage() {
  const breadcrumbItems = [{ title: 'Mensagens', link: '/dashboard/Mensagens' }]
  return (
    <div className="w-full space-y-4 p-4 pt-6 ">
      <BreadCrumb items={breadcrumbItems} />
      <MessagesForm />
    </div>
  )
}
