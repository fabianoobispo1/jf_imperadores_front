'use client';
import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import { Spinner } from '@/components/ui/spinner';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { FichaExercicioTable } from './FichaExercicioTable';
import { FichaExercicio } from './schemas/fichaExercicioSchema';
import { FichaExercicioForm } from './FichaExercicioForm';

const breadcrumbItems = [
  { title: 'Administrção', link: '/dashboard/administracao' },
  { title: 'Ficha Exercícios', link: '/dashboard/administracao/fichaexercicio' }
];

interface Atleta {
  id: string;
  nome: string;
}

export default function Page() {
  const [atleta, setAtleta] = useState<Atleta[]>([]);
  const [fichas, setFichas] = useState<FichaExercicio[]>([]);
  const [editFicha, setEditFicha] = useState<FichaExercicio | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [atletaSelecionado, setAtletaSelecionado] = useState<string>();
  const [loadingFicha, setLoadingFicha] = useState<boolean>(true);

  const { data: session } = useSession();

  useEffect(() => {
    loadAtletas();
  }, []);

  const loadAtletas = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/atleta/listaratletas`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.tokenApi}`
          }
        }
      );

      setAtleta(response.data.sfaAtleta || []);
    } catch (error: any) {
      /*       toast.error(error.response.data.message || "Erro 500"); */
    }
    setLoading(false);
  };

  const handleAtletaChange = async (value: string) => {
    setLoadingFicha(true);
    setAtletaSelecionado(value);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/ficaexercicio/listarexercicios?atleta_id=${value}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.tokenApi}`
          }
        }
      );
      console.log(response.data);
      setFichas(response.data || []);
    } catch (error: any) {
      /*       toast.error(error.response.data.message || "Erro 500"); */
    }

    setLoadingFicha(false);
  };

  const handleEdit = (fichaexercicio: FichaExercicio) => {
    console.log(fichaexercicio);
    setEditFicha(fichaexercicio);
  };

  const handleDelete = async (id: string) => {
    console.log(id);
  };

  const handleAddOrUpdate = async (
    fichaexercicio: FichaExercicio,
    resetForm: () => void
  ) => {
    console.log(fichaexercicio);

    resetForm();
    setEditFicha(null);
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <h1 className="text-xl font-bold">
          Gerenciamento de ficha de exercícios
        </h1>

        {loading ? (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <Select onValueChange={handleAtletaChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o atleta" />
            </SelectTrigger>
            <SelectContent>
              {atleta.map((atleta) => (
                <SelectItem key={atleta.id} value={atleta.id}>
                  {atleta.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {loadingFicha ? (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <FichaExercicioForm
              loading={loading}
              onSubmit={handleAddOrUpdate}
              defaultValues={editFicha ?? undefined}
            />

            <FichaExercicioTable
              fichaExercicios={fichas}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </ScrollArea>
  );
}
