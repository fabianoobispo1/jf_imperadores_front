'use client';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast, useToast } from '../ui/use-toast';
import { AlertModal } from '../modal/alert-modal';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '../ui/calendar';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { LoadingButton } from '../ui/loading-button';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const formSchema = z.object({
  nome: z.string().min(3, { message: 'Nome é obrigatorio' }),
  descricao: z.string().min(3, { message: 'Descrição é obrigatorio' }),
  data_vencimento: z.date({
    required_error: 'Data de vencimento é obrigatorio'
  }),
  data_pagamento: z.date(),
  valor: z.coerce.number(),
  tipo: z.enum(['Entrada', 'Saida'])
});

type MovimentacaoFormValues = z.infer<typeof formSchema>;

interface MovimentacaoFormProps {
  id: string;
}

export const MovimentacaoForm: React.FC<MovimentacaoFormProps> = ({ id }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = id === 'create' ? 'Nova Movimentação' : 'Editar Movimentacao';
  const description =
    id === 'create'
      ? 'Adicionar informações de uma nova movimentação'
      : 'Editar informações de uma movimentacao';
  const action = id === 'create' ? 'Salvar' : 'Salvar alterações';
  const [atleta, setAtleta] = useState<MovimentacaoFormValues | null>(null);

  const { data: session } = useSession();

  /*   useEffect(() => {
      const fetchAtleta = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/atleta/buscar/${id}`); 
          if (!response.ok) {
            throw new Error('Erro ao buscar dados');
          }
  
          const data = await response.json();
          const atletaData = data.atleta[0];
          
          // Atualize o estado e o formulário
          setAtleta(atletaData);
          form.reset({
            cpf: atletaData.cpf || '',
            nome: atletaData.nome || '',
            email: atletaData.email || '',
            data_nascimento: new Date(atletaData.data_nascimento),
            data_inicio: new Date(atletaData.data_inicio),
            setor: atletaData.setor || '',
            posicao: atletaData.posicao || '',
            numero: atletaData.numero || 0,
            altura: atletaData.altura || 0,
            peso: atletaData.peso || 0,
            ativo: atletaData.ativo ? 'true' : 'false',
          });
          setLoading(false);
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };
  
      if (id !== 'create') {
        fetchAtleta();
      }
    
    }, []);
   */
  const form = useForm<MovimentacaoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      descricao: '',
      data_vencimento: new Date(),
      data_pagamento: new Date('1900-01-01'),
      valor: 0,
      tipo: 'Entrada'
    }
  });

  const onSubmit = async (data: MovimentacaoFormValues) => {
    /*   const finalData = {
        ...data,
        data_vencimento: new Date(data.data_vencimento.setHours(0, 0, 0, 0)),
        data_pagamento: new Date(data.data_pagamento.setHours(0, 0, 0, 0)),
      };
   */

    try {
      setLoading(true);
      if (id === 'create') {
        const finalData = {
          ...data,
          data_vencimento: new Date(data.data_vencimento.setHours(0, 0, 0, 0))
        };
        console.log(finalData);
        /*   const response = await fetch('/api/movimentacao/registrar', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ movimentacao: finalData })
        }); */

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/movimentos/Registrarmovimento`,
          {
            nome: finalData.nome,
            descricao: finalData.descricao,
            tipo: finalData.tipo,
            valor: finalData.valor,
            data_vencimento: finalData.data_vencimento
          },
          {
            headers: {
              Authorization: `Bearer ${session?.user.tokenApi}`
            }
          }
        );

        if (response.status == 200) {
          toast({
            title: 'OK',
            description: 'Movimentação Salva'
          });
          router.refresh();
          router.push(`/dashboard/movimentacao`);
        } else {
          toast({
            variant: 'destructive',
            title: 'Movimentação nâo salva',
            description: 'Erro desconhecido'
          });
        }
      } else {
        /*  setLoading(true);
         const response = await fetch(`/api/atleta/atualizar/${id}`, {
           method: 'PUT',
           credentials: 'include',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({ atleta: finalData })
         });
   
         
         if (response.ok) {
           toast({
             title: 'OK',
             description: 'Atleta alterado'
           });
           router.refresh();
           router.push(`/dashboard/atleta`);
         }else{
           toast({
             variant: 'destructive',
             title: 'Atleta não alterado',
             description: 'Erro desconhecido'
           });
         }
         setLoading(true); */
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Ah, ah! Algo deu errado.',
        description: 'Houve um problema com a requisição'
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    /*  try {
       setLoading(true)
       const response =  await fetch(`/api/atleta/remover/${id}`, {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' }
       });      
         setLoading(false)    
         setOpen(false)
          
       router.refresh();
       router.push(`/dashboard/atleta`);
     } catch (error: any) {
     } finally {
       setLoading(false);
       setOpen(false);
     } */
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {id !== 'create' && (
          <LoadingButton
            loading={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </LoadingButton>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="descricao"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="valor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="data_vencimento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Vencimento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), 'dd/MM/yyyy', {
                              locale: ptBR
                            })
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        fromYear={1960}
                        toYear={2024}
                        captionLayout="dropdown-buttons"
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {id !== 'create' && (
              <FormField
                control={form.control}
                name="data_pagamento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de pagamento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), 'dd/MM/yyyy', {
                                locale: ptBR
                              })
                            ) : (
                              <span>Escolha uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          fromYear={1960}
                          toYear={2024}
                          captionLayout="dropdown-buttons"
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Movimentação</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="?"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Entrada">Entrada</SelectItem>
                      <SelectItem value="Saida">Saida</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <LoadingButton type="submit" loading={loading}>
            {action}
          </LoadingButton>
        </form>
      </Form>
    </>
  );
};
