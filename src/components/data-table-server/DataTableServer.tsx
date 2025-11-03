"use client";

import { useDataTable } from "@/hooks/use-data-table";
import { ExtendedColumnSort } from "@/types/data-table";
import type { ColumnDef, RowData, TableState } from "@tanstack/react-table";
import { DataTable } from "../data-table/data-table";
import { DataTableToolbar } from "../data-table/data-table-toolbar";
import { DataTableExport } from "../shared/data-table/DataTableExport";

interface GenericDataTableProps<TData extends RowData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[]; // no `any`
  pageCount?: number;
  getRowId?: (row: TData, index: number) => string;
  initialState?: Omit<Partial<TableState>, "sorting"> & {
    sorting?: ExtendedColumnSort<TData>[];
  };
  isLoading: boolean;
  exportTitle?: string;
  exportFilename?: string;
  handleFilterSubmit?: () => void;
  applyFilter?: boolean;
  refetchData?: () => void;
  isRefetching?: boolean;
}

export function GenericDataTable<TData extends RowData>({
  data,
  columns,
  pageCount = 1,
  getRowId,
  initialState,
  isLoading,
  exportTitle,
  exportFilename,
  handleFilterSubmit,
  applyFilter,
  refetchData,
  isRefetching,
}: GenericDataTableProps<TData>) {
  const { table } = useDataTable<TData>({
    data,
    columns,
    pageCount,
    getRowId,
    initialState,
  });

  return (
    <div className="data-table-container">
      <DataTable table={table} isLoading={isLoading}>
        <DataTableToolbar
          table={table}
          handleFilterSubmit={handleFilterSubmit}
          applyFilter={applyFilter}
          refetchData={refetchData}
          isRefetching={isRefetching}
        >
          <DataTableExport<TData, unknown>
            data={data}
            columns={columns}
            title={exportTitle}
            filename={exportFilename}
          />
        </DataTableToolbar>
      </DataTable>
    </div>
  );
}
