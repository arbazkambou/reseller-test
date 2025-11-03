import { getQueryStringFromServer } from "@/hooks/getQueryStringFromServer";
import { queryKeys } from "@/lib/query-keys/keys";
import { getDealerDetail } from "@/services/dealer.services";
import { QueryClient } from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import DealerCredits from "./DealerCredits";

async function GetDeallerCredits({
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
    queryKey: [queryKeys.dealers.credits, searchQuery],
    queryFn: () => getDealerDetail({ queryString, dealerId: id }),
  });
  return <DealerCredits dealerId={id} initialSearch={searchQuery} />;
}

export default GetDeallerCredits;
