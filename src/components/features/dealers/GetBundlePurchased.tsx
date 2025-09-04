import { DataTable } from "@/components/shared/data-table/DataTable";
import { getDealerDetail } from "@/services/dealer.services";
import { DealerBundleColumns } from "./details/BundlesColumns";

async function GetBundlePurchased({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getDealerDetail({ dealerId: id });
  return (
    <DataTable
      columns={DealerBundleColumns}
      data={data.bundles_purchased.data}
      options={{ isCustomFilters: false }}
    />
  );
}

export default GetBundlePurchased;
