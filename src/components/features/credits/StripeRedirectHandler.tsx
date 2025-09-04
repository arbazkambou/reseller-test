"use client";

import { handleStripeRedirect } from "@/services/credits.services";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface StripeRedirectHandlerProps {
  result: string;
  searchParams?: URLSearchParams;
}

export function StripeRedirectHandler({
  result,
  searchParams,
}: StripeRedirectHandlerProps) {
  const router = useRouter();

  const { mutate: handleRedirect, isPending } = useMutation({
    mutationFn: () => {
      // Extract parameters directly from the current URL
      const urlParams = new URLSearchParams(window.location.search);
      const params: Record<string, string> = {};

      urlParams.forEach((value, key) => {
        params[key] = value;
      });

      return handleStripeRedirect(result, params);
    },
    mutationKey: ["stripe-redirect", result],
    onSuccess: (data) => {
      if (data.status) {
        if (data.data?.status === "pending_review") {
          toast.success("Payment submitted for review");
        } else if (data.data?.status === "succeeded") {
          toast.success("Payment successful! Your wallet has been topped up.");
        }
      } else {
        toast.error(data.message || "Payment processing failed");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to process payment result");
    },
  });

  useEffect(() => {
    if (result && searchParams) {
      // Use setTimeout to avoid performance measurement issues
      const timer = setTimeout(() => {
        try {
          handleRedirect();
        } catch (error) {
          console.error("Error handling redirect:", error);
          toast.error("Failed to process payment result");
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [result, searchParams, handleRedirect]);

  const getStatusInfo = () => {
    switch (result) {
      case "success":
        return {
          icon: <CheckCircle className="h-16 w-16 text-green-500" />,
          title: "Payment Successful!",
          description:
            "Your payment has been processed successfully. Your wallet has been topped up with the payment amount.",
          color: "text-green-600",
        };
      case "failed":
        return {
          icon: <XCircle className="h-16 w-16 text-red-500" />,
          title: "Payment Failed",
          description:
            "We couldn't process your payment. Please check your payment details and try again.",
          color: "text-red-600",
        };
      default:
        return {
          icon: <Clock className="h-16 w-16 text-yellow-500" />,
          title: "Processing Payment",
          description:
            "We're currently processing your payment. This may take a few moments...",
          color: "text-yellow-600",
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-6">
            <div
              className={`p-4 rounded-full ${
                result === "success"
                  ? "bg-green-50"
                  : result === "failed"
                  ? "bg-red-50"
                  : "bg-yellow-50"
              }`}
            >
              {statusInfo.icon}
            </div>
          </div>
          <CardTitle className={`text-2xl font-semibold ${statusInfo.color}`}>
            {statusInfo.title}
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {statusInfo.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6 pb-8">
          {isPending && (
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span>Verifying payment status...</span>
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={() => router.push("/credits")}
              variant="outline"
              className="w-full h-11 text-base font-medium"
            >
              Back to Credits
            </Button>
            <Button
              onClick={() => router.push("/topup")}
              variant="ghost"
              className="w-full h-11 text-base"
            >
              Topup Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
