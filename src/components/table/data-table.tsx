/** @format */

import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type SortingState,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import { TableCell, TableRow } from "@/components/ui/table"; // Assuming this path to your shadcn/ui table components
import { Button } from "@/components/ui/button"; // Assuming this path to your shadcn/ui button component
import { useState } from "react";
import { useTableStore } from "@/store/table-store"; // Assuming this path for your store
import { User, Users } from "lucide-react"; // Import relevant icons

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showPagination?: boolean;
  children?: React.ReactNode; // For buttons/filters above the table
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showPagination = true,
  children,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { columnFilters, setColumnFilters } = useTableStore(); // Assuming this hook helps with filtering

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
      {/* Optional: Render children (like search/filter controls) above the table */}
      {children && <div className='p-6'>{children}</div>}

      <div className='overflow-x-auto'>
        {/* Ensure table content is scrollable on small screens */}
        <table className='w-full'>
          <thead className='bg-gray-50'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      onClick={header.column.getToggleSortingHandler()} // Add sorting handler
                      style={{
                        cursor: header.column.getCanSort()
                          ? "pointer"
                          : "default",
                      }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {{
                        asc: " ▲", // Ascending sort indicator
                        desc: " ▼", // Descending sort indicator
                      }[header.column.getIsSorted() as string] ?? null}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className='hover:bg-gray-50 transition-colors duration-150'>
                  {row.getVisibleCells().map((cell) => {
                    // Special rendering for the first column (e.g., S/N or Icon)
                    // You can make this more dynamic based on column ID if needed
                    if (
                      cell.column.id === "serialNumber" ||
                      cell.column.id === "avatar" ||
                      cell.column.id === "name"
                    ) {
                      // Assuming your first column in `columns` might be named 'serialNumber' or 'name'
                      // Adjust `cell.column.id` to match your actual column definition if it's different
                      const cellValue = flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      );

                      // Logic to render the avatar div if it's the first column and has a name
                      if (
                        cell.column.id === "name" &&
                        row.original &&
                        (row.original as any).name
                      ) {
                        return (
                          <td
                            key={cell.id}
                            className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3'>
                                <User className='h-4 w-4 text-gray-600' />
                              </div>
                              <span className='text-sm font-medium text-gray-900'>
                                {cellValue}
                              </span>
                            </div>
                          </td>
                        );
                      }

                      // Render S/N if it's the serial number column
                      if (cell.column.id === "serialNumber") {
                        return (
                          <td
                            key={cell.id}
                            className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {cellValue}
                          </td>
                        );
                      }
                    }

                    // Default rendering for other cells
                    return (
                      <td
                        key={cell.id}
                        className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  <div className='text-center py-12'>
                    <Users className='mx-auto h-12 w-12 text-gray-400' />
                    <h3 className='mt-2 text-sm font-medium text-gray-900'>
                      No results found
                    </h3>
                    <p className='mt-1 text-sm text-gray-500'>
                      Try adjusting your search criteria or filters.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </table>
      </div>

      {showPagination && table.getPageCount() > 1 && (
        <div className='flex items-center justify-between px-6 py-4 border-t border-gray-200'>
          <div className='text-sm text-gray-600'>
            Showing {table.getState().pagination.pageIndex + 1} to{" "}
            {Math.min(
              table.getState().pagination.pageIndex +
                table.getState().pagination.pageSize,
              table.getRowCount()
            )}{" "}
            of {table.getRowCount()} results
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              className='rounded-lg flex items-center gap-1 border border-gray-300 cursor-pointer text-sm text-gray-700 hover:bg-gray-50'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              &#x2962; Previous
            </Button>
            <Button
              variant='outline'
              size='sm'
              className='rounded-lg flex items-center gap-1 border border-gray-300 cursor-pointer text-sm text-gray-700 hover:bg-gray-50'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              Next &#x2964;
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
