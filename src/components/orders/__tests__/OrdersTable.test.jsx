import React from "react";
import { screen } from "@testing-library/react";
import OrdersTable from "../../orders/OrdersTable";
import { renderWithProviders } from "../../../../tests/test-utils";

describe("OrdersTable", () => {
  it("renders provided rows with correct columns", () => {
    const rows = [
      {
        id: "#1",
        user: "Alice",
        project: "Proj",
        address: "Addr",
        date: "Just now",
        status: "Pending",
      },
    ];
    renderWithProviders(<OrdersTable rows={rows} />);
    expect(screen.getByText("#1")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Proj")).toBeInTheDocument();
    expect(screen.getByText("Addr")).toBeInTheDocument();
    expect(screen.getByText("Just now")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });
});
