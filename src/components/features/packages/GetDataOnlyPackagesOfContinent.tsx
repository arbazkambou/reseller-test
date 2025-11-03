import { cleanString } from "@/helpers/cleanString";
import { getDataOnlyPackagesOfRegion } from "@/services/packages.services";
import { notFound } from "next/navigation";
import PackagesList from "./PackagesList";

async function GetDataOnlyPackagesOfContinent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let packagesResponse;
  try {
    const { slug } = await params;
    packagesResponse = await getDataOnlyPackagesOfRegion(slug);
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

export default GetDataOnlyPackagesOfContinent;
