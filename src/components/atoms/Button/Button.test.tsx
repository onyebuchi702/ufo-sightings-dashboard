import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button.component";

describe("Button", () => {
  it("renders with children text", () => {
    render(<Button onClick={() => {}}>Click Me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies the correct variant class", () => {
    render(
      <Button onClick={() => {}} variant="outline">
        Outline
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/border/);
  });
});
