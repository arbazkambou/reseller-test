import { format } from "date-fns";

export const formatDateRange = (date: Date | undefined) =>
  date ? format(date, "yyyy-MM-dd") : null;
