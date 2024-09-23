'use client';
import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Exercicio } from './schemas/exercicioSchema';
import { useSession } from 'next-auth/react';
import { Spinner } from '@/components/ui/spinner';
import { ExercicioForm } from './ExercicioForm';
import { ExercicioTable } from './ExercicioTable';

const breadcrumbItems = [
  { title: 'Administrção', link: '/dashboard/administracao' },
  { title: 'Exercícios', link: '/dashboard/administracao/exercícios' }
];
export default function Page() {
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [editingUsuario, setEditingUsuario] = useState<Exercicio | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: session } = useSession();

  useEffect(() => {
    loadExercicios();
  }, []);

  const loadExercicios = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async (
    exercicio: Exercicio,
    resetForm: () => void
  ) => {
    console.log(exercicio);
    if (editingUsuario) {
      try {
        https://www.youtube.com/watch?v=rM6SDUdl9fs?atleta_id=${value}`,



        try {
          const response = await axios.put(
            `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/exrcicio/editarexrcicio/${exercicio.id}`,
            exercicio,
            {
              headers: {
                Authorization: `Bearer ${session?.user.tokenApi}`
              }
            }
          );
          console.log(response)
          if (response.status != 200) {
            toast({
              title: 'Erro',
              variant: 'destructive',
              description:
                response.status + ' - ' + response.data ?? 'Desconhecido'
            });
          }
          setEditingUsuario(null);
          resetForm();
         
          await loadExercicios();
          toast({
            title: 'ok',
            description: 'Cadastro atualizado ....'
          });
        } catch (error: any) {
          /*       toast.error(error.response.data.message || "Erro 500"); */
        } finally {
          setLoading(false);
        }




        /* const body = {
          endpoint: `/alterarusuarioadmintoron`,
          method: "POST",
          body:
            '{"toronUsuario_id": "' +
            usuario.id +
            '","toronUsuarioAdmin": ' +
            usuario.administrador +
            '}',
          isprivate: "true",
        };

        const response = await axios.post("/api/apiexterna", body);

        if (!response.data.message.toronUsuario) {
          toast.error(response.data.message.message);
    
        }  else {
          resetForm();
          setEditingUsuario(null);
          await loadCategorias();
          toast.success("Usuario alterado.");
        } */
      } catch (error: any) {
        /*   console.log(error.response.data.message);
        toast.error(error.response.data.message || "Erro 500"); */
      }
    } else {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/exercicio/registrarexercicio`,
          exercicio,
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

        resetForm();
        setEditingUsuario(null);
        await loadExercicios();
        toast({
          title: 'ok',
          description: 'Cadastro realizado ....'
        });
      } catch (error: any) {
        /*       toast.error(error.response.data.message || "Erro 500"); */
      } finally {
        setLoading(false);
      }
      /*  try {
       


        if (!response.data.message.toronCategoria) {
          toast.error(response.data.message.message);
        } else {
          resetForm();
          setEditingCategory(null);
          await loadCategorias();
          toast.success("Categoria cadastrada.");
        }
      } catch (error: any) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message || "Erro 500");
      }
 */
      //await addCategory(category.categoria);
    }
    /*    resetForm();
    setEditingUsuario(null);
    await loadExercicios();
    toast({
      title: 'ok',
      description: 'Cadastro Atualizado ....'
    }); */
  };

  const handleEdit = (usuario: Exercicio) => {
    setEditingUsuario(usuario);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/exercicio/deletexercicio/${id}`,

        {
          headers: {
            Authorization: `Bearer ${session?.user.tokenApi}`
          }
        }
      );

      if (response.status != 200) {
        toast({
          title: 'Erro',
          variant: 'destructive',
          description:
            response.status + ' - ' + response.data ?? 'Desconhecido'
        });
      }

      
        await loadExercicios();
        toast({
          title: 'ok',
          description: 'Cadastro removido ....'
        });
    
    } catch (error: any) {
      /*       toast.error(error.response.data.message || "Erro 500"); */
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <BreadCrumb items={breadcrumbItems} />
          <h1 className="text-xl font-bold">Gerenciamento de exercícios</h1>

          <ExercicioForm
            loading={loading}
            onSubmit={handleAddOrUpdate}
            defaultValues={editingUsuario ?? undefined}
          />

          {loading ? (
            <div className="flex h-full items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <ExercicioTable
              exercicios={exercicios}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </ScrollArea>
    </>
  );
}
