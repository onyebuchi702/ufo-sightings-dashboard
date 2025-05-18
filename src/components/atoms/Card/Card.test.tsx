import { render, screen } from "@testing-library/react";
import { Card } from "./Card.component";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders title if provided", () => {
    render(<Card title="My Title">Content</Card>);
    expect(screen.getByText("My Title")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveClass("text-xl");
  });

  it("applies custom className", () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
