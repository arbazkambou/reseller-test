"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/helpers/dateFormat";
import { EyeIcon, Text } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CopyButton from "./CopyButton";
import { ExtendedColumnDef } from "@/types/downloadFiles.types";
import { formatDateCsv } from "@/helpers/formatDate";

export type MyESIM = {
  id: string;
  iccid: string;
  qr_code_text: string;
  smdp_address: string;
  matching_id: string;
  created_at: string; // ISO timestamp
  last_bundle: string;
  status: string;
  total_bundles: number;
  puk_code: string;
  installed_at: string | null; // nullable timestamp
  number: string | null;
  universal_link: string;
  sim_applied: boolean;
  apn: string;
  imei: string | null;
};

export const MyESIMColumns: ExtendedColumnDef<MyESIM>[] = [
  {
    accessorKey: "id",
    id: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),

    meta: {
      label: "SIM ID",
      variant: "text",
      placeholder: "Enter SIM ID...",
      icon: Text,
    },

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
          <span>{row.original.iccid.slice(0, 8)}...</span>
          <CopyButton text={iccid} />
        </div>
      );
    },
    meta: {
      label: "ICCID",
      variant: "text",
      placeholder: "Enter ICCID...",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "smdp_address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SMDP + Address" />
    ),
    cell: ({ row }) => {
      const smpdp = row.original.smdp_address;
      if (!smpdp) return "";
      return (
        <div className="flex items-center gap-2">
          <span>{smpdp}</span>
          <CopyButton text={smpdp} />
        </div>
      );
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "matching_id",
    id: "matching_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Matching ID" />
    ),
    meta: {
      label: "Matching ID",
      variant: "text",
      placeholder: "Enter Matching ID...",
      icon: Text,
    },
    cell: ({ row }) => {
      const matchingId = row.original.matching_id;
      if (!matchingId) return "";
      return (
        <div className="flex items-center gap-2">
          <span>{matchingId.slice(0, 8)}...</span>
          <CopyButton text={matchingId} />
        </div>
      );
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "last_bundle",
    id: "Bundle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bundle" />
    ),

    enableColumnFilter: true,
  },
  {
    accessorKey: "status",
    id: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },

    meta: {
      label: "Status",
      variant: "text",
      placeholder: "Enter SIM Status...",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "number",
    id: "number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },

    meta: {
      label: "SIM Number",
      variant: "text",
      placeholder: "Enter SIM Number...",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "installed_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Installed At" />
    ),
    cell: ({ row }) => {
      const value = row.original.installed_at;
      return (
        <span className="text-center mr-4 block">
          {value === null || value === undefined ? "—" : value}
        </span>
      );
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "created_at",
    id: "created_at",
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
  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <EsimActions esim={row.original} />,
    enableColumnFilter: true,
  },
];

function EsimActions({ esim }: { esim: MyESIM }) {
  const pathname = usePathname();

  if (esim.status === "FAILED") return null;

  return (
    <div className="flex items-center justify-between">
      <Link
        href={`${
          pathname.startsWith("/reseller") ? "/reseller" : "/dealer"
        }/my-esims/${esim.id}`}
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
