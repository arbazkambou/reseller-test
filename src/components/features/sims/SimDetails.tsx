import { Card } from "@/components/ui/card";
import { CircleCheckBig, Gift, Hourglass, Package } from "lucide-react";
import DataOnlyUsageChart from "./DataOnlyUsageChart";
import DataVoiceUsageChart from "./DataVoiceUsageChart";
import SimDetailCard from "./SimDetailCard";
import { SimUsageResponse } from "@/types/sims.types";
import { formatDate } from "@/helpers/formatDate";

interface PropsType {
  usage: SimUsageResponse;
}

function SimDetails({ usage }: PropsType) {
  return (
    <>
      <h1 className="text-center text-h1 md:text-start text-accent-foreground">
        eSIM Details
      </h1>
      <p className="text-muted-foreground">
        Reach out to the world’s most reliable eSim services
      </p>
      {usage && (
        <section className="mt-2 grid gap-20 xl:grid-cols-2">
          <SimDetailCard simUsage={usage} />

          {"initial_minutes" in usage?.data?.overall_usage ? (
            <DataVoiceUsageChart usage={usage.data.overall_usage} />
          ) : (
            <DataOnlyUsageChart usage={usage.data.overall_usage} />
          )}
        </section>
      )}

      {/* activated packages  */}
      {usage && usage?.data.in_use_packages.length > 0 && (
        <section className="mt-16">
          <h2 className="text-h2">Activated Packages</h2>
          <div className="mt-8 grid gap-10 xl:grid-cols-2 xl:gap-20">
            {usage.data.in_use_packages.map((item, index) => (
              <Card
                className="flex flex-col gap-[1.12rem] rounded-[1.8125rem] px-[1.5rem] py-[1.88rem]"
                key={index}
              >
                {/* Package Name  */}
                <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
                  <div className="flex items-center gap-[0.81rem]">
                    <Package size={24} className="text-primary" />
                    <p className="font-medium">Package</p>
                  </div>
                  <div className="flex items-center gap-[0.88rem]">
                    <p className="text-base">{item.package}</p>
                  </div>
                </div>

                {/* activated at  */}
                <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
                  <div className="flex items-center gap-[0.81rem]">
                    <CircleCheckBig size={24} className="text-primary" />
                    <p className="font-medium">Activated</p>
                  </div>
                  <div className="flex items-center gap-[0.88rem]">
                    <p className="text-base">
                      {formatDate(item.date_activated)}
                    </p>
                  </div>
                </div>

                {/* expired at at  */}
                <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
                  <div className="flex items-center gap-[0.81rem]">
                    <Hourglass size={24} className="text-primary" />
                    <p className="font-medium">Expiry</p>
                  </div>
                  <div className="flex items-center gap-[0.88rem]">
                    <p className="text-base">{formatDate(item.date_expiry)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
      {/* completed packages  */}
      {usage && usage?.data.completed_packages.length > 0 && (
        <section className="mt-16">
          <h2 className="font-montserrat text-h2-base font-500 md:text-[1.625rem]">
            Past Packages
          </h2>
          <div className="mt-8 grid gap-10 xl:grid-cols-2 xl:gap-20">
            {usage.data.completed_packages.map((item, index) => (
              <Card
                className="flex flex-col gap-[1.12rem] rounded-[1.8125rem] px-[1.5rem] py-[1.88rem]"
                key={index}
              >
                {/* Package Name  */}
                <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
                  <div className="flex items-center gap-[0.81rem]">
                    <Package size={24} className="text-primary" />
                    <p className="font-medium">Package</p>
                  </div>
                  <div className="flex items-center gap-[0.88rem]">
                    <p className="text-base">{item.package}</p>
                  </div>
                </div>

                {/* activated at  */}
                <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
                  <div className="flex items-center gap-[0.81rem]">
                    <CircleCheckBig size={24} className="text-primary" />
                    <p className="font-medium">Activated</p>
                  </div>
                  <div className="flex items-center gap-[0.88rem]">
                    <p className="text-base">
                      {formatDate(item.date_activated)}
                    </p>
                  </div>
                </div>

                {/* expired at at  */}
                <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
                  <div className="flex items-center gap-[0.81rem]">
                    <Hourglass size={24} className="text-primary" />
                    <p className="font-medium">Expiry</p>
                  </div>
                  <div className="flex items-center gap-[0.88rem]">
                    <p className="text-base">{formatDate(item.date_expiry)}</p>
                  </div>
                </div>

                {/* {usage.data.sim.can_renew && (
                  <Button className="rounded-full">Buy Again</Button>
                )} */}
              </Card>
            ))}
          </div>
        </section>
      )}
      {/* assigned packages  */}
      {usage && usage?.data.assigned_packages.length > 0 && (
        <section className="mt-16">
          <h2 className="font-montserrat text-h2-base font-500 md:text-[1.625rem]">
            Not Activated Packages
          </h2>
          <div className="mt-8 grid gap-10 xl:grid-cols-2 xl:gap-20">
            {usage.data.assigned_packages.map((item, index) => (
              <Card
                className="flex flex-col gap-[1.12rem] rounded-[1.8125rem] px-[1.5rem] py-[1.88rem]"
                key={index}
              >
                {/* Package Name  */}
                <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
                  <div className="flex items-center gap-[0.81rem]">
                    <Package size={24} className="text-primary" />
                    <p className="font-medium">Package</p>
                  </div>
                  <div className="flex items-center gap-[0.88rem]">
                    <p className="text-base">{item.package}</p>
                  </div>
                </div>

                {/* quantity */}
                <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
                  <div className="flex items-center gap-[0.81rem]">
                    <Gift size={24} className="text-primary" />
                    <p className="font-medium">Quantity</p>
                  </div>
                  <div className="flex items-center gap-[0.88rem]">
                    <p className="text-base">{item.quantity}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
      {/* revoked packages  */}
      {usage && usage?.data.revoked_packages.length > 0 && (
        <section className="mt-10">
          <h2 className="text-h2">Revoked Packages</h2>
          <div className="mt-8 grid gap-10 xl:grid-cols-2 xl:gap-20">
            {usage.data.revoked_packages.map((item, index) => (
              <Card
                className="flex flex-col gap-[1.12rem] rounded-[1.8125rem] px-[1.5rem] py-[1.88rem]"
                key={index}
              >
                {/* Package Name  */}
                <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
                  <div className="flex items-center gap-[0.81rem]">
                    <Package size={24} className="text-primary" />
                    <p className="text-base font-medium">Package</p>
                  </div>
                  <div className="flex items-center gap-[0.88rem]">
                    <p className="text-base">{item.package}</p>
                  </div>
                </div>

                {/* revoked at */}
                <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
                  <div className="flex items-center gap-[0.81rem]">
                    <Hourglass size={24} className="text-primary" />
                    <p className="text-base font-medium">Revoked At</p>
                  </div>
                  <div className="flex items-center gap-[0.88rem]">
                    <p className="text-base">{formatDate(item.revoked_at)}</p>
                  </div>
                </div>

                {/* {usage.data.sim.can_renew && (
                  <Button className="rounded-full">Buy Again</Button>
                )} */}
              </Card>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default SimDetails;
