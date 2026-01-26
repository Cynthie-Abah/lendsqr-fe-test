import { UserBoxProps } from '@/app/types/types'
import '../../styles/users/user-box.scss'
import { hexToRgba } from '@/app/lib/utils'

export const UserBox = ({icon, name, value, color}: UserBoxProps ) => {
  return (
    <div className="user-box">
    <div style={{background:  hexToRgba(color, 0.1)}} className="user-box__icon">
        {icon}
    </div>

    <div className="user-box__name">
        <h3>{name}</h3>
    </div>

    <div className="user-box__value">
        <h2>{Number(value).toLocaleString()}</h2>
    </div>
    </div>
  )
}
