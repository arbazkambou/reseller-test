"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, MessageCircle, Phone } from "lucide-react";
import { CircularProgressBar } from "../sims/CircularProgressbar";
import { DataVoiceUsage } from "@/types/sims.types";

export default function DataVoiceUsageChart({
  usage,
}: {
  usage: DataVoiceUsage;
}) {
  const {
    initial_data_quantity,
    rem_data_quantity,
    initial_data_unit,
    rem_data_unit,
    initial_minutes,
    initial_minutes_unit,
    rem_minutes,
    rem_minutes_unit,
    initial_sms,
    initial_sms_unit,
    rem_sms,
    rem_sms_unit,
  } = usage;

  const isUnlimitedData =
    initial_data_quantity === -1 || initial_data_quantity < 0;
  const isUnlimitedMinutes = initial_minutes === -1 || initial_minutes < 0;
  const isUnlimitedSms = initial_sms === -1 || initial_sms < 0;
  const isInComingOnlySms = initial_sms === -2;

  const remainingPercentageOfData = isUnlimitedData
    ? 100
    : rem_data_quantity === 0
    ? 0
    : (Number(rem_data_quantity) / initial_data_quantity) * 100;

  const remainingPercentageOfMinutes = isUnlimitedMinutes
    ? 100
    : rem_minutes === 0
    ? 0
    : (Number(rem_minutes) / initial_minutes) * 100;

  const remainingPercentageOfSms =
    isUnlimitedSms || isInComingOnlySms
      ? 100
      : rem_sms === 0
      ? 0
      : (Number(rem_sms) / initial_sms) * 100;

  return (
    <Card className="flex h-full w-full flex-col justify-between rounded-[29px] px-[25px] py-[33px] shadow-md">
      <h2 className="text-h2">Data Usage</h2>

      <Tabs defaultValue="data">
        <TabsList className="flex items-center gap-2 p-0 sm:gap-4">
          <TabsTrigger
            value="data"
            className="flex items-center justify-center gap-2 rounded-full px-4 py-3"
          >
            <Database size={20} className="srink-0" />
            <span>Data</span>
          </TabsTrigger>
          <TabsTrigger
            value="minutes"
            className="flex items-center justify-center gap-2 rounded-full px-4 py-3"
          >
            <Phone size={20} className="shrink-0" />
            <span>Minutes</span>
          </TabsTrigger>
          <TabsTrigger
            value="sms"
            className="flex items-center justify-center gap-2 rounded-full px-4 py-3"
          >
            <MessageCircle size={20} className="shrink-0" />
            <span>SMS</span>
          </TabsTrigger>
        </TabsList>

        {/* Data tab content  */}
        <TabsContent value={"data"} className="mt-20">
          <div className="relative mb-12 flex items-center justify-center">
            <CircularProgressBar percentage={remainingPercentageOfData} />
            <div className="absolute mt-4 flex flex-col items-center">
              <div className="mb-2 flex items-center gap-2">
                <Database className="shrink-0 text-primary" size={20} />
                <span className="text-base font-500 text-muted-foreground">
                  {isUnlimitedData ? "Unlimited Data" : " Remaining Data"}
                </span>
              </div>
              {!isUnlimitedData && (
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-primary p-1 text-xs text-background xs:px-2 xs:py-1 xs:text-base">
                    {rem_data_quantity} {rem_data_unit}
                  </div>
                  <span className="text-base text-muted-foreground">
                    out of
                  </span>
                  <div className="rounded-md bg-primary p-1 text-xs text-background xs:px-2 xs:py-1 xs:text-base">
                    {initial_data_quantity} {initial_data_unit}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Minutes tab content  */}
        <TabsContent value={"minutes"} className="mt-20">
          <div className="relative mb-12 flex items-center justify-center">
            <CircularProgressBar percentage={remainingPercentageOfMinutes} />
            <div className="absolute mt-4 flex flex-col items-center">
              <div className="mb-2 flex items-center gap-2">
                <Phone className="shrink-0 text-primary" size={20} />
                <span className="text-base font-500 text-muted-foreground">
                  {isUnlimitedMinutes
                    ? "Unlimited Minutes"
                    : " Remaining Minutes"}
                </span>
              </div>
              {!isUnlimitedMinutes && (
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-primary p-1 text-xs text-background xs:px-2 xs:py-1 xs:text-base">
                    {rem_minutes} {rem_minutes_unit}
                  </div>
                  <span className="text-base text-muted-foreground">
                    out of
                  </span>
                  <div className="rounded-md bg-primary p-1 text-xs text-background xs:px-2 xs:py-1 xs:text-base">
                    {initial_minutes} {initial_minutes_unit}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Sms tab content  */}
        <TabsContent value={"sms"} className="mt-20">
          <div className="relative mb-12 flex items-center justify-center">
            <CircularProgressBar percentage={remainingPercentageOfSms} />
            <div className="absolute mt-4 flex flex-col items-center">
              <div className="mb-2 flex items-center gap-2">
                <MessageCircle className="shrink-0 text-primary" size={20} />
                <span className="text-base font-500 text-muted-foreground">
                  {isInComingOnlySms
                    ? "Incoming SMS Only"
                    : isUnlimitedSms
                    ? "Unlimited SMS"
                    : "Remaining SMS"}
                </span>
              </div>
              {!isUnlimitedSms && !isInComingOnlySms && (
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-primary p-1 text-xs text-background xs:px-2 xs:py-1 xs:text-base">
                    {rem_sms} {rem_sms_unit}
                  </div>
                  <span className="text-base text-muted-foreground">
                    out of
                  </span>
                  <div className="rounded-md bg-primary p-1 text-xs text-background xs:px-2 xs:py-1 xs:text-base">
                    {initial_sms} {initial_sms_unit}
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
