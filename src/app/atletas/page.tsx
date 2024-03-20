import { LoadingButton } from "@/components/LoadingButton";
import Link from "next/link";

export default async function atletaPage() {
  return (
    <>
      <section className="bg-ct-blue-600  min-h-screen pt-20  w-full absolute top-0 right-0 lg:w-5/6">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md max-sm:h-[40rem] h-[20rem] p-2 flex  ">         
          <Link href={'/atletas/adicionar'} className="w-60"  >
            <LoadingButton textColor="text-ct-blue-600">
              Adicionar 
            </LoadingButton>
          </Link>
        </div>
      </section>  
    </>
  );
}
