import { MyESIMColumns } from "@/components/features/sims/MyesimsColumn";
import { DataTable } from "@/components/shared/data-table/DataTable";
import { getMyEsims } from "@/services/sims.services";

async function GetMyEsims() {
  const data = await getMyEsims();
  return (
    <>
      <DataTable
        columns={MyESIMColumns}
        data={data.data}
        exportFilename="my-esims"
        options={{
          isCustomFilters: true,
          columnsToFilter: [
            {
              key: "status",
              title: "Status",
              options: [
                { value: "Released", label: "Released" },
                { value: "Pending", label: "Pending" },
                { value: "Active", label: "Active" },
                { value: "Expired", label: "Expired" },
              ],
            },
            {
              key: "smdp_address",
              title: "SMDP Address",
              options: [
                { value: "rsp-3104.idemia.io", label: "IDEMIA" },
                { value: "sm-v4-064-a-gtm.pr.go-esim.com", label: "GO eSIM" },
                { value: "rsp1.cmlink.com", label: "CM Link" },
                { value: "rsp.truphone.com", label: "Truphone" },
              ],
            },
          ],
        }}
      />
    </>
  );
}

export default GetMyEsims;
