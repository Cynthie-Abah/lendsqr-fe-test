"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { User } from "../types/types";
import { login as loginApi } from "../lib/actions/auth-action";

export default function useLogin() {
  const router = useRouter();

  const {mutate: login, isPending} = useMutation({
    mutationFn: async (data: User) => {
      const res = await loginApi(data);
      console.log(res, 'from console');
      
      return res;
    },
    onSuccess: () => {
        toast.success("You are Successfully Logged in!");
        router.push("/");
   
    },
    onError: (error: unknown) => {
      if (!navigator.onLine) {
        toast.error("Please check your internet connection and try again.");
      } else if (error instanceof Error) {
        console.error(error);
        toast.error("Error logging in. Please check credentials and try again.");
      }
    },
  });

  return {login, isPending};
}
