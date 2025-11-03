"use server";

import { globalErrorHandler } from "@/helpers/globalHanlers";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { queryKeys } from "@/lib/query-keys/keys";
import {
  CreatePricingTierResponse,
  DataForCreatingPriceTierResponse,
  DeletePricingTierResponse,
  GetCountriesWithPricingResponse,
  GetExistingPriceTierById,
  GetPricingTiersResponse,
  PricingPayload,
} from "@/types/pricing.types";
import { updateTag } from "next/cache";

export async function getCountriesWithPricing() {
  try {
    const session = await auth();
    const data = await api<GetCountriesWithPricingResponse>(
      "/pricing",
      session?.accessToken,
      { role: session?.user.role }
    );

    const countriesWithDataOnlyPackages = data.data.countries.flatMap(
      (country) =>
        country.packages_to_use
          .filter((pkg) => pkg.package_type === "DATA-ONLY")
          .map((pkg) => ({
            country_name: country.name,
            country_flag: country.emoji,
            ...pkg,
          }))
    );

    const countriesWithDataVoicePackages = data.data.countries.flatMap(
      (country) =>
        country.packages_to_use
          .filter((pkg) => pkg.package_type === "DATA-VOICE-SMS")
          .map((pkg) => ({
            country_name: country.name,
            country_flag: country.emoji,
            ...pkg,
          }))
    );
    const uniqueCountryNames = [
      ...new Set(data.data.countries.map((c) => c.name)),
    ].map((name) => ({ name }));

    // const uniqueTimeAllowances = [
    //   ...new Set(
    //     data.data.countries.flatMap((country) =>
    //       country.packages_to_use.map((pkg) => pkg.timeAllowanceInSeconds)
    //     )
    //   ),
    // ];

    // const uniqueDataAllowances = [
    //   ...new Set(
    //     data.data.countries.flatMap((country) =>
    //       country.packages_to_use.map((pkg) => pkg.dataUsageAllowanceInBytes)
    //     )
    //   ),
    // ];

    return {
      countriesWithDataOnlyPackages,
      countriesWithDataVoicePackages,
      uniqueCountryNames,
      // uniqueTimeAllowances,
      // uniqueDataAllowances,
    };
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getPricingTiers({
  queryString,
}: {
  queryString: string;
}) {
  try {
    const session = await auth();
    const data = await api<GetPricingTiersResponse>(
      `/pricing-tiers?${queryString}`,

      session?.accessToken,
      { next: { tags: [queryKeys.pricing.tier] }, role: session?.user.role }
    );

    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function deletePricingTiers(id: string) {
  try {
    const session = await auth();
    const data = await api<DeletePricingTierResponse>(
      `/pricing-tiers/destroy/${id}`,
      session?.accessToken,
      { method: "DELETE", role: session?.user.role }
    );

    updateTag(queryKeys.pricing.tier);

    return data;
  } catch (error) {
    return { status: false, message: globalErrorHandler(error) };
  }
}

export async function getDataForCreatingPriceTier() {
  try {
    const session = await auth();
    const data = await api<DataForCreatingPriceTierResponse>(
      "/pricing-tiers/create",
      session?.accessToken,

      { role: session?.user.role }
    );

    data.data.global = data.data.global.map((global) => ({
      ...global,
      emoji: "🌍",
    }));

    return data.data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function createPricingTier({ ...payload }: PricingPayload) {
  try {
    const session = await auth();
    const data = await api<CreatePricingTierResponse>(
      "/pricing-tiers/store",
      session?.accessToken,
      { body: { ...payload }, method: "POST", role: session?.user.role }
    );

    updateTag(queryKeys.pricing.tier);
    return data;
  } catch (error) {
    return { status: false, message: globalErrorHandler(error) };
  }
}

export async function getExistingPriceTierById(id: string | number) {
  try {
    const session = await auth();
    const data = await api<GetExistingPriceTierById>(
      `/pricing-tiers/${id}`,
      session?.accessToken,
      { role: session?.user.role }
    );

    return data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function updatePricingTier({
  priceId,
  pricingPayLoad,
}: {
  priceId: string;
  pricingPayLoad: PricingPayload;
}) {
  try {
    const session = await auth();
    const data = await api<CreatePricingTierResponse>(
      `/pricing-tiers/update/${priceId}`,
      session?.accessToken,
      { body: { ...pricingPayLoad }, method: "PUT", role: session?.user.role }
    );

    updateTag(queryKeys.pricing.tier);
    return data;
  } catch (error) {
    return { status: false, message: globalErrorHandler(error) };
  }
}
