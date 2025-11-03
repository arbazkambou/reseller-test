import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { cleanString } from "@/helpers/cleanString";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Coverage } from "@/types/sims.types";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import { useState } from "react";

interface reshapedCoverage {
  country_name: string;
  country_coverage: Coverage[];
}

function SimCoverageModal({ coverage }: { coverage: Coverage[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const reshapedCoverage = coverage.reduce<reshapedCoverage[]>((acc, cur) => {
    const existingCountry = acc.find(
      (item) => item.country_name === cur.country_name
    );

    if (existingCountry) {
      existingCountry.country_coverage.push(cur);
    } else {
      acc.push({
        country_name: cur.country_name,
        country_coverage: [{ ...cur }],
      });
    }
    return acc;
  }, []);

  let filterCoverageByQuery = reshapedCoverage;

  if (searchQuery) {
    filterCoverageByQuery = reshapedCoverage.filter((country) =>
      country.country_coverage.some(
        (coverage) =>
          cleanString(country.country_name || "").includes(
            cleanString(searchQuery)
          ) ||
          cleanString(coverage.network_name || "").includes(
            cleanString(searchQuery)
          )
      )
    );
  }

  if (isDesktop)
    return (
      <Dialog>
        <DialogTrigger>
          <p className="text-base underline underline-offset-2">See Coverage</p>
        </DialogTrigger>
        <DialogContent
          className="flex max-h-[92vh] flex-col gap-3 overflow-auto scrollbar-thin sm:gap-7"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <div className="flex flex-col gap-6">
            <div className={`grid h-full shrink-0 gap-4`}>
              <DialogTitle>
                <p className="text-xl font-500">
                  Supported Countries & Networks
                </p>
              </DialogTitle>

              <div className={`relative h-full w-full shrink-0`}>
                <Input
                  placeholder="Search country or netwrok"
                  className="h-[50px] w-full shrink-0 xl:h-full"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 transform text-primary" />
              </div>
            </div>
            <div className="barMini max-h-[300px] min-h-[300px] overflow-auto rounded-[0.6rem] border bg-secondary p-4">
              <div className="flex flex-col gap-6">
                {filterCoverageByQuery.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground">
                    No results found :(
                  </p>
                ) : (
                  filterCoverageByQuery.map((item, index) => (
                    <div className="flex flex-wrap gap-1" key={index}>
                      <p className="me-6 text-body-md font-500">
                        {item.country_name}
                      </p>
                      {item.country_coverage.map((countryCoverage, index) => (
                        <div
                          className="flex items-center gap-[0.62rem] rounded-[0.6rem] border bg-background p-1 text-sm"
                          key={index}
                        >
                          <p>{countryCoverage.network_name}</p>
                          <p className="rounded-[0.6rem] bg-primary-accent px-1">
                            {countryCoverage.supported_networks_coverages.join(
                              ", "
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer repositionInputs={false}>
      <DrawerTrigger>
        <p className="text-base underline underline-offset-2">See Coverage</p>
      </DrawerTrigger>
      <DrawerContent
        className="flex flex-col gap-3 p-3 sm:gap-7"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <div className="flex flex-col gap-6">
          <div
            className={`grid gap-4 ${
              reshapedCoverage.length > 2 && "xl:grid-cols-2"
            } h-full shrink-0`}
          >
            <p className="text-xl font-500">Supported Countries & Networks</p>
            {reshapedCoverage.length > 2 && (
              <div className={`relative h-full w-full shrink-0`}>
                <Input
                  placeholder="Search country or netwrok"
                  className="h-[50px] w-full shrink-0 xl:h-full"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 transform text-primary" />
              </div>
            )}
          </div>
          <div className="barMini max-h-[200px] min-h-[200px] overflow-auto rounded-[0.6rem] border bg-secondary p-4">
            <div className="flex flex-col gap-6">
              {filterCoverageByQuery.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground">
                  No results found :(
                </p>
              ) : (
                filterCoverageByQuery.map((item, index) => (
                  <div className="flex flex-wrap gap-1" key={index}>
                    <p className="me-6 text-body-md font-500">
                      {item.country_name}
                    </p>
                    {item.country_coverage.map((countryCoverage, index) => (
                      <div
                        className="flex items-center gap-[0.62rem] rounded-[0.6rem] border bg-background p-1 text-sm"
                        key={index}
                      >
                        <p>{countryCoverage.network_name}</p>
                        <p className="rounded-[0.6rem] bg-primary-accent px-1">
                          {countryCoverage.supported_networks_coverages.join(
                            ", "
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default SimCoverageModal;
