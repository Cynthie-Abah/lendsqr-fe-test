"use client"
import MenuBox from '../ui/menu-box'
import Link from 'next/link'
import { User } from './users-columns'
import { Eye } from 'lucide-react'
import { Icons } from '../ui/icons'
import { DestructModal } from '../ui/destruct-modal'
import { useState } from 'react'
import { useUpdateStatus } from '@/app/hooks/useUpdateStatus'

export const UserMenu = ({rowDetails}: {rowDetails: User}) => {
    const [open, setOpen] = useState(false);
      const {updateStatus, isLoading} = useUpdateStatus();
      const blacklistFn =()=> {
        updateStatus({ id: rowDetails._id, status: "Blacklisted" }, 
            {
                onSuccess: () => {
                setOpen(false); 
                }
            }
            )} 
  return (
     <>
        <MenuBox menuItems={[
        <Link
        key={'View Details'} 
        href={`/customers/users/${rowDetails._id}`}
        >
          <Eye /> 
          <span>View Details</span> 
            </Link>,

        <button
        key={'Edit Category'}
        onClick={()=> setOpen(true)}
        >
          {rowDetails.status === 'Blacklisted' ? <Icons.goodUser /> : <Icons.xUser /> }<span>{rowDetails.status === 'Blacklisted' ? 'Activate User' : 'Blacklist User'}</span>  
            </button>,
        ]} />

        <DestructModal
        open={open} 
        setOpen={setOpen} 
        action={rowDetails.status === 'Blacklisted' ? `Activate ${rowDetails.username}` : `Black List ${rowDetails.username}`} 
        destructFunction={blacklistFn}
        isPending={isLoading} />
        </>
  )
}