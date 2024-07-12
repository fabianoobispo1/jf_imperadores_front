'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useToast } from '../ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '../ui/calendar';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { LoadingButton } from '../ui/loading-button';

const formSchema = z.object({
  data_pagamento: z.date({
    required_error: 'Data de pagamento é obrigatorio'
  })
});

type DataPagamentoFormValues = z.infer<typeof formSchema>;

interface DataPagamentoFormProps {
  id: string;
}

export const DataPagamentoForm: React.FC<DataPagamentoFormProps> = ({ id }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const action = id === 'create' ? 'Salvar' : 'Salvar alterações';



  const form = useForm<DataPagamentoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data_pagamento: new Date()
    }
  });

  const onSubmit = async (data: DataPagamentoFormValues) => {
    try {
      setLoading(true);



      const response = await fetch('/api/movimentacao/registrar', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movimentacao: data })
      });





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



  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
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
          </div>
          <LoadingButton type="submit" loading={loading}>
            {action}
          </LoadingButton >
        </form>
      </Form>
    </>
  );
};
