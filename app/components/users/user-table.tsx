"use client";

import { DataTable } from "../ui/data-table";
import { userColumns } from "./users-columns";
import "../../styles/users/user-table.scss";
import { useUsers } from "@/app/hooks/useUsers";
import Loading from "@/app/loading";
import { useSearchParams } from "next/navigation";
import { UserDetails } from "@/app/types/types";

export const UserTable = () => {
  const searchParams = useSearchParams();
  const { data, isPending } = useUsers();

  const params = Array.from(searchParams.entries());

  const filtered = data.filter((user) =>
    params.every(([key, value]) => {
      const userValue = user[key as keyof UserDetails];
      if (!(key in user)) return true;
      return (
        (userValue !== undefined &&
          String(userValue).toLowerCase() === value.toLowerCase()) ||
        String(userValue).toLowerCase().includes(value.toLowerCase())
      );
    }),
  );

  if (isPending) return <Loading />;
  return (
    <div className="data-table">
      <DataTable columns={userColumns} data={filtered} />
    </div>
  );
};
