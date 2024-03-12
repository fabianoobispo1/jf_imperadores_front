import Header from "@/components/Header";
import { apiGetAuthUser } from "@/lib/api-requests";
import { cookies } from "next/headers";
import { AuthPageInvisible } from "@/lib/protect-page";
import ListUsuarios from "./listUsuarios";

export default async function ProfilePage() {
  const cookieStore = cookies();
  const token = cookieStore.get("tokenjfimperadores");
  const user = await apiGetAuthUser(token?.value); 

  return (
    <>
      <Header  />
      
      <section className="bg-ct-blue-600  min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center">
          <div>
            <p className="mb-3 text-5xl text-center font-semibold">
              Bem vindo, {user.name}
            </p>
            <div className="mt-8 m-2">
             {/*  <p className="mb-3">Id: {user.id}</p> */}
              <p className="mb-3">Usuarios registrados:</p>
                <ListUsuarios />
            </div>
          </div>
        </div>
      </section>
      <AuthPageInvisible />
    </>
  );
}
