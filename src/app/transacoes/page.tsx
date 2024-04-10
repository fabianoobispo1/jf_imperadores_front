import TransacaoFormList from "./transacao-form-list";
import { apiGetAuthUser } from "@/lib/api-requests";
import { cookies } from "next/headers";
import HeaderV2 from "@/components/HeaderV2";

export default async function transacaoPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("tokenjfimperadores");
  const user = await apiGetAuthUser(token?.value); 

  return (
    <>
      <HeaderV2 />
      <section className="bg-ct-blue-600  min-h-screen pt-20  w-full absolute top-0 right-0 lg:w-5/6">
        <div className="max-w-4xl mx-auto ">
          <TransacaoFormList />
        </div>
      </section>  
    </>
  );
}
