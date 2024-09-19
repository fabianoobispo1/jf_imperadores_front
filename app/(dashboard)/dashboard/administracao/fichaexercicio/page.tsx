'use client';
import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { FichaExercicioTable } from './FichaExercicioTable';

const breadcrumbItems = [
  { title: 'Administrção', link: '/dashboard/administracao' },
  { title: 'Ficha Exercícios', link: '/dashboard/administracao/fichaexercicio' }
];

interface Exercicio {
  id: string;
  repeticoes: string;
  carga: number;
  nomeExercicio: string;
}

interface Ficha {
  diaSemana: string;
  exercicios: Exercicio[];
  id: string;
}

interface Atleta {
  id: string;
  nome: string;
}

export default function Page() {
  const [atleta, setAtleta] = useState<Atleta[]>([
   /*  { id: '90e83701-f943-4d25-b86c-22cf1b9c1106', nome: 'Fabiano Bispo' } */
  ]);
  const [fichas, setFichas] = useState<Ficha[]>([]);
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
      console.log(response.data.fichas);
      setFichas(response.data.fichas || []);
    } catch (error: any) {
      /*       toast.error(error.response.data.message || "Erro 500"); */
    }

    setLoadingFicha(false);
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
            <></>
           /*  <FichaExercicioTable
              fichaExercicios={exercicios}
              onEdit={handleEdit}
              onDelete={handleDelete}
            /> */
          )}

     {/*    {loadingFicha ? (
          <div className="flex h-full items-center justify-center">
            <></>
          </div>
        ) : (
          <Tabs defaultValue="Segunda" className="space-y-4">
            <TabsList>
              <TabsTrigger value="Segunda">Segunda</TabsTrigger>
              <TabsTrigger value="Terça">Terça</TabsTrigger>
              <TabsTrigger value="Quarta">Quarta</TabsTrigger>
              <TabsTrigger value="Quinta">Quinta</TabsTrigger>
              <TabsTrigger value="Sexta">Sexta</TabsTrigger>
              <TabsTrigger value="Sábado">Sábado</TabsTrigger>
              <TabsTrigger value="Domingo">Domingo</TabsTrigger>
            </TabsList>

            {[
              'Segunda',
              'Terça',
              'Quarta',
              'Quinta',
              'Sexta',
              'Sábado',
              'Domingo'
            ].map((dia) => (
              <TabsContent key={dia} value={dia} className="space-y-4">
                {fichas
                  .filter((ficha) => {
                    const match = ficha.diaSemana === dia;

                    return match;
                  })
                  .map((ficha) => (
                    <div key={ficha.id}>
                      <h3>{dia}</h3>
                      {ficha.exercicios.length > 0 ? (
                        ficha.exercicios.map((exercicio) => (
                          <div key={exercicio.id}>
                            <p>Exercício: {exercicio.nomeExercicio}</p>
                            <p>Repetições: {exercicio.repeticoes}</p>
                            <p>Carga: {exercicio.carga}kg</p>
                          </div>
                        ))
                      ) : (
                        <p>Nenhum exercício para este dia.</p>
                      )}
                    </div>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        )} */}
      </div>
    </ScrollArea>
  );
}
