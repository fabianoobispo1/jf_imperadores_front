import { useEffect } from "react";
import { apiGetAuthUser } from "./api-requests";
import useStore from "@/store";

export default function useSession() {
  const store = useStore();

  async function fetchUser() {
    console.log('entra no useSesion')
    try {
      console.log('try usesesion')
      const user = await apiGetAuthUser();
      console.log(user)
      store.setAuthUser(user);
    } catch (error: any) {
      console.log('catch usesesion')
      store.reset();
    }
  }

  useEffect(() => {
    if (!store.authUser) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return store.authUser;
}
