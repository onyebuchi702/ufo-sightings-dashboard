import { RawSighting, ProcessedSighting } from "@/lib/types";
import { getWeekNumber } from "@/lib/utils";

export const normalizeSightings = (
  rawSightings: RawSighting[]
): ProcessedSighting[] => {
  return rawSightings
    .map((sighting) => {
      if (sighting.parsedDate && sighting.weekNumber && sighting.year) {
        return {
          ...sighting,
          parsedDate: new Date(sighting.parsedDate),
        };
      }

      const parsedDate = new Date(sighting.date);
      if (isNaN(parsedDate.getTime())) return null;

      return {
        ...sighting,
        parsedDate,
        weekNumber: getWeekNumber(parsedDate),
        year: parsedDate.getFullYear(),
      };
    })
    .filter(Boolean) as ProcessedSighting[];
};
