import { ReactNode } from 'react'
import { Header } from '../components/ui/header'
import { Sidebar } from '../components/ui/sidebar'
import '../styles/layout.scss'

const layout = ({children}: {children: ReactNode}) => {
  return (
    <div className="app-layout">
      <Header />
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