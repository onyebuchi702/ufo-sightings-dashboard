import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer.component";

describe("Footer", () => {
  it("renders the copyright", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} UFO Sightings Dashboard`)
    ).toBeInTheDocument();
  });

  it("renders the 'Built for Procode' text", () => {
    render(<Footer />);
    expect(screen.getByText(/built for procode/i)).toBeInTheDocument();
  });
});
