import { getQueryStringFromServer } from "@/hooks/getQueryStringFromServer";
import { queryKeys } from "@/lib/query-keys/keys";
import { getPricingTiers } from "@/services/pricing.services";
import { QueryClient } from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import PriceTiers from "./PriceTiers";

async function GetPricingTiers({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const queryClient = new QueryClient();
  const searchQuery = await searchParams;
  const queryString = getQueryStringFromServer(searchQuery);

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.pricing.tier, queryString],
    queryFn: () => getPricingTiers({ queryString }),
  });

  return <PriceTiers initialSearch={searchQuery} />;
}

export default GetPricingTiers;
