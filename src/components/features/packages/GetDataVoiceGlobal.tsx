import { cleanString } from "@/helpers/cleanString";
import { getDataVoiceGlobalPackages } from "@/services/packages.services";
import { notFound } from "next/navigation";
import PackagesList from "./PackagesList";

async function GetDataVoiceGlobal() {
  let packagesResponse;
  try {
    packagesResponse = await getDataVoiceGlobalPackages();
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

export default GetDataVoiceGlobal;
