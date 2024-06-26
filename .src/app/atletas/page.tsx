import HeaderV2 from "@/components/HeaderV2";
import { LoadingButton } from "@/components/LoadingButton";
import Link from "next/link";
import AtletaList from "./atleta-list";

export default async function atletaPage() {
  return (
    <>
    <HeaderV2 />
      <section className="bg-ct-blue-600  min-h-screen pt-20  w-full absolute top-0 right-0 lg:w-5/6 p-1">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md max-sm:h-[40rem] h-[20rem] p-2 flex flex-col gap-2"> 
          <p className="mb-3 text-5xl pt-4 text-center font-semibold">
            Atletas
          </p>
          <div className="flex mx-auto gap-2  w-full justify-between">
          <Link href={'/dashboard'} className="w-60 "  >
            <LoadingButton textColor="text-ct-blue-600">
              Voltar 
            </LoadingButton>
          </Link>
          <Link href={'/atletas/adicionar'} className="w-60 "  >
            <LoadingButton textColor="text-ct-blue-600">
              Adicionar 
            </LoadingButton>
          </Link>
          </div>
         

          <AtletaList />
        </div>
      </section>  
    </>
  );
}
