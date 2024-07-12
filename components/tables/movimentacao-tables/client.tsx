'use client';

import { useEffect, useState } from 'react';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { LoadingButton } from '@/components/ui/loading-button';
import { DataTableMovimentacao } from './data-table-movimentacao';
import { Spinner } from '@/components/ui/spinner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type Movimentacoes = {
  id: number;
  nome: string;
  descricao: string;
  tipo: string;
  valor: number;
  data_vencimento: string;
  data_pagamento: string;
  created_at: string;
}

export const MovimentacaoClient: React.FC = () => {
  const router = useRouter();
  const [movimentacoes, setMovimentacoes] = useState<Movimentacoes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const fetchMovimentacoes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/movimentacao/listar?month=${month}&year=${year}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        const data = await response.json();
        setMovimentacoes(data.movimentacao);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovimentacoes();
  }, [month, year]);

  const handleDelete = (id: number) => {
    setMovimentacoes((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMonthChange = (value: string) => {
    setMonth(Number(value));
  };

  const handleYearChange = (value: string) => {
    setYear(Number(value));
  };

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
      <div className="flex gap-4 mb-4">
        
        <Select onValueChange={handleMonthChange} defaultValue={month.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o mês" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <SelectItem key={m} value={m.toString()}>
                {m.toString().padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={handleYearChange} defaultValue={year.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o ano" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Separator />
      {loading ? (
        <Spinner />
      ) : (
        <DataTableMovimentacao columns={columns(handleDelete)} data={movimentacoes} />
      )}
    </>
  );
};
