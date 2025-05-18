import { ProcessedSighting, UfoSighting, ApiResponse } from "@/lib/types";
import { getWeekNumber } from "@/lib/utils";

export async function fetchUfoSightings(): Promise<ProcessedSighting[]> {
  const API_URL = process.env.API_URL!;

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as UfoSighting[];

    const parseDateUtc = (dateString: string): Date => {
      const [day, month, year] = dateString.split("/").map(Number);
      return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    };

    const processedData = data.map((sighting) => {
      const parsedDate = parseDateUtc(sighting.date);
      return {
        ...sighting,
        parsedDate,
        weekNumber: getWeekNumber(parsedDate),
        year: parsedDate.getUTCFullYear(),
      };
    });

    return processedData.sort(
      (a, b) => a.parsedDate.getTime() - b.parsedDate.getTime()
    );
  } catch (error) {
    throw error;
  }
}

export async function fetchUfoSightingsFromApi(): Promise<ApiResponse> {
  try {
    const data = await fetchUfoSightings();
    return { data };
  } catch (error) {
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
    throw err;
  }
}
