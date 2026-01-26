
import '../../styles/users/column-header.scss'
import { FilterSearch, filterType } from "../ui/filter-search"

export const UserColumnHeader = ({columnDetails }: {columnDetails: {id: string, name: string, filterType: filterType}}) => {
  return (
    <p className="data-heading">
        <span>{columnDetails.name}</span> 
        <FilterSearch columnDetails={columnDetails} />
    </p>
  )
}
