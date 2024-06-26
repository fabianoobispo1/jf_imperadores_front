"use client";
import { LoadingButton } from "@/components/LoadingButton";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import useSession from "@/lib/useSession";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR"


interface FormData {
  nome: string,
  email: string,
  data_nascimento: string, 
  password: string,
  passwordConfirm: string,
}

interface ResultUser {
  id: string
  nome: string,
  email: string,
  data_nascimento: string,
}


export default function UsuarioUpdateForm() {
  const sesion = useSession();

  const token = sesion?.token
  const [carregandoInfo, setCarregandoInfo] = useState(true)
  const [usuario, setUsuario] = useState<ResultUser | null>(null)


  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    data_nascimento:'',
    password: '',
    passwordConfirm: ''
  });

  useEffect(() => {
     if (token){   
      atualizaLista()
      console.log(formData)
     }      
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);


  async function atualizaLista() {
    setCarregandoInfo(true)  
      try {
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };  
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }      
        const response = await api('/faperfil', {method: 'GET',headers})
        const data = await response.json()
        console.log('data do banco')
        console.log(data.faUsuario.data_nascimento)

        setUsuario(data.faUsuario) 

        console.log('data usuario')
        console.log(usuario?.data_nascimento)
        

        setFormData(data.faUsuario)

        setFormData((prevData) => ({
          ...prevData,
          data_nascimento: formatDate(new Date(data.faUsuario.data_nascimento), "yyyy-MM-dd", {locale: ptBR}),
        }));
     

        setFormData((prevData) => ({
          ...prevData,
          ['password']: '',
          ['passwordConfirm']: '',
        }));

        console.log('data form')
        console.log(formData.data_nascimento)

         } catch (error: any) {
          console.log(error);     
        } finally {
          setCarregandoInfo(false)         
      }  
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.nome === usuario?.nome &&
      formData.email === usuario?.email &&
      formData.data_nascimento === usuario?.data_nascimento  /* &&
      (formData.password == '' || formData.passwordConfirm == '' ) */){
      toast.error('Sem Alteração');   
      return     
    }

    console.log(formData.data_nascimento)
    console.log(usuario?.data_nascimento)
    try {
      const token =sesion?.token
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };  
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

     const response = await api('/updateusuario', {method: 'PATCH',headers, body: JSON.stringify({
      nome: formData.nome,
      data_nascimento: formData.data_nascimento+"T00:00:00.000Z",
      email: formData.email
     })} )
 
     if (response.status === 201){
       toast.success("Regsitro Atualizado"); 
       atualizaLista()
     }else{
      const data = await response.json()
      toast.error(data.message);  
     }

    } catch (error) {
      console.error('Erro:', error);
    }
  };


  return (   
    <>
    {carregandoInfo == true? 
      <p>carregando</p>
      : 
     
      <form
        onSubmit={handleSubmit}
        className="max-w-full w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-md max-sm:p-2 p-8  space-y-5"
      >

        <div className="">
          <label className="block text-ct-blue-600 mb-3">
            Nome Completo
          </label>
          <input
            type="text"
            name="nome"
            placeholder=" "
            className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4"
            step="0.01"
            value={formData.nome}
            onChange={handleChange}
       
          /> 
        </div>

        <div className="">
          <label className="block text-ct-blue-600 mb-3">
            Email
          </label>
          <input
            type="text"
            name="email"
            placeholder=" "
            className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4"
            step="0.01"
            value={formData.email}
            onChange={handleChange}
       
          /> 
        </div>

        <div className="">
          <label className="block text-ct-blue-600 mb-3">
            Data Nascimento
          </label>
          <input
            type="date"
            name="data_nascimento"
            placeholder=" "
            className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4"
            step="0.01"
            /* value={formatDate(new Date(formData.data_nascimento), "yyyy-MM-dd")}      */     
            value={formData.data_nascimento}  
            onChange={handleChange}
       
          /> 
        </div>
        <div className="flex flex-col gap-4">
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
    }
    </>
  );
}


