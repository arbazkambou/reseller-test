import { getQueryStringFromServer } from "@/hooks/getQueryStringFromServer";
import { queryKeys } from "@/lib/query-keys/keys";
import { getBundles } from "@/services/bundles.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import Bundles from "./Bundles";

async function GetBundles({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const queryClient = new QueryClient();
  const searchQuery = await searchParams;
  const queryString = getQueryStringFromServer(searchQuery);
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.reseller.bundles, queryString],
    queryFn: () => getBundles({ queryString }),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Bundles initialSearch={searchQuery} />
      </HydrationBoundary>
    </>
  );
}

export default GetBundles;
