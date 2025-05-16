export interface UfoSighting {
  id: number;
  date: string;
  count: number;
  location: string;
  description: string;
}

export interface ProcessedSighting extends UfoSighting {
  parsedDate: Date;
  weekNumber: number;
  year: number;
}

export interface WeekData {
  weekNumber: number;
  year: number;
  startDate: Date;
  endDate: Date;
  days: {
    date: Date;
    count: number;
    dayOfWeek: number;
    formattedDate: string;
    hasData: boolean;
  }[];
  totalSightings: number;
}

export interface SightingsState {
  allSightings: ProcessedSighting[];
  currentWeekData: WeekData | null;
  isLoading: boolean;
  error: Error | null;
  availableWeeks: {
    weekNumber: number;
    year: number;
    startDate: Date;
    endDate: Date;
  }[];
  currentWeekIndex: number;
}

export type SightingsAction =
  | { type: "SET_SIGHTINGS"; payload: ProcessedSighting[] }
  | { type: "SET_CURRENT_WEEK"; payload: number }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: Error | null };

export interface ApiResponse {
  data: UfoSighting[];
  error?: string;
}
