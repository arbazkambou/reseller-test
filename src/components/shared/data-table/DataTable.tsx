"use client";

import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination } from "@/components/shared/data-table/DataTablePagination";
import { DataTableViewOptions } from "@/components/shared/data-table/DataTableViewOption";
import { DataTableExport } from "@/components/shared/data-table/DataTableExport";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type NoCustomFilters = {
  isCustomFilters: false;
};

type ColumnOption = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type ColumnsToFilter = {
  key: string;
  title: string;
  options: ColumnOption[];
};

type HavingCustomFilters = {
  isCustomFilters: true;
  columnsToFilter: ColumnsToFilter[];
};

type DataTableOptions = NoCustomFilters | HavingCustomFilters;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  options: DataTableOptions;
  exportFilename?: string;
  showExport?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  options,
  exportFilename,
  showExport = true,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");

  // Generic multi-select filter
  const multiSelectFilter: FilterFn<unknown> = (
    row,
    columnId,
    filterValue: string[]
  ) => {
    if (!filterValue?.length) return true;
    return filterValue.includes(row.getValue(columnId));
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    filterFns: {
      multiSelectFilter: multiSelectFilter,
    },
    state: {
      globalFilter,
      // columnFilters,
    },
    globalFilterFn: "includesString",
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 xl:flex-row  xl:items-center xl:justify-between">
        <div className="flex flex-col gap-2 xl:items-center xl:flex-row">
          <Input
            placeholder="Filter rows..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm"
          />
          <div className="flex items-center gap-2">
            {options.isCustomFilters &&
              options.columnsToFilter
                .filter((column) => table.getColumn(column.key))
                .map((column, index) => (
                  <DataTableFacetedFilter
                    key={index}
                    options={column.options}
                    column={table.getColumn(column.key)}
                    title={column.title}
                  />
                ))}
            {isFiltered && (
              <Button
                onClick={() => table.resetColumnFilters()}
                className="h-8 px-2 lg:px-3"
              >
                Reset
                <X />
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {showExport && (
            <DataTableExport<TData, TValue>
              data={data}
              columns={columns}
              filename={exportFilename}
            />
          )}
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
