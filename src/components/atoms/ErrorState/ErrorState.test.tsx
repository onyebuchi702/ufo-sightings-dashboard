import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorState } from "./ErrorState.component";

describe("ErrorState", () => {
  it("renders the error message", () => {
    render(<ErrorState message="Something went wrong" />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("does not show retry button if onRetry is not provided", () => {
    render(<ErrorState message="Error occurred" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", () => {
    const onRetry = jest.fn();
    render(<ErrorState message="Load failed" onRetry={onRetry} />);
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
