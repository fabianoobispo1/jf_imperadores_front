"use client";

import { FaTransacoesInput, FaTransacoesSchema } from "@/lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import FormInput from "@/components/FormInput";
import { LoadingButton } from "@/components/LoadingButton";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import useSession from "@/lib/useSession";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api";
import { format, compareAsc } from "date-fns";

import FormInputComboBox from "@/components/FormInputCombobox";

export default function TransacaoFormList() {
  const store = useStore();
  const sesion = useSession();
  const router = useRouter();

  const token = sesion?.token

  const [list, setList] = useState([''])

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
    if (token){  
      atualizaLista() 
    }  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful, token]);


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
    faTransacao.tipo == "0" ?faTransacao.tipo ='P' : faTransacao.tipo
    const response = await api('/fatransacaoregister', {method: 'POST',headers, body: JSON.stringify({
      titulo: faTransacao.titulo,
      tipo:faTransacao.tipo, 
      valor:parseFloat(faTransacao.valor),
      vencimento: faTransacao.vencimento+'T00:00:00.000Z'
    })} )

    if (response.status === 201){

      toast.success("Item adicionado");

      atualizaLista()

    }
    if (response.status === 403){

      toast.success(await response.json());

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

  async function atualizaLista() {
    try {
      const headers: Record<string, string> = {
       "Content-Type": "application/json",
     };  
     if (token) {
       headers["Authorization"] = `Bearer ${token}`;
     }      
     const response = await api('/fatransacaolistar', {method: 'GET',headers} )

     setList(await response.json())      
     } catch (error: any) {
       console.log(error);     
     } 
  }

  
  async function deleteRow(id:string) {
    try {
     const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };  
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }     
      await fetch(`${process.env.NEXT_PUBLIC_API_MINHA_BASE}/fatransacaoapagar`, {
        method: "POST",      
        headers,
        body:JSON.stringify({
        id
        })
      });

    atualizaLista()        
    } catch (error: any) {
      console.log(error);
   }
 }

  return (
    <div>
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



        <FormInputComboBox label="Tipo" name="tipo" type="select" />

{/*         <FormInput label="Tipo" name="tipo" type="select"  /> */}
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

    <div className="max-w-full w-full mx-auto overflow-hidden  bg-transparent rounded-2xl p-8 space-y-5"></div>

    <div className="max-w-full w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5">
      <div className="grid grid-cols-5 gap-4">
        <p>Titulo</p>
        <p>Valor</p>
        <p>Tipo</p>
        <p>Venciemnto</p>
        <p>Opcoes</p>
      </div>

      {list.map((iten: any) =>
        <div key={iten.id} >

          <div className="grid grid-cols-5 gap-4 border-b-2 border-fa-dourado">
            <p>{iten.titulo}</p>
            <p>{iten.valor}</p>
            {iten.tipo =='P'? <p>Pagamento</p> :<p>Recebiemnto</p>  }

            <p>{format(new Date(iten.vencimento), "dd/MM/yyyy")    }</p>
            <div>
              <button onClick={() => {deleteRow(iten.id)}} >
                {/* <Trash  /> */}
              </button>          
            </div>  

          </div>
        </div>      
      )}
        <div className="grid ">
          Total
        </div>


    </div>

  </div>

  );
}