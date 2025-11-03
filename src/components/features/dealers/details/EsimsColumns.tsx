"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { EsimPurchased } from "@/types/dealers.types";
import { ColumnDef } from "@tanstack/react-table";
import { Text } from "lucide-react";

export const DealerEsimColumns: ColumnDef<EsimPurchased>[] = [
  {
    accessorKey: "id",
    id: "id",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    meta: {
      label: "Search",
      variant: "text",
      placeholder: "Search rows",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "iccid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ICCID" />
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: "provider",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider" />
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: "installed_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Installed at" />
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" />
    ),
    enableColumnFilter: true,
  },
];
