"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import errorImg from "@/_assets/svgs/errorImg.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, RefreshCw, AlertTriangle } from "lucide-react";
import { ResellerNavItemsData, DealerNavItemsData } from "@/lib/data/data";
import { usePathname } from "next/navigation";

export const metadata = {
  title: "Something went wrong!",
};

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isRetrying, setIsRetrying] = useState(false);

  const pathname = usePathname();

  const navLinks = pathname.startsWith("/reseller")
    ? ResellerNavItemsData
    : DealerNavItemsData;

  useEffect(() => {
    // Log error details for debugging
    console.error("Error boundary caught an error:", {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  const handleRetry = async () => {
    setIsRetrying(true);

    try {
      // Add a small delay before hard reload
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Perform hard reload
      window.location.reload();
    } catch (retryError) {
      console.error("Retry failed:", retryError);
      setIsRetrying(false);
    }
  };

  const getErrorMessage = () => {
    if (error.message.includes("Network")) {
      return "We're having trouble connecting to our servers. Please check your internet connection and try again.";
    }
    if (error.message.includes("timeout")) {
      return "The request took too long to complete. Please try again.";
    }
    return "We're experiencing temporary technical difficulties. Our team has been notified and is working to resolve this issue.";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="mb-8 flex justify-center md:hidden">
          <div className="relative h-48 w-64 rounded-2xl bg-muted/50 p-4">
            <Image
              src={errorImg}
              alt="Something went wrong illustration"
              fill
              sizes="(max-width: 768px) 256px, 0px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="grid gap-8 md:gap-16 lg:grid-cols-[1fr_auto] lg:gap-24">
          {/* Main Content */}
          <div className="flex flex-col gap-6">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="font-montserrat text-xl font-bold tracking-tight text-foreground md:text-2xl lg:text-3xl flex items-center">
                <div className="flex h-12 w-12 items-center justify-center">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                Something Went Wrong
              </h1>

              <p className="text-base text-muted-foreground md:text-lg">
                {getErrorMessage()}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                onClick={handleRetry}
                disabled={isRetrying}
                size="lg"
                className="inline-flex items-center gap-2"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`}
                />
                {isRetrying ? "Retrying..." : "Try Again"}
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href="/" className="inline-flex items-center gap-2">
                  <ArrowBigLeft className="h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>

            {/* Error Details (Development) */}
            {process.env.NODE_ENV === "development" && (
              <details className="mt-6 w-full max-w-full rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                <summary className="cursor-pointer font-medium text-destructive">
                  Error Details (Development Only)
                </summary>
                <div className="mt-2 w-full overflow-hidden">
                  <pre className="max-h-64 w-full overflow-auto whitespace-pre-wrap break-words text-xs text-muted-foreground sm:whitespace-pre">
                    {error.stack}
                  </pre>
                </div>
              </details>
            )}

            {/* Quick Navigation */}
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold">Quick Navigation</h2>
              <p className="text-muted-foreground">
                While we fix this issue, you can navigate to other sections of
                the portal:
              </p>

              <nav
                aria-label="Portal quick links"
                className="rounded-lg border border-border bg-card/50 p-6 shadow-sm"
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {navLinks
                    .filter((item) => !item.isCollapsible)
                    .map((item) => (
                      <Button
                        key={item.title}
                        asChild
                        variant="ghost"
                        className="justify-start text-left hover:bg-primary/10 w-full"
                      >
                        <Link
                          href={item.url}
                          className="inline-flex items-center gap-2"
                        >
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.title}</span>
                        </Link>
                      </Button>
                    ))}
                </div>
              </nav>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-8">
              <div className="relative h-[400px] w-[480px] rounded-3xl bg-muted/30 p-8">
                <Image
                  src={errorImg}
                  alt="Something went wrong illustration"
                  fill
                  sizes="(min-width: 1024px) 480px, 0px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 space-y-6 border-border pt-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">
              Why Choose Our Reseller Portal?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Even when errors happen, we`&apos;`re committed to providing you
              with the best experience
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Easy eSIM Management",
              "Dealer & Reseller Tools",
              "Transparent Pricing",
              "24/7 Partner Support",
            ].map((feature) => (
              <div
                key={feature}
                className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center"
              >
                <p className="font-medium text-primary">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
