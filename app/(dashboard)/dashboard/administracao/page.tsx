import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BotoesAdministracao } from './componentes/botoesAdministracao';

const breadcrumbItems = [
  { title: 'Administrção', link: '/dashboard/administracao' }
];
export default function page() {
  return (
    <>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />
          <BotoesAdministracao />
        </div>
      </ScrollArea>
    </>
  );
}
