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

import { toast } from '@/components/ui/use-toast';

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
  const [exercicios, setExercicios] = useState([]);
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

      // Definir a ordem dos dias da semana
      const diasDaSemana = [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado'
      ];

      // Ordenar os dados pelo campo diaSemana
      const fichasOrdenadas = (response.data || []).sort((a: any, b: any) => {
        return (
          diasDaSemana.indexOf(a.diaSemana) - diasDaSemana.indexOf(b.diaSemana)
        );
      });

      setFichas(fichasOrdenadas || []);
    } catch (error: any) {
      /*       toast.error(error.response.data.message || "Erro 500"); */
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/exercicio/listarexercicio`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.tokenApi}`
          }
        }
      );

      const exercicio = response.data.sfaExercicio || [];
      setExercicios(exercicio);
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
    if (editFicha) {
    } else {
      if (!atletaSelecionado) {
        return;
      }
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/ficaexercicio/registrarexercicio`,
          {
            atleta_id: atletaSelecionado,
            diaSemana: fichaexercicio.diaSemana,
            exercicio_id: fichaexercicio.exercicioId,
            repeticoes: fichaexercicio.repeticoes,
            carga: fichaexercicio.carga
          },

          {
            headers: {
              Authorization: `Bearer ${session?.user.tokenApi}`
            }
          }
        );
        if (response.status != 201) {
          toast({
            title: 'Erro',
            variant: 'destructive',
            description:
              response.status + ' - ' + response.data ?? 'Desconhecido'
          });
        }

        //resetForm();
        setEditFicha(null);
        await handleAtletaChange(atletaSelecionado);
        toast({
          title: 'ok',
          description: 'Cadastro realizado ....'
        });
      } catch (error: any) {
        /*       toast.error(error.response.data.message || "Erro 500"); */
      } finally {
        setLoading(false);
      }

      //resetForm();
      setEditFicha(null);
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <h1 className="text-xl font-bold">
          Gerenciamento de ficha de exercícios
        </h1>
        <Separator />
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
              exercicios={exercicios}
            />
            <Separator />
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
