import { DataTable } from "@/components/shared/data-table/DataTable";
import { getPricingTiers } from "@/services/pricing.services";
import { PricingTiersColumns } from "./PricingTiersColumns";

async function GetPricingTiers() {
  const data = await getPricingTiers();

  return (
    <DataTable
      columns={PricingTiersColumns}
      data={data}
      options={{ isCustomFilters: false }}
    />
  );
}

export default GetPricingTiers;
