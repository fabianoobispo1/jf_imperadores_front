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
import { getCookie } from "cookies-next";

export default function TransacaoList() {
  const sesion = useSession();

  const token = sesion?.token
 
  const [list, setList] = useState([''])


 useEffect(() => {
  if (!token){
    return 
  }
   console.log(token)

  atualizaLista()




    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function atualizaLista() {
    try {
      const headers: Record<string, string> = {
       "Content-Type": "application/json",
     };  
     if (token) {
       headers["Authorization"] = `Bearer ${token}`;
     }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_MINHA_BASE}/fatransacaolistar`, {
       method: "GET",      
       headers,
     });

   
  
     const teste = await response.json()
     setList(teste)

      
     } catch (error: any) {
       console.log(error);
     
     } 
  }



  return (
    <div    
      className="max-w-full w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
    >
      {list.map((iten: any) =>
      <div key={iten.id} className="grid grid-cols-1 gap-4">
          {iten.titulo}      {iten.valor}  
      </div>
      
      )}




      
        
      <div className="grid grid-cols-3 gap-4">


      </div>


  
    </div>

  );
}
