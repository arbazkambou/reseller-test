"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { formatDateTime } from "@/helpers/dateFormat";
import { formatCurrency } from "@/helpers/formatCurrency";
import { Credit } from "@/types/credits.types";
import { ExtendedColumnDef } from "@/types/downloadFiles.types";
import { Text } from "lucide-react";
import CopyButton from "../sims/CopyButton";
import { formatDateCsv } from "@/helpers/formatDate";

export const CreditColumns: ExtendedColumnDef<Credit>[] = [
  {
    accessorKey: "id",
    id: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    enableColumnFilter: true,
    cell: ({ row }) => {
      const id = row.original.id;
      if (!id) return "";
      return (
        <div className="flex items-center gap-2">
          <span>{id.slice(0, 12)}...</span>
          <CopyButton text={id} />
        </div>
      );
    },
    meta: {
      label: "ID",
      variant: "text",
      placeholder: "Enter ID...",
      icon: Text,
    },
  },
  {
    id: "name",
    accessorFn: (row) => row.user.name,
    accessorKey: "user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),

    meta: {
      label: "User Name",
      variant: "text",
      placeholder: "Enter User Name...",
      icon: Text,
    },

    enableColumnFilter: true,
    exportFormatter: (row) => row.user?.name ?? "-",
  },
  {
    accessorFn: (row) => row.user.email,
    id: "email",
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),

    meta: {
      label: "User Email",
      variant: "text",
      placeholder: "Enter User Email...",
      icon: Text,
    },
    enableColumnFilter: true,
    exportFormatter: (row) => row.user?.email ?? "-",
  },

  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount($)" />
    ),
    cell: ({ row }) => {
      const value = row.original.amount as string | number | null;
      if (value === null || value === undefined || value === "") return "-";

      const num = Number(value);
      return (
        <span className={num < 0 ? "text-destructive" : "text-primary"}>
          {formatCurrency(num)}
        </span>
      );
    },

    enableColumnFilter: true,
    exportFormatter: (row) => {
      if (row.amount == null || row.amount === "") return "-";
      return formatCurrency(row.amount);
    },
  },
  // {
  //   accessorFn: (row) => row.user.id,
  //   id: "user_id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="User ID" />
  //   ),
  //   meta: {
  //     label: "User ID",
  //     variant: "text",
  //     placeholder: "Enter User Id...",
  //     icon: Text,
  //   },
  //   enableColumnFilter: true,
  // },

  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),

    enableColumnFilter: true,
  },

  // {
  //   accessorKey: "sim_id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Sim ID" />
  //   ),

  //   enableColumnFilter: true,
  // },
  {
    id: "created_at",
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("created_at") as string;
      return <span>{formatDateTime(value)}</span>;
    },
    exportFormatter: (row) => formatDateCsv(row.created_at),
    meta: {
      label: "Select Date Range",
      variant: "dateRange",
      icon: Text,
    },
    enableColumnFilter: true,
  },
];
