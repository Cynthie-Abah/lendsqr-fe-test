"use client"
import {  useQueryClient } from "@tanstack/react-query"
import { useUsers } from "./useUsers"
import { UserDetails } from "../types/types"

// use next route handler for the api
export const useUserDetails = (id: string) => {
    const queryClient = useQueryClient();
    const {data: users, isPending} = useUsers()
    const data = users.find((user: UserDetails)=> id === user._id)

     // set user details value
      queryClient.setQueryData<UserDetails>(['user', id], () => {
        if (!users) return {} as UserDetails;
        
        if (typeof window !== 'undefined') {
          localStorage.setItem(id, JSON.stringify(data));
        }
        return  data
      });
    
  return {data, isPending}
}


