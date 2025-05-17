import { ProcessedSighting, UfoSighting, ApiResponse } from "../types";
import { getWeekNumber } from "../utils";

export async function fetchUfoSightings(): Promise<ProcessedSighting[]> {
  const API_URL = process.env.API_URL!;

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
    const res = await fetch("/api/sightings");

    if (!res.ok) {
      throw new Error(`Backend API error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    if ("error" in json) {
      throw new Error(json.error);
    }

    return json.data.map((sighting: any) => ({
      ...sighting,
      parsedDate: new Date(sighting.parsedDate),
    }));
  } catch (err) {
    console.error("Error in API route:", err);
    throw err;
  }
}
