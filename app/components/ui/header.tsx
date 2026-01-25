import Link from 'next/link'
import Input from './input'
import '../../styles/components/header.scss'
import { Icons } from './icons'
import { Button } from './button'
import { Bell, Search } from 'lucide-react'

export const Header = () => {

  return (
    <header className="header">
        <div className="header__logo">
        <Icons.lendsqrLogo />
      </div>

      <nav className="header__search_bar">
        <Input className='input' placeholder="Search for anything" />
        <Button className='button' size='icon'><Search width={15} height={15} /></Button>
      </nav>

      <div className="header__actions">
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
          <div className="header__avatar" />
          <span className="header__username">Username</span>
          <Icons.caretDown />
        </div>
            </li>

        </ul>
      </div>

    </header>
  )
}
