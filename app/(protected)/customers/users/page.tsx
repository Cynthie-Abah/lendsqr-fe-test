import '../../../styles/users/user.scss'
import { UserBox } from "@/app/components/users/user-box"
import { userStats } from '@/app/lib/constants'
import { UserTable } from '@/app/components/users/user-table'

const page = async () => {

  return (
    <div className='users'>
      <h2>Users</h2>

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
  
        <UserTable />
      
    </div>
  )
}

export default page