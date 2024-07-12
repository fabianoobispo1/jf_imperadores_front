'use client';
import { Movimentacoes } from './client';
import { Pagmodal } from './pag-modal';

interface CellActionProps {
  data: Movimentacoes;
  onDelete: (id: number) => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  return (
    <>     
      <Pagmodal id={String(data.id)} jaPago={data.data_pagamento}/>      
    </>
  );
};
