import { LoadingButton } from "@/components/LoadingButton";
import Link from "next/link";
import AtletaForm from "./atleta-form";
import HeaderV2 from "@/components/HeaderV2";

export default async function atletaAdcionarPage() {
  return (
    <>
      <HeaderV2 />
      <section className="bg-ct-blue-600  min-h-screen pt-20  w-full absolute top-0 right-0 lg:w-5/6">
        <div className="max-w-4xl  mx-auto bg-ct-dark-100 rounded-md max-sm:h-5/6  h-5/6  p-2 flex flex-col">
          <p>Para regsitrar um atleta, esse deve ter o cadastro de usuario do site, 
            caso não exsita e possivel cadastrar por essa tela.</p>
          
            <Link href={'/atletas'} className="w-60 max-sm:w-auto"  >
              <LoadingButton textColor="text-ct-blue-600">
                Voltar 
              </LoadingButton>
            </Link>
            
            <AtletaForm />
          

      
        </div>
      </section>  
    </>
  );
}
