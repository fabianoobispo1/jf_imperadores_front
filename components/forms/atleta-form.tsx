'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from '@/components/ui/checkbox';
// import FileUpload from "@/components/FileUpload";
import { useToast } from '../ui/use-toast';
import FileUpload from '../file-upload';
import { AlertModal } from '../modal/alert-modal';



const formSchema = z.object({
  nome: z
    .string()
    .min(3, { message: 'Nome é obrigatorio' }),
  setor: z
    .string()
    .min(3, { message: 'Setor é obrigatorio' }),
  posicao: z
    .string()
    .min(3, { message: 'Posição é obrigatorio' }),
  numero: z.coerce.number(),
  ativo: z.enum(['true', 'false']),
});

type AtletaFormValues = z.infer<typeof formSchema>;

interface AtletaFormProps {
  id: string;
}

export const AtletaForm: React.FC<AtletaFormProps> = ({
  id
}) => {

  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = id == 'create' ? 'Novo atleta' : 'Editar Atleta';
  const description = id =='create' ?  'Adicionar informações de um novo atleta' : 'Editar informações de um atleta';
  const action = id  == 'create' ? 'Salvar' : 'Salvar alterações';

  const form = useForm<AtletaFormValues>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: AtletaFormValues) => {
    const finalData = {
      ...data,
      ativo: data.ativo === 'true',
    };
    console.log(finalData);

    try {
      setLoading(true);
      if (id == 'create') {
        // await axios.post(`/api/products/edit-product/${id._id}`, data);
    
    
        toast({         
          title: 'OK',
          description: 'Atleta Salvo'
        });
      
      } else {
        toast({         
          title: 'OK',
          description: 'Atleta alterado'
        });
        // const res = await axios.post(`/api/products/create-product`, data);
        // console.log("product", res);
      }
   /*    router.refresh();
      router.push(`/dashboard/atleta`); */

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
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/dashboard/atleta`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

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
        {id != 'create' && (
          <Button 
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
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
                    <Input
                      disabled={loading}
                      placeholder="Nome"
                      {...field}
                    />
                  </FormControl>
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
                    <Input
                      disabled={loading}
                      placeholder="Ataque, Defesa ... "
                      {...field}
                    />
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
                      placeholder="QB, OL, LT ...."
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
                    <Input type="number" disabled={loading} {...field} />
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
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="..."
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
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
