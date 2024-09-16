'use client';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useState } from 'react';
import { LoadingButton } from '@/components/ui/loading-button';
import { Edit } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Popover, PopoverContent } from '@radix-ui/react-popover';
import { PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
  data_pagamento: z.date({
    required_error: 'Data de pagamento é obrigatorio'
  })
});

type DataPagamentoFormValues = z.infer<typeof formSchema>;

interface DataPagamentoFormProps {
  id: string;
  jaPago: string;
  onUpdate: () => void;
}


export function Pagmodal({id, jaPago, onUpdate }:DataPagamentoFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<DataPagamentoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      data_pagamento: new Date()
    }
  });

  const onSubmit = async (data: DataPagamentoFormValues) => { 
      setLoading(true);

    
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_MINHA_BASE}/sfa/movimentos/Registrarmovimentopagameento`,
        {
          id, data_pagamento: data.data_pagamento
        },
        {
          headers: {
            Authorization: `Bearer ${session?.user.tokenApi}`
          }
        }
      );


    if (response.status == 200) {
      onUpdate(); 
      router.refresh();
    }

      setLoading(false);    
  };


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button  disabled={jaPago? true : false} variant="ghost" className='w-32'>
          <Edit className="mr-2 h-4 w-4" /> Foi Paga
        </Button>

      </DialogTrigger>
      <DialogContent className="h-auto w-auto max-w-60 fixed  top-[40%]">
        <DialogHeader>
          <DialogTitle>Data de pagamento</DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8 flex flex-col flex-end"
          >
            <div className="gap-8 ">
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
                      <PopoverContent className="w-auto pt-1 bg-background border border-border rounded-sm" align="start">
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
              salvar
            </LoadingButton >
          </form>
        </Form>


      </DialogContent>
    </Dialog>
  );
}
