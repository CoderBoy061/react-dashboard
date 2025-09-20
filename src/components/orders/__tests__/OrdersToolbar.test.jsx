import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import OrdersToolbar from "../../orders/OrdersToolbar";
import { renderWithProviders } from "../../../../tests/test-utils";

describe("OrdersToolbar", () => {
  const setup = (props = {}) =>
    renderWithProviders(
      <OrdersToolbar
        query={props.query ?? ""}
        onQuery={props.onQuery ?? jest.fn()}
        filters={props.filters ?? { status: new Set() }}
        onToggleFilter={props.onToggleFilter ?? jest.fn()}
        sortDir={props.sortDir ?? "desc"}
        onToggleDateSort={props.onToggleDateSort ?? jest.fn()}
      />
    );

  it("calls onQuery when typing in search", () => {
    const onQuery = jest.fn();
    setup({ onQuery });
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "abc" } });
    expect(onQuery).toHaveBeenCalledWith("abc");
  });

  it("opens filter popover and toggles status chips", () => {
    const onToggleFilter = jest.fn();
    setup({ onToggleFilter });
    const filterBtn = screen.getByTitle("Filter");
    fireEvent.click(filterBtn);
    const chip = screen.getByText("Pending");
    fireEvent.click(chip);
    expect(onToggleFilter).toHaveBeenCalledWith("status", "Pending");
  });

  it("toggles sort by date", () => {
    const onToggleDateSort = jest.fn();
    setup({ onToggleDateSort, sortDir: "desc" });
    const btn = screen.getByLabelText("Sort by date");
    fireEvent.click(btn);
    expect(onToggleDateSort).toHaveBeenCalled();
  });
});
