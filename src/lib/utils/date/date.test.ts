import {
  getWeekNumber,
  getFirstDayOfWeek,
  getLastDayOfWeek,
  getDaysInWeek,
  formatDayShort,
  formatDateRange,
  isSameDay,
  groupSightingsByWeek,
  getWeekKey,
} from "./date";

describe("Date utilities", () => {
  describe("getWeekNumber", () => {
    it("returns correct ISO week number", () => {
      expect(getWeekNumber(new Date("2025-01-01"))).toBe(1);
      expect(getWeekNumber(new Date("2025-12-31"))).toBe(1);
      expect(getWeekNumber(new Date("2025-05-01"))).toBe(18);
    });
  });

  describe("getFirstDayOfWeek", () => {
    it("returns Monday as the start of the week", () => {
      expect(getFirstDayOfWeek(new Date("2025-05-15")).getDay()).toBe(1);
      expect(getFirstDayOfWeek(new Date("2025-05-12")).toDateString()).toBe(
        new Date("2025-05-12").toDateString()
      );
    });

    it("handles Sunday correctly", () => {
      const sunday = new Date("2025-05-11");
      const previousMonday = new Date("2025-05-05");
      expect(getFirstDayOfWeek(sunday).toDateString()).toBe(
        previousMonday.toDateString()
      );
    });
  });

  describe("getLastDayOfWeek", () => {
    it("returns Sunday as the end of the week", () => {
      const tuesday = new Date("2025-05-13");
      const sunday = getLastDayOfWeek(tuesday);
      expect(sunday.getDay()).toBe(0);
      expect(sunday.toDateString()).toBe(new Date("2025-05-18").toDateString());
    });
  });

  describe("getDaysInWeek", () => {
    it("returns 7 days starting from given week's Monday", () => {
      const start = getFirstDayOfWeek(new Date("2025-05-06"));
      const days = getDaysInWeek(start);
      expect(days).toHaveLength(7);
      expect(days[0].toDateString()).toBe(start.toDateString());
      expect(days[6].toDateString()).toBe(
        getLastDayOfWeek(start).toDateString()
      );
    });

    it("returns each day as a new Date object", () => {
      const start = getFirstDayOfWeek(new Date("2025-05-06"));
      const days = getDaysInWeek(start);
      days.forEach((day) => {
        expect(day).toBeInstanceOf(Date);
      });
    });
  });

  describe("formatDayShort", () => {
    it("formats date as short day and date", () => {
      const date = new Date("2025-05-06");
      expect(formatDayShort(date)).toBe("Tue 06");
    });
  });

  describe("formatDateRange", () => {
    it("formats date range as 'Mon dd - Mon dd, yyyy'", () => {
      const start = new Date("2025-01-01");
      const end = new Date("2025-01-07");
      expect(formatDateRange(start, end)).toBe("Jan 01 - Jan 07, 2025");
    });
  });

  describe("isSameDay", () => {
    it("returns true for the same calendar day", () => {
      const d1 = new Date("2025-05-06T10:00:00");
      const d2 = new Date("2025-05-06T22:00:00");
      expect(isSameDay(d1, d2)).toBe(true);
    });

    it("returns false for different days", () => {
      expect(isSameDay(new Date("2025-05-06"), new Date("2025-05-07"))).toBe(
        false
      );
    });
  });

  describe("groupSightingsByWeek", () => {
    it("groups sightings by year-week key", () => {
      const sightings = [
        {
          parsedDate: new Date("2025-05-01"),
          weekNumber: 18,
          year: 2025,
        },
        {
          parsedDate: new Date("2025-05-02"),
          weekNumber: 18,
          year: 2025,
        },
        {
          parsedDate: new Date("2025-05-10"),
          weekNumber: 19,
          year: 2025,
        },
      ];

      const grouped = groupSightingsByWeek(sightings);
      expect(Object.keys(grouped)).toContain("2025-18");
      expect(Object.keys(grouped)).toContain("2025-19");
      expect(grouped["2025-18"]).toHaveLength(2);
      expect(grouped["2025-19"]).toHaveLength(1);
    });
  });

  describe("getWeekKey", () => {
    it("returns 'YYYY-WW' format", () => {
      const date = new Date("2025-05-01");
      expect(getWeekKey(date)).toBe("2025-18");
    });
  });
});
