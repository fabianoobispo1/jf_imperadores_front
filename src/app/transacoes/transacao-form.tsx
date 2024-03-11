"use client";

import { FaTransacoesInput, FaTransacoesSchema } from "@/lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import FormInput from "@/components/FormInput";
import { LoadingButton } from "@/components/LoadingButton";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import useSession from "@/lib/useSession";
import { useRouter } from "next/navigation";

export default function TransacaoForm() {
  const store = useStore();
  const sesion = useSession();
  const router = useRouter();

  const methods = useForm<FaTransacoesInput>({
    resolver: zodResolver(FaTransacoesSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;
 
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

 /* useEffect(() => {
    store.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 */
  async function addFaTransacaoFunction(faTransacao: FaTransacoesInput) {    
    store.setRequestLoading(true);    
    try {
     const token =sesion?.token
     const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };  
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
     
     const response = await fetch(`${process.env.NEXT_PUBLIC_API_MINHA_BASE}/fatransacaoregister`, {
      method: "POST",
     
      headers,
      body: JSON.stringify({
        titulo: faTransacao.titulo,
        tipo: faTransacao.tipo,
        valor:parseFloat(faTransacao.valor),
        vencimento: faTransacao.vencimento+'T00:00:00.000Z'
      })
    });
    if (response.status === 201){

      toast.success("Item adicionado");
      router.refresh()
      router.push('/transacoes')
    }


 
    } catch (error: any) {
      console.log(error);
      if (error instanceof Error) {
        handleApiError(error);
      } else {
        toast.error(error.message);
        console.log("Error message:", error.message);
      }
    } finally {
      store.setRequestLoading(false);
    }
  }

  const onSubmitHandler: SubmitHandler<FaTransacoesInput> = (values) => {

    addFaTransacaoFunction(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="max-w-full w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
      >

      <div className="grid grid-cols-1 gap-4">
        <FormInput label="Titulo" name="titulo" type="text" />
      </div>
        
      <div className="grid grid-cols-3 gap-4">
        <FormInput label="Valor" name="valor" type="number"  />
        <FormInput label="Tipo" name="tipo" type="text"  />
        <FormInput label="Vencimento" name="vencimento" type="date" />
      </div>

        <LoadingButton
          loading={false}
          textColor="text-ct-blue-600"
        >
          Salvar
        </LoadingButton>
  
      </form>
    </FormProvider>
  );
}
