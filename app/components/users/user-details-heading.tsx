"use client"
import { useUpdateStatus } from '@/app/hooks/useUpdateStatus';
import { useState } from 'react'
import { DestructModal } from '../ui/destruct-modal';
import  '../../styles/users/user-details.scss'
import { UserStatus } from '@/app/types/types';

export const UserDetailsHeading = ({
    status, 
    id, 
    username
}: {
        status: string, 
        id: string, 
        username: string
    }) => {
const newStatus = status === 'Blacklisted' ? `Active` : `Blacklisted`
const [open, setOpen] = useState(false);
        const {updateStatus, isLoading} = useUpdateStatus();
        const blacklistFn =(status: UserStatus)=> {
        updateStatus({ id: id, status }, 
            {
                onSuccess: () => {
                setOpen(false); 
                }
            }
            )} 

  return (<>
  <div className="user-details__heading">
            <h2>user details</h2>
    
            <div className="buttons-container"> 
            {
                status === 'Blacklisted' ? 
                // activate btn
                <button 
                className="activate" 
                disabled={isLoading} 
                onClick={()=> setOpen(true)}>
                    {isLoading ? 'Activating...' : 'Activate User'}
                </button> :
                // blacklist btn
                <button 
                className="blacklist" 
                disabled={isLoading} 
                onClick={()=> setOpen(true)}
                >
                {isLoading ? 'Blacklisting...' : 'Blacklist User'}
                </button>
            }    
    
            </div>
    
     </div>

   <DestructModal
          open={open} 
          setOpen={setOpen} 
          action={status === 'Blacklisted' ? `Activate ${username}` : `Black List ${username}`} 
          destructFunction={()=> blacklistFn(newStatus)}
          isPending={isLoading} />
  </>
    
  )
}
