"use client";

import globalImg from "@/_assets/svgs/globalMap.svg";
import { Spinner } from "@/components/shared/skeltons/Spinner";
import { cleanString } from "@/helpers/cleanString";
import { isSearchQueryMatch } from "@/helpers/isSearchQueryMatch";
import { cn } from "@/lib/utils";
import {
  SearchPackagesListReturn,
  TopDestination,
} from "@/types/packages.types";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "../../ui/input";
import CountryItem from "./CountryItem";

interface PropsType {
  searchInputStyle?: string;
  packagesList: SearchPackagesListReturn;
  isDataLoading: boolean;
  topDesinations: TopDestination[];
}

function CountryRegionSearch({
  searchInputStyle,
  packagesList,
  isDataLoading,
  topDesinations,
}: PropsType) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  // const pathName = usePathname();

  // routes where Data/Voice/SMS takes precedence
  // const dataVoiceLinks = [
  //   "/data-voice-esim/",
  //   "/data-voice-esim/regional/",
  //   "/international-esim/",
  // ];
  // const isDataVoicePage = dataVoiceLinks.includes(pathName);

  // --- shared: click-outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- input change (safe while loading; does not trigger filtering while loading)
  function handleSearchQuery(e: React.ChangeEvent<HTMLInputElement>) {
    const query = cleanString(e.target.value);
    setSearchQuery(query);
    if (query) setShowSuggestions(true);
  }

  // --- when loading, do not run GTM or any filtering
  // useEffect(() => {
  //   if (isDataLoading) return;
  //   if (!cleanString(searchQuery)) return;

  //   const timeout = setTimeout(() => {
  //     sendGTMEvent({ event: "search", search_term: searchQuery });
  //   }, 1000);

  //   return () => clearTimeout(timeout);
  // }, [searchQuery, isDataLoading]);

  // --- build filtered results only when NOT loading and there is a query
  const filteredPackagesList = useMemo(() => {
    if (isDataLoading || !packagesList || !topDesinations) return null;
    if (!searchQuery) return null;

    const {
      local,
      regional,
      global,
      local_voice,
      regional_voice,
      global_voice,
    } = packagesList;

    return {
      dataOnly: {
        local: local.filter((country) =>
          isSearchQueryMatch({ country, searchQuery })
        ),
        regional: regional.filter((region) =>
          isSearchQueryMatch({ region, searchQuery })
        ),
        global: {
          href: global.href,
          countries: global.countries.filter((country) =>
            isSearchQueryMatch({ country, searchQuery, isGlobal: true })
          ),
        },
      },
      dataVoice: {
        local: local_voice.filter((country) =>
          isSearchQueryMatch({ country, searchQuery })
        ),
        regional: regional_voice.filter((region) =>
          isSearchQueryMatch({ region, searchQuery })
        ),
        global: {
          href: global_voice.href,
          countries: global_voice.countries.filter((country) =>
            isSearchQueryMatch({ country, searchQuery, isGlobal: true })
          ),
        },
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDataLoading, searchQuery, packagesList]);

  // --- derive flags safely from filtered results
  const flags = useMemo(() => {
    if (!filteredPackagesList) {
      return {
        isPackages: false,
        isDataOnlyPackages: false,
        isDataVoicePackages: false,
        isDataOnlyLocal: false,
        isDataOnlyRegional: false,
        isDataOnlyGlobal: false,
        isDataVoiceLocal: false,
        isDataVoiceRegional: false,
        isDataVoiceGlobal: false,
      };
    }

    const { dataOnly, dataVoice } = filteredPackagesList;
    const { global, regional, local } = dataOnly;
    const {
      global: globalVoice,
      regional: regionalVoice,
      local: localVoice,
    } = dataVoice;

    const isDataOnlyPackages =
      local.length > 0 || regional.length > 0 || global.countries.length > 0;

    const isDataVoicePackages =
      localVoice.length > 0 ||
      regionalVoice.length > 0 ||
      globalVoice.countries.length > 0;

    const isPackages = isDataOnlyPackages || isDataVoicePackages;

    return {
      isPackages,
      isDataOnlyPackages,
      isDataVoicePackages,
      isDataOnlyLocal: isDataOnlyPackages && local.length > 0,
      isDataOnlyRegional: isDataOnlyPackages && regional.length > 0,
      isDataOnlyGlobal: isDataOnlyPackages && global.countries.length > 0,
      isDataVoiceLocal: isDataVoicePackages && localVoice.length > 0,
      // fixed: these should check isDataVoicePackages, not isDataOnlyPackages
      isDataVoiceRegional: isDataVoicePackages && regionalVoice.length > 0,
      isDataVoiceGlobal:
        isDataVoicePackages && globalVoice.countries.length > 0,
    };
  }, [filteredPackagesList]);

  return (
    <div
      ref={containerRef}
      className="relative z-50 grid w-full grid-rows-[auto_1fr] gap-2"
    >
      {/* Search Input */}
      <div className="relative w-full">
        <Input
          placeholder="Enter your destination"
          className={cn("!rounded-lg py-5", searchInputStyle)}
          onChange={handleSearchQuery}
          value={searchQuery}
          onFocus={() => setShowSuggestions(true)}
          aria-expanded={showSuggestions}
          aria-haspopup="listbox"
          autoFocus
        />

        <Search className="absolute right-3 top-1/2 -translate-y-1/2 transform text-primary" />
      </div>

      {/* Dropdown */}
      <div className="barMini max-h-[80dvh] min-h-[80dvh] overflow-y-auto rounded-md bg-background py-4 md:max-h-[350px] lg:min-h-[350px]">
        {/* --- LOADING MODE: no functionality except message --- */}
        {isDataLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        ) : flags.isPackages ? (
          <div className="flex flex-col gap-4">
            {/* Data Only */}
            {flags.isDataOnlyPackages && (
              <div>
                <p className="mb-2 ps-2 font-montserrat text-[18px] font-semibold leading-none text-primary">
                  Data Only
                </p>

                {flags.isDataOnlyLocal && (
                  <div>
                    {filteredPackagesList?.dataOnly.local.map((item, index) => (
                      <CountryItem
                        countryName={item.name}
                        image_url={item.image_url}
                        index={index}
                        href={item.href}
                        key={`do-local-${index}-${item.name}`}
                      />
                    ))}
                  </div>
                )}

                {flags.isDataOnlyRegional && (
                  <div>
                    <p className="p-2 text-sm font-500 text-muted-foreground">
                      Regional
                    </p>
                    {filteredPackagesList?.dataOnly.regional.map(
                      (item, index) => (
                        <CountryItem
                          countryName={item.name}
                          image_url={item.image_url}
                          index={index}
                          href={item.href}
                          key={`do-reg-${index}-${item.name}`}
                        />
                      )
                    )}
                  </div>
                )}

                {flags.isDataOnlyGlobal && (
                  <div>
                    <p className="p-2 text-sm font-500 text-muted-foreground">
                      Global
                    </p>
                    <CountryItem
                      countryName="Global"
                      image_url={globalImg}
                      index={1}
                      href="/global/"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Data / Voice / SMS */}
            {flags.isDataVoicePackages && (
              <div>
                <p className="mb-2 ps-2 font-montserrat text-[18px] font-semibold leading-none text-primary">
                  Data / Voice / SMS
                </p>

                {flags.isDataVoiceLocal && (
                  <div>
                    {filteredPackagesList?.dataVoice.local.map(
                      (item, index) => (
                        <CountryItem
                          countryName={item.name}
                          image_url={item.image_url}
                          index={index}
                          href={item.href}
                          key={`dv-local-${index}-${item.name}`}
                        />
                      )
                    )}
                  </div>
                )}

                {flags.isDataVoiceRegional && (
                  <div>
                    <p className="p-2 text-sm font-500 text-muted-foreground">
                      Regional
                    </p>
                    {filteredPackagesList?.dataVoice.regional.map(
                      (item, index) => (
                        <CountryItem
                          countryName={item.name}
                          image_url={item.image_url}
                          index={index}
                          href={item.href}
                          key={`dv-reg-${index}-${item.name}`}
                        />
                      )
                    )}
                  </div>
                )}

                {flags.isDataVoiceGlobal && (
                  <div>
                    <p className="p-2 text-sm font-500 text-muted-foreground">
                      Global
                    </p>
                    <CountryItem
                      countryName="Global"
                      image_url={globalImg}
                      index={0}
                      href="/international-esim/"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          // No matches => show Top Destinations
          <div>
            {searchQuery && (
              <p className="mb-2 ps-2 text-sm">
                No match found — check out our top destinations!
              </p>
            )}

            <p className="mb-2 ps-2 font-montserrat text-[18px] font-semibold leading-none text-primary">
              Top Destinations
            </p>
            {topDesinations?.map((item, index) => (
              <CountryItem
                countryName={item.name}
                image_url={item.image_url}
                index={index}
                href={`/data-only/${item.slug}/`}
                key={`top-${index}-${item.slug}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CountryRegionSearch;
