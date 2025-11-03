import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  RefreshCcw,
  XCircle,
} from "lucide-react";
import Link from "next/link";

export async function PaymentResult({
  isSuccess,
  message,
}: {
  isSuccess: boolean;
  message: string;
}) {
  const session = await auth();
  const Title = isSuccess ? "Top-Up Successful!" : "Top-Up Failed";
  const successMessage = message
    ? message
    : "Your wallet has been refilled successfully. You can now continue using your balance.";
  const failedMessage = message
    ? message
    : "Unfortunately, your wallet could not be refilled. Please try again or contact support if the issue persists.";
  const Desc = isSuccess ? successMessage : failedMessage;

  const Icon = isSuccess ? CheckCircle2 : XCircle;
  const iconColor = isSuccess ? "text-primary" : "text-destructive";

  return (
    <Card
      role="status"
      aria-live="polite"
      className="mx-auto w-full max-w-xl border ring-1 ring-inset ring-border shadow-sm"
    >
      <CardHeader className="text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-muted ring-4 ring-background shadow">
          <Icon className={`h-8 w-8 ${iconColor}`} aria-hidden="true" />
          <span className="sr-only">{isSuccess ? "Success" : "Failed"}</span>
        </div>
        <CardTitle className="text-balance text-2xl">{Title}</CardTitle>
        <CardDescription className="text-pretty">{Desc}</CardDescription>
      </CardHeader>

      <CardContent className="mx-auto grid w-full max-w-sm gap-2 text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-muted" aria-hidden="true" />
          <span>
            Payment status: {isSuccess ? "Completed" : "Not completed"}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
        {isSuccess ? (
          <>
            <Button asChild className="sm:w-auto">
              <Link href={`/${session?.user.role}/data-only-esim`}>
                <Cpu className="mr-2 h-4 w-4" />
                By eSIMs
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="sm:w-auto bg-transparent"
            >
              <Link href={`/${session?.user.role}`}>
                <ArrowRight className="mr-2 h-4 w-4" />
                Go to dashboard
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button asChild className="sm:w-auto">
              <Link href={`/${session?.user.role}/topup`}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Try again
              </Link>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
