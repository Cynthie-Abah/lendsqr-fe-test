"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useUsers } from "./useUsers"
import toast from "react-hot-toast"
import { User } from "../components/users/users-columns"

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  const { data: users, isPending: isFetching } = useUsers();

  const { isPending: isMutating, mutateAsync: updateStatus } = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
 
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, status };
    },
    onSuccess: ({ id, status }) => {
      queryClient.setQueryData<User[]>(['users'], () => {
        if (!users) return [];
        const updated = users.map((user: User )=> user._id === id ? { ...user, status } : user);
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('users', JSON.stringify(updated));
        }
        
        return updated;
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
