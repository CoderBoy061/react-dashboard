import React from "react";
import { screen, waitFor, act } from "@testing-library/react";
import Layout from "../../components/Layout";
import { renderWithProviders } from "../../../tests/test-utils";
import { openNotif, closeNotif } from "../../store/uiSlice";

// Outlet is empty by default; we just test drawer interactions and structure
describe("Layout", () => {
  it("opens and closes notifications drawer", async () => {
    const { store } = renderWithProviders(<Layout />);
    await act(async () => {
      store.dispatch(openNotif());
    });
    expect(store.getState().ui.notifOpen).toBe(true);
    await waitFor(() =>
      expect(screen.getAllByText("Notifications").length).toBeGreaterThan(0)
    );
    await act(async () => {
      store.dispatch(closeNotif());
    });
    expect(store.getState().ui.notifOpen).toBe(false);
  });
});
