"use client";

import FormInputField from "@/components/shared/form-elements/FormInputField";
import SpinnerMini from "@/components/shared/skeltons/SpinnerMini";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  AccountUpdateFormInputs,
  getAccountUpdateFormSchema,
} from "@/lib/zod-schemas/AccountUpdateFormSchema";
import { updateUser } from "@/services/auth.services";
import { User } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AccountUpdateForm({
  isDealer,
  user,
}: {
  isDealer: boolean;
  user: User;
}) {
  const { gateway_details, name } = user;
  const form = useForm<AccountUpdateFormInputs>({
    resolver: zodResolver(getAccountUpdateFormSchema(isDealer)),
    defaultValues: {
      name,
      newPassword: "",
      confirmPassword: "",
      apiKey: "",
      apiSecret: "",
    },
    mode: "onChange",
  });

  const { mutate: updateUserApi, isPending } = useMutation({
    mutationFn: updateUser,
    mutationKey: ["update-user"],
    onSuccess: (data) => {
      if (!data.status) {
        toast.error(data.message);
      }
      toast.success(data.message);

      form.reset();
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name ?? "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user, form]);

  function onSubmit(values: AccountUpdateFormInputs) {
    updateUserApi(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-pretty">
          Update Account {!isDealer && " & Stripe"} Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Account section */}
            <div className="space-y-6">
              <div className="grid gap-6">
                <FormInputField
                  control={form.control}
                  label="Name"
                  name="name"
                  placeholder="Enter your name"
                  type="text"
                  className="max-w-[500px]"
                  disabled={isPending}
                />
                <FormInputField
                  className="max-w-[500px]"
                  control={form.control}
                  label="Password"
                  name="newPassword"
                  placeholder="Enter a strong password"
                  type="password"
                  showTogglePassword
                  disabled={isPending}
                />
                <FormInputField
                  className="max-w-[500px]"
                  control={form.control}
                  label="Confirm password"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  type="password"
                  showTogglePassword
                  disabled={isPending}
                />
              </div>
            </div>

            {!isDealer && (
              <>
                <Separator />

                {/* Stripe section */}
                <div className="grid gap-6">
                  <h2 className="text-lg font-medium">Stripe Details</h2>

                  <FormInputField
                    className="max-w-[500px]"
                    control={form.control}
                    label="API key"
                    name="apiKey"
                    placeholder={
                      gateway_details
                        ? gateway_details.key
                        : "Enter your stripe key"
                    }
                    type="text"
                    disabled={isPending}
                  />
                  <FormInputField
                    className="max-w-[500px]"
                    control={form.control}
                    label="API Secret"
                    name="apiSecret"
                    placeholder={
                      gateway_details
                        ? gateway_details.secret
                        : "Enter your stripe secret"
                    }
                    type="text"
                    disabled={isPending}
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-fit" disabled={isPending}>
              {isPending ? <SpinnerMini /> : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
