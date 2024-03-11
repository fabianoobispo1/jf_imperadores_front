import Header from "@/components/Header";
import TransacaoForm from "./transacao-form";
import TransacaoList from "./transacao-list";
import { cookies } from "next/headers";
import { apiGetAuthUser } from "@/lib/api-requests";

export default async function transacaoPage() {

  return (
    <>
      <Header />
      <section className="bg-ct-blue-600  min-h-screen pt-20">
        <div className="max-w-4xl mx-auto   flex justify-center items-center">
          <TransacaoForm />
        </div>
        <div className="max-w-4xl mx-auto   flex justify-center items-center pt-4">
          <TransacaoList />
        </div>
      </section>  
    </>
  );
}
