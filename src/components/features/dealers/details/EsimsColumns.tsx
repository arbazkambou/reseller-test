"use client";

import { DataTableColumnHeader } from "@/components/shared/data-table/DataTableColumnHeader";
import { EsimPurchased } from "@/types/dealers.types";
import { ColumnDef } from "@tanstack/react-table";

export const DealerEsimColumns: ColumnDef<EsimPurchased>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "iccid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ICCID" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "provider",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider" />
    ),
  },
  {
    accessorKey: "installed_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Installed at" />
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" />
    ),
  },
];
