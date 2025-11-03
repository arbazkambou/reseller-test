"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Dealer } from "@/types/dealers.types";
import { EyeIcon, Text } from "lucide-react";
import Link from "next/link";
import AddCreditDialog from "./AddCreditDialog";
import EditDealerDialog from "./EditDealerDialog";
import { usePathname } from "next/navigation";
import { formatDateTime } from "@/helpers/dateFormat";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExtendedColumnDef } from "@/types/downloadFiles.types";
import { formatDateCsv } from "@/helpers/formatDate";

export const DealerColumns: ExtendedColumnDef<Dealer>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),

    meta: {
      label: "Dealer ID",
      variant: "text",
      placeholder: "Enter Dealer ID...",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    meta: {
      label: "Dealer Name",
      variant: "text",
      placeholder: "Enter Dealer Name...",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    id: "email",
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    meta: {
      label: "Dealer Email",
      variant: "text",
      placeholder: "Enter Dealer Email...",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    meta: {
      label: "Select Status",
      variant: "select",
      icon: Text,
      options: [
        {
          label: "Active",
          value: "1",
        },
        {
          label: "InActive",
          value: "0",
        },
      ],
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "balance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Balance($)" />
    ),
    cell: ({ row }) => `$${row.original.balance}`,
    enableColumnFilter: true,
  },

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

  {
    id: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Actions"
        className="block text-center"
      />
    ),
    cell: ({ row }) => <DealerActions dealer={row.original} />,
    enableColumnFilter: true,
  },
];

function DealerActions({ dealer }: { dealer: Dealer }) {
  const pathname = usePathname();

  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button
    //       variant="ghost"
    //       className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
    //       size="icon"
    //     >
    //       <IconDotsVertical />
    //       <span className="sr-only">Open menu</span>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end" className="w-32">
    //     <DropdownMenuItem
    //       onSelect={(e) => {
    //         e.preventDefault();
    //         router.push(`/dealers/${dealer.id}`);
    //       }}
    //     >
    //       View
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
    //       <EditDealerDialog dealer={dealer} />
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
    //       <AddCreditDialog dealer={dealer} />
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <TooltipProvider>
      <div className="flex items-center justify-center gap-2">
        {/* View Dealer */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`${
                pathname.startsWith("/reseller") ? "/reseller" : "/dealer"
              }/dealers/${dealer.id}`}
            >
              <Button
                variant="outline"
                size="icon"
                className="hover:text-primary transition-all"
              >
                <EyeIcon className="size-4" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-sm">
            View Details
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <EditDealerDialog dealer={dealer} />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-sm">
            Edit Dealer Info
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <AddCreditDialog dealer={dealer} />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-sm">
            Add Credit to Dealer
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
