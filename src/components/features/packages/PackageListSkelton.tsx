import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PackageListSkelton() {
  return (
    <Card className="w-full mx-auto p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-80" />

        {/* Toggle Switch */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-6 w-12 rounded-full" />
          <Skeleton className="h-5 w-28" />
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Top Row - 5 Cards */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="space-y-4 p-4 border border-border rounded-lg"
          >
            {/* Dot Indicator */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-2 rounded-full" />
            </div>

            {/* Data Amount */}
            <Skeleton className="h-6 w-16" />

            {/* Duration with Icon */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Price */}
            <Skeleton className="h-6 w-20" />

            {/* Country with Icon */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* View Details Link */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Row - 2 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 max-w-2xl">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="space-y-4 p-4 border border-border rounded-lg"
          >
            {/* Dot Indicator */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-2 rounded-full" />
            </div>

            {/* Data Amount */}
            <Skeleton className="h-6 w-16" />

            {/* Duration with Icon */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Price */}
            <Skeleton className="h-6 w-20" />

            {/* Country with Icon */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* View Details Link */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action Section */}
      <div className="flex items-center justify-between pt-6">
        {/* Quantity Selector */}
        <div className="flex items-center gap-2 border border-border rounded-lg p-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-6 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>

        {/* Add to Cart Button */}
        <Skeleton className="h-12 w-40 rounded-lg" />
      </div>
    </Card>
  );
}
