'use client';
import { Heading } from '@/components/ui/heading';
import { Button } from '../ui/button';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
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

export const PerfilUser: React.FC = () => {
    const [responseApi, setResponseApi] = useState({});
    const [loading, setLoading] = useState(false);
    const [bloqueioProvider, setBloqueioProvider] = useState(false);
    const [umaVez, setUmaVez] = useState(true);

    const[nome,setNome] = useState('')

    const { data: session } = useSession();

    useEffect(() => {
        if (umaVez) {
            setLoading(true)
            if (session?.user.provider !== "Credentials") {
                setBloqueioProvider(true);
            }
            const tste = async () => {
            const response = await fetch('/api/usuario/recupera', {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body:  JSON.stringify({email: session?.user.email}),
              });
              
                const dataresponse = await response.json();
                setResponseApi(dataresponse.user)
                console.log(dataresponse)
                setNome(dataresponse.name)
                setLoading(false)
            }

            tste()
            
            setUmaVez(false); // Corrigido para evitar repetição infinita
          

        
        }
    }, [session, umaVez]);

    const defaultValues = {
        nome: nome,
        email: session?.user.email || '',
        dataNascimento: new Date(),
    };

    const form = useForm<PerfilFormValues>({
        resolver: zodResolver(perfilSchema),
        defaultValues,
        mode: 'onChange',
    });

    const processForm: SubmitHandler<PerfilFormValues> = (data) => {
        const formattedDate = format(new Date(data.dataNascimento), 'yyyy-MM-dd HH:mm:ss');
        const formattedData = { ...data, dataNascimento: formattedDate };

        console.log('data ==>', formattedData);
        /* setData(formattedData); */

        // api call and reset
        // form.reset();
    };

    if (loading){
        return (
            <Loader2 className={cn('h-4 w-4 animate-spin')} />
        );
    }else{
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={'Perfil'} description={'Editar suas informações pessoais.'} />
            </div>
            <Separator />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(processForm)}
                    className="w-full space-y-8"
                >
                    <div className='gap-4 md:grid md:grid-cols-2'>
                        <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input
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
                                            disabled={loading || bloqueioProvider}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='gap-4 md:grid md:grid-cols-3'>
                        <FormField
                            control={form.control}
                            name="dataNascimento"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data de Nascimento</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(new Date(field.value), "dd/MM/yyyy", { locale: ptBR })
                                                    ) : (
                                                        <span>Escolha uma data</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Salvar
                    </Button>
                </form>
            </Form>
        </>
    );
    }
}
