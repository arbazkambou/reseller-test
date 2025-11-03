"use client";

import { GenericDataTable } from "@/components/data-table-server/DataTableServer";
import { DataTableSkeleton } from "@/components/shared/skeltons/DataTableSkelton";
import { useQueryString } from "@/hooks/useQueryString";
import { queryKeys } from "@/lib/query-keys/keys";
import { getPricingTiers } from "@/services/pricing.services";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import { PricingTiersColumns } from "./PricingTiersColumns";

function PriceTiers({ initialSearch }: { initialSearch: SearchParams }) {
  const { handleFilterSubmit, queryString } = useQueryString(initialSearch);

  const { data, isLoading, isSuccess, isFetching } = useQuery({
    queryKey: [queryKeys.pricing.tier, queryString],
    queryFn: () => getPricingTiers({ queryString }),
    placeholderData: keepPreviousData,
  });

  if (isLoading && !data) {
    return <DataTableSkeleton columnCount={5} />;
  }

  if (!isSuccess && !data) {
    throw new Error("Could not get pricing tier");
  }

  return (
    <GenericDataTable
      data={data.data}
      columns={PricingTiersColumns}
      pageCount={data.pagination.totalPages}
      initialState={{
        // sorting: [{ id: "amount", desc: true }],
        columnPinning: { right: ["actions"] },
        pagination: { pageIndex: 1, pageSize: data.pagination.limit },
      }}
      isLoading={isFetching}
      exportTitle="Price Table"
      exportFilename="priceTable"
      handleFilterSubmit={handleFilterSubmit}
    />
  );
}

export default PriceTiers;
