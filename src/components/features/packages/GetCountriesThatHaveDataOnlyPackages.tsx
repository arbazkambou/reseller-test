import { getCountriesThatHaveDataOnlyPackages } from "@/services/packages.services";
import StartingPriceCard from "./StartingPriceCard";

async function GetCountriesThatHaveDataOnlyPackages() {
  const countries = await getCountriesThatHaveDataOnlyPackages();
  return (
    <div className="grid gap-x-[1.2rem] gap-y-[1.3rem] sm:grid-cols-2 md:gap-y-[2rem] xl:grid-cols-3 2xl:grid-cols-4 items-stretch">
      {countries.map((country, index) => {
        return (
          <div key={index} className="h-full">
            <StartingPriceCard country={country} />
          </div>
        );
      })}
    </div>
  );
}

export default GetCountriesThatHaveDataOnlyPackages;
