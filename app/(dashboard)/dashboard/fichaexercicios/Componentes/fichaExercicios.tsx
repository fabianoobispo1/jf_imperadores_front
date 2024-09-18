'use client';

import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { useRouter } from 'next/navigation';
import { TodoList } from '@/components/TodoList';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Overview } from '@/components/overview';
export const FichaExercicios: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={'Seus exercícios'} description="...." />
        {/*  <LoadingButton
          
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/atleta/create`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Adicionar
        </LoadingButton> */}
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
            segunda
          </TabsContent>
          <TabsContent value="terca" className="space-y-4">
            terca
          </TabsContent>
          <TabsContent value="quarta" className="space-y-4">
            quarta
          </TabsContent>
          <TabsContent value="quinta" className="space-y-4">
            quinta
          </TabsContent>
          <TabsContent value="sexta" className="space-y-4">
            sexta
          </TabsContent>
          <TabsContent value="sabado" className="space-y-4">
            sabado
          </TabsContent>
          <TabsContent value="domingo" className="space-y-4">
            domingo
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
