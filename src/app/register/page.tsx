import Header from "@/components/Header";
import RegisterForm from "./register-form";

export default async function RegisterPage() {
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 1000);
  // });
  return (
    <>
      <Header />
      <section className="p-8 bg-ct-blue-600 min-h-screen grid place-items-start">
        <div className="w-full ">
          <h1 className="text-4xl xl:text-6xl text-center font-[600] text-ct-yellow-600 mb-4">
            Bem vindo!
          </h1>
          <h2 className="text-lg text-center mb-4 text-ct-dark-200">
            faça seu cadastro!
          </h2>
          <RegisterForm />
        </div>
      </section>
    </>
  );
}
