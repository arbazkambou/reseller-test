import { format, parseISO } from "date-fns";

export const formateDate = (dateString: string): string => {
  if (!dateString) return "";

  try {
    const date = parseISO(dateString);
    return format(date, "MMM dd, yyyy, hh:mm a");
  } catch (error) {
    console.error("Invalid date format:", error);
    return dateString;
  }
};
