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
import { id, ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { LoadingButton } from '../ui/loading-button';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import router from 'next/router';
import { headers } from 'next/headers';

const formSchema = z.object({
  cpf: z.string().min(11, 'CPF inválido').max(11, 'CPF inválido'),
  nome: z.string().min(3, { message: 'Nome é obrigatorio' }),
  email: z.string().email({ message: 'email é obrigatorio' }),
  data_nascimento: z.date({
    required_error: 'Data de nascimento é obrigatorio'
  }),
  data_inicio: z.date({ required_error: 'Data de inicio é obrigatorio' }),
  setor: z.string(),
  posicao: z.string(),
  numero: z.coerce.number(),
  altura: z.coerce.number(),
  pesso: z.coerce.number(),
  ativo: z.enum(['true', 'false'])
});

type AtletaFormValues = z.infer<typeof formSchema>;

interface AtletaFormProps {
  id: string;
}

export const AtletaForm: React.FC<AtletaFormProps> = ({ id }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = id === 'create' ? 'Novo atleta' : 'Editar Atleta';
  const description =
    id === 'create'
      ? 'Adicionar informações de um novo atleta'
      : 'Editar informações de um atleta';
  const action = id === 'create' ? 'Salvar' : 'Salvar alterações';
  const [atleta, setAtleta] = useState<AtletaFormValues | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchAtleta = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/atleta/listaratleta/${id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.tokenApi}`
            }
          }
        );

        if (response.status != 200) {
          throw new Error('Erro ao buscar dados');
        }

        const atletaData = response.data.sfaAtleta;
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
          pesso: atletaData.pesso || 0,
          ativo: atletaData.ativo ? 'true' : 'false'
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

  const form = useForm<AtletaFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: '',
      nome: '',
      email: '',
      data_nascimento: new Date(),
      data_inicio: new Date(),
      setor: '',
      posicao: '',
      numero: 0,
      altura: 0,
      pesso: 0,
      ativo: 'true'
    }
  });

  const onSubmit = async (data: AtletaFormValues) => {
    const finalData = {
      ...data,
      data_nascimento: new Date(data.data_nascimento.setHours(0, 0, 0, 0)),
      data_inicio: new Date(data.data_inicio.setHours(0, 0, 0, 0)),
      ativo: data.ativo === 'true'
    };

    try {
      setLoading(true);
      if (id === 'create') {
        console.log('Adicionar: ');
        console.log(finalData);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/atleta/registraratleta`,

          finalData,
          {
            headers: {
              Authorization: `Bearer ${session?.user.tokenApi}`
            }
          }
        );

        if (response.status == 200) {
          toast({
            title: 'OK',
            description: 'Atleta Salvo'
          });
          router.refresh();
          router.push(`/dashboard/atleta`);
        }
      } else {
        setLoading(true);

       const response =  await axios.put(
          `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/atleta/atualizaratleta/${id}`,
          
            finalData
          ,
          {
            headers: {
              Authorization: `Bearer ${session?.user.tokenApi}`
            }
          }
        );

        if (response.status == 200) {
          toast({
            title: 'OK',
            description: 'Atleta alterado'
          });
          router.refresh();
          router.push(`/dashboard/atleta`);
        } else {
          toast({
            variant: 'destructive',
            title: 'Atleta não alterado',
            description: 'Erro desconhecido'
          });
        }
        setLoading(true);
      }
    } catch (error: any) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description:
          error.response.data.message ?? 'Houve um problema com a requisição'
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/atleta/apagaratleta/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.tokenApi}`
          }
        }
      );

      setLoading(false);
      setOpen(false);

      router.refresh();
      router.push(`/dashboard/atleta`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
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
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Cpf sem pontos"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="data_nascimento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Nascimento</FormLabel>
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
            <FormField
              control={form.control}
              name="data_inicio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de inicio</FormLabel>
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
            <FormField
              control={form.control}
              name="setor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Setor</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="setor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="posicao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Posição</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="OL, DT...."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numero</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="01"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="altura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Altura</FormLabel>
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
              name="pesso"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>pesso</FormLabel>
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
              name="ativo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Atleta Ativo</FormLabel>
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
                      <SelectItem value="true">Sim</SelectItem>
                      <SelectItem value="false">Não</SelectItem>
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
