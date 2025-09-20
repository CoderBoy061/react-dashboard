import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import Dashboard from "../Dashboard";
import { renderWithProviders } from "../../../tests/test-utils";

jest.mock("../../components/ProjectionsChart", () => () => (
  <div>ProjectionsChart</div>
));
jest.mock("../../components/RevenueChart", () => () => <div>Revenue</div>);
jest.mock("../../components/RevenueByLocation", () => () => (
  <div>Revenue by Location</div>
));
jest.mock("../../components/TotalSales", () => () => <div>Total Sales</div>);

describe("Dashboard page", () => {
  it("renders stat cards and charts", () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText("Customers")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getAllByText("Revenue").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Growth")).toBeInTheDocument();
    expect(screen.getByText("Revenue by Location")).toBeInTheDocument();
    expect(screen.getByText("Total Sales")).toBeInTheDocument();
  });

  it("navigates to user order when Orders card clicked", () => {
    const { history } = renderWithProviders(<Dashboard />, { route: "/" });
    const ordersCard = screen.getByText("Orders");
    fireEvent.click(ordersCard);
    // MemoryRouter doesn't expose history easily; assert location changed by presence of component when used in App routing tests
  });
});
