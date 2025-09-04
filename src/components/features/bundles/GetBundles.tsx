import { DataTable } from "@/components/shared/data-table/DataTable";
import { getBundles } from "@/services/bundles.services";
import { BundlesColumn } from "./BundlesColumns";

async function GetBundles() {
  const data = await getBundles();
  return (
    <DataTable
      columns={BundlesColumn}
      data={data}
      options={{ isCustomFilters: false }}
    />
  );
}

export default GetBundles;
