import { ProcessedSighting, UfoSighting, ApiResponse } from "../types";
import { getWeekNumber } from "../utils";

const API_URL = process.env.API_URL!;

export async function fetchUfoSightings(): Promise<ProcessedSighting[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as UfoSighting[];

    const processedData = data.map((sighting) => {
      const parsedDate = new Date(sighting.date);
      return {
        ...sighting,
        parsedDate,
        weekNumber: getWeekNumber(parsedDate),
        year: parsedDate.getFullYear(),
      };
    });

    return processedData.sort(
      (a, b) => a.parsedDate.getTime() - b.parsedDate.getTime()
    );
  } catch (error) {
    console.error("Error fetching UFO sightings:", error);
    throw error;
  }
}

export async function fetchUfoSightingsFromApi(): Promise<ApiResponse> {
  try {
    const data = await fetchUfoSightings();
    return { data };
  } catch (error) {
    console.error("Error in API route:", error);
    return {
      data: [],
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function fetchSightingsFromBackend(): Promise<
  ProcessedSighting[]
> {
  try {
    const response = await fetch("/api/sightings");

    if (!response.ok) {
      throw new Error(
        `Backend API error: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();

    if (result.error) {
      throw new Error(result.error);
    }

    return result.data.map((sighting: any) => ({
      ...sighting,
      parsedDate: new Date(sighting.parsedDate),
    }));
  } catch (error) {
    console.error("Error fetching UFO sightings from backend:", error);
    throw error;
  }
}
