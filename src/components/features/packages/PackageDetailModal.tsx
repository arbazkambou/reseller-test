import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/useMediaQuery";
import { CountryInfoAndPackages, Package } from "@/types/packages.types";
import PackageDetail from "./PackageDetail";

interface PropsType {
  packageDetail: Package;
  countryInfoAndPackages: CountryInfoAndPackages;
  children: React.ReactNode;
  index: number;
}

function PackageDetailModal({
  packageDetail,
  countryInfoAndPackages,
  children,
  index,
}: PropsType) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {/* this div is just for seo  */}
      {index === 0 && (
        <div className="sr-only">
          <PackageDetail
            packageDetail={packageDetail}
            countryInfoAndPackages={countryInfoAndPackages}
          />
        </div>
      )}

      {isDesktop ? (
        <Dialog>
          <DialogTrigger className="group flex items-center gap-3 text-xs text-primary">
            {children}
          </DialogTrigger>
          <DialogContent
            className="flex max-h-[90vh] flex-col gap-3 overflow-auto scrollbar-thin sm:gap-5 sm:max-w-2xl"
            onOpenAutoFocus={(event) => event.preventDefault()}
          >
            <PackageDetail
              packageDetail={packageDetail}
              countryInfoAndPackages={countryInfoAndPackages}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer repositionInputs={false}>
          <DrawerTrigger className="group flex items-center gap-3 text-xs text-primary">
            {children}
          </DrawerTrigger>

          <DrawerContent className="grid max-h-[94%] grid-rows-[auto_1fr]">
            <div className="flex flex-col gap-3 overflow-auto p-3 sm:gap-6">
              <PackageDetail
                packageDetail={packageDetail}
                countryInfoAndPackages={countryInfoAndPackages}
              />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

export default PackageDetailModal;
