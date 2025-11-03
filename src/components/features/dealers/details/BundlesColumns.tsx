"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { BundlePurchased } from "@/types/dealers.types";
import { ColumnDef } from "@tanstack/react-table";
import { Text } from "lucide-react";

export const DealerBundleColumns: ColumnDef<BundlePurchased>[] = [
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
  //   {
  //     accessorKey: "iccid",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="SIM ICCID" />
  //     ),
  //   },
  {
    accessorKey: "package_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: "provider_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider Name" />
    ),
    enableColumnFilter: true,
  },
  //   {
  //     accessorKey: "status",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="Status" />
  //     ),
  //   },
  {
    accessorKey: "initial_data",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data Total" />
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: "data_remaining",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data Remaining" />
    ),
    enableColumnFilter: true,
  },
  //   {
  //     accessorKey: "",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="Minutes Remaining" />
  //     ),
  //   },
  //   {
  //     accessorKey: "smsRemaining",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="Sms Remaining" />
  //     ),
  //   },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => row.original.price.toFixed(2),
    enableColumnFilter: true,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    enableColumnFilter: true,
  },
];
