"use client";

import { generateSlug } from "@/helpers/generateSlug";
import { CountryWithStartingPrice } from "@/types/packages.types";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PropsType {
  country: CountryWithStartingPrice;
}

function StartingPriceCard({ country }: PropsType) {
  const pathname = usePathname();
  const prefixUrl = pathname.startsWith("/reseller") ? "/reseller" : "/dealer";
  const isDataVoicePackage = pathname.includes("data-voice-esim");

  return (
    <Link
      className="group flex justify-between rounded-2xl border bg-secondary px-[1.06rem] py-[0.94rem] transition-all hover:scale-105 hover:border-primary hover:bg-background hover:shadow-2xl h-full"
      href={
        isDataVoicePackage
          ? `${prefixUrl}/data-voice/${generateSlug(country.name)}`
          : `${prefixUrl}/data-only/${country.slug}`
      }
    >
      <div className="flex items-center gap-3">
        <div className="relative h-[42px] w-[42px]">
          <Image
            src={country.image_url}
            alt={`${country.name} flag`}
            sizes="auto"
            fill
            className="shrink-0 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-body-base font-500">{country.name}</h3>
          <p className="text-sm">Starts at ${country.starts_at}</p>
        </div>
      </div>
      <div>
        <ArrowUpRight className="group-hover:rotate-45 group-hover:text-primary" />
      </div>
    </Link>
  );
}

export default StartingPriceCard;
