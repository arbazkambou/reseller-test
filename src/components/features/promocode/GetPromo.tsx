import { queryKeys } from "@/lib/query-keys/keys";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import { getQueryStringFromServer } from "@/hooks/getQueryStringFromServer";
import Promo from "./Promo";
import { getPromoCodes } from "@/services/promocode.services";

async function GetPromo({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const queryClient = new QueryClient();
  const searchQuery = await searchParams;
  const queryString = getQueryStringFromServer(searchQuery);
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.promos.get, queryString],
    queryFn: () => getPromoCodes({ queryString }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Promo initialSearch={searchQuery} />
    </HydrationBoundary>
  );
}

export default GetPromo;
