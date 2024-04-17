"use client";
import { useEffect, useState } from "react";
import useSession from "@/lib/useSession";

import { api } from "@/lib/api";

export default function ListUsuarios() {
  const sesion = useSession();

  const token = sesion?.token

  const [list, setList] = useState([''])

  useEffect(() => {
 
    if (token){  
      atualizaLista() 
    }  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ token]);

  async function atualizaLista() {
    try {
      const headers: Record<string, string> = {
       "Content-Type": "application/json",
     };  
     if (token) {
       headers["Authorization"] = `Bearer ${token}`;
     }      
     const response = await api('/listarusuarios', {method: 'GET',headers} )

     setList(await response.json())      
     } catch (error: any) {
       console.log(error);     
     } 
  }

  return (


    <div className="max-w-full w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5 ">
      <div className="grid grid-cols-2 gap-4">
        <p>Nome</p>
      
        <p>Admin</p>
      </div>
      

      {list.map((iten: any) =>

          <div key={iten.id} className="grid grid-cols-2 gap-4 border-b-2 border-fa-dourado">
            <p>{iten.nome}</p>
            
            {iten.administrador? <p>Sim</p> :<p>Nao</p>  } 
          </div>
  
      )}
    </div>

  );
}