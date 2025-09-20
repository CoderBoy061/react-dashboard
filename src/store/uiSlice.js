import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme:
    typeof localStorage !== "undefined" && localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : "light",
  notifOpen: false,
  activeSidebar: "Default",
  sidebarOpenMobile: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", state.theme);
      } catch {}
    },
    openNotif(state) {
      state.notifOpen = true;
    },
    closeNotif(state) {
      state.notifOpen = false;
    },
    setActiveSidebar(state, action) {
      state.activeSidebar = action.payload;
    },
    toggleSidebarMobile(state) {
      state.sidebarOpenMobile = !state.sidebarOpenMobile;
    },
  },
});

export const {
  toggleTheme,
  openNotif,
  closeNotif,
  setActiveSidebar,
  toggleSidebarMobile,
} = uiSlice.actions;
export default uiSlice.reducer;
