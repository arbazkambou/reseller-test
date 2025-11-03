"use client";

import { GenericDataTable } from "@/components/data-table-server/DataTableServer";
import { DataTableSkeleton } from "@/components/shared/skeltons/DataTableSkelton";
import { useSyncedSearchQuery } from "@/hooks/useSyncedSearchQuery";
import { queryKeys } from "@/lib/query-keys/keys";
import { getDealerDetail } from "@/services/dealer.services";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import { DealerRefillColumns } from "./details/RefillColumns";

function DealerCredits({
  initialSearch,
  dealerId,
}: {
  initialSearch: SearchParams;
  dealerId: string;
}) {
  const { searchQuery, queryString } = useSyncedSearchQuery(initialSearch);

  const { data, isLoading, isSuccess, isFetching } = useQuery({
    queryKey: [queryKeys.dealers.credits, searchQuery],
    queryFn: () => getDealerDetail({ queryString, dealerId }),
    placeholderData: keepPreviousData,
  });

  if (isLoading && !data) {
    return <DataTableSkeleton columnCount={5} />;
  }

  if (!isSuccess && !data) {
    throw new Error("Could not get all time overview");
  }

  return (
    <GenericDataTable
      data={data.data.refill_history.data}
      columns={DealerRefillColumns}
      pageCount={data.data.refill_history.pagination.totalPages}
      initialState={{
        // sorting: [{ id: "amount", desc: true }],
        columnPinning: { right: ["actions"] },
        pagination: {
          pageIndex: 1,
          pageSize: data.data.refill_history.pagination.limit,
        },
      }}
      isLoading={isFetching}
      exportTitle="Dealer Credits"
      exportFilename="dealerCredits"
      applyFilter={false}
    />
  );
}

export default DealerCredits;
