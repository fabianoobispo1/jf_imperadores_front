'use client';

import { Button } from '@/components/ui/button';
import { Usuario, usuarioSchema } from './schemas/usuarioSchema';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
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
            color={errors.nome ? 'failure' : undefined}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            disabled
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

        <div className="flex items-center gap-2">
          <Checkbox id="administrador" {...register('administrador')} />
          <Label htmlFor="administrador">Administrador</Label>
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
