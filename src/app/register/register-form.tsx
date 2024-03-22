"use client";

import {
  FaUsuarioInput,
  FaUsuarioSchema
} from "@/lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { apiRegisterUser } from "@/lib/api-requests";
import FormInput from "@/components/FormInput";
import Link from "next/link";
import { LoadingButton } from "@/components/LoadingButton";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const store = useStore();
  const router = useRouter();

  const methods = useForm<FaUsuarioInput>({
    resolver: zodResolver(FaUsuarioSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  async function RegisterUserFunction(credentials: FaUsuarioInput) {
    store.setRequestLoading(true);
    try {
      console.log(credentials)
      const user = await apiRegisterUser(JSON.stringify(credentials));
      store.setAuthUser(user);
      return router.push("/login");
    } catch (error: any) {
      if (error instanceof Error) {
        handleApiError(error);
      } else {
        toast.error(error.message);
        console.log("Error message:", error.message);
      }
    } finally {
      store.setRequestLoading(false);
    }
  }

  const onSubmitHandler: SubmitHandler<FaUsuarioInput> = (values) => {
    RegisterUserFunction(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
      >
        <FormInput label="Nome Completo" name="nome"  />
        <FormInput label="Data Nascimento" name="data_nascimento" type="date"  />
        <FormInput label="Email" name="email" type="email"  />
        <FormInput label="Senha" name="password" type="password" />
        <FormInput
          label="Comfirmar Senha"
          name="passwordConfirm"
          type="password"
        />
        <span className="block">
          Ja tem uma conta?{" "}
          <Link href="/login" className="text-ct-blue-600">
            Entrar aqui
          </Link>
        </span>
        <LoadingButton
          loading={store.requestLoading}
          textColor="text-ct-blue-600"
        >
          Registrar
        </LoadingButton>
      </form>
    </FormProvider>
  );
}
