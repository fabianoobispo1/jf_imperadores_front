'use client';
import BreadCrumb from '@/components/breadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Usuario } from './schemas/usuarioSchema';
import { useSession } from 'next-auth/react';
import { Spinner } from '@/components/ui/spinner';
import { ExercicioForm } from './ExercicioForm';
import { ExercicioTable } from './ExercicioTable';

const breadcrumbItems = [
  { title: 'Administrção', link: '/dashboard/administracao' },
  { title: 'Exercícios', link: '/dashboard/administracao/exercícios' }
];
export default function Page() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: session } = useSession();

  useEffect(() => {
    loadExercicios();
  }, []);

  const loadExercicios = async () => {
    setLoading(true);
    try {
      /*    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/usuario/listausuarios`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.tokenApi}`
          }
        }
      );
      const usuario = response.data.sfaUsuario || [];
      setUsuarios(usuario); */
      setUsuarios([]);
    } catch (error: any) {
      /*       toast.error(error.response.data.message || "Erro 500"); */
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async (usuario: Usuario, resetForm: () => void) => {
    console.log(usuario);
    if (editingUsuario) {
      try {
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
    } /*else {
      try {
        const body = {
          endpoint: "/toronCategoriaregister",
          method: "POST",
          body: '{"categoria": "' + category.categoria + '"}',
          isprivate: "true",
        };

        const response = await axios.post("/api/apiexterna", body);

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

      //await addCategory(category.categoria);
    } */

    resetForm();
    setEditingUsuario(null);
    await loadExercicios();
    toast({
      title: 'ok',
      description: 'Cadastro Atualizado ....'
    });
  };

  const handleEdit = (usuario: Usuario) => {
    setEditingUsuario(usuario);
  };

  const handleDelete = async (id: string) => {
    /*   try {
      const body = {
        endpoint: `/toronCategoriadelete`,
        method: "DELETE",
        isprivate: "true",
        body: '{"id": "' + id + '"}',
      };
      const response = await axios.post("/api/apiexterna", body);
      if (!response.data.message.toronCategoria) {
        toast.error(response.data.message.message);
        
      } else { 
        await loadCategorias();
        toast.success("Categoria apagada.");
      }
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message || "Erro 500");
    } */
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
              usuarios={usuarios}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </ScrollArea>
    </>
  );
}
