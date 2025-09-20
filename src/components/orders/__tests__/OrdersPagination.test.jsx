import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import OrdersPagination from "../../orders/OrdersPagination";
import { renderWithProviders } from "../../../../tests/test-utils";

describe("OrdersPagination", () => {
  it("renders pages and handles click/prev/next", () => {
    const onPage = jest.fn();
    renderWithProviders(
      <OrdersPagination page={2} pages={5} onPage={onPage} />
    );
    fireEvent.click(screen.getByText("1"));
    expect(onPage).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByText("›"));
    expect(onPage).toHaveBeenCalledWith(3);
    fireEvent.click(screen.getByText("‹"));
    expect(onPage).toHaveBeenCalledWith(1); // Math.max(1, page - 1) with page=2 -> 1
  });
});
