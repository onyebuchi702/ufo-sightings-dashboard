import { render, screen } from "@testing-library/react";
import { Header } from "./Header.component";

describe("Header", () => {
  it("renders the main title", () => {
    render(<Header />);
    expect(
      screen.getByRole("heading", { name: /ufo sightings dashboard/i })
    ).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<Header />);
    expect(
      screen.getByText(/tracking mysterious visitors over procode hq/i)
    ).toBeInTheDocument();
  });

  it("renders the UFO icon", () => {
    render(<Header />);
    const svgElement = screen.getByRole("img", { hidden: true });
    expect(svgElement).toBeInTheDocument();
  });
});
