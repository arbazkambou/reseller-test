"use client";

import { Card } from "@/components/ui/card";
import { DataOnlyUsage } from "@/types/sims.types";
import { Database } from "lucide-react";
import { CircularProgressBar } from "./CircularProgressbar";

export default function DataOnlyUsageChart({
  usage,
}: {
  usage: DataOnlyUsage;
}) {
  const {
    initial_data_quantity,
    rem_data_quantity,
    initial_data_unit,
    rem_data_unit,
    unlimited,
  } = usage;

  const isUnlimitedData =
    initial_data_quantity < 0 || initial_data_quantity === -1 || unlimited;

  const remainingPercentageOfData = isUnlimitedData
    ? 100
    : initial_data_quantity === 0
    ? 0
    : (rem_data_quantity / initial_data_quantity) * 100;

  return (
    <Card className="rounded-[29px] px-[25px] py-[33px] shadow-md">
      <h2 className="text-center text-h2">Data Usage</h2>
      <div className="flex  items-center justify-center">
        <div className="relative flex items-center justify-center">
          <CircularProgressBar percentage={remainingPercentageOfData} />
          <div className="absolute mt-4 flex flex-col items-center">
            <div className="mb-2 flex items-center gap-2">
              <Database className="text-primary" size={20} />
              <span className="text-base font-500 text-muted-foreground">
                {isUnlimitedData ? "Unlimited Data" : "Remaining Data"}
              </span>
            </div>
            {!isUnlimitedData && (
              <div className="flex items-center gap-2">
                <div className="rounded-md bg-primary p-1 text-xs text-background xs:px-2 xs:py-1 xs:text-base">
                  {rem_data_quantity} {rem_data_unit}
                </div>
                <span className="text-base text-muted-foreground">out of</span>
                <div className="rounded-md bg-primary p-1 text-xs text-background xs:px-2 xs:py-1 xs:text-base">
                  {initial_data_quantity} {initial_data_unit}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
