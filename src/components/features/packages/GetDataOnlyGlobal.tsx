import { cleanString } from "@/helpers/cleanString";
import { getDataOnlyGlobalPackages } from "@/services/packages.services";
import { notFound } from "next/navigation";
import PackagesList from "./PackagesList";

async function GetDataOnlyGlobal() {
  let packagesResponse;
  try {
    packagesResponse = await getDataOnlyGlobalPackages();
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

export default GetDataOnlyGlobal;
