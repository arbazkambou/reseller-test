import { Skeleton } from "@/components/ui/skeleton";

interface CreatePriceSkeletonProps {
  /**
   * Number of region/country fields to show
   * @default 10
   */
  regionCount?: number;
  /**
   * Number of selected users to show
   * @default 3
   */
  selectedUserCount?: number;
  /**
   * Whether to show the users dropdown
   * @default false
   */
  showUsersDropdown?: boolean;
}

export default function PricingSkeleton({
  regionCount = 10,
  selectedUserCount = 3,
  showUsersDropdown = false,
}: CreatePriceSkeletonProps) {
  return (
    <div>
      <div className="bg-card border border-border rounded-lg p-6 text-card-foreground">
        {/* Details Section */}
        <Skeleton className="h-6 w-16 mb-4" />
        <div className="grid gap-4 items-center mb-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          <div className="flex items-center gap-6">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 flex-1" />
          </div>
          <div className="flex items-center gap-6 mr-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 flex-1" />
          </div>
          <Skeleton className="h-10 w-24" />
          <div className="flex items-center gap-2 ml-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-4 ml-4" />
          </div>
        </div>

        <div className="border-t-2 border mb-6" />

        {/* Regions Section */}
        <Skeleton className="h-6 w-20 mb-4" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-8">
          {Array.from({ length: regionCount }).map((_, index) => (
            <div key={`region-${index}`} className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" /> {/* Flag emoji */}
                <Skeleton className="h-4 w-20" /> {/* Region title */}
              </div>
              <Skeleton className="h-10 w-full" /> {/* Input field */}
            </div>
          ))}
        </div>

        <div className="border-t-2 border mb-6" />

        {/* Countries Section */}
        <Skeleton className="h-6 w-24 mb-4" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-8">
          {Array.from({ length: regionCount }).map((_, index) => (
            <div key={`country-${index}`} className="flex flex-col gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" /> {/* Flag emoji */}
                <Skeleton className="h-4 w-20" /> {/* Country title */}
              </div>
              <Skeleton className="h-10 w-full" /> {/* Input field */}
            </div>
          ))}
        </div>

        <div className="border-t-2 border mb-6" />

        {/* Users To Assign Section */}
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="mb-6">
          <div className="rounded-lg border shadow-md w-full">
            <div className="flex flex-wrap items-center gap-2 p-2 min-h-[40px] border-b">
              {/* Selected Users Badges */}
              {Array.from({ length: selectedUserCount }).map((_, index) => (
                <div
                  key={`user-badge-${index}`}
                  className="flex items-center gap-2"
                >
                  <Skeleton className="h-6 w-20 rounded-full" />{" "}
                  {/* User badge */}
                </div>
              ))}
              {/* Search Input */}
              <div className="flex-1 min-w-[200px]">
                <Skeleton className="h-8 w-full" />
              </div>
            </div>

            {/* Users Dropdown */}
            {showUsersDropdown && (
              <div className="p-2">
                <Skeleton className="h-4 w-24 mb-2" />{" "}
                {/* "No results" or heading */}
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`user-option-${index}`}
                    className="flex items-center gap-2 p-2"
                  >
                    <div className="flex flex-col flex-1">
                      <Skeleton className="h-4 w-32 mb-1" /> {/* User name */}
                      <Skeleton className="h-3 w-40" /> {/* User email */}
                    </div>
                    <Skeleton className="h-4 w-4" /> {/* Checkmark */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <Skeleton className="h-10 w-20" /> {/* Submit button */}
          <Skeleton className="h-10 w-20" /> {/* Clear button */}
        </div>
      </div>
    </div>
  );
}
