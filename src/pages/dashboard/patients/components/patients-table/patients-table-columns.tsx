/** @format */

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { RISKS, STATUS } from "@/constants/enums";
import Icons from "@/constants/icons";
import type { PropertyTableData } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";

export const PropertyColumns: ColumnDef<PropertyTableData>[] = [
  {
    accessorKey: "sn",
    header: "S/N",
    cell: () => {
      //   const sn = row.getValue("sn");
      return <Icons.coloredFolder />;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "documents",
    header: "Documents",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div className={`px-2 py-1 w-fit`}>
          <div className='flex items-center gap-2'>
            {status === STATUS.INCOMPLETE ? (
              <>
                <Loader />
                <p className='font-maven text-[#7D7E8E] text-[14px] font-medium'>
                  Analyzing
                </p>
              </>
            ) : status === STATUS.COMPLETED ? (
              <>
                <Icons.check />
                <p className='font-maven text-[#09D312] text-[14px] font-medium'>
                  {status as React.ReactNode}
                </p>
              </>
            ) : null}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "risk",
    header: "Risks",
    cell: ({ row }) => {
      const risk = row.getValue("risk");
      return (
        <div
          className={`font-medium px-2 py-0.5 w-fit rounded-lg border ${
            risk === RISKS.MEDIUM
              ? "border-[#FDD768] bg-[#FDD768] text-[#2F2F30]"
              : risk === RISKS.LOW
              ? "border-[#FDD768] bg-[#FDD7683D] text-[#2F2F30]"
              : risk === RISKS.HIGH
              ? "border-[#FF4343] bg-[#FF4343] text-white"
              : "bg-[#F5FFFA] border-0 text-[#7D7E8E]"
          }`}>
          <div className='flex items-center gap-2'>
            {risk === RISKS.MEDIUM ||
            risk === RISKS.LOW ||
            risk === RISKS.HIGH ? (
              <>
                <p
                  className={`font-maven text-[14px] font-medium ${
                    risk === RISKS.HIGH
                      ? "text-white"
                      : risk === RISKS.LOW
                      ? "text-[#2F2F30]"
                      : risk === RISKS.MEDIUM
                      ? "text-[#2F2F30]"
                      : ""
                  }`}>
                  {risk as React.ReactNode}
                </p>
              </>
            ) : (
              <>
                <FadeLoader color='#7D7E8E' />
                <p className='font-maven text-[#7D7E8E] text-[14px] font-medium'>
                  Analyzing
                </p>
              </>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => {
      //   const action = row.getValue("action");
      return (
        <div className='flex items-center gap-x-5'>
          <Button className='font-bold px-4 py-2 rounded-lg bg-[#00296B] text-white font-maven text-[14px] cursor-pointer'>
            Results
          </Button>
          <Link
            to={`/dashboard/admin/properties/12`}
            className='font-medium px-4 py-2 rounded-lg bg-[#F5F5F7] text-[#2F2F30] font-maven text-[14px] cursor-pointer hover:bg-[#F5F5F7] hover:text-[#2F2F30]'>
            View
          </Link>
        </div>
      );
    },
  },
];
