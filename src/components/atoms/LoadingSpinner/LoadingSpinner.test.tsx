import { render } from "@testing-library/react";
import { LoadingSpinner } from "./LoadingSpinner.component";

describe("LoadingSpinner", () => {
  it("renders with default size (md)", () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector("div > div > div");
    expect(spinner).toHaveClass("h-10 w-10");
  });

  it("renders with small size", () => {
    const { container } = render(<LoadingSpinner size="sm" />);
    const spinner = container.querySelector("div > div > div");
    expect(spinner).toHaveClass("h-6 w-6");
  });

  it("renders with large size", () => {
    const { container } = render(<LoadingSpinner size="lg" />);
    const spinner = container.querySelector("div > div > div");
    expect(spinner).toHaveClass("h-16 w-16");
  });
});
