import { ReactNode } from 'react'
import { Header } from '../components/ui/header'
import { Sidebar } from '../components/ui/sidebar'
import '../styles/layout.scss'
import { cookies } from 'next/headers'

const layout = async ({children}: {children: ReactNode}) => {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');
    const userData = JSON.parse(userCookie?.value || ''); 
  return (
    <div className="app-layout">
      <Header userData={userData} />
      <div className="app-body">
        <Sidebar />
        <main className="app-content">
          {children}
        </main>
        
      </div>
      
    </div>
  )
}

export default layout