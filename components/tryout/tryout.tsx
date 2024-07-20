'use client';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { useState } from 'react';
import { TryoutForm } from '../forms/tryout-form';

export const Tryout: React.FC = () => {
  const [exibeBotoes, setExibeBotoes] = useState(true);
  const [exibeListar, setExibeListar] = useState(false);
  const [exibeAdicionar, setExibeAdicionar] = useState(false);
  return (
    <>
      {exibeBotoes ? (
        <div className="flex items-start justify-center gap-4">
          <Button
            onClick={() => {
              setExibeBotoes(false);
              setExibeListar(true);
            }}
          >
            Listar
          </Button>
          <Button
            onClick={() => {
              setExibeBotoes(false);
              setExibeAdicionar(true);
            }}
          >
            Adicionar
          </Button>
        </div>
      ) : (
        <></>
      )}

      {exibeListar ? (
        <>
          <div className="flexrow flex items-start justify-between gap-4">
            <Heading title="Listar" description="...." />
            <Button
              onClick={() => {
                setExibeBotoes(true);
                setExibeListar(false);
              }}
            >
              Voltar
            </Button>
          </div>
          {/* <TryoutForm /> */}
        </>
      ) : (
        <></>
      )}

      {exibeAdicionar ? (
        <>
          <div className="flexrow flex items-start justify-between gap-4">
            <Heading title="Adicionar" description="...." />
            <Button
              onClick={() => {
                setExibeBotoes(true);
                setExibeAdicionar(false);
              }}
            >
              Voltar
            </Button>
          </div>
          <TryoutForm />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
