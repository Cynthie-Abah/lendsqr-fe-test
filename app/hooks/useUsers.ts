"use client"
import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../lib/services/usersApi"
import { UserDetails } from "../types/types"

export const useUsers = () => {

    const {isPending, data} = useQuery<UserDetails[]>({
        queryKey: ['users'],
        queryFn: getUsers,
    })
    
  return {data: data ?? [], isPending}
}


