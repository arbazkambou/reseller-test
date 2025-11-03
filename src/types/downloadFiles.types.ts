import { ColumnDef } from "@tanstack/react-table";

// Extend ColumnDef to include exportFormatter
export type ExtendedColumnDef<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  exportFormatter?: (row: TData) => string;
};
