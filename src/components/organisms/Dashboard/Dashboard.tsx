"use client";

import React from "react";
import { useSightings } from "@/lib/contexts";
import { Card, ErrorState, LoadingSpinner } from "@/components/atoms";

export const Dashboard = () => {
  const {
    isLoading,
    error,
    currentWeekData,
    navigateToNextWeek,
    navigateToPreviousWeek,
    hasNextWeek,
    hasPreviousWeek,
  } = useSightings();

  if (error) {
    return (
      <div className="py-8">
        <ErrorState
          message={`Failed to load UFO sightings data: ${error.message}`}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-16 flex justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading UFO sightings data...</p>
        </div>
      </div>
    );
  }

  if (!currentWeekData) {
    return (
      <div className="py-8">
        <Card>
          <div className="text-center py-8">
            <p className="text-gray-600">No UFO sightings data available.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Card>
        <div className="mt-4 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800">Week Summary</h3>
          <p className="text-blue-700 mt-1">
            Total sightings this week: {currentWeekData.totalSightings}
          </p>
          <p className="text-sm text-blue-600 mt-1">
            Data shown for Week {currentWeekData.weekNumber},{" "}
            {currentWeekData.year}
          </p>
        </div>
      </Card>
    </div>
  );
};
