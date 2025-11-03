"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addItem, getTotalCartItems } from "@/redux/slices/cartSlice";
import { PackagesData } from "@/types/packages.types";
import { ArrowUpLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CartSheet from "../cart/CartSheet";
import IncDecButtons from "../cart/IncDecButtons";
import CountryPackageCard from "./CountryPackageCard";
import DataVoicePackageCard from "./DataVoicePackageCard";
import InfoMessage from "./InfoMessage";

function PackagesList({ packages }: { packages: PackagesData }) {
  const [selectedPackageId, setSelectedPackageId] = useState("");

  const { name } = packages.data;
  const [cartQuantity, setCartQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const dispatch = useAppDispatch();
  const totalCartQuantity = useAppSelector((state) =>
    getTotalCartItems(state.cart)
  );
  // const pathName = usePathname();

  // const isDataVoice = pathName.endsWith("esim/");

  const limitedPackages = packages.data.packages.filter(
    (item) => !item.unlimited
  );
  const unlimitedPackages = packages.data.packages.filter(
    (item) => item.unlimited
  );

  const isHaveSomeLimitedPackages = limitedPackages.length > 5;
  const isHaveSomeUnlimitedPackages = unlimitedPackages.length > 5;

  const isLimitedPackages = limitedPackages.length > 0;

  const isUnlimitedPackages = unlimitedPackages.length > 0;

  const [isUnlimited, setIsUnlimited] = useState(
    isLimitedPackages ? false : true
  );

  // let isSelectedPackageFromVodafoneOrO2;

  //To show a info text if selected package is from vodafone or o2
  // if (selectedPackageId) {
  //   const selectedPackage = packages.data.packages.find(
  //     (pkg) => pkg.id === selectedPackageId
  //   );

  //   if (selectedPackage) {
  //     isSelectedPackageFromVodafoneOrO2 = ["Esim.net"].includes(
  //       selectedPackage.provider
  //     );
  //   }
  // }

  //this function is used to track which package is currently selected
  function handleValueChange(packageId: string) {
    setSelectedPackageId(packageId);
    setCartQuantity(1);
  }

  //this function is used to toggle between limited and unlimited packages
  function handleCheckChange(check: boolean) {
    setCartQuantity(1);
    setIsUnlimited(() => check);
  }

  //this function is used to hanlde add to cart logic
  function handleAddToCart() {
    //check to prevent adding of more than 5 items in the cart
    if (totalCartQuantity >= 5) {
      toast.error("You can only add up to 5 eSIM packages to your cart.");
      setShowCart(true);
      return;
    }

    //get the id of package from the state and then find the details of the package from the packages array and put in the cart
    if (selectedPackageId) {
      const searchedPackage = packages.data.packages.find(
        (item) => item.id === selectedPackageId
      );

      if (searchedPackage) {
        const cartItem = {
          ...searchedPackage,
          quantity: cartQuantity,
          image_url: packages.data.image_url,
          recurring: 0,
          can_renew: searchedPackage.can_renew ? true : false,
        };
        dispatch(addItem(cartItem));
        toast.success("Your package has been added to the cart successfully!");
        setShowCart(true);
        setCartQuantity(1);
      }
    }
  }

  //1. if user select unlimited packages then it will select first item in unlimited packages array
  //2. if user select limited packages then it will select first item in limited packages array
  useEffect(() => {
    if (isUnlimited && unlimitedPackages.length > 0) {
      setSelectedPackageId(unlimitedPackages[0].id);
    } else if (!isUnlimited && limitedPackages.length > 0) {
      setSelectedPackageId(limitedPackages[0].id);
    } else {
      setSelectedPackageId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUnlimited]);

  return (
    <>
      <div>
        {/* Country packages  */}
        <Card className="flex flex-col gap-[1.5rem]">
          <CardHeader>
            <h2 className="text-center text-lg font-600 md:text-[1.25rem] xl:text-start">
              Pick the Best eSIM Plans for {name} Travel
            </h2>

            {/* Limited and Unlimited packages filter  */}
            <div className="flex items-center justify-between">
              {isUnlimitedPackages && isLimitedPackages && (
                <div className="flex items-center gap-3 text-body-sm font-500">
                  <p
                    className={`${
                      isUnlimited
                        ? "text-muted-foreground"
                        : "text-foreground opacity-80"
                    }`}
                  >
                    Standard Plan
                  </p>
                  <Switch
                    className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary"
                    checked={isUnlimited}
                    onCheckedChange={handleCheckChange}
                  />
                  <p
                    className={`${
                      isUnlimited
                        ? "text-foreground"
                        : "text-muted-foreground opacity-80"
                    }`}
                  >
                    Unlimited Data
                  </p>
                </div>
              )}
            </div>
          </CardHeader>

          {/* COuntry packages card   */}
          <CardContent className="mt-4 max-h-[580px] min-h-[580px] overflow-auto pb-8 pe-2 pt-8">
            {isLimitedPackages && (
              <RadioGroup
                value={selectedPackageId}
                onValueChange={handleValueChange}
                defaultValue={`${limitedPackages[0].id}`}
                className={`grid gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-6 ${
                  isHaveSomeLimitedPackages
                    ? "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
                    : "grid-cols-[repeat(auto-fit,minmax(250px,260px))]"
                }
 ${isUnlimited && "hidden"} items-stretch `}
              >
                {limitedPackages.map((item, index) =>
                  item.package_type !== "DATA-VOICE-SMS" ? (
                    <div key={index} className="h-full">
                      <CountryPackageCard
                        key={index}
                        packageDetail={item}
                        index={index}
                        setSelectedPackageId={setSelectedPackageId}
                        selectedPackageId={selectedPackageId}
                        countryInfoAndPackages={packages.data}
                      />
                    </div>
                  ) : (
                    <div key={index} className="h-full">
                      <DataVoicePackageCard
                        selectedPackageId={selectedPackageId}
                        setSelectedPackageId={setSelectedPackageId}
                        index={index}
                        packageDetail={item}
                        key={index}
                        countryInfoAndPackages={packages.data}
                      />
                    </div>
                  )
                )}
              </RadioGroup>
            )}

            {isUnlimitedPackages && (
              <RadioGroup
                value={selectedPackageId}
                defaultValue={`${unlimitedPackages[0].id}`}
                onValueChange={handleValueChange}
                className={`grid  gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-6 ${
                  isHaveSomeUnlimitedPackages
                    ? "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
                    : "grid-cols-[repeat(auto-fit,minmax(250px,260px))]"
                }
 ${!isUnlimited && "hidden"} items-stretch`}
              >
                {unlimitedPackages.map((item, index) =>
                  item.package_type !== "DATA-VOICE-SMS" ? (
                    <div key={index} className="h-full">
                      <CountryPackageCard
                        key={index}
                        packageDetail={item}
                        index={index}
                        setSelectedPackageId={setSelectedPackageId}
                        selectedPackageId={selectedPackageId}
                        countryInfoAndPackages={packages.data}
                      />
                    </div>
                  ) : (
                    <div key={index} className="h-full">
                      <DataVoicePackageCard
                        selectedPackageId={selectedPackageId}
                        setSelectedPackageId={setSelectedPackageId}
                        index={index}
                        packageDetail={item}
                        key={index}
                        countryInfoAndPackages={packages.data}
                      />
                    </div>
                  )
                )}
              </RadioGroup>
            )}

            {!isLimitedPackages && !isUnlimitedPackages && <InfoMessage />}
          </CardContent>

          {/* Increament decreament and add to cart buttons  */}

          {(isLimitedPackages || isUnlimitedPackages) && (
            <CardContent
              className="grid grid-cols-[auto_1fr] justify-between gap-4 xl:gap-6 items-stretch"
              id="addToCart"
            >
              <IncDecButtons
                cartQuantity={cartQuantity}
                setCartQuantity={setCartQuantity}
              />

              <div>
                <Button
                  className={`group flex h-full w-full items-center gap-3 text-sm py-5 rounded-xl`}
                  onClick={handleAddToCart}
                >
                  <ArrowUpLeft
                    className="transition group-hover:rotate-90 group-hover:text-primary-foreground"
                    size={20}
                  />
                  Add To Cart
                </Button>
              </div>
            </CardContent>
          )}

          {/* {isSelectedPackageFromVodafoneOrO2 && (
            <InfoMessage
              message="Usage outside the supported regions may result in the full consumption of your plan’s allowances. Calls are only permitted within the country you are traveling in."
              className="min-h-max text-sm"
            />
          )} */}

          {/* Check compatibility modal */}
          {/* <CheckCompatibilityModal /> */}

          {/* Country meta tabs  */}
          {/* {packages.page_features && <PagesMeta packages={packages} />} */}
        </Card>
      </div>

      {/* Add to cart side panel  or sheet */}
      <CartSheet setShowCart={setShowCart} showCart={showCart} />
    </>
  );
}

export default PackagesList;
