"use client";

import { DataTableColumnHeader } from "@/components/shared/data-table/DataTableColumnHeader";
import { formatCurrency } from "@/helpers/formatCurrency";
import { CountryStat, DealerStat, PackagesStat } from "@/types/dashboard.types";
import { ExtendedColumnDef } from "@/types/downloadFiles.types";

export const TopCountriesColumn: ExtendedColumnDef<CountryStat>[] = [
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
      <DataTableColumnHeader column={column} title="Total Price($)" />
    ),
    cell: ({ row }) => formatCurrency(row.original.total_price),
    exportFormatter: (row) => formatCurrency(row.total_price),
  },
];

export const TopPackagesColumn: ExtendedColumnDef<PackagesStat>[] = [
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
      <DataTableColumnHeader column={column} title="Total Price($)" />
    ),
    cell: ({ row }) => formatCurrency(row.original.total_price),
    exportFormatter: (row) => formatCurrency(row.total_price),
  },
];

export const TopDealersColumn: ExtendedColumnDef<DealerStat>[] = [
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
      <DataTableColumnHeader column={column} title="Total Price($)" />
    ),
    cell: ({ row }) => formatCurrency(row.original.total_price),
    exportFormatter: (row) => formatCurrency(row.total_price),
  },
];
