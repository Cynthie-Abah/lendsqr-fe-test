import { ColumnDef } from "@tanstack/react-table"
import { UserColumnHeader } from "./user-column-header";
import { format } from "date-fns";
import { UserStatus } from "../ui/user-status";
import { UserMenu } from "./user-menu";
import { organizationOptions, statusOptions } from "@/app/lib/constants";

export type User = {
    _id: string,
    organization: string,
    username: string,
    email: string,
    phone: string,
    date_joined: string,
    status: "Active" | "Inactive" | "Blacklisted" | "Pending",
}

  export const userColumns: ColumnDef<User>[] = [
   {
    accessorKey: "organization",
    header: ()=> (<UserColumnHeader columnDetails={{
      id: "organization",
      name: "organization",
      filterType: 'select',
      selectOptions: organizationOptions
    }}  />),
  },
  {
    accessorKey: "username",
    header: ()=> (<UserColumnHeader columnDetails={{
      id: "username",
      name: "username",
      filterType: 'text'
    }}  />),
  },
  {
    accessorKey: "email",
    header: ()=> (<UserColumnHeader columnDetails={{
      id: "email",
      name:"email", 
      filterType: "text"
    }}  />),
  },
  {
    accessorKey: "phone",
    header: ()=> (<UserColumnHeader columnDetails={{
      id: "phone",
      name: "phone Number",
      filterType: 'text'
    }}  />),
  },
  {
    accessorKey: "date_joined",
    header: ()=> (<UserColumnHeader columnDetails={{
      id: "date_joined",
      name: "date Joined",
      filterType: 'date'
    }}  />),
    cell: ({row})=> (format(row.original.date_joined, 'MMM d, yyyy hh:mm a'))
  },
  {
    accessorKey: "status",
    header: ()=> (<UserColumnHeader columnDetails={{
      id: "status",
      name: "status",
      filterType: "select",
      selectOptions: statusOptions
    }}  />),
    cell: ({row})=> (<UserStatus value={row.original.status} />)
  },
  {
    accessorKey: "action",
    header: " ",
    cell: ({row})=> {
        return (<UserMenu rowDetails={row.original} />)
    }
  },
]


