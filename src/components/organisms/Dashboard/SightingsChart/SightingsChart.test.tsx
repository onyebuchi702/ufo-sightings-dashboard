import { render, screen } from "@testing-library/react";
import { describe, expect, jest, test } from "@jest/globals";
import { formatDayShort } from "@/lib/utils";
import { SightingsChart } from "./SightingsChart.component";

jest.mock("recharts", () => {
  const OriginalModule = jest.requireActual("recharts");
  return {
    ...(OriginalModule as object),
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    BarChart: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="bar-chart">{children}</div>
    ),
    Bar: (props: any) => <div data-testid="bar" {...props} />,
    XAxis: (props: any) => <div data-testid="x-axis" {...props} />,
    YAxis: (props: any) => <div data-testid="y-axis" {...props} />,
    CartesianGrid: (props: any) => (
      <div data-testid="cartesian-grid" {...props} />
    ),
    Tooltip: (props: any) => <div data-testid="tooltip" {...props} />,
    Legend: (props: any) => <div data-testid="legend" {...props} />,
  };
});

describe("SightingsChart", () => {
  const mockWeekData = {
    weekNumber: 1,
    year: 2023,
    startDate: new Date("2023-01-02"),
    endDate: new Date("2023-01-08"),
    days: [
      {
        date: new Date("2023-01-02"),
        count: 5,
        dayOfWeek: 1,
        formattedDate: formatDayShort(new Date("2023-01-02")),
        hasData: true,
      },
      {
        date: new Date("2023-01-03"),
        count: 3,
        dayOfWeek: 2,
        formattedDate: formatDayShort(new Date("2023-01-03")),
        hasData: true,
      },
      {
        date: new Date("2023-01-04"),
        count: 0,
        dayOfWeek: 3,
        formattedDate: formatDayShort(new Date("2023-01-04")),
        hasData: false,
      },
      {
        date: new Date("2023-01-05"),
        count: 7,
        dayOfWeek: 4,
        formattedDate: formatDayShort(new Date("2023-01-05")),
        hasData: true,
      },
      {
        date: new Date("2023-01-06"),
        count: 2,
        dayOfWeek: 5,
        formattedDate: formatDayShort(new Date("2023-01-06")),
        hasData: true,
      },
      {
        date: new Date("2023-01-07"),
        count: 0,
        dayOfWeek: 6,
        formattedDate: formatDayShort(new Date("2023-01-07")),
        hasData: false,
      },
      {
        date: new Date("2023-01-08"),
        count: 1,
        dayOfWeek: 0,
        formattedDate: formatDayShort(new Date("2023-01-08")),
        hasData: true,
      },
    ],
    totalSightings: 18,
  };

  test("renders loading state when isLoading is true", () => {
    render(<SightingsChart weekData={null} isLoading={true} />);

    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });

  test("renders no data message when weekData is null", () => {
    render(<SightingsChart weekData={null} isLoading={false} />);

    expect(
      screen.getByText("No data available for this week")
    ).toBeInTheDocument();
  });

  test("renders chart when data is available", () => {
    render(<SightingsChart weekData={mockWeekData} isLoading={false} />);

    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    expect(screen.getByTestId("bar")).toBeInTheDocument();
    expect(screen.getByTestId("x-axis")).toBeInTheDocument();
    expect(screen.getByTestId("y-axis")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    expect(screen.getByTestId("legend")).toBeInTheDocument();
  });
});
