
import  { ReactNode } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {  EllipsisVertical } from 'lucide-react'
import '../../styles/components/menu-box.scss'

export default function MenuBox({menuItems}: Readonly<{menuItems: ReactNode[]}>) {
  return (
     <Menu>
      <MenuButton className={'menu-button'} >
        <EllipsisVertical 
        width={20} 
        height={20} 
        className='flex' />
      </MenuButton>

      <MenuItems className={'menu'} anchor="bottom end">

      {
         menuItems.map((item: ReactNode, index: number)=>
            <MenuItem key={index + 1}>    
                {item}
            </MenuItem>
        )
      }      
      </MenuItems>
    </Menu>
  )
}
