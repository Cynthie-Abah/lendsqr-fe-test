import '../../../styles/users/user.scss'
import { UserTable } from '@/app/components/users/user-table'
import { UsersOverview } from '@/app/components/users/users-overview';

const page = async () => {
  return (
    <div className='users'>
      <h2>Users</h2>

        <UsersOverview />
  
        <UserTable />
      
    </div>
  )
}

export default page