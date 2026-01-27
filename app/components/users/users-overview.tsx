"use client"

import { useUsers } from "@/app/hooks/useUsers";
import { UserBox } from "./user-box";
import { Icons } from "../ui/icons";
import '../../styles/users/user.scss'
import { UserDetails } from "@/app/types/types";

export const UsersOverview = () => {
      const {data, isPending} = useUsers()
      const userStats = [
  {
    icon: <Icons.users2 />,
    name: 'Users',
    value: data.length,
    color: '#DF18FF',
  },
  {
    icon: <Icons.activeUsers />,
    name: 'Active Users',
    value: data.filter((user: UserDetails)=> user.status === "Active").length,
    color: '#5718FF',
  },
  {
    icon: <Icons.loanUsers />,
    name: 'Users with Loans',
    value: data.filter((user: UserDetails)=> user.education_and_employment.loan_repayment).length,
    color: '#F55F44',
  },
  {
    icon: <Icons.savingUserIcon />,
    name: 'Users with Savings',
    value: data.filter((user: UserDetails)=> user.account_balance).length,
    color: '#FF3366',
  },
];
  if(isPending) return
  return (
      <div className="overview">

        {
        userStats.map(({icon, name, value, color}, index)=> (

          <UserBox
        key={index}
        icon={icon} 
        name={name} 
        value={value}
        color={color}
        />
        ))}
        
      </div>
  )
}
