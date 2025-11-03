import { Skeleton } from "@/components/ui/skeleton";

interface DataTableSkeletonProps {
  /**
   * Number of columns in the table
   * @default 6
   */
  columnCount?: number;
  /**
   * Number of rows to show in the skeleton
   * @default 10
   */
  rowCount?: number;
  /**
   * Whether to show the header section with title and actions
   * @default true
   */
  showHeader?: boolean;
  /**
   * Whether to show the pagination section
   * @default true
   */
  showPagination?: boolean;
  /**
   * Whether to show filter input
   * @default true
   */
  showFilter?: boolean;
  /**
   * Whether to show action buttons in header
   * @default true
   */
  showActions?: boolean;
  /**
   * Custom column widths for different column types
   * @default undefined (equal width columns)
   */
  columnWidths?: string[];
}

export function DataTableSkeleton({
  columnCount = 6,
  rowCount = 3,
  showHeader = true,
  showPagination = true,
  showFilter = true,
  showActions = true,
  columnWidths,
}: DataTableSkeletonProps) {
  return (
    <div className="w-full space-y-4">
      {/* Header Section */}
      {showHeader && (
        <div className="space-y-4">
          {/* Title and Description */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>

          {/* Filter and Actions Row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              {showFilter && (
                <div className="relative">
                  <Skeleton className="h-10 w-64" />
                </div>
              )}
              {/* Filter badges/chips */}
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-28" />
              </div>
            </div>

            {showActions && (
              <div className="flex gap-2">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-16" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr className=" bg-muted/50">
                {Array.from({ length: columnCount }).map((_, index) => (
                  <th
                    key={index}
                    className="h-12 px-4 text-left align-middle font-medium"
                    style={
                      columnWidths?.[index]
                        ? { width: columnWidths[index] }
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-16 sm:w-20" />
                      {/* Sort icon skeleton */}
                      <Skeleton className="h-4 w-4" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {Array.from({ length: rowCount }).map((_, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  {Array.from({ length: columnCount }).map((_, colIndex) => (
                    <td key={colIndex} className="p-4 align-middle">
                      {/* Different skeleton types for different column patterns */}
                      {colIndex === 0 ? (
                        // First column - usually ID or primary identifier
                        <Skeleton className="h-4 w-24 sm:w-32" />
                      ) : colIndex === columnCount - 1 ? (
                        // Last column - usually actions
                        <div className="flex justify-end">
                          <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                      ) : colIndex === 2 ? (
                        // Third column - often buttons or badges
                        <Skeleton className="h-8 w-20 rounded-md" />
                      ) : colIndex === columnCount - 3 ? (
                        // Status column - usually badges
                        <Skeleton className="h-6 w-16 rounded-full" />
                      ) : (
                        // Regular text columns
                        <Skeleton className="h-4 w-20 sm:w-28" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-16" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-1">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
