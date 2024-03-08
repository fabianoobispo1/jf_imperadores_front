import toast from "react-hot-toast";
import { FormEvent, useState } from 'react'
import {
  Link,
  Button,
    Input
} from '@vercel/examples-ui'
 
export default function Apitest() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [result, setResult] = useState<string>('')




  async function handleLogin(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    setIsLoading(true)
    setResult('')
    const formData = new FormData(event.currentTarget)
 
    const tipo = formData.get('tipo')
    const link = formData.get('link')
    const body = formData.get('body')


    
    if(!tipo ) {
      toast.error('Campo tipo Vazio');
      setIsLoading(false) 
    return 
    }
    if(!link ) {
      toast.error('Campo senha Vazio');
      setIsLoading(false)
    return 
    } 
    if(!body ) {
      toast.error('Campo senha Vazio');
      setIsLoading(false)
    return 
    } 


    try {
  
      if (tipo === 'POST') {
        const result  =  await fetch('http://'+link, { method: 'POST' ,body: JSON.stringify({
          body
        })})
      }

      (tipo === 'GET') {
        const result  =  await fetch('https://'+link, { method: 'GET' ,body: JSON.stringify({
          body
        })})
      }

     
      console.log(result)
   /*  router.push('/protected') */
   setIsLoading(false)
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
          tipo
        </label>
        < Input  name='tipo' type="text" placeholder="POST" />
      </div>
      <div className="mb-6 ">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          link
        </label>
        < Input  name='link' type="text" placeholder="http://" />
      </div>
      <div className="mb-6 ">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          body
        </label>
        < Input  name='body' type="text" placeholder='{"xxx":xxx}' />
      </div>

      <div className="flex items-center  justify-between">
        <Button loading={isLoading} >
          testar
        </Button>
   
        <div className="flex items-center flex-col">
          <Link href={'/registrar'} className="flex items-center flex-col font-bold hover:text-cyan-500">
          Cadastrar
          </Link>
        </div>
       
      </div>
    </form>
    
    <textarea>{result}</textarea>

    </>

  )
}