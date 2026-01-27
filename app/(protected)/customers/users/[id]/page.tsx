import { Icons } from "@/app/components/ui/icons";
import Link from "next/link"
import { UserDetails } from "@/app/components/users/user-details";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params
  
  return (
    <div className='user-details'>
      <Link 
      href={'/customers/users'} 
      className="user-details__link">
        <Icons.backArrow /> 
        <span>Back to Users</span>
      </Link>

      <UserDetails id={id} />

    </div>
  )
}