import "../../styles/users/column-header.scss";
import { FilterSearch, filterType } from "../ui/filter-search";

export const UserColumnHeader = ({
  columnDetails,
}: {
  columnDetails: {
    id: string;
    name: string;
    filterType: filterType;
    selectOptions?: {
      id: string;
      name: string;
      value: string;
    }[];
  };
}) => {
  return (
    <div className="data-heading">
      <span>{columnDetails.name}</span>
      <FilterSearch columnDetails={columnDetails} />
    </div>
  );
};
