"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { logout as logoutApi } from "../lib/actions/auth-action";

export default function useLogout() {
  const router = useRouter();

  const {mutate: logout, isPending} = useMutation({
    mutationFn: async () => {
       await logoutApi();
    },
    onSuccess: () => {
        toast.success("You have Successfully Logged out!");
        router.push("/auth/login");
   
    },
    onError: (error: unknown) => {
      if (!navigator.onLine) {
        toast.error("Please check your internet connection and try again.");
      } else if (error instanceof Error) {
        console.error(error);
        toast.error("Error logging out. Please check credentials and try again.");
      }
    },
  });

  return {logout, isPending};
}
