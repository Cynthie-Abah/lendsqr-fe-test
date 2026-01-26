"use server"
import { User } from "@/app/types/types";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_LOGIN_API!
const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN!

export const login = async (user: User) => {
    try {
        const request = await fetch(API_URL, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
         }
    });
        const response = await request.json()
         if (!request.ok) {
      throw new Error(response.message ?? "Login failed");
    }
     if (response[0].email === user.email && response[0].password === user.password) {
        (await cookies()).set('user', JSON.stringify(response[0]), {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    return response[0];
      } else { 
        throw new Error("Incorrect credentials. Please try again.");
      }
       
    

    

    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
  const cookieStore = await cookies()

  cookieStore.delete('user')
}