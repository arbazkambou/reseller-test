"use client";

import { DataTableColumnHeader } from "@/components/shared/data-table/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

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

export const MyESIMColumns: ColumnDef<MyESIM>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "iccid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ICCID" />
    ),
  },
 
  {
    accessorKey: "smdp_address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SMDP + Address" />
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "installed_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Installed at (EST)" />
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at (EST)" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <EsimActions esim={row.original} />,
  },
];

function EsimActions({ esim }: { esim: MyESIM }) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
          size="icon"
        >
          <IconDotsVertical />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            router.push(`/my-esims/${esim.id}`);
          }}
        >
          View Details
        </DropdownMenuItem>
       
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
