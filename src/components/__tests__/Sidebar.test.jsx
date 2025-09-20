import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import Sidebar from "../../components/Sidebar";
import { renderWithProviders } from "../../../tests/test-utils";

describe("Sidebar", () => {
  it("renders menu items and sets active on click", () => {
    const { store } = renderWithProviders(<Sidebar />);
    const defaultItem = screen.getByText("Default");
    fireEvent.click(defaultItem);
    expect(store.getState().ui.activeSidebar).toBe("Default");
    // should navigate to '/' but in MemoryRouter we only assert state here
    expect(defaultItem.closest(".sidebar-navlink")).toHaveClass("active");
  });

  it("closes sidebar on mobile close button", () => {
    const { store } = renderWithProviders(<Sidebar />, {
      preloadedState: {
        ui: {
          theme: "light",
          notifOpen: false,
          activeSidebar: "Default",
          sidebarOpenMobile: true,
        },
      },
    });
    expect(store.getState().ui.sidebarOpenMobile).toBe(true);
    const closeBtn = screen.getByLabelText("Close sidebar");
    fireEvent.click(closeBtn);
    expect(store.getState().ui.sidebarOpenMobile).toBe(false);
  });
});
