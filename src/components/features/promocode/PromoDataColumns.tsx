"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Text } from "lucide-react";
import { formatDateTime } from "@/helpers/dateFormat";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExtendedColumnDef } from "@/types/downloadFiles.types";
import { formatDateCsv } from "@/helpers/formatDate";
import EditPromocodeDialog from "../affiliate/EditPromocodeDialog";
import { PromoCode } from "@/types/promocode.types";

export const PromoColumns: ExtendedColumnDef<PromoCode>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    meta: {
      label: "Promo ID",
      variant: "text",
      placeholder: "Enter Promo ID...",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    id: "promocode",
    accessorKey: "promocode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Promo Code/Referral" />
    ),
    meta: {
      label: "Promo Code",
      variant: "text",
      placeholder: "Enter Promo Code...",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    id: "referral_link",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Referral Link" />
    ),
    cell: ({ row }) => {
      const promo = row.original.promocode;
      const referralUrl = `https://esimcard.com/?referral=${promo}`;
      return (
        <a
          href={referralUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline hover:text-primary"
        >
          {referralUrl}
        </a>
      );
    },
    enableColumnFilter: false,
  },
  {
    id: "discount_percentage",
    accessorKey: "discount_percentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Own Discount (%)" />
    ),
    cell: ({ row }) => (
      <div className="text-center mr-4  ">
        {row.original.discount_percentage}%
      </div>
    ),
    meta: {
      label: "Affiliate Discount",
      variant: "text",
      placeholder: "Enter Affiliate Discount...",
      icon: Text,
    },
  },
  {
    id: "user_discount_percentage",
    accessorKey: "user_discount_percentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer Discount (%)" />
    ),
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.user_discount_percentage}%
      </div>
    ),
    meta: {
      label: "Customer Discount",
      variant: "text",
      placeholder: "Enter Customer Discount...",
      icon: Text,
    },
  },
  {
    id: "duration",
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => <span>{row.original.duration}</span>,
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
    cell: ({ row }) => <PromoActions promocode={row.original} />,
    enableColumnFilter: false,
  },
];

function PromoActions({ promocode }: { promocode: PromoCode }) {
  return (
    <TooltipProvider>
      <div className="flex items-center justify-start">
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <EditPromocodeDialog promocode={promocode} />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-sm">
            Edit Promo Code
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
