"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { formateDate } from "@/helpers/formatDateTime";
import { Bundle } from "@/types/bundles.types";
import { EyeIcon, Text } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CopyButton from "../sims/CopyButton";
import { ExtendedColumnDef } from "@/types/downloadFiles.types";
import { formatDateCsv } from "@/helpers/formatDate";

export const BundlesColumn: ExtendedColumnDef<Bundle>[] = [
  {
    accessorKey: "id",
    id: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Package ID" />
    ),

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
      label: "Package ID",
      variant: "text",
      placeholder: "Enter Package ID...",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "sim_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sim ID" />
    ),

    cell: ({ row }) => {
      const simID = row.original.sim_id;
      if (!simID) return "";
      return (
        <div className="flex items-center gap-2">
          <span>{simID.slice(0, 12)}...</span>
          <CopyButton text={simID} />
        </div>
      );
    },

    enableColumnFilter: true,
  },
  {
    accessorKey: "iccid",
    id: "iccid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ICCID" />
    ),
    cell: ({ row }) => {
      const iccid = row.original.iccid;
      if (!iccid) return "";
      return (
        <div className="flex items-center gap-2">
          <span>{iccid.slice(0, 12)}...</span>
          <CopyButton text={iccid} />
        </div>
      );
    },
    meta: {
      label: "ICCID",
      variant: "text",
      placeholder: "Enter  ICCID...",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "name",
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Package Name" />
    ),
    meta: {
      label: "Package Name",
      variant: "text",
      placeholder: "Enter Package Name...",
      icon: Text,
    },
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
    accessorKey: "initial_data",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data Total" />
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: "remaining_data",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Remaining Data" />
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: "created_at",
    id: "created_at",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),

    cell: ({ row }) => formateDate(row.original.created_at),
    exportFormatter: (row) => formatDateCsv(row.created_at),
    meta: {
      label: "Select Date Range",
      variant: "dateRange",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <BundlesAction bundle={row.original} />,
    enableColumnFilter: true,
  },
];

function BundlesAction({ bundle }: { bundle: Bundle }) {
  const pathname = usePathname();
  if (bundle.status === "FAILED") return null;

  return (
    <div className="flex items-center justify-center">
      <Link
        href={`${
          pathname.startsWith("/reseller") ? "/reseller" : "/dealer"
        }/my-esims/${bundle.sim_id}`}
      >
        <Button
          variant={"outline"}
          size={"icon"}
          className="hover:text-primary transition-all"
        >
          <EyeIcon />
        </Button>
      </Link>
    </div>
  );
}
