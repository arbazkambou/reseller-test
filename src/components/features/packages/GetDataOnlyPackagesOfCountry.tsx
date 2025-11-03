import { cleanString } from "@/helpers/cleanString";
import { getDataOnlyPackagesOfCountry } from "@/services/packages.services";
import { notFound } from "next/navigation";
import PackagesList from "./PackagesList";

async function GetDataOnlyPackagesOfCountry({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let packagesResponse;
  try {
    const { slug } = await params;
    packagesResponse = await getDataOnlyPackagesOfCountry(slug);
  } catch (error) {
    if (
      error instanceof Error &&
      cleanString(error.message).includes("not found")
    ) {
      throw notFound();
    } else {
      throw error;
    }
  }

  return <PackagesList packages={packagesResponse} />;
}

export default GetDataOnlyPackagesOfCountry;
