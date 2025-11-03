import { getQueryStringFromServer } from "@/hooks/getQueryStringFromServer";
import { queryKeys } from "@/lib/query-keys/keys";
import { getDealerDetail } from "@/services/dealer.services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import DealerEsims from "./DealerEsims";

async function GetEsimPurchased({
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
    queryKey: [queryKeys.dealers.esim, searchQuery],
    queryFn: () => getDealerDetail({ queryString, dealerId: id }),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DealerEsims initialSearch={searchQuery} dealerId={id} />
      </HydrationBoundary>
    </>
  );
}

export default GetEsimPurchased;
