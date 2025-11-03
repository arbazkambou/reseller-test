import { Card } from "@/components/ui/card";
import { CircleCheckBig, Gift, Hourglass, Package } from "lucide-react";
import DataOnlyUsageChart from "./DataOnlyUsageChart";
import DataVoiceUsageChart from "./DataVoiceUsageChart";
import SimDetailCard from "./SimDetailCard";
import {
  DataOnlyUsage,
  DataVoiceUsage,
  SimUsageResponse,
} from "@/types/sims.types";
import { formatDate } from "@/helpers/formatDate";
import OrangeUsageChart from "./OrangeUsageChart";
import SimInstallationGuide from "./SimInstallationGuide";

interface PropsType {
  usage: SimUsageResponse;
}

export function isDataVoiceUsageType(
  usage: DataOnlyUsage | DataVoiceUsage
): usage is DataVoiceUsage {
  return usage != null && "initial_minutes" in usage;
}

function SimDetails({ usage }: PropsType) {
  const overall_usage = usage?.data?.overall_usage;
  const hasExtraInfo =
    isDataVoiceUsageType(overall_usage) && overall_usage.extra_info?.length > 0;

  if (!overall_usage) return null;

  return (
    <>
      <h1 className="text-center text-h1 md:text-start text-accent-foreground">
        eSIM Details
      </h1>
      <p className="text-muted-foreground">
        Reach out to the world’s most reliable eSim services
      </p>
      <section
        className={`mt-10 grid gap-10 ${
          hasExtraInfo ? "xl:grid-cols-3" : "xl:grid-cols-2"
        }`}
      >
        <SimDetailCard simUsage={usage} />

        {isDataVoiceUsageType(overall_usage) ? (
          <>
            <DataVoiceUsageChart usage={overall_usage} />
            {hasExtraInfo && <OrangeUsageChart usage={overall_usage} />}
          </>
        ) : (
          <DataOnlyUsageChart usage={overall_usage} />
        )}
      </section>

      {/* activated packages  */}
      {usage?.data.in_use_packages.length > 0 && (
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
      {usage?.data.completed_packages.length > 0 && (
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
      {usage?.data.assigned_packages.length > 0 && (
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
      {usage?.data.revoked_packages.length > 0 && (
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

      {/* esim installation guide  */}
      <section className="mt-16">
        <h2 className="font-montserrat text-[22px] font-500">
          eSIM installation
        </h2>

        <SimInstallationGuide simUsage={usage} />
      </section>
    </>
  );
}

export default SimDetails;
