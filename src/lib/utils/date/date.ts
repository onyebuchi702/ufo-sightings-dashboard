export const getWeekNumber = (date: Date): number => {
  const target = new Date(date.valueOf());
  const dayNum = (date.getDay() + 6) % 7;

  target.setDate(target.getDate() - dayNum + 3);

  const firstThursday = new Date(target.getFullYear(), 0, 4);

  const dayDiff = (target.getTime() - firstThursday.getTime()) / 86400000;
  const weekNum = 1 + Math.floor(dayDiff / 7);
  return weekNum;
};

export const getFirstDayOfWeek = (date: Date): Date => {
  const dayOfWeek = date.getDay(); // 0 is Sunday, 1 is Monday, etc.
  const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  return new Date(date.getFullYear(), date.getMonth(), diff);
};

export const getLastDayOfWeek = (date: Date): Date => {
  const firstDay = getFirstDayOfWeek(date);
  const lastDay = new Date(firstDay);
  lastDay.setDate(firstDay.getDate() + 6);
  return lastDay;
};

export const getDaysInWeek = (startDate: Date): Date[] => {
  const days: Date[] = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < 7; i++) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};

export const formatDayShort = (date: Date): string => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = String(date.getDate()).padStart(2, "0");
  return `${dayNames[date.getDay()]} ${day}`; // "Mon 01", "Tue 02"
};

export const formatDateRange = (startDate: Date, endDate: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const startFormatted = startDate.toLocaleDateString("en-US", options);
  const endFormatted = endDate.toLocaleDateString("en-US", options);
  const year = endDate.getFullYear();

  return `${startFormatted} - ${endFormatted}, ${year}`; // "Jan 01 - Jan 07, 2023"
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const groupSightingsByWeek = (
  sightings: Array<{ parsedDate: Date; weekNumber: number; year: number }>
) => {
  return sightings.reduce((acc, sighting) => {
    const key = `${sighting.year}-${sighting.weekNumber}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(sighting);
    return acc;
  }, {} as Record<string, Array<{ parsedDate: Date; weekNumber: number; year: number }>>);
};

export const getWeekKey = (date: Date): string => {
  const weekNumber = getWeekNumber(date);
  const year = date.getFullYear();
  return `${year}-${weekNumber}`; // format "YYYY-WW"
};
