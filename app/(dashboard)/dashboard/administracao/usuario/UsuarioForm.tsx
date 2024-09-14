'use client';

import { Button } from '@/components/ui/button';
import { Usuario, usuarioSchema } from './schemas/usuarioSchema';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@radix-ui/react-checkbox';

type Props = {
  onSubmit: (data: Usuario, resetForm: () => void) => void;
  defaultValues?: Partial<Usuario>;
  loading: boolean;
};
export function UsuarioForm({ onSubmit, defaultValues, loading }: Props) {
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
      administrador: false,
      ...defaultValues
    }
  });
  
  useEffect(() => {

    if (defaultValues) {
   
      reset({
        id: defaultValues.id || '',
        nome: defaultValues.nome || '',
        email: defaultValues.email || '',
        data_nascimento: defaultValues.data_nascimento
          ? new Date(defaultValues.data_nascimento).toISOString().split('T')[0]
          : '',
        administrador: defaultValues.administrador || false,
        provider: defaultValues.provider ||'',
        img_url: defaultValues.img_url||''
      });
    }
    console.log(defaultValues);
  }, [defaultValues, reset]);

  // Chame a função onSubmit passada como props
  const onSubmitHandler = (data: Usuario) => {
    onSubmit(data, () => reset()); // Isso garante que o onSubmit seja chamado e o formulário seja resetado
  };

  return (
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
            color={errors.nome ? "failure" : undefined} // Modifica o estilo se houver erro
            />
            {errors.nome && (
              <p className="text-sm text-red-500">{errors.nome.message}</p> // Exibe a mensagem de erro
            )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
                 disabled={defaultValues?.provider === 'github' || defaultValues?.provider === 'google'?true: false}
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

        <div>
          <Label htmlFor="administrador">Administrador</Label>
          <select
            id="administrador"
            {...register('administrador', {
              setValueAs: (v) => v === 'true', // Converte a string para booleano
            })}
            className={`'flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50' ${
              errors.administrador ? 'border-red-500' : ''
            }`}
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
          {errors.administrador && (
            <p className="text-red-500 text-sm">{errors.administrador.message}</p> // Exibe a mensagem de erro
          )}
        </div>
      </div>

      <Button
        disabled={loading}
        className="w-32 border-none focus:border-none focus:ring-0"
        type="submit"
      >
        Salvar
      </Button>
    </form>
  );
}
