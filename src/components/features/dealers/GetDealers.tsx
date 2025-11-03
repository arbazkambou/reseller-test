import { getQueryStringFromServer } from "@/hooks/getQueryStringFromServer";
import { queryKeys } from "@/lib/query-keys/keys";
import { getDealers } from "@/services/dealer.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import Dealers from "./Dealers";

async function GetDealers({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const queryClient = new QueryClient();
  const searchQuery = await searchParams;
  const queryString = getQueryStringFromServer(searchQuery);

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.dealers.get, queryString],
    queryFn: () => getDealers({ queryString }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dealers initialSearch={searchQuery} />
    </HydrationBoundary>
  );
}

export default GetDealers;
