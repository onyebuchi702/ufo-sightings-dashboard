import { normalizeSightings, retrySpacing } from "./Sightings.util";

describe("normalizeSightings", () => {
  it("returns processed sightings when all fields are present", () => {
    const raw = [
      {
        id: 1,
        date: "2024-01-01",
        parsedDate: "2024-01-01T00:00:00Z",
        weekNumber: 1,
        year: 2024,
      },
    ];

    const result = normalizeSightings(raw);
    expect(result).toHaveLength(1);
    expect(result[0].parsedDate).toBeInstanceOf(Date);
    expect(result[0].weekNumber).toBe(1);
    expect(result[0].year).toBe(2024);
  });

  it("parses missing fields and calculates week/year", () => {
    const raw = [
      {
        id: 2,
        date: "2023-12-20",
      },
    ];

    const result = normalizeSightings(raw);
    expect(result).toHaveLength(1);
    expect(result[0].parsedDate).toBeInstanceOf(Date);
    expect(result[0].year).toBe(2023);
    expect(result[0].weekNumber).toBeDefined();
  });

  it("filters out invalid dates", () => {
    const raw = [
      { id: 3, date: "invalid-date" },
      { id: 4, date: "" },
    ];

    const result = normalizeSightings(raw);
    expect(result).toEqual([]);
  });
});

describe("retrySpacing", () => {
  it("returns exponential backoff time capped at 30000ms", () => {
    expect(retrySpacing(0)).toBe(1000);
    expect(retrySpacing(1)).toBe(2000);
    expect(retrySpacing(2)).toBe(4000);
    expect(retrySpacing(3)).toBe(8000);
    expect(retrySpacing(4)).toBe(16000);
    expect(retrySpacing(5)).toBe(30000);
    expect(retrySpacing(6)).toBe(30000);
  });
});
