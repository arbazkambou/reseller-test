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
import { AddCreditFormSchema } from "@/lib/zod-schemas/AddCreditFormSchema";
import { addDealerCredit } from "@/services/credits.services";
import { Dealer } from "@/types/dealers.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export function AddCreditForm({
  dealer,
  setShowDialog,
}: {
  dealer: Dealer;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { id } = dealer;

  const form = useForm<z.input<typeof AddCreditFormSchema>>({
    resolver: zodResolver(AddCreditFormSchema),
    defaultValues: {
      description: "",
      amount: 0,
      type: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate: addDealerCreditApi, isPending: isCreditAdding } = useMutation(
    {
      mutationFn: addDealerCredit,
      mutationKey: ["add-dealer-credit"],
      onSuccess: (data) => {
        if (!data.status) {
          toast.error(data.message);
          return;
        }
        queryClient.invalidateQueries({ queryKey: [queryKeys.dealers.get] });

        toast.success(data.message);
        form.reset();
        setShowDialog(false);
      },
      onError: (error) => toast.error(error.message),
    }
  );

  const { control, handleSubmit } = form;

  const typeOptions: SelectOption[] = [
    { label: "Refill", value: "refill" },
    { label: "Refund", value: "refund" },
  ];

  function onSubmit(values: z.infer<typeof AddCreditFormSchema>) {
    addDealerCreditApi({ dealerId: String(id), ...values });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(
          onSubmit as SubmitHandler<z.input<typeof AddCreditFormSchema>>
        )}
        className="space-y-4"
      >
        <FormInputField
          control={control}
          label="Description"
          name="description"
          type="text"
          placeholder="Description"
          disabled={isCreditAdding}
        />
        <FormInputField
          control={control}
          label="Amount"
          name="amount"
          type="number"
          placeholder="Amount"
          disabled={isCreditAdding}
        />
        <FormSelectField
          name="type"
          control={control}
          label="Type"
          options={typeOptions}
          placeholder="--SELECT TYPE"
          selectTriggerClassName="w-2/3"
          disabled={isCreditAdding}
        />
        <Button type="submit" disabled={isCreditAdding}>
          {isCreditAdding ? <SpinnerMini /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
