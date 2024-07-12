'use client';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { Movimentacoes } from './client';
import { formatDate } from '@/lib/formaDate';

export const columns = (onUpdate: () => void): ColumnDef<Movimentacoes>[] => [
   {
    id: 'select',
    /* header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="selecionar todos"
      />
    ), */
/*     cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="selecionar linha"
      />
    ), */
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'nome',
    header: 'NOME'
  },
  {
    accessorKey: 'descricao',
    header: 'DESCRIÇÃO'
  },
  {
    accessorKey: 'valor',
    header: 'Valor',
    cell: info => `R$ ${(info.getValue() as number).toFixed(2)}`, // Cast para number
  },
  {
    accessorKey: 'data_vencimento',
    header: 'Data de Vencimento',
    cell: info => formatDate(info.getValue() as string), // Cast para string
  },
  {
    accessorKey: 'data_pagamento',
    header: 'Data de Pagamento',
    cell: info => formatDate(info.getValue() as string), // Cast para string
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} onUpdate={onUpdate} />
  }
];
