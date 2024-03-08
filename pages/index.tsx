import {
  Layout
} from '@vercel/examples-ui'
import { useRouter } from 'next/navigation'
import  FormLogin  from './components/formLogin'
import {  useEffect, useState } from 'react'
 


export default function Index() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)


 

/*   
  useEffect(() => {
    setIsLoading(false)
    router.push('/protected')
    setIsLoading(true)
     
  },[])
    */
  
if (isLoading) {
  return (
    <div className="p-3.5 lg:p-6 flex justify-center gap-0  lg:gap-80">   
      <FormLogin />        
      <div className=""></div>        
   </div>      
  )
  }else{
    return(<h1></h1>)
  }

}

Index.Layout = Layout
