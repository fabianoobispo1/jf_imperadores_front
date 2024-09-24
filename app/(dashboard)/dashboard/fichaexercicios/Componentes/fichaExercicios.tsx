'use client';

import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FichaExercicio } from '../../administracao/fichaexercicio/schemas/fichaExercicioSchema';
import { VideoModalButton } from '@/components/VideoModalButton';

interface FichaExercicioExibir extends FichaExercicio {
  posicaoEspecifica: string;
  descricao: string;
  nomeExercicio: string;
  url_img: string;
  url_video: string;
}

export const FichaExercicios: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [fichas, setFichas] = useState<FichaExercicioExibir[]>([]);

  const { data: session } = useSession();
  useEffect(() => {
    loadAtletas();
  }, []);

  const loadAtletas = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/ficaexercicio/listarexerciciosemail?email=${session?.user.email}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.tokenApi}`
          }
        }
      );
      setFichas(response.data || []);
      console.log(response.data);
    } catch (error: any) {
      /*       toast.error(error.response.data.message || "Erro 500"); */
    }
    setLoading(false);
  };

  const renderFichasPorDia = (dia: string) => {
    return fichas
      .filter((ficha) => ficha.diaSemana === dia)
      .map((ficha) => (
        <div key={ficha.fichaId}>
          <div className="flex flex-row gap-16 pb-4">
            <div>
              <p>◾ {ficha.nomeExercicio}</p>
              <p>Repetições: {ficha.repeticoes}</p>
              <p>Carga: {ficha.carga}</p>
            </div>
            <div>
              {ficha.url_video == '' ? (
                <></>
              ) : (
                <VideoModalButton
                  videoUrl={ficha.url_video || ''}
                  videoTitle={ficha.nomeExercicio || ''}
                />
              )}
            </div>
          </div>
        </div>
      ));
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={'Seus exercícios'} description="...." />
      </div>
      <Separator />
      <div className="pt-4">
        <Tabs defaultValue="segunda" className="space-y-4">
          <TabsList>
            <TabsTrigger value="segunda">Segunda</TabsTrigger>
            <TabsTrigger value="terca">Terça</TabsTrigger>
            <TabsTrigger value="quarta">Quarta</TabsTrigger>
            <TabsTrigger value="quinta">Quinta</TabsTrigger>
            <TabsTrigger value="sexta">Sexta</TabsTrigger>
            <TabsTrigger value="sabado">Sabado</TabsTrigger>
            <TabsTrigger value="domingo">Domingo</TabsTrigger>
          </TabsList>
          <TabsContent value="segunda" className="space-y-4">
            {renderFichasPorDia('Segunda')}
          </TabsContent>
          <TabsContent value="terca" className="space-y-4">
            {renderFichasPorDia('Terça')}
          </TabsContent>
          <TabsContent value="quarta" className="space-y-4">
            {renderFichasPorDia('Quarta')}
          </TabsContent>
          <TabsContent value="quinta" className="space-y-4">
            {renderFichasPorDia('Quinta')}
          </TabsContent>
          <TabsContent value="sexta" className="space-y-4">
            {renderFichasPorDia('Sexta')}
          </TabsContent>
          <TabsContent value="sabado" className="space-y-4">
            {renderFichasPorDia('Sabado')}
          </TabsContent>
          <TabsContent value="domingo" className="space-y-4">
            {renderFichasPorDia('Domingo')}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
