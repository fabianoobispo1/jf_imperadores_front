"use client";
import { LoadingButton } from "@/components/LoadingButton";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import useSession from "@/lib/useSession";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { formatDate } from "date-fns";


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
        setUsuario(data.faUsuario)   
        setFormData(data.faUsuario)
        setFormData((prevData) => ({
          ...prevData,
          ['password']: '',
          ['passwordConfirm']: '',
        }));

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
    try {
      console.log(formData)


      if (formData.nome === usuario?.nome &&
        formData.email === usuario?.email &&
        formData.data_nascimento === usuario?.data_nascimento  &&
        (formData.password == '' || formData.passwordConfirm == '' )
        ) 
        {

        toast.error('Sem Alteração');        
        }


      /* const response = await fetch('sua/api/aqui', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar dados via API');
      }
      console.log('Dados atualizados com sucesso'); */
    } catch (error) {
      console.error('Erro:', error);
    }
  };


  return (   
    <>
    {carregandoInfo == true? 
      <p>carregando</p>
      : 
<>
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
          {/*{errors[name] && (
            <span className="text-red-500 text-xs pt-1 block">
              {errors[name]?.message as string}
            </span>
          )} */}
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
          {/*{errors[name] && (
            <span className="text-red-500 text-xs pt-1 block">
              {errors[name]?.message as string}
            </span>
          )} */}
        </div>

          {/*     <FormInput label="Data Nascimento" name="data_nascimento" type="date"  
          value={formatDate(usuario?.faUsuario.data_nascimento ? new Date(usuario?.faUsuario.data_nascimento): '', "yyyy-MM-dd")} /> 
        
          */}

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
            value={formatDate(new Date(formData.data_nascimento), "yyyy-MM-dd")}
            onChange={handleChange}
       
          /> 
          {/*{errors[name] && (
            <span className="text-red-500 text-xs pt-1 block">
              {errors[name]?.message as string}
            </span>
          )} */}
        </div>


        <div className="">
          <label className="block text-ct-blue-600 mb-3">
            Senha
          </label>
          <input
            type="text"
            name="password"
            placeholder=" "
            className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4"
            step="0.01"
            value={formData.password}
            onChange={handleChange}
       
          /> 
          {/*{errors[name] && (
            <span className="text-red-500 text-xs pt-1 block">
              {errors[name]?.message as string}
            </span>
          )} */}
        </div>

        <div className="">
          <label className="block text-ct-blue-600 mb-3">
          Comfirmar Senha
          </label>
          <input
            type="text"
            name="passwordConfirm"
            placeholder=" "
            className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4"
            step="0.01"
            value={formData.passwordConfirm}
            onChange={handleChange}
       
          /> 
          {/*{errors[name] && (
            <span className="text-red-500 text-xs pt-1 block">
              {errors[name]?.message as string}
            </span>
          )} */}
        </div>



        {/* <FormInput 
          label="Senha" 
          name="password" 
          type="password" 
        />
        <FormInput
          label="Comfirmar Senha"
          name="passwordConfirm"
          type="password"
        /> */}

        


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


    {/* <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="max-w-full w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-md max-sm:p-2 p-8  space-y-5"
      > */}
        {/* <FormInput label="Nome Completo" name="nome" value={usuario?.faUsuario.nome}  /> */}
       {/*  <FormInput label="Data Nascimento" name="data_nascimento" type="date"  
        value={formatDate(usuario?.faUsuario.data_nascimento ? new Date(usuario?.faUsuario.data_nascimento): '', "yyyy-MM-dd")} /> 
        <FormInput label="Email" name="email" type="email"  value={usuario?.faUsuario.email} /> */}
        {/* <FormInput label="Senha" name="password" type="password" />
        <FormInput
          label="Comfirmar Senha"
          name="passwordConfirm"
          type="password"
        />
 
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
    </FormProvider> */} </> }
    </>
  );
}


