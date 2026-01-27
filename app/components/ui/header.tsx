"use client"
import Link from 'next/link'
import Input from './input'
import '../../styles/components/header.scss'
import { Icons } from './icons'
import { Button } from './button'
import { Bell, EllipsisVertical, Menu, Search, SearchIcon, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export const Header = ({
  userData, 
}: {
    userData: {
      profilePic: string, 
      username: string}, 
    }) => {
  const [openSearch, setOpenSearch] = useState(false)
  const [openActions, setOpenActions] = useState(false)
   const openSidebar = () => {
  document.querySelector('.sidebar')?.classList.add('open')
}
  
  return (
    <>
    <header className="header">

      {/* mobile btn */}
      <div className="header__mobile-nav">

        <button onClick={openSidebar} className='menu-button'>
          <Menu />
        </button>

        <Button 
        className='search' 
        size='icon'
        variant='default'
        onClick={()=> setOpenSearch(!openSearch)}>
         {openSearch ? <X width={20} height={20} /> : <SearchIcon width={20} height={20}  />}
        </Button> 

      </div>

      <div className="header__logo">
        <Link href={'/'}>
        <Icons.lendsqrLogo />
        </Link>
        
      </div>

        <button onClick={()=> setOpenActions(!openActions)} className='header__ellipse'>
          
        {openActions ? <X /> : <EllipsisVertical /> }
        </button> 

      <div className={`${openSearch && 'header__mobile-search_bar'} header__search_bar`}>
        <Input className='input' placeholder="Search for anything" />
        <Button className='button' size='icon'><Search width={15} height={15} /></Button>
      </div>

      <div className={`${openActions && 'header__mobile-actions'} header__actions`}>
        <ul>
            <li>
                <Link className='docs' href={'/docs'}>Docs</Link>
            </li>

            <li>
                <Link href={'/notifications'}>
                <Bell width={20} height={20} />
                </Link>
            </li>

            <li>
                <div className="header__profile">
          <div className="header__avatar">
            {/* {
              userData.profilePic ?  */}
              <Image 
            fill
            src={userData.profilePic ? userData.profilePic : '/images/user-placeholder.jpg' } 
            alt={userData.username} /> 
          
          </div>

          <span className="header__username">{userData?.username}</span>
          <button><Icons.caretDown /></button>
        </div>
            </li>

        </ul>
      </div>

    </header>
    </>
    
  )
}
