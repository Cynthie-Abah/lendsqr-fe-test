"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useUsers } from "./useUsers"
import toast from "react-hot-toast"
import { UserDetails, UserStatus } from "../types/types"

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  const { data: users, isPending: isFetching } = useUsers();

  const { isPending: isMutating, mutateAsync: updateStatus } = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: UserStatus }) => {
 
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, status };
    },
    onSuccess: ({id, status})=> {
      // reset users value
      queryClient.setQueryData<UserDetails[]>(['users'], ()=> {
        if (!users) return [] as UserDetails[]; 
        return users.map((user: UserDetails )=> user._id === id ? { ...user, status } : user);
      });

      // reset user details value
      queryClient.setQueryData<UserDetails>(['user', id], () => {
        if (!users) return {} as UserDetails;
        const updated = users.map((user: UserDetails )=> user._id === id ? { ...user, status } : user);
        const user = updated.find((user: UserDetails)=> user._id === id)
        if (typeof window !== 'undefined') {
          localStorage.setItem(id, JSON.stringify(user));
        }
        return user;
      });

      toast.success("Status successfully updated.");
    },
    onError: err => {
      if (!navigator.onLine) {
        toast.error("Check your internet connection and try again.");
      } else {
        toast.error("Error changing user status");
      }
    }
  });

  const isLoading = isFetching || isMutating;

  return { updateStatus, isLoading };
}