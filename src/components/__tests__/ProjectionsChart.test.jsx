import React from "react";
import { screen } from "@testing-library/react";
import ProjectionsChart from "../../components/ProjectionsChart";
import { renderWithProviders } from "../../../tests/test-utils";

// Mock react-chartjs-2 Bar to avoid canvas complexity
jest.mock("react-chartjs-2", () => ({
  Bar: (props) => <div data-testid="bar-chart" {...props} />,
}));

describe("ProjectionsChart", () => {
  it("renders header and legend values", () => {
    renderWithProviders(<ProjectionsChart />);
    expect(screen.getByText("Projections vs Actuals")).toBeInTheDocument();
    expect(screen.getByText("Actual")).toBeInTheDocument();
    expect(screen.getByText("Projection")).toBeInTheDocument();
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });
});
