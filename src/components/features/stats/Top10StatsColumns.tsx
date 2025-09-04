"use client";

import { DataTableColumnHeader } from "@/components/shared/data-table/DataTableColumnHeader";
import { CountryStat, DealerStat, PackagesStat } from "@/types/dashboard.types";
import { ColumnDef } from "@tanstack/react-table";

export const TopCountriesColumn: ColumnDef<CountryStat>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const country = row.original;
      return (
        <div className="flex items-center gap-2">
          <span>{country.emoji}</span>
          <span>{country.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "total_packages",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Packages" />
    ),
  },

  {
    accessorKey: "total_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Price" />
    ),
    cell: ({ row }) => row.original.total_price.toFixed(2),
  },

  {
    accessorKey: "emoji",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Flag" />
    ),
  },
];

export const TopPackagesColumn: ColumnDef<PackagesStat>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "total_packages",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Packages" />
    ),
  },

  {
    accessorKey: "total_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Price" />
    ),
    cell: ({ row }) => row.original.total_price.toFixed(2),
  },
];

export const TopDealersColumn: ColumnDef<DealerStat>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "total_packages",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Packages" />
    ),
  },

  {
    accessorKey: "total_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Price" />
    ),
    cell: ({ row }) => row.original.total_price.toFixed(2),
  },
];
