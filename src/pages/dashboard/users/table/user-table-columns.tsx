/** @format */

import { Button } from "@/components/ui/button";
import type { UserTableData } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

  export const UserColumns: ColumnDef<UserTableData>[] = [
    {
      accessorKey: "sn",
      header: "S/N",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "user_id",
      header: "User ID",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "date",
      header: "Date Added",
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: () => {
        // const action = row.getValue("action");
        return (
          <Button className='font-medium px-4 py-2 rounded-lg bg-[#F5F5F7] text-[#2F2F30] font-maven text-[14px] cursor-pointer hover:bg-[#F5F5F7] hover:text-[#2F2F30]'>
            View
          </Button>
        );
      },
    },
  ];
