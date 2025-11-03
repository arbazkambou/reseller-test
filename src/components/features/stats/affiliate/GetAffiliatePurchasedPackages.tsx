import { getQueryStringFromServer } from "@/hooks/getQueryStringFromServer";
import { queryKeys } from "@/lib/query-keys/keys";
import { getAffiliatePurchasedPackages } from "@/services/affiliate/stats.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import { AffiliatePurchasedPackages } from "./AffiliatePurchasedPackages";

async function GetAffiliatePurchasedPackages({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const queryClient = new QueryClient();
  const searchQuery = await searchParams;
  const queryString = getQueryStringFromServer(searchQuery);

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.affiliate.packages],
    queryFn: () => getAffiliatePurchasedPackages({ queryString }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AffiliatePurchasedPackages initialSearch={searchQuery} />
    </HydrationBoundary>
  );
}

export default GetAffiliatePurchasedPackages;
