import Header from "@/components/Header";
import LoginForm from "./login-form";

export default async function LoginPage() {
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 1000000);
  // });
  return (
    <>
      <Header />
      <section className="bg-ct-blue-600 min-h-screen grid place-items-center">
        <div className="w-full">
          <h1 className="text-4xl lg:text-6xl text-center font-[600] text-ct-yellow-600 mb-4">
            Entre
          </h1>
          <h2 className="text-lg text-center mb-4 text-ct-dark-200">
            Faça login para ter acesso
          </h2>
          <LoginForm />
        </div>
      </section>
    </>
  );
}
