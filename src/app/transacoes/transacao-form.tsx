"use client";

import { LoginUserInput, LoginUserSchema } from "@/lib/validations/user.schema";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { apiLoginUser } from "@/lib/api-requests";
import FormInput from "@/components/FormInput";
import Link from "next/link";
import { LoadingButton } from "@/components/LoadingButton";
import useStore from "@/store";
import { handleApiError } from "@/lib/helpers";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import store from "@/store";

export default function TransacaoForm() {
/*   const store = useStore();
  const router = useRouter(); */

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(LoginUserSchema),
  });

  /* const {
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

  useEffect(() => {
    store.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 */
/*   async function LoginUserFunction(credentials: LoginUserInput) {
    store.setRequestLoading(true);
    try {
      await apiLoginUser(JSON.stringify(credentials));

      toast.success("Conectado com sucesso");
      return router.push("/profile");
    } catch (error: any) {
      console.log(error);
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

  const onSubmitHandler: SubmitHandler<LoginUserInput> = (values) => {
    LoginUserFunction(values);
  }; */

  return (
    <FormProvider {...methods}>
      <form
        /* onSubmit={handleSubmit(onSubmitHandler)} */
        className="max-w-full w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5"
      >
        <FormInput label="campo 01" name="email" type="text" />
        <FormInput label="campo 02" name="password" type="text" />


        <LoadingButton
          loading={true}
          textColor="text-ct-blue-600"
        >
          Salvar
        </LoadingButton>
  
      </form>
    </FormProvider>
  );
}
