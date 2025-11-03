"use client";

import FormInputField from "@/components/shared/form-elements/FormInputField";
import SpinnerMini from "@/components/shared/skeltons/SpinnerMini";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { TopupFormSchema } from "@/lib/zod-schemas/TopupFormSchema";
import { createStripeSession } from "@/services/credits.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export function TopupForm() {
  const { data: session } = useSession();
  const form = useForm<z.input<typeof TopupFormSchema>>({
    resolver: zodResolver(TopupFormSchema),
    defaultValues: {
      amount: 10,
    },
  });

  const { mutate: createStripeSessionApi, isPending: isCreatingSession } =
    useMutation({
      mutationFn: createStripeSession,
      mutationKey: ["create-stripe-session"],
      onSuccess: (data) => {
        if (!data.status) {
          toast.error(data.message);
          return;
        }

        if ("data" in data) {
          toast.success("Redirecting to payment...");
          // Redirect to Stripe checkout
          if (data.data?.stripe_checkout_url) {
            window.open(data.data.stripe_checkout_url, "_blank");
          }
        }
      },
      onError: (error) => toast.error(error.message),
    });

  const { control, handleSubmit } = form;

  function onSubmit(values: z.infer<typeof TopupFormSchema>) {
    let redirect_url = "";
    if (session) {
      redirect_url = `${window.location.origin}/${session.user.role}/payment`;
    }
    createStripeSessionApi({ inputs: values, redirect_url });
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Topup Wallet</CardTitle>
        <CardDescription>
          Add funds to your wallet using secure Stripe payment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(
              onSubmit as SubmitHandler<z.input<typeof TopupFormSchema>>
            )}
            className="space-y-4"
          >
            <div className="text-sm text-muted-foreground mb-4">
              <p>• Minimum amount: $10</p>
              <p>• Secure payment via Stripe</p>
              <p>• Instant wallet credit after successful payment</p>
            </div>
            <FormInputField
              control={control}
              label="Amount ($)"
              name="amount"
              type="number"
              placeholder="Enter amount (minimum $10)"
              disabled={isCreatingSession}
              min={10}
              step={0.01}
              className="max-w-md"
            />
            <Button
              type="submit"
              disabled={isCreatingSession}
              className="w-md max-w-full"
            >
              {isCreatingSession ? (
                <>
                  <SpinnerMini />
                  Processing...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
