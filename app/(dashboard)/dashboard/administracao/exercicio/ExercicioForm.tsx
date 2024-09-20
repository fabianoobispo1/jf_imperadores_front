'use client';

import { Button } from '@/components/ui/button';
import { Exercicio, exercicioSchema } from './schemas/exercicioSchema';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@radix-ui/react-checkbox';

type Props = {
  onSubmit: (data: Exercicio, resetForm: () => void) => void;
  defaultValues?: Partial<Exercicio>;
  loading: boolean;
};
export function ExercicioForm({ onSubmit, defaultValues, loading }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Exercicio>({
    resolver: zodResolver(exercicioSchema),
    defaultValues: {
      id: '',
      nome: '',
      descricao: '',
      url_img: '',
      url_video: '',
      ...defaultValues
    }
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        id: defaultValues.id || '',
        nome: defaultValues.nome || '',
        descricao: defaultValues.descricao || '',
        url_img: defaultValues.url_img || '',
        url_video: defaultValues.url_video || ''
      });
    }
    console.log(defaultValues);
  }, [defaultValues, reset]);

  // Chame a função onSubmit passada como props
  const onSubmitHandler = (data: Exercicio) => {
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
            placeholder="Nome do exrcício"
            {...register('nome')}
            color={errors.nome ? 'failure' : undefined} // Modifica o estilo se houver erro
          />
          {errors.nome && (
            <p className="text-sm text-red-500">{errors.nome.message}</p> // Exibe a mensagem de erro
          )}
        </div>

        <div>
          <Label htmlFor="descricao">Descrição</Label>
          <Input
            id="descricao"
            type="descricao"
            placeholder="Uma breve deescrição"
            {...register('descricao')}
            color={errors.descricao ? 'failure' : undefined}
          />
           {errors.nome && (
            <p className="text-sm text-red-500">{errors.nome.message}</p> // Exibe a mensagem de erro
          )}
        </div>

        <div>
          <Label htmlFor="url_img">Imagem</Label>
          <Input
            id="url_img"
            type="url_img"
            placeholder="Link de uma imagem"
            {...register('url_img')}
            color={errors.url_img ? 'failure' : undefined}
          />
        </div>
        <div>
          <Label htmlFor="url_video">Video</Label>
          <Input
            id="url_video"
            type="url_video"
            placeholder="Link de um video"
            {...register('url_video')}
            color={errors.url_video ? 'failure' : undefined}
          />
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
