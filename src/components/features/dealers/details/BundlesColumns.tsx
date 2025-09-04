"use client";

import { DataTableColumnHeader } from "@/components/shared/data-table/DataTableColumnHeader";
import { BundlePurchased } from "@/types/dealers.types";
import { ColumnDef } from "@tanstack/react-table";

export const DealerBundleColumns: ColumnDef<BundlePurchased>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
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
  },
  {
    accessorKey: "provider_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider Name" />
    ),
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
  },
  {
    accessorKey: "data_remaining",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data Remaining" />
    ),
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
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
  },
];
