import { getQueryStringFromServer } from "@/hooks/getQueryStringFromServer";
import { queryKeys } from "@/lib/query-keys/keys";
import { getDealerDetail } from "@/services/dealer.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import DealerBundles from "./DealerBundles";

async function GetBundlePurchased({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();
  const searchQuery = await searchParams;
  const queryString = getQueryStringFromServer(searchQuery);
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.dealers.bundles, searchQuery],
    queryFn: () => getDealerDetail({ queryString, dealerId: id }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DealerBundles initialSearch={searchQuery} dealerId={id} />
    </HydrationBoundary>
  );
}

export default GetBundlePurchased;
