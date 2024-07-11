'use client';
import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { LoadingButton } from '@/components/ui/loading-button';
import { DataTableMovimentacao } from './data-table-movimentacao';

export type Movimentacoes = {
  id: number;
  nome: string;
  descricao: string;
  tipo: string;
  valor: number;
  data_vencimento: string;
  data_pagamento:string;
  created_at: string;
}


export const MovimentacaoClient: React.FC = () => {
  const router = useRouter();
  const [movimentacoes, setMovimentacoes] = useState<Movimentacoes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAtletas = async () => {
      try {
         const response = await fetch('/api/movimentacao/listar');
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        const data = await response.json();

        console.log(data)
        setMovimentacoes(data); 
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAtletas();
  }, []);

  const handleDelete = (id: number) => {
    setMovimentacoes((prevAtletas) => prevAtletas.filter((atleta) => atleta.id !== id));
  };

  if (loading) {
    return(
      <>
      <div className="flex items-start justify-between">
        <Heading
          title={"Movimentações"}
          description="Tela para gerenciar entrada e saida de valores."
        />    
      </div>
      <Separator />
      <div>Carregando...</div> {/* Você pode substituir isso por um spinner ou outra UI de carregamento */}
      
      </>
      
    ) 
  }

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={"Movimentações"}
          description="Tela para gerenciar entrada e saida de valores."
        />
        <LoadingButton
          loading={loading}
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/movimentacao/create`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Adicionar
        </LoadingButton>
      </div>
      <Separator />
      {loading? 
      <div></div>
      :
       <DataTableMovimentacao searchKey="nome" columns={columns(handleDelete)} data={movimentacoes} /> 
      }
     
    </>
  );
};
