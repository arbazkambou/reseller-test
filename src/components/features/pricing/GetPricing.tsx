import { getDataForCreatingPriceTier } from "@/services/pricing.services";
import PricingForm from "./PricingForm";

async function GetPricing() {
  const { continents, countries, users, global } =
    await getDataForCreatingPriceTier();

  return (
    <PricingForm
      regions={continents}
      users={users}
      countries={countries}
      global={global}
    />
  );
}

export default GetPricing;
