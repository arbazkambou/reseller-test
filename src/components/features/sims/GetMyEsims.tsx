import { getQueryStringFromServer } from "@/hooks/getQueryStringFromServer";
import { queryKeys } from "@/lib/query-keys/keys";
import { getMyEsims } from "@/services/sims.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import MyEsims from "./MyEsims";

async function GetMyEsims({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const queryClient = new QueryClient();
  const searchQuery = await searchParams;
  const queryString = getQueryStringFromServer(searchQuery);
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.sims.myEsims, queryString],
    queryFn: () => getMyEsims({ queryString }),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyEsims initialSearch={searchQuery} />
      </HydrationBoundary>
    </>
  );
}

export default GetMyEsims;
