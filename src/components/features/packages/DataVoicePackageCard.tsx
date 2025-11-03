"use client";

import phonicoIcon from "@/_assets/images/phonico.png";
import ultimateMobileIcon from "@/_assets/images/ultimate.png";
import fiveg from "@/_assets/svgs/5g.svg";
import orangeProviderIcon from "@/_assets/svgs/orangeLogo.svg";
import { Card } from "@/components/ui/card";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { CountryInfoAndPackages, Package } from "@/types/packages.types";
import {
  ArrowUpRight,
  Calendar,
  Globe,
  MessageCircle,
  Phone,
} from "lucide-react";
import Image from "next/image";
import PackageDetailModal from "./PackageDetailModal";

function DataVoicePackageCard({
  selectedPackageId,
  setSelectedPackageId,
  packageDetail,
  index,
  countryInfoAndPackages,
}: {
  selectedPackageId: string;
  setSelectedPackageId: (value: string) => void;
  packageDetail: Package;
  index: number;
  countryInfoAndPackages: CountryInfoAndPackages;
}) {
  const {
    data_unit,
    data_quantity,
    package_validity,
    package_validity_unit,
    price,
    discounted_price,
    discount_percentage,
    highest_connectivity,
    countries,
    provider,
    voice_quantity,
    voice_unit,
    original_price,
    sms_quantity,
    international_minutes,
    international_sms,
  } = packageDetail;

  const providers = ["ultimate_mobile", "Phonico", "Orange"];

  const isOrangeProvider = provider === "Orange";
  const isEsimNetProvider = provider === "Esim.net";

  const isUnlimitedSms = sms_quantity < 0;
  const isInternationalMinutes =
    international_minutes && international_minutes > 0;
  const isInternationalSms = international_sms && international_sms > 0;
  const isCardShouldChangeForOrangeProvider =
    isOrangeProvider && (isInternationalMinutes || isInternationalSms);

  const isDiscount = discount_percentage > 0;

  const shouldShowCardIcon =
    !isDiscount &&
    (providers.includes(provider) || highest_connectivity === "5G");

  let cardIcon;

  if (shouldShowCardIcon) {
    if (provider === "ultimate_mobile") {
      cardIcon = ultimateMobileIcon;
    } else if (provider === "Phonico") {
      cardIcon = phonicoIcon;
    } else if (provider === "Orange") {
      cardIcon = orangeProviderIcon;
    } else {
      cardIcon = fiveg;
    }
  }

  return (
    <Card
      className={`group relative rounded-2xl border-2 shadow-none transition-all hover:border-primary hover:cursor-pointer hover:shadow-xl ${
        selectedPackageId === packageDetail.id && "border-primary shadow-xl"
      } h-full`}
      onClick={() => {
        setSelectedPackageId(packageDetail.id);
        // scrollToAddToCartIfMobile();
      }}
    >
      {/* Best Choice Badge */}
      {/* <div className="flex items-center justify-center">
        {index === 1 && (
          <div className="absolute -top-7 flex w-[101.5%] items-center justify-center rounded-t-md bg-primary py-1">
            <p className="flex items-center justify-center gap-1 text-body-sm font-500 text-background">
              <Trophy size={15} />
              Best Choice
            </p>
          </div>
        )}
      </div> */}

      {/* Price Card  */}
      <div className="relative flex h-full flex-col justify-between gap-1 p-3">
        {/* Discount Baddge  */}
        {isDiscount && (
          <div
            className={`absolute right-0 top-0 w-max rounded-bl-sm rounded-tl-sm rounded-tr-sm bg-primary-accent p-1 px-4 ${
              index === 1 ? "!rounded-tr-none" : "rounded-tr-[0.9rem]"
            }`}
          >
            <p className="text-center text-body-sm font-500 text-foreground">
              Save {discount_percentage}%
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <RadioGroupItem value={packageDetail.id} />

            {/* {shouldShowCardIcon && } */}

            {shouldShowCardIcon && (
              <Image
                src={cardIcon}
                alt="eSIM provider"
                height={25}
                width={25}
                sizes="auto"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-body-md font-500 leading-[100%]">
              {data_quantity === -1
                ? `Unlimited ${
                    data_unit && data_unit !== "Standard" ? data_unit : "Data"
                  }`
                : `${data_quantity} ${data_unit}`}
            </p>
            <p className="flex items-center gap-1 text-xs leading-[100%] text-muted-foreground">
              <Calendar size={14} className="opacity-80" /> {package_validity}{" "}
              {package_validity_unit}
              {package_validity > 1 && "s"}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center text-body-md font-500 leading-none">
              ${isDiscount ? discounted_price : price}
              <span className="ms-1 text-xs text-muted-foreground">USD</span>
              {isDiscount && (
                <span className="ms-2 text-xs text-destructive line-through opacity-70 xl:text-body-sm">
                  ${original_price}
                </span>
              )}
            </p>

            {isCardShouldChangeForOrangeProvider ? (
              <div className="flex flex-col gap-1">
                <p className="flex items-start gap-1 text-xs leading-[100%] text-muted-foreground">
                  <Phone size={14} className="opacity-80" />
                  <span className="max-w-[120px]">
                    Europe Unlimited minutes/sms
                  </span>
                </p>
                <p className="flex items-start gap-1 text-xs leading-[100%] text-muted-foreground">
                  <Phone size={14} className="opacity-80" />
                  <span>
                    {isInternationalMinutes && !isInternationalSms && (
                      <>
                        {" "}
                        Intl.{" "}
                        <span className="font-500 text-foreground">
                          {international_minutes}
                        </span>
                        min /
                      </>
                    )}
                    {isInternationalSms && !isInternationalMinutes && (
                      <>
                        Intl.{" "}
                        <span className="font-500 text-foreground">
                          {international_sms}
                        </span>
                        sms
                      </>
                    )}

                    {isInternationalMinutes && isInternationalSms && (
                      <>
                        {" "}
                        Intl.{" "}
                        <span className="font-500 text-foreground">
                          {international_minutes}{" "}
                        </span>
                        min /{" "}
                        <span className="font-500 text-foreground">
                          {international_sms}{" "}
                        </span>
                        sms
                      </>
                    )}
                  </span>
                </p>
              </div>
            ) : (
              <>
                <p className="flex items-center gap-1 text-xs leading-[100%] text-muted-foreground">
                  <Phone size={14} className="opacity-80" />{" "}
                  {voice_quantity < 0
                    ? "Unlimited Minutes"
                    : `${voice_quantity} ${voice_unit}`}
                </p>

                <p className="flex items-center gap-1 text-xs leading-[100%] text-muted-foreground">
                  <MessageCircle size={14} className="opacity-80" />{" "}
                  {isEsimNetProvider && "Incoming Only"}
                  {!isEsimNetProvider && isUnlimitedSms && "Unlimited SMS"}
                  {!isEsimNetProvider &&
                    !isUnlimitedSms &&
                    `${sms_quantity} SMS`}
                </p>
              </>
            )}

            <p className="flex items-center gap-1 text-xs leading-[100%] text-muted-foreground">
              <Globe size={14} className="opacity-80" />
              <span className="flex items-center gap-1">
                {countries.length > 1 &&
                  countries
                    .slice(0, 3)
                    .map((item, index) => (
                      <Image
                        key={index}
                        src={item.image_url}
                        height={10}
                        width={16}
                        alt={`${item.name} flag`}
                        sizes="auto"
                        className="rounded-[2px] object-cover shadow-md"
                      />
                    ))}

                {countries.length === 1 && countries[0].name}

                {countries.slice(3).length > 1 && (
                  <span className="ml-0.5 rounded-full text-xs">
                    +{countries.slice(3).length}
                  </span>
                )}
              </span>
            </p>
          </div>
        </div>

        <div>
          <PackageDetailModal
            packageDetail={packageDetail}
            countryInfoAndPackages={countryInfoAndPackages}
            index={index}
          >
            View Details
            <ArrowUpRight
              size={19}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </PackageDetailModal>
        </div>
      </div>
    </Card>
  );
}

export default DataVoicePackageCard;
