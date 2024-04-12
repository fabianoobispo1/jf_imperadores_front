"use client";

import { FaAtletaInput, FaAtletaSchema, FaTransacoesInput, FaTransacoesSchema } from "@/lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Link from "next/link";
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
import {  Trash } from "phosphor-react";


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
  transacoes: Transacao[];
}



interface Atleta {
  id : string,
	data_inicio : string,
	tipo : string,
	posicao : string,
	numero : string,
	altura : number,
	pesso : number,
	updated_at : string,
	created_at : string,
	faUsuarioId : string,
}

interface Usuario {
  id : string,
  nome : string,
  email : string,
  password_hash : string,
  administrador : boolean,
  data_nascimento : string,
  created_at : string,
  atleta : Atleta[],
}



export default function AtletaForm() {
  const store = useStore();
  const sesion = useSession();
  const router = useRouter();

  const token = sesion?.token

  const [selectListUsuario, setSelectListUsuario] = useState<any>([{}])
  const [listUsuario, setListUsuario] = useState<Usuario[] | null>(null)
  const [list, setList] = useState<ResultList | null>(null)
  const [carregandoLista, setCarregandoLista] = useState(true)

  const methods = useForm<FaAtletaInput>({
    resolver: zodResolver(FaAtletaSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

/*   useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    if (token){  
      atualizaLista()
      listaUsuariosNaoAtletas() 

     } 
     
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful, token]);

 */
/* 
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
 */

  async function addFaAtletaFunction(faAtleta: FaAtletaInput) {
    console.log(faAtleta)

    store.setRequestLoading(true);    
    try {
     const token =sesion?.token
     const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };  
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await api('/faatletaregister', {method: 'POST',headers, body: JSON.stringify({
      nome: faAtleta.nome,
      data_nascimento:  faAtleta.data_nascimento+'T00:00:00.000Z',
      email: faAtleta.email,
      apelido: faAtleta.apelido,
      data_inicio: faAtleta.data_inicio+'T00:00:00.000Z',
      tipo: faAtleta.tipo,
      posicao: faAtleta.posicao,
      numero_camisa: faAtleta.numero_camisa,
      altura: faAtleta.altura,
      pesso: faAtleta.pesso,
      rg: faAtleta.rg,
      cpf: faAtleta.cpf,
      cep: faAtleta.cep,
      endereco: faAtleta.endereco,
      numero_endereco: faAtleta.numero_endereco,
      complemento: faAtleta.complemento,
      bairro: faAtleta.bairro,
      cidade: faAtleta.cidade,
      estado: faAtleta.estado,
      telefone: faAtleta.telefone
    })} )

    if (response.status === 201){

      toast.success("Atleta adicionado");

    }
    if (response.status === 403){

      toast.success(await response.json());
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


  const onSubmitHandler: SubmitHandler<FaAtletaInput> = (values) => {
    addFaAtletaFunction(values);
  };

/*   async function atualizaLista() {
    setCarregandoLista(true)  
    try {
      const headers: Record<string, string> = {
       "Content-Type": "application/json",
     };  
     if (token) {
       headers["Authorization"] = `Bearer ${token}`;
     }      
     const response = await api('/fatransacaolistar', {method: 'GET',headers})

     setList(await response.json()) 

 
     } catch (error: any) {
       console.log(error);     
     } finally {
      setCarregandoLista(false)         
    }  
  }
 */
  
/*   async function deleteRow(id:string) {
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
 } */

/*  async function listaUsuariosNaoAtletas() {
  setCarregandoLista(true)  
  try {
    const headers: Record<string, string> = {
     "Content-Type": "application/json",
   };  
   if (token) {
     headers["Authorization"] = `Bearer ${token}`;
   }      
   const response = await api('/listarusuarios', {method: 'GET',headers})

   setListUsuario(await response.json()) 
   console.log(listUsuario) 
   } catch (error: any) {
     console.log(error);     
   } finally {
    setCarregandoLista(false)         
  }  
} 

async function onChange(e:any) {
  setSelectListUsuario(() => ({ ...selectListUsuario, [e.target.name]: e.target.value }));
  console.log(selectListUsuario)
  
}
 */
  return (
    <div>      
    
    
    <FormProvider {...methods}>
       <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="max-w-full w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-md p-8 space-y-5"
      >

        <FormInput label="Nome Completo" name="nome"  />        
        <FormInput label="Email" name="email" type="email"  />
        <FormInput label="Data Nascimento" name="data_nascimento" type="date"  />
        <FormInput label="Apelido" name="apelido" type="apelido"  />
        <FormInput label="Data Inicio" name="data_inicio" type="date"  />
        <FormInput label="Tipo" name="tipo" type="tipo"  />
        <FormInput label="Posicao" name="posicao" type="posicao"  />
        <FormInput label="Numero camisa" name="numero_camisa" type="number"  />
        <FormInput label="Altura" name="altura" type="number"  />
        <FormInput label="Pesso" name="pesso" type="number"  />
        <FormInput label="Rg" name="rg" type="rg"  />
        <FormInput label="Cpf" name="cpf" type="number"  />
        <FormInput label="Cep" name="cep" type="number"  />
        <FormInput label="Endereço" name="endereco" type="endereco"  />
        <FormInput label="Numero Endereço" name="numero_endereco" type="number"  />
        <FormInput label="Complemento" name="complemento" type="complemento"  />
        <FormInput label="Bairro" name="bairro" type="bairro"  />
        <FormInput label="Cidade" name="cidade" type="cidade"  />
        <FormInput label="Estado" name="estado" type="estado"  />
        <FormInput label="Telefone" name="telefone" type="number"  />
 




{/*
      <div className="grid grid-cols-1 gap-4">
        <FormInput label="Título" name="titulo" type="text" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <FormInput label="Valor" name="valor" type="number"  />



        <FormInputComboBox label="Tipo" name="tipo" type="select" />


        <FormInput label="Vencimento" name="vencimento" type="date" value={format(new Date(), "yyyy-MM-dd")} />
      </div>
*/}
        <div className="flex flex-col gap-4 ">
          <div className="w-60 max-sm:w-auto" >
            <LoadingButton 
            loading={false}
            textColor="text-ct-blue-600"
            >
              Salvar
            </LoadingButton>
          </div>     

         


        </div>
        
      </form>
    </FormProvider> 

    {/* <div className="max-w-full w-full mx-auto overflow-hidden  bg-transparent rounded-md p-8 space-y-5"></div>

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
      
        {list?.transacoes.map((iten: Transacao) =>
        
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

      
        <div className="grid ">
          <p>Total Pagamentos:</p>
          <p>{list?.totalPagamentos.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
        </div>  

        <div className="grid ">
          <p>Total Recebimentos:</p>
          <p>{list?.totalRecebimentos.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
        </div>
      </>}

   

    </div> */}
     
  </div>

  );
}


