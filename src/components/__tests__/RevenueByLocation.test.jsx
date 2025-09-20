import React from "react";
import { screen } from "@testing-library/react";
import RevenueByLocation from "../../components/RevenueByLocation";
import { renderWithProviders } from "../../../tests/test-utils";

jest.mock("../../assets/map.png", () => "map.png");

describe("RevenueByLocation", () => {
  it("renders title, map image, and location list", () => {
    renderWithProviders(<RevenueByLocation />);
    expect(screen.getByText("Revenue by Location")).toBeInTheDocument();
    const img = screen.getByAltText("Map");
    expect(img).toHaveAttribute("src", expect.stringContaining("map.png"));
    // Cities from component data
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("San Francisco")).toBeInTheDocument();
    expect(screen.getByText("Sydney")).toBeInTheDocument();
    expect(screen.getByText("Singapore")).toBeInTheDocument();
  });
});
