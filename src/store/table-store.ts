/** @format */

import { create } from "zustand";
import type { ColumnFiltersState, OnChangeFn } from "@tanstack/react-table";

interface TableState {
  globalFilter: string;
  setGlobalFilter: (filter: string) => void;
  columnFilters: ColumnFiltersState;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
}

export const useTableStore = create<TableState>((set) => ({
  globalFilter: "",
  setGlobalFilter: (filter) => set({ globalFilter: filter }),
  columnFilters: [],
  setColumnFilters: (updater) =>
    set((state) => ({
      columnFilters:
        typeof updater === "function" ? updater(state.columnFilters) : updater,
    })),
}));
