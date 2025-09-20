import React from "react";
import { screen } from "@testing-library/react";
import RevenueChart from "../../components/RevenueChart";
import { renderWithProviders } from "../../../tests/test-utils";

describe("RevenueChart", () => {
  it("renders title, legend labels, and svg paths", () => {
    renderWithProviders(<RevenueChart />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("Current Week")).toBeInTheDocument();
    expect(screen.getByText("Previous Week")).toBeInTheDocument();
    // ensure svg is present
    expect(document.querySelector("svg.rc-svg")).toBeTruthy();
  });
});
