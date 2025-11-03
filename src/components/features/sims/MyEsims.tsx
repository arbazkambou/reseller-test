"use client";

import { GenericDataTable } from "@/components/data-table-server/DataTableServer";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useQueryString } from "@/hooks/useQueryString";
import { queryKeys } from "@/lib/query-keys/keys";
import { getMyEsims } from "@/services/sims.services";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import { MyESIMColumns } from "./MyesimsColumn";

function MyEsims({ initialSearch }: { initialSearch: SearchParams }) {
  const { handleFilterSubmit, queryString } = useQueryString(initialSearch);

  const { data, isLoading, isSuccess, isFetching, isRefetching, refetch } =
    useQuery({
      queryKey: [queryKeys.sims.myEsims, queryString],
      queryFn: () => getMyEsims({ queryString }),
      placeholderData: keepPreviousData,
    });

  if (isLoading && !data) {
    return <DataTableSkeleton columnCount={5} />;
  }

  if (!isSuccess && !data) {
    throw new Error("Could not get my esims");
  }

  return (
    <GenericDataTable
      data={data.data}
      columns={MyESIMColumns}
      pageCount={data.pagination.totalPages}
      initialState={{
        // sorting: [{ id: "amount", desc: true }],
        // columnPinning: { right: ["actions"] },
        pagination: { pageIndex: 1, pageSize: data.pagination.limit },
      }}
      isLoading={isFetching}
      exportTitle="My eSIMs"
      exportFilename="myEsims"
      handleFilterSubmit={handleFilterSubmit}
      isRefetching={isRefetching}
      refetchData={refetch}
    />
  );
}

export default MyEsims;
