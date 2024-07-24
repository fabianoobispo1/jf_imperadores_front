import BreadCrumb from '@/components/breadcrumb';
import { PerfilUser } from '@/components/forms/user-perfil-form';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Pefil', link: '/dashboard/perfil' }];
export default function page() {
  return (
    <>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />
          <PerfilUser />
        </div>
      </ScrollArea>
    </>
  );
}
