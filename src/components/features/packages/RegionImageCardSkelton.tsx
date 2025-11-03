import { Skeleton } from "@/components/ui/skeleton";

function RegionImageCardSkelton() {
  return (
    <section className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 20 }).map((item, index) => (
        <Skeleton className="h-[200px] w-full" key={index} />
      ))}
    </section>
  );
}

export default RegionImageCardSkelton;
