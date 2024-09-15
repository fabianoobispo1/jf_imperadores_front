'use client';
import { Button } from '@/components/ui/button';
import { Usuario, usuarioSchema } from './schemas/usuarioSchema';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Spinner } from '@/components/ui/spinner';
import { Separator } from '@radix-ui/react-separator';
import { Heading } from '@/components/ui/heading';
import { formatISO } from 'date-fns';

export function PerfilForm() {
  const [loadingData, setLoadingData] = useState(true);
  const [bloqueioProvider, setBloqueioProvider] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Usuario>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      id: '',
      nome: '',
      email: '',
      data_nascimento: '',
      administrador: false
    }
  });

  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/usuario/perfil`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.tokenApi}`
            }
          }
        );
        if (response.data.sfaUsuario.provider !== 'Credentials') {
          setBloqueioProvider(true);
        }
        // Atualiza os valores do formulário com os dados da API
        reset({
          id: response.data.sfaUsuario.id,
          nome: response.data.sfaUsuario.nome,
          email: response.data.sfaUsuario.email,
          data_nascimento: response.data.sfaUsuario.data_nascimento
            ? new Date(response.data.sfaUsuario.data_nascimento)
                .toISOString()
                .split('T')[0]
            : '',
          administrador: response.data.sfaUsuario.administrador,
          provider: response.data.sfaUsuario.provider || '',
          img_url: response.data.sfaUsuario.img_url || ''
        });
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
      } finally {
        setLoadingData(false); // Define o carregamento como concluído
      }
    };

    fetchData();
  }, [reset]);

  // Chame a função onSubmit passada como props
  const onSubmitHandler = async (data: Usuario) => {
    console.log(data);
    try {
      // Verifique se data_nascimento não é undefined
      const date = data.data_nascimento
        ? new Date(data.data_nascimento)
        : new Date();

      // Formata a data no formato ISO com hora
      const formattedDate = formatISO(date, { representation: 'complete' });

      // Cria o objeto com a data formatada
      const dataToSend = {
        ...data,
        data_nascimento: formattedDate // Aqui você formata a data para o formato ISO
      };

   
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/usuario/editarusuario/${data.id}`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${session?.user.tokenApi}`
          }
        }
      );

      const result = await response.data;
      console.log('Update result:', result);
      setLoadingData(false);
    } catch (error) {
      console.error('Failed to update user data', error);
      setLoadingData(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={'Perfil'}
          description={'Editar suas informações pessoais.'}
        />
      </div>
      <Separator />

      {loadingData ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
          {/* Campo oculto para o id */}
          <input type="hidden" {...register('id')} />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Nome do usuário"
                {...register('nome')}
                color={errors.nome ? 'failure' : undefined} // Modifica o estilo se houver erro
              />
              {errors.nome && (
                <p className="text-sm text-red-500">{errors.nome.message}</p> // Exibe a mensagem de erro
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                disabled={bloqueioProvider}
                id="email"
                type="email"
                placeholder="user@example.com"
                {...register('email')}
                color={errors.email ? 'failure' : undefined}
              />
            </div>

            <div>
              <Label htmlFor="data_nascimento">Data Nascimento</Label>
              <Input
                id="data_nascimento"
                type="date"
                {...register('data_nascimento')}
                color={errors.data_nascimento ? 'failure' : undefined}
              />
            </div>

            {/*   <div>
              <Label htmlFor="administrador">Administrador</Label>
              <select
                id="administrador"
                {...register('administrador', {
                  setValueAs: (v) => v === 'true' // Converte a string para booleano
                })}
                className={`'flex disabled:opacity-50' h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed ${
                  errors.administrador ? 'border-red-500' : ''
                }`}
              >
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
              {errors.administrador && (
                <p className="text-sm text-red-500">
                  {errors.administrador.message}
                </p> // Exibe a mensagem de erro
              )}
            </div> */}
          </div>

          <Button
            disabled={loadingData}
            className="w-32 border-none focus:border-none focus:ring-0"
            type="submit"
          >
            Salvar
          </Button>
        </form>
      )}
    </>
  );
}
