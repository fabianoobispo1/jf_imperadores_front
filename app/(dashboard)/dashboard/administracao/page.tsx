import { ModalUsuarios } from '@/components/administracao/ModalUsuarios';
import BreadCrumb from '@/components/breadcrumb';
import { PerfilUser } from '@/components/forms/user-perfil-form';
import { ScrollArea } from '@/components/ui/scroll-area';

const breadcrumbItems = [{ title: 'Administrção', link: '/dashboard/administracao' }];
export default function page() {
  return (
    <>
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <BreadCrumb items={breadcrumbItems} />

      <ModalUsuarios />        

      </div>
    </ScrollArea>
    
    </>
    
  );
}
