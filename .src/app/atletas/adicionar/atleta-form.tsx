"use client";
import { FaAtletaInput, FaAtletaSchema } from "@/lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/FormInput";
import { LoadingButton } from "@/components/LoadingButton";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import useSession from "@/lib/useSession";
import { api } from "@/lib/api";
import FormInputComboBox1 from "@/components/FormInputCombobox1";
import { useEffect } from "react";




export default function AtletaForm() {
  const store = useStore();
  const sesion = useSession();

  const methods = useForm<FaAtletaInput>({
    resolver: zodResolver(FaAtletaSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

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
      numero_camisa: parseFloat(faAtleta.numero_camisa),
      altura: parseFloat(faAtleta.altura),
      pesso: parseFloat(faAtleta.pesso),
      rg: faAtleta.rg,
      cpf: faAtleta.cpf,
      cep: faAtleta.cep,
      endereco: faAtleta.endereco,
      numero_endereco: parseFloat(faAtleta.numero_endereco),
      complemento: faAtleta.complemento,
      bairro: faAtleta.bairro,
      cidade: faAtleta.cidade,
      estado: faAtleta.estado,
      telefone: parseFloat(faAtleta.telefone)
    })} )

    if (response.status === 201){

      toast.success("Atleta adicionado");
      reset();

    }else{
      const responseError = await response.json()
      toast.error(responseError.message);
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

  return (   
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="max-w-full w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-md max-sm:p-2 p-8  space-y-5"
      >
        <FormInput label="Nome Completo" name="nome"  />        
        <FormInput label="Email" name="email" type="email" />
        <FormInput label="Data Nascimento" name="data_nascimento" type="date" />
        <FormInput label="Apelido" name="apelido" type="apelido" />
        <FormInput label="Data Inicio" name="data_inicio" type="date" />
        <FormInputComboBox1 label="Tipo" name="tipo" type="select" />
        <FormInput label="Posicao" name="posicao" type="posicao" />
        <FormInput label="Numero camisa" name="numero_camisa" type="number" />
        <FormInput label="Altura" name="altura" type="number" />
        <FormInput label="Pesso" name="pesso" type="number" />
        <FormInput label="Rg" name="rg" type="rg" />
        <FormInput label="Cpf" name="cpf" type="cpf" />
        <FormInput label="Cep" name="cep" type="cep" />
        <FormInput label="Endereço" name="endereco" type="endereco" />
        <FormInput label="Numero Endereço" name="numero_endereco" type="number" />
        <FormInput label="Complemento" name="complemento" type="complemento" />
        <FormInput label="Bairro" name="bairro" type="bairro" />
        <FormInput label="Cidade" name="cidade" type="cidade" />
        <FormInput label="Estado" name="estado" type="estado" />
        <FormInput label="Telefone" name="telefone" type="number" />
 
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
  );
}


