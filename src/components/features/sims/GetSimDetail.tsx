import { getSimDetail } from "@/services/sims.services";
import SimDetails from "./SimDetails";
import { SimDetailParams } from "@/app/(dashboard)/reseller/my-esims/[id]/page";

async function GetSimDetail({ params }: { params: Promise<SimDetailParams> }) {
  const { id } = await params;
  const usage = await getSimDetail({ id });

  return <SimDetails usage={usage} />;
}

export default GetSimDetail;
