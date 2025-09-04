import { DataTable } from "@/components/shared/data-table/DataTable";
import { getDealerDetail } from "@/services/dealer.services";
import { DealerRefillColumns } from "./details/RefillColumns";

async function GetDeallerCredits({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getDealerDetail({ dealerId: id });
  return (
    <DataTable
      columns={DealerRefillColumns}
      data={data.refill_history.data}
      options={{ isCustomFilters: false }}
    />
  );
}

export default GetDeallerCredits;
