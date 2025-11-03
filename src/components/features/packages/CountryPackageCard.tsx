import fiveg from "@/_assets/svgs/5g.svg";
import { Card } from "@/components/ui/card";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { CountryInfoAndPackages, Package } from "@/types/packages.types";
import { ArrowUpRight, Calendar, Globe } from "lucide-react";
import Image from "next/image";
import PackageDetailModal from "./PackageDetailModal";

interface PropsType {
  selectedPackageId: string;
  setSelectedPackageId: (value: string) => void;
  packageDetail: Package;
  index: number;
  countryInfoAndPackages: CountryInfoAndPackages;
}
function CountryPackageCard({
  selectedPackageId,
  setSelectedPackageId,
  packageDetail,
  index,
  countryInfoAndPackages,
}: PropsType) {
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
    original_price,
  } = packageDetail;

  const { name } = countryInfoAndPackages;

  return (
    <Card
      className={`group relative dark:bg-secondary rounded-2xl border-2 shadow-none transition-all hover:border-primary 
       hover:cursor-pointer hover:shadow-xl ${
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
      <div className="relative flex flex-col gap-4 p-3">
        {/* Discount Baddge  */}

        {packageDetail.discount_percentage > 0 && (
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
        <div className="flex items-center justify-between">
          <RadioGroupItem value={packageDetail.id} />

          {discount_percentage === 0 && highest_connectivity === "5G" && (
            <Image
              src={fiveg}
              alt="5G Supported"
              height={17}
              width={20}
              sizes="auto"
            />
          )}
        </div>
        <div className="flex flex-col gap-[0.19rem]">
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
        <div>
          <p className="flex items-center text-body-md font-500">
            ${discount_percentage > 0 ? discounted_price : price}
            <span className="ms-1 text-xs text-muted-foreground">USD</span>
            {packageDetail.discounted_price > 0 && (
              <span className="ms-2 text-xs text-destructive line-through opacity-70 xl:text-body-sm">
                ${original_price}
              </span>
            )}
          </p>
          <p className="flex items-center gap-1 text-xs leading-[100%] text-muted-foreground">
            <Globe size={14} className="opacity-80" />
            <span className="flex items-center gap-1">
              {countries.length > 1 &&
                countries
                  .filter((item) => item.name === name)
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

              {countries.length > 1 &&
                countries
                  .filter((item) => item.name !== name)
                  .slice(0, 3)
                  .map((item, index) => (
                    <Image
                      key={index}
                      src={item.image_url}
                      height={10}
                      width={16}
                      alt="japan"
                      sizes="auto"
                      className="rounded-[2px] object-cover shadow-md"
                    />
                  ))}

              {countries.length === 1 && name}

              {countries.slice(3).length > 1 && (
                <span className="ml-0.5 rounded-full text-xs">
                  +{countries.slice(3).length}
                </span>
              )}
            </span>
          </p>
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

export default CountryPackageCard;
