import { LoadingButton } from "@/components/LoadingButton";
import Link from "next/link";
import AtletaForm from "./atleta-form";

export default async function atletaAdcionarPage() {
  return (
    <>
      <section className="bg-ct-blue-600  min-h-screen pt-20  w-full absolute top-0 right-0 lg:w-5/6">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md max-sm:h-5/6  h-[20rem] p-2 flex flex-col">
          <p>Para regsitrar um atleta, esse deve ter o cadastro de usuario do site, 
            caso não exsita e possivel cadastrar por essa tela.</p>
{/*           
          <AtletaForm />
           */}

          <Link href={'/atletas'} className="w-60"  >
            <LoadingButton textColor="text-ct-blue-600">
              Voltar 
            </LoadingButton>
          </Link>
        </div>
      </section>  
    </>
  );
}
