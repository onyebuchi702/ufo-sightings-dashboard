/**
 * @jest-environment jsdom
 */

import {
  fetchUfoSightingsFromApi,
  fetchUfoSightings,
  fetchSightingsFromBackend,
} from "./sightings";
import { getWeekNumber } from "@/lib/utils";

jest.mock("@/lib/utils", () => ({
  getWeekNumber: jest.fn(),
}));

process.env.API_URL = "https://dummy-api.com/sightings";

describe("UFO Sightings API functions", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("fetchUfoSightings", () => {
    it("fetches and processes sightings correctly", async () => {
      const fakeDate = "2025-05-01T12:00:00Z";
      const fakeSightings = [
        { id: 1, date: fakeDate, location: "Area 51" },
        { id: 2, date: "2025-04-30T12:00:00Z", location: "Roswell" },
      ];

      (getWeekNumber as jest.Mock).mockReturnValue(18);

      (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => fakeSightings,
      });

      const results = await fetchUfoSightings();

      expect(global.fetch).toHaveBeenCalledWith(process.env.API_URL);
      expect(results).toHaveLength(2);
      expect(results[0].parsedDate).toBeInstanceOf(Date);
      expect(results[0].weekNumber).toBe(18);
      expect(results[0].year).toBe(2025);

      // Sorted ascending by parsedDate
      expect(results[0].date).toBe("2025-04-30T12:00:00Z");
      expect(results[1].date).toBe(fakeDate);
    });

    it("throws error on non-ok response", async () => {
      (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Server Error",
      });

      await expect(fetchUfoSightings()).rejects.toThrow(
        /API error: 500 Server Error/
      );
    });

    it("throws error if fetch fails", async () => {
      (global.fetch as jest.Mock) = jest
        .fn()
        .mockRejectedValue(new Error("Network Failure"));

      await expect(fetchUfoSightings()).rejects.toThrow("Network Failure");
    });
  });

  describe("fetchUfoSightingsFromApi", () => {
    it("returns data on successful fetch", async () => {
      const fakeData = [
        {
          id: 1,
          date: "2025-05-01T12:00:00Z",
          parsedDate: new Date("2025-05-01T12:00:00Z"),
          year: 2025,
          count: 1,
          weekNumber: 18,
          location: "Area 51",
          description: "Bright light in the sky",
        },
      ];

      (getWeekNumber as jest.Mock).mockReturnValue(18);

      (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => fakeData,
      });

      const result = await fetchUfoSightingsFromApi();
      expect(result).toEqual({ data: fakeData });
    });

    it("returns error info on failure", async () => {
      (global.fetch as jest.Mock) = jest
        .fn()
        .mockRejectedValue(new Error("Fail!"));

      const result = await fetchUfoSightingsFromApi();
      expect(result.data).toEqual([]);
      expect(result.error).toBe("Fail!");
    });
  });

  describe("fetchSightingsFromBackend", () => {
    it("fetches and parses backend sightings correctly", async () => {
      const backendData = {
        data: [
          {
            id: 1,
            parsedDate: "2025-05-01T12:00:00Z",
            location: "Backyard",
          },
        ],
      };

      (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => backendData,
      });

      const result = await fetchSightingsFromBackend();

      expect(global.fetch).toHaveBeenCalledWith("/api/sightings");
      expect(result).toHaveLength(1);
      expect(result[0].parsedDate).toBeInstanceOf(Date);
      expect(result[0].location).toBe("Backyard");
    });

    it("throws error on non-ok response", async () => {
      (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      await expect(fetchSightingsFromBackend()).rejects.toThrow(
        /Backend API error: 404 Not Found/
      );
    });

    it("throws error if backend returns error", async () => {
      const backendError = { error: "Something went wrong" };

      (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => backendError,
      });

      await expect(fetchSightingsFromBackend()).rejects.toThrow(
        "Something went wrong"
      );
    });

    it("throws error if fetch fails", async () => {
      (global.fetch as jest.Mock) = jest
        .fn()
        .mockRejectedValue(new Error("Network error"));

      await expect(fetchSightingsFromBackend()).rejects.toThrow(
        "Network error"
      );
    });
  });
});
