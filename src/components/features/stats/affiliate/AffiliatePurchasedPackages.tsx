"use client";

import { GenericDataTable } from "@/components/data-table-server/DataTableServer";
import { DataTableSkeleton } from "@/components/shared/skeltons/DataTableSkelton";
import { useQueryString } from "@/hooks/useQueryString";
import { queryKeys } from "@/lib/query-keys/keys";
import { getAffiliatePurchasedPackages } from "@/services/affiliate/stats.services";
import { useQuery } from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import { AffiliatePurchasedPackageColumn } from "./AffiliatePurchasedPackagesColumns";

export function AffiliatePurchasedPackages({
  initialSearch,
}: {
  initialSearch: SearchParams;
}) {
  const { handleFilterSubmit, queryString } = useQueryString(initialSearch);

  const { data, isLoading, isSuccess, isFetching, refetch, isRefetching } =
    useQuery({
      queryKey: [queryKeys.affiliate.packages, queryString],
      queryFn: () => getAffiliatePurchasedPackages({ queryString }),
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
      columns={AffiliatePurchasedPackageColumn}
      pageCount={data.pagination.totalPages}
      isLoading={isFetching}
      exportTitle="Packages"
      handleFilterSubmit={handleFilterSubmit}
      refetchData={refetchData}
      isRefetching={isRefetching}
      applyFilter={false}
    />
  );
}
