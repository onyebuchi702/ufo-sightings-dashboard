import { WeekData } from "@/lib/types";

export interface SightingsChartProps {
  weekData: WeekData | null;
  isLoading: boolean;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      count: number;
      formattedDate: string;
    };
  }>;
}
