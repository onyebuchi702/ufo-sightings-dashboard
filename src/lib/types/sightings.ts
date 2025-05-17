export interface UfoSighting {
  id: number;
  date: string;
  count: number;
  location: string;
  description: string;
  sightings: number;
}

export interface ProcessedSighting extends UfoSighting {
  parsedDate: Date;
  weekNumber: number;
  year: number;
}

export interface WeekDay {
  date: Date;
  count: number;
  dayOfWeek: number;
  formattedDate: string;
  hasData: boolean;
}

export interface WeekData {
  weekNumber: number;
  year: number;
  startDate: Date;
  endDate: Date;
  days: WeekDay[];
  totalSightings: number;
}

export type WeeklySighting = {
  parsedDate: Date;
  weekNumber: number;
  year: number;
};

export type RawSighting = {
  date: string;
  parsedDate?: string | Date;
  weekNumber?: number;
  year?: number;
  sightings?: number;
};

export interface ApiResponse {
  data: UfoSighting[];
  error?: string;
}
