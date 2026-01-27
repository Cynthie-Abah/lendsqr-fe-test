import { InfoBlock } from "./info-block"
import '../../styles/users/user-info.scss'

export const UserInfo = ({heading, info}: {heading: string, info: {label: string, value: string | number}[]}) => {

  return (
    <div className="user-information">
        <h2 className="user-information__heading">{heading}</h2>
        <div className="user-information__flex">
            {
                info.map(({label, value})=> (
                    <InfoBlock key={label} info={{label, value}} />
                ))
            }
            
        </div>
    </div>
  )
}
