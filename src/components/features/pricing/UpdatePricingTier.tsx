import {
  getDataForCreatingPriceTier,
  getExistingPriceTierById,
} from "@/services/pricing.services";
import PricingForm from "./PricingForm";
import { GetExistingPriceTierById } from "@/types/pricing.types";

function mapApiToFormDefaults(
  existingPriceTier: GetExistingPriceTierById,
  priceId: string
) {
  const apiData = existingPriceTier.data;
  const countries = existingPriceTier.data.countries.map((price) => ({
    code: price.id,
    value: price.percent,
  }));

  const regions = existingPriceTier.data.continents.map((price) => ({
    code: price.id,
    value: price.percent,
  }));

  const global = existingPriceTier.data.global?.map((price) => ({
    code: price.id,
    value: price.percent,
  }));

  const assignedUsers = apiData.assigned_user_ids; // just array of IDs

  return {
    name: apiData.name,
    percent: Number(apiData.percentage) || apiData.global_percent || 0,
    default: apiData.default,
    countries,
    regions,
    assignedUsers,
    priceId,
    global: global ? global : [{ code: "global", value: 0 }],
  };
}

async function UpdatePricingTier({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const existingPriceTierPromise = getExistingPriceTierById(slug);
  const dataPromise = await getDataForCreatingPriceTier();
  const [existingPriceTier, dataForCreatePrice] = await Promise.all([
    existingPriceTierPromise,
    dataPromise,
  ]);

  const { continents, countries, users, global } = dataForCreatePrice;
  const mapedData = mapApiToFormDefaults(existingPriceTier, slug);

  return (
    <PricingForm
      regions={continents}
      users={users}
      countries={countries}
      global={global}
      defaultValues={mapedData}
    />
  );
}

export default UpdatePricingTier;
