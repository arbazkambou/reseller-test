"use client";

import { formatDateRange } from "@/helpers/formateDateRange";
import { DateRangePicker } from "./date-range-picker";
import { useDateRange } from "@/providers/DateRangeProvider";

function PickDate() {
  const { setDates } = useDateRange();
  return (
    <DateRangePicker
      showCompare={false}
      align="start"
      onUpdate={(values) => {
        const payload = {
          start_date: formatDateRange(values.range?.from),
          end_date: formatDateRange(values.range?.to),
        };

        setDates(payload.start_date, payload.end_date);
      }}
    />
  );
}

export default PickDate;
