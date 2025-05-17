import React from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { MockedFunction } from "jest-mock";
import { expect, jest, describe, it } from "@jest/globals";
import { SightingsProvider } from "./Sightings.provider";
import { fetchSightingsFromBackend } from "@/lib/api";

jest.mock("@/lib/api", () => ({
  fetchSightingsFromBackend: jest.fn(),
}));

const SightingsComponent = () => {
  return <div>Test</div>;
};

const createTestClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

const renderProvider = () =>
  render(
    <QueryClientProvider client={createTestClient()}>
      <SightingsProvider>
        <SightingsComponent />
      </SightingsProvider>
    </QueryClientProvider>
  );

describe("SightingsProvider", () => {
  it("renders without crashing", async () => {
    (
      fetchSightingsFromBackend as MockedFunction<
        typeof fetchSightingsFromBackend
      >
    ).mockResolvedValue([
      {
        year: 2024,
        weekNumber: 20,
        parsedDate: new Date(),
        count: 5,
        id: 0,
        date: "",
        location: "",
        description: "",
      },
    ]);

    renderProvider();

    expect(await screen.findByText("Test")).toBeInTheDocument();
  });
});
