"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import useMediaQuery from "@/hooks/useMediaQuery";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  getTopDestinations,
  searchPackagesList,
} from "@/services/packages.services";
import CountryRegionSearch from "./CountryRegionSearch";

function SearchPackagesList() {
  const [isClient, setIsClient] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { data: packagesList, isLoading: isListLoading } = useQuery({
    queryKey: ["search-packages-list"],
    queryFn: searchPackagesList,
    staleTime: Infinity,
    enabled: isClient,
  });

  const { data: topDestinations, isLoading: isDestinationsLoading } = useQuery({
    queryKey: ["top-destinations"],
    queryFn: getTopDestinations,
    staleTime: Infinity,
    enabled: isClient,
  });

  const isDataLoading = isListLoading || isDestinationsLoading;

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isDesktop ? (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative z-50 w-full h-full">
          <Input
            placeholder="Search your destination"
            className="w-full rounded-full shadow py-4 sm:h-full"
            readOnly
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 transform text-primary" />
        </div>
      </DialogTrigger>

      <DialogContent className="!max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-montserrat text-lg font-semibold">
            Search your destination
          </DialogTitle>
        </DialogHeader>
        <CountryRegionSearch
          packagesList={packagesList!}
          topDesinations={topDestinations!}
          isDataLoading={isDataLoading}
        />
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer repositionInputs={false}>
      <DrawerTrigger asChild>
        <div className="relative z-50 w-full h-full">
          <Input
            placeholder="Search your destination"
            className="w-full rounded-full shadow py-5.5 sm:h-full"
            readOnly
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 transform text-primary" />
        </div>
      </DrawerTrigger>
      <DrawerContent className="p-3">
        <DrawerHeader className="p-0">
          <DrawerTitle className="mb-2 text-start font-montserrat text-lg font-semibold">
            Search your destination
          </DrawerTitle>
        </DrawerHeader>
        <CountryRegionSearch
          packagesList={packagesList!}
          topDesinations={topDestinations!}
          isDataLoading={isDataLoading}
        />
      </DrawerContent>
    </Drawer>
  );
}

export default SearchPackagesList;
