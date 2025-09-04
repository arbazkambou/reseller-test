import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function SimDetailSkeleton() {
  return (
    <Card className="flex flex-col gap-[3rem] rounded-[1.4rem] border px-[2rem] py-[2rem] shadow-none transition-all">
      {/* iccid skeleton */}
      <div className="flex items-center gap-2.5">
        <Skeleton className="h-[39px] w-[39px] rounded-full" />
        <div className="flex flex-col gap-0.5">
          <Skeleton className="h-5 w-[60px]" />
          <Skeleton className="h-5 w-[180px]" />
        </div>
      </div>

      {/* purchase date skeleton */}
      <div className="flex items-center gap-2.5">
        <Skeleton className="h-[39px] w-[39px] rounded-full" />
        <div className="flex flex-col gap-0.5">
          <Skeleton className="h-5 w-[140px]" />
          <Skeleton className="h-5 w-[200px]" />
        </div>
      </div>

      {/* Active bundle skeleton */}
      <div className="flex items-center gap-2.5">
        <Skeleton className="h-[39px] w-[39px] rounded-full" />
        <div className="flex flex-col gap-0.5">
          <Skeleton className="h-5 w-[120px]" />
          <Skeleton className="h-6 w-[160px]" />
        </div>
      </div>

      {/* see detail and qr code skeleton */}
      <div className="flex items-end justify-between">
        <Skeleton className="h-10 w-[130px] rounded-full" />
        <Skeleton className="h-[77px] w-[77px] rounded-md" />
      </div>
    </Card>
  );
}

export default SimDetailSkeleton;
