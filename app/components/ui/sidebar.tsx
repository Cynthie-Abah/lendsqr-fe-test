"use client"
import '../../styles/components/sidebar.scss'
import { sidebarNav } from '@/app/lib/constants'
import { ChevronDown, LogOut } from 'lucide-react'
import Link from 'next/link'
import { Icons } from './icons'
import { usePathname } from 'next/navigation'
import useLogout from '@/app/hooks/useLogout'

export const Sidebar = () => {
    const {logout, isPending} = useLogout();
    const pathname = usePathname()

  return (
    <aside className="sidebar">
        <div className="sidebar__content">
            <button 
            className={'switch-org-btn'}>
                <Icons.organizationIcon /> 
                <span>Switch Organization</span> 
                <ChevronDown width={15} height={15} />
            </button>

            {sidebarNav.map((item) => {
            if (item.type === 'section') {
                return (
                <div key={item.title}>
                    <p className="sidebar-section-title">{item.title}</p>
                    <ul className='sidebar__menu'>
                    {item.items.map(link => (
                        <li key={link.path}>
                        <Link 
                        key={link.path} 
                        href={link.path} 
                        className={`sidebar__item ${pathname === link.path ? 'active' : ''}`}>
                        <link.icon /> 
                        <span>{link.label}</span>
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>
                )
            }

            if (item.type === 'link') {
                return <Link 
                    key={item.path} 
                    href={item.path} 
                    className={`sidebar__item ${pathname === item.path ? 'active' : ''}`}>
                    <item.icon /> 
                    <span>{item.label}</span>
                    </Link>
            }

            
            })}

            <button 
                className={'logout-btn'}
                onClick={() => logout()}
                disabled={isPending}
                > 
                <Icons.logout /> 
                <span>{isPending ? 'Logging out' : 'Logout'}</span>
                </button>

            <span className='sidebar__v'>v1.2.0</span>

        </div>
    </aside>
  )
}
