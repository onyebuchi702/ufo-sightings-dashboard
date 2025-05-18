import {
  getISOWeek,
  getISOWeekYear,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay as dfIsSameDay,
  format,
} from "date-fns";
import { WeeklySighting } from "@/types";

export const getWeekNumber = (date: Date): number => {
  return getISOWeek(date);
};

export const getWeekYear = (date: Date): number => {
  return getISOWeekYear(date);
};

export const getFirstDayOfWeek = (date: Date): Date => {
  return startOfWeek(date, { weekStartsOn: 1 });
};

export const getLastDayOfWeek = (date: Date): Date => {
  return endOfWeek(date, { weekStartsOn: 1 });
};

export const getDaysInWeek = (startDate: Date): Date[] => {
  return eachDayOfInterval({
    start: startDate,
    end: getLastDayOfWeek(startDate),
  });
};

export const formatDayShort = (date: Date): string => {
  return format(date, "EEE dd");
};

export const formatDateRange = (startDate: Date, endDate: Date): string => {
  const startFormatted = format(startDate, "MMM dd");
  const endFormatted = format(endDate, "MMM dd");
  const year = endDate.getFullYear();

  return `${startFormatted} - ${endFormatted}, ${year}`;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return dfIsSameDay(date1, date2);
};

export const groupSightingsByWeek = (sightings: Array<WeeklySighting>) => {
  return sightings.reduce((acc, sighting) => {
    const key = `${sighting.year}-${sighting.weekNumber}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(sighting);
    return acc;
  }, {} as Record<string, WeeklySighting[]>);
};

export const getWeekKey = (date: Date): string => {
  const isoYear = getWeekYear(date);
  const weekNumber = getWeekNumber(date);
  return `${isoYear}-${weekNumber}`;
};
