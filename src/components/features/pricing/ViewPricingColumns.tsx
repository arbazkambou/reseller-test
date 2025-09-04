"use client";

import { DataTableColumnHeader } from "@/components/shared/data-table/DataTableColumnHeader";
import { FlattedCountryWithPrice } from "@/types/pricing.types";
import { ColumnDef } from "@tanstack/react-table";

export const ViewPricingColumns: ColumnDef<FlattedCountryWithPrice>[] = [
  {
    accessorKey: "country_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap2">
        {row.original.country_flag} {row.original.country_name}
      </div>
    ),
    filterFn: "multiSelectFilter",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Package Name" />
    ),
    filterFn: "multiSelectFilter",
  },
  {
    accessorKey: "dataUsageAllowanceInBytes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data" />
    ),
    filterFn: "multiSelectFilter",
  },
  {
    accessorKey: "timeAllowanceInSeconds",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validity" />
    ),
    filterFn: "multiSelectFilter",
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    filterFn: "multiSelectFilter",
  },
];
