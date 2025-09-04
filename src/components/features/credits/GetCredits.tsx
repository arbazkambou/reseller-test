import { getCredits } from "@/services/credits.services";
import { CreditColumns } from "./CreditsDataColumns";
import { DataTable } from "@/components/shared/data-table/DataTable";

async function GetCredits() {
  const data = await getCredits();
  return (
    <DataTable
      columns={CreditColumns}
      data={data.data}
      exportFilename="credits-transactions"
      options={{ isCustomFilters: false }}
    />
  );
}

export default GetCredits;
