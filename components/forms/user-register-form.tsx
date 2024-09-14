'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '../../components/ui/use-toast';
import { LoadingButton } from '../ui/loading-button';
import axios from 'axios';

const formSchema = z
  .object({
    nome: z.string().min(3, { message: 'Digite seu nome.' }),
    email: z.string().email({ message: 'Digite um email valido.' }),
    password: z.string().min(8, { message: 'Senha obrigatoria, min 8' }),
    confirmPassword: z.string().min(8, { message: 'Senha obrigatoria, min 8' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coecindem',
    path: ['confirmPassword']
  });

type UserFormValue = z.infer<typeof formSchema>;

export default function UserRegisterForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const defaultValues = {
    email: '',
    password: '',
    nome: '',
    confirmPassword: ''
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/usuario/adicionar`,
        {
          nome: data.nome,
          email: data.email,
          password: data.password,
          img_url: '',
          provider: 'PROVIDER'
        }
      );

      if (response.status == 201) {
        toast({
          title: 'ok',
          description: 'Cadastro realizado. Redirecionando ....'
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      }
    } catch (error) {
      // Verifica se o erro é do Axios
      if (axios.isAxiosError(error)) {
        // Se o backend enviar uma mensagem de erro customizada, podemos acessá-la
        const message =
          error.response?.data?.message || 'Ocorreu um erro inesperado.';

        const codStatus = error.response?.status;
        // Aqui você pode definir uma lógica para exibir a mensagem para o usuário

        toast({
          title: 'Erro',
          variant: 'destructive',
          description: codStatus + ' - ' + message
        });
      } else {
        // Tratamento de outros tipos de erros que não sejam do Axios
        toast({
          title: 'Erro',
          variant: 'destructive',
          description: 'Erro inesperado. Tente novamente mais tarde.'
        });
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    type="nome"
                    placeholder="Digite seu nome..."
                    disabled={loading}
                    {...field}
                  />
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
                    type="email"
                    placeholder="Digite seu e-mail..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder=""
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comfirmar senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder=""
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            loading={loading}
            className="ml-auto w-full"
            type="submit"
          >
            {loading ? 'Carregando' : 'Cadastrar'}
          </LoadingButton>
        </form>
      </Form>
    </>
  );
}
