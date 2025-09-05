import { Button } from "@/components/ui/button";
import type { HomeTableData } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

export const HomeColumns: ColumnDef<HomeTableData>[] = [
  {
    accessorKey: "sn",
    header: "S/N",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div
          className={`font-medium uppercase px-2 py-1 w-fit rounded-lg border ${
            status === "incomplete"
              ? "border-[#7D7E8E26] bg-[#F7FAFD] text-[#2F2F30]"
              : "bg-[#F5FFFA] border-[#4DC08E4D] text-[#4DC08E]"
          }`}>
          {status as React.ReactNode}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
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
