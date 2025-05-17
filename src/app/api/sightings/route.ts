import { fetchUfoSightingsFromApi } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await fetchUfoSightingsFromApi();

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch UFO sightings data", message: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
