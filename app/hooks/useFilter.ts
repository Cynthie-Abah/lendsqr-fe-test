"use client"
import { useRouter, useSearchParams } from 'next/navigation';

export default function useFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = new URLSearchParams(searchParams.toString())
 
    const applyFilter = ({key, value}: {key: string, value: string})=> {

        if (value) {
            params.set(`${key}`, String(value));
        }

        router.push(`?${params.toString()}`);
  }



const clearFilter = (key: string)=>{
  const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    router.push(`?${params.toString()}`);
}
return {applyFilter, clearFilter}
}
