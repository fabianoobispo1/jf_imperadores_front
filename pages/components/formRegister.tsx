import toast from "react-hot-toast";
import { FormEvent, useState } from 'react'
import {

  Link,
  Button,
  
  Input
} from '@vercel/examples-ui'
import router from "next/router";
 
export default function FormRegister() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [nomeBorda, setNomeBorda] = useState('border-gray-200')
  const [emailBorda, setEmailBorda] = useState('border-gray-200')
  const [nascimentoBorda, setNascimentoBorda] = useState('border-gray-200')
  const [passwordBorda, setPasswordBorda] = useState('border-gray-200')



  async function handleRegsiter(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    setIsLoading(true)
    const form = new FormData(event.currentTarget)
 
    setNomeBorda('border-gray-200')
    setEmailBorda('border-gray-200')
    setNascimentoBorda('border-gray-200')
    setPasswordBorda('border-gray-200')

    const nome = form.get('name')
    const email = form.get('email')
    const nasciemnto = form.get('nascimento')+'T00:00:00.000Z'
    const password = form.get('password')
    if(!nome ) {
      setNomeBorda('border-red-300') 
      setIsLoading(false)
    return 
    }
    if(!email ) {
      setEmailBorda('border-red-300') 
      setIsLoading(false)
    return 
    }
    if(!nasciemnto ) {
      setNascimentoBorda('border-red-300') 
      setIsLoading(false)
    return 
    }
    if(!password ) {
      setPasswordBorda('border-red-300') 
      setIsLoading(false)
    return 
    }
  
    //delay 3 segundos 
   // await new Promise(resolve => setTimeout(resolve, 3000))

   console.log(nome)
   console.log(email)
   console.log(nasciemnto)
   console.log(password)
    setIsLoading(false)
      
/*     await api('/fausuario', {method: 'POST',headers:{"Content-Type": "application/json"}, body: JSON.stringify({
      nome,
      data_nascimento:nasciemnto,
      email,
      password
    })} ) */
/*
    revalidateTag('listartodo') */
  }

  return(


    <form className="w-3/4 bg-white shadow-md rounded  px-8 pt-6 pb-8 mb-4"onSubmit={handleRegsiter}>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
          Nome
        </label>
        <Input 
          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${nomeBorda} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          name='name'
          type="text"
           /* placeholder="Seu nome" */ 
          />
        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>
      <div className="w-full md:w-1/2 px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
          Email
        </label>
        <Input 
          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${emailBorda} rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
          name="email" 
          type="text" 
          placeholder="" 
        />
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">      
      <div className="w-full md:w-1/2  px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
          Data nascimento
        </label>
        <Input 
          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${nascimentoBorda} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
          name="nascimento" 
          type="date" 
        />
       
      </div>

      <div className="w-full md:w-1/2  px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
          Senha
        </label>
        <Input 
          className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${passwordBorda} rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
          name="password" 
          type="password" 
          placeholder="******************" />
        <p className="text-gray-600 text-xs italic">Minimo de 6 caracteres entre letras e numeros</p>
      </div>
    </div>
 

    <div className="flex items-center justify-between">
        <div className="flex items-center flex-col font-bold hover:text-cyan-500">
          <Link href={'/'}>
          Voltar
          </Link>
        </div>

        <Button loading={isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"   type="submit">
          Cadastrar
        </Button>      
    </div>
  </form>
  )
}