import { ViewPricingColumns } from "@/components/features/pricing/ViewPricingColumns";
import { DataTable } from "@/components/shared/data-table/DataTable";
import { TabsContent } from "@/components/ui/tabs";
import { getCountriesWithPricing } from "@/services/pricing.services";

async function GetCountriesPricing() {
  const data = await getCountriesWithPricing();

  return (
    <>
      <TabsContent value="data-only">
        <DataTable
          columns={ViewPricingColumns}
          data={data.countriesWithDataOnlyPackages.slice()}
          options={{
            isCustomFilters: true,
            columnsToFilter: [
              {
                key: "country_name",
                title: "Country",
                options: data.uniqueCountryNames.map((country) => ({
                  label: country.name,
                  value: country.name,
                })),
              },
              {
                key: "dataUsageAllowanceInBytes",
                title: "Data",
                options: data.uniqueDataAllowances.map((data) => ({
                  label: data,
                  value: data,
                })),
              },
              {
                key: "timeAllowanceInSeconds",
                title: "Validity",
                options: data.uniqueDataAllowances.map((validity) => ({
                  label: validity,
                  value: validity,
                })),
              },
            ],
          }}
        />
      </TabsContent>
      <TabsContent value="data-voice">
        <DataTable
          columns={ViewPricingColumns}
          data={data.countriesWithDataVoicePackages.slice()}
          options={{
            isCustomFilters: true,
            columnsToFilter: [
              {
                key: "country_name",
                title: "Country",
                options: data.uniqueCountryNames.map((country) => ({
                  label: country.name,
                  value: country.name,
                })),
              },
              {
                key: "dataUsageAllowanceInBytes",
                title: "Data",
                options: data.uniqueDataAllowances.map((data) => ({
                  label: data,
                  value: data,
                })),
              },
              {
                key: "timeAllowanceInSeconds",
                title: "Validity",
                options: data.uniqueDataAllowances.map((validity) => ({
                  label: validity,
                  value: validity,
                })),
              },
            ],
          }}
        />
      </TabsContent>
    </>
  );
}

export default GetCountriesPricing;
