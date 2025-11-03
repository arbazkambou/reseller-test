"use client";

import { GenericDataTable } from "@/components/data-table-server/DataTableServer";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useQueryString } from "@/hooks/useQueryString";
import { queryKeys } from "@/lib/query-keys/keys";
import { getDealers } from "@/services/dealer.services";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import { DealerColumns } from "./DealerTableColumns";

function Dealers({ initialSearch }: { initialSearch: SearchParams }) {
  const { handleFilterSubmit, queryString } = useQueryString(initialSearch);

  const { data, isLoading, isSuccess, isFetching, refetch, isRefetching } =
    useQuery({
      queryKey: [queryKeys.dealers.get, queryString],
      queryFn: () => getDealers({ queryString }),
      placeholderData: keepPreviousData,
    });

  function refetchData() {
    refetch();
  }

  if (isLoading && !data) {
    return <DataTableSkeleton columnCount={5} />;
  }

  if (!isSuccess && !data) {
    throw new Error("Could not get dealers");
  }
  return (
    <GenericDataTable
      data={data.data}
      columns={DealerColumns}
      pageCount={data.pagination.totalPages}
      isLoading={isFetching}
      exportTitle="Dealers"
      exportFilename="DealersTable"
      handleFilterSubmit={handleFilterSubmit}
      refetchData={refetchData}
      isRefetching={isRefetching}
    />
  );
}

export default Dealers;
