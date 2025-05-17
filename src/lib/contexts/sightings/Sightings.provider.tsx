"use client";

import { fetchSightingsFromBackend } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ProcessedSighting, WeekDay } from "@/lib/types";
import {
  getFirstDayOfWeek,
  getLastDayOfWeek,
  getDaysInWeek,
  isSameDay,
  formatDayShort,
} from "@/lib/utils";
import React, { ReactNode, useMemo, useState } from "react";
import { SightingsContext } from "./Sightings.context";
import { normalizeSightings } from "./Sightings.util";

const FIVE_MINS = 1000 * 60 * 5;

export const SightingsProvider = ({ children }: { children: ReactNode }) => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

  const {
    data: sightings = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ufoSightings"],
    queryFn: async () => {
      const raw = await fetchSightingsFromBackend();
      return normalizeSightings(raw);
    },
    staleTime: FIVE_MINS,
  });

  const availableWeeks = useMemo(() => {
    if (!sightings || sightings.length === 0) return [];

    const weekMap = new Map<
      string,
      { year: number; weekNumber: number; sightings: ProcessedSighting[] }
    >();

    sightings.forEach((sighting) => {
      const key = `${sighting.year}-${sighting.weekNumber}`;
      if (!weekMap.has(key)) {
        weekMap.set(key, {
          year: sighting.year,
          weekNumber: sighting.weekNumber,
          sightings: [],
        });
      }
      weekMap.get(key)!.sightings.push(sighting);
    });

    return Array.from(weekMap.values())
      .map((week) => {
        const firstSighting = week.sightings[0];
        const startDate = getFirstDayOfWeek(firstSighting.parsedDate);
        const endDate = getLastDayOfWeek(firstSighting.parsedDate);

        return {
          weekNumber: week.weekNumber,
          year: week.year,
          startDate,
          endDate,
        };
      })
      .sort((a, b) => {
        if (a.year !== b.year) {
          return a.year - b.year;
        }
        return a.weekNumber - b.weekNumber;
      });
  }, [sightings]);

  const currentWeekData = useMemo(() => {
    if (availableWeeks.length === 0 || currentWeekIndex < 0) return null;

    const currentWeek = availableWeeks[currentWeekIndex];
    const weekDays: Date[] = getDaysInWeek(currentWeek.startDate);

    const days: WeekDay[] = weekDays.map((date) => {
      const daySightings = sightings.filter((s) =>
        isSameDay(s.parsedDate, date)
      );

      const count = daySightings.reduce((sum, s) => sum + s.sightings, 0);

      return {
        date,
        count,
        dayOfWeek: date.getDay(),
        formattedDate: formatDayShort(date),
        hasData: daySightings.length > 0,
      };
    });

    const totalSightings = days.reduce((sum, day) => sum + day.count, 0);

    return {
      weekNumber: currentWeek.weekNumber,
      year: currentWeek.year,
      startDate: currentWeek.startDate,
      endDate: currentWeek.endDate,
      days,
      totalSightings,
    };
  }, [sightings, availableWeeks, currentWeekIndex]);

  const hasNextWeek = currentWeekIndex < availableWeeks.length - 1;
  const hasPreviousWeek = currentWeekIndex > 0;

  const navigateToNextWeek = () => {
    if (hasNextWeek) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    }
  };

  const navigateToPreviousWeek = () => {
    if (hasPreviousWeek) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    }
  };

  return (
    <SightingsContext.Provider
      value={{
        sightings,
        currentWeekData,
        isLoading,
        error: error instanceof Error ? error : null,
        availableWeeks,
        currentWeekIndex,
        navigateToNextWeek,
        navigateToPreviousWeek,
        hasNextWeek,
        hasPreviousWeek,
      }}
    >
      {children}
    </SightingsContext.Provider>
  );
};
