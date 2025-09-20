import React from "react";
import { screen } from "@testing-library/react";
import TotalSales from "../../components/TotalSales";
import { renderWithProviders } from "../../../tests/test-utils";

// Mock react-chartjs-2 Doughnut to avoid canvas
jest.mock("react-chartjs-2", () => ({
  Doughnut: (props) => <div data-testid="doughnut-chart" {...props} />,
}));

describe("TotalSales", () => {
  it("renders title, legend items and doughnut chart", () => {
    renderWithProviders(<TotalSales />);
    expect(screen.getByText("Total Sales")).toBeInTheDocument();
    expect(screen.getByText("Direct")).toBeInTheDocument();
    expect(screen.getByText("Affiliate")).toBeInTheDocument();
    expect(screen.getByText("Sponsored")).toBeInTheDocument();
    expect(screen.getByText("E-mail")).toBeInTheDocument();
    expect(screen.getByTestId("doughnut-chart")).toBeInTheDocument();
  });
});
