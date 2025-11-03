import { ViewPricingColumns } from "@/components/features/pricing/ViewPricingColumns";
import { DataTable } from "@/components/shared/data-table/DataTable";
import { TabsContent } from "@/components/ui/tabs";
import { getCountriesWithPricing } from "@/services/pricing.services";

async function GetCountriesPricing() {
  const data = await getCountriesWithPricing();

  const dataQuantitiesFilter = [
    {
      label: "1 GB",
      value: "1 GB",
    },
    {
      label: "2 GB",
      value: "2 GB",
    },
    {
      label: "3 GB",
      value: "3 GB",
    },
    {
      label: "5 GB",
      value: "5 GB",
    },
    {
      label: "10 GB",
      value: "10 GB",
    },
    {
      label: "20 GB",
      value: "20 GB",
    },
    {
      label: "25 GB",
      value: "25 GB",
    },
    {
      label: "50 GB",
      value: "50 GB",
    },
    {
      label: "300 GB",
      value: "300 GB",
    },
    {
      label: "All",
      value: "",
    },
  ];

  const validityFilters = [
    {
      label: "1 Days",
      value: "1 Days",
    },
    {
      label: "3 Days",
      value: "3 Days",
    },
    {
      label: "5 Days",
      value: "5 Days",
    },
    {
      label: "7 Days",
      value: "7 Days",
    },
    {
      label: "15 Days",
      value: "15 Days",
    },
    {
      label: "30 Days",
      value: "30 Days",
    },
    {
      label: "90 Days",
      value: "90 Days",
    },
    {
      label: "365 Days",
      value: "365 Days",
    },
  ];

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
                title: "Country/Continent/Global",
                options: data.uniqueCountryNames.map((country) => ({
                  label: country.name,
                  value: country.name,
                })),
              },
              {
                key: "data",
                title: "Data",
                options: dataQuantitiesFilter.map((filter) => ({
                  label: filter.label,
                  value: filter.value,
                })),
              },
              {
                key: "time",
                title: "Validity",
                options: validityFilters.map((filter) => ({
                  label: filter.label,
                  value: filter.value,
                })),
              },
            ],
          }}
          searchPlaceholderText="Search country, continents or global packages"
          exportTitle="Data Only Pricing"
          exportFilename="dataOnlyPricing"
          enableDownload={true}
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
                key: "data",
                title: "Data",
                options: dataQuantitiesFilter.map((filter) => ({
                  label: filter.label,
                  value: filter.value,
                })),
              },
              {
                key: "time",
                title: "Validit",
                options: validityFilters.map((filter) => ({
                  label: filter.label,
                  value: filter.value,
                })),
              },
            ],
          }}
          searchPlaceholderText="Search country, continents or global packages"
          exportTitle="Data Voice Pricing"
          exportFilename="dataVoicePricing"
          enableDownload={true}
        />
      </TabsContent>
    </>
  );
}

export default GetCountriesPricing;
