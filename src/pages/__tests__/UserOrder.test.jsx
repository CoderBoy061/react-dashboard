import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import UserOrder from "../UserOrder";
import { renderWithProviders } from "../../../tests/test-utils";

describe("UserOrder page", () => {
  it("renders toolbar, table and pagination, paginates then filters and sorts", () => {
    const { store } = renderWithProviders(<UserOrder />);
    // Pagination first (so filter does not reduce pages unexpectedly)
    const next = screen.getByText("›");
    fireEvent.click(next);
    expect(store.getState().orders.page).toBe(2);

    // Toolbar controls
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "Natali" } });
    expect(store.getState().orders.query).toBe("Natali");

    // Filter popover
    fireEvent.click(screen.getByTitle("Filter"));
    fireEvent.click(screen.getByText("Pending"));
    expect(store.getState().orders.status).toContain("Pending");

    // Sort toggle
    fireEvent.click(screen.getByLabelText("Sort by date"));
    expect(store.getState().orders.sortDir).toBe("asc");

    // Page might reset on filters/search; ensure setPage still works
    fireEvent.click(screen.getByText("1"));
    expect(store.getState().orders.page).toBe(1);
  });
});
