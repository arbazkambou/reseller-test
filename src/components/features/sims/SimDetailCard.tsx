"use client";

import { Card } from "@/components/ui/card";
import {
  Calendar,
  Code,
  Globe,
  KeySquare,
  Loader,
  Microchip,
  Phone,
  QrCode,
} from "lucide-react";

import SimCoverageModal from "./SimCoverageDialog";
import CopyButton from "./CopyButton";
import QrCodeGenerator from "./QrCodeGenerator";
import { SimUsageResponse } from "@/types/sims.types";
import { formatDate } from "@/helpers/formatDate";

function SimDetailCard({ simUsage }: { simUsage: SimUsageResponse }) {
  const {
    id,
    last_bundle,
    iccid,
    number,
    created_at,
    status,
    qr_code_text,
    smdp_address,
    matching_id,
  } = simUsage.data.sim;

  const coverage = simUsage.data.coverage;
  const isICCIDNull = iccid === null || iccid === "" || iccid === " ";

  return (
    <Card className="flex flex-col gap-[0.7rem] rounded-[1.8125rem] px-[0.88rem] py-[1.5rem]">
      <h2 className="max-w-[300px] text-wrap break-words  text-h2 sm:max-w-full ">
        {last_bundle}
      </h2>
      {/* ICCID  */}
      <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
        <div className="flex items-center gap-[0.81rem]">
          <Microchip size={24} className="text-primary" />
          <p className=" font-medium">{isICCIDNull ? "SIM ID" : "ICCID"}</p>
        </div>

        {isICCIDNull ? (
          <div className="flex items-center gap-[0.88rem]">
            <p className="text-sm">{id}</p>
            <CopyButton text={id} />
          </div>
        ) : (
          <div className="flex items-center gap-[0.88rem]">
            <p>{iccid.slice(0, 14)}...</p>
            <CopyButton text={iccid} />
          </div>
        )}
      </div>

      {/* SMDP  */}
      <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
        <div className="flex items-center gap-[0.81rem]">
          <Code size={24} className="text-primary" />
          <p className=" font-medium">SMDP + Address</p>
        </div>

        {smdp_address ? (
          <div className="flex gap-[0.88rem]">
            <p className="max-w-[250px] text-wrap break-words  sm:max-w-full">
              {smdp_address}
            </p>
            <CopyButton text={smdp_address} />
          </div>
        ) : (
          <p className="max-w-[250px] text-wrap break-words  sm:max-w-full">
            In Process
          </p>
        )}
      </div>

      {/* Number  */}
      {number && (
        <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
          <div className="flex items-center gap-[0.81rem]">
            <Phone size={23} className="text-primary" />
            <p className="font-medium">Number</p>
          </div>
          <div className="flex items-center gap-[0.88rem]">
            <p className="">{number}</p>
            <CopyButton text={number} />
          </div>
        </div>
      )}

      {/* Activation Code  */}

      {matching_id && (
        <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
          <div className="flex items-center gap-[0.81rem]">
            <KeySquare size={24} className="text-primary" />
            <p className="font-medium">Activation Code</p>
          </div>
          <div className="flex gap-[0.88rem] ">
            <p className="max-w-[250px] text-wrap break-words  md:max-w-[350px] xl:max-w-full">
              {matching_id.slice(0, 14)}...
            </p>
            <CopyButton text={matching_id} />
          </div>
        </div>
      )}

      {/* Manual Entry  */}
      {/* <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
                <div className="flex items-center gap-[0.81rem]">
                  <Settings2 size={24} className="text-primary" />
                  <p className=" font-semibold">Manual Entry (Android)</p>
                </div>
                <div className="flex items-center gap-[0.88rem] ">
                  <p className="max-w-[200px] text-wrap break-words">
                    {usage.sim.qr_code_text}
                  </p>
                  <CopyButton text="864890678530256" />
                </div>
              </div> */}

      {/* Purchase Date  */}
      <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
        <div className="flex items-center gap-[0.81rem]">
          <Calendar size={24} className="text-primary" />
          <p className="font-medium">Purchase Date</p>
        </div>

        <p className="">{formatDate(created_at)}</p>
      </div>

      {/* Coverage  */}
      <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
        <div className="flex items-center gap-[0.81rem]">
          <Globe size={24} className="text-primary" />
          <p className="font-medium">Coverage</p>
        </div>
        <div className="w-max">
          <SimCoverageModal coverage={coverage} />
        </div>
      </div>

      {/* Status  */}
      <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
        <div className="flex items-center gap-[0.81rem]">
          <Loader size={24} className="text-primary" />
          <p className="font-medium">Status</p>
        </div>

        <p className="">{status}</p>
      </div>

      {qr_code_text && (
        <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
          <div className="flex items-center gap-[0.81rem]">
            <QrCode size={23} className="text-primary" />
            <p className="font-medium">LPA(Local Profile Assitant)</p>
          </div>
          <div className="flex items-center gap-[0.88rem]">
            <p className="">{qr_code_text.slice(0, 30)}...</p>
            <CopyButton text={qr_code_text} />
          </div>
        </div>
      )}

      {/* Renewable date  */}
      {/* <div className="flex flex-col gap-1 rounded-[0.5625rem] bg-muted px-[0.81rem] py-[0.69rem] md:flex-row md:justify-between">
                <div className="flex items-center gap-[0.81rem]">
                  <Calendar1 size={24} className="text-primary" />
                  <p className=" font-semibold">Renewable Date</p>
                </div>
  
                <p className="">May 07,2023</p>
              </div> */}

      {qr_code_text ? (
        <div className="ms-4 flex justify-between">
          <div className="flex flex-col gap-4">
            <p className="font-medium">QR Code</p>
            <QrCodeGenerator qrCodeValue={qr_code_text} isShareable={true} />
          </div>
          {/* <div>
          <Button className="flex items-center !rounded-pill" size={"sm"}>
            <Settings />
            Manage Subscription
          </Button>
        </div> */}
        </div>
      ) : (
        <p className="rounded-[0.5625rem] bg-info/10 p-2 text-info">
          Package activation is in process
        </p>
      )}
    </Card>
  );
}

export default SimDetailCard;
