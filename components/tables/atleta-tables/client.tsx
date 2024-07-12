'use client';
import { useEffect, useState } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { LoadingButton } from '@/components/ui/loading-button';
import { Spinner } from '@/components/ui/spinner';

type Atletas = {
  id: number;
  nome: string;
  setor: string;
  posicao: string;
  ativo: boolean;
  numero: string;
}

export const AtletaClient: React.FC = () => {
  const router = useRouter();
  const [atletas, setAtletas] = useState<Atletas[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAtletas = async () => {
      try {
        const response = await fetch('/api/atleta/listar'); // Altere o endpoint conforme necessário
        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }
        const data = await response.json();

          // Mapear os dados para substituir o valor booleano do campo "ativo" por uma string
          const atletasFormatados = data.atletas.map((atleta: any) => ({
            ...atleta,
            ativo: atleta.ativo ? 'Sim' : 'Não'
          }));

        setAtletas(atletasFormatados);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAtletas();
  }, []);

  const handleDelete = (id: number) => {
    setAtletas((prevAtletas) => prevAtletas.filter((atleta) => atleta.id !== id));
  };

/*   if (loading) {
    return <div>Carregando...</div>; // Você pode substituir isso por um spinner ou outra UI de carregamento
  } */

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Atletas ${loading ? '' : atletas.length}`}
          description="Gerenciar atletas"
        />
        <LoadingButton
          loading={loading}
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/atleta/create`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Adicionar
        </LoadingButton>
      </div>
      <Separator />
      {loading? 
      <Spinner />
      :
        <DataTable searchKey="nome" columns={columns(handleDelete)} data={atletas} /> 
      }
     
    </>
  );
};
