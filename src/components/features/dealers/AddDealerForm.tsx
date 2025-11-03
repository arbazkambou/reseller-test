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
import { AddDealerFormSchema } from "@/lib/zod-schemas/AddDealerFormSchema";
import { addDealer } from "@/services/dealer.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export function AddDealerForm({
  setShowDialog,
}: {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof AddDealerFormSchema>>({
    resolver: zodResolver(AddDealerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      status: "",
    },
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

  const queryClient = useQueryClient();

  const { mutate: addDealerApi, isPending } = useMutation({
    mutationFn: addDealer,
    mutationKey: ["add-dealer"],
    onSuccess: (data) => {
      if (!data.status) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [queryKeys.dealers.get] });

      form.reset();
      setShowDialog(false);
    },

    onError: (err) => toast.error(err.message),
  });

  function onSubmit(values: z.infer<typeof AddDealerFormSchema>) {
    addDealerApi({ ...values });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInputField
          control={control}
          label="Name"
          name="name"
          type="text"
          disabled={isPending}
        />
        <FormInputField
          control={control}
          label="Email"
          name="email"
          type="email"
          disabled={isPending}
        />
        <FormInputField
          control={control}
          label="Password"
          name="password"
          type="password"
          showTogglePassword
          disabled={isPending}
        />
        <FormInputField
          control={control}
          label="Confirm Password"
          name="password_confirmation"
          type="password"
          showTogglePassword
          disabled={isPending}
        />

        <FormSelectField
          name="status"
          control={control}
          label="Status"
          options={options}
          placeholder="Select a status"
          selectTriggerClassName="w-2/3"
          disabled={isPending}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? <SpinnerMini /> : "Add Dealer"}
        </Button>
      </form>
    </Form>
  );
}
