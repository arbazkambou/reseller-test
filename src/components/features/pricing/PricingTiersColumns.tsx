"use client";

import { DataTableColumnHeader } from "@/components/shared/data-table/DataTableColumnHeader";
import ConfirmAction from "@/components/shared/dialog/ConfirmAction";
import MyDialog from "@/components/shared/dialog/MyDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deletePricingTiers } from "@/services/pricing.services";
import { PriceTier } from "@/types/pricing.types";
import { IconDotsVertical } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const PricingTiersColumns: ColumnDef<PriceTier>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "percentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Default Percentage" />
    ),
  },
  {
    accessorKey: "default",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Is Default" />
    ),
  },
  {
    accessorKey: "assigned_users",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assigned Users" />
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
    cell: ({ row }) => <PricingTiersActions priceTier={row.original} />,
  },
];

function PricingTiersActions({ priceTier }: { priceTier: PriceTier }) {
  const [isConfirm, setIsConfirm] = useState(false);
  const [show, setShow] = useState(false);

  const { mutate: deletePricingTiersApi, isPending } = useMutation({
    mutationFn: deletePricingTiers,
    mutationKey: ["delete-pricing-tier"],
    onSuccess: (message) => {
      toast.success(message);
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

  const router = useRouter();
  return (
    <>
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
              // router.push(`/my-esims/${esim.id}`);
            }}
          >
            Edit
          </DropdownMenuItem>
          <MyDialog
            dialogTitle="Delete"
            dialogDescription="Are you sure you want to delete?"
            dialogTrigger={
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  // router.push(`/my-esims/${esim.id}`);
                }}
              >
                Delete
              </DropdownMenuItem>
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
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
