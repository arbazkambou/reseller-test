import React, { Suspense } from "react";
import PricingSkeleton from "@/components/shared/skeltons/PricingSkeleton";
import GetPricing from "@/components/features/pricing/GetPricing";

export default function Page() {
  return (
    <>
      <h1 className="text-2xl font-medium text-primary">Add Pricing</h1>
      <Suspense fallback={<PricingSkeleton />}>
        <GetPricing />
      </Suspense>
    </>
  );
}
