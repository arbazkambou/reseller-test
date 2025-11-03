"use client";

import { GenericDataTable } from "@/components/data-table-server/DataTableServer";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useQueryString } from "@/hooks/useQueryString";
import { queryKeys } from "@/lib/query-keys/keys";
import { getBundles } from "@/services/bundles.services";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import { BundlesColumn } from "./BundlesColumns";

function Bundles({ initialSearch }: { initialSearch: SearchParams }) {
  const { handleFilterSubmit, queryString } = useQueryString(initialSearch);

  const { data, isLoading, isSuccess, isFetching, refetch, isRefetching } =
    useQuery({
      queryKey: [queryKeys.reseller.bundles, queryString],
      queryFn: () => getBundles({ queryString }),
      placeholderData: keepPreviousData,
    });

  if (isLoading && !data) {
    return <DataTableSkeleton columnCount={5} />;
  }

  if (!isSuccess && !data) {
    throw new Error("Could not get assign bundles");
  }

  return (
    <GenericDataTable
      data={data.data}
      columns={BundlesColumn}
      pageCount={data.pagination.totalPages}
      initialState={{
        // sorting: [{ id: "amount", desc: true }],
        // columnPinning: { right: ["actions"] },
        pagination: { pageIndex: 1, pageSize: data.pagination.limit },
      }}
      isLoading={isFetching}
      exportTitle="Assigned Bundles"
      exportFilename="Bundles"
      handleFilterSubmit={handleFilterSubmit}
      isRefetching={isRefetching}
      refetchData={refetch}
    />
  );
}

export default Bundles;
