import { getDealerDetail } from "@/services/dealer.services";
import { DealerDetailCard } from "./DealerDetailCard";

async function GetDealerDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getDealerDetail({ dealerId: id });

  return <DealerDetailCard dealerDetail={data.data.user_info} />;
}

export default GetDealerDetail;
