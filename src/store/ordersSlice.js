import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  status: [],
  page: 1,
  sortDir: "desc",
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
      state.page = 1;
    },
    toggleStatus(state, action) {
      const v = action.payload;
      state.page = 1;
      state.status = state.status.includes(v)
        ? state.status.filter((s) => s !== v)
        : [...state.status, v];
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    toggleSortDir(state) {
      state.sortDir = state.sortDir === "desc" ? "asc" : "desc";
    },
  },
});

export const { setQuery, toggleStatus, setPage, toggleSortDir } =
  ordersSlice.actions;
export default ordersSlice.reducer;
