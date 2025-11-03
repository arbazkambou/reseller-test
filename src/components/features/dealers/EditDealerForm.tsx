"use client";

import FormInputField from "@/components/shared/form-elements/FormInputField";
import {
  FormSelectField,
  SelectOption,
} from "@/components/shared/form-elements/FormSelectField";
import SpinnerMini from "@/components/shared/skeltons/SpinnerMini";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { queryKeys } from "@/lib/query-keys/keys";
import { UpdateDealerFormSchema } from "@/lib/zod-schemas/EditDealerFormSchema";
import { updateDealer } from "@/services/dealer.services";
import { Dealer } from "@/types/dealers.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export function EditDealerForm({
  dealer,
  setShowDialog,
}: {
  dealer: Dealer;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { name, email, status, id } = dealer;
  const statusValue = status === "active" ? "1" : "0";

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof UpdateDealerFormSchema>>({
    resolver: zodResolver(UpdateDealerFormSchema),
    defaultValues: {
      name,
      email,
      password: "",
      password_confirmation: "",
      status: statusValue,
    },
  });

  const { mutate: updateDealerApi, isPending: isDealerUpdating } = useMutation({
    mutationFn: updateDealer,
    mutationKey: ["update-dealer"],
    onSuccess: (data) => {
      if (!data.status) {
        toast.error(data.message);
        return;
      }
      setShowDialog(false);
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [queryKeys.dealers.get] });

      form.reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { control } = form;

  const options: SelectOption[] = [
    {
      label: "Active",
      value: "1",
    },
    {
      label: "InActive",
      value: "0",
    },
  ];

  function onSubmit(values: z.infer<typeof UpdateDealerFormSchema>) {
    updateDealerApi({ dealerId: String(id), ...values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInputField
          control={control}
          label="Name"
          name="name"
          type="text"
          disabled={isDealerUpdating}
        />
        <FormInputField
          control={control}
          label="Email"
          name="email"
          type="email"
          disabled={isDealerUpdating}
        />
        <FormInputField
          control={control}
          label="Password"
          name="password"
          type="password"
          showTogglePassword
          disabled={isDealerUpdating}
        />
        <FormInputField
          control={control}
          label="Confirm Password"
          name="password_confirmation"
          showTogglePassword
          type="password"
          disabled={isDealerUpdating}
        />

        <FormSelectField
          name="status"
          control={control}
          label="Status"
          options={options}
          placeholder="Select a status"
          selectTriggerClassName="w-2/3"
          disabled={isDealerUpdating}
        />
        <Button type="submit" disabled={isDealerUpdating}>
          {isDealerUpdating ? <SpinnerMini /> : "Update"}
        </Button>
      </form>
    </Form>
  );
}
