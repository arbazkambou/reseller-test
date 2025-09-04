import { getDealers } from "@/services/dealer.services";
import { DealerColumns } from "./DealerTableColumns";
import { DataTable } from "@/components/shared/data-table/DataTable";

async function GetDealers() {
  const dealers = await getDealers();
  return (
    <DataTable
      columns={DealerColumns}
      data={dealers}
      exportFilename="dealers-list"
      options={{
        isCustomFilters: true,
        columnsToFilter: [
          {
            key: "status",
            title: "Status",
            options: [
              {
                value: "success",
                label: "Success",
              },
              {
                value: "pending",
                label: "Pending",
              },
              {
                value: "processing",
                label: "Processing",
              },
              {
                value: "failed",
                label: "Failed",
              },
            ],
          },
        ],
      }}
    />
  );
}

export default GetDealers;
