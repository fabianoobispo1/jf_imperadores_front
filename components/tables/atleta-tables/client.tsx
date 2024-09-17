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
import { useSession } from 'next-auth/react';
import axios from 'axios';

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
  const { data: session } = useSession();

  useEffect(() => {
    const fetchAtletas = async () => {
      try {

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/atleta/listaratletas`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.tokenApi}`
            }
          }
        );

        if (response.status != 200) {
          throw new Error('Erro ao buscar dados');
        }
      
        const data = response.data
      
          // Mapear os dados para substituir o valor booleano do campo "ativo" por uma string
          const atletasFormatados = data.sfaAtleta.map((atleta: any) => ({
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
