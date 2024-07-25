'use client';
import { Heading } from '@/components/ui/heading';
import { Button } from '../ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { perfilSchema, type PerfilFormValues } from '@/lib/form-schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Spinner } from '../ui/spinner';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';

import AvatarUpload from '../avatar-upload';

export const PerfilUser: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [loadingFinal, setLoadingFinal] = useState(false);
  const [bloqueioProvider, setBloqueioProvider] = useState(false);
  const [umaVez, setUmaVez] = useState(true);
  const [imagemAvatar, setImagemAvatar] = useState('')
  const { data: session } = useSession();

  useEffect(() => {
    if (umaVez) {
      setLoading(true);
      if (session?.user.provider !== 'Credentials') {
        setBloqueioProvider(true);
      }
      const tste = async () => {
        const response = await fetch('/api/usuario/recupera', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: session?.user.email })
        });

        const dataresponse = await response.json();

        dataresponse.user.img_url = [{fileUrl: dataresponse.user.img_url}]
/*         if (dataresponse.user.img_url === null) {
          dataresponse.user.img_url = ''
        }
        setImagemAvatar(dataresponse.user.img_url) */
        dataresponse.user.data_nascimento = adjustToLocalTimezone(
          dataresponse.user.data_nascimento
        ); // Ajustar a data ao fuso horário local
        form.reset(dataresponse.user);
        setLoading(false);
      };

      tste();

      setUmaVez(false); // Corrigido para evitar repetição infinita
    }
  }, [session, umaVez]);

  const defaultValues = {
    nome: '',
    email: '',
    data_nascimento: new Date(),
    img_url: []
  };

  const form = useForm<PerfilFormValues>({
    resolver: zodResolver(perfilSchema),
    defaultValues,
    mode: 'onChange'
  });

  // Função para ajustar a data ao fuso horário local
  const adjustToLocalTimezone = (dateString: string) => {
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + userTimezoneOffset);
  };

  const updateUserData = async (data: PerfilFormValues) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/usuario/atualizar/${data.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log('Update result:', result);
      setLoading(false);
    } catch (error) {
      console.error('Failed to update user data', error);
      setLoading(false);
    }
  };

  const processForm: SubmitHandler<PerfilFormValues> = (data) => {
    const formattedDate = format(new Date(data.data_nascimento), 'yyyy-MM-dd');
    const formattedData = { ...data, data_nascimento: new Date(formattedDate) };

    console.log('data ==>', formattedData);
    updateUserData(formattedData);
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

      {loading ? (
        < Spinner />
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(processForm)}
            className="w-full space-y-8"
          >
            <div className="gap-4 md:grid md:grid-cols-2">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input disabled={loading} {...field} />
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
                      <Input
                        disabled={loading || bloqueioProvider}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="img_url"
                render={({ field }) => (
                  <FormItem>

              <AvatarUpload
                    onChange={field.onChange}
                    value={field.value}
                    onRemove={field.onChange}
                  />

                {/* <Avatar className="h-32 w-32 mt-4">
                  <AvatarImage
                    src={field.value}
                    alt={field.value}
                  />
                  <AvatarFallback>{'Fabiano'}</AvatarFallback>
                </Avatar> */}
             

                  </FormItem>
                )}
                />

              
            </div>

            <div className="gap-4 md:grid md:grid-cols-3">
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
             {/*  <FormField
                control={form.control}
                name="img_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagem link</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

            </div>
            <Button disabled={loadingFinal} className="ml-auto" type="submit">
              Salvar
            </Button>
          </form>
        </Form>


      )}


    </>
  );
};
