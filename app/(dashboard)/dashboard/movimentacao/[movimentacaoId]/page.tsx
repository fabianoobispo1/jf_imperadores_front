/* import AcessoAdministrador from '@/components/AcessoAdministrador'; */
import BreadCrumb from '@/components/breadcrumb';
import { MovimentacaoForm } from '@/components/forms/movimentacao-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

export default function Page({ params }: { params: { movimentacaoId: string } }) {
 
  
  const breadcrumbItems = [
    
    { title: 'Movimentação', link: '/dashboard/movimentacao' },
    { title: `${params.movimentacaoId == 'create'? 'Adicionar' : 'Editar' }`, link: '/dashboard/movimentacao/create' }
  ];
  return (
    <ScrollArea className="h-full">
      {/* <AcessoAdministrador /> */}
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <MovimentacaoForm
          id={params.movimentacaoId}
        />
      </div>
    </ScrollArea>
  );
}
