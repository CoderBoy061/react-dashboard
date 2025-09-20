import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import Header from "../../components/Header";
import { renderWithProviders } from "../../../tests/test-utils";

describe("Header", () => {
  it("toggles sidebar on hamburger click", () => {
    const { store } = renderWithProviders(<Header />);
    expect(store.getState().ui.sidebarOpenMobile).toBe(false);
    const btn = screen.getByLabelText("Toggle sidebar");
    fireEvent.click(btn);
    expect(store.getState().ui.sidebarOpenMobile).toBe(true);
  });

  it("toggles theme when theme button clicked", () => {
    const { store } = renderWithProviders(<Header />);
    const before = store.getState().ui.theme;
    const btn = screen.getByTitle("Toggle theme");
    fireEvent.click(btn);
    expect(store.getState().ui.theme).not.toBe(before);
  });

  it("opens notifications using provided prop callback", () => {
    const cb = jest.fn();
    renderWithProviders(<Header onOpenNotifications={cb} />);
    const btn = screen.getByLabelText("Open notifications");
    fireEvent.click(btn);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});
