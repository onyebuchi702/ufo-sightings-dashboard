import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { WeekNavigator } from "./WeekNavigator";
import { formatDateRange } from "@/lib/utils";
import { WeekData } from "@/lib/types";

describe("WeekNavigator", () => {
  const weekData: WeekData = {
    startDate: new Date("2024-05-06"),
    endDate: new Date("2024-05-12"),
    weekNumber: 19,
    year: 2024,
    days: [],
    totalSightings: 0,
  };

  const setup = (props = {}) => {
    const onPreviousWeek = jest.fn();
    const onNextWeek = jest.fn();

    render(
      <WeekNavigator
        weekData={weekData}
        hasNextWeek={true}
        hasPreviousWeek={true}
        onNextWeek={onNextWeek}
        onPreviousWeek={onPreviousWeek}
        isLoading={false}
        {...props}
      />
    );

    return { onPreviousWeek, onNextWeek };
  };

  it("renders week information correctly", () => {
    setup();
    expect(
      screen.getByText(formatDateRange(weekData.startDate, weekData.endDate))
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Week ${weekData.weekNumber}, ${weekData.year}`)
    ).toBeInTheDocument();
  });

  it("calls onPreviousWeek and onNextWeek when buttons are clicked", () => {
    const { onPreviousWeek, onNextWeek } = setup();

    fireEvent.click(screen.getByText("Previous Week"));
    fireEvent.click(screen.getByText("Next Week"));

    expect(onPreviousWeek).toHaveBeenCalledTimes(1);
    expect(onNextWeek).toHaveBeenCalledTimes(1);
  });

  it("disables buttons correctly", () => {
    setup({ hasPreviousWeek: false, hasNextWeek: false, isLoading: false });

    expect(screen.getByText("Previous Week")).toBeDisabled();
    expect(screen.getByText("Next Week")).toBeDisabled();
  });

  it("disables buttons when loading", () => {
    setup({ isLoading: true });

    expect(screen.getByText("Previous Week")).toBeDisabled();
    expect(screen.getByText("Next Week")).toBeDisabled();
  });

  it("shows fallback text when no week data", () => {
    render(
      <WeekNavigator
        weekData={null}
        hasNextWeek={false}
        hasPreviousWeek={false}
        onNextWeek={jest.fn()}
        onPreviousWeek={jest.fn()}
        isLoading={false}
      />
    );

    expect(screen.getByText("No week selected")).toBeInTheDocument();
  });
});
