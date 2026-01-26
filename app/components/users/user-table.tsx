'use client'

import { DataTable } from "../ui/data-table"
import { userColumns } from "./users-columns"
import '../../styles/users/user-table.scss'
import { useUsers } from "@/app/hooks/useUsers"
import Loading from "@/app/loading"

export const UserTable = () => {
  const {data, isPending} = useUsers();

  if (isPending) return <Loading />
  return (
     <div className="data-table">
        <DataTable columns={userColumns} data={data} />
      </div>
  )
}
