import { configureStore } from "@reduxjs/toolkit";
import ui from "./uiSlice";
import orders from "./ordersSlice";

export const store = configureStore({
  reducer: { ui, orders },
});
