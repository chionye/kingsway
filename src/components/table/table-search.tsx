/** @format */

// components/table-search.tsx

"use client";

import { useTableStore } from "@/store/table-store";
import { Input } from "@/components/ui/input";
import Icons from "@/constants/icons";

export function TableSearch() {
  const { globalFilter, setGlobalFilter } = useTableStore();

  return (
    <div className='flex items-center bg-[#F5F5F7] border border-[#F5F5F7] rounded-[8px] px-5 py-1 w-full'>
      <Input
        placeholder='Search...'
        value={globalFilter}
        onChange={(event) => setGlobalFilter(event.target.value)}
        className='max-w-sm bg-transparent border-0 outline-none focus:outline-none focus-visible:ring-0 shadow-none'
      />
      <Icons.search2 />
    </div>
  );
}
