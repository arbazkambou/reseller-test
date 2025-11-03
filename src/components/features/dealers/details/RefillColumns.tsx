"use client";

import { DataTableColumnHeader } from "@/components/shared/data-table/DataTableColumnHeader";
import { RefillHistory } from "@/types/dealers.types";
import { ColumnDef } from "@tanstack/react-table";

export const DealerRefillColumns: ColumnDef<RefillHistory>[] = [
  {
    accessorKey: "id",
    id: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    // meta: {
    //   label: "Search",
    //   variant: "text",
    //   placeholder: "Search rows",
    //   icon: Text,
    // },
    // enableColumnFilter: true,
  },
  {
    accessorKey: "source",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Source" />
    ),
    // enableColumnFilter: true,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    // enableColumnFilter: true,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount ($)" />
    ),
    cell: ({ row }) => Number(row.original.amount).toFixed(2),
    // enableColumnFilter: true,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" />
    ),
    // enableColumnFilter: true,
  },
];
