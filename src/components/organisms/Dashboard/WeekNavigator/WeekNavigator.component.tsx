"use client";

import { Button } from "@/components/atoms";
import { WeekData } from "@/lib/types";
import { formatDateRange } from "@/lib/utils";
import React from "react";

interface WeekNavigatorProps {
  weekData: WeekData | null;
  hasNextWeek: boolean;
  hasPreviousWeek: boolean;
  onNextWeek: () => void;
  onPreviousWeek: () => void;
  isLoading: boolean;
}

export const WeekNavigator = ({
  weekData,
  hasNextWeek,
  hasPreviousWeek,
  onNextWeek,
  onPreviousWeek,
  isLoading,
}: WeekNavigatorProps) => {
  const weekDisplayText = weekData
    ? formatDateRange(weekData.startDate, weekData.endDate)
    : "No week selected";

  return (
    <div className="flex items-center justify-between mb-4">
      <Button
        onClick={onPreviousWeek}
        disabled={!hasPreviousWeek || isLoading}
        variant="outline"
        className="flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Previous Week
      </Button>

      <div className="text-center">
        <h2 className="text-lg font-semibold">{weekDisplayText}</h2>
        {weekData && (
          <p className="text-sm text-gray-600">
            Week {weekData.weekNumber}, {weekData.year}
          </p>
        )}
      </div>

      <Button
        onClick={onNextWeek}
        disabled={!hasNextWeek || isLoading}
        variant="outline"
        className="flex items-center"
      >
        Next Week
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </div>
  );
};
