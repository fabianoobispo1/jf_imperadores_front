'use client';
import { Movimentacoes } from './client';
import { Pagmodal } from './pag-modal';

interface CellActionProps {
  data: Movimentacoes;
  onUpdate: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onUpdate }) => {




  return (
    <>     
      <Pagmodal onUpdate={onUpdate} id={String(data.id)} jaPago={data.data_pagamento}/>      
    </>
  );
};
