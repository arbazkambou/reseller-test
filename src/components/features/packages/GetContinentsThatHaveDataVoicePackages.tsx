import africa from "@/_assets/images/afrigaImg.png";
import asia from "@/_assets/images/asiaImg.png";
import caribbean from "@/_assets/images/caribbeanImg.png";
import europe from "@/_assets/images/europeImg.png";
import gcc from "@/_assets/images/gccImg.png";
import middleEast from "@/_assets/images/middleEastImg.png";
import northAmerica from "@/_assets/images/northAmericaImg.png";
import oceania from "@/_assets/images/OceaniaImg.png";
import southAmerica from "@/_assets/images/southAmericaImg.png";
import { getContinentsThatHaveDataVoicePackages } from "@/services/packages.services";
import RegionImageCard from "./RegionImageCard";

async function GetContinentsThatHaveDataVoicePackages() {
  const continents = await getContinentsThatHaveDataVoicePackages();

  const customRegions = continents.map((item) => {
    const { name } = item;
    if (name === "Africa") {
      return { ...item, imgSrc: africa };
    } else if (name === "Asia") {
      return { ...item, imgSrc: asia };
    } else if (name === "Caribbean") {
      return { ...item, imgSrc: caribbean };
    } else if (name === "Europe") {
      return { ...item, imgSrc: europe };
    } else if (name === "GCC Middle East") {
      return { ...item, imgSrc: gcc };
    } else if (name === "Middle East") {
      return { ...item, imgSrc: middleEast };
    } else if (name === "North America") {
      return { ...item, imgSrc: northAmerica };
    } else if (name === "Oceania") {
      return { ...item, imgSrc: oceania };
    } else if (name === "South America") {
      return { ...item, imgSrc: southAmerica };
    } else {
      return { ...item, imgSrc: africa };
    }
  });

  return (
    <section className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
      {customRegions.map((item, index) => (
        <div key={index} className="flex w-full items-center justify-center">
          <RegionImageCard
            name={item.name}
            slug={item.slug}
            imgSrc={item.imgSrc}
            index={index}
          />
        </div>
      ))}
    </section>
  );
}

export default GetContinentsThatHaveDataVoicePackages;
