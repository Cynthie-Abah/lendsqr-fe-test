import '../../styles/users/info-block.scss'
export const InfoBlock = ({info}: {info: {label: string, value: string | number}}) => {
  return (
    <div className='info-block'>
        <h4>{info.label}</h4>
        <h2>{info.value}</h2>
    </div>
  )
}
