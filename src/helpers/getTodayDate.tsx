import { format } from "date-fns";

export function getTodayDate() {
  return format(new Date(), "yyyy-MM-dd");
}
