/* import AcessoAdministrador from '@/components/AcessoAdministrador'; */
import BreadCrumb from '@/components/breadcrumb';
import { AtletaForm } from '@/components/forms/atleta-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

export default function Page({ params }: { params: { atletaId: string } }) {
 
  
  const breadcrumbItems = [
    
    { title: 'Atleta', link: '/dashboard/atleta' },
    { title: `${params.atletaId == 'create'? 'Adicionar' : 'Editar' }`, link: '/dashboard/atleta/create' }
  ];
  return (
    <ScrollArea className="h-full">
      {/* <AcessoAdministrador /> */}
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <AtletaForm
          id={params.atletaId}
        />
      </div>
    </ScrollArea>
  );
}
