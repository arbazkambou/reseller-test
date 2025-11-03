import { Skeleton } from "@/components/ui/skeleton";

export function StartingPriceSkelton() {
  return (
    <div className="grid gap-x-[1.2rem] gap-y-[1rem] sm:grid-cols-2 md:gap-y-[1.5rem] xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          className="group flex justify-between rounded-lg border border-muted bg-background px-[1.06rem] py-[0.94rem]"
          key={index}
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-[40px] w-[40px] rounded-full" />
            <div className="flex flex-col justify-center">
              <Skeleton className="mb-1 h-5 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
