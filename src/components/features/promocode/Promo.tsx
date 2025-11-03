"use client";

import { GenericDataTable } from "@/components/data-table-server/DataTableServer";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { useQueryString } from "@/hooks/useQueryString";
import { queryKeys } from "@/lib/query-keys/keys";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import { PromoColumns } from "./PromoDataColumns";
import { getPromoCodes } from "@/services/promocode.services";

function Promo({ initialSearch }: { initialSearch: SearchParams }) {
  const { handleFilterSubmit, queryString } = useQueryString(initialSearch);

  const { data, isLoading, isSuccess, isFetching, isRefetching, refetch } =
    useQuery({
      queryKey: [queryKeys.promos.get, queryString],
      queryFn: () => getPromoCodes({ queryString }),
      placeholderData: keepPreviousData,
    });

  if (isLoading && !data) {
    return <DataTableSkeleton columnCount={5} />;
  }

  if (!isSuccess) {
    throw new Error("Could not get Promo history");
  }

  return (
    <GenericDataTable
      data={data.data}
      columns={PromoColumns}
      pageCount={data.pagination.totalPages}
      initialState={{
        sorting: [{ id: "user_discount_percentage", desc: true }],
        columnPinning: { right: ["actions"] },
        pagination: { pageIndex: 1, pageSize: data.pagination.limit },
      }}
      isLoading={isFetching}
      exportTitle="Promo Codes"
      exportFilename="PromoTable"
      handleFilterSubmit={handleFilterSubmit}
      isRefetching={isRefetching}
      refetchData={refetch}
    />
  );
}

export default Promo;
