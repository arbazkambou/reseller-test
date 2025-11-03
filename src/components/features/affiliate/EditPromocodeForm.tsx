"use client";

import FormInputField from "@/components/shared/form-elements/FormInputField";
import SpinnerMini from "@/components/shared/skeltons/SpinnerMini";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import z from "zod";
import { updatePromocode } from "@/services/promocode.services";
import { EditPromoSchema } from "@/lib/zod-schemas/EditPromoSchema";

export function EditPromocodeForm({
  promoId,
  defaultValue,
  setShowDialog,
}: {
  promoId: string;
  defaultValue: string;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof EditPromoSchema>>({
    resolver: zodResolver(EditPromoSchema),
    defaultValues: { promocode: defaultValue },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof EditPromoSchema>) =>
      updatePromocode(promoId, values),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Promocode updated successfully!");
        setShowDialog(false);
        queryClient.invalidateQueries({ queryKey: ["get-promos"] });
      } else {
        toast.error(data.message || "Failed to update promocode");
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => mutate(values))}
        className="space-y-4"
      >
        <FormInputField
          control={form.control}
          label="Promocode"
          name="promocode"
          type="text"
          disabled={isPending}
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? <SpinnerMini /> : "Save"}
        </Button>
      </form>
    </Form>
  );
}
