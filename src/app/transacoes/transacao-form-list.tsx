"use client";

import { FaTransacoesInput, FaTransacoesSchema } from "@/lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useLayoutEffect } from "react";
import FormInput from "@/components/FormInput";
import { LoadingButton } from "@/components/LoadingButton";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import useSession from "@/lib/useSession";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api";
import { format } from "date-fns";

import FormInputComboBox from "@/components/FormInputCombobox";
import { Trash } from "phosphor-react";

export default function TransacaoFormList() {
  const store = useStore();
  const sesion = useSession();
  const router = useRouter();

  const token = sesion?.token

  const [list, setList] = useState([''])
  const [carregandoLista, setCarregandoLista] = useState(true)
  const [totalPagamentos, setTotalPagamentos] = useState(0)
  const [totalRecebimentos, setTotalRecebimentos] = useState(0)


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
     
     if (list){
      contador(list)
     } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful, token, list]);



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
    setCarregandoLista(true)  
    setTotalPagamentos(0)
    setTotalRecebimentos(0)  
    try {
      const headers: Record<string, string> = {
       "Content-Type": "application/json",
     };  
     if (token) {
       headers["Authorization"] = `Bearer ${token}`;
     }      
     const response = await api('/fatransacaolistar', {method: 'GET',headers} )

     setList(await response.json())  

/*      list.map((iten: any) =>{
      if(iten.tipo =='P'){
        if(iten.valor){
          setTotalPagamentos(totalPagamentos+iten.valor) 
        }     
      }else{
        if(iten.valor){
          setTotalRecebimentos(totalRecebimentos+iten.valor)
        }
      }
     })
 */
/*      console.log(totalPagamentos)
     console.log(totalRecebimentos)
 */
     setCarregandoLista(false)    
     } catch (error: any) {
       console.log(error);     
     } 

  
  }
  async function contador(list:any ) {
    let totalRecebimento: any	 
    let totalPagamento: any	 
    totalRecebimento = 0
    totalPagamento = 0
    list.map((iten: any) =>{

      if(iten.tipo =='P'){
        if(iten.valor){
          totalPagamento = totalPagamento+iten.valor
        }     
      }else{
        if(iten.valor){
          totalRecebimento = totalRecebimento + iten.valor
        }
      }
     })
     setTotalPagamentos(totalPagamento)
     setTotalRecebimentos(totalRecebimento)
  
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
        className="max-w-full w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-md p-8 space-y-5"
      >

      <div className="grid grid-cols-1 gap-4">
        <FormInput label="Título" name="titulo" type="text" />
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

    <div className="max-w-full w-full mx-auto overflow-hidden  bg-transparent rounded-md p-8 space-y-5"></div>

    <div className="max-w-full w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-md p-8 space-y-5">
      <div className="grid grid-cols-2 gap-4 justify-between">
        <p>Título</p>
        <p className="text-right">Opções</p>
      </div>
      <div className="grid grid-cols-3 gap-4 ">
           
        <p>Valor</p>
        <p  className="text-center">Tipo</p>
        <p  className="text-right">Vencimento</p>

      </div>
    
      {carregandoLista == true? 
      <p>carregando</p>
      :
      <>
        {list.map((iten: any) =>
        
        <div key={iten.id} >
       
          <div className="grid grid-cols-2 gap-4 justify-between">
            <p>{iten.titulo}</p>
            <div className="grid justify-items-end">
              <button onClick={() => {deleteRow(iten.id)}} >
                <Trash  />
              </button>          
            </div>  
           </div>
           <div className="grid grid-cols-3 gap-4 border-b-2 border-fa-dourado">
            <p>{iten.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
            {iten.tipo =='P'?             
            <p className="text-center">Pagamento</p>             
            :
            <p className="text-center">Recebimento</p>  }

            

            
            <p  className="text-right">{format(new Date(iten.vencimento), "dd/MM/yyyy")}</p>
          
           </div>
        </div>      
      )}
      </>}

   
        <div className="grid ">
          <p>Total Pagamentos:</p>
          <p>{totalPagamentos.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
        </div>

        <div className="grid ">
          <p>Total Recebiemntos:</p>
          <p>{totalRecebimentos.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
        </div>

    </div>

  </div>

  );
}


