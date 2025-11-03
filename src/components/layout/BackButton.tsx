"use client";

import { useRouter } from "next/navigation";
import { ArrowBigLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BackButton({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      title="Go back"
      className={cn(
        "size-7 text-primary hover:text-foreground transition-colors",
        className
      )}
    >
      <ArrowBigLeft/>
      <span className="sr-only">Go back</span>
    </Button>
  );
}
