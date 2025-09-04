import { DataTable } from "@/components/shared/data-table/DataTable";
import { getDealerDetail } from "@/services/dealer.services";
import { DealerEsimColumns } from "./details/EsimsColumns";

async function GetEsimPurchased({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getDealerDetail({ dealerId: id });
  return (
    <DataTable
      columns={DealerEsimColumns}
      data={data.esims_purchased.data}
      options={{ isCustomFilters: false }}
    />
  );
}

export default GetEsimPurchased;
