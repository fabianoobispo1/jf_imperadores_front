import Header from "@/components/Header";
import TransacaoForm from "./transacao-form";

export default async function transacaoPage() {
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 1000000);
  // });
  return (
    <>
      <Header />
      <section className="bg-ct-blue-600  min-h-screen pt-20">
        <div className="max-w-4xl mx-auto   flex justify-center items-center">
          <TransacaoForm />
        </div>
      </section>  
    </>
  );
}
