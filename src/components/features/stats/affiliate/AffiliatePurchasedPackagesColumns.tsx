"use client";

import { DataTableColumnHeader } from "@/components/shared/data-table/DataTableColumnHeader";
import { formatDateTime } from "@/helpers/dateFormat";
import { formatCurrency } from "@/helpers/formatCurrency";
import { AffiliatePurchasedPackage } from "@/types/affiliate/stats.types";
import { ExtendedColumnDef } from "@/types/downloadFiles.types";

export const AffiliatePurchasedPackageColumn: ExtendedColumnDef<AffiliatePurchasedPackage>[] =
  [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Package Name" />
      ),
    },
    {
      accessorKey: "user_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User Name" />
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price ($)" />
      ),
      cell: ({ row }) => formatCurrency(row.original.price),
    },
    {
      accessorKey: "promocode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Promo Code" />
      ),
    },

    {
      accessorKey: "purchased_at",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Purchased At" />
      ),
      cell: ({ row }) => formatDateTime(row.original.purchased_at),
    },
  ];
