import '../../styles/components/user-status.scss'

export const UserStatus = ({value}: {value: string}) => {
  return (
    <div className={`user-status ${value}`}>{value}</div>
  )
}
