/** @format */

import type { Medicine } from "@/types";
import type { ColumnDef, Row } from "@tanstack/react-table";

// Extend the row type to include the original data
type MedicineRow = Row<Medicine>;
import { getExpiryStatusColor, getStockStatusColor } from "../constants/data";
import { Eye } from "lucide-react";

// Define columns for the medicine table using TanStack Table
export const medicineColumns: ColumnDef<Medicine>[] = [
  {
    accessorKey: "sn",
    header: "S/N",
    cell: ({ row }) => (
      <div className='text-sm text-gray-900'>{row.getValue("sn")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Medicine Name",
    cell: ({ row }) => {
      return (
        <div className='flex items-center space-x-2'>
          {/* You might add an icon or image here if you have one */}
          <span className='text-sm font-medium text-gray-900'>
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "generic_name",
    header: "Generic Name",
    cell: ({ row }) => (
      <div className='text-sm text-gray-900'>
        {row.getValue("generic_name")}
      </div>
    ),
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => (
      <div className='text-sm text-gray-900'>{row.getValue("supplier")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }: { row: MedicineRow }) => (
      <div className='text-sm text-gray-900'>
        ${(row.getValue("price") as number).toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "in_stock",
    header: "In Stock",
    cell: ({ row }: { row: MedicineRow }) => {
      const medicine = row.original;
      const statusColorClass = getStockStatusColor(
        medicine.in_stock,
        medicine.reorder_level
      );
      return (
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statusColorClass}`}>
          {medicine.in_stock}
        </span>
      );
    },
  },
  {
    accessorKey: "expiry_date",
    header: "Expiry Date",
    cell: ({ row }: { row: MedicineRow }) => {
      const expiryDate = row.getValue("expiry_date") as string;
      const statusColorClass = getExpiryStatusColor(expiryDate);
      return (
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statusColorClass}`}>
          {expiryDate}
        </span>
      );
    },
  },
  {
    accessorKey: "batch_number",
    header: "Batch No.",
    cell: ({ row }) => (
      <div className='text-sm font-mono text-gray-900'>
        {row.getValue("batch_number")}
      </div>
    ),
  },
  // Action column placeholder - you can add buttons here for View/Edit/Delete
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <button className='bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-1'>
        <Eye className='h-3 w-3' />
        <span>View</span>
      </button>
    ),
  },
];
