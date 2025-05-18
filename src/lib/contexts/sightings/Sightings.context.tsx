import { ProcessedSighting, WeekData } from "@/types";
import { createContext, useContext } from "react";

type SightingsContextType = {
  sightings: ProcessedSighting[] | undefined;
  currentWeekData: WeekData | null;
  isLoading: boolean;
  error: Error | null;
  availableWeeks: Array<{
    weekNumber: number;
    year: number;
    startDate: Date;
    endDate: Date;
  }>;
  currentWeekIndex: number;
  navigateToNextWeek: () => void;
  navigateToPreviousWeek: () => void;
  hasNextWeek: boolean;
  hasPreviousWeek: boolean;
  refetch: () => void;
};

export const SightingsContext = createContext<SightingsContextType | undefined>(
  undefined
);

export function useSightings() {
  const context = useContext(SightingsContext);
  if (context === undefined) {
    throw new Error("useSightings must be used within a SightingsProvider");
  }
  return context;
}
