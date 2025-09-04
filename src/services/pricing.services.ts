"use server";

import { globalErrorHandler } from "@/helpers/globalHanlers";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { queryKeys } from "@/lib/query-keys/keys";
import {
  DeletePricingTierResponse,
  GetCountriesWithPricingResponse,
  GetPricingTiersResponse,
} from "@/types/pricing.types";
import { revalidateTag } from "next/cache";

export async function getCountriesWithPricing() {
  try {
    const session = await auth();
    const data = await api<GetCountriesWithPricingResponse>(
      "/portal/pricing",
      session?.accessToken
    );

    const countriesWithDataOnlyPackages = data.data.countries
      .filter((country) =>
        country.packages_to_use.some((pkg) => pkg.package_type === "DATA-ONLY")
      )
      .flatMap((country) =>
        country.packages_to_use.map((pkg) => ({
          country_name: country.name,
          country_flag: country.emoji,

          ...pkg,
        }))
      );

    const countriesWithDataVoicePackages = data.data.countries
      .filter((country) =>
        country.packages_to_use.some(
          (pkg) => pkg.package_type === "DATA-VOICE-SMS"
        )
      )
      .flatMap((country) =>
        country.packages_to_use.map((pkg) => ({
          country_name: country.name,
          country_flag: country.emoji,

          ...pkg,
        }))
      );

    const uniqueCountryNames = [
      ...new Set(data.data.countries.map((c) => c.name)),
    ].map((name) => ({ name }));

    const uniqueTimeAllowances = [
      ...new Set(
        data.data.countries.flatMap((country) =>
          country.packages_to_use.map((pkg) => pkg.timeAllowanceInSeconds)
        )
      ),
    ];

    const uniqueDataAllowances = [
      ...new Set(
        data.data.countries.flatMap((country) =>
          country.packages_to_use.map((pkg) => pkg.dataUsageAllowanceInBytes)
        )
      ),
    ];

    return {
      countriesWithDataOnlyPackages,
      countriesWithDataVoicePackages,
      uniqueCountryNames,
      uniqueTimeAllowances,
      uniqueDataAllowances,
    };
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getPricingTiers() {
  try {
    const session = await auth();
    const data = await api<GetPricingTiersResponse>(
      "/portal/pricing-tiers",

      session?.accessToken,
      { next: { tags: [queryKeys.pricing.tier] } }
    );

    return data.data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function deletePricingTiers(id: string) {
  try {
    const session = await auth();
    const data = await api<DeletePricingTierResponse>(
      `/portal/pricing-tiers/destroy/${id}`,
      session?.accessToken,
      { method: "DELETE" }
    );

    revalidateTag(queryKeys.pricing.tier);

    return data.message;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}
