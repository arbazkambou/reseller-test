"use client";

import { DataTableColumnHeader } from "@/components/shared/data-table/DataTableColumnHeader";
import ConfirmAction from "@/components/shared/dialog/ConfirmAction";
import MyDialog from "@/components/shared/dialog/MyDialog";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/helpers/dateFormat";
import { formatDateCsv } from "@/helpers/formatDate";
import { formatNumbers } from "@/helpers/formatNumbers";
import { queryKeys } from "@/lib/query-keys/keys";
import { deletePricingTiers } from "@/services/pricing.services";
import { ExtendedColumnDef } from "@/types/downloadFiles.types";
import { PriceTier } from "@/types/pricing.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SquarePen, Text, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const PricingTiersColumns: ExtendedColumnDef<PriceTier>[] = [
  {
    accessorKey: "id",
    id: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),

    meta: {
      label: "ID",
      variant: "text",
      placeholder: "Enter Price Tier ID...",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "name",
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    meta: {
      label: "Name",
      variant: "text",
      placeholder: "Enter Price Tier Name...",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: "percentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Default Percentage" />
    ),
    enableColumnFilter: true,
    cell: ({ row }) => {
      const value = row.getValue("percentage") as number | string | null;
      if (value === null || value === undefined || value === "") return "-";
      return <span>{formatNumbers(value)}%</span>;
    },
  },
  {
    accessorKey: "default",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Default" />
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: "assigned_users",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned Users" />
    ),
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
    header: () => <span className="block text-center">Actions</span>,
    cell: ({ row }) => <PricingTiersActions priceTier={row.original} />,
    enableColumnFilter: true,
  },
];

function PricingTiersActions({ priceTier }: { priceTier: PriceTier }) {
  const pathname = usePathname();
  const [isConfirm, setIsConfirm] = useState(false);
  const [show, setShow] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: deletePricingTiersApi, isPending } = useMutation({
    mutationFn: deletePricingTiers,
    mutationKey: ["delete-pricing-tier"],
    onSuccess: (data) => {
      if (!data.status) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [queryKeys.pricing.tier] });
    },
    onError: (error) => toast.error(error.message),
    onSettled: () => {
      setIsConfirm(false);
      setShow(false);
    },
  });

  useEffect(() => {
    if (isConfirm) {
      deletePricingTiersApi(String(priceTier.id));
    }
  }, [isConfirm, deletePricingTiersApi, priceTier.id]);

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <Link
          href={`${
            pathname.startsWith("/reseller") ? "/reseller" : "/dealer"
          }/pricing/manage/update/${priceTier.id}`}
        >
          <Button
            variant={"outline"}
            size={"icon"}
            className="hover:text-primary transition-all"
          >
            <SquarePen />
          </Button>
        </Link>

        <MyDialog
          dialogTitle="Delete"
          dialogDescription="Are you sure you want to delete?"
          dialogTrigger={
            <Button
              variant={"outline"}
              size={"icon"}
              className="hover:text-destructive transition-all"
            >
              <Trash2 />
            </Button>
          }
          dialogContent={
            <ConfirmAction
              setIsConfirm={setIsConfirm}
              isPending={isPending}
              setShow={setShow}
            />
          }
          dialogProps={{ open: show, onOpenChange: setShow }}
        />
      </div>
    </>
  );
}
