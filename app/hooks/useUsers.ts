"use client"
import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../lib/services/usersApi"
import { useUserStore } from "@/store"


export const useUsers = () => {
   const { users: storedUsers } = useUserStore();

    const {isPending, data} = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        placeholderData: ()=> {
         return storedUsers && storedUsers.length > 0 ? storedUsers : undefined;
         }
    })
// come b ack to trying to save this to localstorage
  //    if (typeof window !== 'undefined' && data) {
  //   setUsers(data); // Zustand will persist automatically if using `persist`
  //   // localStorage.setItem('users', JSON.stringify(query.data)); // optional duplicate persistence
  // }

  return {data, isPending}
}


