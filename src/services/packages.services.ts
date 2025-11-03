"use server";

import { generateSlug } from "@/helpers/generateSlug";
import { globalErrorHandler } from "@/helpers/globalHanlers";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { queryKeys } from "@/lib/query-keys/keys";
import {
  ContinentsThatHaveDataOnlyPackagesResponse,
  ContinentsThatHaveDataVoicePackagesResponse,
  CountriesThatHaveDataOnlyPackagesRespone,
  CountriesThatHaveDataVoicePackagesResponse,
  CountryPackagesRespone,
  CountryWithStartingPrice,
  GetDataOnlyGlobalPackageResponse,
  GetDataVoiceGlobalPackagesResponse,
  GetDataVoicePackagesOfContinentResponse,
  GetDataVoicePackagesOfCountryResponse,
  PackagesData,
  PurchasePackagesInputs,
  PurchasePackagesResponseType,
  SearchPackagesList,
  SearchPackagesListReturn,
  TopDestinations,
} from "@/types/packages.types";
import { updateTag } from "next/cache";

// const baseUrl = "https://portal.esimcard.com/api/landing";

export async function getCountriesThatHaveDataOnlyPackages() {
  try {
    const session = await auth();
    const response = await api<CountriesThatHaveDataOnlyPackagesRespone>(
      "/packages/country?package_type=DATA-ONLY",
      session?.accessToken,

      { role: session?.user.role }
    );
    const data = response.data;
    const modifiedData = data.map((item) => ({
      ...item,
      href: `/esim/${item.slug}`,
    }));

    return modifiedData;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getContinentsThatHaveDataOnlyPackages() {
  try {
    const session = await auth();
    const response = await api<ContinentsThatHaveDataOnlyPackagesResponse>(
      "/packages/continent?package_type=DATA-ONLY",
      session?.accessToken,

      { role: session?.user.role }
    );
    const data = response.data;

    const modifiedData = data.map((item) => ({
      ...item,
      href: `/regional/${item.slug}`,
    }));

    return modifiedData;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getCountriesThatHaveDataVoicePackages() {
  try {
    const session = await auth();
    const response = await api<CountriesThatHaveDataVoicePackagesResponse>(
      `/packages/country?package_type=DATA-VOICE-SMS`,
      session?.accessToken,

      { role: session?.user.role }
    );

    const data = response.data;

    const modifiedData = data.map((item) => ({
      ...item,

      href: `/${generateSlug(item.name)}/`,
    }));

    return modifiedData;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getContinentsThatHaveDataVoicePackages() {
  try {
    const session = await auth();
    const response = await api<ContinentsThatHaveDataVoicePackagesResponse>(
      `/packages/continent?package_type=DATA-VOICE-SMS`,
      session?.accessToken,

      { role: session?.user.role }
    );

    const data = response.data;

    const modifiedData = data.map((item) => ({
      ...item,
      href: `/${item.slug}-esim/`,
    }));

    return modifiedData;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getDataOnlyPackagesOfCountry(countrySlug: string) {
  try {
    const session = await auth();
    const response = await api<CountryPackagesRespone>(
      `/packages/${countrySlug}/country?package_type=DATA-ONLY`,
      session?.accessToken,

      { role: session?.user.role }
    );

    return response.data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getDataOnlyPackagesOfRegion(regionSlug: string) {
  try {
    const session = await auth();
    const response = await api<CountryPackagesRespone>(
      `/packages/${regionSlug}/continent?package_type=DATA-ONLY`,
      session?.accessToken,

      { role: session?.user.role }
    );

    return response.data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getDataOnlyGlobalPackages(): Promise<PackagesData> {
  try {
    const session = await auth();
    const response = await api<GetDataOnlyGlobalPackageResponse>(
      `/packages/global?package_type=DATA-ONLY`,
      session?.accessToken,

      { role: session?.user.role }
    );

    const globalPackagesResponse = response.data;

    const { data: packages, ...metaData } = globalPackagesResponse;

    const packagesWithPackageTypeProperty = packages.map((item) => ({
      ...item,
      package_type: "DATA-ONLY",
    }));

    const countryInfoAndPackages = {
      updated_at: "",
      created_at: "",
      name: "Global",
      image_url: "/images/globalMap.svg",
      cover_image: globalPackagesResponse.global_coverage_image,
      packages: packagesWithPackageTypeProperty,
    };

    const packagesData = { data: countryInfoAndPackages, ...metaData };
    return packagesData;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getDataVoicePackagesOfCountry(
  countrySlug: string
): Promise<PackagesData> {
  try {
    const session = await auth();
    const response = await api<GetDataVoicePackagesOfCountryResponse>(
      `/packages/${countrySlug}/country?package_type=DATA-VOICE-SMS`,
      session?.accessToken,

      { role: session?.user.role }
    );

    return response.data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getDataVoicePackagesOfContinent(
  regionSlug: string
): Promise<PackagesData> {
  try {
    const session = await auth();
    const response = await api<GetDataVoicePackagesOfContinentResponse>(
      `/packages/${regionSlug}/continent?package_type=DATA-VOICE-SMS`,
      session?.accessToken,

      { role: session?.user.role }
    );

    return response.data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getDataVoiceGlobalPackages(): Promise<PackagesData> {
  try {
    const session = await auth();
    const response = await api<GetDataVoiceGlobalPackagesResponse>(
      `/packages/global?package_type=DATA-VOICE-SMS`,
      session?.accessToken,

      { role: session?.user.role }
    );

    const globalPackagesResponse = response.data;

    const { data: packages, ...metaData } = globalPackagesResponse;

    const packagesWithPackageTypeProperty = packages.map((item) => ({
      ...item,
      package_type: "DATA-VOICE-SMS",
    }));

    const countryInfoAndPackages = {
      updated_at: "",
      created_at: "",
      name: "Global",
      image_url: "/images/globalMap.svg",

      cover_image: globalPackagesResponse.global_coverage_image,
      packages: packagesWithPackageTypeProperty,
    };

    const packagesData = { data: countryInfoAndPackages, ...metaData };
    return packagesData;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function searchPackagesList(): Promise<SearchPackagesListReturn> {
  try {
    const session = await auth();
    const response = await api<SearchPackagesList>(
      `/search-package-list`,
      session?.accessToken,

      { role: session?.user.role }
    );

    const {
      global,
      global_voice,
      local,
      local_voice,
      regional,
      regional_voice,
    } = response.data;

    const globalDataOnly: {
      href: string;
      countries: CountryWithStartingPrice[];
    } = {
      href: "/data-only/global/",
      countries: global,
    };

    const localDataOnly = local.map((country) => ({
      ...country,
      href: `/data-only/${country.slug}/`,
    }));

    const regionalDataOnly = regional.map((region) => ({
      ...region,
      href: `/data-only/regional/${region.slug}/`,
    }));

    const globalDataVoice: {
      href: string;
      countries: CountryWithStartingPrice[];
    } = {
      href: "/data-voice/global/",
      countries: global_voice.flatMap((item) => item.countries),
    };

    const localDataVoice = local_voice.map((country) => ({
      ...country,
      href: `/data-voice/${country.slug}/`,
    }));

    const regionalDataVoice = regional_voice.map((region) => ({
      ...region,
      href: `/data-voice/regional/${region.slug}/`,
    }));

    return {
      global: globalDataOnly,
      local: localDataOnly,
      regional: regionalDataOnly,
      global_voice: globalDataVoice,
      local_voice: localDataVoice,
      regional_voice: regionalDataVoice,
    };
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function getTopDestinations() {
  try {
    const session = await auth();
    const response = await api<TopDestinations>(
      `/top-destinations`,
      session?.accessToken,

      { role: session?.user.role }
    );

    return response.data;
  } catch (error) {
    throw new Error(globalErrorHandler(error));
  }
}

export async function purchasePackages({ cartItems }: PurchasePackagesInputs) {
  try {
    const bundlesToPurchase = cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      recurring: item.recurring,
    }));

    const session = await auth();
    const data = await api<PurchasePackagesResponseType>(
      "/package-purchase",
      session?.accessToken,
      {
        body: { bundles: bundlesToPurchase },
        method: "POST",
        role: session?.user.role,
      }
    );
    updateTag(queryKeys.sims.myEsims);
    updateTag(queryKeys.auth.user);
    return data;
  } catch (error) {
    return { status: false, message: globalErrorHandler(error) };
  }
}
