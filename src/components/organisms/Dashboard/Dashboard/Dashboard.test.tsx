import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Dashboard } from "./Dashboard.component";
import { useSightings } from "@/lib/contexts";

jest.mock("../WeekNavigator", () => ({
  WeekNavigator: ({ onNextWeek, onPreviousWeek }: any) => (
    <div>
      <button onClick={onPreviousWeek}>Previous Week</button>
      <button onClick={onNextWeek}>Next Week</button>
    </div>
  ),
}));

jest.mock("../SightingsChart", () => ({
  SightingsChart: () => <div>SightingsChart</div>,
}));

jest.mock("@/lib/contexts");

describe("Dashboard", () => {
  const mockNavigateNext = jest.fn();
  const mockNavigatePrev = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows error state when error exists", () => {
    (useSightings as jest.Mock).mockReturnValue({
      isLoading: false,
      error: { message: "Network error" },
      currentWeekData: null,
      navigateToNextWeek: mockNavigateNext,
      navigateToPreviousWeek: mockNavigatePrev,
      hasNextWeek: false,
      hasPreviousWeek: false,
    });

    render(<Dashboard />);
    expect(
      screen.getByText(/Failed to load UFO sightings data: Network error/i)
    ).toBeInTheDocument();
  });

  it("shows loading spinner when loading", () => {
    (useSightings as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      currentWeekData: null,
      navigateToNextWeek: mockNavigateNext,
      navigateToPreviousWeek: mockNavigatePrev,
      hasNextWeek: false,
      hasPreviousWeek: false,
    });

    render(<Dashboard />);

    expect(
      screen.getByText(/Loading UFO sightings data.../i)
    ).toBeInTheDocument();

    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("shows no data message when currentWeekData is null", () => {
    (useSightings as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      currentWeekData: null,
      navigateToNextWeek: mockNavigateNext,
      navigateToPreviousWeek: mockNavigatePrev,
      hasNextWeek: false,
      hasPreviousWeek: false,
    });

    render(<Dashboard />);
    expect(
      screen.getByText(/No UFO sightings data available./i)
    ).toBeInTheDocument();
  });

  it("renders main dashboard when data is available", () => {
    const weekData = {
      totalSightings: 15,
      weekNumber: 20,
      year: 2025,
    };

    (useSightings as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      currentWeekData: weekData,
      navigateToNextWeek: mockNavigateNext,
      navigateToPreviousWeek: mockNavigatePrev,
      hasNextWeek: true,
      hasPreviousWeek: true,
    });

    render(<Dashboard />);

    expect(
      screen.getByText(/Total sightings this week: 15/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Data shown for Week 20, 2025/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Previous Week/i)).toBeInTheDocument();
    expect(screen.getByText(/Next Week/i)).toBeInTheDocument();

    expect(screen.getByText(/SightingsChart/i)).toBeInTheDocument();
  });

  it("calls navigation functions when buttons are clicked", () => {
    const weekData = {
      totalSightings: 10,
      weekNumber: 1,
      year: 2025,
    };

    (useSightings as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      currentWeekData: weekData,
      navigateToNextWeek: mockNavigateNext,
      navigateToPreviousWeek: mockNavigatePrev,
      hasNextWeek: true,
      hasPreviousWeek: true,
    });

    render(<Dashboard />);

    const prevButton = screen.getByText(/Previous Week/i);
    const nextButton = screen.getByText(/Next Week/i);

    fireEvent.click(prevButton);
    expect(mockNavigatePrev).toHaveBeenCalledTimes(1);

    fireEvent.click(nextButton);
    expect(mockNavigateNext).toHaveBeenCalledTimes(1);
  });
});
