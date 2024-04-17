import { LoadingButton } from "@/components/LoadingButton";
import Link from "next/link";
import AtletaForm from "./atleta-form";
import HeaderV2 from "@/components/HeaderV2";

export default async function atletaAdcionarPage() {
  return (
    <>
      <HeaderV2 />
      <section className="bg-ct-blue-600  min-h-screen pt-20  w-full absolute top-0 right-0 lg:w-5/6 p-1">
        <div className="max-w-4xl  mx-auto bg-ct-dark-100 rounded-md max-sm:h-5/6  h-5/6  p-2 flex flex-col">
          <p className="mb-3 text-5xl pt-4 text-center font-semibold">
            Atletas
          </p>
          
          <Link href={'/atletas'} className="w-60 max-sm:w-auto mb-3"  >
              <LoadingButton textColor="text-ct-blue-600">
                Voltar 
              </LoadingButton>
            </Link>

          <p className="mb-3" >Para regsitrar um atleta, esse deve ter o cadastro de usuario do site, 
            caso não exsita e possivel cadastrar por essa tela.</p>   
        
            <AtletaForm />
          

      
        </div>
      </section>  
    </>
  );
}
