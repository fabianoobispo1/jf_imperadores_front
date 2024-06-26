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
import { format } from "date-fns";

import FormInputComboBox from "@/components/FormInputCombobox";
import {  EnvelopeSimpleOpen, Trash } from "phosphor-react";


interface Transacao {
  id: string,
 titulo: string,
 valor:number,
 tipo: string,
 vencimento: string,
 updated_at: string,
 created_at: string,
 faUsuario_id: string
}

interface ResultList {
  totalRecebimentos: number;
  totalPagamentos: number;
  faTransacao: Transacao[];
}


interface Usuario {
  nome: string,
   email: string,
   data_nascimento: string,
}
interface Atleta {
 id: string,
 apelido: string,
 data_inicio: string,
 tipo: string,
 posicao: string,
 numero_camisa:  number,
 altura:  number,
 pesso:  number,
 rg: string,
 cpf: number,
 cep:  number,
 endereco: string,
 numero_endereco: number,
 complemento: string,
 bairro: string,
 cidade: string,
 estado: string,
 telefone:  number,
 updated_at: string,
 created_at: string,
 faUsuarioId: string,
 usuario: Usuario
}
interface FaAtleta {
  faAtleta: Atleta[]
}

export default function AtletaList() {
  const store = useStore();
  const sesion = useSession();
  const router = useRouter();

  const token = sesion?.token

  const [ listAtleta, setListAtleta] =  useState<FaAtleta | null>(null)
  const [list, setList] = useState<ResultList | null>(null)
  const [carregandoLista, setCarregandoLista] = useState(true)

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
    setCarregandoLista(true)  
    try {
      const headers: Record<string, string> = {
       "Content-Type": "application/json",
     };  
     if (token) {
       headers["Authorization"] = `Bearer ${token}`;
     }      
     const response = await api('/faatletalistar', {method: 'GET',headers})

     setListAtleta(await response.json()) 
     } catch (error: any) {
       console.log(error);     
     } finally {
      setCarregandoLista(false)         
    }  
  }

/*   
  async function deleteRow(id:string) {
    try {
     const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };  
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }     
      await fetch(`${process.env.NEXT_PUBLIC_API_MINHA_BASE}/faApagar/${id}`, {
        method: "GET",      
        headers
      });

    atualizaLista()        
    } catch (error: any) {
      console.log(error);
   }
 }
 */
  return (
    <div className="pt-2">
   
   {/*  <div className="max-w-full w-full mx-auto overflow-hidden  bg-transparent rounded-md p-8 space-y-5"></div> */}

    <div className="max-w-full w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-md p-8 space-y-5">
      {/* <div className="grid grid-cols-2 gap-4 justify-between">
        <p>Título</p>
        <p className="text-right">Opções</p>
      </div>
      <div className="grid grid-cols-3 gap-4 ">
           
        <p>Valor</p>
        <p  className="text-center">Tipo</p>
        <p  className="text-right">Vencimento</p>

      </div> */}
    
      {carregandoLista == true? 
      <p>carregando</p>
      : 
   
      <>
      
        {listAtleta?.faAtleta.map((iten: Atleta) =>
        
         <div key={iten.id} >
       
         <div className="grid grid-cols-2 gap-4 justify-between">
           <p>{iten.usuario.nome} - {iten.apelido}</p> 
            {/*  <div className="grid justify-items-end">
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
          */}  
           </div>
        </div>     
      )}

      
       {/*  <div className="grid ">
          <p>Total Pagamentos:</p>
          <p>{list?.totalPagamentos.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
        </div>  

        <div className="grid ">
          <p>Total Recebimentos:</p>
          <p>{list?.totalRecebimentos.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
        </div> */}
      </>}

   

    </div>

  </div>

  );
}


