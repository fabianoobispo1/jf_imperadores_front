import toast from "react-hot-toast";
import { FormEvent, useState } from 'react'
import {
  Link,
  Button,
    Input
} from '@vercel/examples-ui'
import router from "next/router";
import { getApi_Endpoint_Prod } from "@lib/constants";
 
 
export default function FormLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function testApi(){
    console.log(getApi_Endpoint_Prod())

    
    const result =  await fetch('http://vps51962.publiccloud.com.br:3331/'+'fasesao', { method: 'POST', headers:{"Content-Type": "application/json"} ,body: JSON.stringify({
      email: 'qqqq',
      password:'qwqw'
    })})

    console.log(result)
    console.log(result.status)
  
  }


  async function handleLogin(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData(event.currentTarget)
 
    const email = formData.get('email')
    const password = formData.get('password')
    if(!email ) {
      toast.error('Campo Email Vazio');
      setIsLoading(false) 
    return 
    }
    if(!password ) {
      toast.error('Campo senha Vazio');
      setIsLoading(false)
    return 
    } 

    try {
      const result =  await fetch('/api/auth', { method: 'POST' ,body: JSON.stringify({
        email,
        password
      })})
      
    router.push('/protected')
      
    } catch (error) {
   
      console.error(error)
    }finally {
      setIsLoading(false)
    }

    


  }
  return(
    <>
    <form className="w-96 bg-white shadow-md rounded  px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
      <div className="mb-4 ">
        <label className="block text-gray-700 text-sm font-bold mb-2" >
          Email
        </label>
        < Input  name='email' type="text" placeholder="Username" />
      </div>
      <div className="mb-6 ">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        < Input  name='password' type="password" placeholder="****" />
      </div>

      <div className="flex items-center  justify-between">
        <Button loading={isLoading} >
          Entrar
        </Button>
   
        <div className="flex items-center flex-col">
          <Link href={'/registrar'} className="flex items-center flex-col font-bold hover:text-cyan-500">
          Cadastrar
          </Link>
        </div>
       
      </div>

      
    </form>
    
    <Button onClick={testApi}  >
    test
  </Button>
    </>

  )
}