import Header from "@/components/Header";
import TransacaoFormList from "./transacao-form-list";


export default async function transacaoPage() {

  return (
    <>
{/*       <Header /> */}
      <section className="bg-ct-blue-600  min-h-screen pt-20  w-full absolute top-0 right-0 lg:w-5/6">
        <div className="max-w-4xl mx-auto ">
          <TransacaoFormList />
        </div>
      </section>  
    </>
  );
}
