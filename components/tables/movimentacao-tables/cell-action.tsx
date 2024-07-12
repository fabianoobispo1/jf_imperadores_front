'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Edit, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Movimentacoes } from './client';
import { PagamentoModal } from './pagamento-modal';

interface CellActionProps {
  data: Movimentacoes;
  onDelete: (id: number) => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    setLoading(true)
  /*   const response =  await fetch(`/api/atleta/remover/${data.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.status === 200) {
      onDelete(data.id);
    } */
  
    setLoading(false)    
    setOpen(false)
  };

  const onhandlepagamento = async () => {
    setLoading(true)
  /*   const response =  await fetch(`/api/atleta/remover/${data.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.status === 200) {
      onDelete(data.id);
    } */
  
    setLoading(false)    
    setOpen(false)
  };

  const handleConfirm = (data: string) => {
    setLoading(true)
    console.log('Data confirmada:', data);

    // Aqui você pode fazer o que quiser com a data, como enviá-la para uma API
    setLoading(false)
    setOpen(false); // Fecha o modal após a confirmação
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <PagamentoModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        loading={loading}
        id={data.id}
        
      />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>

          <DropdownMenuItem  
            disabled={data.data_pagamento? true : false}
            onClick={() => setOpen(true)}
          >

            <Edit className="mr-2 h-4 w-4" /> Foi Paga
          </DropdownMenuItem>
         {/*  <DropdownMenuItem
            onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Apagar
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
