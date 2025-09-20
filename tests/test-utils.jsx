import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import ui from "../src/store/uiSlice";
import orders from "../src/store/ordersSlice";

export function renderWithProviders(
  uiNode,
  { route = "/", preloadedState, store } = {}
) {
  const testStore =
    store ||
    configureStore({
      reducer: { ui, orders },
      preloadedState,
    });

  const Wrapper = ({ children }) => (
    <MemoryRouter initialEntries={[route]}>
      <Provider store={testStore}>{children}</Provider>
    </MemoryRouter>
  );
  return { store: testStore, ...render(uiNode, { wrapper: Wrapper }) };
}
