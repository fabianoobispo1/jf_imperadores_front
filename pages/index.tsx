import {
  Layout
} from '@vercel/examples-ui'
import { useRouter } from 'next/navigation'
import  FormLogin  from './components/formLogin'
 


export default function Index() {
  const router = useRouter()

  async function handle(){
    const result =   await fetch('/api/auth', { method: 'POST' })
    router.push('/protected')
  }


  return (
    <div className="p-3.5 lg:p-6 flex justify-center gap-0  lg:gap-80">   
      <FormLogin />        
      <div className=""></div>        
   </div>      
  )
}

Index.Layout = Layout
