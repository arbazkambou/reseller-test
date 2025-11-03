import { Input } from "@/components/ui/input";
import { cleanString } from "@/helpers/cleanString";
import { CountryInfoAndPackages, Package } from "@/types/packages.types";

import {
  Antenna,
  Calendar,
  Database,
  Dot,
  MessageCircle,
  Phone,
  Rocket,
  Search,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { MyTooltip } from "./MyTooltip";
import PackageDetailItem from "./PackageDetailItem";

interface PropsType {
  packageDetail: Package;
  countryInfoAndPackages: CountryInfoAndPackages;
}

function PackageDetail({ packageDetail, countryInfoAndPackages }: PropsType) {
  const [searchQuery, setSearchQuery] = useState("");
  const { image_url } = countryInfoAndPackages;

  const {
    name: packageName,
    data_quantity,
    data_unit,
    package_validity,
    package_validity_unit,
    throttling,
    tether,
    coverage,
    countries,
    sms_quantity,
    voice_quantity,
    voice_unit,
    provider,
    package_type,
    activation_type_description,
    other_info,
    unthrottle_data,
    throttle_speed,
    international_minutes,
    international_sms,
  } = packageDetail;

  const isOrangeProvider = provider === "Orange";
  const isEsimNetProvider = provider === "Esim.net";
  const isUnlimitedSms = sms_quantity < 0;

  const isInternationalMinutes = isOrangeProvider && international_minutes > 0;
  const isInternationlSms = isOrangeProvider && international_sms > 0;

  const filteredCoverage = countries.map((country) => ({
    country_name: country.name,
    package_name: packageDetail.name,
    code: country.code,
    code_alpha3: country.code_alpha3,
    local_state_code: country.local_state_code,
    country_coverage: coverage.filter(
      (item) => item.country_name === country.name
    ),
  }));

  let filterCoverageByQuery = filteredCoverage;

  if (searchQuery) {
    filterCoverageByQuery = filteredCoverage.filter(
      (item) =>
        cleanString(item.country_name).includes(searchQuery) ||
        cleanString(item.code).includes(searchQuery) ||
        cleanString(item.code_alpha3).includes(searchQuery) ||
        cleanString(
          item.local_state_code ? item.local_state_code : ""
        ).includes(searchQuery) ||
        item.country_coverage.some(
          (item) =>
            cleanString(item.country_name).includes(cleanString(searchQuery)) ||
            cleanString(item.network_name).includes(cleanString(searchQuery)) ||
            cleanString(item.network_code).includes(cleanString(searchQuery)) ||
            cleanString(item.iso).includes(cleanString(searchQuery))
        )
    );
  }

  // const providers = ["ultimate_mobile", "Phonico"];
  return (
    <>
      {/* flag and package name  */}
      <div className="mt-2 flex items-center gap-6">
        <Image
          src={image_url}
          alt="Global Packages"
          width={38}
          height={38}
          sizes="auto"
          className="shrink-0 rounded-full object-cover shadow-md"
        />
        <h3 className="text-start text-base font-500 leading-none xl:text-body-lg xl:leading-normal">
          {packageName}
        </h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3.5">
        {/* data quantity  */}
        <PackageDetailItem>
          <div className="flex items-center gap-2">
            <Database size={19} className="text-primary" />
            <p className="font-500">Data</p>
          </div>
          <p>
            {data_quantity === -1 ? "Unlimited" : data_quantity} {data_unit}
          </p>
        </PackageDetailItem>

        {/* validity  */}
        <PackageDetailItem>
          <div className="flex items-center gap-2">
            <Calendar size={19} className="text-primary" />
            <p className="text-base font-500">Validity</p>
          </div>
          <p>
            {package_validity} {package_validity_unit}
            {package_validity > 1 && "s"}
          </p>
        </PackageDetailItem>

        {/* throttling  */}
        <PackageDetailItem>
          <div className="flex items-center gap-2">
            <Rocket size={19} className="text-primary" />
            <p className="text-base font-500">Speed Limit</p>
          </div>
          <p className="flex items-center gap-2">
            {throttling ? (
              <>
                <span>Yes</span>
                {throttle_speed && unthrottle_data && (
                  <MyTooltip
                    message={`${unthrottle_data}/day high-speed data, then unlimited data at ${throttle_speed}. The data limit resets every 24 hours from the first use.`}
                  />
                )}
              </>
            ) : (
              "No"
            )}
          </p>
        </PackageDetailItem>

        {/* Tethering Hotspot  */}
        <PackageDetailItem>
          <div className="flex items-center gap-2">
            <Antenna size={19} className="text-primary" />
            <p className="text-base font-500">Tethering/Hotspot</p>
          </div>
          <p>{tether ? "Yes" : "No"}</p>
        </PackageDetailItem>

        {package_type === "DATA-VOICE-SMS" && (
          <>
            {/* minutes quantity  */}
            {voice_quantity !== 0 && (
              <PackageDetailItem>
                <div className="flex items-center gap-2">
                  <Phone size={19} className="text-primary" />
                  <p className="text-base font-500">{voice_unit}</p>
                </div>
                <p>{voice_quantity < 0 ? "Unlimited" : voice_quantity}</p>
              </PackageDetailItem>
            )}

            {/* sms quantity  */}
            {sms_quantity !== 0 && (
              <PackageDetailItem>
                <div className="flex items-center gap-2">
                  <MessageCircle size={19} className="text-primary" />
                  <p className="text-base font-500">SMS</p>
                </div>
                <p>
                  {isEsimNetProvider && "Incoming Only"}
                  {!isEsimNetProvider && isUnlimitedSms && "Unlimited SMS"}
                  {!isEsimNetProvider && !isUnlimitedSms && sms_quantity}
                </p>
              </PackageDetailItem>
            )}
          </>
        )}

        {isInternationalMinutes && (
          <PackageDetailItem>
            <div className="flex items-center gap-2">
              <Phone size={19} className="text-primary" />
              <p className="text-base font-500">International Minutes</p>
            </div>
            <p>{international_minutes}</p>
          </PackageDetailItem>
        )}

        {isInternationlSms && (
          <PackageDetailItem>
            <div className="flex items-center gap-2">
              <MessageCircle size={19} className="text-primary" />
              <p className="text-base font-500">International SMS</p>
            </div>
            <p>{international_sms}</p>
          </PackageDetailItem>
        )}
      </div>

      {/* search network coverage  */}
      <div className="flex flex-col gap-3.5">
        <div
          className={`grid gap-4 ${
            filteredCoverage.length > 2 && "xl:grid-cols-2"
          } shrink-0`}
        >
          <p className="text-xl font-500">Supported Countries & Networks</p>
          {filteredCoverage.length > 2 && (
            <div className={`relative h-full w-full shrink-0`}>
              <Input
                placeholder="Search country or netwrok"
                className="h-[50px] w-full shrink-0 xl:h-full"
                onChange={(e) => setSearchQuery(cleanString(e.target.value))}
                value={searchQuery}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 transform text-primary" />
            </div>
          )}
        </div>

        <div className="barMini max-h-[170px] min-h-[170px] overflow-auto rounded-[0.6rem] border bg-secondary px-3 py-2">
          <div className="flex flex-col gap-4">
            {filterCoverageByQuery.length !== 0 ? (
              filterCoverageByQuery.map((item, index) => (
                <div className="flex flex-wrap gap-1" key={index}>
                  <p className="me-6 text-body-md font-500">
                    {item.country_name}
                  </p>
                  {item.country_coverage.map((countryCoverage, index) => (
                    <div
                      className="flex items-center gap-[0.62rem] rounded-full border bg-background p-1 text-sm"
                      key={index}
                    >
                      <p>{countryCoverage.network_name}</p>

                      <p className="!rounded-full bg-primary px-2 text-primary-foreground">
                        {countryCoverage.supported_networks_coverages.join(
                          ", "
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p className="h-full text-center text-muted-foreground">
                Nothing matches your search 🙂
              </p>
            )}
          </div>
        </div>
      </div>

      {/* message of activation  */}
      <ul className="flex flex-col rounded-[9px] border border-primary p-1">
        <li className="flex text-sm">
          <Dot size={18} className="shrink-0" />
          {activation_type_description}
        </li>
        {other_info &&
          other_info.split("\\n").map((item, index) => (
            <li className="flex text-sm" key={index}>
              <Dot size={18} className="shrink-0" />
              {item}
            </li>
          ))}
      </ul>
    </>
  );
}

export default PackageDetail;
