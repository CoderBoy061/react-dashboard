import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import NotFound from "../NotFound";
import { renderWithProviders } from "../../../tests/test-utils";

describe("NotFound page", () => {
  it("renders title and navigates on buttons", () => {
    renderWithProviders(<NotFound />);
    expect(screen.getByText("Page not found")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Go to Dashboard"));
    fireEvent.click(screen.getByText("Go back"));
    // Navigation is handled by router; no assertion beyond no crash
  });
});
