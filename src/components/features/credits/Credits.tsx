"use client";

import { GenericDataTable } from "@/components/data-table-server/DataTableServer";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useQueryString } from "@/hooks/useQueryString";
import { queryKeys } from "@/lib/query-keys/keys";
import { getCredits } from "@/services/credits.services";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import { CreditColumns } from "./CreditsDataColumns";

function Credits({ initialSearch }: { initialSearch: SearchParams }) {
  const { handleFilterSubmit, queryString } = useQueryString(initialSearch);

  const { data, isLoading, isSuccess, isFetching, isRefetching, refetch } =
    useQuery({
      queryKey: [queryKeys.credits.get, queryString],
      queryFn: () => getCredits({ queryString }),
      placeholderData: keepPreviousData,
    });

  if (isLoading && !data) {
    return <DataTableSkeleton columnCount={5} />;
  }

  if (!isSuccess && !data) {
    throw new Error("Could not get credits history");
  }

  return (
    <GenericDataTable
      data={data.data}
      columns={CreditColumns}
      pageCount={data.pagination.totalPages}
      initialState={{
        sorting: [{ id: "amount", desc: true }],
        columnPinning: { right: ["actions"] },
        pagination: { pageIndex: 1, pageSize: data.pagination.limit },
      }}
      isLoading={isFetching}
      exportTitle="Credits"
      exportFilename="CreditsTable"
      handleFilterSubmit={handleFilterSubmit}
      isRefetching={isRefetching}
      refetchData={refetch}
    />
  );
}

export default Credits;
