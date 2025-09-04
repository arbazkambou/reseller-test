"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type DateRangeContextType = {
  start_date: string | null;
  end_date: string | null;
  setDates: (from: string | null, to: string | null) => void;
};

const DateRangeContext = createContext<DateRangeContextType | undefined>(
  undefined
);

export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);

  const setDates = (from: string | null, to: string | null) => {
    setFromDate(from);
    setToDate(to);
  };

  return (
    <DateRangeContext.Provider
      value={{ start_date: fromDate, end_date: toDate, setDates }}
    >
      {children}
    </DateRangeContext.Provider>
  );
};

// Custom hook for easy usage
export const useDateRange = () => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error("useDateRange must be used inside DateRangeProvider");
  }
  return context;
};
