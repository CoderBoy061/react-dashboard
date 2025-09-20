import React from "react";
import { screen, waitFor } from "@testing-library/react";
import App from "../App";
import { renderWithProviders } from "../../tests/test-utils";

jest.mock("../components/Layout", () => {
  const Actual = jest.requireActual("../components/Layout").default;
  return (props) => <Actual {...props} />;
});

jest.mock("../pages/Dashboard", () => () => <div>Dashboard Page</div>);
jest.mock("../pages/UserOrder", () => () => <div>User Order Page</div>);
jest.mock("../pages/NotFound", () => () => <div>NotFound Page</div>);

describe("App routing", () => {
  it("renders Dashboard on root path", async () => {
    renderWithProviders(<App />, { route: "/" });
    await waitFor(() =>
      expect(screen.getByText("Dashboard Page")).toBeInTheDocument()
    );
  });

  it("renders UserOrder on /user-order", async () => {
    renderWithProviders(<App />, { route: "/user-order" });
    await waitFor(() =>
      expect(screen.getByText("User Order Page")).toBeInTheDocument()
    );
  });

  it("renders NotFound on unknown route", async () => {
    renderWithProviders(<App />, { route: "/nope" });
    await waitFor(() =>
      expect(screen.getByText("NotFound Page")).toBeInTheDocument()
    );
  });
});
