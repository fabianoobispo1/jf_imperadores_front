'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const BotoesAdministracao: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <p className="mb-2 text-gray-500 dark:text-gray-400">
        Tela para listar usuarios cadastrados.
      </p>
      <Button
        onClick={() => {
          router.push(`/dashboard/administracao/usuario`);
        }}
      >
        Usuarios
      </Button>

      <p className="mb-2 text-gray-500 dark:text-gray-400">
        Tela para listar e cadastrar exercícios.
      </p>
      <Button
        onClick={() => {
          router.push(`/dashboard/administracao/exercicio`);
        }}
      >
        
        Exercícios
      </Button>

      
    </>
  );
};
