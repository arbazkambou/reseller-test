"use client";

import { DataTableColumnHeader } from "@/components/shared/data-table/DataTableColumnHeader";
import { formatCurrency } from "@/helpers/formatCurrency";
import { ExtendedColumnDef } from "@/types/downloadFiles.types";
import { FlattedCountryWithPrice } from "@/types/pricing.types";

export const ViewPricingColumns: ExtendedColumnDef<FlattedCountryWithPrice>[] =
  [
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
      accessorKey: "data",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Data" />
      ),
      cell: ({ row }) => {
        const data = row.original.data;
        const value = data.is_unlimited
          ? "Unlimited"
          : `${data.value} ${data.unit}`;
        return value;
      },
      filterFn: (row, columnId, filterValues) => {
        const data = row.original.data;
        const value = data.is_unlimited
          ? "Unlimited"
          : `${data.value} ${data.unit}`;

        if (
          !filterValues ||
          filterValues.length === 0 ||
          filterValues.includes("")
        ) {
          return true;
        }

        return filterValues.includes(value);
      },
      exportFormatter: (row) => {
        const data = row.data;
        return data.is_unlimited ? "Unlimited" : `${data.value} ${data.unit}`;
      },
    },
    {
      accessorKey: "time",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Validity" />
      ),

      cell: ({ row }) => {
        const time = row.original.time;
        const value = `${time.value} ${time.unit}`;
        return value;
      },

      filterFn: (row, columnId, filterValues) => {
        const time = row.original.time;
        const value = `${time.value} ${time.unit}`;

        if (
          !filterValues ||
          filterValues.length === 0 ||
          filterValues.includes("")
        ) {
          return true;
        }

        return filterValues.includes(value);
      },
      exportFormatter: (row) => {
        const time = row.time;
        return `${time.value} ${time.unit}`;
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price($)" />
      ),
      filterFn: "multiSelectFilter",
      cell: ({ row }) => {
        const value = row.getValue("price") as number | string | null;
        if (value === null || value === undefined || value === "") return "-";
        return <span>{formatCurrency(value)}</span>;
      },
      exportFormatter: (row) => {
        const price = row.price;
        if (price === null || price === undefined) return "-";
        return formatCurrency(price);
      },
    },
  ];
