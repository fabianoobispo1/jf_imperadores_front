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
import { Atletas } from '@/constants/data';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  data: Atletas;
  onDelete: (id: number) => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    setLoading(true)
    const response =  await fetch(`/api/atleta/remover/${data.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.status === 200) {
      onDelete(data.id);
    }
  
    setLoading(false)    
    setOpen(false)
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
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
            onClick={() => router.push(`/dashboard/atleta/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Atualizar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Apagar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
