"use client";

import type { Column, Table } from "@tanstack/react-table";
import { ListFilter, RefreshCcw, X } from "lucide-react";
import * as React from "react";

import { DataTableDateFilter } from "@/components/data-table/data-table-date-filter";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { DataTableSliderFilter } from "@/components/data-table/data-table-slider-filter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DataTableViewOptions } from "../shared/data-table/DataTableViewOption";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

interface DataTableToolbarProps<TData> extends React.ComponentProps<"div"> {
  table: Table<TData>;
  handleFilterSubmit?: () => void;
  applyFilter?: boolean;
  refetchData?: () => void;
  isRefetching?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  children,
  className,
  handleFilterSubmit,
  applyFilter = true,
  refetchData,
  isRefetching,
  ...props
}: DataTableToolbarProps<TData>) {
  const [showFilterSheet, setShowFilterSheet] = React.useState(false);

  const isFiltered = table.getState().columnFilters.length > 0;

  const columns = React.useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table]
  );

  const onReset = React.useCallback(() => {
    table.resetColumnFilters();
  }, [table]);

  function onSubmitFilter() {
    if (handleFilterSubmit) {
      handleFilterSubmit();
      setShowFilterSheet(false);
      return;
    }
    setShowFilterSheet(false);
  }

  React.useEffect(() => {
    if (!isFiltered && handleFilterSubmit) {
      const timeout = setTimeout(() => {
        handleFilterSubmit();
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [isFiltered, handleFilterSubmit]);

  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className={cn(
        "flex w-full items-start justify-between gap-2 p-1",
        className
      )}
      {...props}
    >
      {applyFilter ? (
        <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
          <SheetTrigger asChild>
            <Button size={"sm"}>
              Apply Filters <ListFilter />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-card">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>You can apply filters here</SheetDescription>
            </SheetHeader>
            {/* <div className="flex flex-1 flex-wrap items-center gap-2"> */}

            <div className="flex flex-col gap-6 px-4">
              {columns.map((column) => (
                <DataTableToolbarFilter key={column.id} column={column} />
              ))}

              <div className="flex items-center gap-2 justify-between">
                <Button onClick={onSubmitFilter} className="flex-1">
                  Submit
                </Button>

                {isFiltered && (
                  <Button
                    aria-label="Reset filters"
                    variant="outline"
                    size="sm"
                    className="border-dashed flex-1"
                    onClick={() => {
                      onReset();
                    }}
                  >
                    <X />
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <div></div>
      )}

      <div className="flex items-center gap-2">
        {refetchData && (
          <Button size={"icon"} onClick={refetchData} disabled={isRefetching}>
            <RefreshCcw className={`${isRefetching ? "animate-spin" : ""}`} />
          </Button>
        )}

        {children}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
interface DataTableToolbarFilterProps<TData> {
  column: Column<TData>;
}

function DataTableToolbarFilter<TData>({
  column,
}: DataTableToolbarFilterProps<TData>) {
  {
    const columnMeta = column.columnDef.meta;

    const onFilterRender = React.useCallback(() => {
      if (!columnMeta?.variant) return null;

      switch (columnMeta.variant) {
        case "text":
          return (
            <div className="flex flex-col gap-2">
              <Label>{columnMeta.label} </Label>
              <Input
                placeholder={columnMeta.placeholder ?? columnMeta.label}
                value={(column.getFilterValue() as string) ?? ""}
                onChange={(event) => column.setFilterValue(event.target.value)}
                // className="h-8 w-40 lg:w-56"
              />
            </div>
          );

        case "number":
          return (
            <div className="relative">
              <Input
                type="number"
                inputMode="numeric"
                placeholder={columnMeta.placeholder ?? columnMeta.label}
                value={(column.getFilterValue() as string) ?? ""}
                onChange={(event) => column.setFilterValue(event.target.value)}
                className={cn("h-8 w-[120px]", columnMeta.unit && "pr-8")}
              />
              {columnMeta.unit && (
                <span className="absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm">
                  {columnMeta.unit}
                </span>
              )}
            </div>
          );

        case "range":
          return (
            <DataTableSliderFilter
              column={column}
              title={columnMeta.label ?? column.id}
            />
          );

        case "date":
        case "dateRange":
          return (
            <DataTableDateFilter
              column={column}
              title={columnMeta.label ?? column.id}
              multiple={columnMeta.variant === "dateRange"}
            />
          );

        case "select":
        case "multiSelect":
          return (
            <DataTableFacetedFilter
              column={column}
              title={columnMeta.label ?? column.id}
              options={columnMeta.options ?? []}
              multiple={columnMeta.variant === "multiSelect"}
            />
          );

        default:
          return null;
      }
    }, [column, columnMeta]);

    return onFilterRender();
  }
}
