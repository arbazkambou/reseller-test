import { queryKeys } from "@/lib/query-keys/keys";
import { getCredits } from "@/services/credits.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import Credits from "./Credits";
import { getQueryStringFromServer } from "@/hooks/getQueryStringFromServer";

async function GetCredits({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const queryClient = new QueryClient();
  const searchQuery = await searchParams;
  const queryString = getQueryStringFromServer(searchQuery);
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.credits.get, queryString],
    queryFn: () => getCredits({ queryString }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Credits initialSearch={searchQuery} />
    </HydrationBoundary>
  );
}

export default GetCredits;
