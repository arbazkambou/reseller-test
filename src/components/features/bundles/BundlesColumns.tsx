"use client";

import { DataTableColumnHeader } from "@/components/shared/data-table/DataTableColumnHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bundle } from "@/types/bundles.types";
import { IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const BundlesColumn: ColumnDef<Bundle>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Package ID" />
    ),
  },
  {
    accessorKey: "sim_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sim ID" />
    ),
  },
  {
    accessorKey: "iccid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sim ICCID" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Package Name" />
    ),
  },
  {
    accessorKey: "initial_data_in_bytes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data Total" />
    ),
  },
  {
    accessorKey: "data_usage_remaining_in_bytes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Remaining Data" />
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <BundlesAction bundle={row.original} />,
  },
];

function BundlesAction({ bundle }: { bundle: Bundle }) {
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
            router.push(`/my-esims/${bundle.sim_id}`);
          }}
        >
          View Details
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
