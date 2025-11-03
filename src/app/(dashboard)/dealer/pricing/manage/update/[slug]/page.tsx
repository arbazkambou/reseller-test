import UpdatePricingTier from "@/components/features/pricing/UpdatePricingTier";
import PricingSkeleton from "@/components/shared/skeltons/PricingSkeleton";
import { Suspense } from "react";

function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <>
      <h1 className="text-xl lg:text-2xl font-medium text-primary">
        Update Pricing
      </h1>

      <Suspense fallback={<PricingSkeleton />}>
        <UpdatePricingTier params={params} />
      </Suspense>
    </>
  );
}

export default Page;
